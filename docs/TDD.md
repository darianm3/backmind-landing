

---
<!-- Source: TDD/01-supabase-backend.md -->

# Supabase Backend - Technical Design Document

## Overview

This document describes the backend architecture for Backmind, which uses Supabase for:
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Authentication**: Sign in with Apple via Supabase Auth
- **Edge Functions**: Claude AI classification for voice transcripts
- **Local Storage**: SwiftData for offline-first persistence

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        iOS App (SwiftUI)                        │
├─────────────────────────────────────────────────────────────────┤
│  ContentView                                                     │
│    ├── RealOnboardingFlowView (uses OnboardingViewModel)        │
│    ├── RealDashboardFlowView (uses DashboardViewModel)          │
│    ├── RealVoiceLoggingFlowView (uses VoiceLoggingViewModel)    │
│    └── RealSettingsFlowView                                     │
├─────────────────────────────────────────────────────────────────┤
│  ViewModels                                                      │
│    ├── OnboardingViewModel  → DataService                       │
│    ├── DashboardViewModel   → DataService                       │
│    └── VoiceLoggingViewModel → AIService + DataService          │
├─────────────────────────────────────────────────────────────────┤
│  Services (DI via DependencyContainer)                          │
│    ├── SwiftDataService (DataServiceProtocol)                   │
│    ├── ClaudeAIService (AIServiceProtocol)                      │
│    ├── SupabaseAuthService (AuthServiceProtocol)                │
│    └── AppleSpeechService (VoiceServiceProtocol)                │
├─────────────────────────────────────────────────────────────────┤
│  SwiftData (Local)              │  Supabase (Remote)            │
│    ├── SDIdentity               │    ├── identities             │
│    ├── SDBuildingBlock          │    ├── building_blocks        │
│    ├── SDGuardrail              │    ├── guardrails             │
│    ├── SDBuildingBlockLog       │    ├── building_block_logs    │
│    └── SDGuardrailLog           │    └── guardrail_logs         │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Supabase Platform                            │
├─────────────────────────────────────────────────────────────────┤
│  Auth                                                            │
│    └── Sign in with Apple → JWT tokens                          │
├─────────────────────────────────────────────────────────────────┤
│  Edge Functions (Deno)                                          │
│    └── classify-transcript                                      │
│          ├── Input: transcript, blocks[], guardrails[]          │
│          ├── Calls: Claude API (claude-sonnet-4-20250514)             │
│          └── Output: ClassificationResult                       │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL Database                                            │
│    ├── users (linked to auth.users)                             │
│    ├── user_settings                                            │
│    ├── identities                                               │
│    ├── building_blocks                                          │
│    ├── guardrails                                               │
│    ├── building_block_logs                                      │
│    ├── guardrail_logs                                           │
│    └── ... (triggers, check_ins, scheduled_*, weekly_summaries) │
├─────────────────────────────────────────────────────────────────┤
│  Row Level Security (RLS)                                       │
│    └── All tables: users can only access their own data         │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Structure

### Services

| File | Purpose |
|------|---------|
| `Services/SupabaseManager.swift` | Singleton Supabase client |
| `Services/SupabaseAuthService.swift` | Sign in with Apple integration |
| `Services/ClaudeAIService.swift` | Edge function calls for AI classification |
| `Services/SwiftDataService.swift` | Local data persistence |
| `Services/Logger.swift` | Structured logging with OSLog |

### Key Swift Files

```
Backmind_v1/
├── Config/
│   └── AppConfig.swift          # Supabase URL + anon key from xcconfig
├── DI/
│   └── DependencyContainer.swift # Protocol-based dependency injection
├── Services/
│   ├── SupabaseManager.swift    # SupabaseClient singleton
│   ├── SupabaseAuthService.swift # Auth with Apple Sign-in
│   ├── ClaudeAIService.swift    # AI classification via edge function
│   ├── SwiftDataService.swift   # Local SwiftData CRUD
│   └── Logger.swift             # AppLog for debugging
├── ViewModels/
│   ├── OnboardingViewModel.swift # Manages onboarding state + saves data
│   ├── DashboardViewModel.swift  # Dashboard data queries
│   └── VoiceLoggingViewModel.swift # Voice recording + AI classification
└── Models/
    ├── SwiftData/               # @Model classes (SDIdentity, etc.)
    └── DisplayTypeConversions.swift # SD* → Display type mapping
```

---

## Database Schema

### Core Tables

```sql
-- Users (linked to Supabase Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    apple_user_id TEXT UNIQUE,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Identities (e.g., "Healthy Person", "Good Partner")
CREATE TABLE identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 50),
    icon TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Building Blocks (positive habits)
CREATE TABLE building_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    identity_id UUID REFERENCES identities(id) ON DELETE CASCADE,
    text TEXT NOT NULL CHECK (char_length(text) BETWEEN 1 AND 100),
    frequency INTEGER NOT NULL CHECK (frequency > 0),
    frequency_period frequency_period NOT NULL DEFAULT 'weekly',
    outcome TEXT,
    obstacle TEXT,
    plan TEXT,
    -- MVP Feature Fields (05-11)
    consecutive_misses INTEGER DEFAULT 0,        -- Feature 05: Never Miss Twice
    bad_day_version TEXT,                        -- Feature 06: Bad Day Mode
    conditions TEXT,                             -- Feature 10: Conditions for Success
    learning_mode BOOLEAN DEFAULT FALSE,         -- Feature 11: Learning Mode
    learning_mode_end_date TIMESTAMPTZ,          -- Feature 11: Learning Mode
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guardrails (limits on negative behaviors)
CREATE TABLE guardrails (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    limit_count INTEGER NOT NULL CHECK (limit_count > 0),
    frequency_period frequency_period NOT NULL DEFAULT 'weekly',
    temptation_context TEXT,
    why_statement TEXT,
    -- MVP Feature Fields (08)
    weeks_over_limit INTEGER DEFAULT 0,          -- Feature 08: Slip and Continue
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Building Block Logs (each log = 1 completion, each "block" cast for identity)
CREATE TABLE building_block_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID REFERENCES building_blocks(id) ON DELETE CASCADE,
    transcript TEXT,
    confidence DOUBLE PRECISION,
    -- MVP Feature Fields (06)
    is_bad_day_version BOOLEAN DEFAULT FALSE,    -- Feature 06: Bad Day Mode
    created_at TIMESTAMPTZ DEFAULT NOW(),
    synced_at TIMESTAMPTZ
);

-- Guardrail Logs (count can be > 1)
CREATE TABLE guardrail_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guardrail_id UUID REFERENCES guardrails(id) ON DELETE CASCADE,
    count INTEGER NOT NULL DEFAULT 1,
    is_zero BOOLEAN NOT NULL DEFAULT FALSE,
    transcript TEXT,
    confidence DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    synced_at TIMESTAMPTZ
);
```

### Enums

```sql
CREATE TYPE frequency_period AS ENUM ('daily', 'weekly');
CREATE TYPE queue_item_type AS ENUM ('voiceLog', 'manualLog', 'settingsUpdate');
CREATE TYPE queue_item_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE nudge_status AS ENUM ('scheduled', 'sent', 'responded', 'missed', 'cancelled');
CREATE TYPE check_in_type AS ENUM ('opening', 'closing');
CREATE TYPE check_in_status AS ENUM ('scheduled', 'sent', 'responded', 'missed', 'cancelled');
CREATE TYPE check_in_cadence AS ENUM ('monthly', 'quarterly');  -- Feature 12: Seasonal Check-ins
```

### User Settings (MVP Feature Fields)

```sql
-- Note: Add these columns to existing user_settings table
ALTER TABLE user_settings ADD COLUMN weekly_summary_day INTEGER DEFAULT 1;        -- 1=Sunday
ALTER TABLE user_settings ADD COLUMN weekly_summary_hour INTEGER DEFAULT 18;      -- 6pm
ALTER TABLE user_settings ADD COLUMN previsualization_enabled BOOLEAN DEFAULT TRUE;
ALTER TABLE user_settings ADD COLUMN check_in_cadence check_in_cadence DEFAULT 'monthly';
ALTER TABLE user_settings ADD COLUMN last_seasonal_check_in TIMESTAMPTZ;
```

### Nudge History (Feature 09: Nudge Variety)

```sql
-- Track nudges shown to prevent repetition
CREATE TABLE nudge_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    block_id UUID REFERENCES building_blocks(id) ON DELETE CASCADE,
    nudge_text TEXT NOT NULL,
    nudge_type TEXT NOT NULL,  -- 'getting_started', 'never_miss_twice', 'bad_day_offer', etc.
    shown_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_nudge_history_block_recent
    ON nudge_history(block_id, shown_at DESC);

-- RLS policy
CREATE POLICY nudge_history_own ON nudge_history
    FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
```

### Row Level Security

All tables have RLS enabled with policies ensuring users can only access their own data:

```sql
-- Example: identities table
CREATE POLICY identities_own ON identities
    FOR ALL USING (user_id IN (SELECT id FROM users WHERE auth_id = auth.uid()));
```

---

## Edge Function: classify-transcript

### Location
`supabase/functions/classify-transcript/index.ts`

### Purpose
Classifies voice transcripts against user's building blocks and guardrails using Claude AI.

### Request Format
```typescript
{
  transcript: string,
  blocks: [{
    id: string,
    text: string,
    frequency: number
  }],
  guardrails: [{
    id: string,
    text: string,
    limitCount: number
  }]
}
```

### Response Format
```typescript
{
  matchType: 'buildingBlock' | 'guardrail' | 'noMatch',
  matchedId: string | null,
  matchedText: string | null,
  count: number | null,      // For guardrails: how many (e.g., "2 beers")
  isZero: boolean,           // True if user said "zero" or "none"
  confidence: number,        // 0.0 to 1.0
  reasoning: string          // Brief explanation
}
```

### Deployment
```bash
# Set Anthropic API key
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Deploy function
supabase functions deploy classify-transcript
```

---

## Swift Service Details

### SupabaseManager.swift

Singleton providing access to the Supabase client:

```swift
final class SupabaseManager: Sendable {
    static let shared = SupabaseManager()
    let client: SupabaseClient

    private init() {
        client = SupabaseClient(
            supabaseURL: AppConfig.supabaseURL,
            supabaseKey: AppConfig.supabaseAnonKey
        )
    }
}
```

### ClaudeAIService.swift

Calls the edge function for AI classification:

```swift
final class ClaudeAIService: AIServiceProtocol, Sendable {
    func classifyTranscript(
        _ transcript: String,
        blocks: [SDBuildingBlock],
        guardrails: [SDGuardrail]
    ) async throws -> ClassificationResult {
        let request = ClassifyRequest(
            transcript: transcript,
            blocks: blocks.map { BlockInput(id: $0.id.uuidString, text: $0.text, frequency: $0.frequency) },
            guardrails: guardrails.map { GuardrailInput(id: $0.id.uuidString, text: $0.text, limitCount: $0.limitCount) }
        )

        let responseData: Data = try await SupabaseManager.shared.client.functions.invoke(
            "classify-transcript",
            options: FunctionInvokeOptions(body: request)
        )

        // Decode and return ClassificationResult
    }
}
```

### SupabaseAuthService.swift

Handles Sign in with Apple via Supabase:

```swift
@MainActor
final class SupabaseAuthService: NSObject, AuthServiceProtocol {
    func signInWithApple() async throws -> String {
        // 1. Generate nonce
        // 2. Present ASAuthorizationController
        // 3. Get Apple ID token
        // 4. Call supabase.auth.signInWithIdToken()
        // 5. Create/get user record in 'users' table
        // 6. Return userId
    }
}
```

---

## Data Flow

### 1. Onboarding Flow
```
User creates identity → OnboardingViewModel.createIdentity()
                      → SwiftDataService.createIdentity()
                      → Saves to SwiftData (local)
                      → (Future: sync to Supabase)
```

### 2. Voice Logging Flow
```
User speaks → AppleSpeechService transcribes
           → ClaudeAIService.classifyTranscript()
           → Edge function calls Claude API
           → Returns ClassificationResult
           → SwiftDataService.createBlockLog() or createGuardrailLog()
           → Saves to SwiftData
           → (Future: sync to Supabase)
```

### 3. Dashboard Flow
```
DashboardView appears → @Query fetches SDIdentity from SwiftData
                      → Displays progress using computed properties
                      → (completedThisPeriod, healthPercentage, etc.)
```

---

## Configuration

### Xcode xcconfig Files

Create `Config/Development.xcconfig` and `Config/Production.xcconfig`:

```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### AppConfig.swift

```swift
enum AppConfig {
    static var supabaseURL: URL {
        guard let urlString = Bundle.main.infoDictionary?["SUPABASE_URL"] as? String,
              let url = URL(string: urlString) else {
            fatalError("SUPABASE_URL not configured")
        }
        return url
    }

    static var supabaseAnonKey: String {
        guard let key = Bundle.main.infoDictionary?["SUPABASE_ANON_KEY"] as? String else {
            fatalError("SUPABASE_ANON_KEY not configured")
        }
        return key
    }
}
```

---

## Debugging

### AppLog (Logger.swift)

Structured logging with categories:

```swift
AppLog.ai.info("Classification result: \(result)")
AppLog.auth.info("User signed in: \(userId)")
AppLog.data.info("Created block: \(block.text)")
AppLog.error("Failed to sync", error: error, category: AppLog.sync)
```

### Debug Menu

In DEBUG builds, shake the device to open the debug menu:
- Test AI classification
- View app info (bundle ID, version)
- Test edge function connection

---

## Future Work

### Bidirectional Sync
- [ ] Implement SupabaseSyncService for remote sync
- [ ] Conflict resolution strategy (last-write-wins or merge)
- [ ] Offline queue for pending changes

### Push Notifications
- [ ] Store device tokens in user_settings
- [ ] Schedule nudges via Supabase scheduled functions
- [ ] Handle notification responses

### Weekly Summaries
- [ ] Edge function to generate AI insights
- [ ] Aggregate identity health scores
- [ ] Send weekly digest notifications

---

## Appendix: Full SQL Schema

See: `Docs/17-supabase-backend-tdd.md` or run the SQL in `supabase/migrations/` (if created).

The complete schema includes:
- 13 tables (users, user_settings, identities, building_blocks, guardrails, etc.)
- 6 enums (frequency_period, queue_item_type, etc.)
- RLS policies for all tables
- Indexes for performance
- Triggers for updated_at timestamps


---
<!-- Source: TDD/02-widget-implementation.md -->

Here's the complete unified prompt:

---

## Claude Code Prompt: Backmind Widgets — Voice-First with Premium Styling

**Context**: Backmind is a voice-first iOS accountability app for identity-based habit tracking, designed for neurodivergent users. The app uses Satoshi font, a BM design system prefix, and established visual patterns including orb-style AI elements, mesh gradients, and pace-aware status colors.

**Widget Philosophy**: Widgets are action surfaces, not dashboards. The primary interaction is capturing a log with minimum friction. Status is ambient (communicated through color/background), not explicit (text and numbers).

**Key Principle**: One tap from widget → speaking. No intermediate screens.

**Visual Principle**: Widgets should feel like an extension of Backmind's premium AI aesthetic, not generic iOS widgets. The orb, mesh gradients, and Satoshi typography must carry through.

---

### 1. XCODE PROJECT SETUP

**Create Widget Extension Target:**
- Target name: `BackmindWidgets`
- Bundle identifier: `[your-bundle-id].BackmindWidgets`
- Enable App Group capability on both main app and widget extension
- App Group identifier: `group.com.backmind.shared`

**Add to Widget Extension Target:**
- Satoshi font files (Satoshi-Regular.otf, Satoshi-Medium.otf, Satoshi-Bold.otf)
- Update Info.plist with font references

**Add URL Scheme to Main App Info.plist:**
```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>backmind</string>
        </array>
    </dict>
</array>
```

---

### 2. SHARED STYLING COMPONENTS

**File: `BackmindWidgets/WidgetStyles.swift`**

```swift
import SwiftUI
import WidgetKit

// MARK: - Colors

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
    
    // Pace Status Colors
    static let paceAhead = Color(hex: "#0D9488")       // Teal
    static let paceOnTrack = Color(hex: "#22C55E")    // Green
    static let paceRecoverable = Color(hex: "#F59E0B") // Amber
    static let paceToughWeek = Color(hex: "#94A3B8")  // Slate (NOT red)
    
    // Accent Blues (for orb)
    static let accentBlue = Color(hex: "#3B82F6")
    static let accentBlueDeep = Color(hex: "#2563EB")
    static let accentBlueDark = Color(hex: "#1D4ED8")
    
    // Backgrounds
    static let widgetBackground = Color(hex: "#FAFAF9")
}

// MARK: - Typography

extension Font {
    static func satoshi(_ weight: SatoshiWeight, size: CGFloat) -> Font {
        .custom(weight.fontName, size: size)
    }
    
    enum SatoshiWeight {
        case regular, medium, bold
        
        var fontName: String {
            switch self {
            case .regular: return "Satoshi-Regular"
            case .medium: return "Satoshi-Medium"
            case .bold: return "Satoshi-Bold"
            }
        }
    }
    
    // Widget-specific presets
    static let widgetLabel = Font.satoshi(.medium, size: 13)
    static let widgetCaption = Font.satoshi(.regular, size: 11)
    static let widgetCaptionSmall = Font.satoshi(.medium, size: 10)
    static let widgetTitle = Font.satoshi(.bold, size: 15)
}

// MARK: - Status Enums

enum WidgetPaceStatus: String, Codable {
    case ahead, onTrack, recoverable, toughWeek
    
    var color: Color {
        switch self {
        case .ahead:       return .paceAhead
        case .onTrack:     return .paceOnTrack
        case .recoverable: return .paceRecoverable
        case .toughWeek:   return .paceToughWeek
        }
    }
    
    var shortLabel: String {
        switch self {
        case .ahead:       return "Ahead"
        case .onTrack:     return "On track"
        case .recoverable: return "Behind"
        case .toughWeek:   return "Tough week"
        }
    }
}

enum WidgetOverallStatus: String, Codable {
    case thriving     // All ahead or on track
    case progressing  // Mostly on track
    case challenging  // Mixed or recoverable
    case neutral      // Tough week or no data
    
    var color: Color {
        switch self {
        case .thriving:    return .paceAhead
        case .progressing: return .paceOnTrack
        case .challenging: return .paceRecoverable
        case .neutral:     return .paceToughWeek
        }
    }
}
```

---

### 3. ORB BUTTON COMPONENT

**File: `BackmindWidgets/WidgetOrbButton.swift`**

The orb is Backmind's AI signature. It must appear in all widgets.

```swift
import SwiftUI

struct WidgetOrbButton: View {
    var size: CGFloat = 52
    
    var body: some View {
        ZStack {
            // Outer glow layer 2 (softest)
            Circle()
                .fill(Color.accentBlue.opacity(0.12))
                .frame(width: size + 20, height: size + 20)
                .blur(radius: 10)
            
            // Outer glow layer 1
            Circle()
                .fill(Color.accentBlue.opacity(0.2))
                .frame(width: size + 10, height: size + 10)
                .blur(radius: 6)
            
            // Core orb with radial gradient
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color.accentBlue,
                            Color.accentBlueDeep,
                            Color.accentBlueDark
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: size / 2
                    )
                )
                .frame(width: size, height: size)
                .shadow(color: Color.accentBlue.opacity(0.4), radius: 8, x: 0, y: 4)
            
            // Mic icon
            Image(systemName: "mic.fill")
                .font(.system(size: size * 0.42, weight: .medium))
                .foregroundColor(.white)
        }
    }
}

// Smaller variant for lock screen
struct WidgetOrbButtonCompact: View {
    var size: CGFloat = 28
    let statusColor: Color
    
    var body: some View {
        ZStack {
            // Subtle glow using status color
            Circle()
                .fill(statusColor.opacity(0.25))
                .frame(width: size + 6, height: size + 6)
                .blur(radius: 3)
            
            // Core
            Circle()
                .fill(
                    RadialGradient(
                        colors: [
                            Color.accentBlue,
                            Color.accentBlueDeep
                        ],
                        center: .center,
                        startRadius: 0,
                        endRadius: size / 2
                    )
                )
                .frame(width: size, height: size)
            
            // Icon
            Image(systemName: "mic.fill")
                .font(.system(size: size * 0.45, weight: .medium))
                .foregroundColor(.white)
        }
    }
}
```

---

### 4. MESH GRADIENT BACKGROUND

**File: `BackmindWidgets/WidgetMeshBackground.swift`**

```swift
import SwiftUI

struct WidgetMeshBackground: View {
    let status: WidgetOverallStatus
    
    var body: some View {
        if #available(iOS 18.0, *) {
            MeshGradient(
                width: 3,
                height: 3,
                points: [
                    SIMD2(0, 0), SIMD2(0.5, 0), SIMD2(1, 0),
                    SIMD2(0, 0.5), SIMD2(0.5, 0.5), SIMD2(1, 0.5),
                    SIMD2(0, 1), SIMD2(0.5, 1), SIMD2(1, 1)
                ],
                colors: meshColors
            )
        } else {
            // Fallback for iOS 17 and earlier
            LinearGradient(
                colors: [
                    status.color.opacity(0.1),
                    Color(.systemBackground),
                    Color(.systemBackground)
                ],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        }
    }
    
    @available(iOS 18.0, *)
    private var meshColors: [Color] {
        let primary = status.color
        let bg = Color(.systemBackground)
        
        return [
            primary.opacity(0.15), bg, bg,
            primary.opacity(0.08), bg, primary.opacity(0.05),
            bg, primary.opacity(0.03), bg
        ]
    }
}

// Simpler gradient for medium widget (less intense)
struct WidgetSubtleBackground: View {
    let status: WidgetOverallStatus
    
    var body: some View {
        if #available(iOS 18.0, *) {
            MeshGradient(
                width: 2,
                height: 2,
                points: [
                    SIMD2(0, 0), SIMD2(1, 0),
                    SIMD2(0, 1), SIMD2(1, 1)
                ],
                colors: [
                    status.color.opacity(0.08),
                    Color(.systemBackground),
                    Color(.systemBackground),
                    status.color.opacity(0.05)
                ]
            )
        } else {
            Color(.systemBackground)
        }
    }
}
```

---

### 5. DATA MODELS

**File: `BackmindWidgets/WidgetDataModels.swift`**

```swift
import WidgetKit
import SwiftUI

// MARK: - Timeline Entry

struct BackmindWidgetEntry: TimelineEntry {
    let date: Date
    let overallStatus: WidgetOverallStatus
    let overallProgress: Double // 0-1 for lock screen ring
    let topIncompleteBlocks: [WidgetBlock]
    let nextTrigger: WidgetNextTrigger?
    
    // Placeholder for widget gallery
    static var placeholder: BackmindWidgetEntry {
        BackmindWidgetEntry(
            date: Date(),
            overallStatus: .progressing,
            overallProgress: 0.65,
            topIncompleteBlocks: [
                WidgetBlock(id: "1", shortName: "Exercise", shortProgress: "2/4", status: .onTrack),
                WidgetBlock(id: "2", shortName: "Stretch", shortProgress: "5/7", status: .ahead),
                WidgetBlock(id: "3", shortName: "Deep work", shortProgress: "3/7", status: .recoverable)
            ],
            nextTrigger: WidgetNextTrigger(
                blockId: "1",
                blockName: "Exercise",
                shortBlockName: "Exercise",
                identityIcon: "🏃",
                triggerTime: Date().addingTimeInterval(7200)
            )
        )
    }
    
    // Empty state
    static var empty: BackmindWidgetEntry {
        BackmindWidgetEntry(
            date: Date(),
            overallStatus: .neutral,
            overallProgress: 0,
            topIncompleteBlocks: [],
            nextTrigger: nil
        )
    }
}

// MARK: - Supporting Models

struct WidgetBlock: Identifiable, Codable {
    let id: String
    let shortName: String      // "Exercise" not "Exercise 4x/week"
    let shortProgress: String  // "2/4" or "✓"
    let status: WidgetPaceStatus
}

struct WidgetNextTrigger: Codable {
    let blockId: String
    let blockName: String
    let shortBlockName: String
    let identityIcon: String
    let triggerTime: Date
    
    var countdown: String {
        let interval = triggerTime.timeIntervalSince(Date())
        
        if interval <= 0 {
            return "Now"
        } else if interval < 3600 {
            let minutes = Int(interval / 60)
            return "in \(minutes)m"
        } else if interval < 86400 {
            let hours = Int(interval / 3600)
            return "in \(hours)h"
        } else {
            let days = Int(interval / 86400)
            return "in \(days)d"
        }
    }
}

// MARK: - Shared Data Container

struct WidgetDataContainer: Codable {
    let overallStatus: WidgetOverallStatus
    let overallProgress: Double
    let topIncompleteBlocks: [WidgetBlock]
    let nextTrigger: WidgetNextTrigger?
    let lastUpdated: Date
}
```

---

### 6. TIMELINE PROVIDER

**File: `BackmindWidgets/WidgetTimelineProvider.swift`**

```swift
import WidgetKit
import SwiftUI

struct BackmindTimelineProvider: TimelineProvider {
    private let suiteName = "group.com.backmind.shared"
    private let dataKey = "widgetData"
    
    func placeholder(in context: Context) -> BackmindWidgetEntry {
        .placeholder
    }
    
    func getSnapshot(in context: Context, completion: @escaping (BackmindWidgetEntry) -> Void) {
        let entry = fetchCurrentEntry()
        completion(entry)
    }
    
    func getTimeline(in context: Context, completion: @escaping (Timeline<BackmindWidgetEntry>) -> Void) {
        let entry = fetchCurrentEntry()
        
        // Refresh every 15 minutes or at next trigger time
        let refreshDate: Date
        if let nextTrigger = entry.nextTrigger {
            // Refresh slightly before trigger time
            let triggerRefresh = nextTrigger.triggerTime.addingTimeInterval(-60)
            let regularRefresh = Date().addingTimeInterval(15 * 60)
            refreshDate = min(triggerRefresh, regularRefresh)
        } else {
            refreshDate = Date().addingTimeInterval(15 * 60)
        }
        
        let timeline = Timeline(entries: [entry], policy: .after(refreshDate))
        completion(timeline)
    }
    
    private func fetchCurrentEntry() -> BackmindWidgetEntry {
        guard let sharedDefaults = UserDefaults(suiteName: suiteName),
              let data = sharedDefaults.data(forKey: dataKey),
              let container = try? JSONDecoder().decode(WidgetDataContainer.self, from: data)
        else {
            return .empty
        }
        
        return BackmindWidgetEntry(
            date: Date(),
            overallStatus: container.overallStatus,
            overallProgress: container.overallProgress,
            topIncompleteBlocks: container.topIncompleteBlocks,
            nextTrigger: container.nextTrigger
        )
    }
}
```

---

### 7. SMALL WIDGET — VOICE LOG BUTTON

**File: `BackmindWidgets/SmallWidget.swift`**

The entire widget is a tap target to launch voice recording. Status is communicated through the ambient mesh gradient background.

```swift
import SwiftUI
import WidgetKit

struct SmallWidgetView: View {
    let entry: BackmindWidgetEntry
    
    var body: some View {
        Link(destination: URL(string: "backmind://log")!) {
            VStack(spacing: 10) {
                Spacer()
                
                // Orb button (visual, entire widget is tappable)
                WidgetOrbButton(size: 48)
                
                // Label
                Text("Log")
                    .font(.satoshi(.medium, size: 14))
                    .foregroundColor(.primary)
                
                Spacer()
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .containerBackground(for: .widget) {
            WidgetMeshBackground(status: entry.overallStatus)
        }
    }
}

struct SmallWidget: Widget {
    let kind: String = "SmallWidget"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: BackmindTimelineProvider()) { entry in
            SmallWidgetView(entry: entry)
        }
        .configurationDisplayName("Quick Log")
        .description("One tap to log with your voice")
        .supportedFamilies([.systemSmall])
    }
}
```

**Visual Result:**
```
┌─────────────────┐
│ ░░░░░░░░░░░░░░░ │  ← Mesh gradient (status tinted)
│      ◉         │  ← Orb with glow
│     Log         │  ← Satoshi Medium
│ ░░░░░░░░░░░░░░░ │
└─────────────────┘
Entire widget = tap target → opens voice recording
```

---

### 8. MEDIUM WIDGET — VOICE LOG + QUICK TAPS

**File: `BackmindWidgets/MediumWidget.swift`**

Left side: prominent voice log. Right side: quick-tap individual habits for instant logging.

```swift
import SwiftUI
import WidgetKit

struct MediumWidgetView: View {
    let entry: BackmindWidgetEntry
    
    var body: some View {
        HStack(spacing: 0) {
            // Left: Voice Log (primary action)
            Link(destination: URL(string: "backmind://log")!) {
                VStack(spacing: 10) {
                    WidgetOrbButton(size: 52)
                    
                    Text("Voice Log")
                        .font(.satoshi(.medium, size: 12))
                        .foregroundColor(.primary)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
            
            // Divider
            Rectangle()
                .fill(Color.primary.opacity(0.1))
                .frame(width: 1)
                .padding(.vertical, 16)
            
            // Right: Quick tap habits
            VStack(alignment: .leading, spacing: 8) {
                // Header
                Text("QUICK LOG")
                    .font(.satoshi(.medium, size: 9))
                    .foregroundColor(.secondary)
                    .tracking(0.5)
                
                if entry.topIncompleteBlocks.isEmpty {
                    // All done state
                    VStack(spacing: 4) {
                        Text("✓")
                            .font(.system(size: 20))
                            .foregroundColor(.paceOnTrack)
                        Text("All caught up")
                            .font(.satoshi(.regular, size: 11))
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else {
                    // Habit quick-tap rows
                    ForEach(entry.topIncompleteBlocks.prefix(3)) { block in
                        QuickLogRow(block: block)
                    }
                    
                    Spacer(minLength: 0)
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 14)
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .containerBackground(for: .widget) {
            WidgetSubtleBackground(status: entry.overallStatus)
        }
    }
}

struct QuickLogRow: View {
    let block: WidgetBlock
    
    var body: some View {
        Link(destination: URL(string: "backmind://quicklog/\(block.id)")!) {
            HStack(spacing: 8) {
                // Left status indicator (mirrors identity card left border)
                RoundedRectangle(cornerRadius: 1.5)
                    .fill(block.status.color)
                    .frame(width: 3, height: 22)
                
                // Block name
                Text(block.shortName)
                    .font(.satoshi(.medium, size: 12))
                    .foregroundColor(.primary)
                    .lineLimit(1)
                
                Spacer(minLength: 4)
                
                // Progress
                Text(block.shortProgress)
                    .font(.satoshi(.regular, size: 11))
                    .foregroundColor(.secondary)
            }
            .padding(.vertical, 6)
            .padding(.horizontal, 8)
            .background(Color(.systemBackground))
            .cornerRadius(8)
            .shadow(color: .black.opacity(0.04), radius: 2, x: 0, y: 1)
        }
    }
}

struct MediumWidget: Widget {
    let kind: String = "MediumWidget"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: BackmindTimelineProvider()) { entry in
            MediumWidgetView(entry: entry)
        }
        .configurationDisplayName("Backmind")
        .description("Voice log and quick habit logging")
        .supportedFamilies([.systemMedium])
    }
}
```

**Visual Result:**
```
┌─────────────────────────────────┐
│           │  QUICK LOG          │
│    ◉      │  ┃ Exercise    2/4  │  ← Left border = status color
│  Voice    │  ┃ Stretch     5/7  │  ← Tappable rows
│   Log     │  ┃ Deep work   3/7  │
│           │                     │
└─────────────────────────────────┘
Left: Orb (tap → voice recording)
Right: Rows (tap → instant log)
```

---

### 9. LOCK SCREEN WIDGETS

**File: `BackmindWidgets/LockScreenWidgets.swift`**

```swift
import SwiftUI
import WidgetKit

// MARK: - Circular Widget

struct LockScreenCircularView: View {
    let entry: BackmindWidgetEntry
    
    var body: some View {
        Link(destination: URL(string: "backmind://log")!) {
            ZStack {
                // Background ring (ambient status)
                Circle()
                    .stroke(
                        entry.overallStatus.color.opacity(0.3),
                        lineWidth: 3
                    )
                
                // Progress arc
                Circle()
                    .trim(from: 0, to: entry.overallProgress)
                    .stroke(
                        entry.overallStatus.color,
                        style: StrokeStyle(lineWidth: 3, lineCap: .round)
                    )
                    .rotationEffect(.degrees(-90))
                
                // Center: Mini orb
                WidgetOrbButtonCompact(size: 24, statusColor: entry.overallStatus.color)
            }
            .padding(2)
        }
    }
}

struct LockScreenCircularWidget: Widget {
    let kind: String = "LockScreenCircular"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: BackmindTimelineProvider()) { entry in
            LockScreenCircularView(entry: entry)
        }
        .configurationDisplayName("Status Ring")
        .description("Tap to log, ring shows progress")
        .supportedFamilies([.accessoryCircular])
    }
}

// MARK: - Rectangular Widget

struct LockScreenRectangularView: View {
    let entry: BackmindWidgetEntry
    
    var body: some View {
        Link(destination: URL(string: "backmind://log")!) {
            HStack(spacing: 10) {
                // Left: Mini orb
                ZStack {
                    Circle()
                        .fill(entry.overallStatus.color.opacity(0.2))
                        .frame(width: 32, height: 32)
                    
                    Image(systemName: "mic.fill")
                        .font(.system(size: 14, weight: .semibold))
                        .foregroundColor(entry.overallStatus.color)
                }
                
                // Right: Text
                VStack(alignment: .leading, spacing: 2) {
                    Text("Log to Backmind")
                        .font(.system(size: 13, weight: .semibold))
                    
                    if let trigger = entry.nextTrigger {
                        Text("Next: \(trigger.shortBlockName) \(trigger.countdown)")
                            .font(.system(size: 11))
                            .foregroundStyle(.secondary)
                    } else {
                        Text("All caught up ✓")
                            .font(.system(size: 11))
                            .foregroundStyle(.secondary)
                    }
                }
                
                Spacer(minLength: 0)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
}

struct LockScreenRectangularWidget: Widget {
    let kind: String = "LockScreenRectangular"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: BackmindTimelineProvider()) { entry in
            LockScreenRectangularView(entry: entry)
        }
        .configurationDisplayName("Quick Log")
        .description("Tap to log with next trigger hint")
        .supportedFamilies([.accessoryRectangular])
    }
}

// MARK: - Inline Widget

struct LockScreenInlineView: View {
    let entry: BackmindWidgetEntry
    
    var body: some View {
        Link(destination: URL(string: "backmind://log")!) {
            if let trigger = entry.nextTrigger {
                Label(
                    "\(trigger.identityIcon) \(trigger.shortBlockName) \(trigger.countdown)",
                    systemImage: "mic.fill"
                )
            } else {
                Label("Log to Backmind", systemImage: "mic.fill")
            }
        }
    }
}

struct LockScreenInlineWidget: Widget {
    let kind: String = "LockScreenInline"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: BackmindTimelineProvider()) { entry in
            LockScreenInlineView(entry: entry)
        }
        .configurationDisplayName("Status Line")
        .description("Shows next trigger above clock")
        .supportedFamilies([.accessoryInline])
    }
}
```

**Visual Results:**

Circular:
```
    ╭───────╮
   │   ◉   │  ← Mini orb (tap to log)
   │  ━━━   │  ← Progress ring (status color)
    ╰───────╯
```

Rectangular:
```
┌─────────────────────┐
│ ◉ Log to Backmind   │  ← Tap to log
│   Next: Run in 2h   │  ← Hint (not primary)
└─────────────────────┘
```

Inline:
```
🎤 🏃 Exercise in 2h
```

---

### 10. WIDGET BUNDLE ENTRY POINT

**File: `BackmindWidgets/BackmindWidgets.swift`**

```swift
import WidgetKit
import SwiftUI

@main
struct BackmindWidgets: WidgetBundle {
    var body: some Widget {
        SmallWidget()
        MediumWidget()
        LockScreenCircularWidget()
        LockScreenRectangularWidget()
        LockScreenInlineWidget()
    }
}
```

---

### 11. MAIN APP: WIDGET DATA SERVICE

**File: `Backmind_v1/Services/WidgetDataService.swift`**

```swift
import Foundation
import WidgetKit

class WidgetDataService {
    static let shared = WidgetDataService()
    
    private let suiteName = "group.com.backmind.shared"
    private let dataKey = "widgetData"
    
    private init() {}
    
    /// Call after any data change: logging, editing, app launch
    func updateWidgetData(identities: [Identity]) {
        let container = buildWidgetData(from: identities)
        
        guard let sharedDefaults = UserDefaults(suiteName: suiteName),
              let encoded = try? JSONEncoder().encode(container)
        else { return }
        
        sharedDefaults.set(encoded, forKey: dataKey)
        
        // Trigger widget refresh
        WidgetCenter.shared.reloadAllTimelines()
    }
    
    private func buildWidgetData(from identities: [Identity]) -> WidgetDataContainer {
        // Calculate overall status
        let overallStatus = calculateOverallStatus(identities)
        
        // Calculate overall progress (0-1)
        let overallProgress = calculateOverallProgress(identities)
        
        // Get top incomplete blocks (sorted by trigger time, then completion %)
        let incompleteBlocks = getTopIncompleteBlocks(from: identities)
        
        // Find next trigger
        let nextTrigger = findNextTrigger(from: identities)
        
        return WidgetDataContainer(
            overallStatus: overallStatus,
            overallProgress: overallProgress,
            topIncompleteBlocks: incompleteBlocks,
            nextTrigger: nextTrigger,
            lastUpdated: Date()
        )
    }
    
    private func calculateOverallStatus(_ identities: [Identity]) -> WidgetOverallStatus {
        guard !identities.isEmpty else { return .neutral }
        
        let statuses = identities.map { $0.paceStatus }
        
        if statuses.allSatisfy({ $0 == .ahead }) {
            return .thriving
        } else if statuses.allSatisfy({ $0 == .ahead || $0 == .onTrack }) {
            return .progressing
        } else if statuses.contains(.toughWeek) {
            return .neutral
        } else {
            return .challenging
        }
    }
    
    private func calculateOverallProgress(_ identities: [Identity]) -> Double {
        guard !identities.isEmpty else { return 0 }
        
        let totalProgress = identities.reduce(0.0) { sum, identity in
            sum + identity.weeklyCompletionRate
        }
        
        return totalProgress / Double(identities.count)
    }
    
    private func getTopIncompleteBlocks(from identities: [Identity]) -> [WidgetBlock] {
        var allBlocks: [(block: BuildingBlock, identity: Identity)] = []
        
        for identity in identities {
            for block in identity.buildingBlocks where !block.isCompleteThisWeek {
                allBlocks.append((block, identity))
            }
        }
        
        // Sort by: nearest trigger time, then by lowest completion %
        let sorted = allBlocks.sorted { a, b in
            if let triggerA = a.block.nextTriggerTime, let triggerB = b.block.nextTriggerTime {
                return triggerA < triggerB
            }
            return a.block.completionRate < b.block.completionRate
        }
        
        return sorted.prefix(3).map { item in
            WidgetBlock(
                id: item.block.id,
                shortName: item.block.shortName,
                shortProgress: item.block.shortProgressDisplay,
                status: WidgetPaceStatus(from: item.block.paceStatus)
            )
        }
    }
    
    private func findNextTrigger(from identities: [Identity]) -> WidgetNextTrigger? {
        var nearestTrigger: (block: BuildingBlock, identity: Identity, time: Date)?
        
        for identity in identities {
            for block in identity.buildingBlocks {
                guard let triggerTime = block.nextTriggerTime,
                      triggerTime > Date()
                else { continue }
                
                if nearestTrigger == nil || triggerTime < nearestTrigger!.time {
                    nearestTrigger = (block, identity, triggerTime)
                }
            }
        }
        
        guard let nearest = nearestTrigger else { return nil }
        
        return WidgetNextTrigger(
            blockId: nearest.block.id,
            blockName: nearest.block.name,
            shortBlockName: nearest.block.shortName,
            identityIcon: nearest.identity.icon,
            triggerTime: nearest.time
        )
    }
}

// Extension to convert app status to widget status
extension WidgetPaceStatus {
    init(from appStatus: PaceStatus) {
        switch appStatus {
        case .ahead: self = .ahead
        case .onTrack: self = .onTrack
        case .recoverable: self = .recoverable
        case .toughWeek: self = .toughWeek
        }
    }
}
```

---

### 12. MAIN APP: DEEP LINK HANDLING

**File: Update `Backmind_v1App.swift` or main ContentView**

```swift
import SwiftUI

@main
struct BackmindApp: App {
    @StateObject private var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
                .onOpenURL { url in
                    handleDeepLink(url)
                }
        }
    }
    
    private func handleDeepLink(_ url: URL) {
        guard url.scheme == "backmind" else { return }
        
        switch url.host {
        case "log":
            // Open voice recording
            appState.showVoiceRecording = true
            
        case "quicklog":
            // Instant log for specific block
            if let blockId = url.pathComponents.dropFirst().first {
                performQuickLog(blockId: blockId)
            }
            
        case "dashboard":
            // Navigate to dashboard (default)
            appState.selectedTab = .dashboard
            
        case "identity":
            // Open specific identity
            if let identityId = url.pathComponents.dropFirst().first {
                appState.navigateToIdentity(id: identityId)
            }
            
        default:
            break
        }
    }
    
    private func performQuickLog(blockId: String) {
        // Find block and increment by 1
        guard let block = appState.findBlock(id: blockId) else { return }
        
        // Log immediately
        appState.logBlock(block, count: 1)
        
        // Show brief toast confirmation
        appState.showToast(
            message: "✓ \(block.shortName) logged",
            style: .success
        )
        
        // Update widget data
        WidgetDataService.shared.updateWidgetData(identities: appState.identities)
    }
}
```

---

### 13. INTEGRATION POINTS

Call `WidgetDataService.shared.updateWidgetData(identities:)` in these locations:

```swift
// After logging (voice or manual)
func didLogBlock(_ block: BuildingBlock) {
    // ... existing logic
    WidgetDataService.shared.updateWidgetData(identities: identities)
}

// After editing identities/blocks/guardrails
func didUpdateIdentity(_ identity: Identity) {
    // ... existing logic
    WidgetDataService.shared.updateWidgetData(identities: identities)
}

// On app launch
func applicationDidBecomeActive() {
    WidgetDataService.shared.updateWidgetData(identities: identities)
}

// On significant time change (midnight, week reset)
func handleSignificantTimeChange() {
    WidgetDataService.shared.updateWidgetData(identities: identities)
}
```

---

### IMPLEMENTATION CHECKLIST

**Xcode Setup:**
- [ ] Create Widget Extension target (`BackmindWidgets`)
- [ ] Add App Group to main app capabilities
- [ ] Add App Group to widget extension capabilities
- [ ] Configure group identifier: `group.com.backmind.shared`
- [ ] Add Satoshi fonts to widget extension target
- [ ] Add URL scheme `backmind` to main app Info.plist

**Widget Files:**
- [ ] `WidgetStyles.swift` — Colors, typography, enums
- [ ] `WidgetOrbButton.swift` — Orb component
- [ ] `WidgetMeshBackground.swift` — Mesh gradient backgrounds
- [ ] `WidgetDataModels.swift` — Entry and data structures
- [ ] `WidgetTimelineProvider.swift` — Timeline provider
- [ ] `SmallWidget.swift` — Small widget view
- [ ] `MediumWidget.swift` — Medium widget view + QuickLogRow
- [ ] `LockScreenWidgets.swift` — All three lock screen widgets
- [ ] `BackmindWidgets.swift` — Bundle entry point

**Main App:**
- [ ] `WidgetDataService.swift` — Shared data service
- [ ] Deep link handling in app entry point
- [ ] Quick log functionality (instant +1)
- [ ] Toast component for quick log confirmation
- [ ] Call `updateWidgetData` in all relevant locations

**Testing:**
- [ ] Small widget — tap opens voice recording
- [ ] Medium widget — voice log tap works
- [ ] Medium widget — quick log row tap logs instantly
- [ ] Medium widget — empty state ("All caught up")
- [ ] Lock screen circular — tap opens voice recording
- [ ] Lock screen rectangular — tap opens voice recording
- [ ] Lock screen inline — tap opens voice recording
- [ ] Widgets refresh after logging
- [ ] Widgets show correct status colors
- [ ] Mesh gradient renders correctly (iOS 18+)
- [ ] Fallback gradient works (iOS 17)
- [ ] Quick log toast appears and dismisses
- [ ] All widgets in dark mode
- [ ] Satoshi font renders in widgets

---

This prompt delivers voice-first widgets with full premium styling — orb, mesh gradients, Satoshi typography, and the established color system. Every tap leads to action, with status communicated ambiently through color.

---
<!-- Source: TDD/03-app-architecture.md -->

# App Architecture

## Overview

Backmind uses a clean architecture with MVVM pattern, protocol-based dependency injection, and SwiftData for local persistence.

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Views     │  │ Components  │  │   Design System     │  │
│  │ (SwiftUI)   │  │ (BMButton,  │  │ (Colors, Typography │  │
│  │             │  │  BMCard)    │  │  Spacing, Radius)   │  │
│  └──────┬──────┘  └─────────────┘  └─────────────────────┘  │
│         │                                                    │
│  ┌──────▼──────┐                                            │
│  │ ViewModels  │  @Observable, @MainActor                   │
│  │ (MVVM)      │  - OnboardingViewModel                     │
│  │             │  - DashboardViewModel                      │
│  │             │  - VoiceLoggingViewModel                   │
│  └──────┬──────┘                                            │
└─────────┼───────────────────────────────────────────────────┘
          │
┌─────────▼───────────────────────────────────────────────────┐
│                     Service Layer                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              DependencyContainer                     │    │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │    │
│  │  │ DataService │ │ AIService   │ │ AuthService │    │    │
│  │  │ (Protocol)  │ │ (Protocol)  │ │ (Protocol)  │    │    │
│  │  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘    │    │
│  │         │               │               │            │    │
│  │  ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐    │    │
│  │  │SwiftData    │ │ClaudeAI     │ │SupabaseAuth │    │    │
│  │  │Service      │ │Service      │ │Service      │    │    │
│  │  └─────────────┘ └─────────────┘ └─────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
          │
┌─────────▼───────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │  SwiftData Models   │  │  Supabase (Remote)          │   │
│  │  - SDIdentity       │  │  - PostgreSQL               │   │
│  │  - SDBuildingBlock  │  │  - Edge Functions           │   │
│  │  - SDGuardrail      │  │  - Auth                     │   │
│  │  - SD*Log           │  │                             │   │
│  └─────────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Files

### Entry Point

| File | Purpose |
|------|---------|
| `Backmind_v1App.swift` | App entry, initializes DependencyContainer, handles deep links |
| `ContentView.swift` | Root view, manages onboarding vs dashboard flow |

### Dependency Injection

| File | Purpose |
|------|---------|
| `DI/DependencyContainer.swift` | Central DI container with lazy service initialization |
| `Data/SwiftDataContainer.swift` | SwiftData ModelContainer configuration |

---

## App Entry Point

```swift
// Backmind_v1App.swift
@main
struct Backmind_v1App: App {
    @State private var appState = AppState()
    @State private var themeManager = ThemeManager()
    @State private var dependencyContainer: DependencyContainer?

    var body: some Scene {
        WindowGroup {
            if let container = dependencyContainer {
                ContentView()
                    .environment(appState)
                    .environment(themeManager)
                    .dependencyContainer(container)
            }
        }
        .task {
            dependencyContainer = try? DependencyContainer.createProduction()
        }
    }
}
```

### AppState

Observable class for app-wide navigation state:

```swift
@Observable
class AppState {
    var showVoiceRecording = false      // Trigger voice recording sheet
    var navigateToIdentityId: String?   // Deep link to identity
    var quickLogBlockId: String?        // Quick log from widget
    var toastMessage: ToastMessage?     // Toast notifications
}
```

### AppFlowState

Explicit state machine for app-level navigation flow:

```swift
enum AppFlowState: Equatable {
    case loading              // Initial app launch, loading dependencies
    case onboarding          // User hasn't completed onboarding
    case authenticating      // Showing auth flow
    case main                // Main app experience (dashboard)
}
```

**Usage in ContentView:**
```swift
@State private var flowState: AppFlowState = .loading

var body: some View {
    switch flowState {
    case .loading:
        LoadingView()
    case .onboarding:
        OnboardingFlow()
    case .authenticating:
        AuthenticationView()
    case .main:
        DashboardView()
    }
}
```

> **Note:** This explicit state machine was added during implementation to improve navigation clarity. The PRD's AppState covered navigation but didn't define explicit flow states.

---

## Dependency Container

Central container providing all services via protocols:

```swift
@MainActor
@Observable
final class DependencyContainer {
    let modelContainer: ModelContainer

    // Lazy-initialized services
    var dataService: any DataServiceProtocol { ... }
    var voiceService: any VoiceServiceProtocol { ... }
    var aiService: any AIServiceProtocol { ... }
    var authService: any AuthServiceProtocol { ... }

    // ViewModel factories
    func makeDashboardViewModel() -> DashboardViewModel
    func makeVoiceLoggingViewModel() -> VoiceLoggingViewModel
}
```

### Environment Access

Views access the container via SwiftUI environment:

```swift
// In a View
@Environment(\.dependencyContainer) var container

// Usage
let viewModel = container?.makeDashboardViewModel()
```

### Factory Methods

- `createProduction()` - Real services with persistent storage
- `createForTesting()` - In-memory storage for unit tests

---

## MVVM Pattern

### ViewModel Structure

All ViewModels follow this pattern:

```swift
@Observable
@MainActor
final class SomeViewModel {
    // Dependencies (injected)
    private let dataService: any DataServiceProtocol

    // State
    var isLoading = false
    var error: String?
    var items: [SomeItem] = []

    // Initialization
    init(dataService: any DataServiceProtocol) {
        self.dataService = dataService
    }

    // Actions
    func loadData() async { ... }
    func createItem(...) async -> Bool { ... }
}
```

### ViewModels

| ViewModel | Purpose |
|-----------|---------|
| `OnboardingViewModel` | Manages onboarding flow, creates identities/blocks/guardrails |
| `DashboardViewModel` | Loads and displays user's identities and progress |
| `VoiceLoggingViewModel` | Handles voice recording, transcription, AI classification |

---

## SwiftData Configuration

### Model Types

All 18 SwiftData models are registered:

```swift
// SwiftDataContainer.swift
static let modelTypes: [any PersistentModel.Type] = [
    SDUser.self,
    SDUserSettings.self,
    SDIdentity.self,
    SDBuildingBlock.self,
    SDBuildingBlockLog.self,
    SDGuardrail.self,
    SDGuardrailLog.self,
    SDGuardrailIdentity.self,
    SDTrigger.self,
    SDCheckIn.self,
    SDScheduledNudge.self,
    SDScheduledCheckIn.self,
    SDWeeklySummary.self,
    SDReflection.self,           // Added: Reflection questions/responses
    SDNudgeHistory.self,         // Added: Nudge variety tracking
    // SDOfflineQueueItem.self   // Deferred to v1.1
]
```

> **Note:** SDOfflineQueueItem has been deferred to v1.1. The MVP uses an online-first approach.

### Container Creation

```swift
// Production - persistent storage
static func createContainer() throws -> ModelContainer {
    let configuration = ModelConfiguration(
        schema: schema,
        isStoredInMemoryOnly: false,
        allowsSave: true
    )
    return try ModelContainer(for: schema, configurations: [configuration])
}

// Testing - in-memory
static func createInMemoryContainer() throws -> ModelContainer {
    let configuration = ModelConfiguration(
        schema: schema,
        isStoredInMemoryOnly: true
    )
    return try ModelContainer(for: schema, configurations: [configuration])
}
```

---

## Deep Links

URL scheme: `backmind://`

| URL | Action |
|-----|--------|
| `backmind://log` | Open voice recording |
| `backmind://quicklog/{blockId}` | Instant log for block |
| `backmind://dashboard` | Navigate to dashboard |
| `backmind://identity/{identityId}` | Open identity detail |
| `backmind://badday/{blockId}` | Open bad day mode flow (Feature 06) |
| `backmind://seasonalcheckin` | Open seasonal check-in flow (Feature 12) |
| `backmind://weeklysummary` | Open weekly summary (Feature 14) |
| `backmind://woopreflection/{guardrailId}` | Open WOOP reflection (Feature 08) |

---

## Environment Values

Custom environment values used throughout the app:

| Key | Type | Purpose |
|-----|------|---------|
| `dependencyContainer` | `DependencyContainer?` | Service access |
| `appState` | `AppState` | Navigation state |
| `themeManager` | `ThemeManager` | Light/dark mode |

---

## File Organization

```
Backmind_v1/
├── Backmind_v1App.swift          # Entry point
├── ContentView.swift             # Root view
├── Config/
│   └── AppConfig.swift           # Supabase config from xcconfig
├── DI/
│   └── DependencyContainer.swift # Dependency injection
├── Data/
│   └── SwiftDataContainer.swift  # SwiftData setup
├── Models/
│   ├── SwiftData/                # @Model classes
│   ├── DisplayTypeConversions.swift
│   ├── MockData.swift            # Preview data
│   └── BackmindError.swift       # Error types
├── ViewModels/
│   ├── OnboardingViewModel.swift
│   ├── DashboardViewModel.swift
│   └── VoiceLoggingViewModel.swift
├── Views/
│   ├── Onboarding/
│   ├── Dashboard/
│   ├── VoiceLogging/
│   └── Settings/
├── Components/                   # Reusable UI components
├── DesignSystem/                 # Colors, Typography
├── Services/
│   ├── Protocols/                # Service protocols
│   └── [Implementations]
└── Preview Content/              # Preview helpers
```

---

## Testing Strategy

### Unit Tests
- Use `DependencyContainer.createForTesting()` for in-memory storage
- Mock services by conforming to protocols

### Preview Support
- `MockData.swift` provides static preview data
- `PreviewHelpers.swift` provides preview containers

### Debug Mode
- Shake device to access debug menu (DEBUG builds only)
- `AppLog` for structured logging

---

## Key View Callbacks

### BlockCreationView

The block creation flow uses a callback to pass created block data back to the parent:

```swift
// BlockCreationView.swift
let onBlockCreated: (String, Int, FrequencyPeriod, String?, [String]) -> Void
//                   │       │    │               │        └─ triggers
//                   │       │    │               └─ outcome (optional)
//                   │       │    └─ period (.daily, .weekly)
//                   │       └─ frequency (1-7)
//                   └─ block text
```

**Usage in ContentView:**
```swift
BlockCreationView(
    ...
    onBlockCreated: { blockText, frequency, period, outcome, triggers in
        Task {
            if await viewModel.createBuildingBlock(
                text: blockText,
                frequency: frequency,
                period: period,
                outcome: outcome
            ) {
                // Block created successfully
            }
        }
    },
    ...
)
```

### Frequency Extraction

`BlockCreationView` includes automatic frequency extraction from block text:

```swift
// Extracts frequency from patterns like "3x a week", "daily", "twice a week"
private func extractFrequencyFromText(_ text: String) -> Int?
```

| Pattern | Result |
|---------|--------|
| "daily", "every day" | 7 |
| "weekday" | 5 |
| "3x a week", "three times" | 3 |
| "twice a week" | 2 |
| "once a week" | 1 |
| No pattern found | nil (defaults to 3) |


---
<!-- Source: TDD/04-swiftdata-models.md -->

# SwiftData Models

## Overview

Backmind uses SwiftData for local persistence with 18 model types. All models follow the PRD data model specification (Section 12).

> **Note:** SDOfflineQueueItem has been deferred to v1.1. The MVP uses an online-first approach.

---

## Entity Relationship Diagram

```
┌─────────────────┐
│     SDUser      │
│─────────────────│
│ id: UUID        │
│ appleUserId     │
│ email           │
└────────┬────────┘
         │ 1:N
    ┌────┴────────────────────────┐
    │                             │
    ▼                             ▼
┌─────────────┐           ┌─────────────┐
│ SDIdentity  │           │ SDGuardrail │
│─────────────│           │─────────────│
│ name        │           │ text        │
│ icon        │           │ limitCount  │
│ healthPct   │◀──────────│ period      │
└──────┬──────┘    N:N    └──────┬──────┘
       │ 1:N      (via        │ 1:N
       ▼     SDGuardrailIdentity)  ▼
┌──────────────────┐      ┌──────────────────┐
│ SDBuildingBlock  │      │  SDGuardrailLog  │
│──────────────────│      │──────────────────│
│ text             │      │ count            │
│ frequency        │      │ isZero           │
│ period           │      │ transcript       │
│ outcome (WOOP)   │      │ confidence       │
│ obstacle (WOOP)  │      └──────────────────┘
│ plan (WOOP)      │
└────────┬─────────┘
         │ 1:N
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌───────────────────┐
│SDTrigger│ │SDBuildingBlockLog │
│─────────│ │───────────────────│
│dayOfWeek│ │ transcript        │
│ time    │ │ confidence        │
│ context │ └───────────────────┘
└─────────┘
```

---

## Core Models

### SDUser

The root user entity, linked to Supabase Auth.

```swift
@Model
final class SDUser {
    @Attribute(.unique) var id: UUID
    @Attribute(.unique) var appleUserId: String  // NOT optional
    var email: String?
    var createdAt: Date
    var updatedAt: Date

    // Relationships
    @Relationship(deleteRule: .cascade) var identities: [SDIdentity]
    @Relationship(deleteRule: .cascade) var guardrails: [SDGuardrail]
    @Relationship(deleteRule: .cascade) var settings: SDUserSettings?
    // Note: SDWeeklySummary has relationship TO user, not FROM user

    // Entity Limits
    static let maxIdentities = 5
    static let maxGuardrails = 3

    // Computed
    var canAddIdentity: Bool      // identities.count < maxIdentities
    var canAddGuardrail: Bool     // guardrails.count < maxGuardrails
    var totalBuildingBlocks: Int  // sum across all identities
    var canAddBuildingBlock: Bool // totalBuildingBlocks < 15
}
```

**Location:** `Models/SwiftData/SDUser.swift`

---

### SDIdentity

User identity representing who they want to become (e.g., "Athletic Man").

```swift
@Model
final class SDIdentity {
    @Attribute(.unique) var id: UUID
    var name: String              // 1-50 chars
    var icon: String              // Fluent emoji name
    var createdAt: Date
    var updatedAt: Date

    // Relationships
    @Relationship var user: SDUser?
    @Relationship(deleteRule: .cascade) var buildingBlocks: [SDBuildingBlock]
    @Relationship(deleteRule: .nullify) var guardrailLinks: [SDGuardrailIdentity]

    // Limits
    static let maxBuildingBlocks = 5

    // Computed
    var healthPercentage: Double  // 0-100, avg of block + guardrail scores
    var healthColor: HealthColor  // .green/.yellow/.orange/.red/.empty
    var paceStatus: PaceStatus    // .ahead/.onTrack/.recoverable/.toughWeek
    var guardrails: [SDGuardrail] // Via guardrailLinks
}
```

**Location:** `Models/SwiftData/SDIdentity.swift`

---

### SDBuildingBlock

Positive habit to build (e.g., "Exercise 4x/week"). Each completion is a "block" for the identity.

```swift
@Model
final class SDBuildingBlock {
    @Attribute(.unique) var id: UUID
    var text: String              // 1-100 chars
    var frequency: Int            // Target count per period
    var frequencyPeriod: FrequencyPeriod

    // WOOP Fields (captured during onboarding/failed week review)
    var outcome: String?          // "What's the best thing about doing this?"
    var obstacle: String?         // "What got in the way?"
    var plan: String?             // "If [obstacle], then I will..."
    var failedWeekReviewAt: Date?

    // Pause/Re-review
    var previousVersion: String?  // Original if downsized
    var pausedUntil: Date?
    var pausedAt: Date?

    // Never Miss Twice (Feature 05)
    var consecutiveMisses: Int = 0  // Consecutive days/periods missed

    // Bad Day Mode (Feature 06)
    var badDayVersion: String?    // Minimum version text (e.g., "10 pushups")

    // Conditions for Success (Feature 10)
    var conditions: String?       // Pre-conditions to set up (e.g., "Gym bag in bedroom")

    // Learning Mode (Feature 11)
    var learningMode: Bool = false     // Whether in learning mode
    var learningModeEndDate: Date?     // When learning mode ends (typically 2 weeks)

    // Relationships
    @Relationship var identity: SDIdentity?
    @Relationship(deleteRule: .cascade) var logs: [SDBuildingBlockLog]
    @Relationship(deleteRule: .cascade) var triggers: [SDTrigger]

    // Computed - Progress
    var completedThisPeriod: Int  // COUNT of logs this period
    var progressWithCommitment: Double // 5% head start + actual progress
    var isComplete: Bool          // completedThisPeriod >= frequency
    var remaining: Int            // frequency - completedThisPeriod
    var paceStatus: PaceStatus
    var isPaused: Bool
    var needsReReview: Bool       // 0% for 2 weeks after WOOP

    // Computed - New Features
    var isInLearningMode: Bool    // learningMode && Date() < learningModeEndDate
    var learningModeJustEnded: Bool // Learning mode ended within last 24 hours
    var hasBadDayVersion: Bool    // badDayVersion != nil && !badDayVersion.isEmpty
    var hasConditions: Bool       // conditions != nil && !conditions.isEmpty
}
```

**Location:** `Models/SwiftData/SDBuildingBlock.swift`

---

### SDGuardrail

Limit on negative behavior (e.g., "≤5 beers/week").

```swift
@Model
final class SDGuardrail {
    @Attribute(.unique) var id: UUID
    var text: String
    var limitCount: Int           // Max allowed per period
    var frequencyPeriod: FrequencyPeriod
    var temptationContext: String?  // "When are you most tempted?"
    var whyStatement: String?       // "Why does this matter?"

    // Slip and Continue (Feature 08)
    var weeksOverLimit: Int = 0   // Consecutive weeks over limit (for escalation)

    // Relationships
    @Relationship var user: SDUser?
    @Relationship(deleteRule: .cascade) var logs: [SDGuardrailLog]
    @Relationship(deleteRule: .cascade) var identityLinks: [SDGuardrailIdentity]

    // Computed
    var identities: [SDIdentity]  // Via identityLinks
    var currentCount: Int         // SUM of log.count this period
    var remaining: Int            // limitCount - currentCount
    var protectionPercent: Double // remaining/limit * 100
    var isOverLimit: Bool
    var isAtLimit: Bool
    var overBy: Int               // How much over limit (currentCount - limitCount)
    var needsWOOPReflection: Bool // weeksOverLimit >= 2 || overBy >= 3
}
```

**Location:** `Models/SwiftData/SDGuardrail.swift`

---

## Log Models

### SDBuildingBlockLog

Each log represents ONE completion of a building block (one "block" cast for the identity).

```swift
@Model
final class SDBuildingBlockLog {
    @Attribute(.unique) var id: UUID
    var transcript: String?       // Voice transcript (if from voice log)
    var confidence: Double?       // AI classification confidence 0-1
    var createdAt: Date
    var syncedAt: Date?           // When synced to Supabase

    // Bad Day Mode (Feature 06)
    var isBadDayVersion: Bool = false  // Whether this was logged as minimum version

    @Relationship var block: SDBuildingBlock?
}
```

**Location:** `Models/SwiftData/SDBuildingBlockLog.swift`

---

### SDGuardrailLog

Each log can represent multiple uses (count > 1).

```swift
@Model
final class SDGuardrailLog {
    @Attribute(.unique) var id: UUID
    var count: Int                // How many (e.g., "2 beers" = count: 2)
    var isZero: Bool              // User explicitly logged zero
    var transcript: String?
    var confidence: Double?
    var createdAt: Date
    var syncedAt: Date?

    @Relationship var guardrail: SDGuardrail?
}
```

**Location:** `Models/SwiftData/SDGuardrailLog.swift`

---

## Scheduling Models

### SDTrigger

Template for nudge notifications.

```swift
@Model
final class SDTrigger {
    @Attribute(.unique) var id: UUID
    var dayOfWeek: Int?           // 1-7 (Sunday-Saturday), nil = any day
    var time: Date?               // Time of day, nil = contextual only
    var context: String           // Trigger description
    var isActive: Bool

    @Relationship var buildingBlock: SDBuildingBlock?
}
```

**Location:** `Models/SwiftData/SDTrigger.swift`

---

### SDCheckIn

Template for guardrail check-in notifications.

```swift
@Model
final class SDCheckIn {
    @Attribute(.unique) var id: UUID
    var dayOfWeek: Int            // 1-7
    var openingTime: Date         // Morning check-in
    var closingTime: Date         // Evening check-in
    var isActive: Bool

    @Relationship var guardrail: SDGuardrail?
}
```

**Location:** `Models/SwiftData/SDCheckIn.swift`

---

## Supporting Models

### SDGuardrailIdentity

Join table for many-to-many between guardrails and identities.

```swift
@Model
final class SDGuardrailIdentity {
    @Attribute(.unique) var id: UUID
    var createdAt: Date

    @Relationship var identity: SDIdentity?
    @Relationship var guardrail: SDGuardrail?
}
```

**Location:** `Models/SwiftData/SDGuardrailIdentity.swift`

---

### SDUserSettings

User preferences and notification settings.

```swift
@Model
final class SDUserSettings {
    @Attribute(.unique) var id: UUID
    var wakeTime: Date            // Default 7:00 AM
    var workEndTime: Date         // Default 6:00 PM
    var bedtime: Date             // Default 10:30 PM
    var timezone: String          // Default America/New_York

    // Notification Settings
    var nudgesEnabled: Bool       // Default true
    var checkInsEnabled: Bool     // Default true
    var weeklySummaryEnabled: Bool

    // Weekly Summary (Feature 14)
    var weeklySummaryDay: Int = 1     // 1 = Sunday, 2 = Monday, etc.
    var weeklySummaryHour: Int = 18   // 6pm default

    // Previsualization (Feature 13)
    var previsualizationEnabled: Bool = true  // Morning preview nudges

    // Seasonal Check-ins (Feature 12)
    var checkInCadence: CheckInCadence = .monthly
    var lastSeasonalCheckIn: Date?    // Last monthly/quarterly check-in

    var deviceToken: String?      // APNs token

    @Relationship var user: SDUser?

    // Computed
    var effectiveSummaryTime: Date  // Combined day + hour as Date
    var isSeasonalCheckInDue: Bool  // Based on cadence and lastSeasonalCheckIn
}
```

**Location:** `Models/SwiftData/SDUserSettings.swift`

---

### SDWeeklySummary

AI-generated weekly progress summary.

```swift
@Model
final class SDWeeklySummary {
    @Attribute(.unique) var id: UUID
    var weekStart: Date
    var weekEnd: Date
    var aiInsight: String              // AI-generated summary text
    var identityScoresData: Data?      // Stored as JSON
    var highlightIdentityId: UUID?
    var needsAttentionIdentityId: UUID?
    var suggestedAction: String?
    var createdAt: Date
    var viewedAt: Date?

    @Relationship var user: SDUser?

    // Computed (decoded from identityScoresData)
    var identityScores: [String: Int]  // identity_id -> score (Int, not Double!)
    var hasBeenViewed: Bool            // viewedAt != nil
    var weekRangeDisplay: String       // e.g., "Dec 16 - 22"
}
```

**Location:** `Models/SwiftData/SDWeeklySummary.swift`

---

### SDReflection

User reflection responses to AI-generated questions. Enriches context for nudges and weekly summaries.

```swift
@Model
final class SDReflection {
    @Attribute(.unique) var id: UUID
    var question: String              // The reflection question asked
    var response: String              // User's response
    var emotionTag: String?           // Optional emotion context (Feature 15)
    var createdAt: Date

    @Relationship var block: SDBuildingBlock?
    @Relationship var log: SDBuildingBlockLog?
}
```

**Location:** `Models/SwiftData/SDReflection.swift`

> **Note:** This model was added during implementation to enable richer AI context for nudge generation and weekly summaries. Not in original PRD.

---

### SDNudgeHistory

Tracks recently shown nudges to prevent repetition (Feature 09).

```swift
@Model
final class SDNudgeHistory {
    @Attribute(.unique) var id: UUID
    var nudgeText: String             // The nudge message shown
    var nudgeType: String             // Type: getting_started, recovery, previsualization, etc.
    var shownAt: Date

    @Relationship var block: SDBuildingBlock?
    @Relationship var user: SDUser?
}
```

**Location:** `Models/SwiftData/SDNudgeHistory.swift`

> **Note:** NudgeVarietyService also uses UserDefaults for quick lookups; this model provides persistence for analytics and longer history.

---

### SDOfflineQueueItem (Deferred to v1.1)

> **⚠️ DEFERRED:** This model has been removed from MVP. The app uses an online-first approach for v1.0. Offline queue functionality is planned for v1.1.

Queued items for offline sync (when implemented):

```swift
@Model
final class SDOfflineQueueItem {
    @Attribute(.unique) var id: UUID
    var type: String                  // building_block_log, guardrail_log
    var payloadData: Data             // Serialized log data as JSON
    var createdAt: Date
    var retryCount: Int = 0
    var lastError: String?
    var status: String = "pending"    // pending, processing, failed
}
```

**Location:** Not implemented in v1.0

---

## Enums

### FrequencyPeriod

```swift
enum FrequencyPeriod: String, Codable, CaseIterable {
    case daily
    case weekly
}
```

**Location:** `Models/SwiftData/FrequencyPeriod.swift`

---

### PaceStatus

Calculated pace for building blocks.

```swift
enum PaceStatus: String, Codable {
    case ahead       // >20% ahead of expected
    case onTrack     // Within 20% of expected
    case recoverable // Behind but can catch up
    case toughWeek   // Cannot mathematically catch up
}
```

**Location:** `Models/SwiftData/PaceStatus.swift`

---

### HealthColor

Color indicator for identity health.

```swift
enum HealthColor {
    case green   // 70%+ health
    case yellow  // 50-69%
    case orange  // 30-49%
    case red     // <30%
    case empty   // No data yet
}
```

---

### CheckInCadence

Frequency for seasonal check-ins (Feature 12).

```swift
enum CheckInCadence: String, Codable, CaseIterable {
    case monthly     // Every 30 days
    case quarterly   // Every 90 days
}
```

**Location:** `Models/SwiftData/CheckInCadence.swift`

---

## Validation

All models include static validation methods:

```swift
// Example from SDIdentity
static func validate(name: String) throws {
    if name.isEmpty || name.count > 50 {
        throw BackmindError.validationFailed(
            field: "name",
            reason: "Name must be 1-50 characters"
        )
    }
}
```

Validation is called in `SwiftDataService` before creating/updating entities.

---

## Entity Limits

| Entity | Max per Parent | Defined In |
|--------|----------------|------------|
| Identities | 5 per user | SDUser.maxIdentities |
| Building Blocks | 5 per identity | SDIdentity.maxBuildingBlocks |
| Guardrails | 3 per user | SDUser.maxGuardrails |
| Triggers | 3 per block | SDTrigger (not enforced yet) |

---

## Period Calculations

Both `SDBuildingBlock` and `SDGuardrail` calculate period boundaries:

```swift
private var periodStartDate: Date {
    let calendar = Calendar.current
    let now = Date()

    switch frequencyPeriod {
    case .daily:
        return calendar.startOfCurrentDay(from: now)
    case .weekly:
        return calendar.startOfCurrentWeek(from: now)
    }
}
```

Calendar extensions are provided in `Models/SwiftData/FrequencyPeriod.swift`.

---

## MVP Feature Fields Summary

New fields added for MVP features 05-15:

| Entity | Field | Type | Feature | Default | Description |
|--------|-------|------|---------|---------|-------------|
| SDBuildingBlock | consecutiveMisses | Int | 05-never-miss-twice | 0 | Consecutive days/periods missed |
| SDBuildingBlock | badDayVersion | String? | 06-bad-day-mode | nil | Minimum version text |
| SDBuildingBlock | conditions | String? | 10-conditions-for-success | nil | Pre-conditions to set up |
| SDBuildingBlock | learningMode | Bool | 11-learning-mode | false | Whether in learning mode |
| SDBuildingBlock | learningModeEndDate | Date? | 11-learning-mode | nil | When learning mode ends |
| SDGuardrail | weeksOverLimit | Int | 08-slip-continue | 0 | Consecutive weeks over limit |
| SDBuildingBlockLog | isBadDayVersion | Bool | 06-bad-day-mode | false | Logged as minimum version |
| SDUserSettings | previsualizationEnabled | Bool | 13-previsualization | true | Morning preview nudges |
| SDUserSettings | checkInCadence | CheckInCadence | 12-seasonal-checkins | .monthly | Monthly or quarterly |
| SDUserSettings | lastSeasonalCheckIn | Date? | 12-seasonal-checkins | nil | Last check-in date |
| SDUserSettings | weeklySummaryDay | Int | 14-consistency-copy | 1 | 1=Sunday, 2=Monday, etc. |
| SDUserSettings | weeklySummaryHour | Int | 14-consistency-copy | 18 | Hour (24h format) |

### Computed Properties Added

| Entity | Property | Feature | Logic |
|--------|----------|---------|-------|
| SDBuildingBlock | isInLearningMode | 11 | learningMode && Date() < learningModeEndDate |
| SDBuildingBlock | learningModeJustEnded | 11 | Learning mode ended within last 24 hours |
| SDBuildingBlock | hasBadDayVersion | 06 | badDayVersion != nil && !isEmpty |
| SDBuildingBlock | hasConditions | 10 | conditions != nil && !isEmpty |
| SDGuardrail | overBy | 08 | currentCount - limitCount |
| SDGuardrail | needsWOOPReflection | 08 | weeksOverLimit >= 2 \|\| overBy >= 3 |
| SDUserSettings | effectiveSummaryTime | 14 | Combined day + hour as Date |
| SDUserSettings | isSeasonalCheckInDue | 12 | Based on cadence and lastSeasonalCheckIn |


---
<!-- Source: TDD/05-services-layer.md -->

# Services Layer

## Overview

All services are accessed via protocols, enabling testing and future backend changes. Services are lazy-initialized in `DependencyContainer`.

---

## Service Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DependencyContainer                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Protocols              Implementations               │   │
│  │  ─────────────────────────────────────────────────── │   │
│  │  DataServiceProtocol    → SwiftDataService           │   │
│  │  AIServiceProtocol      → ClaudeAIService            │   │
│  │  AuthServiceProtocol    → SupabaseAuthService        │   │
│  │  VoiceServiceProtocol   → AppleSpeechService         │   │
│  │  SyncServiceProtocol    → SupabaseSyncService        │   │
│  │  NotificationServiceProtocol → NotificationService   │   │
│  │  DataExportServiceProtocol → DataExportService       │   │
│  │  WeeklySummaryService   → (standalone)               │   │
│  │  WeeklyResetService     → (standalone)               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Protocols

### DataServiceProtocol

Local data persistence operations.

```swift
// Location: Services/Protocols/DataServiceProtocol.swift

protocol DataServiceProtocol: Sendable {
    // User
    func getCurrentUser() async throws -> SDUser
    func updateSettings(_ settings: SDUserSettings) async throws

    // Identities
    func fetchIdentities() async throws -> [SDIdentity]
    func createIdentity(name: String, icon: String) async throws -> SDIdentity
    func updateIdentity(_ identity: SDIdentity) async throws
    func deleteIdentity(_ identity: SDIdentity) async throws

    // Building Blocks
    func createBuildingBlock(
        text: String,
        frequency: Int,
        period: FrequencyPeriod,
        identity: SDIdentity,
        outcome: String?,
        badDayVersion: String?,       // Feature 06
        conditions: String?,          // Feature 10
        learningMode: Bool            // Feature 11
    ) async throws -> SDBuildingBlock
    func updateBuildingBlock(_ block: SDBuildingBlock) async throws
    func deleteBuildingBlock(_ block: SDBuildingBlock) async throws
    func logBuildingBlock(
        _ block: SDBuildingBlock,
        transcript: String?,
        confidence: Double?,
        isBadDayVersion: Bool         // Feature 06
    ) async throws -> SDBuildingBlockLog
    func fetchBuildingBlocks() async throws -> [SDBuildingBlock]  // For background processing

    // Guardrails
    func fetchGuardrails() async throws -> [SDGuardrail]
    func createGuardrail(
        text: String,
        limitCount: Int,
        period: FrequencyPeriod,
        identities: [SDIdentity],
        temptationContext: String?,
        whyStatement: String?
    ) async throws -> SDGuardrail
    func updateGuardrail(_ guardrail: SDGuardrail) async throws
    func deleteGuardrail(_ guardrail: SDGuardrail) async throws
    func logGuardrail(
        _ guardrail: SDGuardrail,
        count: Int,
        isZero: Bool,
        transcript: String?,
        confidence: Double?
    ) async throws -> SDGuardrailLog

    // Triggers
    func createTrigger(
        dayOfWeek: Int?,
        time: Date?,
        context: String,
        block: SDBuildingBlock
    ) async throws -> SDTrigger
    func deleteTrigger(_ trigger: SDTrigger) async throws

    // Weekly Summary
    func fetchLatestWeeklySummary() async throws -> SDWeeklySummary?
    func markWeeklySummaryViewed(_ summary: SDWeeklySummary) async throws
}
```

---

### AIServiceProtocol

AI-powered classification, copy generation, and trigger evaluation.

```swift
// Location: Services/Protocols/AIServiceProtocol.swift

protocol AIServiceProtocol: Sendable {
    /// Classify a voice transcript against blocks and guardrails
    func classifyTranscript(
        _ transcript: String,
        blocks: [SDBuildingBlock],
        guardrails: [SDGuardrail]
    ) async throws -> ClassificationResult

    /// Generate contextual copy for UI touchpoints
    func generateCopy(
        for touchpoint: AICopyTouchpoint,
        context: AICopyContext
    ) async throws -> String

    /// Parse identity from user input
    func parseIdentity(
        from userInput: String
    ) async throws -> ParsedIdentityResult

    /// Suggest building blocks for an identity
    func suggestBlocks(
        for identity: SuggestBlocksIdentity,
        existingBlocks: [SuggestBlocksExistingBlock],
        conversationContext: SuggestBlocksConversation?,
        count: Int,
        mode: SuggestionMode
    ) async throws -> BlockSuggestionResult

    /// Evaluate triggers or suggest new ones
    func evaluateTriggers(
        _ input: EvaluateTriggersInput,
        mode: TriggerEvaluationMode
    ) async throws -> TriggerEvaluationResult
}
```

---

### Trigger Evaluation Types

```swift
// Input for trigger evaluation
struct EvaluateTriggersInput: Sendable {
    let triggers: [String]      // For evaluate mode - pre-split triggers
    let rawInput: String?       // For parse mode - single string to split
    let blockName: String
    let blockOutcome: String?
    let userRoutines: String?
}

// Evaluation modes
enum TriggerEvaluationMode: String, Sendable {
    case evaluate   // Evaluate user-provided triggers
    case suggest    // Suggest triggers based on routines
    case parse      // Parse raw input, split compound triggers, then evaluate
}

// Result of AI trigger evaluation
struct TriggerEvaluationResult: Sendable {
    let evaluations: [EvaluatedTrigger]
    let suggestedTriggers: [AITriggerSuggestion]?
    let overallFeedback: String
    let followUpQuestion: String?
}

// An evaluated trigger from AI
struct EvaluatedTrigger: Identifiable, Sendable {
    let id: UUID
    let originalText: String
    let strength: TriggerStrength
    let habitStackingScore: Double    // 0.0-1.0
    let suggestion: String?           // Tip to improve
    let improvedVersion: String?      // Rewritten version
    let reasoning: String
}

// Strength rating for a trigger
enum TriggerStrength: String, Sendable, CaseIterable {
    case strong      // "STRONG TRIGGER" - green
    case moderate    // "GOOD START" - amber
    case weak        // "NEEDS REFINEMENT" - orange

    var displayName: String {
        switch self {
        case .strong: return "Strong Trigger"
        case .moderate: return "Good Start"
        case .weak: return "Needs Refinement"
        }
    }
}
```

---

### Classification Result

```swift
struct ClassificationResult {
    enum MatchType {
        case buildingBlock
        case guardrail
        case noMatch
    }

    let matchType: MatchType
    let matchedId: UUID?
    let matchedText: String?
    let count: Int?           // For guardrails: how many
    let isZero: Bool          // User said "zero" or "none"
    let confidence: Double    // 0.0 to 1.0
    let reasoning: String
}
```

---

### AuthServiceProtocol

Authentication operations.

```swift
// Location: Services/Protocols/AuthServiceProtocol.swift

protocol AuthServiceProtocol: Sendable {
    var authState: AuthState { get async }
    var currentUserId: String? { get async }
    var isSignedIn: Bool { get async }

    func signInWithApple() async throws -> String
    func signOut() async
    func refreshTokenIfNeeded() async throws
    func getAuthToken() async throws -> String
}

enum AuthState: Equatable {
    case signedOut
    case signingIn
    case signedIn(userId: String)
    case error(String)
}
```

---

### VoiceServiceProtocol

Voice recording and transcription.

```swift
// Location: Services/Protocols/VoiceServiceProtocol.swift

protocol VoiceServiceProtocol: Sendable {
    var isRecording: Bool { get async }
    var hasPermission: Bool { get async }

    func requestPermission() async -> Bool
    func startRecording() async throws
    func stopRecording() async throws -> String
    func cancelRecording() async
}
```

---

## Implementations

### SwiftDataService

Local persistence using SwiftData.

```swift
// Location: Services/SwiftDataService.swift

actor SwiftDataService: DataServiceProtocol {
    private let modelContainer: ModelContainer

    init(modelContainer: ModelContainer) {
        self.modelContainer = modelContainer
    }

    @MainActor
    private var context: ModelContext {
        modelContainer.mainContext
    }

    // All operations run on @MainActor for SwiftData access
    @MainActor
    func createIdentity(name: String, icon: String) async throws -> SDIdentity {
        // 1. Validate input
        try SDIdentity.validate(name: name)
        try SDIdentity.validate(icon: icon)

        // 2. Check entity limits
        let user = try await getCurrentUser()
        guard user.canAddIdentity else {
            throw BackmindError.entityLimitReached(entity: "identities", max: 5)
        }

        // 3. Create and save
        let identity = SDIdentity(name: name, icon: icon, user: user)
        context.insert(identity)
        user.identities.append(identity)
        try context.save()

        return identity
    }

    // ... other operations follow same pattern
}
```

**Key Points:**
- Uses `actor` for thread safety
- All DB operations marked `@MainActor`
- Validates before creating
- Checks entity limits
- Returns created entity

---

### ClaudeAIService

AI classification via Supabase Edge Function.

```swift
// Location: Services/ClaudeAIService.swift

final class ClaudeAIService: AIServiceProtocol, Sendable {

    private var functionsClient: FunctionsClient {
        SupabaseManager.shared.client.functions
    }

    func classifyTranscript(
        _ transcript: String,
        blocks: [SDBuildingBlock],
        guardrails: [SDGuardrail]
    ) async throws -> ClassificationResult {

        // Build request with Encodable structs
        let request = ClassifyRequest(
            transcript: transcript,
            blocks: blocks.map { BlockInput(
                id: $0.id.uuidString,
                text: $0.text,
                frequency: $0.frequency
            )},
            guardrails: guardrails.map { GuardrailInput(
                id: $0.id.uuidString,
                text: $0.text,
                limitCount: $0.limitCount
            )}
        )

        // Call edge function
        let responseData: Data = try await functionsClient.invoke(
            "classify-transcript",
            options: FunctionInvokeOptions(body: request)
        )

        // Decode and map response
        let edgeResponse = try JSONDecoder().decode(
            EdgeFunctionResponse.self,
            from: responseData
        )

        return mapToClassificationResult(edgeResponse)
    }
}
```

**Key Points:**
- Calls `classify-transcript` edge function
- Uses `Encodable` structs (not `[String: Any]`)
- Returns `ClassificationResult` on success
- Returns `.noMatch` on error (doesn't throw)

---

### SupabaseAuthService

Sign in with Apple via Supabase.

```swift
// Location: Services/SupabaseAuthService.swift

@MainActor
final class SupabaseAuthService: NSObject, AuthServiceProtocol {

    private var client: SupabaseClient {
        SupabaseManager.shared.client
    }

    private var _authState: AuthState = .signedOut
    private var currentNonce: String?
    private var signInContinuation: CheckedContinuation<String, Error>?

    func signInWithApple() async throws -> String {
        _authState = .signingIn

        return try await withCheckedThrowingContinuation { continuation in
            self.signInContinuation = continuation

            // Generate nonce for security
            let nonce = randomNonceString()
            self.currentNonce = nonce

            // Present Apple Sign-in UI
            let request = ASAuthorizationAppleIDProvider().createRequest()
            request.requestedScopes = [.fullName, .email]
            request.nonce = sha256(nonce)

            let controller = ASAuthorizationController(authorizationRequests: [request])
            controller.delegate = self
            controller.performRequests()
        }
    }
}

extension SupabaseAuthService: ASAuthorizationControllerDelegate {
    func authorizationController(
        controller: ASAuthorizationController,
        didCompleteWithAuthorization authorization: ASAuthorization
    ) {
        Task {
            // Extract Apple ID token
            guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential,
                  let tokenData = credential.identityToken,
                  let token = String(data: tokenData, encoding: .utf8),
                  let nonce = currentNonce else {
                signInContinuation?.resume(throwing: BackmindError.signInFailed)
                return
            }

            // Sign in to Supabase
            let session = try await client.auth.signInWithIdToken(
                credentials: .init(provider: .apple, idToken: token, nonce: nonce)
            )

            // Get or create user record
            let userId = await getOrCreateUserId(authId: session.user.id)

            _authState = .signedIn(userId: userId)
            signInContinuation?.resume(returning: userId)
        }
    }
}
```

**Key Points:**
- Uses `@MainActor` class (not actor) for ASAuthorizationControllerDelegate
- Generates cryptographic nonce for security
- Creates user record in `users` table if new
- Stores auth state locally

---

### AppleSpeechService

Voice recording and transcription using Speech framework.

```swift
// Location: Services/AppleSpeechService.swift

actor AppleSpeechService: VoiceServiceProtocol {

    private var audioEngine: AVAudioEngine?
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?
    private var speechRecognizer: SFSpeechRecognizer?

    private var _isRecording = false
    private var transcriptionResult = ""

    func requestPermission() async -> Bool {
        // Request speech recognition permission
        let speechGranted = await withCheckedContinuation { continuation in
            SFSpeechRecognizer.requestAuthorization { status in
                continuation.resume(returning: status == .authorized)
            }
        }

        guard speechGranted else { return false }

        // Request microphone permission
        return await withCheckedContinuation { continuation in
            AVAudioSession.sharedInstance().requestRecordPermission { granted in
                continuation.resume(returning: granted)
            }
        }
    }

    func startRecording() async throws {
        guard await hasPermission else {
            throw BackmindError.microphonePermissionDenied
        }

        // Configure audio session
        let audioSession = AVAudioSession.sharedInstance()
        try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
        try audioSession.setActive(true)

        // Create audio engine and recognition request
        audioEngine = AVAudioEngine()
        recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
        recognitionRequest?.shouldReportPartialResults = true

        // Install audio tap
        let inputNode = audioEngine!.inputNode
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: inputNode.outputFormat(forBus: 0)) { buffer, _ in
            self.recognitionRequest?.append(buffer)
        }

        // Start recognition
        audioEngine!.prepare()
        try audioEngine!.start()

        recognitionTask = speechRecognizer?.recognitionTask(with: recognitionRequest!) { result, error in
            if let result = result {
                Task { await self.updateTranscription(result.bestTranscription.formattedString) }
            }
        }

        _isRecording = true
    }

    func stopRecording() async throws -> String {
        await stopRecordingInternal()

        guard !transcriptionResult.isEmpty else {
            throw BackmindError.noAudio
        }

        return transcriptionResult
    }
}
```

**Key Points:**
- Uses `actor` for thread safety
- Requires both speech and microphone permissions
- Returns partial results during recording
- Cleans up audio resources on stop

---

## Supporting Services

### SupabaseManager

Singleton for Supabase client access.

```swift
// Location: Services/SupabaseManager.swift

final class SupabaseManager: Sendable {
    static let shared = SupabaseManager()

    let client: SupabaseClient

    private init() {
        client = SupabaseClient(
            supabaseURL: AppConfig.supabaseURL,
            supabaseKey: AppConfig.supabaseAnonKey
        )
    }
}
```

---

### AppLog (Logger)

Structured logging with OSLog.

```swift
// Location: Services/Logger.swift

enum AppLog {
    private static let subsystem = Bundle.main.bundleIdentifier ?? "com.backmind"

    static let ai = Logger(subsystem: subsystem, category: "AI")
    static let auth = Logger(subsystem: subsystem, category: "Auth")
    static let data = Logger(subsystem: subsystem, category: "Data")
    static let network = Logger(subsystem: subsystem, category: "Network")
    static let voice = Logger(subsystem: subsystem, category: "Voice")
    static let sync = Logger(subsystem: subsystem, category: "Sync")
    static let ui = Logger(subsystem: subsystem, category: "UI")

    // Convenience methods
    static func classification(transcript: String, result: ClassificationResult)
    static func apiCall(_ function: String, success: Bool, duration: TimeInterval?)
    static func authStateChanged(_ state: AuthState)
    static func error(_ message: String, error: Error?, category: Logger)
}
```

**Usage:**
```swift
AppLog.data.info("Created identity: \(name)")
AppLog.error("Failed to sync", error: error, category: AppLog.sync)
```

---

### NetworkMonitor

Monitors network connectivity for offline handling.

```swift
// Location: Services/NetworkMonitor.swift

@Observable
final class NetworkMonitor {
    private let monitor = NWPathMonitor()
    var isConnected = true
    var connectionType: ConnectionType = .unknown

    enum ConnectionType {
        case wifi, cellular, unknown
    }
}
```

---

## Error Handling

### BackmindError

Centralized error types.

```swift
// Location: Models/BackmindError.swift

enum BackmindError: LocalizedError {
    // Auth
    case signInFailed
    case tokenExpired

    // Voice
    case microphonePermissionDenied
    case speechRecognitionUnavailable
    case noAudio

    // Data
    case validationFailed(field: String, reason: String)
    case entityLimitReached(entity: String, max: Int)
    case notFound(entity: String)

    // Network
    case networkUnavailable
    case serverError(message: String)
}
```

---

## MVP Feature Services

### NotificationServiceProtocol

Manages scheduling and delivery of nudges, check-ins, and summaries.

```swift
// Location: Services/Protocols/NotificationServiceProtocol.swift

protocol NotificationServiceProtocol: Sendable {
    // Nudge scheduling
    func scheduleNudge(_ nudge: SDScheduledNudge) async throws
    func cancelNudge(for blockId: UUID, on date: Date) async throws
    func cancelAllNudges(for blockId: UUID) async throws

    // Check-in scheduling
    func scheduleCheckIn(_ checkIn: SDScheduledCheckIn) async throws
    func cancelAllCheckIns(for guardrailId: UUID) async throws

    // Weekly summary
    func scheduleWeeklySummary(day: Int, hour: Int) async throws
    func cancelWeeklySummary() async throws

    // MVP Features
    func scheduleNeverMissTwiceNudge(for block: SDBuildingBlock) async throws     // Feature 05
    func scheduleBadDayOfferNudge(for block: SDBuildingBlock) async throws         // Feature 06
    func scheduleGettingStartedNudge(for block: SDBuildingBlock) async throws      // Feature 09
    func scheduleConditionsReminder(for block: SDBuildingBlock) async throws       // Feature 10
    func schedulePrevisualization(for blocks: [SDBuildingBlock]) async throws      // Feature 13

    // Limits
    var maxNudgesPerDay: Int { get }  // Default: 3
    var maxTotalPerDay: Int { get }   // Default: 4
    func canSchedule(at date: Date) async -> Bool
}
```

---

### BackgroundTaskService

Handles end-of-day processing using BGProcessingTask (runs when charging).

```swift
// Location: Services/BackgroundTaskService.swift

actor BackgroundTaskService {
    static let endOfDayTaskIdentifier = "com.backmind.endOfDayProcessing"

    private let dataService: any DataServiceProtocol
    private let notificationService: any NotificationServiceProtocol
    private let nudgeVarietyService: NudgeVarietyService

    /// Register background task with iOS
    func registerBackgroundTasks() {
        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: Self.endOfDayTaskIdentifier,
            using: nil
        ) { task in
            Task { await self.handleEndOfDayProcessing(task: task as! BGProcessingTask) }
        }
    }

    /// Schedule end-of-day processing (typically 11pm or bedtime)
    func scheduleEndOfDayProcessing() async throws {
        let request = BGProcessingTaskRequest(identifier: Self.endOfDayTaskIdentifier)
        request.requiresExternalPower = true  // Only run when charging
        request.earliestBeginDate = calculateNextRunDate()
        try BGTaskScheduler.shared.submit(request)
    }

    /// Process all blocks at end of day
    private func handleEndOfDayProcessing(task: BGProcessingTask) async {
        task.expirationHandler = { task.setTaskCompleted(success: false) }

        do {
            let blocks = try await dataService.fetchBuildingBlocks()

            for block in blocks where block.isScheduledForToday {
                if !block.wasCompletedToday {
                    // Increment consecutive misses (Feature 05)
                    block.consecutiveMisses += 1

                    // Schedule recovery nudge if 1 miss
                    if block.consecutiveMisses == 1 {
                        try await notificationService.scheduleNeverMissTwiceNudge(for: block)
                    }

                    // Offer bad day version if skipped + 2 misses (Feature 06)
                    if block.consecutiveMisses >= 2 && !block.hasBadDayVersion {
                        try await notificationService.scheduleBadDayOfferNudge(for: block)
                    }
                } else {
                    // Reset counter on completion
                    block.consecutiveMisses = 0
                }
            }

            // Process guardrails for week-over-limit tracking (Feature 08)
            let guardrails = try await dataService.fetchGuardrails()
            for guardrail in guardrails where guardrail.frequencyPeriod == .weekly {
                if isEndOfWeek && guardrail.isOverLimit {
                    guardrail.weeksOverLimit += 1
                } else if !guardrail.isOverLimit {
                    guardrail.weeksOverLimit = 0
                }
            }

            try await dataService.save()
            task.setTaskCompleted(success: true)

            // Reschedule for tomorrow
            try await scheduleEndOfDayProcessing()
        } catch {
            AppLog.error("End of day processing failed", error: error, category: AppLog.data)
            task.setTaskCompleted(success: false)
        }
    }
}
```

---

### NudgeVarietyService

Tracks recent nudges to prevent repetition (Feature 09).

```swift
// Location: Services/NudgeVarietyService.swift

actor NudgeVarietyService {
    private let maxStoredNudges = 7

    /// Get recent nudge messages for a block
    func getRecentNudges(for blockId: UUID) -> [String] {
        return UserDefaults.standard.stringArray(forKey: "nudges_\(blockId.uuidString)") ?? []
    }

    /// Record a nudge that was shown
    func recordNudge(_ message: String, for blockId: UUID) {
        var nudges = getRecentNudges(for: blockId)
        nudges.append(message)
        if nudges.count > maxStoredNudges {
            nudges = Array(nudges.suffix(maxStoredNudges))
        }
        UserDefaults.standard.set(nudges, forKey: "nudges_\(blockId.uuidString)")
    }

    /// Check if a nudge message was recently used
    func wasRecentlyUsed(_ message: String, for blockId: UUID) -> Bool {
        return getRecentNudges(for: blockId).contains(message)
    }

    /// Clear nudge history for a block (e.g., when block is deleted)
    func clearHistory(for blockId: UUID) {
        UserDefaults.standard.removeObject(forKey: "nudges_\(blockId.uuidString)")
    }
}
```

---

### Updated AIServiceProtocol Methods (MVP Features)

```swift
// Additional methods for AIServiceProtocol

extension AIServiceProtocol {
    /// Generate nudge with variety (Feature 09)
    func generateNudgeWithVariety(
        for block: SDBuildingBlock,
        type: NudgeType,
        recentNudges: [String]
    ) async throws -> String

    /// Generate bad day version suggestion (Feature 06)
    func suggestBadDayVersion(
        for block: SDBuildingBlock
    ) async throws -> String

    /// Generate WOOP reflection prompt (Feature 08)
    func generateWOOPReflection(
        for guardrail: SDGuardrail,
        weeksOverLimit: Int,
        overBy: Int
    ) async throws -> String

    /// Generate consistency summary message (Feature 14)
    func generateConsistencySummary(
        summary: WeeklySummary,
        summaryType: SummaryType
    ) async throws -> SummaryMessage
}

enum NudgeType: String, Sendable {
    case gettingStarted        // Feature 09
    case neverMissTwice        // Feature 05
    case badDayOffer           // Feature 06
    case previsualization      // Feature 13
    case conditionsReminder    // Feature 10
    case blockBuiltConfirmation // Feature 07
}
```

---

## Additional Implemented Services

### WeeklySummaryService

Generates AI-powered weekly summaries. Runs on-device (not via Supabase cron).

```swift
// Location: Services/WeeklySummaryService.swift

actor WeeklySummaryService {
    private let dataService: any DataServiceProtocol
    private let aiService: any AIServiceProtocol

    /// Generate weekly summary for user
    func generateWeeklySummary() async throws -> SDWeeklySummary

    /// Check if summary is due based on user settings
    func isSummaryDue(for settings: SDUserSettings) -> Bool

    /// Schedule next summary notification
    func scheduleNextSummaryNotification(for settings: SDUserSettings) async throws
}
```

**Key Points:**
- Summary generation runs locally on device (not server-side cron)
- Uses `WeeklySummaryDay` and `WeeklySummaryHour` from user settings
- AI generates insight text, identifies highlight/needs-attention identities

> **Deviation from PRD:** PRD specified Supabase cron jobs for summary generation. Implementation uses on-device generation for better UX (instant, not scheduled server-side).

---

### WeeklyResetService

Handles week boundary transitions and period resets.

```swift
// Location: Services/WeeklyResetService.swift

actor WeeklyResetService {
    /// Reset weekly counters and process period transitions
    func processWeekReset() async throws

    /// Calculate current period boundaries
    func getPeriodBoundaries(for period: FrequencyPeriod) -> (start: Date, end: Date)

    /// Check and reset consecutive miss counters
    func processConsecutiveMisses(for blocks: [SDBuildingBlock]) async throws
}
```

**Key Points:**
- Handles Sunday → Monday week transitions
- Resets `consecutiveMisses` counters appropriately
- Updates `weeksOverLimit` for guardrails at end of week

---

### SupabaseSyncService

Bidirectional sync between local SwiftData and Supabase PostgreSQL.

```swift
// Location: Services/SupabaseSyncService.swift

actor SupabaseSyncService: SyncServiceProtocol {
    /// Sync all local changes to Supabase
    func syncToRemote() async throws

    /// Pull latest changes from Supabase
    func syncFromRemote() async throws

    /// Full bidirectional sync
    func performFullSync() async throws

    /// Get sync status
    var lastSyncedAt: Date? { get }
    var pendingSyncCount: Int { get }
}
```

**Key Points:**
- Uses `syncedAt` timestamp on logs to track sync status
- Handles conflict resolution (server-timestamp wins)
- Syncs: users, identities, blocks, guardrails, logs, summaries

---

### DataExportService

Exports user data for privacy compliance (GDPR).

```swift
// Location: Services/DataExportService.swift

actor DataExportService: DataExportServiceProtocol {
    /// Export all user data as JSON
    func exportUserData() async throws -> Data

    /// Export data to file URL
    func exportToFile() async throws -> URL
}
```

**Key Points:**
- Exports all user data in JSON format
- Matches export format specified in PRD Section 12
- Used for data portability and account deletion requests

---

### NotificationService (Implemented)

Full implementation of notification scheduling and delivery.

```swift
// Location: Services/NotificationService.swift

actor NotificationService: NotificationServiceProtocol {
    // Delegate callbacks for notification responses
    var onNavigateToReflection: ((UUID) -> Void)?
    var onShowToast: ((String) -> Void)?

    /// Request notification permission
    func requestPermission() async -> Bool

    /// Schedule a nudge notification
    func scheduleNudge(_ nudge: SDScheduledNudge) async throws

    /// Schedule all nudges for a block's triggers
    func scheduleAllNudges(for block: SDBuildingBlock) async throws

    /// Cancel pending notifications
    func cancelNudge(for blockId: UUID, on date: Date) async throws
    func cancelAllNudges(for blockId: UUID) async throws
}
```

**Key Points:**
- Uses UNUserNotificationCenter for local notifications
- Supports action buttons (Log, Snooze)
- Deep links to appropriate flows when tapped
- Respects `maxNudgesPerDay` and `maxTotalPerDay` limits

---

## Service Testing

### Mocking Services

Create mock implementations for testing:

```swift
class MockDataService: DataServiceProtocol {
    var identities: [SDIdentity] = []

    func fetchIdentities() async throws -> [SDIdentity] {
        return identities
    }

    func createIdentity(name: String, icon: String) async throws -> SDIdentity {
        // Return mock identity
    }
}
```

### In-Memory Testing

```swift
let container = try DependencyContainer.createForTesting()
// Uses in-memory SwiftData, no persistence
```


---
<!-- Source: TDD/06-design-system.md -->

# Design System

## Overview

Backmind uses a neurodivergent-friendly design system with warm colors, calming animations, and consistent spacing. The system avoids anxiety-inducing patterns like red status colors and streaks.

---

## Files

| File | Purpose |
|------|---------|
| `DesignSystem/Colors.swift` | Color palette with light/dark mode |
| `DesignSystem/Typography.swift` | Satoshi font scale, spacing, animations |
| `DesignSystem/FluentEmoji.swift` | Fluent emoji asset mapping |
| `Components/BMButton.swift` | Button variants |
| `Components/BMCard.swift` | Card container |
| `Components/BMInput.swift` | Text input fields |
| `Components/BMProgress.swift` | Progress indicators |
| `Components/BMVoiceOrb.swift` | Voice recording indicator |

---

## Colors

### Philosophy
- **Warm, calming palette** - reduces anxiety
- **No red for status** - uses muted slate for "tough week" states
- **Adaptive** - automatic light/dark mode support

### Background Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bmBackground` | #FAFAF9 | #121212 | Main background |
| `bmSurface` | #FFFFFF | #1E1E1E | Cards, elevated surfaces |
| `bmSurfaceElevatedDark` | - | #2D2D2D | Layered dark elements |

### Text Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bmTextPrimary` | #1E3A5F | 87% white | Main text |
| `bmTextSecondary` | #64748B | 60% white | Supporting text |
| `bmTextMuted` | #94A3B8 | 38% white | Captions, timestamps |

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `bmAccent` | #4F7CAC | Buttons, links, primary actions |
| `bmAccentLight` | #E8F0F8 | Accent backgrounds |
| `bmLogButtonTop` | #3B82F6 | Log button gradient |
| `bmLogButtonBottom` | #2563EB | Log button gradient |

### Semantic Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bmSuccess` | #5B9A6F | #86EFAC | Positive states |
| `bmWarning` | #D4A84B | #FDE68A | Caution states |
| `bmError` | #C45C5C | #C45C5C | System errors only |

### Health Indicators

| Token | Value | Threshold |
|-------|-------|-----------|
| `bmHealthGreen` | #5B9A6F | 70%+ completion |
| `bmHealthYellow` | #D4A84B | 50-69% |
| `bmHealthOrange` | #E07B39 | 30-49% |
| `bmHealthRed` | #C45C5C | <30% |
| `bmHealthEmpty` | #D1D5DB | No data |

### Pace Status Colors

| Token | Light | Dark | Status |
|-------|-------|------|--------|
| `bmPaceAhead` | #0D9488 | #5EEAD4 | Ahead of target |
| `bmPaceOnTrack` | #22C55E | #86EFAC | On pace |
| `bmPaceRecoverable` | #F59E0B | #FCD34D | Behind but catchable |
| `bmPaceToughWeek` | #94A3B8 | #94A3B8 | Cannot catch up |

### Usage

```swift
// Adaptive colors (auto light/dark)
Text("Hello")
    .foregroundStyle(Color.bmTextPrimary)

// Explicit mode
Color.bmAdaptiveBackground(.dark)
Color.bmAdaptiveSurface(colorScheme)
```

---

## Typography

### Font: Satoshi

Custom font from [fontshare.com/fonts/satoshi](https://www.fontshare.com/fonts/satoshi)

**Weights:**
- Light: `Satoshi-Light`
- Regular: `Satoshi-Regular`
- Medium: `Satoshi-Medium`
- Bold: `Satoshi-Bold`
- Black: `Satoshi-Black`

### Type Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `bmLargeTitle` | 34pt | Bold | Main screen titles |
| `bmBrandTitle` | 28pt | Black | App name "Backmind" |
| `bmTitle` | 28pt | Bold | Section headers |
| `bmTitle2` | 22pt | Bold | Card titles |
| `bmTitle3` | 20pt | Medium | Subheadings |
| `bmHeadline` | 22pt | Medium | Important callouts |
| `bmBody` | 17pt | Regular | Primary content |
| `bmBodySemibold` | 17pt | Medium | Emphasized body |
| `bmCallout` | 16pt | Regular | Supporting content |
| `bmCalloutSemibold` | 16pt | Medium | Labels |
| `bmSubheadline` | 15pt | Regular | Tertiary content |
| `bmFootnote` | 13pt | Regular | Supplementary info |
| `bmCaption` | 13pt | Regular | Timestamps |
| `bmCaption2` | 11pt | Regular | Very small labels |
| `bmButton` | 17pt | Medium | Primary buttons |
| `bmButtonSmall` | 15pt | Medium | Secondary buttons |

### Usage

```swift
// Direct font
Text("Title")
    .font(.bmTitle)

// View modifier (includes color)
Text("Body text")
    .bmBodyStyle()

// Custom size
Text("Custom")
    .font(.satoshi(size: 24, weight: .bold))
```

---

## Spacing

Multiples of 4px for consistency.

| Token | Value | Usage |
|-------|-------|-------|
| `BMSpacing.xxs` | 4pt | Tight spacing |
| `BMSpacing.xs` | 8pt | Icon gaps |
| `BMSpacing.sm` | 12pt | Component gaps |
| `BMSpacing.md` | 16pt | Card padding |
| `BMSpacing.lg` | 20pt | Section gaps |
| `BMSpacing.xl` | 24pt | Screen padding |
| `BMSpacing.xxl` | 32pt | Large gaps |
| `BMSpacing.screenPadding` | 24pt | Horizontal margins |
| `BMSpacing.cardPadding` | 16pt | Card internal |
| `BMSpacing.componentGap` | 12pt | Between components |

---

## Corner Radius

| Token | Value | Usage |
|-------|-------|-------|
| `BMRadius.card` | 16pt | Cards |
| `BMRadius.button` | 16pt | Buttons |
| `BMRadius.input` | 12pt | Text fields |
| `BMRadius.small` | 8pt | Small elements |
| `BMRadius.xs` | 4pt | Tiny elements |

---

## Animations

Subtle, calming animations - no bouncing.

| Token | Duration | Usage |
|-------|----------|-------|
| `BMAnimation.duration` | 0.25s | Standard |
| `BMAnimation.quick` | 0.15s | Micro-interactions |
| `BMAnimation.slow` | 0.35s | Page transitions |
| `BMAnimation.micro` | 0.2s | Success pulse |

### Presets

```swift
BMAnimation.standard        // .easeOut(duration: 0.25)
BMAnimation.quickEaseOut    // .easeOut(duration: 0.15)
BMAnimation.slowEaseOut     // .easeOut(duration: 0.35)
BMAnimation.expandCollapse  // .easeInOut(duration: 0.25)
BMAnimation.successPulse    // .easeOut(duration: 0.2)
```

### Accessibility

```swift
// Respects reduce motion (future implementation)
BMAnimation.accessible(.standard)
```

---

## Shadows

Soft, warm shadows for depth.

```swift
// Card shadow
view.bmCardShadow()
// Applies: 0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)

// Button shadow
.shadow(color: Color.bmLogButtonTop.opacity(0.3), radius: 12, y: 4)
```

---

## Haptic Feedback

```swift
BMHaptic.light()      // Toggles, successful logs
BMHaptic.medium()     // Confirmations
BMHaptic.success()    // Success notification
BMHaptic.warning()    // Warning notification
BMHaptic.selection()  // Selection changed
```

---

## Components

### BMButton

Three variants: primary, secondary, ghost.

```swift
// Primary (accent background)
BMButton("Get Started", variant: .primary) { action() }

// With icon
BMButton("Sign in with Apple", variant: .primary, icon: "apple.logo") { }

// Secondary (bordered)
BMButton("Continue", variant: .secondary) { }

// Ghost (text only)
BMButton("Skip", variant: .ghost) { }

// Fixed width
BMButton("Yes", variant: .primary, isFullWidth: false) { }

// Convenience constructors
BMButton.primary("Title") { }
BMButton.secondary("Title") { }
BMButton.ghost("Title") { }
```

**Specs:**
- Height: 56pt
- Corner radius: 16pt
- Press animation: scale to 0.98

### BMTextButton

Inline text link style.

```swift
BMTextButton("Skip — I'm good with one") { }
```

### BMIconButton

Icon-only button (settings gear, etc.).

```swift
BMIconButton("gearshape") { }
```

### BMMicButton

Floating mic button for voice logging.

```swift
BMMicButton { startRecording() }
```

**Features:**
- Gradient background (blue)
- Breathing glow animation
- Soft shadow
- Haptic feedback on press

---

### BMCard

Card container with optional header.

```swift
BMCard {
    // Content
}

BMCard(title: "Progress") {
    // Content with header
}
```

---

### BMInput

Text input field.

```swift
BMInput(
    "Identity Name",
    text: $name,
    placeholder: "e.g., Athletic Man"
)

// With validation
BMInput(
    "Name",
    text: $name,
    error: nameError,
    maxLength: 50
)
```

---

### BMProgress

Progress indicators.

```swift
// Linear progress bar
BMProgress(value: 0.75, total: 1.0)

// With count display
BMProgress(current: 3, target: 4)

// Circular
BMCircularProgress(value: 0.6)
```

---

### BMVoiceOrb

Animated recording indicator.

```swift
BMVoiceOrb(isRecording: isRecording, amplitude: audioLevel)
```

---

## View Modifiers

### Typography Styles

```swift
view.bmLargeTitleStyle()    // Large title + primary color
view.bmTitleStyle()         // Title + primary color
view.bmTitle2Style()        // Title2 + primary color
view.bmHeadlineStyle()      // Headline + primary color
view.bmBodyStyle()          // Body + primary color
view.bmBodySecondaryStyle() // Body + secondary color
view.bmCalloutStyle()       // Callout + secondary color
view.bmCaptionStyle()       // Caption + muted color
```

### Effects

```swift
view.bmCardShadow()                    // Soft card shadow
view.bmSuccessPulse(trigger: success)  // Scale pulse + haptic
```

---

## Fluent Emoji

Microsoft Fluent emoji assets for identity icons.

```swift
// Get emoji image
FluentEmoji.image(named: "runner")

// Picker view
FluentEmojiPicker(selected: $selectedEmoji)
```

**Location:** `Assets.xcassets/FluentEmoji/`

---

## Preview Support

All design system components include previews:

```swift
#Preview("Backmind Colors") {
    // Color swatches
}

#Preview("Backmind Typography - Satoshi") {
    // Type scale
}

#Preview("BMButton Variants") {
    // Button examples
}
```

---

## Dark Mode

The design system fully supports dark mode:

1. **Automatic:** Use adaptive colors (`bmBackground`, `bmTextPrimary`, etc.)
2. **Explicit:** Use `colorScheme` environment value
3. **ThemeManager:** Controls app-wide theme preference

```swift
@Environment(\.colorScheme) var colorScheme

// Adaptive
Color.bmBackground  // Auto-switches

// Explicit
Color.bmAdaptiveBackground(colorScheme)
```


---
<!-- Source: TDD/07-ai-coding-reference.md -->

# AI Coding Reference

## Purpose

This document helps AI coding assistants avoid common mistakes when working on this codebase. **Read this before making changes.**

---

## Naming Conventions

### Prefixes

| Prefix | Meaning | Example |
|--------|---------|---------|
| `SD` | SwiftData model | `SDIdentity`, `SDBuildingBlock` |
| `BM` | Design system component | `BMButton`, `BMCard`, `BMSpacing` |
| `bm` | Design system color/font | `bmAccent`, `bmTitle`, `bmBody` |
| `App` | App-level singleton | `AppLog`, `AppState`, `AppConfig` |

### Do NOT create new prefixes. Use existing ones.

---

## SwiftData Models - Existing Properties

### SDUser

```swift
// THESE ALREADY EXIST - don't recreate
var id: UUID
var appleUserId: String           // NOT optional! Required for auth
var email: String?
var createdAt: Date
var updatedAt: Date

// Relationships
var identities: [SDIdentity]
var guardrails: [SDGuardrail]
var settings: SDUserSettings?
// Note: NO weeklySummaries relationship (summary points TO user, not FROM)

// Computed - ALREADY EXIST
var canAddIdentity: Bool          // identities.count < maxIdentities
var canAddGuardrail: Bool         // guardrails.count < maxGuardrails
var totalBuildingBlocks: Int      // sum across all identities
var canAddBuildingBlock: Bool     // totalBuildingBlocks < 15

// Constants
static let maxIdentities = 5
static let maxGuardrails = 3
```

### SDIdentity

```swift
// THESE ALREADY EXIST - don't recreate
var id: UUID
var name: String
var icon: String
var createdAt: Date
var updatedAt: Date

// Relationships
var user: SDUser?
var buildingBlocks: [SDBuildingBlock]
var guardrailLinks: [SDGuardrailIdentity]

// Computed - ALREADY EXIST
var guardrails: [SDGuardrail]        // via guardrailLinks
var healthPercentage: Double         // 0-100
var healthColor: HealthColor         // .green/.yellow/.orange/.red/.empty
var paceStatus: PaceStatus           // .ahead/.onTrack/.recoverable/.toughWeek
var canAddBuildingBlock: Bool        // checks limit

// Constants
static let maxBuildingBlocks = 5
```

### SDBuildingBlock

```swift
// THESE ALREADY EXIST - don't recreate
var id: UUID
var text: String
var frequency: Int
var frequencyPeriod: FrequencyPeriod
var outcome: String?
var obstacle: String?
var plan: String?
var failedWeekReviewAt: Date?
var previousVersion: String?
var pausedUntil: Date?
var pausedAt: Date?

// MVP Feature Fields (Features 05-11)
var consecutiveMisses: Int           // Default 0 - consecutive missed periods
var badDayVersion: String?           // Minimum version text
var conditions: String?              // Pre-conditions to set up
var learningMode: Bool               // Default false - in learning mode
var learningModeEndDate: Date?       // When learning mode ends

// Relationships
var identity: SDIdentity?
var logs: [SDBuildingBlockLog]
var triggers: [SDTrigger]

// Computed - ALREADY EXIST
var completedThisPeriod: Int         // COUNT of logs this period
var progressWithCommitment: Double   // 5% head start + actual
var actualPercent: Double            // real progress 0-1
var isComplete: Bool                 // completed >= frequency
var remaining: Int                   // frequency - completed
var paceStatus: PaceStatus
var isPaused: Bool
var needsReReview: Bool

// Computed - NEW for MVP Features
var isInLearningMode: Bool           // learningMode && Date() < learningModeEndDate
var hasBadDayVersion: Bool           // badDayVersion != nil && !isEmpty
var hasConditions: Bool              // conditions != nil && !isEmpty
```

### SDGuardrail

```swift
// THESE ALREADY EXIST - don't recreate
var id: UUID
var text: String
var limitCount: Int
var frequencyPeriod: FrequencyPeriod
var temptationContext: String?
var whyStatement: String?

// MVP Feature Fields (Feature 08)
var weeksOverLimit: Int              // Default 0 - consecutive weeks over limit

// Relationships
var user: SDUser?
var logs: [SDGuardrailLog]
var identityLinks: [SDGuardrailIdentity]

// Computed - ALREADY EXIST
var identities: [SDIdentity]         // via identityLinks (NOT linkedIdentities!)
var currentCount: Int                // SUM of log.count this period
var remaining: Int                   // limitCount - currentCount
var protectionPercent: Double        // remaining/limit * 100
var isOverLimit: Bool
var isAtLimit: Bool
var isValid: Bool                    // has at least one identity

// Computed - NEW for MVP Features
var overBy: Int                      // currentCount - limitCount
var needsWOOPReflection: Bool        // weeksOverLimit >= 2 || overBy >= 3
```

### SDWeeklySummary

```swift
// THESE ALREADY EXIST - don't recreate
var id: UUID
var weekStart: Date
var weekEnd: Date
var aiInsight: String
var identityScoresData: Data?        // Stored as JSON
var highlightIdentityId: UUID?
var needsAttentionIdentityId: UUID?
var suggestedAction: String?
var createdAt: Date
var viewedAt: Date?

// Relationships
var user: SDUser?

// Computed - ALREADY EXIST
var identityScores: [String: Int]    // Int, NOT Double!
var hasBeenViewed: Bool              // viewedAt != nil
var weekRangeDisplay: String         // e.g., "Dec 16 - 22"

// IMPORTANT: toDisplayType() TAKES A PARAMETER
func toDisplayType(identities: [SDIdentity]) -> WeeklySummary
```

### SDUserSettings

```swift
// THESE ALREADY EXIST - don't recreate
var id: UUID
var wakeTime: Date
var workEndTime: Date
var bedtime: Date
var timezone: String
var nudgesEnabled: Bool
var checkInsEnabled: Bool
var weeklySummaryEnabled: Bool
var deviceToken: String?

// MVP Feature Fields (Features 12-14)
var weeklySummaryDay: Int            // Default 1 (Sunday) - 1-7
var weeklySummaryHour: Int           // Default 18 (6pm) - 0-23
var previsualizationEnabled: Bool    // Default true - morning previews
var checkInCadence: CheckInCadence   // Default .monthly
var lastSeasonalCheckIn: Date?       // Last monthly/quarterly check-in

// Relationships
var user: SDUser?

// Computed - NEW for MVP Features
var effectiveSummaryTime: Date       // Combined day + hour as Date
var isSeasonalCheckInDue: Bool       // Based on cadence and lastSeasonalCheckIn
```

### SDBuildingBlockLog

```swift
// THESE ALREADY EXIST - don't recreate
var id: UUID
var transcript: String?
var confidence: Double?
var createdAt: Date
var syncedAt: Date?

// MVP Feature Fields (Feature 06)
var isBadDayVersion: Bool            // Default false - logged as minimum version

// Relationships
var block: SDBuildingBlock?
```

### CheckInCadence (Enum)

```swift
enum CheckInCadence: String, Codable, CaseIterable {
    case monthly     // Every 30 days
    case quarterly   // Every 90 days
}
```

---

## Method Signatures - Use Exactly

### DisplayTypeConversions

```swift
// CORRECT - no arguments (most types)
block.toDisplayType()
guardrail.toDisplayType()
identity.toDisplayType()
trigger.toDisplayType()

// CORRECT - array helpers
identities.toDisplayTypes()  // [SDIdentity] -> [Identity]
blocks.toDisplayTypes()      // [SDBuildingBlock] -> [BuildingBlock]
guardrails.toDisplayTypes()  // [SDGuardrail] -> [Guardrail]

// EXCEPTION - SDWeeklySummary TAKES a parameter!
summary.toDisplayType(identities: [SDIdentity])  // ✓ CORRECT

// WRONG - these don't exist
block.toDisplayType(identityName: "...")  // ❌ NO
guardrail.toDisplayType(count: 5)         // ❌ NO
summary.toDisplayType()                   // ❌ NO - needs identities parameter
```

### DataServiceProtocol

```swift
// CORRECT signatures
func createIdentity(name: String, icon: String) async throws -> SDIdentity

func createBuildingBlock(
    text: String,
    frequency: Int,
    period: FrequencyPeriod,      // NOT frequencyPeriod
    identity: SDIdentity,
    outcome: String?,
    badDayVersion: String?,       // NEW - minimum version
    conditions: String?,          // NEW - pre-conditions
    learningMode: Bool            // NEW - learning mode enabled
) async throws -> SDBuildingBlock

func createGuardrail(
    text: String,
    limitCount: Int,
    period: FrequencyPeriod,
    identities: [SDIdentity],     // array, not single
    temptationContext: String?,
    whyStatement: String?
) async throws -> SDGuardrail

func logBuildingBlock(
    _ block: SDBuildingBlock,
    transcript: String?,
    confidence: Double?,
    isBadDayVersion: Bool         // NEW - whether this is a minimum version log
) async throws -> SDBuildingBlockLog

func logGuardrail(
    _ guardrail: SDGuardrail,
    count: Int,
    isZero: Bool,
    transcript: String?,
    confidence: Double?
) async throws -> SDGuardrailLog
```

---

## Common Mistakes to Avoid

### 1. Wrong Property Names

| Wrong | Correct |
|-------|---------|
| `linkedIdentities` | `identities` (on SDGuardrail) |
| `currentPeriodCount` | `completedThisPeriod` (on SDBuildingBlock) |
| `currentCount` on block | `completedThisPeriod` (currentCount is on SDGuardrail) |
| `frequencyPeriod` in method | `period` (parameter name in DataServiceProtocol) |
| `appleUserId: String?` | `appleUserId: String` (NOT optional on SDUser) |
| `identityScores: [String: Double]` | `identityScores: [String: Int]` (Int on SDWeeklySummary) |
| `summary.toDisplayType()` | `summary.toDisplayType(identities:)` (requires parameter) |
| `user.weeklySummaries` | Does not exist (summary → user, not user → summaries) |

### 2. Missing Imports

Always check if file needs:
```swift
import OSLog          // For AppLog usage
import SwiftData      // For @Model, @Query
import Supabase       // For Supabase client (NOT individual modules)
```

### 3. Actor vs Class

| Type | Use When |
|------|----------|
| `actor` | Thread-safe service with internal state |
| `@MainActor final class` | Needs to conform to delegate protocols (like ASAuthorizationControllerDelegate) |

### 4. Logging

```swift
// CORRECT - use AppLog (not Log)
AppLog.data.info("Created identity")
AppLog.error("Failed", error: error, category: AppLog.sync)

// WRONG - Log conflicts with MockData.Log struct
Log.data.info(...)  // ❌ NO
```

### 5. Supabase Functions

```swift
// CORRECT - returns Data directly
let responseData: Data = try await functionsClient.invoke(
    "function-name",
    options: FunctionInvokeOptions(body: request)
)

// WRONG - no .data property
let response = try await functionsClient.invoke(...)
let data = response.data  // ❌ NO - response IS the data
```

### 6. Encodable Requests

```swift
// CORRECT - use Encodable structs
struct MyRequest: Encodable {
    let field: String
}
let request = MyRequest(field: "value")

// WRONG - [String: Any] doesn't conform to Encodable
let request: [String: Any] = ["field": "value"]  // ❌ NO
```

---

## File Locations

### Where to Put New Code

| Type | Location |
|------|----------|
| SwiftData model | `Models/SwiftData/SD*.swift` |
| Service protocol | `Services/Protocols/*Protocol.swift` |
| Service implementation | `Services/*.swift` |
| ViewModel | `ViewModels/*ViewModel.swift` |
| View | `Views/{Feature}/*.swift` |
| Reusable component | `Components/BM*.swift` |
| Design tokens | `DesignSystem/*.swift` |

### Don't Create New Folders Without Asking

Existing structure is intentional. Ask before adding new top-level folders.

---

## Patterns to Follow

### ViewModel Pattern

```swift
@Observable
@MainActor
final class SomeViewModel {
    // 1. Dependencies (private, injected)
    private let dataService: any DataServiceProtocol

    // 2. State (public)
    var isLoading = false
    var error: String?
    var items: [SomeItem] = []

    // 3. Init
    init(dataService: any DataServiceProtocol) {
        self.dataService = dataService
    }

    // 4. Actions (async)
    func loadData() async {
        isLoading = true
        defer { isLoading = false }

        do {
            items = try await dataService.fetchItems()
        } catch {
            self.error = error.localizedDescription
        }
    }
}
```

### Service Pattern

```swift
actor SomeService: SomeProtocol {
    private let dependency: SomeDependency

    init(dependency: SomeDependency) {
        self.dependency = dependency
    }

    func doSomething() async throws -> Result {
        // Validate
        // Execute
        // Return
    }
}
```

### View with DependencyContainer

```swift
struct SomeView: View {
    @Environment(\.dependencyContainer) var container
    @State private var viewModel: SomeViewModel?

    var body: some View {
        Group {
            if let vm = viewModel {
                ContentView(viewModel: vm)
            } else {
                ProgressView()
            }
        }
        .task {
            viewModel = container?.makeSomeViewModel()
        }
    }
}
```

---

## Quick Checks Before Coding

1. **Does this property already exist?** Check the model file first
2. **Am I using the right method signature?** Check the protocol
3. **Do I need additional imports?** Check similar files
4. **Am I following the naming convention?** SD*, BM*, bm*
5. **Is there an existing pattern?** Check similar features

---

## Testing Your Changes

```bash
# Build to catch errors
xcodebuild -scheme Backmind_v1 -destination 'platform=iOS Simulator,name=iPhone 17 Pro' build 2>&1 | grep -E "(error:|warning:)"
```

Common build errors and fixes:

| Error | Fix |
|-------|-----|
| "has no member 'X'" | Check correct property name in this doc |
| "cannot conform to 'Encodable'" | Use Encodable struct, not [String: Any] |
| "is not available due to missing import" | Add required import |
| "argument passed to call that takes no arguments" | Check method signature |
