

---
<!-- Source: PRD/00-table-of-contents.md -->

# Backmind PRD - Table of Contents

**Version:** 1.0 (MVP)
**Last Updated:** December 2025

> **Note:** For technical implementation details, see the [TDD folder](../TDD/).

---

## Sections

| Section | Title | What's Covered |
| --- | --- | --- |
| **1** | Overview & Vision | Product definition, core insight (92% abandonment), differentiators, research foundation (Huberman, Gollwitzer, Baumeister), MVP goal, success metrics targets |
| **2** | User & Market | Primary persona (aspiring self-improver), secondary persona (ADHD/neurodivergent), market size ($5.4B), competitive gap, pricing ($39.99 one-time), distribution strategy |
| **3** | Terminology & Concepts | Definitions for Identity, Building Block, Guardrail, Trigger, Temptation Context, Nudge, Check-in, System. Trigger quality criteria. Caps and limits. |
| **4** | Onboarding Flow | Complete 16-step flow with screens, education moments, AI help touchpoints, warning screens at caps, sign-in placement rationale, data created |
| **5** | AI Help System | 7 AI help features with full prompts: Combine Identities, Simplify Block, Prioritize Blocks, Evaluate Triggers, Find Why, Find Keystone, Ideas When Stuck |
| **6** | Voice Logging & Capture | In-app voice, widget, Siri integration, AI classification prompt, confidence thresholds, guardrail count extraction, confirmation flows, error states |
| **7** | Nudges & Check-ins | Nudge timing and copy, check-in two-phase system (opening/closing), notification actions, frequency caps, phase-based timing, notification payloads |
| **8** | Dashboard & Progress | Layout, identity cards, health color system (no streaks), progress display, tap interactions, empty states, completion/over-limit messaging, weekly reset |
| **9** | Weekly Summary | Generation timing, AI prompt, summary variations (great/mixed/tough week), edge cases, sharing, backend generation flow |
| **10** | Settings & Edit/Delete | Full settings screens, edit flows for identities/blocks/guardrails, timing settings, notification toggles, account management, data integrity on delete |
| **11** | Tech Stack & Architecture | iOS (Swift/SwiftUI/SwiftData), Supabase (Auth/Postgres/Edge Functions), Claude Haiku, APNs, project structure, Edge Function code, widget/Siri implementation |
| **12** | Data Model | Entity relationship diagram, all entity definitions with fields, computed properties, business logic (health calculation), validation rules, data limits, export format |
| **13** | Error Handling & Offline | Error categories, offline queue management, retry strategies, error messages, recovery flows, what works offline, error logging |
| **14** | Success Metrics | Retention targets, engagement metrics, North Star (Habit Success Rate), funnel metrics, cohort analysis, anti-metrics, analytics events, experiment framework |
| **15** | MVP Scope Summary | What's in/out, feature priority matrix (P0/P1/P2), development phases with estimates, 12-week timeline, technical checklist, launch criteria, quick references |
| **16** | AI Copy System | Context schema, tone guidelines (self-compassion framework), 13 touchpoint definitions with prompts, model selection, caching strategy, latency requirements, fallbacks |

---

## Quick Navigation by Task

| If you need to... | Go to Section |
| --- | --- |
| Understand the product vision | 1 |
| Know the target user | 2 |
| Check terminology definitions | 3 |
| Build onboarding screens | 4 |
| Write AI prompts | 5 |
| Implement voice logging | 6 |
| Set up notifications | 7 |
| Build the dashboard | 8 |
| Create weekly summaries | 9 |
| Build settings screens | 10 |
| Make architecture decisions | 11 |
| Design database schema | 12 |
| Handle errors/offline | 13 |
| Set up analytics | 14 |
| Prioritize features | 15 |
| Write AI-generated copy | 16 |

---

## Key Decisions Reference

| Decision | Answer | Section |
| --- | --- | --- |
| What's the frequency period? | Weekly only (MVP) | 15 |
| When does user sign in? | After all goal creation | 4 |
| What AI model? | Claude Haiku | 11 |
| Streaks? | No — color gradient instead | 8 |
| Check-in timing? | Two-phase (opening + closing) | 7 |
| North Star metric? | Habit Success Rate >50% | 14 |


---
<!-- Source: PRD/01-overview-vision.md -->

# Backmind PRD — Section 1: Overview & Vision

## Product Name

**Backmind**

---

## One-Liner

Your second mind for becoming who you want to be.

---

## Vision

Backmind is a voice-first iOS app that helps users build and maintain identity-based systems. Instead of tracking goals, users define who they want to be (identities), the behaviors that build that identity (building blocks), and the limits that protect it (guardrails). Backmind proactively checks in, logs progress via voice, and provides AI-powered feedback—all grounded in behavioral science research.

---

## Core Insight

> "People don't need another habit tracker. They need someone there for them."
> 

92% of habit trackers are abandoned within 60 days. The problem isn't tracking—it's follow-through. Backmind differentiates by being proactive: it nudges at the right moments, checks in without guilt, and helps users build systems backed by research.

---

## Positioning

| What Backmind Is | What Backmind Is Not |
| --- | --- |
| Identity-based system builder | Goal tracker |
| Proactive accountability partner | Passive logging tool |
| Voice-first capture | Manual data entry |
| Research-backed methodology | Motivational fluff |
| Forgiving, not shaming | Streak-obsessed |

---

## Key Differentiators

| Differentiator | Why It Matters |
| --- | --- |
| **Proactive nudges & check-ins** | App reaches out to user, not just waiting for input |
| **Identity-first framing** | Users define who they want to be, not just what to do |
| **AI-guided setup** | Helps users build effective systems, not just log goals |
| **Research-backed design** | Every feature tied to behavioral science |
| **Voice-first logging** | Lowest friction capture (widget, Siri, in-app) |
| **No streaks, no shame** | Color-coded health, forgiving messaging |

---

## Research Foundation

| Source | Concept | How Backmind Uses It |
| --- | --- | --- |
| Huberman Lab | Identity-based habits | Identities before behaviors |
| Huberman Lab | Limbic friction / Phase-based | Don't nudge in evening; respect energy |
| Huberman Lab | Task bracketing | Triggers tied to existing behaviors |
| Huberman Lab | Permission to fail | No guilt on slip; "what matters is not quitting" |
| Gollwitzer | Implementation intentions | If-then triggers (91% vs 38% success) |
| Baumeister | Willpower depletion | Limit guardrails; each costs mental energy |
| Pennebaker | Expressive writing | Weekly reflection/summary (future) |
| Wegner | Ironic Process Theory | Don't remind negative goals daily |

---

## Success Looks Like

**For users:**

- "I actually follow through now"
- "It checks in at the right moments"
- "I don't feel guilty when I miss—I just keep going"
- "I'm becoming the person I want to be"

**For the product:**

- 50% Day 7 retention
- 30% Day 30 retention
- 3+ voice logs per user per week
- 50% check-in response rate

---

## MVP Goal

Validate that voice logging + proactive check-ins + AI-guided setup = higher follow-through than traditional habit tracking.

---
<!-- Source: PRD/02-user-market.md -->

# Section 2: User & Market

**Version:** 1.0 (MVP)
**Last Updated:** December 2024

---

## What's Covered
Primary persona (aspiring self-improver), secondary persona (ADHD/neurodivergent), market size ($5.4B), competitive gap, pricing ($39.99 one-time), distribution strategy

---

<!-- Paste section content below -->

# **Backmind PRD — Section 2: User & Market Context**

---

## Target User

### Primary Persona: The Aspiring Self-Improver

| Attribute | Description |
| --- | --- |
| **Demographics** | 25-45, professional, likely US-based, English-speaking |
| **Psychographics** | Wants to be better but struggles with consistency. Has tried habit apps before and abandoned them. Values self-improvement but feels overwhelmed by too many goals. |
| **Behavior** | Consumes productivity content (Huberman, self-help podcasts, YouTube). Has downloaded 2-5 habit apps. Uses iPhone. Willing to pay for tools that work. |
| **Pain Points** | "I know what I should do, I just don't do it." "I start strong then fall off." "Apps just make me feel guilty." "I don't need another thing to check—I need something that checks on me." |
| **Motivation** | Wants to be a better version of themselves. Has specific identities in mind: better parent, healthier body, successful career. |

---

### Secondary Persona: ADHD / Neurodivergent User

| Attribute | Description |
| --- | --- |
| **Demographics** | Same age range, often formally or self-diagnosed ADHD |
| **Psychographics** | Executive function challenges. Knows what to do but can't initiate. Forgets commitments. High friction = abandonment. |
| **Behavior** | Voice-first is essential—typing is friction. Needs external prompts to remember. Benefits enormously from proactive check-ins. |
| **Pain Points** | "I forget what I committed to." "By the time I remember, the moment's passed." "I need something that reminds me at the right time." |
| **Motivation** | Wants systems that work WITH their brain, not against it. |

---

### Who Backmind Is NOT For

| User Type | Why Not |
| --- | --- |
| Hardcore quantified-self trackers | Want heatmaps, detailed analytics, manual control. Backmind is simpler. |
| Users who want gamification | Streaks, points, badges. Backmind avoids this intentionally. |
| Users needing team/social features | Backmind is personal accountability, not group-based. |
| Non-English speakers (MVP) | English only for MVP. |
| Android users | iOS only. |

---

## Market Context

### Market Size

| Metric | Value |
| --- | --- |
| US Habit Tracker Market | $5.4B |
| CAGR | 15% |
| Mobile Health App Users (US) | 350M+ downloads/year |

---

### Competitive Landscape

| App | Positioning | Weakness (Backmind Opportunity) |
| --- | --- | --- |
| **Streaks** | Simple streak tracker | Streak-breaking = guilt. No proactive support. |
| **Habitica** | Gamified RPG habit app | Too complex. Gamification doesn't work for everyone. |
| **Fabulous** | Guided wellness journeys | Rigid programs. Not personalized to user's identities. |
| **Way of Life** | Manual tracking | Completely passive. User does all the work. |
| **Habitify** | Multi-platform tracker | Feature-rich but no AI, no voice, no proactive check-ins. |
| **Notion / Obsidian** | DIY systems | High friction. Requires setup expertise. |

---

### Competitive Gap

| Feature | Competitors | Backmind |
| --- | --- | --- |
| Voice-first logging | ❌ None | ✅ Core feature |
| AI-guided goal setup | ❌ None | ✅ Research-backed |
| Proactive check-ins | ❌ Rare | ✅ Core differentiator |
| Identity-based framing | ❌ None | ✅ Foundation |
| If-then trigger capture | ❌ None | ✅ Built into setup |
| No-guilt design | ❌ Most use streaks | ✅ Forgiving by design |
| Temptation-aware reminders | ❌ None | ✅ Only remind when tempted |

---

### Key Market Insight

> "92% of habit trackers are abandoned within 60 days."
> 

Users don't fail because they lack a tracker. They fail because:

1. **No proactive support** — App waits for user to act
2. **Guilt from missed streaks** — One miss = spiral
3. **Too much friction** — Manual logging is work
4. **No system, just goals** — No triggers, no identity framing

Backmind addresses all four.

---

## Pricing Strategy (Post-MVP)

| Model | Price | Rationale |
| --- | --- | --- |
| **One-time purchase** | $39.99 | No subscription fatigue. User owns it. AI costs ~$0.30/user/year—sustainable. |

**Why one-time:**

- Differentiated positioning ("no subscription")
- Lower churn concern (already paid)
- Aligns with "someone there for you" promise (not "pay to keep your data")

**When to add:** v1 public launch, after MVP validated.

---

## Distribution Strategy (Post-MVP)

| Channel | Approach |
| --- | --- |
| **Build-in-public** | X, TikTok, IG Reels, YouTube Shorts, Indie Hackers, Reddit |
| **Content format** | Real usage videos—voice capture → outcome |
| **Product Hunt** | Launch moment |
| **Reddit** | r/productivity, r/getdisciplined, r/ADHD, r/iOSProgramming |
| **Word of mouth** | Snapshot sharing to friends |

---

## MVP Validation Goals

| Question | How to Validate |
| --- | --- |
| Does voice logging reduce friction? | Compare log frequency to manual apps |
| Do proactive check-ins increase follow-through? | Check-in response rate + completion rate |
| Does AI-guided setup help users build better systems? | Compare trigger quality, simplification rate |
| Do users stick with it? | Day 7, Day 30 retention |
| Do users feel supported, not shamed? | Qualitative feedback |

---
<!-- Source: PRD/03-terminology-concepts.md -->

# Backmind PRD — Section 3: Terminology & Concepts

---

## Core Terminology

| Term | Definition | Example |
| --- | --- | --- |
| **Identity** | Who the user wants to be. The aspirational self they're building toward—or maintaining. | "Athletic Man," "Present Dad," "Successful Founder" |
| **Building Block** | A positive, repeatable behavior that supports an identity. Something to do more of. | "Exercise 4x/week," "Wake up early," "2 hours deep work daily" |
| **Guardrail** | A limit on negative behavior that protects identities. Something to do less of. | "≤5 beers/week," "≤2 fast food meals," "No phone after 10pm" |
| **Trigger** | The specific cue that initiates a building block. Tied to time, place, or existing behavior. | "After dropping off Aurelia," "Monday after work," "Saturday morning" |
| **Temptation Context** | When the user is most likely to break a guardrail. Used to time check-ins. | "Friday nights," "When stressed," "At social events" |
| **Nudge** | A proactive prompt to take action on a building block. | "It's Tuesday after drop-off. Gym time?" |
| **Check-in** | A proactive prompt to report status—especially for guardrails. | "Any beers today?" |
| **System** | The complete operating framework: Identities + Building Blocks + Guardrails + Triggers + Check-ins working together. Backmind IS the system. | The whole app experience |
| **Log** | A voice or tap confirmation that a building block was completed or a guardrail event occurred. | "I went running" → logged to "Exercise 4x/week" |

---

## Concept Relationships

`┌─────────────────────────────────────────────────────────────┐
│                         SYSTEM                              │
│                       (Backmind)                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    IDENTITY                          │   │
│  │               "Athletic Man"                         │   │
│  │                                                      │   │
│  │   ┌─────────────────┐    ┌─────────────────┐        │   │
│  │   │ BUILDING BLOCK  │    │   GUARDRAIL     │        │   │
│  │   │ Exercise 4x/wk  │    │ ≤5 beers/week   │        │   │
│  │   │                 │    │                 │        │   │
│  │   │ TRIGGER:        │    │ TEMPTATION:     │        │   │
│  │   │ Tue/Thu after   │    │ Fri/Sat nights  │        │   │
│  │   │ drop-off        │    │                 │        │   │
│  │   │                 │    │ WHY:            │        │   │
│  │   │ NUDGE:          │    │ "Clear mornings │        │   │
│  │   │ "Gym time?"     │    │ for workouts"   │        │   │
│  │   │                 │    │                 │        │   │
│  │   │                 │    │ CHECK-IN:       │        │   │
│  │   │                 │    │ "Any beers?"    │        │   │
│  │   └─────────────────┘    └─────────────────┘        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘`

---

## Identity

### What It Is

The person the user wants to be—not what they want to do, but who they want to become (or remain).

### Research Basis

| Source | Finding |
| --- | --- |
| Huberman Lab | Identity-based habits are more durable than goal-based habits |
| James Clear (Atomic Habits) | "Every action is a vote for the type of person you want to become" |
| Self-Determination Theory | Intrinsic motivation tied to identity is stronger than extrinsic rewards |

### Backmind Interpretation: Blocks, Not Votes

We translate James Clear's "vote" metaphor into our "blocks" language to avoid political connotations and tie into our existing "Building Blocks" terminology:

> **"Block by block, you're building who you want to become."**

Each completion of a building block is a "block" for that identity:
- **"That's a block for Athletic Man."** (confirmation after logging)
- **"3 blocks for Present Dad this week."** (progress summary)
- **Identity winning = blocks > missed** (health calculation)

This framing emphasizes construction and building—fitting naturally with "Building Blocks" terminology.

### Rules

| Rule | Rationale |
| --- | --- |
| Soft cap at 3 identities | Cognitive load. Focus strengthens commitment. |
| Hard cap at 5 identities | Prevent fragmentation |
| Warn at 3+ | "Research shows fewer identities = stronger commitment" |
| Can link to multiple building blocks | One identity, many supporting behaviors |
| Can link to multiple guardrails | One identity, multiple protections |
| One guardrail can link to multiple identities | "≤5 beers" affects Athletic Man AND Present Dad AND Founder |

### Examples

| Good Identity | Why It Works |
| --- | --- |
| "Athletic Man" | Clear, aspirational, can attach many behaviors |
| "Present Dad" | Specific role, emotional resonance |
| "Successful Founder" | Career identity, meaningful |
| "Healthy Person" | Broad but clear |

| Weak Identity | Why It's Weak | AI Help Suggestion |
| --- | --- | --- |
| "Better" | Too vague | "Better at what? Who do you want to be?" |
| "Not lazy" | Negative framing | "What's the opposite? Who is that person?" |
| "Gym guy" | Too narrow | "Could this be part of a bigger identity like 'Athletic Man'?" |

---

## Building Block

### What It Is

A positive, repeatable behavior the user wants to do. Supports one identity. Has a frequency and trigger.

### Research Basis

| Source | Finding |
| --- | --- |
| Gollwitzer | Implementation intentions (if-then) succeed 91% vs 38% for vague goals |
| Huberman | Task bracketing—behaviors anchored to context stick better |
| Huberman | Simple > complex. "Exercise 4x" beats "Legs Mon/Thu, Back Tue/Wed" |

### Structure

| Field | Required | Description | Example |
| --- | --- | --- | --- |
| Text | Yes | What the behavior is | "Exercise 4x/week" |
| Identity | Yes | Which identity it supports | Athletic Man |
| Frequency | Yes | How often | "4x/week," "daily," "weekdays" |
| Triggers | Yes | When/where/after what | "Tuesday after drop-off, Wednesday after work" |
| Days | Depends | Specific days if frequency is X times/week | Mon, Wed, Fri, Sat |

### Rules

| Rule | Rationale |
| --- | --- |
| Soft cap at 3 per identity | Goal dilution research—too many = lower completion on all |
| Total soft cap ~8-10 | Huberman 21-day system: aim for 6, expect 4-5 |
| Warn if complex | Encourage simplification |
| Must have at least one trigger | If-then is the core mechanism |
| AI can help simplify | "Want me to suggest a simpler version?" |
| AI can help prioritize | "Want help finding what matters most?" |

### Examples

| Good Building Block | Trigger | Why It Works |
| --- | --- | --- |
| "Exercise 4x/week" | "Tue/Thu after drop-off, Sat/Sun morning" | Simple, clear frequency, specific triggers |
| "Wake up early" | "Weekdays at 6am" | Clear, tied to days |
| "2 hours deep work daily" | "Weekdays 9-11am before meetings" | Specific time block |

| Weak Building Block | Problem | AI Help |
| --- | --- | --- |
| "Exercise more" | Vague frequency | "How many times per week?" |
| "Be healthier" | Not a behavior | "What's one thing you'd do to be healthier?" |
| "Legs Mon/Thu, Back Tue/Wed, Cardio Fri" | Too complex | "Could simplify to 'Exercise 5x/week'—you know the split, just track completion" |

---

## Guardrail

### What It Is

A limit on negative behavior. Something the user wants to do less of. Protects identities.

### Research Basis

| Source | Finding |
| --- | --- |
| Baumeister | Willpower depletion—each limit costs mental energy |
| Wegner | Ironic Process Theory—constant reminders increase thoughts about the thing |
| Approach vs Avoidance | Approach-framed goals ("protect my mornings") work better than avoidance ("don't drink") |

### Structure

| Field | Required | Description | Example |
| --- | --- | --- | --- |
| Text | Yes | What the limit is | "≤5 beers/week" |
| Identities | Yes | Which identities it protects (can be multiple) | Athletic Man, Present Dad, Founder |
| Limit | Yes | The number | 5 |
| Period | Yes | Per week/day/month | Per week |
| Temptation Context | Optional | When most tempted | "Friday and Saturday nights" |
| Why | Optional | Approach-framed reason | "Clear mornings for workouts and Aurelia" |

### Rules

| Rule | Rationale |
| --- | --- |
| Soft cap at 2 | Each limit depletes willpower |
| Hard cap at 3 | Prevent overwhelm |
| Warn at 2+ | "Each limit costs mental energy" |
| Can link to multiple identities | "Drinking affects everything" |
| Don't remind daily | Ironic Process Theory—could trigger behavior |
| Only check in at temptation times | Context-appropriate intervention |
| Celebrate zeros | Positive reinforcement for desired behavior |
| When exceeded, focus on not quitting | Research: "slip and continue" ≈ "never slip" success rate |
| AI can help find "why" | Reframes avoidance as approach |
| AI can help find keystone | "Which one would make the biggest difference?" |

### Examples

| Good Guardrail | Why | Temptation Context |
| --- | --- | --- |
| "≤5 beers/week" | "Clear mornings for workouts" | Fri/Sat nights |
| "≤2 fast food meals/week" | "Feel strong, not sluggish" | After long work days |
| "No phone after 10pm" | "Be present in evening, sleep better" | Every night |

| Weak Guardrail | Problem | AI Help |
| --- | --- | --- |
| "No beer ever" | Prohibition framing, likely to fail | "What's a realistic limit you could stick to?" |
| "Don't be lazy" | Not measurable | "What specific behavior do you want to limit?" |
| "Eat better" | Not a limit | "This sounds like a building block. What do you want to limit?" |

---

## Trigger

### What It Is

The specific cue that initiates a building block. Tied to time, place, or existing behavior.

### Research Basis

| Source | Finding |
| --- | --- |
| Gollwitzer | If-then implementation intentions: 91% vs 38% success |
| Huberman | Task bracketing—brain encodes what happens before/after habit |
| BJ Fogg | Tiny Habits—anchor new behaviors to existing ones |

### Types

| Type | Example | Strength |
| --- | --- | --- |
| **After existing behavior** | "After I drop off Aurelia" | 🟢 Strongest—tied to something you already do |
| **Specific time + day** | "Monday 6pm" | 🟢 Strong—predictable |
| **Vague time** | "Morning" | 🟡 Medium—needs specificity |
| **When I have time** | "Saturday when free" | 🔴 Weak—no actual cue |
| **When I feel like it** | "When motivated" | 🔴 Very weak—feeling is unreliable |

### AI Evaluation

AI evaluates trigger quality during setup:

| Trigger | AI Assessment | AI Response |
| --- | --- | --- |
| "Tuesday after dropping off Aurelia" | Strong | ✓ "Got it. I'll nudge you then." |
| "Wednesday after work" | Strong | ✓ "What time do you usually finish?" |
| "Saturday when I have free time" | Weak | ⚠ "Research shows 'when I have time' triggers fail most often. Can you anchor to something specific?" |
| "Sunday morning" | Medium | ✓ "What time? Or after what?" |

---

## Nudge vs Check-in

### Nudge

| Attribute | Description |
| --- | --- |
| **Purpose** | Prompt user to take action |
| **Used for** | Building blocks |
| **Timing** | At trigger time |
| **Tone** | Encouraging, action-oriented |
| **Example** | "It's Tuesday after drop-off. Gym time?" |

### Check-in

| Attribute | Description |
| --- | --- |
| **Purpose** | Ask user to report status |
| **Used for** | Guardrails (and daily summaries) |
| **Timing** | At temptation time, or end of temptation day |
| **Tone** | Supportive, no guilt, celebrates zeros |
| **Example** | "It's Friday night. Any beers today?" |

---

## System

### What It Is

The complete framework working together. Backmind IS the system.

`System = Identities + Building Blocks + Guardrails + Triggers + Nudges + Check-ins + AI Feedback`

### Why This Framing Matters

| Traditional Apps | Backmind |
| --- | --- |
| "Track your goals" | "Build your system" |
| Individual habits in isolation | Everything connected to identity |
| User figures it out | AI helps design for success |
| Passive logging | Proactive partnership |

Users aren't tracking goals. They're running a system that makes them who they want to be.

---
<!-- Source: PRD/04-onboarding-flow.md -->

# Backmind PRD — Section 4: Onboarding Flow

---

## Overview

Onboarding is where Backmind differentiates. It's not just setup—it's education. Users learn WHY the system works while building the foundation of their personal identity system.

**Design philosophy:** Get users invested quickly with identity creation (~2-3 minutes), then guide them to fill in building blocks, guardrails, and triggers from the dashboard post-onboarding. This keeps onboarding short enough to complete in one sitting while still educating on the research behind the approach.

---

## Flow Summary (8-Screen Identity-First Flow)

| Step | Screen | Purpose |
| --- | --- | --- |
| 1 | Welcome | Set tone, introduce Backmind |
| 2 | Architecture | Explain identities, building blocks, guardrails structure |
| 3 | Why It Works | Research stats (identity framing, trigger-linked habits, focused limits) |
| 4 | Create Identity | First identity via voice/text + AI parsing (loops for additional) |
| 5 | Identity Loop Check | Review created identities, add another or continue |
| 6 | Sign In | Sign in with Apple (user has investment from identity creation) |
| 7 | Notifications | Request permission with research-backed explanation |
| 8 | Complete | "You're ready" transition to dashboard |

**Total time:** ~2-3 minutes

**After onboarding:** Dashboard first-run guide auto-opens the first identity and prompts user to add their first building block. Building blocks, guardrails, triggers, outcomes, and temptation contexts are all added post-onboarding via the identity detail view and settings. See [Post-Onboarding: Guided Setup](#post-onboarding-guided-setup) below.

---

## Visual Design

All onboarding screens share a consistent warm, premium editorial aesthetic matching the dashboard:

**Background:** Every screen uses `BMPaperTexture` over `Color.bmBackground` for a warm paper grain feel:
```swift
.background(ZStack { Color.bmBackground; BMPaperTexture() })
```

**Card shadows:** All cards use `.bmCardShadow()` for subtle warm brown shadows, following the ConceptCard pattern:
```swift
.clipShape(RoundedRectangle(cornerRadius: BMRadius.card))
.bmCardShadow()
```

**Typography:** Satoshi (body) + Gochi Hand (accents). See Section 11 for full design system reference.

**Accessibility:** `BMPaperTexture` respects `accessibilityReduceMotion`. No additional accessibility work needed.

---

## Step 1: Welcome

`WelcomeView.swift`

```
┌─────────────────────────────────────────┐
│                                         │
│              [Backmind Logo]            │
│                                         │
│      Welcome to Backmind                │
│                                         │
│      Your second mind for becoming      │
│      who you want to be.                │
│                                         │
│      Most habit apps track what you     │
│      do. Backmind helps you become      │
│      who you want to be—and stays       │
│      there with you along the way.      │
│                                         │
│      Let's build your system.           │
│                                         │
│            [Get Started]                │
│                                         │
└─────────────────────────────────────────┘
```

---

## Step 2: Architecture

`ArchitectureView.swift`

Explains the three core concepts with animated concept cards:

- **Identities** — Who you want to be (e.g., "Athlete", "Present Parent")
- **Building Blocks** — Behaviors that build the identity (e.g., "Exercise 4x/week")
- **Guardrails** — Limits that protect the identity (e.g., "≤5 beers/week")

Each concept is presented as a card with icon, title, and brief explanation. Cards use `.bmCardShadow()`.

---

## Step 3: Why It Works

`WhyItWorksView.swift`

Shows compelling research stats in card format:

**Identity framing stat:**
- "I want to run more" → 23% success
- "I'm a runner" → 87% success
- Insight: Identity statements stick 3.7x better than goal statements

**Trigger-linked habits stat:**
- "I'll exercise on Tuesday" → 38% success
- "After I drop off the kids → gym" → 91% success
- Insight: Anchoring to existing routines more than doubles success

**Focused limits card:**
- Scattered restrictions drain willpower
- 1-3 focused limits outperform many vague ones
- "Willpower works like a muscle—it gets tired. That's why we cap guardrails at 3."

CTA: "Let's build your system"

---

## Step 4: Create Identity

`IdentityCreationView.swift`

### First Identity

```
┌─────────────────────────────────────────┐
│                                         │
│      What's the most important          │
│      identity you want to build         │
│      —or maintain?                      │
│                                         │
│      Think about who you want to        │
│      be, not just what you want         │
│      to do.                             │
│                                         │
│      [Rotating example prompt]          │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 Tap to speak or type...     │    │
│  └─────────────────────────────────┘    │
│                                         │
│      [AI suggestion chips appear        │
│       after 3+ characters typed]        │
│                                         │
│      More examples:                     │
│      • "I want to be an athlete"        │
│      • "A present father"               │
│      • "Successful founder"             │
│                                         │
│      [Skip for now]                     │
│                                         │
└─────────────────────────────────────────┘
```

**AI features:**
- **Identity parsing:** AI extracts clean identity name + icon from natural language input
- **Suggestion chips:** After 3+ characters, debounced AI suggestions appear (e.g., "Dedicated Athlete", "Health-First Person", "Consistent Gym-Goer")
- **Rotating examples:** One example shown at a time, rotating every 4s (reduces cognitive load for ND users)
- **Fallback:** Local keyword matching when AI is unavailable

**On submit:** Confirmation sheet appears with parsed identity name + icon. User can confirm or edit.

### Additional Identities

If user has existing identities, the screen shows them in a summary card (with `.bmCardShadow()`) and prompts "Want to add another?"

**Skip behavior:** Available after first identity is created. Label adapts: "Skip — I'm good with one" / "Skip — I'm good with 2" / "Keep it focused" (at 3+).

### Warning at 3+ Identities

```
┌─────────────────────────────────────────┐
│                                         │
│      ⓘ Most successful users focus      │
│      on 2-3 identities. You can         │
│      always add more later.             │
│                                         │
└─────────────────────────────────────────┘
```

Shown as `BMInfoCard` with `isHighlighted: true`. Positive framing — no "warning" language.

**Hard cap:** 5 identities maximum.

---

## Step 5: Identity Loop Check

`LoopCheckView.swift`

Decision point: add another identity or continue to sign-in.

```
┌─────────────────────────────────────────┐
│                                         │
│      ✓ Great progress!                  │
│                                         │
│      You've created 2 identities.       │
│      Let's secure your account.         │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🏃 Athlete                     │    │
│  │    Ready to build          ✓   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 👨‍👧 Present Parent               │    │
│  │    Ready to build          ✓   │    │
│  └─────────────────────────────────┘    │
│                                         │
│      Want to add another identity?      │
│      Most people have 2-3 core          │
│      identities they're building.       │
│                                         │
│      [Continue]                         │
│      [Add another identity]             │
│                                         │
└─────────────────────────────────────────┘
```

Identity cards use `.bmCardShadow()`.

**Button priority:**
- At 2+ identities: "Continue" is primary, "Add another" is secondary
- At 1 identity: "Add another identity" is primary, "Continue to guardrails" is ghost
- At 3+ identities: Info card shown, "Continue" is primary

---

## Step 6: Sign In

`OnboardingSignInStep.swift`

Placed after identity creation so user has investment before signing up.

```
┌─────────────────────────────────────────┐
│                                         │
│      Let's save your system             │
│                                         │
│      Your data syncs securely           │
│      across devices.                    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🏃 Athlete              ✓     │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ 👨‍👧 Present Parent        ✓     │    │
│  └─────────────────────────────────┘    │
│                                         │
│      ⓘ Your identities and progress    │
│      are encrypted and never shared.    │
│      Only you can see your data.        │
│                                         │
│      [ Sign in with Apple]             │
│                                         │
│      Your data stays private and        │
│      syncs securely                     │
│                                         │
└─────────────────────────────────────────┘
```

Identity summary rows use `.bmCardShadow()`.

---

## Step 7: Notification Permission

`NotificationPermissionView.swift`

```
┌─────────────────────────────────────────┐
│                                         │
│              [🔔 icon]                  │
│                                         │
│      One more thing.                    │
│                                         │
│      Backmind works best when it can    │
│      check in with you.                 │
│                                         │
│      ⓘ Research shows that well-timed   │
│      nudges make you 3x more likely     │
│      to follow through. I'll only       │
│      nudge you at your trigger times    │
│      —never randomly.                   │
│                                         │
│      [🔔 Allow Notifications]           │
│                                         │
│      [I'll decide in settings]          │
│                                         │
└─────────────────────────────────────────┘
```

**If "I'll decide in settings":** App works, but user misses proactive features. Can enable later in settings.

---

## Step 8: Onboarding Complete

`OnboardingCompleteView.swift`

```
┌─────────────────────────────────────────┐
│                                         │
│      You're ready.                      │
│                                         │
│      Your system is built.              │
│      Backmind is here.                  │
│                                         │
│      Now go do something worth          │
│      logging.                           │
│                                         │
│            [Let's go]                   │
│                                         │
└─────────────────────────────────────────┘
```

---

## Onboarding Data Created

After onboarding, the following is saved:

| Data | Example |
| --- | --- |
| User account | Sign in with Apple ID |
| Identities (1-5) | Athlete, Present Parent, Entrepreneur |
| Notification preference | Enabled/disabled |

**Not created during onboarding** (deferred to post-onboarding guided setup):

| Data | Where it's added |
| --- | --- |
| Building blocks | Identity detail → Add Block Sheet |
| Triggers | Settings → Edit Block → Triggers section |
| Outcomes (WOOP) | Settings → Edit Block → "Why It Matters" |
| Conditions for success | Settings → Edit Block → Conditions |
| Bad day versions | Settings → Edit Block → Bad Day Mode |
| Guardrails | Identity detail → Add Guardrail Sheet |
| Guardrail → Identity links | Add Guardrail Sheet (multi-select) |
| Temptation contexts | Settings → Edit Guardrail → Risk Context |
| Why statements | Settings → Edit Guardrail → Why Discovery |

---

## Post-Onboarding: Guided Setup

After onboarding completes, users land on the dashboard with identities but no building blocks or guardrails. The app guides them through filling in the rest progressively.

### First-Run Guide (Immediate)

When `appState.hasCompletedFirstBlock` is false and the user has identities with no blocks:

1. Dashboard auto-opens the first identity's detail view with `isFirstRunGuide = true`
2. Special CTA: "Let's add your first building block"
3. User creates their first block via `AddBlockSheet` (action, frequency, period)
4. Marked complete after first block is saved

### Building Block Creation (AddBlockSheet)

Simplified from the original onboarding spec. Captures only:
- **Action text** — "I will..."
- **Frequency** — 1-14 (stepper)
- **Period** — daily or weekly

Triggers, outcomes, conditions, and bad day versions are added later through "Strengthen" editing.

### Guardrail Creation (AddGuardrailSheet)

Available from identity detail view. Captures:
- **Guardrail text** — "I will limit..."
- **Limit count** — 0-20
- **Period** — daily or weekly
- **Linked identities** — multi-select

Temptation context and why statements are added later through editing.

### Strengthen (Progressive Deepening)

Once blocks and guardrails exist, users can strengthen them via Settings → Edit:

**Building block strengthening** (`EditBlockView`):
- Triggers (behavioral anchors)
- Outcome / "Why it matters" (WOOP)
- Conditions for success
- Bad day mode (minimum version)

**Guardrail strengthening** (`EditGuardrailView`):
- Risk context ("When does this situation typically happen?")
- Check-in time windows (conditional on risk context)
- Why discovery (with AI-assisted conversation)

### Intervention-Driven Setup

The dashboard also nudges users to fill in missing data through interventions:
- **Block interventions:** WOOP prompts when a block fails for consecutive weeks
- **Guardrail interventions:** Prompted when guardrails exceed limits repeatedly
- These leverage the detailed flows originally designed for onboarding (see Appendix A)

---

## Appendix A: Detailed Specifications for Post-Onboarding Features

> The following wireframes and specifications were originally designed as onboarding steps but now apply to post-onboarding creation and editing flows. They remain the reference for how these features should work when implemented in the dashboard/settings context.

### Building Block Education

Research backing shown in Why It Works (Step 3) and reinforced contextually:
- 91% vs 38% success rate (trigger-linked vs vague intentions)
- Habit stacking principle ("After I [existing habit], I will [new behavior]")

### Building Block Creation (Detailed)

See Section 6 (Voice Logging & Capture) for the voice/text input pattern.

**Frequency auto-extraction** from natural language:

| User types | Extracted frequency |
|------------|---------------------|
| "Exercise daily" | 7x/week |
| "Read 3x a week" | 3x/week |
| "Meditate twice a week" | 2x/week |
| "Work on marketing 5 times per week" | 5x/week |
| "Exercise" (no frequency) | Default 3x/week |

### Building Block Outcome (WOOP)

**Research:** Oettingen's WOOP research shows that mentally contrasting desired outcomes with obstacles increases goal attainment (Wang et al., 2021 meta-analysis, g = 0.34).

Prompt: "What's the best thing about doing this consistently? Imagine you've been nailing it for a month. What does that feel like?"

Examples:
- "I feel strong and confident"
- "I have energy to play with my daughter"
- "I'm proud of who I'm becoming"

Outcome is stored on building block. Used in nudges and Failed Week Review.

### Trigger Input (Habit Stacking)

Prompt: "What will trigger this? The strongest triggers anchor to something you already do—not just times."

Examples (habit stacking):
- "After I drop off Aurelia and get back in the car"
- "After I close my laptop at the end of work"
- "After I finish my morning coffee"

**Intelligent trigger parsing:** AI automatically parses compound triggers.

Example input: "after I drop off the kids and before I start my weekend"

AI parses into:
1. "After I drop off the kids"
2. "Before I start my weekend"

**Parsing rules:**
- AI detects conjunctions: "and", "or", "also", "plus", "then"
- AI detects separate clauses: "after X, before Y", "when X and when Y"
- Each extracted trigger is cleaned up with proper capitalization
- Each trigger becomes a complete "After I..." or "Before I..." statement

### AI Feedback on Triggers

**Trigger strength indicators:**

| Rating | Indicators |
|--------|-----------|
| Strong (Green) | Anchored to existing behavior ("after I", "when I finish") |
| Good Start (Amber) | Partially anchored, could be more specific |
| Needs Refinement (Orange) | Time only, vague, or location only |

**AI feedback examples:**
- Time-only: "Times alone are easy to ignore. What are you already doing around 9am?"
- Vague: "Which morning moment? 'After I finish my coffee' would be stronger."
- Strong: "Strong trigger—anchored to something you already do."

### "Help me find triggers" Flow

AI helps identify existing habits to stack onto:

```
AI Prompt Template:
Help the user identify existing habits they could stack a new behavior onto.

New building block: {block.name}
Frequency needed: {block.frequency}
Identity: {identity.name}

Ask 2-3 questions to surface existing routines:
- What do you already do every [morning/day/week] without thinking?
- What's something that happens right before you'd want to do {block.name}?
- Where are the natural transition moments in your day?

Then suggest 2-3 specific "After I [existing habit], I will [new behavior]" triggers.
```

### Bad Day Mode

Prompt: "Life happens. Want to set a minimum version for tough days?"

| Block | AI Suggestion |
|-------|---------------|
| "Exercise 4x/week" | "10 pushups" or "Walk around the block" |
| "2 hours deep work" | "15 minutes of focused work" |
| "Read 30 minutes" | "Read 5 pages" |
| "Meditate 20 minutes" | "3 deep breaths" |

`badDayVersion` stored on building block. Used in Bad Day Mode flow (Feature 06).

### Guardrail Education

Research backing shown in Why It Works (Step 3) and reinforced contextually:
- Every limit costs mental energy
- 1-3 focused limits outperform many vague ones
- Cap at 3 guardrails maximum

### Guardrail Creation (Detailed)

**Input:** Natural language (e.g., "No more than 5 beers a week")

**Value linking:** "Which identities does this work against?" (multi-select)

**Temptation context:** "When are you most tempted?" (e.g., "Friday nights", "When I'm stressed")

**Why (optional):** "Why does this matter to you?" — turns "don't do X" into "protect Y"

**AI-assisted why discovery:** If user taps "Help me find my why", trigger AI help (see Section 5).

### Warning Thresholds

| Entity | Warning at | Hard cap |
|--------|-----------|----------|
| Identities | 3+ | 5 maximum |
| Building blocks (per identity) | 3+ | No hard cap |
| Guardrails | 2+ | 3 maximum |

Warning language uses positive framing (e.g., "Most successful users focus on 2-3") rather than negative framing. Research shows focused limits outperform scattered ones.


---
<!-- Source: PRD/05-ai-help-system.md -->

# Backmind PRD — Section 5: AI Help System

---

## Overview

AI help is offered at friction points throughout onboarding and editing. It's always optional, always collaborative, and grounded in research.

**Core principle:** AI is a coach, not a boss. User stays in control.

---

## AI Help Touchpoints

| Moment | Trigger | AI Help Offered |
| --- | --- | --- |
| Too many identities | User has 3+ and tries to add another | "Help me combine" |
| Complex building block | AI detects multiple activities/days in one goal | "Simplify this" |
| Too many building blocks | User has 3+ per identity | "Help me prioritize" |
| Weak trigger | AI detects vague trigger ("when I have time") | Automatic suggestion |
| Guardrail "why" | User is stuck or taps help | "Help me find my why" |
| Too many guardrails | User has 2+ and tries to add another | "Help me focus" |
| Stuck anywhere | Blank input, long pause | "Need some ideas?" |

---

## AI Help 1: Combine Identities

### Trigger

User has 3+ identities and taps "Add anyway" on the warning screen.

### UI Flow

**Step 1: Offer help**

`┌─────────────────────────────────────────┐
│                                         │
│      You've got:                        │
│      • Athletic Man                     │
│      • Healthy Person                   │
│      • Good Husband                     │
│      • Present Dad                      │
│                                         │
│      That's a lot to focus on.          │
│                                         │
│      Want help combining these into     │
│      fewer, stronger identities?        │
│                                         │
│    [Yes, help me]    [No, keep all]     │
│                                         │
└─────────────────────────────────────────┘`

**Step 2: AI suggestion**

`┌─────────────────────────────────────────┐
│                                         │
│      Here's what I'm thinking:          │
│                                         │
│      "Athletic Man" and "Healthy        │
│      Person" are closely related—       │
│      both about taking care of your     │
│      body.                              │
│                                         │
│      Could combine into just            │
│      "Athletic Man" (which implies      │
│      health anyway).                    │
│                                         │
│      "Good Husband" and "Present Dad"   │
│      are both about family—could        │
│      become "Family Man" or stay        │
│      separate if they feel different.   │
│                                         │
│      Suggested:                         │
│      • Athletic Man                     │
│      • Present Dad                      │
│      • Good Husband                     │
│                                         │
│    [Use this]    [Edit myself]          │
│                                         │
└─────────────────────────────────────────┘`

### AI Prompt

`You are an identity coach helping users simplify their identity goals.

USER'S IDENTITIES:
{{identities_list}}

TASK:
Suggest how these could combine into 2-3 stronger, clearer identities.
Explain briefly why combining strengthens commitment.

RESEARCH CONTEXT:
- Cognitive load theory: Working memory holds ~4 items
- Identity research: Fragmented identity = weaker commitment
- Fewer, clearer identities = stronger habits

RULES:
- Keep user's language style
- Don't lose meaning, just consolidate
- Be warm and collaborative, not prescriptive
- Suggest, don't dictate

RESPOND IN JSON:
{
  "analysis": "Brief explanation of what overlaps and why combining helps",
  "suggested_identities": ["Identity 1", "Identity 2", "Identity 3"],
  "reasoning": "One sentence on why this set is stronger"
}`

---

## AI Help 2: Simplify Building Block

### Trigger

AI detects complexity in user's building block input:

- Multiple distinct activities ("legs Monday, back Tuesday")
- Multiple time specifications with different activities
- Long, detailed description

### Detection Logic

| Signal | Example | Complexity Score |
| --- | --- | --- |
| Multiple body parts/activities | "legs, back, cardio" | +2 |
| Day-specific activities | "Monday do X, Tuesday do Y" | +2 |
| Word count > 15 | Long description | +1 |
| Multiple commas/semicolons | List structure | +1 |

**Threshold:** Score ≥ 3 triggers simplification offer.

### UI Flow

**Step 1: Offer help**

`┌─────────────────────────────────────────┐
│                                         │
│      That's a detailed plan!            │
│                                         │
│      Research shows simpler goals are   │
│      easier to stick to—and just as     │
│      effective for accountability.      │
│                                         │
│      Want me to suggest a simpler       │
│      version?                           │
│                                         │
│    [Yes, simplify]    [Keep detailed]   │
│                                         │
└─────────────────────────────────────────┘`

**Step 2: AI suggestion**

`┌─────────────────────────────────────────┐
│                                         │
│      Your detailed plan is great for    │
│      knowing what to do AT the gym.     │
│                                         │
│      But for tracking, simpler is       │
│      better:                            │
│                                         │
│      → "Exercise 5x a week"             │
│                                         │
│      You can keep your split routine—   │
│      just track it as one goal here.    │
│                                         │
│    [Use simplified]    [Keep detailed]  │
│                                         │
└─────────────────────────────────────────┘`

### AI Prompt

`You are a habit coach helping users simplify their goals.

USER'S BUILDING BLOCK: "{{user_input}}"
LINKED IDENTITY: {{identity}}

TASK:
Suggest a simpler version that captures the essence without the complexity.
Explain briefly why simpler is often better.

RESEARCH CONTEXT:
- Complexity research: Simple, clear goals outperform complex ones
- Tracking overhead: More granularity = more friction = more abandonment
- The goal is accountability, not detailed planning

RULES:
- Don't lose the core intent
- Make it trackable as one thing, not multiple
- Be supportive, not dismissive of their detailed plan
- Acknowledge their planning is useful—just not for tracking

RESPOND IN JSON:
{
  "original": "{{user_input}}",
  "simplified": "Simple version here",
  "explanation": "Brief explanation of why simpler works for tracking"
}`

---

## AI Help 3: Prioritize Building Blocks

### Trigger

User has 3+ building blocks for one identity and taps "Add anyway" or "Help me prioritize."

### UI Flow

**Step 1: Offer help**

`┌─────────────────────────────────────────┐
│                                         │
│      You've got 4 building blocks for   │
│      Athletic Man:                      │
│                                         │
│      • Exercise 4x/week                 │
│      • Stretch daily                    │
│      • Drink 8 glasses of water         │
│      • Take vitamins                    │
│                                         │
│      That's a lot to track. Want help   │
│      finding what matters most?         │
│                                         │
│    [Yes, help me]    [Keep all]         │
│                                         │
└─────────────────────────────────────────┘`

**Step 2: AI suggestion**

`┌─────────────────────────────────────────┐
│                                         │
│      Here's what I'd focus on:          │
│                                         │
│      Keep tracking:                     │
│      ✓ Exercise 4x/week                 │
│        (your linchpin—drives            │
│        everything else)                 │
│      ✓ Stretch daily                    │
│        (supports longevity, prevents    │
│        injury)                          │
│                                         │
│      Don't need tracking:               │
│      ○ Take vitamins                    │
│      ○ Drink water                      │
│                                         │
│      These are fine habits—just do      │
│      them. They don't need the mental   │
│      overhead of tracking.              │
│                                         │
│      Focus your energy on what moves    │
│      the needle most.                   │
│                                         │
│    [Use suggested]    [Keep all]        │
│                                         │
└─────────────────────────────────────────┘`

### AI Prompt

`You are a habit coach helping users prioritize their goals.

USER'S IDENTITY: {{identity}}
USER'S BUILDING BLOCKS:
{{building_blocks_list}}

TASK:
Identify which goals are highest impact ("linchpin habits") and which could be dropped or combined without losing much.

RESEARCH CONTEXT:
- Linchpin habits: Behaviors that make other habits easier
- Exercise often improves sleep, energy, motivation for other healthy behaviors
- Goal dilution: Too many goals = lower completion on all
- Huberman 21-day system: Aim for ~6 total habits, expect 4-5

RULES:
- Identify 2-3 priority goals
- Explain WHY these are linchpins
- For deprioritized goals, don't say "bad"—say "don't need tracking"
- Be warm, not judgmental

RESPOND IN JSON:
{
  "priority_blocks": [
    {
      "block": "Exercise 4x/week",
      "reason": "Linchpin—drives energy, mood, makes other healthy choices easier"
    },
    {
      "block": "Stretch daily",
      "reason": "Supports longevity, prevents injury"
    }
  ],
  "deprioritize": [
    {
      "block": "Take vitamins",
      "reason": "Good habit, but doesn't need tracking—just do it"
    },
    {
      "block": "Drink water",
      "reason": "Same—automate, don't track"
    }
  ],
  "summary": "Focus on exercise as your linchpin. The others will follow."
}`

---

## AI Help 4: Evaluate Triggers

### Trigger

Automatic after user enters triggers for a building block.

### Operation Modes

| Mode | Purpose |
| --- | --- |
| `parse` | Split compound input ("X and Y") into individual triggers, then evaluate each |
| `evaluate` | Evaluate pre-split triggers (array of strings) |
| `suggest` | Suggest new triggers based on user's routines |

**Default mode:** `parse` — AI intelligently splits compound triggers

### Intelligent Trigger Parsing (Parse Mode)

Users often enter multiple triggers in one sentence:
- "after I drop off the kids and before I start my weekend"
- "in the morning, after lunch, and before bed"

AI parses these into separate triggers:
1. Detects conjunctions: "and", "or", "also", "plus", "then"
2. Detects separate clauses: "after X, before Y"
3. Cleans up each trigger with proper capitalization
4. Evaluates each trigger independently

**Example:**
```
Input: "after I drop off the kids and before I start my weekend"

Output:
- "After I drop off the kids" → STRONG
- "Before I start my weekend" → STRONG
```

### Trigger Quality Evaluation

| Trigger Type | Quality | AI Response |
| --- | --- | --- |
| "After [existing behavior]" | 🟢 Strong | ✓ Accept |
| "Specific day + time" | 🟢 Strong | ✓ Accept |
| "Day + after work/morning" | 🟢 Strong | ✓ Accept, maybe ask time |
| "Morning" / "Evening" | 🟡 Moderate | ✓ Accept, suggest specificity |
| "When I have time" | 🔴 Weak | ⚠ Suggest improvement |
| "When I feel like it" | 🔴 Weak | ⚠ Suggest improvement |
| "Whenever" | 🔴 Weak | ⚠ Suggest improvement |

### Strength Rating Display

Each trigger is displayed with a **prominent full-width colored banner**:

| Strength | Banner | Icon | Color |
| --- | --- | --- | --- |
| Strong | "STRONG TRIGGER" | ✓ checkmark.circle.fill | Green (bmSuccess) |
| Moderate | "GOOD START" | ★ sparkles | Amber (bmAccent) |
| Weak | "NEEDS REFINEMENT" | ⚠ exclamationmark.triangle.fill | Orange (bmPaceRecoverable) |

**Design:** White text on full-width colored background for maximum visibility.

### UI Flow

Each trigger displays as a card with prominent strength banner:

`┌─────────────────────────────────────────┐
│ ✓ STRONG TRIGGER                        │ ← Green banner
├─────────────────────────────────────────┤
│ "After I drop off the kids"             │
│                                         │
│ Great! Anchored to an existing routine. │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ⚠ NEEDS REFINEMENT                      │ ← Orange banner
├─────────────────────────────────────────┤
│ "When I have free time"                 │
│                                         │
│ Vague triggers rarely lead to action.   │
│                                         │
│ 💡 Try this instead:                    │
│ ┌───────────────────────────────────┐   │
│ │ After I close my laptop at end    │   │
│ │ of work                           │   │
│ └───────────────────────────────────┘   │
│                                         │
│ [Use improved]    [Keep original]       │
└─────────────────────────────────────────┘`

### API Request Format

```typescript
interface EvaluateTriggersRequest {
  triggers: string[];      // For "evaluate" mode - pre-split triggers
  rawInput?: string;       // For "parse" mode - single string to split
  blockName: string;
  blockOutcome?: string;
  userRoutines?: string;
  mode: "evaluate" | "suggest" | "parse";
}
```

### API Response Format

```typescript
interface EvaluateTriggersResponse {
  evaluations: [{
    originalText: string;
    strength: "strong" | "moderate" | "weak";
    habitStackingScore: number;     // 0.0-1.0
    suggestion: string | null;      // Tip to improve
    improvedVersion: string | null; // Rewritten version
    reasoning: string;              // Brief explanation
  }];
  suggestedTriggers?: [{            // Only for "suggest" mode
    text: string;
    reasoning: string;
    confidence: number;
  }];
  overallFeedback: string;
  followUpQuestion?: string;
}
```

### AI System Prompt

```
You are a habit formation expert specializing in trigger design.

CORE PRINCIPLE: Habit Stacking
The strongest triggers anchor new behaviors to existing habits, not just times.

Research shows:
- "After I [existing habit]" triggers: 91% success rate
- Time-only triggers ("Tuesday at 9am"): 38% success rate

WHEN PARSING RAW INPUT:
1. User may provide multiple triggers in one sentence
2. Look for conjunctions: "and", "or", "also", "plus", "then"
3. Look for separate clauses: "after X, before Y", "when X and when Y"
4. Split into individual, standalone triggers
5. Each trigger should be a complete "After I..." or "Before I..." statement
6. Evaluate each split trigger separately
7. IMPORTANT: Always capitalize properly (e.g., "After I drop off the kids")

TRIGGER STRENGTH CRITERIA:

STRONG triggers:
- Use "After I..." or "Before I..." format
- Anchor to specific existing behavior
- Include location or context when relevant

MODERATE triggers (Good Start):
- Reference an existing routine but could be more specific
- Have a time AND activity component

WEAK triggers (Needs Refinement):
- Time-only: "Tuesday at 9am", "Every evening"
- Vague: "When I have time", "Whenever I can"
- No anchor: Just a time without behavioral cue

TONE: Encouraging and positive. Help users see how to improve, don't criticize.
```

---

## AI Help 5: Find "Why" for Guardrails

### Trigger

User creates guardrail and either:

- Taps "Help me find my why"
- Leaves why blank and pauses

### UI Flow

**Step 1: Ask what happens**

`┌─────────────────────────────────────────┐
│                                         │
│      Let's find your why.               │
│                                         │
│      What happens when you drink        │
│      too much?                          │
│                                         │
│      Examples:                          │
│      • "I feel sluggish the next day"   │
│      • "I'm not present with my family" │
│      • "I make bad food choices"        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 I feel terrible the next    │    │
│  │    morning and can't work out  │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘`

**Step 2: AI generates approach-framed why**

`┌─────────────────────────────────────────┐
│                                         │
│      Here's a why for you:              │
│                                         │
│      "I want to wake up feeling         │
│       strong so I can crush my          │
│       workouts"                         │
│                                         │
│      or                                 │
│                                         │
│      "Clear mornings mean better        │
│       workouts and more energy for      │
│       Aurelia"                          │
│                                         │
│      This frames your limit as          │
│      protecting something you care      │
│      about—not just avoiding            │
│      something bad.                     │
│                                         │
│   [Use first]   [Use second]   [Edit]   │
│                                         │
└─────────────────────────────────────────┘`

### AI Prompt

`You are helping a user find their personal "why" for limiting a behavior.

USER'S GUARDRAIL: "{{guardrail}}"
IDENTITIES IT AFFECTS: {{identities_list}}
USER SAID (what happens when they overdo it): "{{user_impact}}"

TASK:
Turn their answer into a positive, approach-framed "why" statement.
Provide 2 options—one shorter, one that references specific identities.

RESEARCH CONTEXT:
- Approach goals ("I want to X") work better than avoidance ("I don't want to Y")
- Connecting limits to identities strengthens commitment
- Personal, specific reasons beat generic ones
- Frame as protecting something, not avoiding something

RULES:
- Make it personal to their answer
- Make it approach-framed (toward something good)
- Connect to their identities if possible
- Keep it short and memorable
- Don't be preachy

RESPOND IN JSON:
{
  "why_option_1": "Short approach-framed why",
  "why_option_2": "Longer version that connects to specific identities",
  "explanation": "Brief note on why approach-framing works"
}`

---

## AI Help 6: Find Keystone Guardrail

### Trigger

User has 2+ guardrails and taps "Add anyway" or "Help me focus."

### UI Flow

**Step 1: Offer help**

`┌─────────────────────────────────────────┐
│                                         │
│      You've got:                        │
│      • ≤5 beers/week                    │
│      • ≤2 fast food meals/week          │
│      • No phone after 10pm              │
│                                         │
│      Each limit costs mental energy.    │
│      Want help finding the one that     │
│      matters most?                      │
│                                         │
│    [Yes, help me]    [Keep all]         │
│                                         │
└─────────────────────────────────────────┘`

**Step 2: AI identifies keystone**

`┌─────────────────────────────────────────┐
│                                         │
│      I'd focus on one:                  │
│                                         │
│      → ≤5 beers/week                    │
│                                         │
│      Why? Alcohol is often a trigger    │
│      for other things you're limiting.  │
│                                         │
│      When you drink too much, you're    │
│      more likely to eat fast food,      │
│      stay up late, and skip workouts.   │
│                                         │
│      Control this one, and the others   │
│      get easier.                        │
│                                         │
│      You can always add more limits     │
│      later once this one is solid.      │
│                                         │
│    [Focus on this]    [Keep all]        │
│                                         │
└─────────────────────────────────────────┘`

### AI Prompt

`You are a habit coach helping users find their keystone behavior to limit.

USER'S GUARDRAILS:
{{guardrails_with_identities}}

TASK:
Identify which ONE guardrail would have the biggest ripple effect if maintained.
Explain why this is the keystone.

RESEARCH CONTEXT:
- Keystone habits have cascading effects on other behaviors
- Alcohol often triggers other negative behaviors (bad food, poor sleep, less exercise)
- Willpower depletion: Each limit costs mental energy
- Fewer guardrails = more willpower for building blocks

RULES:
- Pick ONE keystone
- Explain the ripple effect clearly
- Don't shame—just explain the leverage
- Suggest keeping others "for later"

RESPOND IN JSON:
{
  "keystone": "≤5 beers/week",
  "reasoning": "Alcohol triggers other behaviors you're limiting. Control this, and fast food and late nights get easier.",
  "suggestion": "Focus on this one first. Add others once it's solid."
}`

---

## AI Help 7: Ideas When Stuck

### Trigger

User has blank input and pauses for 10+ seconds, or taps "Need ideas?"

### Context-Aware Suggestions

| Context | AI Provides |
| --- | --- |
| Creating identity | Example identities based on common patterns |
| Creating building block | Examples relevant to the linked identity |
| Creating guardrail | Common guardrails for their identities |
| Creating trigger | Trigger examples based on building block type |

### UI Flow (Example: Building Block for Athletic Man)

`┌─────────────────────────────────────────┐
│                                         │
│      Need some ideas?                   │
│                                         │
│      Common building blocks for         │
│      Athletic Man:                      │
│                                         │
│      • Exercise 3-5x a week             │
│      • Stretch or mobility daily        │
│      • Walk 10,000 steps                │
│      • Drink enough water               │
│      • Get 7-8 hours of sleep           │
│      • Meal prep on Sundays             │
│                                         │
│      Tap one to use it, or speak        │
│      your own.                          │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 Or type your own...         │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘`

### AI Prompt

`You are suggesting ideas for a user who is stuck.

CONTEXT: {{context_type}} (identity / building_block / guardrail / trigger)
RELEVANT IDENTITY: {{identity}} (if applicable)
EXISTING ITEMS: {{existing_items}} (so we don't repeat)

TASK:
Suggest 5-6 relevant examples the user could use or adapt.

RULES:
- Be specific, not vague
- Don't repeat what they already have
- Match to their identity if provided
- Keep suggestions common and achievable
- For triggers, suggest time-based AND behavior-based options

RESPOND IN JSON:
{
  "suggestions": [
    "Exercise 4x a week",
    "Stretch for 10 minutes daily",
    "Walk 10,000 steps",
    ...
  ]
}`

---

## UX Principles for All AI Help

| Principle | Implementation |
| --- | --- |
| **Always optional** | User can always "Keep mine" or "Skip" |
| **Collaborative tone** | "Here's what I'm thinking" not "You should" |
| **Explain the why** | Brief research backing for every suggestion |
| **User stays in control** | [Use this] and [Edit myself] always available |
| **No judgment** | Detailed plans are "great for knowing what to do"—not wrong |
| **Quick** | AI response in <2 seconds |
| **Graceful failure** | If AI fails, user can continue manually |

---

## AI Response Times

| Help Type | Target Response |
| --- | --- |
| Trigger evaluation | <1.5 seconds |
| Simplify building block | <2 seconds |
| Combine identities | <2 seconds |
| Prioritize blocks | <2 seconds |
| Find why | <2 seconds |
| Find keystone | <2 seconds |
| Ideas when stuck | <1.5 seconds |

---

## Error Handling

If AI call fails:

`┌─────────────────────────────────────────┐
│                                         │
│      Hmm, I couldn't process that.      │
│                                         │
│      You can continue without my        │
│      suggestions, or try again.         │
│                                         │
│    [Continue anyway]    [Try again]     │
│                                         │
└─────────────────────────────────────────┘`

**Principle:** AI help is enhancement, not requirement. User can always proceed manually.

---
<!-- Source: PRD/06-voice-logging-capture.md -->

# Backmind PRD — Section 6: Voice Logging & Capture

---

## Overview

Voice logging is Backmind's core interaction. Users speak naturally, AI matches to their building blocks or guardrails, and progress is logged with minimal friction.

**Goal:** Fastest possible path from thought to logged.

---

## Capture Methods

| Method | Friction | Use Case |
| --- | --- | --- |
| **In-app voice** | Low | User already in app |
| **Home Screen widget** | Very low | Quick capture without opening app |
| **Lock Screen widget** | Very low | Capture from locked phone (iOS 16+) |
| **Siri Shortcut** | Very low | Hands-free capture |

---

## Logging Flow (All Methods)

`┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  User speaks → Transcription → AI Match → Confirmation      │
│                                                             │
│  "I went running"                                           │
│        ↓                                                    │
│  Apple Speech (on-device)                                   │
│        ↓                                                    │
│  "I went running" (text)                                    │
│        ↓                                                    │
│  Cloud AI (Claude Haiku)                                    │
│        ↓                                                    │
│  Match: "Exercise 4x/week" (confidence: 0.95)               │
│        ↓                                                    │
│  ✓ Got it. Logged to Exercise 4x/week.                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘`

---

## In-App Voice Logging

### Entry Point

Dashboard has persistent mic button:

`┌─────────────────────────────────────────┐
│                                         │
│  YOUR IDENTITIES                        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🏃 Athletic Man           🟢    │    │
│  │    Exercise 4x/week      3/4    │    │
│  │    Stretch daily         5/7    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 👨‍👧 Present Dad            🟡    │    │
│  │    Wake early            4/7    │    │
│  │    New place weekly      0/1    │    │
│  └─────────────────────────────────┘    │
│                                         │
│              [ 🎤 Log ]                 │
│                                         │
└─────────────────────────────────────────┘`

### Recording State

User taps mic → immediate recording:

`┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│             ◉ Recording...              │
│                                         │
│         "I went running this            │
│          morning"                       │
│                                         │
│          [live transcription]           │
│                                         │
│                                         │
│                                         │
│              [ ■ Done ]                 │
│                                         │
└─────────────────────────────────────────┘`

### Auto-End Detection

Recording ends automatically when:

- User taps "Done" button
- 2 seconds of silence detected
- Maximum recording time reached (30 seconds)

**No stop button required for simple logs.** Silence = done.

### Processing State

Brief processing indicator (target <2 seconds):

`┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│                                         │
│         Processing with Backmind...     │
│                                         │
│                                         │
│                                         │
│                                         │
└─────────────────────────────────────────┘`

### Confirmation (Successful Match)

`┌─────────────────────────────────────────┐
│                                         │
│                                         │
│               ✓                         │
│                                         │
│         Got it.                         │
│                                         │
│         Logged: Exercise 4x/week        │
│         (3/4 this week)                 │
│                                         │
│                                         │
│              [Done]                     │
│                                         │
└─────────────────────────────────────────┘`

**Auto-dismiss after 2 seconds** or tap to dismiss immediately.

### No Match Found

If AI can't match to any building block or guardrail:

`┌─────────────────────────────────────────┐
│                                         │
│                                         │
│               ?                         │
│                                         │
│         I heard:                        │
│         "I cleaned the garage"          │
│                                         │
│         I couldn't match this to        │
│         any of your building blocks     │
│         or guardrails.                  │
│                                         │
│         What would you like to do?      │
│                                         │
│   [Try again]    [Log manually]         │
│                                         │
│   [Dismiss]                             │
│                                         │
└─────────────────────────────────────────┘`

**"Log manually"** → shows list of building blocks and guardrails to select from.

### Low Confidence Match

If AI matches but confidence is < 0.7:

`┌─────────────────────────────────────────┐
│                                         │
│                                         │
│               ?                         │
│                                         │
│         I heard:                        │
│         "I did some cardio"             │
│                                         │
│         Did you mean:                   │
│         Exercise 4x/week?               │
│                                         │
│   [Yes, log it]    [No, that's wrong]   │
│                                         │
└─────────────────────────────────────────┘`

**"Yes, log it"** → confirms and logs.
**"No, that's wrong"** → shows manual selection or try again.

---

## Widget Voice Logging

### Home Screen Widget

**Size:** Medium (2x2) or Small (2x1)

**Medium Widget Display:**

`┌───────────────────────────────┐
│  BACKMIND                     │
│                               │
│  🏃 🟢  👨‍👧 🟡  🚀 🟢          │
│                               │
│         [ 🎤 ]                │
│                               │
└───────────────────────────────┘`

**Small Widget Display:**

`┌───────────────┐
│  BACKMIND     │
│    [ 🎤 ]     │
└───────────────┘`

### Widget Tap → Recording

User taps widget → App opens directly into recording mode:

`┌─────────────────────────────────────────┐
│                                         │
│                                         │
│                                         │
│             ◉ Recording...              │
│                                         │
│         [live transcription]            │
│                                         │
│                                         │
│                                         │
│              [ ■ Done ]                 │
│                                         │
└─────────────────────────────────────────┘`

### Widget Confirmation

After successful log, brief confirmation:

`┌─────────────────────────────────────────┐
│                                         │
│                                         │
│               ✓                         │
│                                         │
│         Got it.                         │
│         Logged: Exercise 4x/week        │
│                                         │
│                                         │
└─────────────────────────────────────────┘`

**Auto-returns to home screen after 2 seconds** or tap to dismiss.

### Lock Screen Widget (iOS 16+)

Same as Home Screen widget but accessible from Lock Screen.

`┌───────────────┐
│  BACKMIND     │
│    [ 🎤 ]     │
└───────────────┘`

**Tap → Face ID/Touch ID → Recording mode**

---

## Siri Integration

### Setup

During onboarding or in settings, user adds Siri Shortcut:

`┌─────────────────────────────────────────┐
│                                         │
│      Add Siri Shortcut                  │
│                                         │
│      Say "Hey Siri, Backmind" to        │
│      start logging instantly.           │
│                                         │
│      Or create your own phrase like     │
│      "Hey Siri, log my progress"        │
│                                         │
│      [Add to Siri]                      │
│                                         │
└─────────────────────────────────────────┘`

### Siri Flow (Option 1: Shortcut as Trigger)

**User:** "Hey Siri, Backmind"

**Siri:** Opens app in recording mode

**User speaks:** "I just went running"

**App:** Processes and confirms

`┌─────────────────────────────────────────┐
│                                         │
│               ✓                         │
│                                         │
│         Got it.                         │
│         Logged: Exercise 4x/week        │
│                                         │
└─────────────────────────────────────────┘`

### Siri Flow (Option 2: Inline Capture) — Future

**User:** "Hey Siri, tell Backmind I just went running"

**Siri:** Passes text directly to app → processes → confirms via Siri voice

**Siri response:** "Got it. Logged to Exercise 4x a week."

**Note:** This requires SiriKit Intent implementation. Target for v1.1 or v2.

### MVP Implementation

**MVP:** Siri Shortcut opens app in recording mode (Option 1)

**v1.1+:** Full SiriKit integration for inline capture (Option 2)

---

## AI Classification

### What AI Receives

json

`{
  "transcript": "I went running this morning",
  "building_blocks": [
    {
      "id": "bb_001",
      "text": "Exercise 4x/week",
      "identity": "Athletic Man",
      "current_count": 2,
      "target_count": 4
    },
    {
      "id": "bb_002",
      "text": "Stretch daily",
      "identity": "Athletic Man",
      "current_count": 5,
      "target_count": 7
    },
    {
      "id": "bb_003",
      "text": "Wake early",
      "identity": "Present Dad",
      "current_count": 4,
      "target_count": 7
    }
  ],
  "guardrails": [
    {
      "id": "gr_001",
      "text": "≤5 beers/week",
      "identities": ["Athletic Man", "Present Dad", "Successful Founder"],
      "current_count": 2,
      "limit": 5
    }
  ]
}
```

### AI Prompt
```
You are a progress logger for an accountability app called Backmind.

USER'S ACTIVE BUILDING BLOCKS:
{{building_blocks_json}}

USER'S GUARDRAILS:
{{guardrails_json}}

USER SAID: "{{transcript}}"

TASK:
Determine if the user's statement indicates:
1. Completion of a building block (positive progress)
2. A guardrail event (e.g., "I had a beer")
3. No match

MATCHING RULES:
- Match based on meaning, not exact words
- "I ran" / "went running" / "did cardio" / "hit the gym" → Exercise
- "Woke up at 6" / "got up early" → Wake early
- "Had a beer" / "drank last night" → Beer guardrail
- "Didn't run today" / "skipped workout" → NOT a completion (ignore or note skip)
- If ambiguous between two blocks, pick the most likely and lower confidence

RESPOND IN JSON:
{
  "match_type": "building_block" | "guardrail" | "no_match",
  "matched_id": "bb_001" | "gr_001" | null,
  "matched_text": "Exercise 4x/week" | null,
  "confidence": 0.0-1.0,
  "reasoning": "Brief explanation"
}
```

### Confidence Thresholds

| Confidence | Action |
|------------|--------|
| ≥ 0.85 | Auto-log with confirmation |
| 0.70 - 0.84 | Ask user to confirm match |
| < 0.70 | Show "no match" / manual selection |

---

## Logging Guardrail Events

### User Reports Guardrail Event

**User says:** "I had two beers last night"

**AI matches to:** ≤5 beers/week guardrail

**Parsing:** AI extracts count if mentioned ("two beers" → 2)

### Confirmation
```
┌─────────────────────────────────────────┐
│                                         │
│               ✓                         │
│                                         │
│         Got it.                         │
│                                         │
│         Logged: 2 beers                 │
│         You're at 4/5 for the week.     │
│                                         │
│         One more and you're at your     │
│         limit. You've got this.         │
│                                         │
│              [Done]                     │
│                                         │
└─────────────────────────────────────────┘
```

### Over Limit Response

If this log puts user over their limit:
```
┌─────────────────────────────────────────┐
│                                         │
│         Logged: 2 beers                 │
│         You're at 6/5 for the week.     │
│                                         │
│         That's one over your limit.     │
│                                         │
│         Research shows people who       │
│         slip and keep going succeed     │
│         at nearly the same rate as      │
│         those who never slip.           │
│                                         │
│         One week doesn't define you.    │
│         What you do next does.          │
│                                         │
│              [Got it]                   │
│                                         │
└─────────────────────────────────────────┘
```

### Logging "Zero" / "None"

User can also proactively log zero:

**User says:** "No beers today"

**AI understands:** Zero guardrail events
```
┌─────────────────────────────────────────┐
│                                         │
│              🎉                         │
│                                         │
│         Zero beers today.               │
│                                         │
│         That's Athletic Man, Present    │
│         Dad, and Successful Founder     │
│         all winning.                    │
│                                         │
│         Still at 2/5 for the week.      │
│                                         │
│              [Nice]                     │
│                                         │
└─────────────────────────────────────────┘
```

---

## Guardrail AI Prompt Extension
```
GUARDRAIL MATCHING RULES:
- "Had a beer" / "drank" / "had a few drinks" → Beer guardrail
- "Had two beers" → Beer guardrail, count: 2
- "No beers today" / "didn't drink" / "stayed sober" → Beer guardrail, count: 0 (celebration)
- "Ate fast food" / "had McDonald's" / "got takeout" → Fast food guardrail
- "No fast food today" → Fast food guardrail, count: 0 (celebration)

For guardrails, also extract count if mentioned:
- "Had a beer" → count: 1
- "Had two beers" → count: 2
- "Had a few" → count: 3 (default for vague)
- "No beers" → count: 0

RESPOND IN JSON (for guardrail match):
{
  "match_type": "guardrail",
  "matched_id": "gr_001",
  "matched_text": "≤5 beers/week",
  "count": 2,
  "is_zero": false,
  "confidence": 0.95,
  "reasoning": "User explicitly mentioned having two beers"
}

RESPOND IN JSON (for zero/celebration):
{
  "match_type": "guardrail",
  "matched_id": "gr_001",
  "matched_text": "≤5 beers/week",
  "count": 0,
  "is_zero": true,
  "confidence": 0.92,
  "reasoning": "User explicitly said no beers today"
}
```

---

## Manual Logging Fallback

If voice doesn't work or user prefers tap:

### From Dashboard

User can tap on any building block or guardrail to log manually:
```
┌─────────────────────────────────────────┐
│                                         │
│  🏃 Athletic Man                  🟢    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Exercise 4x/week          3/4  │    │
│  │ [Tap to log]                   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Stretch daily             5/7  │    │
│  │ [Tap to log]                   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ≤5 beers/week             2/5  │    │
│  │ [Tap to log]                   │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

### Tap Log for Building Block
```
┌─────────────────────────────────────────┐
│                                         │
│      Log: Exercise 4x/week              │
│                                         │
│      Did you exercise?                  │
│                                         │
│      [Yes ✓]        [Cancel]            │
│                                         │
└─────────────────────────────────────────┘
```

### Tap Log for Guardrail
```
┌─────────────────────────────────────────┐
│                                         │
│      Log: ≤5 beers/week                 │
│                                         │
│      How many beers?                    │
│                                         │
│   [0 🎉]  [1]  [2]  [3]  [More]         │
│                                         │
│      [Cancel]                           │
│                                         │
└─────────────────────────────────────────┘
```

---

## Offline Behavior

### When Offline

1. **Transcription works** — Apple Speech is on-device
2. **AI classification queued** — Save transcript locally
3. **Show pending state** — User knows it will sync
```
┌─────────────────────────────────────────┐
│                                         │
│               ⏳                        │
│                                         │
│         Got it.                         │
│                                         │
│         "I went running"                │
│                                         │
│         Saved offline. Will process     │
│         when you're back online.        │
│                                         │
│              [Done]                     │
│                                         │
└─────────────────────────────────────────┘
```

### When Back Online

1. Queue processes automatically
2. AI classifies each pending log
3. If match found → log silently
4. If no match → notify user to resolve

### Pending Logs Indicator

Dashboard shows pending count if any:
```
┌─────────────────────────────────────────┐
│                                         │
│  ⏳ 2 logs pending sync                 │
│                                         │
│  YOUR IDENTITIES                        │
│  ...                                    │
│                                         │
└─────────────────────────────────────────┘
```

---

## Error Handling

### Transcription Failed
```
┌─────────────────────────────────────────┐
│                                         │
│               ⚠                         │
│                                         │
│         Couldn't hear that.             │
│                                         │
│         Make sure you're in a quiet     │
│         place and try again.            │
│                                         │
│   [Try again]        [Log manually]     │
│                                         │
└─────────────────────────────────────────┘
```

### AI Classification Failed
```
┌─────────────────────────────────────────┐
│                                         │
│               ⚠                         │
│                                         │
│         Something went wrong.           │
│                                         │
│         I heard: "I went running"       │
│                                         │
│         Want to try again or log        │
│         manually?                       │
│                                         │
│   [Try again]        [Log manually]     │
│                                         │
└─────────────────────────────────────────┘
```

### Network Timeout
```
┌─────────────────────────────────────────┐
│                                         │
│               ⏳                        │
│                                         │
│         Taking longer than usual.       │
│                                         │
│         I'll save this and process      │
│         it when connection improves.    │
│                                         │
│              [OK]                       │
│                                         │
└─────────────────────────────────────────┘`

---

## Voice Logging Summary

| Scenario | User Experience |
| --- | --- |
| Successful match (high confidence) | Auto-log, brief confirmation, done |
| Successful match (medium confidence) | Ask to confirm, then log |
| No match | Offer try again or manual selection |
| Guardrail event | Log with count, show progress vs limit |
| Zero guardrail | Celebrate, show identities protected |
| Over limit | Log, supportive no-guilt message |
| Offline | Save locally, process when online |
| Error | Clear message, offer retry or manual |

---

## Implementation Priority

| Feature | Priority | Notes |
| --- | --- | --- |
| In-app voice logging | P0 | Core feature |
| AI classification | P0 | Core feature |
| Confirmation flow | P0 | Core feature |
| Manual fallback | P0 | Backup for voice |
| Home Screen widget | P0 | Key friction reduction |
| Auto-end detection | P1 | Nice to have for MVP |
| Lock Screen widget | P1 | iOS 16+ only |
| Siri Shortcut (trigger) | P1 | Good friction reduction |
| Offline queue | P1 | Important for reliability |
| Siri inline capture | P2 | v1.1+ |

---
<!-- Source: PRD/07-nudges-check-ins.md -->

# Backmind PRD — Section 7: Nudges & Check-ins

---

## Overview

Proactive outreach is Backmind's core differentiator. Instead of waiting for users to remember, Backmind reaches out at the right moments.

| Type | Purpose | Used For | Timing |
| --- | --- | --- | --- |
| **Nudge** | Prompt action | Building blocks | At trigger time |
| **Check-in** | Ask for status | Guardrails | At temptation time |

---

## Nudges (Building Blocks)

### What They Are

Nudges are push notifications sent at trigger times to prompt the user to complete a building block.

### When They're Sent

Based on triggers defined during goal creation:

| Trigger | Nudge Time |
| --- | --- |
| "Tuesday after dropping off Aurelia" | Tuesday ~9:00am (or user's drop-off time) |
| "Wednesday after work" | Wednesday ~6:00pm (or user's end-of-work time) |
| "Saturday morning" | Saturday ~9:00am |
| "Daily at 7am" | Every day at 7:00am |

### Nudge Copy

**Tone:** Encouraging, action-oriented, personal. Like a friend checking in, not a robot demanding action.

| Trigger Context | Nudge Copy |
| --- | --- |
| After drop-off | "It's Tuesday after drop-off. Gym time?" |
| After work | "Work's done. Heading to the gym?" |
| Morning | "Saturday morning. Time to move?" |
| Generic | "Time for your workout?" |

### Copy Variations

To avoid repetition, rotate through variations:

**Exercise nudges:**

- "It's Tuesday after drop-off. Gym time?"
- "Aurelia's at school. Your turn to move."
- "Tuesday workout time. You've got this."
- "Post drop-off ritual: gym. Ready?"

**Wake early nudges:**

- "Early morning. You're already winning."
- "You're up. Present Dad mode: activated."
- "Morning time with Aurelia awaits."

**Deep work nudges:**

- "9am. Deep work block starts now."
- "Time to focus. Two hours. You've got this."
- "Deep work time. Phone away, mind on."

### Nudge Notification Format

`┌─────────────────────────────────────────┐
│ BACKMIND                           now  │
│                                         │
│ It's Tuesday after drop-off. Gym time?  │
│                                         │
│ [Log ✓]              [Snooze 1hr]       │
└─────────────────────────────────────────┘`

### Notification Actions

| Action | What Happens |
| --- | --- |
| **Tap notification** | Opens app in voice logging mode |
| **Log ✓** (quick action) | Logs completion immediately, no app open required |
| **Snooze 1hr** (quick action) | Reschedules nudge for 1 hour later |
| **Dismiss/ignore** | Nothing logged, no follow-up until next scheduled nudge |

### Quick Action: Log ✓

User can log directly from notification without opening app:

1. User taps "Log ✓"
2. System logs completion for that building block
3. Brief banner: "✓ Logged: Exercise 4x/week (3/4)"

**No voice required.** One tap confirmation for users who just did the thing and want to log fast.

---

## Check-ins (Guardrails)

### What They Are

Check-ins are push notifications sent at temptation times to ask if the user had any guardrail events—or to celebrate that they didn't.

### When They're Sent

Based on temptation context defined during guardrail creation:

| Temptation Context | Check-in Time |
| --- | --- |
| "Friday nights" | Friday ~9:00pm |
| "Friday and Saturday nights" | Friday ~9:00pm, Saturday ~9:00pm |
| "After long work days" | Not scheduled (too vague) |
| No context provided | End of day ~9:00pm on days with no other check-ins |

### Why Not Daily?

**Research (Ironic Process Theory):** Constantly reminding someone about something they're trying to avoid makes them think about it more.

Daily beer reminders could increase drinking. Only check in when temptation is relevant.

### Check-in Copy

**Tone:** Supportive, non-judgmental, celebrates zeros. Never guilt-tripping.

**Opening check-in (at temptation time):**

| Context | Check-in Copy |
| --- | --- |
| Friday night | "It's Friday night. You're at 2/5 beers this week. Whatever you choose, you've got this." |
| Saturday night | "Saturday night. Still at 2/5. Enjoy your evening." |
| Generic evening | "How'd today go with beers?" |

**End-of-night check-in (asking for report):**

| Context | Check-in Copy |
| --- | --- |
| After temptation window | "How'd tonight go? Any beers?" |
| Generic | "End of day. Any beers today?" |

### Check-in Notification Format

**Opening check-in (supportive, at start of temptation window):**

`┌─────────────────────────────────────────┐
│ BACKMIND                           6pm  │
│                                         │
│ It's Friday night. You're at 2/5 beers  │
│ this week. Whatever you choose, you've  │
│ got this.                               │
│                                         │
└─────────────────────────────────────────┘`

**No actions on opening check-in.** It's just a supportive reminder. User doesn't need to respond.

**End-of-night check-in (asking for report):**

`┌─────────────────────────────────────────┐
│ BACKMIND                           10pm │
│                                         │
│ How'd tonight go?                       │
│                                         │
│ [No beers 🎉]    [Had some]    [Skip]   │
└─────────────────────────────────────────┘`

### Check-in Response Flow

**User taps "No beers 🎉":**

Logs zero. Shows celebration:

`┌─────────────────────────────────────────┐
│                                         │
│              🎉                         │
│                                         │
│         Zero beers tonight.             │
│                                         │
│         That's Athletic Man, Present    │
│         Dad, and Successful Founder     │
│         all winning.                    │
│                                         │
│         Still at 2/5 for the week.      │
│                                         │
└─────────────────────────────────────────┘`

**User taps "Had some":**

Opens app to log count:

`┌─────────────────────────────────────────┐
│                                         │
│      How many beers tonight?            │
│                                         │
│   [1]   [2]   [3]   [4]   [More]        │
│                                         │
│      Or speak: "I had two beers"        │
│                                         │
│      [ 🎤 ]                             │
│                                         │
└─────────────────────────────────────────┘`

**User taps "Skip":**

No log recorded. No follow-up. User's choice.

---

## Check-in Timing Logic

### Two-Phase Check-in for Guardrails

| Phase | Time | Purpose | User Action Required? |
| --- | --- | --- | --- |
| **Opening** | Start of temptation window (e.g., 6pm Friday) | Supportive reminder | No |
| **Closing** | End of temptation window (e.g., 10pm Friday) | Ask for report | Yes (optional) |

### Example: Friday Night Beers

**6:00pm Friday — Opening check-in:**

> "It's Friday night. You're at 2/5 beers this week. Whatever you choose, you've got this."
> 

*No response required. Just a supportive nudge.*

**10:00pm Friday — Closing check-in:**

> "How'd tonight go?"
[No beers 🎉] [Had some] [Skip]
> 

*User can report or skip.*

### Why Two Phases?

| Phase | Purpose |
| --- | --- |
| **Opening** | Plants the seed. User is aware of their limit and why before the temptation hits. Approach-framed ("you've got this") not avoidance-framed ("don't drink"). |
| **Closing** | Captures data. User reports what actually happened. Celebrating zeros reinforces success. |

---

## Timing Configuration

### User-Defined Times

During onboarding or settings, capture key times:

| Time | Question | Default | Used For |
| --- | --- | --- | --- |
| Wake time | "What time do you usually wake up?" | 7:00am | Morning triggers |
| Work end time | "What time do you usually finish work?" | 6:00pm | "After work" triggers |
| Drop-off time | (If mentioned in triggers) | 9:00am | "After drop-off" triggers |
| Bedtime | "What time do you usually go to bed?" | 10:30pm | Don't nudge after this |

### Phase-Based Timing (Huberman)

Huberman's research divides the day into phases:

| Phase | Hours Post-Wake | Best For |
| --- | --- | --- |
| Phase 1 | 0-8 hours | High-friction habits (exercise, deep work) |
| Phase 2 | 9-15 hours | Moderate tasks |
| Phase 3 | 15+ hours | Protect sleep, no new demands |

**Rule:** Don't send nudges in Phase 3 (evening/night) unless specifically scheduled there.

### Guardrail Check-in Timing

| Temptation Context | Opening Check-in | Closing Check-in |
| --- | --- | --- |
| "Friday nights" | Friday 6:00pm | Friday 10:00pm |
| "Friday and Saturday nights" | Fri 6pm, Sat 6pm | Fri 10pm, Sat 10pm |
| "Weekends" | Sat 6pm, Sun 6pm | Sat 10pm, Sun 10pm |
| "Evenings" | Daily 6:00pm | Daily 10:00pm |
| No context | Skip opening | Daily 9:00pm (if not already checked in) |

---

## Frequency Caps

### Problem

Too many notifications = user disables notifications = Backmind becomes useless.

### Rules

| Rule | Limit | Rationale |
| --- | --- | --- |
| Max nudges per day | 3 | Avoid notification fatigue |
| Max check-ins per day | 2 | Guardrails shouldn't dominate |
| Max total notifications per day | 4 | Absolute cap |
| No nudges after bedtime | User's bedtime setting | Respect sleep |
| No nudges within 1 hour of each other | 60 min gap | Avoid clustering |

### Priority When Over Limit

If user has more scheduled nudges than the cap allows:

| Priority | Type | Rationale |
| --- | --- | --- |
| 1 | Nudges with specific triggers | User defined these intentionally |
| 2 | Guardrail check-ins | Time-sensitive |
| 3 | Generic reminders | Lowest priority, skip if over limit |

---

## What Happens If User Ignores

### Ignored Nudge (Building Block)

| Scenario | Response |
| --- | --- |
| User ignores nudge | Nothing. No follow-up. No guilt. |
| User ignores 3 nudges in a row for same block | Reduce frequency (see adaptive section) |
| User never logs a building block | Weekly summary mentions it |

**No punishment.** App doesn't nag. Weekly summary provides gentle accountability.

### Ignored Check-in (Guardrail)

| Scenario | Response |
| --- | --- |
| User ignores closing check-in | Nothing logged for that day |
| User ignores check-in 3 weeks in a row | Reduce frequency (see adaptive section) |

**No assumption of failure.** If user doesn't respond, we don't assume they broke their guardrail.

---

## Adaptive Behavior (v1.1+)

### Learn from Patterns

Over time, Backmind can adjust based on user behavior:

| Pattern | Adaptation |
| --- | --- |
| User always logs exercise at 7am (not 9am trigger) | Suggest: "Want to move your nudge to 7am?" |
| User ignores Wednesday nudges but responds to others | Suggest: "Wednesdays seem tough. Want to remove or reschedule?" |
| User logs before nudge arrives | "You're ahead of schedule. Keep it up." (positive reinforcement) |
| User ignores 3+ nudges for a block | Reduce nudge frequency; mention in weekly summary |

**MVP:** Static nudge times based on triggers.
**v1.1+:** Adaptive suggestions based on actual behavior.

---

## MVP Feature Nudges (Features 05-13)

### Nudge Variety System (Feature 09)

**Problem:** Same nudge copy every time becomes invisible. Users stop noticing.

**Solution:** Track last 5-7 nudges per block and never repeat.

| Component | Implementation |
|-----------|----------------|
| Storage | UserDefaults key `nudges_{blockId}` stores array of recent nudge texts |
| Max stored | 7 messages (configurable) |
| AI instruction | "NEVER repeat a message from the previous list" |
| On show | Record nudge text to history |

**AI Prompt Addition:**
```
PREVIOUS NUDGE MESSAGES (do not repeat these):
{lastNudgeMessages}

IMPORTANT - VARIETY:
- NEVER repeat a message from the previous list
- Each nudge should feel fresh and personalized
- Vary the framing, tone, and micro-action suggestions
```

---

### Never Miss Twice Nudge (Feature 05)

**Trigger:** User missed 1 consecutive day/period for a building block

**Timing:** Morning after the miss (at wake time or first trigger time)

**Tone:** Forward-focused, no guilt, research-backed

**Copy Examples:**
| Context | Copy |
|---------|------|
| After 1 miss | "Yesterday didn't happen. Today does. That's a block for [Identity]." |
| With WOOP plan | "Remember: when [obstacle], you'll [plan]. Let's get that block today." |
| With bad day version | "Even just [bad day version] counts. Show up however you can." |

**Notification Format:**
```
┌─────────────────────────────────────────┐
│ BACKMIND                           8am  │
│                                         │
│ Yesterday didn't happen. Today does.    │
│ That's a block for Athletic Man.        │
│                                         │
│ [Log ✓]              [Bad day version]  │
└─────────────────────────────────────────┘
```

---

### Bad Day Offer Nudge (Feature 06)

**Trigger:** User has consecutiveMisses >= 2 AND has no badDayVersion set

**Timing:** With the next scheduled nudge

**Tone:** Supportive, offering help without judgment

**Copy Examples:**
| Context | Copy |
|---------|------|
| After 2+ misses | "Tough stretch. Want to set a minimum version? Showing up matters more than the workout." |
| With AI suggestion | "How about this for tough days: '[AI suggestion]'. You can always do more." |

**Flow:**
1. User taps nudge → Opens Bad Day Mode setup
2. AI suggests minimum version based on block
3. User confirms or edits
4. badDayVersion saved on block

---

### Getting Started Nudge (Feature 09)

**Trigger:** Regular trigger time for building block

**Tone:** Micro-action focused, varied, references WOOP plan

**Key Difference:** Focus on the START moment, not the full activity.

**Copy Examples:**
| Context | Copy |
|---------|------|
| With trigger | "After drop-off. Gym clothes on—that's the hack." |
| With outcome | "One block for that [outcome] feeling. Just start." |
| With bad day version | "Even [bad day version] counts. Open the door." |
| Micro-action | "Shoes on. That's the only decision right now." |

**Variety Instruction:**
AI must generate fresh micro-action framing each time, referencing:
- User's specific trigger context
- Their WOOP outcome (the feeling after)
- Their bad day version (as fallback)
- The START moment (not completion)

---

### Night-Before Reminder (Feature 10)

**Trigger:** Block is scheduled for tomorrow AND has conditions set

**Timing:** Evening before (at bedtime - 1 hour, or ~9pm)

**Tone:** Preparation-focused, brief

**Copy Examples:**
| Conditions | Copy |
|------------|------|
| "Gym bag in bedroom" | "Tomorrow is gym day. Bag in bedroom? Clothes laid out? Set yourself up." |
| "Laptop closed, phone away" | "Deep work tomorrow. Is your desk ready? Phone charger in another room?" |

**Notification Format:**
```
┌─────────────────────────────────────────┐
│ BACKMIND                           9pm  │
│                                         │
│ Tomorrow is gym day.                    │
│ Bag in bedroom? Clothes laid out?       │
│                                         │
│ [Ready ✓]                    [Dismiss]  │
└─────────────────────────────────────────┘
```

---

### Previsualization Nudge (Feature 13)

**Trigger:** Morning, if previsualizationEnabled = true AND blocks scheduled for today

**Timing:** At wake time (from user settings)

**Tone:** Visualization-focused, sensory, AFTER-state emphasis

**Key:** Focus on the feeling AFTER completion, not the effort.

**Copy Examples:**
| Block | Copy |
|-------|------|
| Exercise | "Picture yourself walking out of the gym. That post-workout energy. A block for Athletic Man." |
| Deep work | "Imagine closing your laptop after 2 hours of focused work. That satisfaction. Successful Founder in action." |
| Reading | "Picture tonight, 20 pages further. That quiet accomplishment. Present Dad, investing in growth." |

**AI Prompt:**
```
Generate a brief previsualization prompt (2-3 sentences).

Focus on the AFTER state, not the effort:
- Use sensory language (how it feels, looks, sounds)
- Reference positive emotions (energy, clarity, satisfaction, pride)
- Connect to identity at the end
- Keep it vivid but brief

Structure:
1. "Picture yourself..." or "Imagine..." (the completion)
2. The sensory details (the feeling, the moment)
3. Identity connection ("That's a block for [Identity]")
```

**Settings Toggle:**
- Default: ON
- Location: Settings > Notifications > Previsualization Prompts
- Description: "Morning nudges that help you visualize success."

---

### Block Built Confirmation (Feature 07)

**Trigger:** User logs a building block completion

**Tone:** Brief, identity-reinforcing, celebratory

**Copy Examples:**
| Context | Copy |
|---------|------|
| Standard | "That's a block for Athletic Man." |
| Progress | "Block built. 3/4 for the week." |
| Complete | "All 4 blocks this week. Athletic Man is winning." |
| With streak | "3 days in a row. Block by block, you're building who you want to become." |

**Not a notification—displayed in-app after logging.**

---

### WOOP Reflection Escalation (Feature 08)

**Trigger:** Guardrail has weeksOverLimit >= 2 OR overBy >= 3

**Timing:** With the over-limit response

**Tone:** Supportive but prompting reflection

**Copy:**
```
"This is the [n]th week over your limit.

The slip happened. What matters now is understanding why—
so you can plan differently.

[Reflect on this →]"
```

**Flow:**
1. User taps "Reflect" → Opens WOOP-style reflection
2. Capture: "What was happening when you went over?"
3. Capture: "Next time that happens, what will you do instead?"
4. Save obstacle + plan on guardrail

---

## Failed Week Review (WOOP Completion)

### Overview

When a building block has 0% completion for a full week despite all scheduled nudges being sent, Backmind triggers a Failed Week Review. This completes the WOOP (Wish-Outcome-Obstacle-Plan) cycle that began in onboarding by capturing the user's internal **Obstacle** and creating an **If-Then Plan**.

**Research:** Oettingen's WOOP research (Wang et al., 2021 meta-analysis, g = 0.34) shows that mental contrasting—visualizing outcomes AND identifying obstacles—significantly increases goal attainment compared to positive visualization alone.

### Trigger Conditions

| Condition | Requirement |
| --- | --- |
| Completion rate | 0% for the week (no logs) |
| Nudges sent | All scheduled nudges were sent |
| Time since creation | At least 7 days since block creation or last review |
| Previous review | Not already reviewed in the past 2 weeks |

### Flow: 4 Screens

The Failed Week Review is presented as a full-screen sheet over the dashboard.

---

### Screen 1: Acknowledge

**Purpose:** Validate the user's experience without shame. Normalize struggle.

`┌─────────────────────────────────────────┐
│                                    [×]  │
│                                         │
│      ■ Exercise 4x/week                 │
│                                         │
│      You got 4 reminders this week.     │
│                                         │
│      Something got in the way           │
│      each time.                         │
│                                         │
│      ─────────────────────────────────  │
│                                         │
│      ❤️ That's normal.                  │
│                                         │
│      Now we can figure out what's       │
│      actually blocking you—and make     │
│      a plan for next time.              │
│                                         │
│      ─────────────────────────────────  │
│                                         │
│      This isn't about blame. It's about │
│      understanding what happened so you │
│      can adjust.                        │
│                                         │
│      [Let's figure it out]              │
│                                         │
│      [Not now]                          │
│                                         │
└─────────────────────────────────────────┘`

**If "Not now":** Review is delayed 3 days. User can continue using the app.

---

### Screen 2: Capture Obstacle

**Purpose:** Identify the internal obstacle (feelings/thoughts), not external circumstances. Internal obstacles are actionable.

`┌─────────────────────────────────────────┐
│                                         │
│      What got in the way?               │
│                                         │
│      Think about the moment each        │
│      reminder came. What were you       │
│      feeling or thinking?               │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 Tap to speak or type...     │    │
│  └─────────────────────────────────┘    │
│                                         │
│      Examples:                          │
│      • "I was too tired after teaching" │
│      • "I told myself I'd go later"     │
│      • "I felt overwhelmed and couldn't │
│         start"                          │
│                                         │
│      ─────────────────────────────────  │
│                                         │
│      💡 Tip:                            │
│                                         │
│      Focus on what you were feeling or  │
│      thinking—not what happened around  │
│      you. Internal obstacles are the    │
│      ones you can actually plan for.    │
│                                         │
│            [Continue]                   │
│                                         │
└─────────────────────────────────────────┘`

**User input:** "I was too tired after teaching and told myself I'd go later"

---

### Screen 3: Capture Plan

**Purpose:** Create an if-then implementation intention—a specific action to take when the obstacle occurs.

`┌─────────────────────────────────────────┐
│                                         │
│      Your obstacle:                     │
│      "I was too tired after teaching    │
│      and told myself I'd go later"      │
│                                         │
│      ─────────────────────────────────  │
│                                         │
│      When that feeling hits, what       │
│      will you do instead?               │
│                                         │
│      Format: If [obstacle], then I      │
│      will [specific action]             │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 Tap to speak or type...     │    │
│  └─────────────────────────────────┘    │
│                                         │
│      Example:                           │
│      "When I feel too tired, I'll put   │
│      on my shoes and just do 10         │
│      minutes"                           │
│                                         │
│      ─────────────────────────────────  │
│                                         │
│      Research shows that if-then plans  │
│      make you 2-3x more likely to       │
│      follow through when obstacles      │
│      arise.                             │
│                                         │
│            [Continue]                   │
│                                         │
└─────────────────────────────────────────┘`

**User input:** "When I feel too tired, I'll put on my shoes and just do 10 minutes"

---

### Screen 4: Confirm with Outcome Reminder

**Purpose:** Reconnect user with their "why" (outcome from onboarding) and confirm the plan.

`┌─────────────────────────────────────────┐
│                                         │
│      ❤️ Remember why this matters:      │
│                                         │
│      "I feel strong and confident,      │
│      with energy to play with Aurelia"  │
│                                         │
│      ─────────────────────────────────  │
│                                         │
│      Your plan:                         │
│                                         │
│      When this happens:                 │
│      "I was too tired after teaching"   │
│                                         │
│              ↓                          │
│                                         │
│      You will:                          │
│      "Put on my shoes and just do 10    │
│      minutes"                           │
│                                         │
│      ─────────────────────────────────  │
│                                         │
│      I'll include this plan in your     │
│      nudges from now on—so you have     │
│      it right when you need it.         │
│                                         │
│            [Save my plan]               │
│                                         │
└─────────────────────────────────────────┘`

**On save:** Obstacle and plan stored on building block. `failedWeekReviewAt` timestamp recorded.

---

### Enhanced Nudges After Review

After the Failed Week Review, nudges for that building block include the plan:

**Before review:**
> "It's Tuesday after drop-off. Gym time?"

**After review:**
> "It's Tuesday after drop-off. Remember: when you feel too tired, just put on your shoes and do 10 minutes. Gym time?"

---

### Data Model Additions

| Field | Type | Description |
| --- | --- | --- |
| `outcome` | String? | Captured during onboarding (Step 6b) |
| `obstacle` | String? | Captured during Failed Week Review |
| `plan` | String? | If-then implementation intention |
| `failedWeekReviewAt` | Date? | When review was completed |

---

### Re-Review Flow (When WOOP Plan Isn't Working)

**Trigger:** 0% completion for 2 consecutive weeks AFTER obstacle + plan were captured

**Purpose:** The plan isn't addressing the real barrier. Offer alternatives without judgment.

---

#### Step 1: Acknowledge Without Judgment

`┌─────────────────────────────────────────┐
│                                         │
│      Exercise 4x/week                   │
│      "When I'm tired, I'll put on shoes │
│      in bedroom, gym clothes on"        │
│                                         │
│      It's not clicking yet. That        │
│      happens—sometimes we need to       │
│      try a different approach.          │
│                                         │
│          [Let's figure it out]          │
│                                         │
│          [Not now]                      │
│                                         │
└─────────────────────────────────────────┘`

---

#### Step 2: Choose Path

`┌─────────────────────────────────────────┐
│                                         │
│      What feels most true?              │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎯 It's too big right now       │    │
│  │    I need a smaller version     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🗓️ The timing is wrong          │    │
│  │    I need different triggers    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ⏸️ Life is too full right now   │    │
│  │    Pause this for a while       │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ❌ This isn't right for me      │    │
│  │    Remove this building block   │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘`

---

#### Path A: "It's too big right now" → Tiny Habit

`┌─────────────────────────────────────────┐
│                                         │
│      What's the smallest version        │
│      that still counts?                 │
│                                         │
│      Research shows: a smaller habit    │
│      you actually do beats an           │
│      ambitious one you skip.            │
│                                         │
│      Current: Exercise 4x/week          │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 Tap to speak or type...     │    │
│  └─────────────────────────────────┘    │
│                                         │
│      Examples:                          │
│      • "Move my body 2x/week"           │
│      • "One gym session per week"       │
│      • "10 minutes of exercise daily"   │
│                                         │
│      [Suggest smaller versions]         │
│                                         │
└─────────────────────────────────────────┘`

**If user taps "Suggest smaller versions"**, AI generates options based on their original block:

**Prompt template:**
```
Generate 2-3 "tiny habit" versions of this building block. Each should be:
- Significantly easier (50-75% reduction in effort/frequency)
- Still meaningful to the identity
- Concrete and measurable

Original block: {block.name}
Identity: {identity.name}
Their outcome: {block.outcome}

Format: Return 2-3 bullet points, each a complete building block name.
```

**Example output for "Exercise 4x/week":**
> • Move my body 2x this week
> • One gym session—any length
> • 15-minute walk on gym days

---

#### Path A Confirmation:

`┌─────────────────────────────────────────┐
│                                         │
│      New building block:                │
│                                         │
│      🏃 Move my body 2x/week            │
│                                         │
│      Replaces: Exercise 4x/week         │
│                                         │
│      This is the same. Your obstacle    │
│      and plan are cleared—you might     │
│      not need them anymore.             │
│                                         │
│      You can always scale back up       │
│      once this feels automatic.         │
│                                         │
│          [Save]       [Go back]         │
│                                         │
└─────────────────────────────────────────┘`

---

#### Path B: "The timing is wrong"

Goes to trigger edit screen with current triggers shown. User can modify.

---

#### Path C: "Life is too full right now"

`┌─────────────────────────────────────────┐
│                                         │
│      Pausing: Exercise 4x/week          │
│                                         │
│      How long?                          │
│                                         │
│      [2 weeks]                          │
│      [1 month]                          │
│      [Until I unpause it]               │
│                                         │
│      Your {identity.name} identity      │
│      stays—this is just one block.      │
│                                         │
└─────────────────────────────────────────┘`

---

#### Path D: "This isn't right for me"

`┌─────────────────────────────────────────┐
│                                         │
│      Remove Exercise 4x/week?           │
│                                         │
│      This won't affect your             │
│      {identity.name} identity or your   │
│      other building blocks.             │
│                                         │
│      Sometimes the right move is        │
│      letting go of what isn't working   │
│      to focus on what is.               │
│                                         │
│      [Remove]       [Keep it]           │
│                                         │
└─────────────────────────────────────────┘`

---

#### Data Model Additions for Re-Review

| Field | Type | Description |
| --- | --- | --- |
| `previousVersion` | String? | Original block name if downsized via tiny habit |
| `pausedUntil` | Date? | When pause ends (nil = indefinite) |
| `pausedAt` | Date? | When block was paused |

---

## Nudge & Check-in Copy Library

### Nudges (Building Blocks)

**Exercise:**

- "It's [day] after [trigger]. Gym time?"
- "[Trigger context]. Your turn to move."
- "Workout time. You've got this."
- "Time to be Athletic Man."

**Wake early:**

- "You're up early. Present Dad mode: on."
- "Early morning win. Nice."
- "Morning time with Aurelia awaits."

**Deep work:**

- "Deep work block starts now."
- "Time to focus. Two hours. Go."
- "Founder mode: activated."

**Stretch:**

- "Morning stretch time."
- "Quick stretch before you start."
- "Loosen up. 5 minutes."

**Generic:**

- "Time for [building block]."
- "Reminder: [building block]."
- "[Building block] — you've got this."

### Check-ins (Guardrails)

**Opening (supportive):**

- "It's [day] night. You're at [x]/[limit] this week. Whatever you choose, you've got this."
- "[Day] night. You're doing great at [x]/[limit]. Enjoy your evening."
- "Temptation time. Remember why: [user's why statement]."

**Closing (asking):**

- "How'd tonight go?"
- "End of [day]. Any [guardrail item]?"
- "Quick check: any [guardrail item] today?"

**Zero response:**

- "Zero [guardrail item] today. That's [identity 1], [identity 2], and [identity 3] all winning."
- "None today. Still at [x]/[limit]. Nice work."
- "Clean day. You're protecting what matters."

**Under limit response:**

- "Got it. You're at [x]/[limit] for the week."
- "Logged. Still within your limit."
- "[x]/[limit]. You're on track."

**At limit response:**

- "That's [limit]/[limit] for the week. You've hit your limit."
- "You're at your cap. Next week's a fresh start."
- "Limit reached. No guilt—you set the limit, you met it."

**Over limit response:**

- "That's [x]/[limit]—one over your limit."
- "Over by [n] this week. Mistakes happen."
- Research-backed follow-up: "People who slip and keep going succeed at nearly the same rate as those who never slip. What you do next matters more than this one week."

---

## Notification Payload Structure

### Nudge Notification

json

`{
  "type": "nudge",
  "building_block_id": "bb_001",
  "building_block_text": "Exercise 4x/week",
  "identity": "Athletic Man",
  "trigger_context": "Tuesday after dropping off Aurelia",
  "current_count": 2,
  "target_count": 4,
  "title": "BACKMIND",
  "body": "It's Tuesday after drop-off. Gym time?",
  "actions": [
    {"id": "log", "title": "Log ✓"},
    {"id": "snooze", "title": "Snooze 1hr"}
  ]
}`

### Check-in Notification (Closing)

json

`{
  "type": "checkin_closing",
  "guardrail_id": "gr_001",
  "guardrail_text": "≤5 beers/week",
  "identities": ["Athletic Man", "Present Dad", "Successful Founder"],
  "current_count": 2,
  "limit": 5,
  "title": "BACKMIND",
  "body": "How'd tonight go?",
  "actions": [
    {"id": "zero", "title": "No beers 🎉"},
    {"id": "some", "title": "Had some"},
    {"id": "skip", "title": "Skip"}
  ]
}`

---

## Backend Scheduling

### How Nudges Are Scheduled

1. **On goal creation:** System parses triggers and creates scheduled notifications
2. **Stored in database:** Each nudge has user_id, building_block_id, day, time, status
3. **Daily job:** Each morning, query today's nudges for all users, schedule via APNs
4. **On completion:** If user logs building block, cancel pending nudge for that day

### How Check-ins Are Scheduled

1. **On guardrail creation:** System parses temptation context and creates check-in schedule
2. **Stored in database:** Each check-in has user_id, guardrail_id, day, opening_time, closing_time
3. **Daily job:** Query today's check-ins, schedule opening + closing notifications
4. **On log:** If user logs guardrail event before closing check-in, adjust closing message accordingly

### Cancellation Logic

| Event | Action |
| --- | --- |
| User logs building block | Cancel pending nudge for that block today |
| User logs guardrail event | Update closing check-in message with new count |
| User responds to closing check-in | Mark check-in as complete |
| User snoozes nudge | Reschedule for 1 hour later (within limits) |

---

## Summary

---
<!-- Source: PRD/08-dashboard-progress.md -->

# Backmind PRD — Section 8: Dashboard & Progress

---

## Overview

The dashboard is Backmind's home screen. It shows the user's identities, building blocks, guardrails, and progress at a glance. The goal is clarity, not complexity.

**Design principle:** Glanceable health, one tap to log.

---

## Dashboard Layout

`┌─────────────────────────────────────────┐
│                                         │
│  BACKMIND                        ⚙️     │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  YOUR IDENTITIES                        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🏃 Athletic Man            🟢   │    │
│  │                                 │    │
│  │ Exercise 4x/week          3/4   │    │
│  │ Stretch daily             6/7   │    │
│  │ ≤5 beers/week             2/5   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 👨‍👧 Present Dad             🟡   │    │
│  │                                 │    │
│  │ Wake early                3/7   │    │
│  │ New place weekly          0/1   │    │
│  │ ≤5 beers/week             2/5   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🚀 Successful Founder      🟢   │    │
│  │                                 │    │
│  │ 2hr deep work daily       5/7   │    │
│  │ 1hr marketing daily       4/7   │    │
│  │ ≤5 beers/week             2/5   │    │
│  └─────────────────────────────────┘    │
│                                         │
│              [ 🎤 Log ]                 │
│                                         │
└─────────────────────────────────────────┘`

---

## Dashboard Elements

### Header

| Element | Purpose |
| --- | --- |
| "BACKMIND" | App name / branding |
| ⚙️ Settings icon | Access settings |

### Identity Cards

Each identity is a card showing:

| Element | Description |
| --- | --- |
| **Icon** | Emoji chosen by user or default |
| **Identity name** | "Athletic Man," "Present Dad," etc. |
| **Health indicator** | Color dot showing overall status |
| **Building blocks** | Listed with progress (x/target) |
| **Guardrails** | Listed with progress (x/limit) |

### Voice Log Button

Persistent at bottom of screen. Primary action.

---

## Health Indicator (Color System)

### No Streaks

Backmind does not use streaks. Streaks create binary pass/fail psychology that leads to:

- "I broke my streak, why bother continuing"
- Anxiety about maintaining streaks
- Guilt when life happens

### Color Gradient Instead

Health indicator shows a color gradient based on recent completion rate:

| Color | Meaning | Completion Rate |
| --- | --- | --- |
| 🟢 Green | On track | 70%+ |
| 🟡 Yellow | Needs attention | 50-69% |
| 🟠 Orange | Falling behind | 30-49% |
| 🔴 Red | Off track | <30% |

### Calculation Logic

**For building blocks:**

`completion_rate = (completions_this_week / target_this_week) * 100`

Example:

- Exercise 4x/week: 3 completed → 75% → 🟢
- Wake early 7x/week: 3 completed → 43% → 🟠

**For guardrails:**

`health_rate = ((limit - current_count) / limit) * 100`

Example:

- ≤5 beers: 2 logged → (5-2)/5 = 60% remaining → 🟢
- ≤5 beers: 4 logged → (5-4)/5 = 20% remaining → 🟡
- ≤5 beers: 6 logged → over limit → 🔴

**For identity overall:**

`identity_health = average of all building_block_rates + guardrail_health_rates`

### Identity Winning Formula

An identity is "winning" when blocks built > blocks missed. This aligns with James Clear's concept: each completed block is a "vote" for who you're becoming—reframed as "blocks" in Backmind's terminology.

**Block by block, you're building who you want to become.**

| Metric | Calculation | Example |
|--------|-------------|---------|
| **Blocks Built** | Sum of completions this period | 7 completions |
| **Blocks Missed** | Sum of (target - completed) for incomplete blocks | 3 missed |
| **Identity Winning** | blocks_built > blocks_missed | 7 > 3 → Yes ✓ |

**UI Representation:**
- Winning identities: Green indicator + affirming copy
- Close race: Yellow indicator + encouraging copy
- Losing: Orange/Red indicator + supportive (not shaming) copy

**Weekly Summary Copy Examples:**

*Winning:*
> "Athletic Man is winning this week. 7 blocks built, only 3 missed. Block by block, you're becoming who you want to be."

*Close:*
> "Present Dad is close—4 blocks built, 4 missed. One more block tips the scale."

*Behind:*
> "Founder had a tough week. That's okay—next week is a fresh slate. What matters is you're still here."

### Why Gradient Works

| Streak System | Gradient System |
| --- | --- |
| "You broke your streak" | "You're at 60% this week" |
| Binary: success or failure | Spectrum: always somewhere |
| One miss = reset to zero | One miss = slight color shift |
| Encourages all-or-nothing | Encourages keep going |
| Fragile | Resilient |

---

## Progress Display

### Building Block Progress

`┌─────────────────────────────────────────┐
│ Exercise 4x/week                   3/4  │
└─────────────────────────────────────────┘`

| Element | Description |
| --- | --- |
| Text | Building block name |
| Progress | Current/target for this period |

### Guardrail Progress

`┌─────────────────────────────────────────┐
│ ≤5 beers/week                      2/5  │
└─────────────────────────────────────────┘`

| Element | Description |
| --- | --- |
| Text | Guardrail name (includes limit) |
| Progress | Current/limit for this period |

### Visual Distinction

Building blocks and guardrails look similar but behave differently:

| Type | Progress Meaning | Good Direction |
| --- | --- | --- |
| Building block | 3/4 = "3 of 4 done" | Higher is better |
| Guardrail | 2/5 = "2 of 5 used" | Lower is better |

**UI hint:** Guardrails could have subtle visual distinction (e.g., different icon, lighter background) to differentiate from building blocks.

---

## Tap Interactions

### Tap on Identity Card

Expands to show detail view:

`┌─────────────────────────────────────────┐
│                                         │
│  ← Back                                 │
│                                         │
│  🏃 Athletic Man                   🟢   │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  BUILDING BLOCKS                        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Exercise 4x/week           3/4  │    │
│  │ Triggers: Tue/Wed/Sat/Sun       │    │
│  │                       [Log ✓]   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Stretch daily              6/7  │    │
│  │ Trigger: Every morning          │    │
│  │                       [Log ✓]   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  GUARDRAILS                             │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ≤5 beers/week              2/5  │    │
│  │ Check-in: Fri/Sat nights        │    │
│  │                       [Log]     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [Edit Identity]   [Add Building Block] │
│                                         │
└─────────────────────────────────────────┘`

### Tap on Building Block

Opens quick log:

`┌─────────────────────────────────────────┐
│                                         │
│      Exercise 4x/week                   │
│                                         │
│      Did you exercise?                  │
│                                         │
│      [Yes ✓]        [Cancel]            │
│                                         │
└─────────────────────────────────────────┘`

### Tap on Guardrail

Opens count input:

`┌─────────────────────────────────────────┐
│                                         │
│      ≤5 beers/week                      │
│                                         │
│      How many beers?                    │
│                                         │
│   [0 🎉]  [1]  [2]  [3]  [More]         │
│                                         │
│      [Cancel]                           │
│                                         │
└─────────────────────────────────────────┘`

---

## Empty States

### New User (No Logs Yet)

`┌─────────────────────────────────────────┐
│                                         │
│  YOUR IDENTITIES                        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🏃 Athletic Man            ○    │    │
│  │                                 │    │
│  │ Exercise 4x/week          0/4   │    │
│  │ Stretch daily             0/7   │    │
│  │ ≤5 beers/week             0/5   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Your system is ready.                  │
│  Go do something, then come back        │
│  and tell Backmind about it.            │
│                                         │
│              [ 🎤 Log ]                 │
│                                         │
└─────────────────────────────────────────┘`

**Note:** Empty health indicator (○) instead of color until first log.

### No Building Blocks for Identity

If user created identity but no building blocks (shouldn't happen normally):

`┌─────────────────────────────────────────┐
│  🏃 Athletic Man                   ○    │
│                                         │
│  No building blocks yet.                │
│  [Add one]                              │
└─────────────────────────────────────────┘`

---

## Time Period Logic

### Weekly Reset

All progress resets weekly:

| Day | Action |
| --- | --- |
| Sunday midnight (user's timezone) | Reset building block counts to 0 |
| Sunday midnight | Reset guardrail counts to 0 |
| Sunday midnight | Archive previous week's data |
| Monday | Fresh start |

### Why Weekly?

| Period | Problem |
| --- | --- |
| Daily reset | Too granular, too much pressure |
| Monthly reset | Too long, lose urgency |
| Weekly reset | Matches how people think about habits |

Most building blocks are "X times per week." Weekly period aligns naturally.

### Flexible Periods (Future)

Some goals might need different periods:

| Goal | Period |
| --- | --- |
| "Exercise 4x/week" | Weekly |
| "Stretch daily" | Daily (resets each day) |
| "≤5 beers/week" | Weekly |
| "Read 2 books/month" | Monthly |

**MVP:** Weekly only. Simplifies logic.
**v1.1+:** Support daily, weekly, monthly periods per goal.

---

## Week View (Optional Detail)

User can see this week's activity:

`┌─────────────────────────────────────────┐
│                                         │
│  This Week: Dec 9-15                    │
│                                         │
│  Exercise 4x/week                       │
│                                         │
│  Mon  Tue  Wed  Thu  Fri  Sat  Sun      │
│   -    ✓    ✓    -    -    ✓    -       │
│                                         │
│  3/4 complete                           │
│                                         │
└─────────────────────────────────────────┘`

**Not a heatmap.** Just this week. No historical pressure.

**MVP:** Maybe skip this. Dashboard shows progress numerically (3/4). Detailed day view is nice-to-have.

---

## Progress Feedback

### After Logging

When user logs a building block:

`┌─────────────────────────────────────────┐
│                                         │
│               ✓                         │
│                                         │
│         Got it.                         │
│                                         │
│         Exercise 4x/week                │
│         3/4 this week                   │
│                                         │
│         One more and you've hit         │
│         your goal.                      │
│                                         │
└─────────────────────────────────────────┘`

### Goal Completed

When user hits their target:

`┌─────────────────────────────────────────┐
│                                         │
│              🎉                         │
│                                         │
│         Exercise 4x/week                │
│         4/4 — Goal complete!            │
│                                         │
│         You said you'd do it.           │
│         You did it.                     │
│         That's Athletic Man.            │
│                                         │
└─────────────────────────────────────────┘`

### Guardrail: Under Limit

`┌─────────────────────────────────────────┐
│                                         │
│               ✓                         │
│                                         │
│         Logged: 1 beer                  │
│                                         │
│         You're at 3/5 for the week.     │
│         Still within your limit.        │
│                                         │
└─────────────────────────────────────────┘`

### Guardrail: At Limit

`┌─────────────────────────────────────────┐
│                                         │
│               ✓                         │
│                                         │
│         Logged: 1 beer                  │
│                                         │
│         You're at 5/5 for the week.     │
│         That's your limit.              │
│                                         │
│         You set a limit.                │
│         You stayed within it.           │
│         That's discipline.              │
│                                         │
└─────────────────────────────────────────┘`

### Guardrail: Over Limit

`┌─────────────────────────────────────────┐
│                                         │
│         Logged: 1 beer                  │
│                                         │
│         You're at 6/5 for the week.     │
│         One over your limit.            │
│                                         │
│         Research shows people who       │
│         slip and keep going succeed     │
│         at nearly the same rate as      │
│         those who never slip.           │
│                                         │
│         One week doesn't define you.    │
│         What you do next does.          │
│                                         │
└─────────────────────────────────────────┘`

---

## Multi-Identity Guardrails

Guardrails that affect multiple identities show up under each:

`┌─────────────────────────────────────────┐
│                                         │
│  🏃 Athletic Man                   🟢   │
│     ...                                 │
│     ≤5 beers/week             2/5       │
│                                         │
│  👨‍👧 Present Dad                🟡   │
│     ...                                 │
│     ≤5 beers/week             2/5       │
│                                         │
│  🚀 Successful Founder          🟢   │
│     ...                                 │
│     ≤5 beers/week             2/5       │
│                                         │
└─────────────────────────────────────────┘`

**Same guardrail, same count.** Logging once updates everywhere.

This reinforces: "When I drink, it affects ALL my identities."

---

## Dashboard States

### Normal State

User has been logging, everything's healthy:

`┌─────────────────────────────────────────┐
│  🏃 Athletic Man                   🟢   │
│  👨‍👧 Present Dad                 🟢   │
│  🚀 Successful Founder            🟢   │
└─────────────────────────────────────────┘`

### Mixed State

Some identities need attention:

`┌─────────────────────────────────────────┐
│  🏃 Athletic Man                   🟢   │
│  👨‍👧 Present Dad                 🟡   │
│  🚀 Successful Founder            🟠   │
└─────────────────────────────────────────┘`

### Struggling State

User is having a hard week:

`┌─────────────────────────────────────────┐
│  🏃 Athletic Man                   🟠   │
│  👨‍👧 Present Dad                 🔴   │
│  🚀 Successful Founder            🟡   │
└─────────────────────────────────────────┘`

**No shame messaging.** Colors show state. Weekly summary provides supportive context.

---

## Pull to Refresh

User can pull to refresh to sync latest data (if offline logs were queued):

`┌─────────────────────────────────────────┐
│                                         │
│         ↓ Syncing...                    │
│                                         │
│  YOUR IDENTITIES                        │
│  ...                                    │
└─────────────────────────────────────────┘`

---

## Dashboard Summary

| Element | Purpose |
| --- | --- |
| Identity cards | Organize by who you want to be |
| Health colors | Glanceable status without numbers |
| Progress numbers | Detailed view (3/4, 2/5) |
| Tap to log | One-tap manual logging |
| Voice button | Primary logging method |
| Empty states | Guide new users |
| Completion messages | Celebrate wins |
| Over-limit messages | Support without shame |

---

## Implementation Priority

| Feature | Priority |
| --- | --- |
| Identity cards with health color | P0 |
| Building block progress (x/target) | P0 |
| Guardrail progress (x/limit) | P0 |
| Voice log button | P0 |
| Tap to log (manual) | P0 |
| Completion feedback messages | P0 |
| Over-limit support messages | P0 |
| Week view detail | P2 (nice-to-have) |
| Pull to refresh | P1 |

---
<!-- Source: PRD/09-weekly-summary.md -->

# Backmind PRD — Section 9: Weekly Summary

---

## Overview

The weekly summary is Backmind's retention driver. Once per week, users receive an AI-generated summary of their progress—celebrating wins, noting areas for attention, and providing supportive accountability.

**Goal:** Make users feel seen, supported, and motivated to continue.

---

## When It's Sent

| Day | Time | Why |
| --- | --- | --- |
| Sunday | 7:00pm (user's timezone) | End of week, before reset. Time for reflection. |

**Configurable:** User can change day/time in settings.

---

## Summary Format

### Push Notification

`┌─────────────────────────────────────────┐
│ BACKMIND                          7pm   │
│                                         │
│ Your week in review is ready.           │
│ 🏃 85% 👨‍👧 60% 🚀 90%                    │
│                                         │
│ [View Summary]                          │
└─────────────────────────────────────────┘`

### Full Summary Screen

`┌─────────────────────────────────────────┐
│                                         │
│  ← Back                                 │
│                                         │
│  Your Week                              │
│  Dec 9-15                               │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  🏃 Athletic Man                  85%   │
│                                         │
│  Exercise 4x/week            ✓ 4/4      │
│  Stretch daily               ✓ 6/7      │
│  ≤5 beers/week               ✓ 3/5      │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  👨‍👧 Present Dad                 60%   │
│                                         │
│  Wake early                    4/7      │
│  New place weekly            ✗ 0/1      │
│  ≤5 beers/week               ✓ 3/5      │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  🚀 Successful Founder          90%   │
│                                         │
│  2hr deep work daily         ✓ 6/7      │
│  1hr marketing daily         ✓ 5/7      │
│  ≤5 beers/week               ✓ 3/5      │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [AI-Generated Insight Section]         │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [Share]           [Start Fresh Week]   │
│                                         │
└─────────────────────────────────────────┘`

---

## AI-Generated Insight

### What It Is

A brief, personalized message that:

1. Acknowledges wins genuinely
2. Notes areas that need attention without shaming
3. Offers one specific, actionable suggestion
4. Ends with encouragement tied to identity

### Tone

Like a supportive friend who believes in you. Not a coach lecturing. Not a robot listing stats.

### Example Output

`┌─────────────────────────────────────────┐
│                                         │
│  💬 From Backmind                       │
│                                         │
│  You crushed it as an athlete this      │
│  week—4 for 4 on workouts. That's       │
│  not trying to be athletic. That IS     │
│  athletic.                              │
│                                         │
│  Present Dad needs some love. You       │
│  woke up early most days, but didn't    │
│  get that new place trip with Aurelia.  │
│  She won't remember the missed week—    │
│  but she will remember when you show    │
│  up. Can you plan something for         │
│  this weekend?                          │
│                                         │
│  Founder mode is dialed. Deep work      │
│  is happening. Marketing slipped a      │
│  bit—founder life.                      │
│                                         │
│  3 beers this week. Well under your     │
│  limit. That's discipline protecting    │
│  all three identities.                  │
│                                         │
│  You're not trying to be an athlete,    │
│  a present dad, and a founder.          │
│  You ARE those things.                  │
│  This week proved it.                   │
│                                         │
└─────────────────────────────────────────┘`

---

## AI Prompt for Weekly Summary

`You are a supportive accountability partner generating a weekly summary for the Backmind app.

USER'S IDENTITIES:
{{identities_list}}

THIS WEEK'S DATA:

{{#each identities}}
{{identity_name}}:
{{#each building_blocks}}
- {{name}}: {{completed}}/{{target}} ({{percentage}}%)
{{/each}}
{{#each guardrails}}
- {{name}}: {{current}}/{{limit}} {{#if over_limit}}(OVER LIMIT){{/if}}
{{/each}}
Overall: {{identity_percentage}}%
{{/each}}

GUARDRAIL DETAILS:
{{#each guardrails}}
- {{name}}: {{current}}/{{limit}} — affects {{identities_list}}
  {{#if has_why}}Why: "{{why_statement}}"{{/if}}
{{/each}}

USER CONTEXT (if available):
- User's child's name: {{child_name}} (if mentioned in goals)
- Previous week's performance: {{last_week_summary}}

TASK:
Generate a brief, warm weekly summary that:
1. Acknowledges wins genuinely—be specific about what they accomplished
2. Notes areas that need attention without shaming
3. Offers ONE specific, actionable suggestion for next week
4. Ends with encouragement tied to their identities (not generic motivation)

TONE RULES:
- Like a supportive friend who believes in them
- NOT a coach lecturing
- NOT a robot listing stats
- Use their identity language ("That's Athletic Man" not "Good job exercising")
- Reference their "why" for guardrails if available
- Be warm but honest—don't ignore struggles

FORMAT:
- Keep it under 150 words
- Use natural paragraphs, not bullet points
- Conversational, not formal

RESPOND IN JSON:
{
  "summary_text": "The full summary text...",
  "highlight_identity": "The identity that did best this week",
  "needs_attention_identity": "The identity that needs focus (or null if all good)",
  "suggested_action": "One specific thing to do next week"
}`

---

## Summary Variations

### All Green (Great Week)

`┌─────────────────────────────────────────┐
│                                         │
│  💬 From Backmind                       │
│                                         │
│  This was your week.                    │
│                                         │
│  Athletic Man: 4/4 workouts, stretching │
│  almost every day, and only 2 beers.    │
│  Your body is thanking you.             │
│                                         │
│  Present Dad: Early mornings with       │
│  Aurelia and a trip to somewhere new.   │
│  That's showing up.                     │
│                                         │
│  Founder: Deep work is locked in.       │
│  Marketing too. You're building         │
│  something real.                        │
│                                         │
│  Weeks like this are why you built      │
│  this system. You're not trying to      │
│  be these things. You ARE them.         │
│                                         │
│  Keep going.                            │
│                                         │
└─────────────────────────────────────────┘`

### Mixed Week

`┌─────────────────────────────────────────┐
│                                         │
│  💬 From Backmind                       │
│                                         │
│  Solid week with room to grow.          │
│                                         │
│  Athletic Man is thriving—3 of 4        │
│  workouts done, and you stayed under    │
│  your beer limit. That's the system     │
│  working.                               │
│                                         │
│  Present Dad needs attention. Only 2    │
│  early mornings and no new place with   │
│  Aurelia. Life gets busy, but she       │
│  notices when you're there. Can you     │
│  block something this weekend?          │
│                                         │
│  Founder mode is strong—deep work       │
│  happened 5 out of 7 days.              │
│                                         │
│  You're showing up. Not perfectly,      │
│  but consistently. That's how           │
│  identities are built.                  │
│                                         │
└─────────────────────────────────────────┘`

### Tough Week

`┌─────────────────────────────────────────┐
│                                         │
│  💬 From Backmind                       │
│                                         │
│  Tough week. That's okay.               │
│                                         │
│  Athletic Man took a hit—only 1         │
│  workout and you went over your beer    │
│  limit. It happens. What matters is     │
│  what you do next.                      │
│                                         │
│  Present Dad had some wins—3 early      │
│  mornings with Aurelia. She doesn't     │
│  track your percentages. She just       │
│  knows when dad's there.                │
│                                         │
│  Founder work slipped. Deep work        │
│  only happened twice. Something's       │
│  taking your energy. Worth thinking     │
│  about what.                            │
│                                         │
│  Here's the thing: one bad week         │
│  doesn't make you not an athlete,       │
│  not a present dad, not a founder.      │
│  It just makes you human.               │
│                                         │
│  Monday's a fresh start.                │
│                                         │
└─────────────────────────────────────────┘`

### Over Guardrail Limit

`┌─────────────────────────────────────────┐
│                                         │
│  💬 From Backmind                       │
│                                         │
│  Let's talk about the beers.            │
│                                         │
│  You went to 7 this week—2 over your    │
│  limit of 5. You set that limit         │
│  because you wanted clear mornings      │
│  for workouts and Aurelia.              │
│                                         │
│  Notice how Athletic Man dropped to     │
│  2 workouts this week? And Present      │
│  Dad only had 2 early mornings?         │
│  Might be connected.                    │
│                                         │
│  Research says people who slip and      │
│  keep going succeed at nearly the       │
│  same rate as people who never slip.    │
│  One week doesn't define you.           │
│                                         │
│  Next week: fresh start. You've got     │
│  this.                                  │
│                                         │
└─────────────────────────────────────────┘`

---

## Suggested Action

Each summary includes one specific, actionable suggestion:

| Scenario | Suggested Action |
| --- | --- |
| Missed "new place" goal | "Can you plan something with Aurelia for this weekend?" |
| Low early morning count | "Try setting your alarm 15 minutes earlier tomorrow." |
| Over beer limit | "Pick one social event this week to skip drinking at." |
| Low deep work | "Block your calendar 9-11am tomorrow—no meetings." |
| Everything good | "Keep the momentum. Maybe add one more stretch day?" |

**Principle:** One thing. Not a list. Not overwhelming. One actionable next step.

---

## Historical Context (v1.1+)

In future versions, AI can reference previous weeks:

`"This is your third week in a row hitting 4/4 workouts. 
You're not just having good weeks—you're building a pattern."`

`"Present Dad has been yellow for 3 weeks. Something's 
getting in the way. Worth thinking about what needs to change."`

**MVP:** Single week summary only.
**v1.1+:** Multi-week pattern recognition.

---

## Consistency Copy (Feature 14)

Weekly summary messaging adapts based on completion rate to provide appropriate support:

### Dynamic Messaging Framework

| Completion Rate | Tone | Focus | Example Copy |
|-----------------|------|-------|--------------|
| **80-100%** | Celebratory | Identity reinforcement | "You're not trying to be Athletic Man. You ARE Athletic Man. This week proved it." |
| **60-79%** | Encouraging | Acknowledge wins, light forward look | "Solid week with room to grow. Exercise is locked in—Present Dad could use some love next week." |
| **40-59%** | Supportive | Find bright spots, normalize | "Mixed week. That happens. You still showed up for deep work 3 times. That's not nothing." |
| **20-39%** | Compassionate | Common humanity, fresh start | "Tough week. Life happens to everyone building new patterns. Monday's a clean slate." |
| **0-19%** | Gentle | Connection, no judgment | "Quiet week. Your system is still here. Your identities are still here. I'm here when you're ready." |

### Copy Principles

1. **Never lecture** — User knows when they struggled
2. **Find something positive** — Even in bad weeks, acknowledge any effort
3. **Forward-looking** — Always point to the next opportunity
4. **Identity-focused** — Connect behaviors to who they're becoming
5. **Research-backed** — Reference slip-continue research when appropriate

### AI Prompt Addition

Add to weekly summary prompt:

```
COMPLETION CONTEXT:
Overall completion rate: {completion_rate}%
Best identity: {best_identity} at {best_rate}%
Needs attention: {struggling_identity} at {struggling_rate}%

TONE CALIBRATION:
- If completion >= 80%: Celebratory, identity-affirming
- If completion 60-79%: Encouraging, balanced
- If completion 40-59%: Supportive, find bright spots
- If completion 20-39%: Compassionate, normalize struggle
- If completion < 20%: Gentle, maintain connection

Never make user feel worse than they already do. Your job is to
keep them engaged with their system, not to remind them of failure.
```

---

## Seasonal Check-ins (Feature 12)

Periodic reviews to help users evolve their system as life changes.

### Trigger Cadence

| Option | When | Deep Link |
|--------|------|-----------|
| Monthly | First Sunday of each month, 7pm | `backmind://seasonalcheckin` |
| Quarterly | Jan 1, Apr 1, Jul 1, Oct 1, 7pm | `backmind://seasonalcheckin` |

**Default:** Monthly (configurable in Settings)

### Notification

`┌─────────────────────────────────────────┐
│ BACKMIND                          7pm   │
│                                         │
│ Monthly check-in: Time to review        │
│ your system. Life changes—your          │
│ building blocks should too.             │
│                                         │
│ [Review My System]                      │
└─────────────────────────────────────────┘`

### Seasonal Check-in Flow

**Step 1: Review Current Blocks**

`┌─────────────────────────────────────────┐
│                                         │
│  Monthly Check-in                       │
│  January 2025                           │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Let's review your building blocks.     │
│  Some may need adjustment. Some may     │
│  be ready to graduate.                  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  ATHLETIC MAN                           │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Exercise 4x/week           🟢   │    │
│  │ Last 4 weeks: 4, 4, 4, 3       │    │
│  │ [Keep] [Adjust] [Graduate]     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Stretch daily              🟡   │    │
│  │ Last 4 weeks: 5, 4, 6, 3       │    │
│  │ [Keep] [Adjust] [Graduate]     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Continue →]                           │
│                                         │
└─────────────────────────────────────────┘`

**Step 2: Graduate Confirmation**

`┌─────────────────────────────────────────┐
│                                         │
│  Graduate "Stretch daily"?              │
│                                         │
│  This means:                            │
│  • It's now automatic—you don't need    │
│    Backmind tracking it                 │
│  • Moved to "Graduated Habits" section  │
│  • No more nudges or logging            │
│  • You can bring it back anytime        │
│                                         │
│  🎓 Graduating a habit is a win.        │
│  It means the behavior is part of       │
│  who you are now.                       │
│                                         │
│  [Graduate]           [Keep Tracking]   │
│                                         │
└─────────────────────────────────────────┘`

**Step 3: Add New Blocks**

`┌─────────────────────────────────────────┐
│                                         │
│  Anything new to add?                   │
│                                         │
│  Life changes. New priorities emerge.   │
│  What would help your identities        │
│  right now?                             │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 Tap to speak or type...     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Skip — I'm good for now]              │
│                                         │
└─────────────────────────────────────────┘`

**Step 4: Completion**

`┌─────────────────────────────────────────┐
│                                         │
│               ✓                         │
│                                         │
│  System updated for January.            │
│                                         │
│  Graduated: 1 habit                     │
│  Adjusted: 0 blocks                     │
│  Added: 1 new block                     │
│                                         │
│  Your system evolves with you.          │
│  That's how it stays relevant.          │
│                                         │
│  [Back to Dashboard]                    │
│                                         │
└─────────────────────────────────────────┘`

### Graduated Habits Section

Visible in Settings → Building Blocks:

`┌─────────────────────────────────────────┐
│                                         │
│  GRADUATED HABITS 🎓                    │
│                                         │
│  These are now automatic for you.       │
│  Congrats—you built them into who       │
│  you are.                               │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Stretch daily                   │    │
│  │ Graduated: Jan 2025            │    │
│  │ [Bring Back]                   │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘`

---

## Sharing

### Share Button

User can share their weekly summary:

`┌─────────────────────────────────────────┐
│                                         │
│  [Share]                                │
│                                         │
└─────────────────────────────────────────┘`

### Shareable Card (Image)

Generates an image card for sharing:

`┌─────────────────────────────────────────┐
│                                         │
│  BACKMIND                               │
│  Week of Dec 9-15                       │
│                                         │
│  🏃 Athletic Man              85%  🟢   │
│  👨‍👧 Present Dad              60%  🟡   │
│  🚀 Successful Founder        90%  🟢   │
│                                         │
│  ✓ 14/18 building blocks completed      │
│  ✓ Guardrails: under limit              │
│                                         │
└─────────────────────────────────────────┘`

### What's NOT Shared

| Shared | Not Shared |
| --- | --- |
| Identity names | Specific building block details |
| Overall percentages | Specific guardrail counts |
| Color indicators | AI-generated insight text |
| High-level stats | Personal "why" statements |

**Principle:** Share enough to be accountable, not so much it's embarrassing.

### Share Destinations

Standard iOS share sheet:

- iMessage
- WhatsApp
- Save to Photos
- etc.

---

## Notification Handling

### If User Doesn't Open Summary

Summary stays in notification center. No follow-up.

### If User Opens Late

Summary is still available in app:

`┌─────────────────────────────────────────┐
│                                         │
│  BACKMIND                               │
│                                         │
│  [Latest Summary: Dec 9-15]             │
│                                         │
│  YOUR IDENTITIES                        │
│  ...                                    │
│                                         │
└─────────────────────────────────────────┘`

Tap to view full summary.

### Summary History (v1.1+)

**MVP:** Only latest summary available.
**v1.1+:** History of past summaries accessible.

---

## Backend Generation

### Trigger

Scheduled job runs Sunday at 7pm (per user's timezone):

`1. Query all users where current_time = 7pm in their timezone
2. For each user:
   a. Aggregate this week's data (building blocks, guardrails)
   b. Call AI with prompt + data
   c. Parse response
   d. Store summary in database
   e. Send push notification`

### Data Aggregation

sql

- `*- Building blocks this week*
SELECT bb.id, bb.text, bb.target, COUNT(l.id) as completed
FROM building_blocks bb
LEFT JOIN logs l ON l.building_block_id = bb.id AND l.created_at >= week_start AND l.created_at < week_end
WHERE bb.user_id = ?
GROUP BY bb.id;
*- Guardrails this week* 
SELECT g.id, g.text, g.limit, COALESCE(SUM(l.count), 0) as current
FROM guardrails g
LEFT JOIN guardrail_logs l ON l.guardrail_id = g.id AND l.created_at >= week_start AND l.created_at < week_end
WHERE g.user_id = ?
GROUP BY g.id;
```
### AI Call
```
POST /api/generate-summary
{ "user_id": "...", "week_start": "2024-12-09", "week_end": "2024-12-15", "identities": [...], "building_blocks": [...], "guardrails": [...], "previous_summary": {...} *// for v1.1+ context*
}`

### Response Storage

sql

`INSERT INTO weekly_summaries (
  user_id,
  week_start,
  week_end,
  summary_text,
  highlight_identity,
  needs_attention_identity,
  suggested_action,
  identity_scores,
  created_at
) VALUES (...);
```

---

## Edge Cases

### No Logs This Week

If user logged nothing:
```
┌─────────────────────────────────────────┐
│                                         │
│  💬 From Backmind                       │
│                                         │
│  Quiet week.                            │
│                                         │
│  No logs came through. Life happens—    │
│  maybe you were busy, maybe you         │
│  forgot, maybe things got hard.         │
│                                         │
│  Your system is still here.             │
│  Your identities are still here.        │
│  Athletic Man, Present Dad, Founder—    │
│  they don't disappear because of        │
│  one quiet week.                        │
│                                         │
│  Monday's a fresh start.                │
│  I'll be here.                          │
│                                         │
└─────────────────────────────────────────┘
```

### User Joined Mid-Week

Only count days since they joined:
```
"You joined on Thursday, so this is a partial week. 
But you already logged 2 workouts and kept beers at 1. 
Strong start."
```

### Only One Identity

Summary focuses on that identity with more depth:
```
"Athletic Man is your focus right now—and it shows.
3/4 workouts, stretching most days, and only 2 beers.
Every building block is working toward the same identity.
That's focus. That's how systems work."`

---

## Summary Timing Options (Settings)

User can configure in settings:

| Setting | Options | Default |
| --- | --- | --- |
| Summary day | Any day of week | Sunday |
| Summary time | Any hour | 7:00pm |
| Summary enabled | On/Off | On |

---

## Implementation Priority

| Feature | Priority |
| --- | --- |
| Weekly data aggregation | P0 |
| AI summary generation | P0 |
| Summary notification | P0 |
| Summary screen UI | P0 |
| Consistency copy (tone calibration) | P1 |
| Seasonal check-in notification | P2 |
| Seasonal check-in flow | P2 |
| Graduated habits section | P2 |
| Share card generation | P2 (v1.1) |
| Summary history | P2 (v1.1) |
| Multi-week patterns | P2 (v1.1) |

---
<!-- Source: PRD/10-settings-edit-delete.md -->

# Backmind PRD — Section 10: Settings & Edit/Delete

---

## Overview

Settings allow users to configure their Backmind experience and manage their identities, building blocks, and guardrails after initial setup.

**Principle:** Users can always change their mind. Life changes. Goals change. The system should adapt.

---

## Settings Screen

`┌─────────────────────────────────────────┐
│                                         │
│  ← Back                                 │
│                                         │
│  Settings                               │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  MY SYSTEM                              │
│                                         │
│  [Identities]                        >  │
│  [Building Blocks]                   >  │
│  [Guardrails]                        >  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  TIMING                                 │
│                                         │
│  [Wake Time]                    7:00am  │
│  [Work End Time]                6:00pm  │
│  [Bedtime]                     10:30pm  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  NOTIFICATIONS                          │
│                                         │
│  [Nudges]                           On  │
│  [Check-ins]                        On  │
│  [Weekly Summary]                   On  │
│  [Summary Day]                  Sunday  │
│  [Summary Time]                  7:00pm │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  VOICE                                  │
│                                         │
│  [Siri Shortcut]              Set up >  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  ACCOUNT                                │
│                                         │
│  [Apple ID]         darian@example.com  │
│  [Export Data]                       >  │
│  [Delete Account]                    >  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  ABOUT                                  │
│                                         │
│  [Version]                       1.0.0  │
│  [Send Feedback]                     >  │
│  [Rate Backmind]                     >  │
│                                         │
└─────────────────────────────────────────┘`

---

## My System: Identities

### Identities List

`┌─────────────────────────────────────────┐
│                                         │
│  ← Settings                             │
│                                         │
│  Identities                             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🏃 Athletic Man                 │    │
│  │ 3 building blocks, 1 guardrail  │  > │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 👨‍👧 Present Dad                  │    │
│  │ 2 building blocks, 1 guardrail  │  > │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🚀 Successful Founder           │    │
│  │ 2 building blocks, 1 guardrail  │  > │
│  └─────────────────────────────────┘    │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [+ Add Identity]                       │
│                                         │
└─────────────────────────────────────────┘`

### Edit Identity

`┌─────────────────────────────────────────┐
│                                         │
│  ← Identities                           │
│                                         │
│  Edit Identity                          │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  NAME                                   │
│  ┌─────────────────────────────────┐    │
│  │ Athletic Man                    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ICON                                   │
│  [🏃] [💪] [🏋️] [🚴] [🏊] [Custom...]   │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  BUILDING BLOCKS                        │
│                                         │
│  • Exercise 4x/week                  >  │
│  • Stretch daily                     >  │
│                                         │
│  [+ Add Building Block]                 │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  GUARDRAILS                             │
│                                         │
│  • ≤5 beers/week (shared)            >  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [Delete Identity]                      │
│                                         │
└─────────────────────────────────────────┘`

### Delete Identity

**Confirmation required:**

`┌─────────────────────────────────────────┐
│                                         │
│  Delete "Athletic Man"?                 │
│                                         │
│  This identity has:                     │
│  • 2 building blocks                    │
│  • 1 guardrail (shared with others)     │
│                                         │
│  What would you like to do with the     │
│  connected building blocks?             │
│                                         │
│  [Delete them too]                      │
│                                         │
│  [Keep them (unassigned)]               │
│                                         │
│  [Cancel]                               │
│                                         │
└─────────────────────────────────────────┘`

**Guardrail handling:** If guardrail is shared with other identities, it stays. Only the link to this identity is removed.

---

## My System: Building Blocks

### Building Blocks List

`┌─────────────────────────────────────────┐
│                                         │
│  ← Settings                             │
│                                         │
│  Building Blocks                        │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  ATHLETIC MAN                           │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Exercise 4x/week                │  > │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ Stretch daily                   │  > │
│  └─────────────────────────────────┘    │
│                                         │
│  PRESENT DAD                            │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Wake early                      │  > │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ New place weekly                │  > │
│  └─────────────────────────────────┘    │
│                                         │
│  SUCCESSFUL FOUNDER                     │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 2hr deep work daily             │  > │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ 1hr marketing daily             │  > │
│  └─────────────────────────────────┘    │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [+ Add Building Block]                 │
│                                         │
└─────────────────────────────────────────┘`

### Edit Building Block

`┌─────────────────────────────────────────┐
│                                         │
│  ← Building Blocks                      │
│                                         │
│  Edit Building Block                    │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  WHAT                                   │
│  ┌─────────────────────────────────┐    │
│  │ Exercise 4x/week                │    │
│  └─────────────────────────────────┘    │
│                                         │
│  IDENTITY                               │
│  [Athletic Man ▼]                       │
│                                         │
│  FREQUENCY                              │
│  [4] times per [week ▼]                 │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  TRIGGERS                               │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Tuesday after dropping off      │ ✕  │
│  │ Aurelia                         │    │
│  │ Nudge: 9:00am                   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Wednesday after work            │ ✕  │
│  │ Nudge: 6:00pm                   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Saturday after breakfast        │ ✕  │
│  │ Nudge: 9:30am                   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Sunday morning                  │ ✕  │
│  │ Nudge: 9:00am                   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [+ Add Trigger]                        │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [Save Changes]                         │
│                                         │
│  [Delete Building Block]                │
│                                         │
└─────────────────────────────────────────┘`

### Edit Trigger

Tap on a trigger to edit:

`┌─────────────────────────────────────────┐
│                                         │
│  ← Edit Building Block                  │
│                                         │
│  Edit Trigger                           │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  DAY                                    │
│  [Mon] [Tue✓] [Wed] [Thu] [Fri] [Sat] [Sun] │
│                                         │
│  TRIGGER                                │
│  ┌─────────────────────────────────┐    │
│  │ After dropping off Aurelia      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  NUDGE TIME                             │
│  [9:00 AM]                              │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [Save]            [Delete Trigger]     │
│                                         │
└─────────────────────────────────────────┘`

### Delete Building Block

`┌─────────────────────────────────────────┐
│                                         │
│  Delete "Exercise 4x/week"?             │
│                                         │
│  This will also delete:                 │
│  • 4 triggers                           │
│  • 12 logged completions this month     │
│                                         │
│  This cannot be undone.                 │
│                                         │
│  [Delete]              [Cancel]         │
│                                         │
└─────────────────────────────────────────┘`

---

## My System: Guardrails

### Guardrails List

`┌─────────────────────────────────────────┐
│                                         │
│  ← Settings                             │
│                                         │
│  Guardrails                             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ≤5 beers/week                   │    │
│  │ Affects: Athletic Man, Present  │  > │
│  │ Dad, Successful Founder         │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ≤2 fast food meals/week         │    │
│  │ Affects: Athletic Man           │  > │
│  └─────────────────────────────────┘    │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [+ Add Guardrail]                      │
│                                         │
└─────────────────────────────────────────┘`

### Edit Guardrail

`┌─────────────────────────────────────────┐
│                                         │
│  ← Guardrails                           │
│                                         │
│  Edit Guardrail                         │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  LIMIT                                  │
│  No more than [5] [beers ▼] per [week ▼]│
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  AFFECTS WHICH IDENTITIES?              │
│                                         │
│  ☑ Athletic Man                         │
│  ☑ Present Dad                          │
│  ☑ Successful Founder                   │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  TEMPTATION CONTEXT                     │
│                                         │
│  When are you most tempted?             │
│  ┌─────────────────────────────────┐    │
│  │ Friday and Saturday nights      │    │
│  └─────────────────────────────────┘    │
│                                         │
│  CHECK-IN TIMES                         │
│                                         │
│  Opening: Friday 6:00pm, Saturday 6:00pm│
│  Closing: Friday 10:00pm, Saturday 10:00pm │
│                                         │
│  [Edit Check-in Times]                  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  WHY (Optional)                         │
│  ┌─────────────────────────────────┐    │
│  │ Clear mornings for workouts     │    │
│  │ and Aurelia                     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Help me find my why]                  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [Save Changes]                         │
│                                         │
│  [Delete Guardrail]                     │
│                                         │
└─────────────────────────────────────────┘`

### Edit Check-in Times

`┌─────────────────────────────────────────┐
│                                         │
│  ← Edit Guardrail                       │
│                                         │
│  Check-in Times                         │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  FRIDAY                                 │
│                                         │
│  Opening check-in (supportive)          │
│  [6:00 PM]                              │
│                                         │
│  Closing check-in (ask for report)      │
│  [10:00 PM]                             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  SATURDAY                               │
│                                         │
│  Opening check-in (supportive)          │
│  [6:00 PM]                              │
│                                         │
│  Closing check-in (ask for report)      │
│  [10:00 PM]                             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [+ Add Another Day]                    │
│                                         │
│  [Save]                                 │
│                                         │
└─────────────────────────────────────────┘`

### Delete Guardrail

`┌─────────────────────────────────────────┐
│                                         │
│  Delete "≤5 beers/week"?                │
│                                         │
│  This guardrail is linked to:           │
│  • Athletic Man                         │
│  • Present Dad                          │
│  • Successful Founder                   │
│                                         │
│  All logged data will be deleted.       │
│  This cannot be undone.                 │
│                                         │
│  [Delete]              [Cancel]         │
│                                         │
└─────────────────────────────────────────┘`

---

## Timing Settings

### Wake Time

`┌─────────────────────────────────────────┐
│                                         │
│  Wake Time                              │
│                                         │
│  When do you usually wake up?           │
│                                         │
│  This helps Backmind time your          │
│  nudges based on your energy phases.    │
│                                         │
│  [7:00 AM]                              │
│                                         │
│  [Save]                                 │
│                                         │
└─────────────────────────────────────────┘`

### Work End Time

`┌─────────────────────────────────────────┐
│                                         │
│  Work End Time                          │
│                                         │
│  When do you usually finish work?       │
│                                         │
│  Used for "after work" triggers.        │
│                                         │
│  [6:00 PM]                              │
│                                         │
│  [Save]                                 │
│                                         │
└─────────────────────────────────────────┘`

### Bedtime

`┌─────────────────────────────────────────┐
│                                         │
│  Bedtime                                │
│                                         │
│  When do you usually go to bed?         │
│                                         │
│  Backmind won't send nudges after       │
│  this time (protecting your sleep).     │
│                                         │
│  [10:30 PM]                             │
│                                         │
│  [Save]                                 │
│                                         │
└─────────────────────────────────────────┘`

---

## Notification Settings

### Nudges Toggle

`┌─────────────────────────────────────────┐
│                                         │
│  Nudges                                 │
│                                         │
│  [On/Off Toggle]                   On   │
│                                         │
│  Nudges remind you to complete your     │
│  building blocks at trigger times.      │
│                                         │
│  Research shows people who get          │
│  prompted at the right moment are       │
│  3x more likely to follow through.      │
│                                         │
└─────────────────────────────────────────┘`

### Check-ins Toggle

`┌─────────────────────────────────────────┐
│                                         │
│  Check-ins                              │
│                                         │
│  [On/Off Toggle]                   On   │
│                                         │
│  Check-ins ask about your guardrails    │
│  at temptation times—so you can         │
│  celebrate zeros or log honestly.       │
│                                         │
└─────────────────────────────────────────┘`

### Weekly Summary Settings

`┌─────────────────────────────────────────┐
│                                         │
│  Weekly Summary                         │
│                                         │
│  [On/Off Toggle]                   On   │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  SUMMARY DAY                            │
│  [Sunday ▼]                             │
│                                         │
│  SUMMARY TIME                           │
│  [7:00 PM]                              │
│                                         │
└─────────────────────────────────────────┘`

### Previsualization Toggle

`┌─────────────────────────────────────────┐
│                                         │
│  Previsualization Nudges                │
│                                         │
│  [On/Off Toggle]                   On   │
│                                         │
│  Morning nudges that help you           │
│  visualize completing your building     │
│  blocks successfully today.             │
│                                         │
│  Focus on how you'll FEEL after—not     │
│  just what you'll do.                   │
│                                         │
└─────────────────────────────────────────┘`

**Default:** On (research shows previsualization improves follow-through)

---

## Seasonal Check-ins

### Check-in Cadence

`┌─────────────────────────────────────────┐
│                                         │
│  Seasonal Check-ins                     │
│                                         │
│  How often would you like to review     │
│  and adjust your building blocks?       │
│                                         │
│  [Monthly (Recommended) ▼]              │
│                                         │
│  Options:                               │
│  • Monthly - First Sunday of month      │
│  • Quarterly - Every 3 months           │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Life changes. Your system should too.  │
│  Seasonal check-ins let you retire      │
│  blocks that have become automatic      │
│  and add new ones that matter now.      │
│                                         │
└─────────────────────────────────────────┘`

**Default:** Monthly

**What happens:**
- Notification prompts review
- Deep link opens seasonal check-in flow (`backmind://seasonalcheckin`)
- User can retire "graduated" blocks, adjust frequencies, add new blocks
- Retired blocks move to "Graduated Habits" section (visible but not tracked)

---

## Building Block Settings

### Learning Mode Toggle

`┌─────────────────────────────────────────┐
│                                         │
│  Learning Mode                          │
│                                         │
│  [On/Off Toggle]                  Off   │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  When enabled for a building block:     │
│  • "Showing up = success"               │
│  • Any completion counts as 100%        │
│  • Reduces pressure while you build     │
│    the habit                            │
│                                         │
│  Turn off anytime when you're ready     │
│  to track normally again.               │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  BLOCKS IN LEARNING MODE                │
│                                         │
│  ☑ Exercise 4x/week                     │
│    Learning until Feb 15, 2025          │
│    [Turn off early]                     │
│                                         │
│  ☐ Stretch daily                        │
│                                         │
│  ☐ 2hr deep work                        │
│                                         │
└─────────────────────────────────────────┘`

**Opt-in only:** User must explicitly enable learning mode per block

**Duration:**
- Suggested 2-4 weeks initially
- Can turn off anytime
- Notification when learning period ends

### Bad Day Version

In the Edit Building Block screen, add section:

`┌─────────────────────────────────────────┐
│                                         │
│  BAD DAY VERSION (Optional)             │
│                                         │
│  What's the minimum that still counts?  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 15 minutes of movement          │    │
│  └─────────────────────────────────┘    │
│                                         │
│  On tough days, we'll offer this        │
│  as an alternative. Something is        │
│  always better than nothing.            │
│                                         │
│  [Help me find a minimum]               │
│                                         │
└─────────────────────────────────────────┘`

### Conditions for Success

In the Edit Building Block screen, add section:

`┌─────────────────────────────────────────┐
│                                         │
│  CONDITIONS FOR SUCCESS (Optional)      │
│                                         │
│  What do you need to have ready?        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ Gym bag packed the night before │    │
│  └─────────────────────────────────┘    │
│                                         │
│  We'll remind you the night before      │
│  your trigger to prep these.            │
│                                         │
└─────────────────────────────────────────┘`

---

## Voice Settings

### Siri Shortcut

`┌─────────────────────────────────────────┐
│                                         │
│  Siri Shortcut                          │
│                                         │
│  Say "Hey Siri, Backmind" to start      │
│  logging instantly—hands free.          │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  STATUS                                 │
│  ✓ Shortcut added                       │
│                                         │
│  [Re-add to Siri]                       │
│                                         │
│  [Remove from Siri]                     │
│                                         │
└─────────────────────────────────────────┘`

**If not set up:**

`┌─────────────────────────────────────────┐
│                                         │
│  Siri Shortcut                          │
│                                         │
│  Say "Hey Siri, Backmind" to start      │
│  logging instantly—hands free.          │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  STATUS                                 │
│  Not set up                             │
│                                         │
│  [Add to Siri]                          │
│                                         │
└─────────────────────────────────────────┘`

---

## Account Settings

### Apple ID Display

Shows connected Apple ID (read-only):

`┌─────────────────────────────────────────┐
│                                         │
│  Apple ID                               │
│                                         │
│  darian@example.com                     │
│                                         │
│  Signed in with Apple. Your data is     │
│  synced securely across devices.        │
│                                         │
└─────────────────────────────────────────┘`

### Export Data

`┌─────────────────────────────────────────┐
│                                         │
│  Export Data                            │
│                                         │
│  Download all your Backmind data:       │
│  • Identities                           │
│  • Building blocks                      │
│  • Guardrails                           │
│  • All logs                             │
│  • Weekly summaries                     │
│                                         │
│  Data will be exported as a JSON file.  │
│                                         │
│  [Export My Data]                       │
│                                         │
└─────────────────────────────────────────┘`

**Export format:** JSON file containing all user data. Can be saved or shared.

### Delete Account

`┌─────────────────────────────────────────┐
│                                         │
│  Delete Account                         │
│                                         │
│  This will permanently delete:          │
│  • Your account                         │
│  • All identities and goals             │
│  • All logged data                      │
│  • All weekly summaries                 │
│                                         │
│  This cannot be undone.                 │
│                                         │
│  [Delete My Account]                    │
│                                         │
└─────────────────────────────────────────┘`

**Confirmation:**

`┌─────────────────────────────────────────┐
│                                         │
│  Are you sure?                          │
│                                         │
│  Type "DELETE" to confirm.              │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Delete Forever]      [Cancel]         │
│                                         │
└─────────────────────────────────────────┘`

---

## About Settings

### Version

Shows current app version.

### Send Feedback

Opens email composer:

`To: feedback@backmind.app
Subject: Backmind Feedback (v1.0.0)
Body: [User types feedback]`

### Rate Backmind

Opens App Store review prompt.

---

## Add New Items Post-Onboarding

### Add Identity

Same flow as onboarding but from settings:

`┌─────────────────────────────────────────┐
│                                         │
│  ← Identities                           │
│                                         │
│  Add Identity                           │
│                                         │
│  Who else do you want to be?            │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 Tap to speak or type...     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Examples:                              │
│  • "Good friend"                        │
│  • "Lifelong learner"                   │
│  • "Creative person"                    │
│                                         │
└─────────────────────────────────────────┘`

**Warning at 3+:** Same warning as onboarding about cognitive load.

### Add Building Block

`┌─────────────────────────────────────────┐
│                                         │
│  ← Building Blocks                      │
│                                         │
│  Add Building Block                     │
│                                         │
│  FOR WHICH IDENTITY?                    │
│  [Athletic Man ▼]                       │
│                                         │
│  WHAT'S THE BUILDING BLOCK?             │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 Tap to speak or type...     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Continue]                             │
│                                         │
└─────────────────────────────────────────┘`

Then follows same trigger flow as onboarding (with AI feedback).

### Add Guardrail

`┌─────────────────────────────────────────┐
│                                         │
│  ← Guardrails                           │
│                                         │
│  Add Guardrail                          │
│                                         │
│  What do you want to limit?             │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 🎤 Tap to speak or type...     │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Examples:                              │
│  • "No more than 3 coffees a day"       │
│  • "Max 1 hour of social media"         │
│  • "No work after 8pm"                  │
│                                         │
└─────────────────────────────────────────┘`

Then follows same flow: identity linking → temptation context → why.

---

## Edit Rules & Constraints

### What Can Be Edited

| Item | Editable Fields |
| --- | --- |
| **Identity** | Name, icon |
| **Building Block** | Name, frequency, triggers, identity |
| **Guardrail** | Name, limit, identities, temptation context, why, check-in times |

### What Cannot Be Edited

| Item | Why |
| --- | --- |
| Past logs | Historical data should be accurate |
| Weekly summaries | Generated at a point in time |

### Moving Building Block to Different Identity

User can change which identity a building block belongs to:

1. Edit building block
2. Change "Identity" dropdown
3. Save

Building block moves. Historical data stays with the block.

---

## Data Integrity on Delete

### Delete Identity

| Connected Item | What Happens |
| --- | --- |
| Building blocks | User chooses: delete or keep (unassigned) |
| Guardrails (exclusive) | Deleted with identity |
| Guardrails (shared) | Link removed, guardrail stays |
| Logs | Deleted with building blocks if deleted |

### Delete Building Block

| Connected Item | What Happens |
| --- | --- |
| Triggers | Deleted |
| Scheduled nudges | Cancelled |
| Logs | Deleted |

### Delete Guardrail

| Connected Item | What Happens |
| --- | --- |
| Identity links | Removed |
| Check-ins | Cancelled |
| Logs | Deleted |

---

## Settings Data Model

### User Settings Table

sql

`CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  wake_time TIME DEFAULT '07:00',
  work_end_time TIME DEFAULT '18:00',
  bedtime TIME DEFAULT '22:30',
  timezone TEXT DEFAULT 'America/Los_Angeles',
  nudges_enabled BOOLEAN DEFAULT true,
  checkins_enabled BOOLEAN DEFAULT true,
  weekly_summary_enabled BOOLEAN DEFAULT true,
  summary_day TEXT DEFAULT 'Sunday',
  summary_time TIME DEFAULT '19:00',
  siri_shortcut_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);`

---

## Implementation Priority

| Feature | Priority |
| --- | --- |
| View/edit identities | P0 |
| View/edit building blocks | P0 |
| View/edit guardrails | P0 |
| Delete with confirmation | P0 |
| Add new items post-onboarding | P0 |
| Timing settings | P0 |
| Notification toggles | P0 |
| Weekly summary settings | P1 |
| Previsualization toggle | P1 |
| Bad Day Version (edit block) | P1 |
| Seasonal check-in cadence | P2 |
| Learning Mode toggle | P2 |
| Conditions for Success | P2 |
| Siri shortcut setup | P1 |
| Export data | P2 |
| Delete account | P1 (required for App Store) |

---
<!-- Source: PRD/11-tech-stack-architecture.md -->

# Backmind PRD — Section 11: Tech Stack & Architecture

---

## Overview

Backmind is a native iOS app with a cloud backend. The architecture prioritizes:

- Fast, reliable voice capture
- Low-latency AI classification
- Proactive notifications
- Offline resilience
- Simple, maintainable codebase

---

## Tech Stack Summary

| Layer | Technology | Why |
| --- | --- | --- |
| **iOS App** | Swift / SwiftUI | Native performance, modern UI framework |
| **Local Storage** | SwiftData | Apple's newest persistence, iOS 17+ |
| **Speech-to-Text** | Apple Speech | On-device, free, private |
| **Backend** | Supabase | Auth, database, edge functions, real-time |
| **Database** | Supabase Postgres | Relational, powerful queries, backup |
| **AI Classification** | Claude Haiku | Fast, cheap, reliable |
| **AI Summaries** | Claude Haiku | Same model for consistency |
| **Push Notifications** | Supabase + APNs | Server-scheduled notifications |
| **Auth** | Sign in with Apple | Frictionless, privacy-focused |

---

## Architecture Diagram

`┌─────────────────────────────────────────────────────────────────┐
│                         iOS APP                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      SwiftUI                               │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │  │
│  │  │Dashboard│  │Onboard- │  │Settings │  │ Voice   │       │  │
│  │  │  View   │  │  ing    │  │  View   │  │ Capture │       │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    App Services                            │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │  │
│  │  │ Voice   │  │  Sync   │  │Notific- │  │ Widget  │       │  │
│  │  │ Service │  │ Service │  │ ations  │  │ Service │       │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Local Layer                             │  │
│  │  ┌─────────────────┐  ┌─────────────────────────────────┐ │  │
│  │  │  Apple Speech   │  │         SwiftData               │ │  │
│  │  │ (Transcription) │  │  (Local Cache + Offline Queue)  │ │  │
│  │  └─────────────────┘  └─────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SUPABASE                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Edge Functions                          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │  │
│  │  │  Classify   │  │  Generate   │  │  Schedule   │        │  │
│  │  │    Log      │  │  Summary    │  │   Nudges    │        │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      Postgres                              │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │  │
│  │  │  Users  │  │Identity │  │ Blocks  │  │  Logs   │       │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Auth + APNs                             │  │
│  │  ┌─────────────────┐  ┌─────────────────────────────────┐ │  │
│  │  │ Sign in w/Apple │  │     Push Notification Service   │ │  │
│  │  └─────────────────┘  └─────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ API Call
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ANTHROPIC API                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Claude Haiku                            │  │
│  │         (Classification + Summary Generation)              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘`

---

## iOS App Architecture

### Project Structure

`Backmind/
├── App/
│   ├── BackmindApp.swift           # App entry point
│   └── AppDelegate.swift           # Push notification handling
│
├── Features/
│   ├── Onboarding/
│   │   ├── OnboardingView.swift
│   │   ├── IdentityCreationView.swift
│   │   ├── BuildingBlockCreationView.swift
│   │   ├── GuardrailCreationView.swift
│   │   └── OnboardingViewModel.swift
│   │
│   ├── Dashboard/
│   │   ├── DashboardView.swift
│   │   ├── IdentityCardView.swift
│   │   ├── ProgressIndicator.swift
│   │   └── DashboardViewModel.swift
│   │
│   ├── Voice/
│   │   ├── VoiceCaptureView.swift
│   │   ├── VoiceService.swift
│   │   └── TranscriptionManager.swift
│   │
│   ├── Settings/
│   │   ├── SettingsView.swift
│   │   ├── IdentitySettingsView.swift
│   │   ├── BuildingBlockSettingsView.swift
│   │   ├── GuardrailSettingsView.swift
│   │   └── SettingsViewModel.swift
│   │
│   └── Summary/
│       ├── WeeklySummaryView.swift
│       └── SummaryViewModel.swift
│
├── Services/
│   ├── SyncService.swift           # Supabase sync
│   ├── AIService.swift             # Classification + summaries
│   ├── NotificationService.swift   # Local + push notifications
│   └── AuthService.swift           # Sign in with Apple
│
├── Models/
│   ├── Identity.swift
│   ├── BuildingBlock.swift
│   ├── Guardrail.swift
│   ├── Trigger.swift
│   ├── Log.swift
│   └── WeeklySummary.swift
│
├── Data/
│   ├── SwiftDataContainer.swift
│   ├── SupabaseClient.swift
│   └── OfflineQueue.swift
│
├── Widget/
│   ├── BackmindWidget.swift
│   └── WidgetViews.swift
│
├── Intents/
│   └── BackmindShortcuts.swift     # Siri integration
│
└── Utilities/
    ├── Constants.swift
    ├── Extensions.swift
    └── HealthCalculator.swift`

### SwiftUI + MVVM

| Layer | Responsibility |
| --- | --- |
| **View** | UI rendering, user input |
| **ViewModel** | Business logic, state management |
| **Service** | External integrations (API, speech, notifications) |
| **Model** | Data structures |
| **Data** | Persistence (SwiftData + Supabase) |

---

## Local Storage (SwiftData)

### Why SwiftData

| Benefit | Description |
| --- | --- |
| Modern | Apple's newest persistence framework |
| Swift-native | No Core Data boilerplate |
| Offline-first | Data available without network |
| Fast reads | Local queries are instant |
| iOS 17+ | Target audience likely on recent iOS |

### SwiftData Models

swift

`@Model
class Identity {
    @Attribute(.unique) var id: UUID
    var name: String
    var icon: String
    var createdAt: Date
    var updatedAt: Date
    
    @Relationship(deleteRule: .cascade)
    var buildingBlocks: [BuildingBlock]
    
    @Relationship
    var guardrails: [Guardrail]
    
    *// Computed*
    var healthPercentage: Double { ... }
    var healthColor: HealthColor { ... }
}

@Model
class BuildingBlock {
    @Attribute(.unique) var id: UUID
    var text: String
    var frequency: Int
    var frequencyPeriod: FrequencyPeriod *// .daily, .weekly*
    var createdAt: Date
    var updatedAt: Date
    
    @Relationship
    var identity: Identity?
    
    @Relationship(deleteRule: .cascade)
    var triggers: [Trigger]
    
    @Relationship(deleteRule: .cascade)
    var logs: [BuildingBlockLog]
    
    *// Computed*
    var completedThisPeriod: Int { ... }
    var progressString: String { ... }
}

@Model
class Trigger {
    @Attribute(.unique) var id: UUID
    var dayOfWeek: Int *// 1-7*
    var triggerText: String
    var nudgeTime: Date
    var createdAt: Date
    
    @Relationship
    var buildingBlock: BuildingBlock?
}

@Model
class Guardrail {
    @Attribute(.unique) var id: UUID
    var text: String
    var limit: Int
    var period: FrequencyPeriod
    var temptationContext: String?
    var whyStatement: String?
    var createdAt: Date
    var updatedAt: Date
    
    @Relationship
    var identities: [Identity]
    
    @Relationship(deleteRule: .cascade)
    var checkIns: [CheckIn]
    
    @Relationship(deleteRule: .cascade)
    var logs: [GuardrailLog]
    
    *// Computed*
    var currentCount: Int { ... }
    var isOverLimit: Bool { ... }
}

@Model
class CheckIn {
    @Attribute(.unique) var id: UUID
    var dayOfWeek: Int
    var openingTime: Date
    var closingTime: Date
    
    @Relationship
    var guardrail: Guardrail?
}

@Model
class BuildingBlockLog {
    @Attribute(.unique) var id: UUID
    var transcript: String?
    var confidence: Double?
    var createdAt: Date
    var syncedAt: Date?
    
    @Relationship
    var buildingBlock: BuildingBlock?
}

@Model
class GuardrailLog {
    @Attribute(.unique) var id: UUID
    var count: Int
    var isZero: Bool
    var transcript: String?
    var createdAt: Date
    var syncedAt: Date?
    
    @Relationship
    var guardrail: Guardrail?
}

@Model
class WeeklySummary {
    @Attribute(.unique) var id: UUID
    var weekStart: Date
    var weekEnd: Date
    var summaryText: String
    var highlightIdentity: String?
    var needsAttentionIdentity: String?
    var suggestedAction: String?
    var identityScores: [String: Double] *// JSON encoded*
    var createdAt: Date
}

@Model
class OfflineQueueItem {
    @Attribute(.unique) var id: UUID
    var type: QueueItemType *// .buildingBlockLog, .guardrailLog*
    var transcript: String
    var createdAt: Date
    var retryCount: Int
}`

### Enums

swift

`enum FrequencyPeriod: String, Codable {
    case daily
    case weekly
}

enum HealthColor: String {
    case green   *// 70%+*
    case yellow  *// 50-69%*
    case orange  *// 30-49%*
    case red     *// <30%*
    case empty   *// No data yet*
}

enum QueueItemType: String, Codable {
    case buildingBlockLog
    case guardrailLog
}`

---

## Backend (Supabase)

### Why Supabase

| Benefit | Description |
| --- | --- |
| Postgres | Powerful relational database |
| Auth | Sign in with Apple built-in |
| Edge Functions | Serverless functions for AI calls |
| Real-time | Future: sync across devices |
| Affordable | Free tier generous, scales well |
| Familiar | You know Supabase already |

### Database Schema

sql

- `*- Users*
CREATE TABLE users ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), apple_user_id TEXT UNIQUE NOT NULL, email TEXT, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
*- User Settings*
CREATE TABLE user_settings ( user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, wake_time TIME DEFAULT '07:00', work_end_time TIME DEFAULT '18:00', bedtime TIME DEFAULT '22:30', timezone TEXT DEFAULT 'America/Los_Angeles', nudges_enabled BOOLEAN DEFAULT true, checkins_enabled BOOLEAN DEFAULT true, weekly_summary_enabled BOOLEAN DEFAULT true, summary_day TEXT DEFAULT 'Sunday', summary_time TIME DEFAULT '19:00', device_token TEXT, *- APNs token* created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
*- Identities*
CREATE TABLE identities ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, name TEXT NOT NULL, icon TEXT DEFAULT '⭐', created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
*- Building Blocks*
CREATE TABLE building_blocks ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, identity_id UUID REFERENCES identities(id) ON DELETE SET NULL, text TEXT NOT NULL, frequency INT NOT NULL, frequency_period TEXT DEFAULT 'weekly', *- 'daily', 'weekly'* created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
*- Triggers*
CREATE TABLE triggers ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), building_block_id UUID REFERENCES building_blocks(id) ON DELETE CASCADE, day_of_week INT NOT NULL, *- 1=Monday, 7=Sunday* trigger_text TEXT NOT NULL, nudge_time TIME NOT NULL, created_at TIMESTAMPTZ DEFAULT now()
);
*- Guardrails*
CREATE TABLE guardrails ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, text TEXT NOT NULL, limit_count INT NOT NULL, period TEXT DEFAULT 'weekly', temptation_context TEXT, why_statement TEXT, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
*- Guardrail-Identity Link (many-to-many)*
CREATE TABLE guardrail_identities ( guardrail_id UUID REFERENCES guardrails(id) ON DELETE CASCADE, identity_id UUID REFERENCES identities(id) ON DELETE CASCADE, PRIMARY KEY (guardrail_id, identity_id)
);
*- Check-ins (scheduled times for guardrails)*
CREATE TABLE check_ins ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), guardrail_id UUID REFERENCES guardrails(id) ON DELETE CASCADE, day_of_week INT NOT NULL, opening_time TIME NOT NULL, closing_time TIME NOT NULL, created_at TIMESTAMPTZ DEFAULT now()
);
*- Building Block Logs*
CREATE TABLE building_block_logs ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, building_block_id UUID REFERENCES building_blocks(id) ON DELETE CASCADE, transcript TEXT, confidence FLOAT, created_at TIMESTAMPTZ DEFAULT now()
);
*- Guardrail Logs*
CREATE TABLE guardrail_logs ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, guardrail_id UUID REFERENCES guardrails(id) ON DELETE CASCADE, count INT NOT NULL, is_zero BOOLEAN DEFAULT false, transcript TEXT, created_at TIMESTAMPTZ DEFAULT now()
);
*- Weekly Summaries*
CREATE TABLE weekly_summaries ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, week_start DATE NOT NULL, week_end DATE NOT NULL, summary_text TEXT NOT NULL, highlight_identity TEXT, needs_attention_identity TEXT, suggested_action TEXT, identity_scores JSONB, created_at TIMESTAMPTZ DEFAULT now()
);
*- Scheduled Nudges (for daily processing)*
CREATE TABLE scheduled_nudges ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, building_block_id UUID REFERENCES building_blocks(id) ON DELETE CASCADE, trigger_id UUID REFERENCES triggers(id) ON DELETE CASCADE, scheduled_for TIMESTAMPTZ NOT NULL, nudge_text TEXT NOT NULL, sent_at TIMESTAMPTZ, status TEXT DEFAULT 'pending' *- 'pending', 'sent', 'cancelled'*
);
*- Scheduled Check-ins*
CREATE TABLE scheduled_check_ins ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES users(id) ON DELETE CASCADE, guardrail_id UUID REFERENCES guardrails(id) ON DELETE CASCADE, check_in_id UUID REFERENCES check_ins(id) ON DELETE CASCADE, type TEXT NOT NULL, *- 'opening', 'closing'* scheduled_for TIMESTAMPTZ NOT NULL, check_in_text TEXT NOT NULL, sent_at TIMESTAMPTZ, status TEXT DEFAULT 'pending'
);
*- Indexes*
CREATE INDEX idx_building_block_logs_user_created ON building_block_logs(user_id, created_at);
CREATE INDEX idx_guardrail_logs_user_created ON guardrail_logs(user_id, created_at);
CREATE INDEX idx_scheduled_nudges_status_time ON scheduled_nudges(status, scheduled_for);
CREATE INDEX idx_scheduled_check_ins_status_time ON scheduled_check_ins(status, scheduled_for);`

---

## Edge Functions

### 1. Classify Log

Receives transcript + user's blocks/guardrails, calls Claude, returns match.

typescript

`*// supabase/functions/classify-log/index.ts*

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { user_id, transcript } = await req.json()
  
  *// Get user's building blocks and guardrails*
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  
  const { data: buildingBlocks } = await supabase
    .from('building_blocks')
    .select('id, text, identity:identities(name)')
    .eq('user_id', user_id)
  
  const { data: guardrails } = await supabase
    .from('guardrails')
    .select('id, text, limit_count')
    .eq('user_id', user_id)
  
  *// Build prompt*
  const prompt = buildClassificationPrompt(transcript, buildingBlocks, guardrails)
  
  *// Call Claude*
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': Deno.env.get('ANTHROPIC_API_KEY')!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }]
    })
  })
  
  const result = await response.json()
  const classification = JSON.parse(result.content[0].text)
  
  return new Response(JSON.stringify(classification), {
    headers: { 'Content-Type': 'application/json' }
  })
})`

### 2. Generate Weekly Summary

Aggregates week's data, calls Claude, stores summary, sends notification.

typescript

`*// supabase/functions/generate-summary/index.ts*

serve(async (req) => {
  const { user_id } = await req.json()
  
  *// Aggregate week's data*
  const weekData = await aggregateWeekData(user_id)
  
  *// Build prompt*
  const prompt = buildSummaryPrompt(weekData)
  
  *// Call Claude*
  const response = await callClaude(prompt)
  const summary = JSON.parse(response)
  
  *// Store summary*
  await supabase.from('weekly_summaries').insert({
    user_id,
    week_start: weekData.weekStart,
    week_end: weekData.weekEnd,
    summary_text: summary.summary_text,
    highlight_identity: summary.highlight_identity,
    needs_attention_identity: summary.needs_attention_identity,
    suggested_action: summary.suggested_action,
    identity_scores: summary.identity_scores
  })
  
  *// Send push notification*
  await sendPushNotification(user_id, 'Your week in review is ready.')
  
  return new Response(JSON.stringify({ success: true }))
})`

### 3. Schedule Daily Nudges

Runs daily, creates nudge entries for the day.

typescript

`*// supabase/functions/schedule-nudges/index.ts*

serve(async (req) => {
  *// Get all users with nudges enabled*
  const { data: users } = await supabase
    .from('user_settings')
    .select('user_id, timezone')
    .eq('nudges_enabled', true)
  
  for (const user of users) {
    *// Get user's triggers for today*
    const today = getTodayInTimezone(user.timezone)
    const dayOfWeek = today.getDay() || 7 *// 1-7*
    
    const { data: triggers } = await supabase
      .from('triggers')
      .select('*, building_block:building_blocks(*)')
      .eq('day_of_week', dayOfWeek)
      .eq('building_block.user_id', user.user_id)
    
    *// Create scheduled nudges*
    for (const trigger of triggers) {
      const scheduledFor = combineDateAndTime(today, trigger.nudge_time, user.timezone)
      
      await supabase.from('scheduled_nudges').insert({
        user_id: user.user_id,
        building_block_id: trigger.building_block.id,
        trigger_id: trigger.id,
        scheduled_for: scheduledFor,
        nudge_text: generateNudgeText(trigger),
        status: 'pending'
      })
    }
  }
  
  return new Response(JSON.stringify({ success: true }))
})`

### 4. Send Notifications

Runs every minute, sends due notifications via APNs.

typescript

`*// supabase/functions/send-notifications/index.ts*

serve(async (req) => {
  const now = new Date()
  
  *// Get pending nudges that are due*
  const { data: dueNudges } = await supabase
    .from('scheduled_nudges')
    .select('*, user:users(device_token)')
    .eq('status', 'pending')
    .lte('scheduled_for', now.toISOString())
  
  for (const nudge of dueNudges) {
    if (nudge.user.device_token) {
      await sendAPNS(nudge.user.device_token, {
        title: 'BACKMIND',
        body: nudge.nudge_text,
        data: {
          type: 'nudge',
          building_block_id: nudge.building_block_id
        }
      })
      
      await supabase
        .from('scheduled_nudges')
        .update({ status: 'sent', sent_at: now })
        .eq('id', nudge.id)
    }
  }
  
  *// Same for check-ins...*
  
  return new Response(JSON.stringify({ success: true }))
})
```

---

## AI Integration (Claude Haiku)

### Why Claude Haiku

| Factor | Claude Haiku |
|--------|--------------|
| Speed | ~0.5-1 second response |
| Cost | ~$0.00025 per classification |
| Quality | Good enough for classification |
| Consistency | Reliable JSON output |

### Cost Estimation

| Usage | Calculation | Monthly Cost |
|-------|-------------|--------------|
| 10 logs/day/user | 10 × 30 = 300 logs/month |  |
| Input tokens | ~500 tokens/request |  |
| Output tokens | ~100 tokens/request |  |
| Per user/month | 300 × 600 = 180K tokens | ~$0.05 |
| 1,000 users | 180M tokens | ~$50 |
| 10,000 users | 1.8B tokens | ~$500 |

**Conclusion:** AI costs are negligible. ~$0.50/user/year.

### Prompt Templates

See Section 5 (AI Help System) and Section 6 (Voice Logging) for full prompts.

---

## Push Notifications (APNs)

### Architecture
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Supabase   │────▶│   APNs      │────▶│   iPhone    │
│  Edge Fn    │     │   Server    │     │   App       │
└─────────────┘     └─────────────┘     └─────────────┘`

### APNs Setup

1. Apple Developer account → Certificates → APNs key
2. Store key in Supabase secrets
3. Edge function uses key to authenticate with APNs

### Notification Payload

json

`{
  "aps": {
    "alert": {
      "title": "BACKMIND",
      "body": "It's Tuesday after drop-off. Gym time?"
    },
    "sound": "default",
    "category": "NUDGE_CATEGORY"
  },
  "data": {
    "type": "nudge",
    "building_block_id": "uuid-here"
  }
}`

### Notification Categories (Actions)

swift

`*// In AppDelegate.swift*

func registerNotificationCategories() {
    *// Nudge category*
    let logAction = UNNotificationAction(
        identifier: "LOG_ACTION",
        title: "Log ✓",
        options: .foreground
    )
    let snoozeAction = UNNotificationAction(
        identifier: "SNOOZE_ACTION",
        title: "Snooze 1hr",
        options: []
    )
    let nudgeCategory = UNNotificationCategory(
        identifier: "NUDGE_CATEGORY",
        actions: [logAction, snoozeAction],
        intentIdentifiers: []
    )
    
    *// Check-in category*
    let zeroAction = UNNotificationAction(
        identifier: "ZERO_ACTION",
        title: "No beers 🎉",
        options: .foreground
    )
    let someAction = UNNotificationAction(
        identifier: "SOME_ACTION",
        title: "Had some",
        options: .foreground
    )
    let skipAction = UNNotificationAction(
        identifier: "SKIP_ACTION",
        title: "Skip",
        options: []
    )
    let checkInCategory = UNNotificationCategory(
        identifier: "CHECKIN_CATEGORY",
        actions: [zeroAction, someAction, skipAction],
        intentIdentifiers: []
    )
    
    UNUserNotificationCenter.current().setNotificationCategories([
        nudgeCategory,
        checkInCategory
    ])
}`

---

## Widget (WidgetKit)

### Widget Types

| Widget | Size | Content |
| --- | --- | --- |
| Small | 2×2 | Mic button only |
| Medium | 4×2 | Identity colors + mic button |

### Widget Implementation

swift

`*// BackmindWidget.swift*

struct BackmindWidget: Widget {
    let kind: String = "BackmindWidget"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            BackmindWidgetView(entry: entry)
        }
        .configurationDisplayName("Backmind")
        .description("Quick voice logging")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

struct BackmindWidgetView: View {
    var entry: Provider.Entry
    
    var body: some View {
        VStack {
            if entry.family == .systemMedium {
                HStack {
                    ForEach(entry.identities) { identity in
                        VStack {
                            Text(identity.icon)
                            Circle()
                                .fill(identity.healthColor.color)
                                .frame(width: 12, height: 12)
                        }
                    }
                }
            }
            
            Link(destination: URL(string: "backmind://record")!) {
                Image(systemName: "mic.fill")
                    .font(.largeTitle)
                    .foregroundColor(.white)
                    .padding()
                    .background(Circle().fill(Color.blue))
            }
        }
    }
}`

### App Groups (Data Sharing)

Widget needs access to identity data:

swift

`*// Shared container*
let sharedDefaults = UserDefaults(suiteName: "group.app.backmind")

*// Save identity summaries for widget*
func updateWidgetData() {
    let summaries = identities.map { identity in
        IdentitySummary(
            id: identity.id,
            name: identity.name,
            icon: identity.icon,
            healthColor: identity.healthColor
        )
    }
    let data = try? JSONEncoder().encode(summaries)
    sharedDefaults?.set(data, forKey: "identities")
    WidgetCenter.shared.reloadAllTimelines()
}`

---

## Siri Integration (App Intents)

### Shortcut Implementation

swift

`*// BackmindShortcuts.swift*

import AppIntents

struct StartRecordingIntent: AppIntent {
    static var title: LocalizedStringResource = "Log to Backmind"
    static var description = IntentDescription("Start voice logging in Backmind")
    static var openAppWhenRun: Bool = true
    
    func perform() async throws -> some IntentResult {
        *// App will open in recording mode*
        NotificationCenter.default.post(
            name: .startRecording,
            object: nil
        )
        return .result()
    }
}

struct BackmindShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: StartRecordingIntent(),
            phrases: [
                "Log to \(.applicationName)",
                "\(.applicationName)",
                "Tell \(.applicationName)"
            ],
            shortTitle: "Log",
            systemImageName: "mic.fill"
        )
    }
}
```

---

## Sync Strategy

### Sync Flow
```
┌─────────────────────────────────────────┐
│              iOS App                     │
│                                          │
│  ┌──────────────┐    ┌──────────────┐   │
│  │  SwiftData   │◀──▶│ SyncService  │   │
│  │  (Local)     │    │              │   │
│  └──────────────┘    └──────────────┘   │
│                            │             │
└────────────────────────────┼─────────────┘
                             │
                             ▼
┌─────────────────────────────────────────┐
│             Supabase                     │
│                                          │
│           Postgres (Source of Truth)     │
│                                          │
└─────────────────────────────────────────┘`

### Sync Rules

| Scenario | Behavior |
| --- | --- |
| Online | Write to local + sync to Supabase immediately |
| Offline | Write to local + queue for sync |
| Conflict | Server wins (last write wins) |
| App launch | Pull latest from server, merge with local |

### Offline Queue

swift

`class SyncService {
    func logBuildingBlock(blockId: UUID, transcript: String?) async {
        *// 1. Save locally*
        let log = BuildingBlockLog(
            buildingBlockId: blockId,
            transcript: transcript,
            createdAt: Date()
        )
        modelContext.insert(log)
        
        *// 2. Try to sync*
        do {
            try await syncToServer(log)
            log.syncedAt = Date()
        } catch {
            *// 3. Queue for later*
            let queueItem = OfflineQueueItem(
                type: .buildingBlockLog,
                payload: log.toJSON(),
                createdAt: Date()
            )
            modelContext.insert(queueItem)
        }
    }
    
    func processOfflineQueue() async {
        let pending = fetchPendingQueueItems()
        for item in pending {
            do {
                try await syncQueueItem(item)
                modelContext.delete(item)
            } catch {
                item.retryCount += 1
                if item.retryCount > 5 {
                    *// Mark as failed, notify user*
                }
            }
        }
    }
}`

---

## Security

### Authentication

| Layer | Protection |
| --- | --- |
| Sign in with Apple | Industry-standard OAuth |
| Supabase RLS | Row-level security on all tables |
| API keys | Stored in environment, never in client |
| APNs | Authenticated via Apple certificate |

### Row-Level Security (RLS)

sql

- `*- Users can only see their own data*
ALTER TABLE identities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own identities" ON identities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own identities" ON identities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own identities" ON identities FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own identities" ON identities FOR DELETE USING (auth.uid() = user_id);
*- Repeat for all user-owned tables*`

### API Key Management

| Key | Storage |
| --- | --- |
| Anthropic API key | Supabase secrets (env var) |
| APNs key | Supabase secrets |
| Supabase anon key | iOS app (public, safe) |
| Supabase service key | Edge functions only (never in client) |

---

## Performance Targets

| Metric | Target |
| --- | --- |
| Voice capture → confirmation | < 3 seconds |
| AI classification | < 2 seconds |
| App launch → dashboard | < 1 second |
| Widget tap → recording | < 0.5 seconds |
| Notification delivery | < 30 seconds of scheduled time |

---

## Implementation Priority

| Component | Priority | Notes |
| --- | --- | --- |
| SwiftData models | P0 | Foundation |
| Basic UI (dashboard, voice) | P0 | Core experience |
| Supabase schema | P0 | Backend foundation |
| Auth (Sign in with Apple) | P0 | Required for accounts |
| Voice capture + transcription | P0 | Core feature |
| AI classification edge function | P0 | Core feature |
| Basic sync | P0 | Data persistence |
| Push notifications | P0 | Nudges and check-ins |
| Widget | P0 | Key friction reduction |
| Siri shortcut | P1 | Nice to have |
| Offline queue | P1 | Reliability |
| Weekly summary generation | P1 | Retention feature |

---
<!-- Source: PRD/12-data-model.md -->

# Backmind PRD — Section 12: Data Model

---

## Overview

This section provides a comprehensive view of all data entities, their relationships, and data flow patterns. While Section 11 covered implementation details, this section focuses on the conceptual model.

---

## Entity Relationship Diagram

`┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    ┌──────────┐         ┌──────────────────┐         ┌──────────────┐      │
│    │   User   │────────▶│  User Settings   │         │   Weekly     │      │
│    │          │         │                  │         │   Summary    │      │
│    └──────────┘         └──────────────────┘         └──────────────┘      │
│         │                                                   ▲               │
│         │                                                   │               │
│         ▼                                                   │               │
│    ┌──────────┐                                            │               │
│    │ Identity │◀───────────────────────────────────────────┘               │
│    │          │                                                             │
│    └──────────┘                                                             │
│         │                                                                   │
│         │ 1:many                                                            │
│         ▼                                                                   │
│    ┌──────────────────┐              ┌──────────────┐                      │
│    │ Building Block   │              │  Guardrail   │                      │
│    │                  │              │              │◀──────────┐          │
│    └──────────────────┘              └──────────────┘           │          │
│         │                                   │                    │          │
│         │ 1:many                           │ 1:many             │          │
│         ▼                                   ▼                    │          │
│    ┌──────────┐                      ┌──────────────┐           │          │
│    │ Trigger  │                      │   Check-In   │           │          │
│    │          │                      │   Schedule   │           │          │
│    └──────────┘                      └──────────────┘           │          │
│         │                                   │                    │          │
│         │                                   │                    │          │
│         ▼                                   ▼                    │          │
│    ┌──────────────┐                  ┌──────────────┐           │          │
│    │  Scheduled   │                  │  Scheduled   │           │          │
│    │    Nudge     │                  │   Check-In   │           │          │
│    └──────────────┘                  └──────────────┘           │          │
│         │                                   │                    │          │
│         ▼                                   ▼                    │          │
│    ┌──────────────────┐              ┌──────────────┐           │          │
│    │ Building Block   │              │  Guardrail   │           │          │
│    │      Log         │              │     Log      │───────────┘          │
│    └──────────────────┘              └──────────────┘                      │
│                                                                             │
│                        ┌──────────────────┐                                │
│                        │  Offline Queue   │                                │
│                        │      Item        │                                │
│                        └──────────────────┘                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

LEGEND:
─────▶  One-to-many relationship
◀─────  Many-to-one relationship
◀────▶  Many-to-many relationship (via join table)`

---

## Relationship Details

### Identity ↔ Guardrail (Many-to-Many)

`┌──────────┐         ┌─────────────────────┐         ┌──────────────┐
│ Identity │◀───────▶│ guardrail_identities│◀───────▶│  Guardrail   │
│          │         │    (join table)     │         │              │
└──────────┘         └─────────────────────┘         └──────────────┘

Example:
- "≤5 beers/week" guardrail links to:
  - Athletic Man
  - Present Dad  
  - Successful Founder`

---

## Entity Definitions

### User

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| apple_user_id | String | Apple's unique identifier |
| email | String? | Optional, from Apple |
| created_at | DateTime | Account creation |
| updated_at | DateTime | Last modified |

**Relationships:**

- Has one: UserSettings
- Has many: Identities, BuildingBlocks, Guardrails, Logs, Summaries

---

### UserSettings

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| user_id | UUID | - | Foreign key to User |
| wake_time | Time | 07:00 | User's typical wake time |
| work_end_time | Time | 18:00 | When work typically ends |
| bedtime | Time | 22:30 | When user goes to bed |
| timezone | String | America/Los_Angeles | User's timezone |
| nudges_enabled | Boolean | true | Receive nudge notifications |
| checkins_enabled | Boolean | true | Receive check-in notifications |
| weekly_summary_enabled | Boolean | true | Receive weekly summary |
| summary_day | String | Sunday | Day to send summary |
| summary_time | Time | 19:00 | Time to send summary |
| previsualization_enabled | Boolean | true | Morning previsualization nudges (Feature 13) |
| check_in_cadence | Enum | monthly | Seasonal check-in frequency (Feature 12) |
| last_seasonal_check_in | DateTime? | - | When last seasonal check-in completed |
| weekly_summary_day | Int | 1 | Day of week (1=Sunday) for summary (Feature 14) |
| weekly_summary_hour | Int | 18 | Hour (0-23) for summary |
| device_token | String? | - | APNs push token |
| created_at | DateTime | - | Record creation |
| updated_at | DateTime | - | Last modified |

**Relationships:**

- Belongs to: User

---

### Identity

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| name | String | Identity name ("Athletic Man") |
| icon | String | Emoji icon |
| created_at | DateTime | Record creation |
| updated_at | DateTime | Last modified |

**Relationships:**

- Belongs to: User
- Has many: BuildingBlocks
- Has many: Guardrails (via join table)

**Computed Properties:**

- health_percentage: Average of all linked blocks/guardrails
- health_color: Derived from health_percentage

---

### BuildingBlock

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| identity_id | UUID? | Foreign key to Identity |
| text | String | Block description ("Exercise 4x/week") |
| frequency | Int | Target count (4) |
| frequency_period | Enum | daily, weekly |
| outcome | String? | WOOP: Visualized positive outcome from onboarding |
| obstacle | String? | WOOP: Internal obstacle from Failed Week Review |
| plan | String? | WOOP: If-then implementation intention |
| failed_week_review_at | DateTime? | When Failed Week Review was completed |
| consecutive_misses | Int | Count of consecutive missed scheduled triggers (Feature 05) |
| bad_day_version | String? | Minimum viable version for tough days (Feature 06) |
| conditions | String? | Prerequisites for success, e.g., "gym bag packed" (Feature 10) |
| learning_mode | Bool | If true, showing up = success (Feature 11) |
| learning_mode_end_date | DateTime? | When learning mode auto-expires |
| is_graduated | Bool | If true, moved to Graduated Habits (Feature 12) |
| graduated_at | DateTime? | When habit was graduated |
| created_at | DateTime | Record creation |
| updated_at | DateTime | Last modified |

**Relationships:**

- Belongs to: User, Identity
- Has many: Triggers, BuildingBlockLogs

**Computed Properties:**

- completed_this_period: Count of logs in current period
- progress_percentage: completed / frequency × 100
- is_complete: completed >= frequency

**WOOP Fields (Wish-Outcome-Obstacle-Plan):**

The WOOP fields implement Oettingen's mental contrasting research:

| Field | When Captured | Purpose |
| --- | --- | --- |
| outcome | Onboarding (Step 6b) | "What's the best thing about doing this consistently?" |
| obstacle | Failed Week Review | "What got in the way?" (internal feelings/thoughts) |
| plan | Failed Week Review | "If [obstacle], then I will [action]" |

These fields are used to enhance nudge notifications after a Failed Week Review.

---

### Trigger

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| building_block_id | UUID | Foreign key to BuildingBlock |
| day_of_week | Int | 1-7 (Monday-Sunday) |
| trigger_text | String | Context ("after dropping off Aurelia") |
| nudge_time | Time | When to send nudge |
| created_at | DateTime | Record creation |

**Relationships:**

- Belongs to: BuildingBlock

**Computed Properties:**

- nudge_text: Generated text for notification

---

### Guardrail

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| text | String | Guardrail description ("≤5 beers/week") |
| limit_count | Int | Maximum allowed (5) |
| period | Enum | daily, weekly |
| temptation_context | String? | When most tempted |
| why_statement | String? | Approach-framed reason |
| weeks_over_limit | Int | Consecutive weeks exceeding limit (Feature 08) |
| created_at | DateTime | Record creation |
| updated_at | DateTime | Last modified |

**Relationships:**

- Belongs to: User
- Has many: Identities (via join table)
- Has many: CheckIns, GuardrailLogs

**Computed Properties:**

- current_count: Sum of logs in current period
- remaining: limit_count - current_count
- is_over_limit: current_count > limit_count
- health_percentage: remaining / limit_count × 100

---

### GuardrailIdentity (Join Table)

| Field | Type | Description |
| --- | --- | --- |
| guardrail_id | UUID | Foreign key to Guardrail |
| identity_id | UUID | Foreign key to Identity |

**Composite Primary Key:** (guardrail_id, identity_id)

---

### CheckIn

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| guardrail_id | UUID | Foreign key to Guardrail |
| day_of_week | Int | 1-7 (Monday-Sunday) |
| opening_time | Time | Supportive reminder time |
| closing_time | Time | Ask for report time |
| created_at | DateTime | Record creation |

**Relationships:**

- Belongs to: Guardrail

---

### BuildingBlockLog

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| building_block_id | UUID | Foreign key to BuildingBlock |
| transcript | String? | Voice transcript (if voice logged) |
| confidence | Float? | AI match confidence |
| is_bad_day_version | Boolean | True if logged as bad day minimum (Feature 06) |
| created_at | DateTime | When logged |
| synced_at | DateTime? | When synced to server |

**Relationships:**

- Belongs to: User, BuildingBlock

---

### GuardrailLog

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| guardrail_id | UUID | Foreign key to Guardrail |
| count | Int | How many (e.g., 2 beers) |
| is_zero | Boolean | Was this a "zero" celebration |
| transcript | String? | Voice transcript (if voice logged) |
| created_at | DateTime | When logged |
| synced_at | DateTime? | When synced to server |

**Relationships:**

- Belongs to: User, Guardrail

---

### ScheduledNudge

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| building_block_id | UUID | Foreign key to BuildingBlock |
| trigger_id | UUID | Foreign key to Trigger |
| scheduled_for | DateTime | When to send |
| nudge_text | String | Notification body |
| status | Enum | pending, sent, cancelled |
| sent_at | DateTime? | When actually sent |

**Relationships:**

- Belongs to: User, BuildingBlock, Trigger

---

### ScheduledCheckIn

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| guardrail_id | UUID | Foreign key to Guardrail |
| check_in_id | UUID | Foreign key to CheckIn |
| type | Enum | opening, closing |
| scheduled_for | DateTime | When to send |
| check_in_text | String | Notification body |
| status | Enum | pending, sent, cancelled |
| sent_at | DateTime? | When actually sent |

**Relationships:**

- Belongs to: User, Guardrail, CheckIn

---

### WeeklySummary

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| week_start | Date | Start of week (Monday) |
| week_end | Date | End of week (Sunday) |
| summary_text | String | AI-generated summary |
| highlight_identity | String? | Best performing identity |
| needs_attention_identity | String? | Needs focus identity |
| suggested_action | String? | One actionable suggestion |
| identity_scores | JSON | { "Athletic Man": 85, ... } |
| created_at | DateTime | When generated |

**Relationships:**

- Belongs to: User

---

### OfflineQueueItem (⚠️ Deferred to v1.1)

> **Status:** This entity has been deferred to v1.1. The MVP uses an online-first approach where network connectivity is required for AI classification. Transcription still works offline (on-device), but logs are processed when online.

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| type | Enum | building_block_log, guardrail_log |
| payload | JSON | Serialized log data |
| created_at | DateTime | When queued |
| retry_count | Int | Number of sync attempts |

**Note:** Local only, not synced to server. **Not implemented in v1.0.**

---

### Reflection (Added in Implementation)

> **Note:** This entity was added during implementation to support richer AI context for nudge generation and weekly summaries. Stores user responses to reflection questions.

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| block_id | UUID? | Foreign key to BuildingBlock (optional) |
| log_id | UUID? | Foreign key to BuildingBlockLog (optional) |
| question | String | The reflection question asked |
| response | String | User's response |
| emotion_tag | String? | Optional emotion context (Feature 15) |
| created_at | DateTime | When created |

**Relationships:**

- Belongs to: User
- Optionally belongs to: BuildingBlock, BuildingBlockLog

**Purpose:** Enables AI to generate more personalized nudges and summaries by understanding user's feelings and context around their habits.

---

### NudgeHistory (Feature 09)

Tracks recently shown nudges to prevent repetition.

| Field | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to User |
| block_id | UUID | Foreign key to BuildingBlock |
| nudge_text | String | The nudge message that was shown |
| nudge_type | Enum | getting_started, previsualization, recovery, etc. |
| shown_at | DateTime | When the nudge was displayed |

**Purpose:** Enables the nudge variety system to avoid repeating the same message within 5-7 nudges.

**Relationships:**

- Belongs to: User, BuildingBlock

---

## Data Flow Diagrams

### Voice Logging Flow

`┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. User speaks        2. Transcribe       3. Send to AI       │
│  ┌──────────┐          ┌──────────┐        ┌──────────┐        │
│  │  "I ran  │────────▶ │  Apple   │───────▶│ Supabase │        │
│  │  today"  │          │  Speech  │        │ Edge Fn  │        │
│  └──────────┘          └──────────┘        └──────────┘        │
│                              │                    │             │
│                              │                    ▼             │
│                              │             ┌──────────┐        │
│                              │             │  Claude  │        │
│                              │             │  Haiku   │        │
│                              │             └──────────┘        │
│                              │                    │             │
│                              │                    ▼             │
│                              │             ┌──────────┐        │
│                              │             │  Match:  │        │
│                              │             │Exercise  │        │
│                              │             │ 4x/week  │        │
│                              │             └──────────┘        │
│                              │                    │             │
│  6. Update UI          5. Save locally     4. Return match     │
│  ┌──────────┐          ┌──────────┐        ┌──────────┐        │
│  │  ✓ Got   │◀──────── │SwiftData │◀───────│  {match: │        │
│  │   it!    │          │          │        │  true}   │        │
│  └──────────┘          └──────────┘        └──────────┘        │
│                              │                                  │
│                              │ 7. Sync                         │
│                              ▼                                  │
│                        ┌──────────┐                            │
│                        │ Supabase │                            │
│                        │ Postgres │                            │
│                        └──────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘`

---

### Nudge Scheduling Flow

`┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  DAILY (e.g., 3am UTC)                                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Supabase Cron Job                         │  │
│  │                                                           │  │
│  │  1. For each user:                                        │  │
│  │     - Get timezone                                        │  │
│  │     - Calculate today's day_of_week                       │  │
│  │     - Query triggers for today                            │  │
│  │                                                           │  │
│  │  2. For each trigger:                                     │  │
│  │     - Calculate scheduled_for (day + nudge_time + tz)     │  │
│  │     - Generate nudge_text                                 │  │
│  │     - Insert into scheduled_nudges                        │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   scheduled_nudges                        │  │
│  │                                                           │  │
│  │  id: abc123                                               │  │
│  │  user_id: user_001                                        │  │
│  │  building_block_id: bb_001                                │  │
│  │  scheduled_for: 2024-12-17T09:00:00+08:00                │  │
│  │  nudge_text: "It's Tuesday after drop-off. Gym time?"    │  │
│  │  status: pending                                          │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  EVERY MINUTE                                                   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Supabase Cron Job                         │  │
│  │                                                           │  │
│  │  1. Query scheduled_nudges WHERE:                         │  │
│  │     - status = 'pending'                                  │  │
│  │     - scheduled_for <= NOW()                              │  │
│  │                                                           │  │
│  │  2. For each nudge:                                       │  │
│  │     - Get user's device_token                             │  │
│  │     - Send APNs notification                              │  │
│  │     - Update status = 'sent', sent_at = NOW()            │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│                        ┌──────────┐                            │
│                        │   APNs   │                            │
│                        └──────────┘                            │
│                              │                                  │
│                              ▼                                  │
│                        ┌──────────┐                            │
│                        │  iPhone  │                            │
│                        │  User    │                            │
│                        └──────────┘                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘`

---

### Weekly Summary Flow

`┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  WEEKLY (Sunday 7pm per user's timezone)                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Supabase Cron Job                         │  │
│  │                                                           │  │
│  │  1. Query users WHERE:                                    │  │
│  │     - weekly_summary_enabled = true                       │  │
│  │     - current_time in timezone = summary_time             │  │
│  │     - current_day = summary_day                           │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              For Each User: Aggregate Data                │  │
│  │                                                           │  │
│  │  identities: [                                            │  │
│  │    {                                                      │  │
│  │      name: "Athletic Man",                                │  │
│  │      building_blocks: [                                   │  │
│  │        { text: "Exercise 4x/week", completed: 3, target: 4 },│
│  │        { text: "Stretch daily", completed: 6, target: 7 } │  │
│  │      ],                                                   │  │
│  │      guardrails: [                                        │  │
│  │        { text: "≤5 beers/week", current: 3, limit: 5 }   │  │
│  │      ]                                                    │  │
│  │    },                                                     │  │
│  │    ...                                                    │  │
│  │  ]                                                        │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     Claude Haiku                          │  │
│  │                                                           │  │
│  │  Input: Aggregated week data + prompt                     │  │
│  │  Output: {                                                │  │
│  │    summary_text: "You crushed it...",                    │  │
│  │    highlight_identity: "Athletic Man",                    │  │
│  │    needs_attention_identity: "Present Dad",               │  │
│  │    suggested_action: "Plan something with Aurelia"        │  │
│  │  }                                                        │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Save & Notify                          │  │
│  │                                                           │  │
│  │  1. INSERT into weekly_summaries                          │  │
│  │  2. Send push notification: "Your week in review"         │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘`

---

### Offline Sync Flow

`┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  OFFLINE: User logs while disconnected                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      iOS App                              │  │
│  │                                                           │  │
│  │  1. User logs "I ran today"                               │  │
│  │  2. Transcription works (on-device)                       │  │
│  │  3. API call fails (no network)                           │  │
│  │  4. Save to OfflineQueueItem:                             │  │
│  │     {                                                     │  │
│  │       type: "building_block_log",                         │  │
│  │       payload: { transcript: "I ran today", ... },        │  │
│  │       created_at: "2024-12-17T09:00:00Z",                │  │
│  │       retry_count: 0                                      │  │
│  │     }                                                     │  │
│  │  5. Show user: "Saved offline. Will sync later."         │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  BACK ONLINE: Process queue                                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      iOS App                              │  │
│  │                                                           │  │
│  │  1. Network reachability detected                         │  │
│  │  2. Query OfflineQueueItems (oldest first)                │  │
│  │  3. For each item:                                        │  │
│  │     a. Call classify-log API                              │  │
│  │     b. If success:                                        │  │
│  │        - Save BuildingBlockLog with synced_at             │  │
│  │        - Delete OfflineQueueItem                          │  │
│  │     c. If failure:                                        │  │
│  │        - Increment retry_count                            │  │
│  │        - If retry_count > 5, mark as failed               │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘`

---

## Computed Properties & Business Logic

### Identity Health Calculation

swift

`extension Identity {
    var healthPercentage: Double {
        var scores: [Double] = []
        
        *// Building blocks*
        for block in buildingBlocks {
            let completed = Double(block.completedThisPeriod)
            let target = Double(block.frequency)
            scores.append(min(completed / target, 1.0) * 100)
        }
        
        *// Guardrails*
        for guardrail in guardrails {
            let current = Double(guardrail.currentCount)
            let limit = Double(guardrail.limitCount)
            let remaining = max(limit - current, 0)
            scores.append((remaining / limit) * 100)
        }
        
        guard !scores.isEmpty else { return 0 }
        return scores.reduce(0, +) / Double(scores.count)
    }
    
    var healthColor: HealthColor {
        switch healthPercentage {
        case 70...100: return .green
        case 50..<70:  return .yellow
        case 30..<50:  return .orange
        case 0..<30:   return .red
        default:       return .empty
        }
    }
}`

### Building Block Period Calculation

swift

`extension BuildingBlock {
    var completedThisPeriod: Int {
        let calendar = Calendar.current
        let now = Date()
        
        let periodStart: Date
        switch frequencyPeriod {
        case .daily:
            periodStart = calendar.startOfDay(for: now)
        case .weekly:
            periodStart = calendar.date(from: calendar.dateComponents(
                [.yearForWeekOfYear, .weekOfYear], 
                from: now
            ))!
        }
        
        return logs.filter { $0.createdAt >= periodStart }.count
    }
    
    var progressString: String {
        "\(completedThisPeriod)/\(frequency)"
    }
    
    var isComplete: Bool {
        completedThisPeriod >= frequency
    }
}`

### Guardrail Period Calculation

swift

`extension Guardrail {
    var currentCount: Int {
        let calendar = Calendar.current
        let now = Date()
        
        let periodStart: Date
        switch period {
        case .daily:
            periodStart = calendar.startOfDay(for: now)
        case .weekly:
            periodStart = calendar.date(from: calendar.dateComponents(
                [.yearForWeekOfYear, .weekOfYear], 
                from: now
            ))!
        }
        
        return logs
            .filter { $0.createdAt >= periodStart }
            .reduce(0) { $0 + $1.count }
    }
    
    var remaining: Int {
        max(limitCount - currentCount, 0)
    }
    
    var isOverLimit: Bool {
        currentCount > limitCount
    }
    
    var progressString: String {
        "\(currentCount)/\(limitCount)"
    }
}`

---

## Data Validation Rules

### Identity

| Field | Validation |
| --- | --- |
| name | Required, 1-50 characters |
| icon | Required, valid emoji |

### Building Block

| Field | Validation |
| --- | --- |
| text | Required, 1-100 characters |
| frequency | Required, 1-30 |
| frequency_period | Required, enum value |
| identity_id | Optional (can be unassigned) |
| outcome | Optional, max 500 characters |
| obstacle | Optional, max 500 characters |
| plan | Optional, max 500 characters |

### Trigger

| Field | Validation |
| --- | --- |
| day_of_week | Required, 1-7 |
| trigger_text | Required, 1-200 characters |
| nudge_time | Required, valid time |

### Guardrail

| Field | Validation |
| --- | --- |
| text | Required, 1-100 characters |
| limit_count | Required, 1-100 |
| period | Required, enum value |
| temptation_context | Optional, max 200 characters |
| why_statement | Optional, max 500 characters |
| identities | At least one required |

### CheckIn

| Field | Validation |
| --- | --- |
| day_of_week | Required, 1-7 |
| opening_time | Required, valid time |
| closing_time | Required, valid time, after opening_time |

---

## Data Limits

| Entity | Limit | Rationale |
| --- | --- | --- |
| Identities per user | 5 max | Cognitive load research |
| Building blocks per identity | 5 max (soft 3) | Goal dilution research |
| Building blocks per user | 15 max | Prevent overwhelm |
| Guardrails per user | 3 max (soft 2) | Willpower depletion |
| Triggers per building block | 7 max | One per day max |
| Check-ins per guardrail | 7 max | One per day max |

---

## Data Retention

| Data Type | Retention |
| --- | --- |
| User account | Until deleted |
| Identities | Until deleted |
| Building blocks | Until deleted |
| Guardrails | Until deleted |
| Logs | Indefinite (for historical trends) |
| Weekly summaries | Indefinite |
| Scheduled nudges | 7 days after sent |
| Offline queue items | Until synced or failed |

---

## Data Export Format

When user exports their data:

json

`{
  "exported_at": "2024-12-17T10:00:00Z",
  "user": {
    "id": "uuid",
    "email": "darian@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "settings": {
    "wake_time": "07:00",
    "work_end_time": "18:00",
    "bedtime": "22:30",
    "timezone": "Asia/Taipei"
  },
  "identities": [
    {
      "id": "uuid",
      "name": "Athletic Man",
      "icon": "🏃",
      "building_blocks": [
        {
          "id": "uuid",
          "text": "Exercise 4x/week",
          "frequency": 4,
          "frequency_period": "weekly",
          "outcome": "I feel strong and confident, with energy to play with Aurelia",
          "obstacle": "I was too tired after teaching",
          "plan": "When I feel too tired, I'll put on my shoes and just do 10 minutes",
          "failed_week_review_at": "2024-12-10T15:30:00Z",
          "triggers": [
            {
              "day_of_week": 2,
              "trigger_text": "After dropping off Aurelia",
              "nudge_time": "09:00"
            }
          ],
          "logs": [
            {
              "created_at": "2024-12-17T09:15:00Z",
              "transcript": "I went running this morning"
            }
          ]
        }
      ],
      "guardrails": [
        {
          "id": "uuid",
          "text": "≤5 beers/week",
          "limit_count": 5,
          "why_statement": "Clear mornings for workouts and Aurelia",
          "logs": [
            {
              "created_at": "2024-12-13T22:00:00Z",
              "count": 2
            }
          ]
        }
      ]
    }
  ],
  "weekly_summaries": [
    {
      "week_start": "2024-12-09",
      "week_end": "2024-12-15",
      "summary_text": "You crushed it as an athlete..."
    }
  ]
}`

---

## Summary

| Entity | Count (typical user) | Relationships |
| --- | --- | --- |
| User | 1 | Root entity |
| UserSettings | 1 | 1:1 with User |
| Identities | 2-3 | Belongs to User |
| Building Blocks | 6-9 | Belongs to User, Identity |
| Triggers | 12-20 | Belongs to BuildingBlock |
| Guardrails | 1-2 | Belongs to User, many Identities |
| CheckIns | 2-4 | Belongs to Guardrail |
| BuildingBlockLogs | ~30/week | Belongs to User, BuildingBlock |
| GuardrailLogs | ~5/week | Belongs to User, Guardrail |
| WeeklySummaries | 1/week | Belongs to User |
| NudgeHistory | ~20/week | Belongs to User, BuildingBlock |

---

## New MVP Feature Fields Summary

| Entity | New Field | Feature | Description |
|--------|-----------|---------|-------------|
| BuildingBlock | consecutive_misses | 05 Never Miss Twice | Track missed triggers for recovery nudges |
| BuildingBlock | bad_day_version | 06 Bad Day Mode | Minimum version for tough days |
| BuildingBlock | conditions | 10 Conditions | Prerequisites for success |
| BuildingBlock | learning_mode | 11 Learning Mode | Showing up = success mode |
| BuildingBlock | learning_mode_end_date | 11 Learning Mode | Auto-expiry date |
| BuildingBlock | is_graduated | 12 Seasonal Check-ins | Moved to graduated habits |
| BuildingBlock | graduated_at | 12 Seasonal Check-ins | When graduated |
| BuildingBlockLog | is_bad_day_version | 06 Bad Day Mode | Track bad day completions |
| Guardrail | weeks_over_limit | 08 Slip & Continue | Trigger WOOP escalation |
| UserSettings | previsualization_enabled | 13 Previsualization | Morning visualization nudges |
| UserSettings | check_in_cadence | 12 Seasonal Check-ins | Monthly or quarterly |
| UserSettings | last_seasonal_check_in | 12 Seasonal Check-ins | Last review date |
| UserSettings | weekly_summary_day | 14 Consistency Copy | Configurable summary day |
| UserSettings | weekly_summary_hour | 14 Consistency Copy | Configurable summary time |

---
<!-- Source: PRD/13-error-handling-offline.md -->

# Backmind PRD — Section 13: Error Handling & Offline

---

## Overview

Backmind must handle errors gracefully and work reliably offline. Users logging voice notes while driving, walking, or in areas with poor connectivity need confidence their data won't be lost.

**Principles:**

1. Never lose user data
2. Clear, actionable error messages
3. Graceful degradation (offline mode)
4. Silent recovery when possible

> **⚠️ MVP Note (v1.0):** The offline queue feature (OfflineQueueItem) has been deferred to v1.1. The MVP uses an **online-first approach**:
> - Voice transcription works offline (on-device Apple Speech)
> - AI classification requires network connectivity
> - Users see a clear message when offline: "Connect to internet to log"
> - Data already on device (dashboard, identities, progress) remains viewable offline

---

## Error Categories

| Category | Examples | Severity |
| --- | --- | --- |
| **Network** | No connection, timeout, server error | Medium |
| **Transcription** | Couldn't hear, background noise | Low |
| **AI Classification** | API failure, invalid response | Medium |
| **Auth** | Token expired, sign-in failed | High |
| **Data** | Sync conflict, corrupt data | High |
| **System** | Notification permission denied, storage full | Medium |

---

## Network Errors

### No Connection (Offline)

**Detection:** Network reachability monitor

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│              ⏳                         │
│                                         │
│         Got it.                         │
│                                         │
│         "I went running"                │
│                                         │
│         Saved offline. Will process     │
│         when you're back online.        │
│                                         │
│              [Done]                     │
│                                         │
└─────────────────────────────────────────┘`

**Behind the scenes:**

1. Transcription completes (on-device)
2. Save to OfflineQueueItem
3. Show confirmation
4. Process queue when online

**Dashboard indicator:**

`┌─────────────────────────────────────────┐
│                                         │
│  📴 Offline · 2 logs pending            │
│                                         │
│  YOUR IDENTITIES                        │
│  ...                                    │
│                                         │
└─────────────────────────────────────────┘`

---

### Request Timeout

**Detection:** API call exceeds 10 seconds

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│              ⏳                         │
│                                         │
│         Taking longer than usual.       │
│                                         │
│         I'll save this and process      │
│         it when connection improves.    │
│                                         │
│              [OK]                       │
│                                         │
└─────────────────────────────────────────┘`

**Behind the scenes:**

1. Cancel request
2. Queue for retry
3. Retry with exponential backoff

---

### Server Error (5xx)

**Detection:** HTTP 500, 502, 503, etc.

**User Experience:** Same as timeout—queue and retry silently.

**Retry strategy:**

| Attempt | Delay |
| --- | --- |
| 1 | Immediate |
| 2 | 5 seconds |
| 3 | 30 seconds |
| 4 | 2 minutes |
| 5 | 10 minutes |
| 6+ | Stop, mark as failed |

---

### Permanent Failure (After Retries)

If item fails after 5+ retries:

`┌─────────────────────────────────────────┐
│                                         │
│  ⚠️ 1 log couldn't be processed         │
│                                         │
│  "I went running" from Dec 17           │
│                                         │
│  [Retry]    [Log Manually]    [Dismiss] │
│                                         │
└─────────────────────────────────────────┘`

**Options:**

- **Retry:** Try classification again
- **Log Manually:** Show list of building blocks to pick
- **Dismiss:** Delete the failed item (data loss, but user's choice)

---

## Transcription Errors

### Couldn't Hear / No Audio

**Detection:** Apple Speech returns empty or very short transcript

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│               ⚠                         │
│                                         │
│         Couldn't hear that.             │
│                                         │
│         Make sure you're in a quiet     │
│         place and try again.            │
│                                         │
│   [Try again]        [Log manually]     │
│                                         │
└─────────────────────────────────────────┘`

---

### Microphone Permission Denied

**Detection:** AVAudioSession authorization status

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│               🎤                        │
│                                         │
│         Microphone access needed        │
│                                         │
│         Backmind needs microphone       │
│         access for voice logging.       │
│                                         │
│         [Open Settings]    [Cancel]     │
│                                         │
└─────────────────────────────────────────┘`

**"Open Settings"** deep-links to app's settings page.

---

### Speech Recognition Unavailable

**Detection:** SFSpeechRecognizer.isAvailable == false

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│               ⚠                         │
│                                         │
│         Speech recognition              │
│         unavailable                     │
│                                         │
│         Your device's speech            │
│         recognition is temporarily      │
│         unavailable. Try again in a     │
│         few minutes.                    │
│                                         │
│   [Try again]        [Log manually]     │
│                                         │
└─────────────────────────────────────────┘`

---

## AI Classification Errors

### API Call Failed

**Detection:** HTTP error or malformed response

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│               ⚠                         │
│                                         │
│         Something went wrong.           │
│                                         │
│         I heard: "I went running"       │
│                                         │
│         Want to try again or log        │
│         manually?                       │
│                                         │
│   [Try again]        [Log manually]     │
│                                         │
└─────────────────────────────────────────┘`

---

### No Match Found

**Detection:** AI returns match_type: "no_match"

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│               ?                         │
│                                         │
│         I heard:                        │
│         "I cleaned the garage"          │
│                                         │
│         I couldn't match this to        │
│         any of your building blocks     │
│         or guardrails.                  │
│                                         │
│         What would you like to do?      │
│                                         │
│   [Try again]    [Log manually]         │
│                                         │
│   [Dismiss]                             │
│                                         │
└─────────────────────────────────────────┘`

---

### Low Confidence Match

**Detection:** AI confidence < 0.7

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│               ?                         │
│                                         │
│         I heard:                        │
│         "I did some cardio"             │
│                                         │
│         Did you mean:                   │
│         Exercise 4x/week?               │
│                                         │
│   [Yes, log it]    [No, that's wrong]   │
│                                         │
└─────────────────────────────────────────┘`

---

### Invalid AI Response

**Detection:** JSON parse error or missing required fields

**Behind the scenes:**

1. Log error for debugging
2. Retry once with same input
3. If still fails, show generic error + manual fallback

---

## Auth Errors

### Token Expired

**Detection:** HTTP 401 from Supabase

**Behind the scenes:**

1. Attempt token refresh silently
2. If refresh succeeds, retry original request
3. If refresh fails, prompt re-authentication

**User Experience (if refresh fails):**

`┌─────────────────────────────────────────┐
│                                         │
│         Session expired                 │
│                                         │
│         Please sign in again to         │
│         continue.                       │
│                                         │
│         [ Sign in with Apple]           │
│                                         │
└─────────────────────────────────────────┘`

---

### Sign In Failed

**Detection:** Apple Sign In error

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│               ⚠                         │
│                                         │
│         Couldn't sign in                │
│                                         │
│         Something went wrong with       │
│         Apple Sign In. Please try       │
│         again.                          │
│                                         │
│         [Try again]        [Cancel]     │
│                                         │
└─────────────────────────────────────────┘`

---

## Data Errors

### Sync Conflict

**Scenario:** User edits identity on phone A while offline, then edits same identity on phone B.

**Resolution:** Last-write-wins (server timestamp)

**User Experience:** Silent. No user notification. Server version wins.

**Future consideration:** Could show "synced from another device" indicator, but adds complexity.

---

### Corrupt Local Data

**Detection:** SwiftData throws error on read

**Recovery:**

1. Log error
2. Attempt to recover from Supabase
3. If recovery succeeds, rebuild local cache
4. If recovery fails, show error

**User Experience (if unrecoverable):**

`┌─────────────────────────────────────────┐
│                                         │
│               ⚠                         │
│                                         │
│         Something went wrong            │
│                                         │
│         Your local data couldn't be     │
│         loaded. Trying to restore       │
│         from backup...                  │
│                                         │
│         [Restore from Cloud]            │
│                                         │
└─────────────────────────────────────────┘`

---

### Storage Full

**Detection:** SwiftData write fails with disk space error

**User Experience:**

`┌─────────────────────────────────────────┐
│                                         │
│               ⚠                         │
│                                         │
│         Storage full                    │
│                                         │
│         Your device is low on storage.  │
│         Free up some space to           │
│         continue logging.               │
│                                         │
│         [Open Storage Settings]         │
│                                         │
└─────────────────────────────────────────┘`

---

## System Errors

### Notification Permission Denied

**Detection:** UNAuthorizationStatus.denied

**User Experience (on relevant screen):**

`┌─────────────────────────────────────────┐
│                                         │
│         Notifications disabled          │
│                                         │
│         Backmind can't send you         │
│         nudges or check-ins without     │
│         notification permission.        │
│                                         │
│         Without notifications, you'll   │
│         need to remember to check in    │
│         yourself.                       │
│                                         │
│         [Enable in Settings]  [Skip]    │
│                                         │
└─────────────────────────────────────────┘`

---

### Background Refresh Disabled

**Detection:** UIApplication.shared.backgroundRefreshStatus

**User Experience (in settings):**

`┌─────────────────────────────────────────┐
│                                         │
│  ⚠ Background refresh disabled          │
│                                         │
│  Enable background refresh for          │
│  reliable notifications.                │
│                                         │
│  [Open Settings]                        │
│                                         │
└─────────────────────────────────────────┘`

---

## Offline Mode Details

### What Works Offline

| Feature | Offline Support |
| --- | --- |
| View dashboard | ✅ (cached data) |
| View identities/blocks/guardrails | ✅ (cached) |
| Voice transcription | ✅ (on-device) |
| AI classification | ❌ (queued) |
| Manual logging | ✅ (queued for sync) |
| Edit settings | ✅ (synced later) |
| View weekly summary | ✅ (if cached) |
| Receive notifications | ❌ (requires server) |

---

### Offline Queue Management

swift

`class OfflineQueueManager {
    
    *// Add item to queue*
    func enqueue(_ item: OfflineQueueItem) {
        modelContext.insert(item)
        try? modelContext.save()
        updatePendingBadge()
    }
    
    *// Process queue when online*
    func processQueue() async {
        let pending = fetchPendingItems()
        
        for item in pending {
            do {
                try await processItem(item)
                modelContext.delete(item)
            } catch {
                item.retryCount += 1
                item.lastError = error.localizedDescription
                
                if item.retryCount >= 5 {
                    item.status = .failed
                    notifyUserOfFailure(item)
                }
            }
        }
        
        try? modelContext.save()
        updatePendingBadge()
    }
    
    *// Process single item*
    private func processItem(_ item: OfflineQueueItem) async throws {
        switch item.type {
        case .voiceLog:
            let result = try await aiService.classify(
                transcript: item.transcript,
                userId: item.userId
            )
            try await saveLog(result, item: item)
            
        case .manualLog:
            try await syncService.syncLog(item.payload)
            
        case .settingsUpdate:
            try await syncService.syncSettings(item.payload)
        }
    }
}
```

---

### Queue Status UI

**Dashboard banner (when pending):**
```
┌─────────────────────────────────────────┐
│  📴 Offline · 3 logs pending            │
└─────────────────────────────────────────┘
```

**Dashboard banner (when syncing):**
```
┌─────────────────────────────────────────┐
│  ↻ Syncing 3 logs...                    │
└─────────────────────────────────────────┘
```

**Dashboard banner (when synced):**
```
┌─────────────────────────────────────────┐
│  ✓ All synced                           │
└─────────────────────────────────────────┘
```

(Disappears after 3 seconds)

---

### Offline Data Freshness

**Problem:** Dashboard shows stale data when offline for extended periods.

**Solution:** Show last sync time:
```
┌─────────────────────────────────────────┐
│                                         │
│  📴 Offline                             │
│  Last synced: 2 hours ago               │
│                                         │
│  YOUR IDENTITIES                        │
│  ...                                    │
│                                         │
└─────────────────────────────────────────┘`

---

## Error Logging & Monitoring

### What We Log

| Event | Data Logged |
| --- | --- |
| API error | Endpoint, status code, error message, timestamp |
| Transcription failure | Duration, audio level, error type |
| AI classification | Input length, response time, confidence, match type |
| Sync failure | Item type, retry count, error |
| Crash | Stack trace, device info, app state |

### What We Don't Log

| Data | Reason |
| --- | --- |
| Voice recordings | Privacy |
| Transcription text | Privacy |
| Identity/goal names | Privacy |
| User email | Privacy |

---

### Error Reporting Service

Use Sentry or similar:

swift

`*// In AppDelegate*
SentrySDK.start { options in
    options.dsn = "https://..."
    options.environment = isProduction ? "production" : "development"
    options.enableAutoSessionTracking = true
    options.attachStacktrace = true
    
    *// Don't send PII*
    options.beforeSend = { event in
        event.user = nil
        return event
    }
}

*// On error*
func reportError(_ error: Error, context: [String: Any]) {
    SentrySDK.capture(error: error) { scope in
        scope.setContext(value: context, key: "backmind")
        scope.setTag(value: "voice_logging", forKey: "feature")
    }
}`

---

## Recovery Strategies

### Strategy 1: Automatic Retry

**For:** Network errors, server errors, timeouts

**Implementation:**

- Exponential backoff: 0s, 5s, 30s, 2m, 10m
- Max 5 retries
- Silent recovery (no user notification unless all fail)

---

### Strategy 2: User Intervention

**For:** No match, low confidence, transcription failure

**Implementation:**

- Show clear error message
- Offer alternatives (retry, manual, dismiss)
- Never force user to take action

---

### Strategy 3: Graceful Degradation

**For:** Offline mode, permission denied

**Implementation:**

- Core features continue working
- Queue changes for later sync
- Clear indicator of degraded state

---

### Strategy 4: Fresh Start

**For:** Corrupt data, unrecoverable errors

**Implementation:**

- Last resort
- Attempt cloud restore first
- Clear local data only with user confirmation

---

## Error Message Guidelines

### Do

- Be specific about what went wrong
- Offer clear actions
- Use simple language
- Maintain warm tone

### Don't

- Show technical details to users
- Blame the user
- Leave user stuck with no options
- Use alarming language

### Examples

| Bad | Good |
| --- | --- |
| "Error 500: Internal Server Error" | "Something went wrong. We'll try again automatically." |
| "Network request failed" | "No internet connection. Saved offline." |
| "Invalid JSON response" | "Couldn't process that. Want to try again?" |
| "Authentication failed" | "Please sign in again to continue." |
| "Fatal error occurred" | "Something unexpected happened. Restarting..." |

---

## Testing Error Scenarios

### Manual Testing Checklist

| Scenario | How to Test |
| --- | --- |
| Offline logging | Enable airplane mode, log voice |
| Network timeout | Use Network Link Conditioner |
| No match | Say something unrelated to any goal |
| Low confidence | Say something ambiguous |
| Transcription fail | Cover mic, whisper, background noise |
| Server error | Temporarily break edge function |
| Token expired | Manually invalidate token |
| Storage full | Fill device storage |

### Automated Testing

swift

`class ErrorHandlingTests: XCTestCase {
    
    func testOfflineQueueing() async {
        *// Given: No network*
        networkMonitor.simulateOffline()
        
        *// When: User logs*
        await voiceService.log(transcript: "I went running")
        
        *// Then: Item queued*
        XCTAssertEqual(offlineQueue.pendingCount, 1)
    }
    
    func testRetryOnServerError() async {
        *// Given: Server returns 500*
        mockServer.setResponse(.serverError)
        
        *// When: Process queue*
        await offlineQueue.processQueue()
        
        *// Then: Item still pending with incremented retry*
        XCTAssertEqual(offlineQueue.items.first?.retryCount, 1)
    }
    
    func testFailAfterMaxRetries() async {
        *// Given: Item with 5 retries*
        let item = OfflineQueueItem(retryCount: 5)
        
        *// When: Process fails again*
        await offlineQueue.processItem(item)
        
        *// Then: Marked as failed*
        XCTAssertEqual(item.status, .failed)
    }
}`

---

## Summary

| Error Type | User Impact | Recovery |
| --- | --- | --- |
| Network offline | Low | Queue + auto-retry |
| Network timeout | Low | Queue + auto-retry |
| Server error | Low | Queue + auto-retry |
| Transcription fail | Low | Retry or manual |
| No AI match | Low | Manual selection |
| Low confidence | Low | Confirm or manual |
| AI API error | Medium | Retry or manual |
| Auth expired | Medium | Re-authenticate |
| Sync conflict | None | Server wins (silent) |
| Corrupt data | High | Cloud restore |
| Storage full | High | User clears space |

---

## Implementation Priority

| Feature | Priority |
| --- | --- |
| Offline queue | P0 |
| Network error handling | P0 |
| Transcription error handling | P0 |
| AI error handling | P0 |
| Retry with backoff | P0 |
| Pending indicator | P0 |
| Manual fallback | P0 |
| Auth refresh | P1 |
| Error logging (Sentry) | P1 |
| Cloud restore | P2 |

---
<!-- Source: PRD/14-success-metrics.md -->

# Backmind PRD — Section 14: Success Metrics

---

## Overview

Backmind's success is measured by whether users actually change their behavior—not just whether they use the app. Metrics focus on engagement, retention, and real-world follow-through.

**Core hypothesis:** Voice logging + proactive nudges + AI-guided setup = higher habit follow-through than traditional trackers.

---

## Primary Success Metrics

### 1. Retention

| Metric | Target | Why It Matters |
| --- | --- | --- |
| Day 1 retention | >70% | Did onboarding work? |
| Day 7 retention | >50% | Did core loop engage them? |
| Day 30 retention | >30% | Is this a lasting habit? |
| Day 90 retention | >20% | Long-term stickiness |

**Industry benchmarks (habit apps):**

- Day 1: 25-40%
- Day 7: 15-25%
- Day 30: 5-10%

**Our targets are aggressive** because we believe the proactive system creates stickier engagement.

**Calculation:**

`Day N retention = (Users active on day N) / (Users who signed up N days ago) × 100`

**"Active"** = Logged at least one building block or guardrail event OR responded to a check-in.

---

### 2. Engagement (Weekly Active)

| Metric | Target | Why It Matters |
| --- | --- | --- |
| WAU/MAU ratio | >50% | Are monthly users using it weekly? |
| Logs per active user per week | ≥3 | Are they actually logging? |
| Check-in response rate | >50% | Are nudges/check-ins working? |

**Calculation:**

`WAU/MAU = (Users active this week) / (Users active this month) × 100`

---

### 3. Core Loop Completion

| Metric | Target | Why It Matters |
| --- | --- | --- |
| Onboarding completion rate | >80% | Is setup too long/complex? |
| First log within 24 hours | >60% | Did they start using it? |
| First week summary opened | >70% | Are summaries engaging? |

---

## Secondary Success Metrics

### 4. Feature Adoption

| Feature | Target Adoption | Notes |
| --- | --- | --- |
| Voice logging (vs manual) | >60% | Is voice preferred? |
| Widget usage | >30% of logs | Is widget reducing friction? |
| Siri usage | >10% of logs | Is Siri shortcut useful? |
| Notification actions (quick log) | >40% | Are notification actions working? |

---

### 5. Nudge & Check-in Effectiveness

| Metric | Target | Why It Matters |
| --- | --- | --- |
| Nudge → Log conversion | >30% | Do nudges drive action? |
| Check-in response rate | >50% | Are users engaging with check-ins? |
| Zero celebration rate | >20% of check-in responses | Are users logging wins? |
| Snooze rate | <20% | Are nudges well-timed? |

**Calculation:**

`Nudge → Log conversion = (Logs within 2 hours of nudge) / (Nudges sent) × 100`

---

### 6. AI Quality

| Metric | Target | Why It Matters |
| --- | --- | --- |
| Classification accuracy | >90% | Is AI matching correctly? |
| High-confidence matches | >70% of classifications | Are matches reliable? |
| "No match" rate | <15% | Is AI understanding users? |
| User correction rate | <10% | How often is AI wrong? |

**Calculation:**

`Classification accuracy = (Correct matches) / (Total classifications) × 100`

**"Correct"** = User accepted match OR didn't override within 24 hours.

---

### 7. Habit Follow-Through

| Metric | Target | Why It Matters |
| --- | --- | --- |
| Building block completion rate | >60% | Are users hitting their goals? |
| Guardrail success rate | >70% stay under limit | Are guardrails working? |
| Week-over-week improvement | Positive trend | Are users getting better? |

**Calculation:**

`BB completion rate = (Completed building blocks) / (Target building blocks) × 100

Example: User has 3 building blocks
- Exercise 4x/week: 3/4 = 75%
- Stretch daily: 5/7 = 71%
- Wake early: 4/7 = 57%
Average: 68%`

---

### 8. Summary Engagement

| Metric | Target | Why It Matters |
| --- | --- | --- |
| Summary open rate | >70% | Are summaries valuable? |
| Summary read time | >30 seconds | Are users reading them? |
| Share rate | >5% | Are summaries share-worthy? |

---

## North Star Metric

### Habit Success Rate

**Definition:** Percentage of building blocks completed at ≥80% of target across all active users.

**Target:** >50%

**Why this is the North Star:**

- Directly measures if app is helping people change behavior
- Not gameable by engagement hacking
- Aligns team around user outcomes, not vanity metrics

**Calculation:**

`Habit Success Rate = 
  (Building blocks at ≥80% completion) / 
  (Total active building blocks) × 100`

---

## Funnel Metrics

### Onboarding Funnel

`┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  App Download                                           100%    │
│       │                                                         │
│       ▼                                                         │
│  App Open                                               85%     │
│       │                                                         │
│       ▼                                                         │
│  Start Onboarding                                       80%     │
│       │                                                         │
│       ▼                                                         │
│  Create First Identity                                  75%     │
│       │                                                         │
│       ▼                                                         │
│  Create First Building Block                            70%     │
│       │                                                         │
│       ▼                                                         │
│  Complete Onboarding                                    65%     │
│       │                                                         │
│       ▼                                                         │
│  Sign In                                                60%     │
│       │                                                         │
│       ▼                                                         │
│  First Log                                              50%     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘`

**Key drop-off points to monitor:**

- App open → Start onboarding (friction at welcome?)
- Building block → Complete onboarding (too long?)
- Sign in → First log (activation failure?)

---

### Weekly Engagement Funnel

`┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Nudge Sent                                             100%    │
│       │                                                         │
│       ▼                                                         │
│  Nudge Delivered                                        95%     │
│       │                                                         │
│       ▼                                                         │
│  Nudge Opened                                           40%     │
│       │                                                         │
│       ▼                                                         │
│  Log Created (within 2hr)                               30%     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘`

---

## Cohort Analysis

### By Onboarding Completeness

| Cohort | Definition | Expected Retention |
| --- | --- | --- |
| Full setup | 3+ identities, 5+ blocks, triggers | Highest |
| Partial setup | 1-2 identities, 2-4 blocks | Medium |
| Minimal setup | 1 identity, 1-2 blocks | Lowest |

**Hypothesis:** Users who invest more in setup retain better.

---

### By First Week Behavior

| Cohort | Definition | Expected Retention |
| --- | --- | --- |
| High engagers | 5+ logs in week 1 | Highest |
| Medium engagers | 2-4 logs in week 1 | Medium |
| Low engagers | 0-1 logs in week 1 | Lowest |

**Hypothesis:** Early logging predicts long-term retention.

---

### By Feature Usage

| Cohort | Definition | Expected Retention |
| --- | --- | --- |
| Voice loggers | >50% logs via voice | Higher |
| Manual loggers | >50% logs via tap | Lower |
| Widget users | Any widget usage | Higher |
| Notification responders | >50% check-in response | Highest |

**Hypothesis:** Voice + notifications = highest engagement.

---

## Anti-Metrics (What We Don't Optimize For)

| Anti-Metric | Why We Avoid It |
| --- | --- |
| Daily Active Users (DAU) | Could encourage unhealthy daily pressure |
| Total logs | Quantity over quality |
| Time in app | We want efficiency, not addiction |
| Notification opens | Could encourage notification spam |
| Streak length | Streaks create fragile, anxiety-driven usage |

---

## Qualitative Metrics

### User Feedback

| Method | Frequency | Purpose |
| --- | --- | --- |
| In-app feedback | Ongoing | Bug reports, feature requests |
| App Store reviews | Monitor daily | Public sentiment |
| User interviews | Monthly (5-10 users) | Deep understanding |
| NPS survey | Quarterly | Overall satisfaction |

---

### Net Promoter Score (NPS)

**Question:** "How likely are you to recommend Backmind to a friend?" (0-10)

| Score | Category |
| --- | --- |
| 9-10 | Promoter |
| 7-8 | Passive |
| 0-6 | Detractor |

**NPS = % Promoters - % Detractors**

**Target:** >40 (excellent for consumer apps)

---

### User Interviews Focus Areas

| Area | Questions |
| --- | --- |
| Onboarding | Was setup clear? Too long? |
| Voice logging | Natural? Accurate? |
| Nudges | Helpful or annoying? Well-timed? |
| Check-ins | Feel supportive or naggy? |
| Weekly summary | Valuable? Motivating? |
| Overall | Is this helping you become who you want to be? |

---

## Measurement Infrastructure

### Analytics Events

swift

`*// Key events to track// Onboarding*
Analytics.track("onboarding_started")
Analytics.track("identity_created", properties: ["count": identityCount])
Analytics.track("building_block_created", properties: ["count": blockCount])
Analytics.track("onboarding_completed", properties: ["duration_seconds": duration])

*// Authentication*
Analytics.track("sign_in_completed")
Analytics.track("sign_in_failed", properties: ["error": errorType])

*// Logging*
Analytics.track("log_started", properties: ["method": "voice" | "manual" | "widget" | "notification"])
Analytics.track("log_completed", properties: [
    "method": method,
    "type": "building_block" | "guardrail",
    "confidence": confidence,
    "duration_seconds": duration
])
Analytics.track("log_failed", properties: ["error": errorType])

*// AI*
Analytics.track("classification_completed", properties: [
    "match_type": matchType,
    "confidence": confidence,
    "duration_ms": duration
])
Analytics.track("classification_corrected", properties: ["original": original, "corrected": corrected])

*// Nudges*
Analytics.track("nudge_sent", properties: ["building_block_id": id])
Analytics.track("nudge_opened")
Analytics.track("nudge_action", properties: ["action": "log" | "snooze" | "dismiss"])

*// Check-ins*
Analytics.track("checkin_sent", properties: ["type": "opening" | "closing"])
Analytics.track("checkin_response", properties: ["response": "zero" | "some" | "skip"])

*// Summary*
Analytics.track("summary_generated")
Analytics.track("summary_opened", properties: ["delay_hours": hoursAfterGeneration])
Analytics.track("summary_shared")

*// Retention*
Analytics.track("app_opened", properties: ["days_since_install": days])
Analytics.track("session_started", properties: ["session_number": count])
```

---

### Analytics Tools

| Tool | Purpose |
|------|---------|
| **Mixpanel** or **Amplitude** | Product analytics, funnels, retention |
| **Sentry** | Error tracking, crash reporting |
| **App Store Connect** | Downloads, ratings, reviews |
| **Supabase** | Database queries for custom metrics |

---

### Dashboard (Internal)

**Real-time metrics:**
- Active users (now)
- Logs today
- Nudges sent/responded today
- Error rate

**Daily metrics:**
- DAU
- New signups
- Onboarding completion rate
- First logs
- Classification accuracy

**Weekly metrics:**
- WAU
- Retention (D1, D7)
- Building block completion rate
- Guardrail success rate
- NPS (if surveyed)

**Monthly metrics:**
- MAU
- D30, D90 retention
- Habit Success Rate (North Star)
- Revenue (if applicable)
- Cohort analysis

---

## Success Milestones

### MVP Launch (Month 1)

| Metric | Target | Status |
|--------|--------|--------|
| Beta users | 50 | |
| Onboarding completion | >70% | |
| Day 7 retention | >40% | |
| Classification accuracy | >85% | |
| Critical bugs | 0 | |

---

### Early Traction (Month 3)

| Metric | Target | Status |
|--------|--------|--------|
| Total users | 500 | |
| Day 30 retention | >25% | |
| WAU/MAU | >40% | |
| Logs per WAU per week | ≥3 | |
| NPS | >30 | |

---

### Product-Market Fit (Month 6)

| Metric | Target | Status |
|--------|--------|--------|
| Total users | 2,000 | |
| Day 30 retention | >30% | |
| Habit Success Rate | >40% | |
| Organic growth (referrals) | >20% of new users | |
| NPS | >40 | |

---

### Scale (Month 12)

| Metric | Target | Status |
|--------|--------|--------|
| Total users | 10,000 | |
| Day 90 retention | >20% | |
| Habit Success Rate | >50% | |
| Revenue (if monetized) | Break-even | |

---

## Experiment Framework

### A/B Testing Priorities

| Experiment | Hypothesis | Metric |
|------------|------------|--------|
| Onboarding length | Shorter = higher completion | Onboarding completion rate |
| Nudge copy variations | Personalized = higher action | Nudge → Log conversion |
| Check-in timing | Evening = higher response | Check-in response rate |
| Summary format | Shorter = higher open | Summary open rate |
| Widget design | Simpler = higher usage | Widget log percentage |

---

### Experiment Process

1. **Hypothesis:** Clear statement of what we're testing
2. **Metric:** Primary metric to measure
3. **Sample size:** Minimum users needed for significance
4. **Duration:** How long to run
5. **Decision:** What threshold triggers a change

**Example:**
```
Hypothesis: Users who receive nudges with their "why" statement
            respond at higher rates than generic nudges.

Metric: Nudge → Log conversion rate

Control: "Time for your workout?"
Variant: "Time for your workout. Remember: clear mornings for Aurelia."

Sample: 200 users per group
Duration: 2 weeks
Decision: If variant > control by 10%+ with p < 0.05, ship variant
```

---

## Reporting Cadence

| Report | Frequency | Audience |
|--------|-----------|----------|
| Daily dashboard | Daily | Founder (you) |
| Weekly metrics email | Weekly | Stakeholders |
| Monthly deep dive | Monthly | Investors (future) |
| Quarterly review | Quarterly | Advisory/board |

---

## Summary

### Key Metrics Hierarchy
```
                    ┌─────────────────────┐
                    │   NORTH STAR        │
                    │   Habit Success     │
                    │   Rate (>50%)       │
                    └─────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           │                  │                  │
           ▼                  ▼                  ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │  RETENTION  │    │ ENGAGEMENT  │    │   QUALITY   │
    │             │    │             │    │             │
    │  D7: >50%   │    │ WAU/MAU:    │    │ AI Accuracy │
    │  D30: >30%  │    │   >50%      │    │   >90%      │
    └─────────────┘    └─────────────┘    └─────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │  FUNNEL     │    │  FEATURES   │    │  FEEDBACK   │
    │             │    │             │    │             │
    │ Onboarding  │    │ Voice: 60%  │    │ NPS: >40    │
    │ >80%        │    │ Nudge: 30%  │    │             │
    └─────────────┘    └─────────────┘    └─────────────┘`

---

### Metrics MVP Must Track

| Metric | Priority | Tool |
| --- | --- | --- |
| Retention (D1, D7, D30) | P0 | Mixpanel/Amplitude |
| Onboarding completion | P0 | Mixpanel/Amplitude |
| Logs per user per week | P0 | Supabase + Analytics |
| Classification accuracy | P0 | Supabase + manual review |
| Nudge → Log conversion | P0 | Supabase + Analytics |
| Check-in response rate | P0 | Supabase + Analytics |
| Building block completion | P0 | Supabase |
| Error rate | P0 | Sentry |
| WAU/MAU | P1 | Analytics |
| NPS | P1 | In-app survey |

---
<!-- Source: PRD/15-mvp-scope-summary.md -->

# Backmind PRD — Section 15: MVP Scope Summary

---

## Overview

This section consolidates everything from Sections 1-14 into a clear, actionable scope for MVP development. Use this as the reference during build.

**MVP Goal:** Validate that voice logging + proactive nudges + AI-guided setup = higher habit follow-through than traditional trackers.

**Timeline Target:** 8-12 weeks to testable MVP

---

## What's In (MVP)

### Core Features

| Feature | Description | Priority |
| --- | --- | --- |
| **Onboarding** | Identity-first setup with AI help | P0 |
| **Voice logging** | In-app voice capture + AI classification | P0 |
| **Dashboard** | Identity cards with health colors + progress | P0 |
| **Manual logging** | Tap-to-log fallback | P0 |
| **Nudges** | Push notifications at trigger times | P0 |
| **Check-ins** | Opening + closing for guardrails | P0 |
| **Weekly summary** | AI-generated progress review | P0 |
| **Settings** | Edit identities, blocks, guardrails, timing | P0 |
| **Widget** | Home screen mic button | P0 |
| **Offline support** | Queue logs when offline | P0 |

---

### Onboarding (In Scope)

| Step | In MVP |
| --- | --- |
| Welcome screen | ✅ |
| Identity education + creation | ✅ |
| Identity cap warnings (3+) | ✅ |
| Building block education + creation | ✅ |
| Trigger creation with AI feedback | ✅ |
| Building block cap warnings (3+ per identity) | ✅ |
| Guardrail education + creation | ✅ |
| Temptation context + why statement | ✅ |
| Guardrail cap warnings (2+) | ✅ |
| Sign in with Apple | ✅ |
| Notification permission | ✅ |
| Dashboard with first log prompt | ✅ |

---

### AI Help (In Scope)

| AI Feature | In MVP |
| --- | --- |
| Combine identities | ✅ |
| Simplify building blocks | ✅ |
| Prioritize building blocks | ✅ |
| Evaluate trigger quality | ✅ |
| Find "why" for guardrails | ✅ |
| Find keystone guardrail | ✅ |
| Ideas when stuck | ✅ |

---

### Voice & Logging (In Scope)

| Feature | In MVP |
| --- | --- |
| In-app voice capture | ✅ |
| Apple Speech transcription | ✅ |
| AI classification (Claude Haiku) | ✅ |
| High-confidence auto-log | ✅ |
| Medium-confidence confirmation | ✅ |
| No-match handling | ✅ |
| Guardrail count extraction | ✅ |
| Zero celebration | ✅ |
| Over-limit supportive messaging | ✅ |
| Manual tap-to-log | ✅ |

---

### Notifications (In Scope)

| Feature | In MVP |
| --- | --- |
| Nudges at trigger times | ✅ |
| Quick action: Log ✓ | ✅ |
| Quick action: Snooze 1hr | ✅ |
| Opening check-ins (supportive) | ✅ |
| Closing check-ins (ask for report) | ✅ |
| Quick action: No [item] 🎉 | ✅ |
| Quick action: Had some | ✅ |
| Quick action: Skip | ✅ |
| Frequency caps (max 4/day) | ✅ |
| Bedtime cutoff | ✅ |

---

### Dashboard (In Scope)

| Feature | In MVP |
| --- | --- |
| Identity cards | ✅ |
| Health color indicators | ✅ |
| Building block progress (x/target) | ✅ |
| Guardrail progress (x/limit) | ✅ |
| Voice log button | ✅ |
| Tap-to-log on items | ✅ |
| Offline/pending indicator | ✅ |

---

### Weekly Summary (In Scope)

| Feature | In MVP |
| --- | --- |
| Sunday 7pm generation | ✅ |
| Push notification | ✅ |
| AI-generated insight text | ✅ |
| Per-identity scores | ✅ |
| Suggested action | ✅ |
| Summary screen UI | ✅ |

---

### Settings (In Scope)

| Feature | In MVP |
| --- | --- |
| View/edit identities | ✅ |
| View/edit building blocks | ✅ |
| View/edit guardrails | ✅ |
| Add new items post-onboarding | ✅ |
| Delete with confirmation | ✅ |
| Wake time / work end / bedtime | ✅ |
| Notification toggles | ✅ |
| Summary day/time | ✅ |
| Export data | ✅ |
| Delete account | ✅ |

---

### Tech (In Scope)

| Component | In MVP |
| --- | --- |
| Swift / SwiftUI | ✅ |
| SwiftData (local) | ✅ |
| Apple Speech (on-device) | ✅ |
| Supabase Auth | ✅ |
| Supabase Postgres | ✅ |
| Supabase Edge Functions | ✅ |
| Claude Haiku API | ✅ |
| APNs push notifications | ✅ |
| Home screen widget | ✅ |
| Offline queue + sync | ✅ |

---

## What's Out (Post-MVP)

### Deferred to v1.1

| Feature | Reason |
| --- | --- |
| Lock screen widget | iOS 16+ only, lower priority |
| Siri inline capture ("Hey Siri, tell Backmind...") | Requires SiriKit integration |
| Adaptive nudge timing | Needs usage data first |
| Multi-week pattern recognition in summaries | Needs historical data |
| Summary history | Nice to have |
| Share summary card | Nice to have |
| Week view detail (day-by-day) | Nice to have |

---

### Deferred to v1.2+

| Feature | Reason |
| --- | --- |
| iPad support | Focus on iPhone first |
| Apple Watch app | Complexity |
| Multiple frequency periods (daily/weekly/monthly per goal) | Adds complexity |
| Social/accountability partners | Validate core loop first |
| Streaks (optional) | May add if users request |
| Dark mode customization | System default works |
| Custom notification sounds | Low impact |
| Localization | English first |

---

### Explicitly Not Building

| Feature | Reason |
| --- | --- |
| Android app | iOS first, validate then expand |
| Web app | Native mobile is the experience |
| Calendar integration | Adds complexity, unclear value |
| Health app integration | Adds complexity |
| Gamification (points, badges) | Against core philosophy |
| Social feed | Not a social app |
| AI coach/chat | Scope creep |

---

## Feature Priority Matrix

### P0 (Must Have for Launch)

Without these, the app doesn't work:

| Feature | Status |
| --- | --- |
| Onboarding flow | 🔲 |
| Identity creation | 🔲 |
| Building block creation with triggers | 🔲 |
| Guardrail creation with check-in times | 🔲 |
| Sign in with Apple | 🔲 |
| Dashboard with health colors | 🔲 |
| Voice logging (in-app) | 🔲 |
| AI classification | 🔲 |
| Manual logging fallback | 🔲 |
| Nudge notifications | 🔲 |
| Check-in notifications | 🔲 |
| Weekly summary generation | 🔲 |
| Basic settings (view/edit/delete) | 🔲 |
| Offline queue | 🔲 |

---

### P1 (Should Have for Launch)

Strong value-add, include if time permits:

| Feature | Status |
| --- | --- |
| Home screen widget | 🔲 |
| Notification quick actions (Log ✓, Snooze) | 🔲 |
| AI help during onboarding (all 7 types) | 🔲 |
| Trigger quality feedback | 🔲 |
| Siri shortcut (opens app) | 🔲 |
| Export data | 🔲 |
| Error logging (Sentry) | 🔲 |

---

### P2 (Nice to Have)

Can ship without, add post-launch:

| Feature | Status |
| --- | --- |
| Lock screen widget | 🔲 |
| Share summary card | 🔲 |
| Summary history | 🔲 |
| Week view detail | 🔲 |
| Adaptive nudge suggestions | 🔲 |

---

## Development Phases

### Phase 1: Foundation (Weeks 1-2)

**Goal:** Core data model + basic UI shell

| Task | Estimate |
| --- | --- |
| Xcode project setup | 2 hours |
| SwiftData models | 4 hours |
| Supabase project + schema | 4 hours |
| Basic navigation shell | 4 hours |
| Sign in with Apple | 4 hours |
| Sync service (basic) | 8 hours |

**Deliverable:** App launches, user can sign in, data syncs.

---

### Phase 2: Onboarding (Weeks 3-4)

**Goal:** Complete onboarding flow

| Task | Estimate |
| --- | --- |
| Welcome screen | 2 hours |
| Identity education + creation | 6 hours |
| Building block education + creation | 6 hours |
| Trigger input + parsing | 8 hours |
| Guardrail education + creation | 6 hours |
| Check-in time setup | 4 hours |
| AI help integration (Edge Functions) | 12 hours |
| Cap warnings | 4 hours |
| Notification permission | 2 hours |

**Deliverable:** User can complete full onboarding, data saved.

---

### Phase 3: Voice & Logging (Weeks 5-6)

**Goal:** Core logging loop works

| Task | Estimate |
| --- | --- |
| Voice capture UI | 6 hours |
| Apple Speech integration | 4 hours |
| AI classification Edge Function | 8 hours |
| Classification response handling | 6 hours |
| Confirmation UI (success, low confidence, no match) | 6 hours |
| Manual logging UI | 4 hours |
| Guardrail count input | 4 hours |
| Log storage + sync | 4 hours |

**Deliverable:** User can log via voice or tap, AI matches correctly.

---

### Phase 4: Dashboard (Week 7)

**Goal:** Dashboard shows progress

| Task | Estimate |
| --- | --- |
| Dashboard layout | 4 hours |
| Identity card component | 4 hours |
| Health calculation logic | 4 hours |
| Color indicators | 2 hours |
| Progress display | 2 hours |
| Tap-to-log integration | 2 hours |
| Offline indicator | 2 hours |

**Deliverable:** Dashboard shows accurate, live progress.

---

### Phase 5: Notifications (Weeks 8-9)

**Goal:** Proactive nudges and check-ins work

| Task | Estimate |
| --- | --- |
| APNs setup + certificates | 4 hours |
| Device token registration | 2 hours |
| Nudge scheduling Edge Function | 8 hours |
| Check-in scheduling Edge Function | 8 hours |
| Notification sender Edge Function | 6 hours |
| Notification categories + actions | 4 hours |
| Quick action handling in app | 6 hours |
| Snooze logic | 2 hours |
| Frequency caps | 2 hours |

**Deliverable:** Nudges and check-ins arrive on time, actions work.

---

### Phase 6: Weekly Summary (Week 10)

**Goal:** AI summaries generate and display

| Task | Estimate |
| --- | --- |
| Data aggregation query | 4 hours |
| Summary generation Edge Function | 8 hours |
| Summary notification | 2 hours |
| Summary screen UI | 4 hours |
| Summary storage | 2 hours |

**Deliverable:** Weekly summary generates Sunday 7pm, displays in app.

---

### Phase 7: Settings & Polish (Weeks 11-12)

**Goal:** Settings work, bugs fixed, ready for beta

| Task | Estimate |
| --- | --- |
| Settings screen | 4 hours |
| Edit identity flow | 4 hours |
| Edit building block flow | 4 hours |
| Edit guardrail flow | 4 hours |
| Delete confirmations | 2 hours |
| Timing settings | 2 hours |
| Notification toggles | 2 hours |
| Export data | 4 hours |
| Delete account | 4 hours |
| Widget implementation | 8 hours |
| Siri shortcut | 4 hours |
| Error handling polish | 8 hours |
| Bug fixes + testing | 16 hours |

**Deliverable:** App is beta-ready.

---

## Estimated Timeline

| Phase | Duration | Cumulative |
| --- | --- | --- |
| Phase 1: Foundation | 2 weeks | Week 2 |
| Phase 2: Onboarding | 2 weeks | Week 4 |
| Phase 3: Voice & Logging | 2 weeks | Week 6 |
| Phase 4: Dashboard | 1 week | Week 7 |
| Phase 5: Notifications | 2 weeks | Week 9 |
| Phase 6: Weekly Summary | 1 week | Week 10 |
| Phase 7: Settings & Polish | 2 weeks | Week 12 |

**Total: ~12 weeks** to beta-ready MVP

**Note:** Estimates assume ~20-25 hours/week of focused development time.

---

## Technical Checklist

### iOS App

| Component | Status |
| --- | --- |
| Xcode project created | 🔲 |
| SwiftData container configured | 🔲 |
| All models implemented | 🔲 |
| Navigation structure | 🔲 |
| Onboarding views | 🔲 |
| Dashboard view | 🔲 |
| Voice capture view | 🔲 |
| Settings views | 🔲 |
| Summary view | 🔲 |
| Auth service | 🔲 |
| Sync service | 🔲 |
| Voice service | 🔲 |
| AI service | 🔲 |
| Notification service | 🔲 |
| Offline queue manager | 🔲 |
| Widget extension | 🔲 |
| App Intents (Siri) | 🔲 |

---

### Supabase Backend

| Component | Status |
| --- | --- |
| Project created | 🔲 |
| Database schema deployed | 🔲 |
| RLS policies configured | 🔲 |
| Auth (Apple) configured | 🔲 |
| Edge Function: classify-log | 🔲 |
| Edge Function: generate-summary | 🔲 |
| Edge Function: schedule-nudges | 🔲 |
| Edge Function: schedule-checkins | 🔲 |
| Edge Function: send-notifications | 🔲 |
| Edge Function: AI help endpoints | 🔲 |
| Cron jobs configured | 🔲 |
| APNs integration | 🔲 |

---

### External Services

| Service | Status |
| --- | --- |
| Apple Developer account | 🔲 |
| App ID + bundle identifier | 🔲 |
| APNs certificate/key | 🔲 |
| Sign in with Apple configured | 🔲 |
| Anthropic API key | 🔲 |
| Sentry project (error logging) | 🔲 |
| Analytics (Mixpanel/Amplitude) | 🔲 |

---

## Launch Criteria

### Must Have Before Beta

| Criteria | Status |
| --- | --- |
| All P0 features working | 🔲 |
| No critical bugs | 🔲 |
| Onboarding completion rate >70% (internal testing) | 🔲 |
| Voice classification accuracy >85% (manual review) | 🔲 |
| Notifications delivering reliably | 🔲 |
| Offline mode works | 🔲 |
| Data syncs correctly | 🔲 |
| App doesn't crash | 🔲 |

---

### Must Have Before Public Launch

| Criteria | Status |
| --- | --- |
| 50+ beta users tested | 🔲 |
| Day 7 retention >40% in beta | 🔲 |
| Critical feedback addressed | 🔲 |
| App Store assets ready | 🔲 |
| Privacy policy + terms | 🔲 |
| Support email set up | 🔲 |

---

## Data Model Quick Reference

### Core Entities

`User
├── UserSettings
├── Identities[]
│   ├── BuildingBlocks[]
│   │   ├── Triggers[]
│   │   └── Logs[]
│   └── Guardrails[] (many-to-many)
│       ├── CheckIns[]
│       └── Logs[]
└── WeeklySummaries[]`

### Key Relationships

| Relationship | Type |
| --- | --- |
| User → Identities | 1:many |
| Identity → BuildingBlocks | 1:many |
| BuildingBlock → Triggers | 1:many |
| Guardrail → Identities | many:many |
| Guardrail → CheckIns | 1:many |

---

## API Quick Reference

### Edge Functions

| Endpoint | Purpose | Called When |
| --- | --- | --- |
| `/classify-log` | AI classification | User logs voice |
| `/generate-summary` | Weekly summary | Sunday 7pm cron |
| `/schedule-nudges` | Create day's nudges | Daily 3am cron |
| `/schedule-checkins` | Create day's check-ins | Daily 3am cron |
| `/send-notifications` | Send due notifications | Every minute cron |
| `/ai-help/*` | Onboarding AI assistance | During onboarding |

---

### AI Prompts

| Prompt | Location | Purpose |
| --- | --- | --- |
| Classify log | Section 6 | Match transcript to block/guardrail |
| Combine identities | Section 5 | Reduce identity count |
| Simplify block | Section 5 | Simplify complex goals |
| Prioritize blocks | Section 5 | Find linchpin habits |
| Evaluate triggers | Section 5 | Rate trigger quality |
| Find why | Section 5 | Approach-frame guardrails |
| Find keystone | Section 5 | Identify keystone guardrail |
| Generate summary | Section 9 | Weekly progress summary |

---

## Key Decisions Summary

| Decision | Choice | Rationale |
| --- | --- | --- |
| Terminology | Identities, Building Blocks, Guardrails, Triggers, Nudges, Check-ins | Research-aligned, clear |
| Sign-in timing | After goal creation | Reduce early bounce |
| Streaks | None | Fragile psychology |
| Progress display | Color gradient | Resilient, not binary |
| Negative goals | Guardrails with limits | Approach-framed |
| Check-in timing | Two-phase (opening + closing) | Support + capture |
| AI model | Claude Haiku | Fast, cheap, good enough |
| Local storage | SwiftData | Modern, offline-first |
| Backend | Supabase | Familiar, full-featured |
| Notifications | APNs via Supabase | Server-controlled timing |

---

## Risk Mitigation

| Risk | Mitigation |
| --- | --- |
| AI classification accuracy too low | Extensive prompt testing, low-confidence confirmation, manual fallback |
| Notifications feel spammy | Frequency caps, user controls, bedtime cutoff |
| Onboarding too long | Track drop-off, simplify if needed |
| Voice logging awkward | Widget + Siri alternatives, manual fallback |
| Users don't return | Proactive nudges, weekly summary, build-in-public |
| Technical complexity | Familiar stack (Supabase), clear architecture |

---

## Post-MVP Roadmap

### v1.1 (Month 2-3)

- Lock screen widget
- Siri inline capture
- Summary sharing
- Summary history
- Adaptive nudge suggestions

### v1.2 (Month 4-6)

- iPad support
- Multiple frequency periods
- Pattern recognition in summaries
- Advanced analytics

### v2.0 (Month 6+)

- Accountability partners
- Apple Watch
- Android (if validated)

---

## Quick Start Checklist

### Day 1

- [ ]  Create Xcode project
- [ ]  Set up Supabase project
- [ ]  Configure Apple Developer account
- [ ]  Create GitHub repo
- [ ]  Set up Anthropic API access

### Week 1

- [ ]  Implement SwiftData models
- [ ]  Deploy Supabase schema
- [ ]  Basic app shell with navigation
- [ ]  Sign in with Apple working

### Week 2

- [ ]  Sync service (create + read)
- [ ]  Basic onboarding flow structure
- [ ]  First Edge Function deployed

---

## Document Reference

| Section | Topic | When to Reference |
| --- | --- | --- |
| 1 | Overview & Vision | Alignment, pitch |
| 2 | User & Market | Positioning, pricing |
| 3 | Terminology | Consistency |
| 4 | Onboarding Flow | Building onboarding |
| 5 | AI Help System | AI prompts |
| 6 | Voice Logging | Voice feature |
| 7 | Nudges & Check-ins | Notification system |
| 8 | Dashboard | Dashboard UI |
| 9 | Weekly Summary | Summary feature |
| 10 | Settings | Settings screens |
| 11 | Tech Stack | Architecture decisions |
| 12 | Data Model | Database work |
| 13 | Error Handling | Edge cases |
| 14 | Success Metrics | Analytics setup |
| 15 | MVP Scope | Prioritization |

---

## Final Checklist Before Beta

- [ ]  All P0 features working
- [ ]  Manual testing complete (all flows)
- [ ]  10+ internal test logs with good accuracy
- [ ]  Notifications working reliably
- [ ]  Offline mode tested
- [ ]  No crashes in 24 hours of testing
- [ ]  Analytics events firing
- [ ]  Error logging working
- [ ]  TestFlight build uploaded
- [ ]  Beta testers invited

---

## One-Page Summary

**Backmind** is a voice-first iOS app that helps people become who they want to be through:

1. **Identity-based framing** — "I am an athlete" not "I want to exercise"
2. **AI-guided setup** — Research-backed onboarding with smart defaults
3. **Voice logging** — Speak naturally, AI matches to your goals
4. **Proactive nudges** — Reminders at the right moment, not random times
5. **Supportive check-ins** — Track limits without guilt
6. **Weekly summaries** — AI-generated reflection that celebrates progress

**Tech:** Swift/SwiftUI, SwiftData, Supabase, Claude Haiku, APNs

**Timeline:** 12 weeks to beta

**North Star:** >50% of building blocks completed at ≥80% target

**Differentiation:** No streaks, no shame, voice-first, proactive, identity-based

---
<!-- Source: PRD/16-ai-copy-system.md -->

# Backmind PRD — Section 16: AI Copy System

---

## Overview

Backmind uses AI to generate contextual, personalized copy at key touchpoints throughout the app. Instead of hardcoded strings, the AI produces bespoke messages that reference the user's specific identities, goals, struggles, and progress.

**Principle:** Every message should feel like it was written for this specific user at this specific moment—not pulled from a template library.

---

## Context Schema

The AI has access to the following context when generating copy:

### User Context

| Field | Type | Example | Available When |
|-------|------|---------|----------------|
| user.name | String? | "Darian" | If provided during setup |
| user.timezone | String | "Asia/Taipei" | Always |
| user.memberSince | Date | 2024-01-15 | Always |

### Identity Context

| Field | Type | Example |
|-------|------|---------|
| identity.name | String | "Present Dad" |
| identity.emoji | String | "👨‍👧" |
| identity.buildingBlocks | [BuildingBlock] | Array of related blocks |
| identity.guardrails | [Guardrail] | Array of related guardrails |

### Building Block Context

| Field | Type | Example |
|-------|------|---------|
| block.name | String | "Exercise 4x/week" |
| block.target | Int | 4 |
| block.frequency | String | "weekly" |
| block.outcome | String? | "I feel strong and have energy for Aurelia" |
| block.obstacle | String? | "Mental drain after work, urge to check laptop" |
| block.plan | String? | "Put bag in bedroom, change into gym clothes first" |
| block.triggers | [Trigger] | Array of when/where triggers |

### Progress Context

| Field | Type | Example |
|-------|------|---------|
| progress.currentWeek | Int | 2 (completions this week) |
| progress.targetWeek | Int | 4 |
| progress.percentWeek | Float | 0.50 |
| progress.streak | Int | 3 (consecutive weeks hitting target) |
| progress.lastFourWeeks | [Int] | [4, 3, 4, 2] |
| progress.hitRate | Float | 0.75 (weeks target hit / total weeks) |
| progress.bestStreak | Int | 5 |

### Guardrail Context

| Field | Type | Example |
|-------|------|---------|
| guardrail.name | String | "≤5 beers/week" |
| guardrail.limit | Int | 5 |
| guardrail.current | Int | 3 |
| guardrail.identities | [Identity] | Identities this protects |
| guardrail.why | String? | "Clear mornings for Aurelia" |
| guardrail.temptationContext | String? | "Friday and Saturday nights" |

### Temporal Context

| Field | Type | Example |
|-------|------|---------|
| time.now | DateTime | 2024-03-15T18:30:00+08:00 |
| time.dayOfWeek | String | "Friday" |
| time.isWeekend | Bool | false |
| time.triggerContext | String? | "after dropping off Aurelia" |
| time.daysUntilWeekReset | Int | 2 |

---

## Tone Guidelines

All AI-generated copy follows these principles:

### Voice

- **Warm but not saccharine** — Supportive friend, not life coach
- **Brief** — 1-2 sentences max for nudges/check-ins, 2-3 for summaries
- **Specific** — Reference their actual identities, outcomes, obstacles by name
- **Present-focused** — What matters now, not dwelling on past failures

### Self-Compassion Framework

Based on Kristin Neff's research, three components:

| Component | What It Means | Example Copy |
|-----------|---------------|--------------|
| **Self-kindness** | Gentle, not critical | "Tough week. That happens." |
| **Common humanity** | Everyone struggles | "Most people miss days—what matters is coming back." |
| **Mindfulness** | Acknowledge without amplifying | "You're at 1/4 this week. Two days left." |

### What to Avoid

- "You should have..."
- "Don't give up!"
- "You can do it!" (empty encouragement)
- Excessive exclamation points
- Guilt or shame framing
- Comparisons to other users
- "Streak broken" as primary framing

---

## Touchpoint Definitions

### Touchpoint 1: Building Block Nudge

**When:** Scheduled trigger time for a building block

**Purpose:** Prompt action without nagging

**Model:** Haiku

**Context available:** Full building block context, identity, progress, temporal

**Prompt template:**

```
Generate a brief nudge (1 sentence) for this building block.

Building block: {block.name}
Identity: {identity.name}
Trigger context: {time.triggerContext}
Their outcome: {block.outcome}
Their obstacle: {block.obstacle}
Their plan: {block.plan}
Progress this week: {progress.currentWeek}/{progress.targetWeek}

Guidelines:
- If they have a plan, reference it specifically
- If no plan yet, just reference the trigger context
- Keep it to one sentence
- Question format works well ("Gym time?")
- Don't mention progress unless they're close to target
```

**Example outputs:**

*Without plan:*
> "Tuesday after drop-off. Gym time?"

*With plan:*
> "You're home from drop-off. Remember: bag in bedroom, gym clothes on, then decide."

*Close to target:*
> "One more this week and you've hit 4/4. After work—heading to the gym?"

**Fallback:** "{time.triggerContext}. Time for {block.name}?"

---

### Touchpoint 2: Missed Nudge Response

**When:** User dismissed/ignored a nudge (detected at end of day or next nudge)

**Purpose:** Maintain relationship without guilt

**Model:** Haiku

**Context available:** Full context

**Prompt template:**

```
Generate a brief, non-judgmental acknowledgment (1 sentence) that the user missed a building block nudge. Do NOT send this as a push notification—only show in-app if user opens the app.

Building block: {block.name}
Missed trigger: {time.triggerContext}
Their obstacle (if known): {block.obstacle}
Progress: {progress.currentWeek}/{progress.targetWeek}
Days left in week: {time.daysUntilWeekReset}

Guidelines:
- Normalize missing ("happens to everyone")
- If they have an obstacle defined, acknowledge it might have been that
- If days remain, note the opportunity
- No guilt, no "you missed"
- One sentence max
```

**Example outputs:**

*With obstacle known:*
> "That post-work drain is real. 3 days left if you want another shot this week."

*Without obstacle:*
> "Yesterday didn't happen. That's fine—3 days left this week."

**Fallback:** "Still {time.daysUntilWeekReset} days left this week."

---

### Touchpoint 3: Guardrail Opening Check-in

**When:** Start of temptation window (e.g., Friday 6pm)

**Purpose:** Supportive awareness, not restriction reminder

**Model:** Haiku

**Context available:** Guardrail context, identities, temporal

**Prompt template:**

```
Generate a brief supportive message (1-2 sentences) at the start of a temptation window.

Guardrail: {guardrail.name}
Current this week: {guardrail.current}/{guardrail.limit}
Temptation context: {guardrail.temptationContext}
Identities protected: {guardrail.identities}
Their why: {guardrail.why}

Guidelines:
- Acknowledge the context ("It's Friday night")
- State current progress matter-of-factly
- End with agency ("whatever you choose" or "enjoy your evening")
- If they have a "why", can reference it subtly
- Never say "don't" or "avoid"
```

**Example outputs:**

*With why:*
> "Friday night. You're at 2/5 for the week. Clear morning with Aurelia tomorrow if you want it."

*Without why:*
> "It's Friday. You're at 2/5 beers this week. Enjoy your evening—whatever you choose."

**Fallback:** "It's {time.dayOfWeek}. You're at {guardrail.current}/{guardrail.limit} this week."

---

### Touchpoint 4: Guardrail Closing Check-in

**When:** End of temptation window (e.g., Friday 10pm)

**Purpose:** Capture data, celebrate zeros

**Model:** Haiku

**Context available:** Guardrail context, temporal

**Prompt template:**

```
Generate a brief check-in question (1 sentence) asking about guardrail events.

Guardrail: {guardrail.name}
Item: {guardrail.item} (e.g., "beers")

Guidelines:
- Simple question
- Casual tone
- No judgment implied either direction
```

**Example outputs:**
> "How'd tonight go?"
> "Any beers tonight?"

**Fallback:** "How'd tonight go with {guardrail.item}?"

---

### Touchpoint 5: Zero Guardrail Celebration

**When:** User reports 0 for a guardrail check-in

**Purpose:** Reinforce success, connect to identities

**Model:** Haiku

**Context available:** Guardrail context, identities

**Prompt template:**

```
Generate a brief celebration (1-2 sentences) for logging zero on a guardrail.

Guardrail: {guardrail.name}
Current after this: {guardrail.current}/{guardrail.limit}
Identities protected: {guardrail.identities}

Guidelines:
- Celebrate without being over the top
- Connect to identities they're protecting
- State new count
- Keep it brief
```

**Example outputs:**
> "Zero tonight. That's Present Dad and Athletic Man both winning. Still at 2/5 for the week."

**Fallback:** "None tonight. You're at {guardrail.current}/{guardrail.limit} for the week."

---

### Touchpoint 6: Over Guardrail Limit

**When:** User logs guardrail event that puts them over limit

**Purpose:** Acknowledge without shame, provide perspective

**Model:** Sonnet

**Context available:** Guardrail context, progress history

**Prompt template:**

```
Generate a supportive response (2 sentences) for going over a guardrail limit.

Guardrail: {guardrail.name}
Now at: {guardrail.current}/{guardrail.limit}
Over by: {guardrail.current - guardrail.limit}
Recent weeks: {guardrail.lastFourWeeks}

Guidelines:
- Acknowledge factually ("That's X/Y")
- No guilt or disappointment
- Provide perspective ("one week" or historical context)
- Forward-looking ("next week is fresh")
- If they usually do well, note that
```

**Example outputs:**

*Usually does well:*
> "That's 6/5 this week—one over. You've been under limit 3 of the last 4 weeks. One week doesn't undo that."

*First time over:*
> "That puts you at 6/5. Over by one. Next week's a clean slate—what you do next matters more than this week."

**Fallback:** "That's {guardrail.current}/{guardrail.limit}. Next week is a fresh start."

---

### Touchpoint 7: Weekly Summary (Good Week)

**When:** End of week, user hit most/all targets

**Purpose:** Reinforce identity, build momentum

**Model:** Sonnet

**Context available:** All identities, blocks, guardrails, full progress

**Prompt template:**

```
Generate a brief weekly summary (3-4 sentences) celebrating a good week.

Identities: {identities}
Building blocks with status: {blocks}
Guardrails with status: {guardrails}
Notable achievements: {achievements}

Guidelines:
- Lead with the wins
- Connect behaviors to identities ("You showed up as {identity}")
- Specific, not generic praise
- End with momentum framing for next week
- Don't list everything—highlight 1-2 most meaningful
```

**Fallback:** "Strong week. You hit {X} of {Y} building blocks and stayed within all guardrails."

---

### Touchpoint 8: Weekly Summary (Tough Week)

**When:** End of week, user missed most targets

**Purpose:** Normalize, maintain connection, don't amplify negative

**Model:** Sonnet

**Context available:** All context

**Prompt template:**

```
Generate a brief weekly summary (2-3 sentences) for a tough week.

Building blocks: {blocks with status}
Guardrails: {guardrails with status}
Previous weeks: {recent history}
Any bright spots: {any completions or under-limit guardrails}

Guidelines:
- Acknowledge without dwelling ("Tough week")
- If ANY bright spot exists, mention it
- Common humanity ("these weeks happen")
- Forward-looking without pressure
- Do NOT list everything that went wrong
- 2-3 sentences max
```

**Example outputs:**

*Some bright spots:*
> "Mixed week. You hit your stretch goal even when the gym didn't happen. Weeks like this are part of the process—not a sign it's not working."

*No bright spots:*
> "Tough week. These happen to everyone building new patterns. Nothing to fix—just show up when you can this week."

**Fallback:** "Last week was tough. This week's a fresh start."

---

### Touchpoint 9: Failed Week Review — Acknowledge

**When:** 0% completion on a building block for full week

**Purpose:** Open obstacle planning conversation without judgment

**Model:** Sonnet

**Context available:** Building block, nudge history

**Prompt template:**

```
Generate an opening message (2-3 sentences) for failed week review.

Building block: {block.name}
Nudges sent: {nudgeCount}
Identity: {identity.name}

Guidelines:
- State facts neutrally ("You got X reminders")
- Normalize ("Something got in the way each time. That's normal.")
- Frame as opportunity ("Now we can figure out what's actually blocking you")
- No guilt, no "you didn't" framing
```

**Fallback:** "You got {nudgeCount} reminders for {block.name} this week. Something got in the way each time. That's normal—now we can figure out what's blocking you."

---

### Touchpoint 10: Failed Week Review — Obstacle Prompt

**When:** User taps "Let's figure it out" in failed week review

**Purpose:** Elicit internal obstacle

**Model:** Sonnet

**Prompt template:**

```
Generate a prompt (2 sentences) to help user identify their internal obstacle.

Building block: {block.name}
Trigger context: {block.triggers}

Guidelines:
- Direct them to the moment ("Think about when the reminder came")
- Ask about feelings/thoughts, not circumstances
- Keep it simple
```

**Fallback:** "Think about when those reminders came. What were you feeling or thinking that made you choose something else?"

---

### Touchpoint 11: Failed Week Review — Plan Prompt

**When:** After user enters obstacle

**Purpose:** Create if-then implementation intention

**Model:** Sonnet

**Context available:** Their stated obstacle

**Prompt template:**

```
Generate a prompt (2 sentences) to help user create an if-then plan.

Their obstacle: {block.obstacle}
Building block: {block.name}

Guidelines:
- Reflect their obstacle back
- Ask what they'll do INSTEAD when that feeling hits
- Suggest if-then format
```

**Example output:**
> "So when you get home drained and want to check your laptop—what could you do instead that breaks that pattern?"

**Fallback:** "When that feeling hits, what will you do instead?"

---

### Touchpoint 12: Streak Milestone

**When:** User hits notable streak (3, 5, 10 weeks)

**Purpose:** Celebrate without making streaks feel fragile

**Model:** Haiku

**Context available:** Block, streak count, identity

**Prompt template:**

```
Generate a brief milestone message (1-2 sentences).

Building block: {block.name}
Streak: {progress.streak} weeks
Identity: {identity.name}

Guidelines:
- Celebrate the consistency
- Connect to identity ("This is who you are now")
- Don't emphasize "don't break it"
- Frame as evidence, not pressure
```

**Example outputs:**
> "5 weeks of hitting {block.name}. That's not luck—that's {identity.name} becoming real."

**Fallback:** "{progress.streak} weeks in a row. Consistency is building."

---

### Touchpoint 13: Streak Broken

**When:** User had a streak, now missed a week

**Purpose:** Prevent what-the-hell abandonment

**Model:** Sonnet

**Context available:** Block, previous streak, identity

**Prompt template:**

```
Generate a supportive message (2 sentences) for a broken streak.

Building block: {block.name}
Previous streak: {progress.previousStreak} weeks
Identity: {identity.name}

Guidelines:
- Acknowledge the streak existed and mattered
- Frame this week as data, not failure
- Research shows: people who slip and continue succeed at same rate as those who never slip
- Forward-looking
```

**Example outputs:**
> "You had 4 weeks going. One off week doesn't erase that—it's still in you. This week's a chance to start another run."

**Fallback:** "Streak ended at {progress.previousStreak} weeks. That consistency is still in you—this week's a fresh start."

---

### Touchpoint 14: Tiny Habit Suggestion

**When:** User selects "It's too big right now" in re-review flow

**Purpose:** Generate smaller, achievable versions of their building block

**Model:** Sonnet

**Context available:** Building block, identity, outcome, recent failure history

**Prompt template:**

```
Generate 2-3 "tiny habit" versions of this building block. Each should be:
- Significantly easier (50-75% reduction in effort/frequency)
- Still meaningful to the identity
- Concrete and measurable

Original block: {block.name}
Identity: {identity.name}
Their outcome: {block.outcome}
Recent weeks: 0% completion for 2+ weeks

Guidelines:
- Reduce frequency OR reduce effort, not necessarily both
- Keep the core behavior recognizable
- Make it almost impossible to fail
- Suggest options at different difficulty levels
- Format: Return 2-3 bullet points, each a complete building block name

Research: BJ Fogg's Tiny Habits research shows that smaller behaviors that "fit" into existing routines are more likely to become automatic.
```

**Example outputs:**

*For "Exercise 4x/week":*
> • Move my body 2x this week
> • One gym session—any length
> • 15-minute walk on gym days

*For "2hr deep work daily":*
> • 30 minutes of focused work daily
> • One deep work session per day (any length)
> • Phone away for first hour of workday

**Fallback:** "What's the smallest version that would still count? Even 5 minutes or once per week?"

---

### Touchpoint 15: Trigger Discovery

**When:** User taps "Help me find triggers" during trigger input

**Purpose:** Surface existing habits the user can stack onto

**Model:** Sonnet

**Context available:** Building block, identity, frequency needed

**Prompt template:**

```
Help the user identify existing habits they could stack a new behavior onto.

New building block: {block.name}
Frequency needed: {block.frequency}
Identity: {identity.name}

Ask 2-3 questions to surface existing routines:
- What do you already do every [morning/day/week] without thinking?
- What's something that happens right before you'd want to do {block.name}?
- Where are the natural transition moments in your day?

Then suggest 2-3 specific "After I [existing habit], I will [new behavior]" triggers.

Guidelines:
- Focus on behaviors they already do automatically (coffee, brushing teeth, leaving work)
- Match frequency needed (daily habits for daily blocks, weekly events for weekly blocks)
- Be specific about the trigger moment ("after I close my laptop" not "after work")
- Research shows "After I X, I will Y" format is more effective than time-based triggers
```

**Example interaction:**

AI: "What do you already do every morning without thinking about it?"

User: "I make coffee, check my phone, then take a shower."

AI: "Those are perfect anchor points. Here are some triggers for Exercise 4x/week:
• After I finish my morning coffee, I put on gym clothes
• After I take my morning shower, I grab my gym bag
• After I check my phone in the morning, I open the gym app to commit"

**Fallback:** "What's something you do every day without thinking? We can attach your new habit to that."

---

### Touchpoint 16: Trigger Feedback (Habit Stacking Enhanced)

**When:** After user enters triggers during onboarding or editing

**Purpose:** Evaluate trigger strength with emphasis on behavior-anchoring

**Model:** Haiku

**Context available:** Entered triggers, building block

**Prompt template:**

```
Evaluate these triggers for habit stacking strength.

Building block: {block.name}
Entered triggers: {triggers}

Rate each trigger:
✓ Strong: Anchored to existing behavior ("after I", "when I finish", "before I")
⚠ Weak: Time-only ("Tuesday at 9am"), vague time ("in the morning"), or location-only ("at the gym")

For weak triggers, suggest how to make them stronger by anchoring to a behavior.

Guidelines:
- "After I" or "Before I" triggers are strongest
- Time-only triggers are easy to ignore
- "After work" is vague—what specific action signals end of work?
- Suggest the behavior anchor: "What are you already doing at that time?"
```

**Example feedback:**

*Time-only trigger:* "Tuesday at 9am"
> ⚠️ "Times alone are easy to ignore. What are you already doing around 9am on Tuesday that could trigger this?"

*Vague trigger:* "In the morning"
> ⚠️ "Which morning moment? 'After I finish my coffee' or 'After I brush my teeth' would be stronger."

*Good but improvable:* "After work on Wednesday"
> ⚠️ "What signals 'end of work' for you? 'After I close my laptop' or 'After I leave the office' would be stronger."

*Strong trigger:* "After I drop Aurelia at school and get back in the car"
> ✓ "Strong trigger—anchored to something you already do."

**Fallback:** "Consider anchoring to something you already do: 'After I [existing habit], I will [new behavior]'"

---

### Touchpoint 17: Never Miss Twice Recovery (Feature 05)

**When:** After 1 consecutive miss detected (end of day processing)

**Purpose:** Prompt recovery without guilt

**Model:** Haiku

**Context available:** Block, consecutive_misses count, identity

**Prompt template:**

```
Generate a brief recovery nudge (1 sentence) for a missed building block.

Building block: {block.name}
Consecutive misses: {block.consecutiveMisses}
Identity: {identity.name}
Their outcome: {block.outcome}

Guidelines:
- Focus on "bounce back" not "you missed"
- Reference their outcome if available
- Make it easy to say yes
- No guilt or disappointment
- Research: "Never miss twice" from Atomic Habits
```

**Example outputs:**

*First miss:*
> "Yesterday didn't happen. Today's a chance to bounce back. Gym time?"

*With outcome:*
> "One miss—that's normal. Remember that energy you get from workouts? Today?"

**Fallback:** "Yesterday's behind you. Today's a fresh chance for {block.name}."

---

### Touchpoint 18: Bad Day Offer (Feature 06)

**When:** After skip + 2 consecutive misses (proactive offer)

**Purpose:** Offer minimum version to break the miss pattern

**Model:** Haiku

**Context available:** Block, bad_day_version, consecutive_misses

**Prompt template:**

```
Generate a supportive offer (2 sentences) for the bad day version of a building block.

Building block: {block.name}
Bad day version: {block.badDayVersion}
Consecutive misses: {block.consecutiveMisses}

Guidelines:
- Acknowledge they're having a tough time without dwelling
- Present the minimum as a legitimate win
- "Something > nothing" framing
- Make it feel like a smart choice, not a failure
```

**Example outputs:**

*Standard:*
> "Tough few days. How about the minimum: {block.badDayVersion}? Something is always better than nothing."

*With identity:*
> "Even 15 minutes of movement keeps Athletic Man alive. Want to do the minimum today?"

**Fallback:** "On tough days, even {block.badDayVersion} counts. Want to do that instead?"

---

### Touchpoint 19: Getting Started Nudge (Feature 09)

**When:** At scheduled trigger time (primary nudge)

**Purpose:** Prompt action with variety—never repeat same message within 5-7 nudges

**Model:** Haiku

**Context available:** Block, identity, trigger, recent_nudges (for variety)

**Prompt template:**

```
Generate a brief getting started nudge (1 sentence) for this building block.

Building block: {block.name}
Identity: {identity.name}
Trigger context: {time.triggerContext}
Progress this week: {progress.currentWeek}/{progress.targetWeek}

VARIETY REQUIREMENT:
Recently used nudges for this block (DO NOT REPEAT):
{recent_nudges}

Generate a fresh variation. Options:
- Question format ("Gym time?")
- Identity framing ("Athletic Man moment")
- Micro-action focus ("Just put on your shoes")
- Progress reference if close ("One more for 4/4")
- Trigger acknowledgment ("Drop-off done. What's next?")
```

**Example outputs (variety):**

> "It's after drop-off. Time to move?"
> "Athletic Man moment: gym?"
> "Just start with your shoes. The rest follows."
> "One more this week hits your target. Ready?"
> "Aurelia's at school. You know what's next."

**Fallback:** "{time.triggerContext}. Time for {block.name}?"

---

### Touchpoint 20: Night-Before Reminder (Feature 10)

**When:** Evening before a trigger day (e.g., 8pm before Tuesday gym)

**Purpose:** Prompt condition setup for tomorrow's success

**Model:** Haiku

**Context available:** Block, conditions, tomorrow's trigger

**Prompt template:**

```
Generate a brief prep reminder (1 sentence) for tomorrow's building block.

Building block: {block.name}
Conditions needed: {block.conditions}
Tomorrow's trigger: {tomorrow.triggerContext}

Guidelines:
- Reference their specific conditions
- Frame as "setting up success" not "don't forget"
- Keep it practical
```

**Example outputs:**

> "Gym tomorrow after drop-off. Bag packed?"
> "Tomorrow's deep work session—headphones and phone-free zone ready?"

**Fallback:** "Tomorrow: {block.name}. Is {block.conditions} ready?"

---

### Touchpoint 21: Previsualization Nudge (Feature 13)

**When:** Morning (after Getting Started nudge, ~30 min later)

**Purpose:** Help user visualize completing today's blocks successfully

**Model:** Haiku

**Context available:** Today's blocks, outcomes, identity

**Prompt template:**

```
Generate a brief previsualization prompt (1-2 sentences) for today's building blocks.

Today's blocks: {todaysBlocks}
Their outcomes: {outcomes}
Identity: {identity.name}

Guidelines:
- Focus on how they'll FEEL after completing (not what they'll do)
- Reference their stated outcomes if available
- End of day framing ("Imagine tonight...")
- Visual, sensory language
- Keep brief—don't overwhelm
```

**Example outputs:**

*With outcome:*
> "Imagine tonight: workout done, that post-gym energy, ready to play with Aurelia. That's the Athletic Man you're building."

*Without outcome:*
> "Picture tonight: 2 hours of deep work behind you. How does that focus feel?"

**Fallback:** "Picture tonight: {block.name} done. How good does that feel?"

---

### Touchpoint 22: Block Built Confirmation (Feature 07)

**When:** Immediately after logging a building block completion

**Purpose:** Reinforce identity with "block" terminology

**Model:** Haiku

**Context available:** Block, identity, progress

**Prompt template:**

```
Generate a brief confirmation (1 sentence) using "block" terminology.

Building block: {block.name}
Identity: {identity.name}
Progress: {progress.currentWeek}/{progress.targetWeek}
Is target hit: {progress.isComplete}

Guidelines:
- Use "block" language ("That's a block for...")
- Connect to identity
- If target hit, celebrate without being over-the-top
- Brief, affirming
```

**Example outputs:**

*Normal progress:*
> "That's a block for Athletic Man. {progress.currentWeek}/{progress.targetWeek} this week."

*Target hit:*
> "{progress.targetWeek}/{progress.targetWeek}. You said you'd do it. You did it. That's Athletic Man."

*Close to target:*
> "That's {progress.currentWeek}/{progress.targetWeek}. One more block and you've hit your goal."

**Fallback:** "Got it. That's a block for {identity.name}."

---

### Touchpoint 23: WOOP Reflection Escalation (Feature 08)

**When:** User exceeds guardrail limit for 2+ consecutive weeks

**Purpose:** Deeper reflection without shaming—initiate WOOP obstacle finding

**Model:** Sonnet

**Context available:** Guardrail, weeks_over_limit, identities affected

**Prompt template:**

```
Generate an empathetic opening (2-3 sentences) for a WOOP reflection flow.

Guardrail: {guardrail.name}
Weeks over limit: {guardrail.weeksOverLimit}
Identities affected: {guardrail.identities}
Their why: {guardrail.whyStatement}

Guidelines:
- Acknowledge the pattern without judgment
- Reference their "why" if available
- Open the door to exploring what's happening
- Frame as understanding, not fixing
- Do NOT use guilt or disappointment language
```

**Example outputs:**

*With why:*
> "That's two weeks over your beer limit. You set it for clear mornings with Aurelia. Something's pulling against that—want to figure out what?"

*Without why:*
> "Two weeks at 6+. No judgment—but there's probably something going on. Worth a few minutes to explore what's making it hard?"

**Fallback:** "That's {guardrail.weeksOverLimit} weeks over your limit. Want to figure out what's getting in the way?"

---

## Model Selection

| Touchpoint | Model | Rationale |
|------------|-------|-----------|
| Building Block Nudge | Haiku | Fast, simple copy |
| Missed Nudge Response | Haiku | Fast, simple copy |
| Guardrail Opening Check-in | Haiku | Fast, simple copy |
| Guardrail Closing Check-in | Haiku | Fast, simple copy |
| Zero Guardrail Celebration | Haiku | Fast, simple copy |
| Over Guardrail Limit | Sonnet | Sensitive, needs nuance |
| Weekly Summary (Good) | Sonnet | More complex synthesis |
| Weekly Summary (Tough) | Sonnet | Sensitive, needs nuance |
| Failed Week Review — Acknowledge | Sonnet | Sensitive conversation |
| Failed Week Review — Obstacle | Sonnet | Sensitive conversation |
| Failed Week Review — Plan | Sonnet | Sensitive conversation |
| Streak Milestone | Haiku | Fast, simple copy |
| Streak Broken | Sonnet | Sensitive, needs nuance |
| Tiny Habit Suggestion | Sonnet | Needs creative generation |
| Trigger Discovery | Sonnet | Conversational, needs context |
| Trigger Feedback | Haiku | Fast evaluation feedback |
| Never Miss Twice Recovery | Haiku | Fast, encouraging copy |
| Bad Day Offer | Haiku | Fast, supportive copy |
| Getting Started Nudge | Haiku | Fast, variety-driven copy |
| Night-Before Reminder | Haiku | Fast, practical copy |
| Previsualization Nudge | Haiku | Fast, visualizing copy |
| Block Built Confirmation | Haiku | Fast, affirming copy |
| WOOP Reflection Escalation | Sonnet | Sensitive, needs nuance |

---

## Caching Strategy

| Copy Type | Pre-generate When | Cache Duration | Invalidate When |
|-----------|-------------------|----------------|-----------------|
| Nudges | Daily scheduling job (morning) | 24 hours | User updates block/triggers |
| Guardrail check-ins | Start of temptation window | Until end of window | User updates guardrail |
| Weekly summaries | Sunday evening | 7 days | — |
| Failed week review | On trigger | Session | User completes review |
| Streak messages | On milestone detection | 24 hours | — |
| Getting Started nudges | Pre-generate 5-7 variations | 7 days | After used in rotation |
| Previsualization nudges | Morning of | Same day | — |
| Block Built confirmations | On completion | Immediate | — |

### Nudge Variety System (Feature 09)

To prevent repetitive nudges:

1. **Track recent nudges** in NudgeHistory table
2. **Store last 5-7 nudges** per building block
3. **Check before generating** — pass recent_nudges to AI prompt
4. **Never repeat** within the tracking window
5. **Rotate through styles** — question, identity, micro-action, progress, trigger

---

## Latency Requirements

| Context | Target | Fallback Trigger |
|---------|--------|------------------|
| Push notification copy | Pre-generated (0ms) | Always pre-generate |
| In-app responses | < 500ms | Use fallback if exceeded |
| Weekly summaries | Async (notify when ready) | Template summary |

---

## Fallback Hierarchy

1. Cached AI response
2. Real-time AI generation (if < 500ms)
3. Template fallback with variable substitution
4. Static generic fallback

---

## Data Model

### AIGeneratedCopy

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| userId | UUID | User this was generated for |
| touchpointType | Enum | One of the 16 touchpoint types |
| entityId | UUID? | Building block or guardrail ID if applicable |
| contextSnapshot | JSON | Context used to generate (for debugging) |
| generatedCopy | String | The AI-generated text |
| model | String | Model used ("haiku" or "sonnet") |
| generatedAt | Timestamp | When generated |
| usedAt | Timestamp? | When shown to user |
| wasFallback | Bool | Whether fallback was used |

---

## Testing & Iteration

### Copy Review Process

1. Log all generated copy with context
2. Weekly review of sample outputs
3. Flag any that violate tone guidelines
4. Adjust prompts based on patterns

### Metrics

| Metric | Target |
|--------|--------|
| Fallback rate | < 5% |
| Generation latency p95 | < 400ms |
| Tone violations (manual review) | < 1% |

---

## Research Basis

- **Self-compassion framework:** Neff, K. (2003). Self-compassion: An alternative conceptualization of a healthy attitude toward oneself. *Self and Identity*.
- **Self-compassion and motivation:** Breines & Chen (2012). Self-compassion increases self-improvement motivation. *Personality and Social Psychology Bulletin*.
- **What-the-hell effect:** Polivy & Herman (1985). Dieting and binging: A causal analysis. *American Psychologist*.
