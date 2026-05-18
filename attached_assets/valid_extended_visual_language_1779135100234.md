# Valid
## Extended Visual Language System
### Volumes I & II — Chapters 01–24

*The space between knowing and responding. Every design choice either earns its place or gets cut.*

---

**Method:** Four-persona strategic audit  
**Versions:** Social (Real Talk) · Professional (Therapeutic Connections)  
**Governing rule:** Nothing survives unless all four voices approve it  
**Governing question:** Does this belong to Valid, or does it belong to someone else?

---

## Volume I — Chapters 01–12

---

## 01 — Spatial System

### The 8-unit grid

Every measurement in the Valid system is a multiple of 8px. No exceptions. This is not convention — it is a decision about respect. Precise spacing signals that the space between elements was considered as carefully as the elements themselves.

**Grid:** 12-column · 16px gutters · Content max-width 1100px · Page margins 64px

### Spacing Scale

| Token | Value | Primary Use |
|-------|-------|-------------|
| `--space-xs` | 8px | Internal component padding, icon gaps |
| `--space-sm` | 16px | Label-to-content, tight groupings |
| `--space-md` | 24px | Card internal padding, form field gaps |
| `--space-lg` | 32px | Section sub-elements, component spacing |
| `--space-xl` | 48px | Between major components within a section |
| `--space-2xl` | 64px | Section margins, page-level padding |
| `--space-3xl` | 96px | Section-to-section breathing room |

**Rule:** No measurement outside this scale appears anywhere in the system. Not 20px. Not 36px. Not 10px. The grid is the constraint that makes everything feel like it belongs together.

---

## 02 — The Mark

### The wordmark in full

Valid has no logomark. The wordmark is the mark. Cormorant Garamond Semibold at −0.025em tracking. The descender of the 'd' defines the character. The space after the wordmark is always exactly one 'V' width.

### Anatomy

- **Typeface:** Cormorant Garamond 600
- **Tracking:** `letter-spacing: -0.025em`
- **Minimum size:** 16px (print: 5mm)
- **Clear space:** 1× x-height on all sides
- The baseline, cap height, and right edge define the three reference lines

### Approved Colour Applications

| Context | Background | Wordmark colour |
|---------|-----------|-----------------|
| Primary | Parchment `#F2EDDF` | Ground `#1A1814` |
| Reversed | Ground `#1A1814` | Parchment `#F2EDDF` |
| CTA field | Ember `#C4882A` | Ground `#1A1814` |
| Deep accent | Resin `#6B3D2E` | Parchment `#F2EDDF` |

### Hard Rules

- **Never stretch.** Uniform scaling only. No condensing, no extending.
- **Never rotate.** The wordmark is always horizontal.
- **Never outline.** Filled only. Never outline or shadow.
- **Never lock up** with a tagline — the wordmark stands alone.
- **Never apply** over photography unless Ground or Parchment field is placed between them.

---

## 03 — The Ruling Line

### Structure made visible

The ruling line is Valid's primary structural motif. Before any icon, illustration, or image — the line. Six weights. Three colours. Each with a singular designated use. Never applied casually. Never mixed within a single surface.

### The Six Lines

| Name | Weight | Colour | Approved use |
|------|--------|--------|--------------|
| Whisper | 0.5px | Ground 8% | Table rows, grid lines, background texture |
| Standard | 1px | Ground 15% | Component borders, section separators |
| Heavy | 1px | Ground 25% | Hierarchy breaks, grouped sections |
| Ember accent | 2px | Ember full | Primary division, card top edge, CTA above-line |
| Ember trace | 1px | Ember 45% | Quote attribution, label underline, caption rule |
| Tide accent | 2px | Tide full | Professional version card top edge only |

### Context Rules

- On Parchment surfaces: Ember 2px divides. Ground 1px 15% separates. Rules carry hierarchy without weight.
- On Ground surfaces: Tide 2px marks professional context. Parchment 7% for section rules.
- The Ember accent rule and the Tide accent rule never appear on the same surface.
- Rules are always full-width within their container. Partial rules are not permitted.

---

## 04 — Pattern Language

### Texture without decoration

Valid uses pattern as structure, not ornament. Six approved patterns — each generated from the same geometric vocabulary as the ruling line. No blobs. No gradients. No organic forms. Pattern is what the grid looks like when it becomes surface.

### The Six Patterns

**Rule Matrix**
Horizontal and vertical lines at 32px pitch. Ground 6% opacity. Used for page backgrounds and subtle structural scaffolding. The ambient texture of the brand.

**Card Back — Social**
−45° diagonal hatching. 14px pitch. Parchment 3.5% on Ground. Central wordmark ghost at 6% opacity. Signals the Social version when face-down on the table.

**Dot Field**
Radial gradient dots at 20px pitch. Ground 15% on Parchment. Used for secondary panels and empty states. Less structured than the Rule Matrix — used for surfaces where content is absent.

**Ember Wash**
Horizontal lines at 32px pitch. Ember 8% on Parchment pale. Used for call-to-action fields, callout backgrounds, and highlight zones. Never used as a page background.

**Card Back — Professional**
+45° diagonal hatching. 12px pitch. Tide 8% on Ground. Central diamond motif in Tide 12%. Signals the Professional version when face-down.

**Column Rule**
Vertical rule at every 80px. Ember 15% on Parchment. Used for multi-column editorial layouts and instruction booklet spreads.

### Usage Rules

- Patterns are structural, not decorative. They appear when the layout requires organisation, not when it requires interest.
- No two patterns appear on the same surface simultaneously.
- The Card Back patterns are fixed — they cannot be substituted with any other pattern.

---

## 05 — Typography as Image

### The type is the image

Valid has no illustrations. No stock photography. No abstract figures. Cormorant Garamond at scale is the brand imagery. The word is the picture. The sentence is the composition. Type is not placed on a layout — the layout is built around it.

### Hero Typography Principles

Large-scale Cormorant always appears across multiple lines, never on one. The composition uses three layers:

1. **Drift layer** — ghost text at Parchment 35% sets the visual depth
2. **Full-weight layer** — the primary statement in Parchment or Ground
3. **Italic ember layer** — the turn, the qualifying phrase, the emotional pivot

The rule between layers is always 2px Ember, 64px wide, aligned left.

### Approved Type-as-Image Compositions

| Context | Typeface | Weight | Size range | Colour |
|---------|----------|--------|------------|--------|
| Brand hero (dark field) | Cormorant Garamond | 600 | 64px–140px | Parchment |
| Hero italic (dark field) | Cormorant Garamond | 400 italic | Same scale | Ember |
| Ghost layer (dark field) | Cormorant Garamond | 600 | Same scale | Parchment 35% |
| Brand hero (light field) | Cormorant Garamond | 600 | 64px–104px | Ground |
| Scenario text (any) | Cormorant Garamond | 400 italic | 18px–24px | Ground / Parchment |

### Editorial Panel System

Four panel types, always used in 2×2 grids:

- **Parchment panel** — Ground text on Parchment background. Primary reading surface.
- **Ground panel** — Parchment text on Ground. Clinical / professional register.
- **Ember-pale panel** — Ground text on Ember pale. Callout and acquisition register.
- **Ember panel** — Ground text on Ember. CTA and instruction register.

---

## 06 — Label System

### Everything named precisely

Labels are how Valid communicates context without disrupting flow. Every scenario, every version, every round has a label. Labels are always small caps, always tracked, always in a designated colour role. They never exceed three components.

### Label Anatomy

```
DEPRESSION · SCENARIO 04 · FAMILY CIRCLE
└──────────┘ └──────────┘ └────────────┘
 Category     Scenario     Pathway
```

Three segments maximum. Midpoint · separator in Drift 40% opacity. All components in the same size and weight. Never more than one colour within a label chain.

### Label Type Specification

- **Typeface:** DM Sans 500
- **Size:** 10–11px
- **Case:** Uppercase
- **Tracking:** 0.15–0.22em
- **Leading:** Not applicable — labels are single-line only

### Label Colour Roles

| Colour | Use |
|--------|-----|
| Ember | Social version tag, scenario categories, primary metadata |
| Tide | Professional version tag, clinical level designations |
| Drift | Neutral metadata, round numbers, pathway names |
| Ground filled | Level designations (Basic / Intermediate / Advanced / Master) |
| Resin | Expansion pack tags only |

### Phase Markers

Phase markers use lining figures (Cormorant Garamond), not words. Phase 01 not Phase One in UI contexts. The number is the marker. DM Sans in running text.

---

## 07 — Card Anatomy

### The primary object

63 × 88mm. Poker card dimensions. Every proportion decision flows from this surface. Four states: face, back, active response, completed. Two versions: Social and Professional. The card back signals which version is in play — it is not decorative.

### Physical Specifications

| Property | Specification |
|----------|--------------|
| Size | 63 × 88mm |
| Ratio | 2.5 : 3.5 |
| Corner radius | 0mm — sharp corners |
| Weight | 350gsm black-core |
| Finish (Social) | Linen texture |
| Finish (Professional) | Smooth matte |
| Top accent rule | 1.5mm height |
| Internal padding | 7mm all sides |
| Bleed | 3mm all sides |

### Typographic Zones

| Zone | Position | Typeface | Size |
|------|----------|----------|------|
| Version tag | Top, flush left | DM Sans 500 · uppercase | 8pt |
| Category | Mid, before scenario | DM Sans 400 · uppercase | 7pt |
| Scenario | Mid body · flex | Cormorant 400 italic | 9pt |
| Instruction | Bottom, ruled above | DM Sans 500 · uppercase | 6pt |
| Corner mark | Bottom right · 5×5mm | Geometric square | — |

### Version Differentiation

| Element | Social Version | Professional Version |
|---------|---------------|---------------------|
| Background | Parchment `#F2EDDF` | Ground `#1A1814` |
| Top accent rule | Ember `#C4882A` · 1.5mm | Tide `#3D6B65` · 1.5mm |
| Version tag colour | Ember | Tide |
| Category label | Drift | Drift (reversed on Ground) |
| Scenario text | Cormorant 400 italic | Cormorant 400 italic |
| Card back pattern | −45° hatch · Parchment 3.5% | +45° hatch · Tide 8% |
| Corner mark | Ground 20% | Parchment 15% |

### Card States

**Face — unread:** Full opacity. Category and scenario visible. Instruction line present.

**Face — in response:** The instruction zone background shifts to Ember pale with a left Ember 2px accent. The player's written response appears in Cormorant italic.

**Completed:** A Drift trace rule appears above the version tag. The card does not change colour — completed state is indicated by position (face-down), not by the card's surface.

---

## 08 — Motion Language

### The pause before movement

Valid's motion principle mirrors its core insight: the response that comes too fast is the response that comes from instinct, not skill. Animation is deliberate. Transitions are measured. Nothing flickers or bounces. Motion in Valid is always toward stillness.

### Duration Tokens

| Token | Duration | Easing | Use |
|-------|----------|--------|-----|
| Immediate | 120ms | ease-out | Hover states, micro-feedback, button press |
| Considered | 240ms | ease-out | Panel reveals, label transitions, tab changes |
| Deliberate | 480ms | spring (0.16, 1, 0.3, 1) | Card flip, content entrance, modal open |
| Ceremonial | 800ms | spring (0.16, 1, 0.3, 1) | Page transitions, score reveal, session start |

### Easing Curves

- **ease-out** — Entrances. The element arrives at speed and decelerates into rest.
- **ease-in** — Exits. The element accelerates away; it does not linger.
- **spring (0.16, 1, 0.3, 1)** — Card reveals and milestone moments. Slight overshoot, immediate settle.
- **linear** — Progress bars and score counters only.

### What Moves

- Card reveal: back → face (flip · 480ms spring)
- Response options entering the frame (staggered · 240ms ease-out each)
- Score counter incrementing (120ms per digit · immediate)
- Page transitions between rounds (800ms spring)
- Connection point tokens tallying (240ms · one at a time)
- Text reveal on scenario cards (fade up · 480ms ease-out)

### What Never Moves

- The wordmark — always static
- Ruling lines — never animate, never transition
- Labels and version tags — appear immediately, no entrance
- The grid — invisible infrastructure, never moves
- Parchment/Ground backgrounds — no parallax, no shift
- Typography at rest — no looping animations on body text

---

## 09 — Digital Expressions

### Screen faithfully

Digital Valid is the same brand as physical Valid. No separate digital identity. The card is still the card. The grid is still the grid. Web and mobile surfaces translate the card face to screen without adding anything that doesn't exist in the physical object.

### Web Principles

- Navigation: Ground background · Parchment wordmark · Drift links · Ember active state
- Hero: Dark surface (Ground) · Cormorant display at 80px+ · Ember italic for the pivot phrase
- Card strips: Horizontal scroll of card faces in miniature — the brand's primary image format online
- CTAs: Ember fill · Ground text · DM Sans 500 · 0.15em tracking · uppercase

### Mobile Principles

- Single card, full-bleed within screen padding
- Card top accent rule visible at scroll — always 2px, always Ember or Tide
- Phase indicator: numbered squares (DM Sans) not words
- Response input: Cormorant italic, Ember top border, Ember pale background — the only textarea that looks different from all other inputs
- Bottom action bar: Ghost button (Back) · Primary (Next) — equal height, full width, 2-column

### Breakpoints

| Name | Width | Behaviour |
|------|-------|-----------|
| Mobile | < 480px | Single column · cards full width · navigation collapses |
| Tablet | 480–860px | 2-column grid · navigation visible |
| Desktop | > 860px | 12-column grid · max-width 1100px centred |

---

## 10 — Physical Expressions

### The object in hand

Valid is a physical game. The box is not packaging — it is the brand's first impression. The instruction booklet is not documentation — it is an editorial piece. Physical expressions must earn the same scrutiny as digital ones.

### Box (Social Version)

- **Exterior:** Ground background · Ember top rule 3mm · Wordmark at 96px · Version tag in Ember small caps
- **Tagline beneath wordmark:** Cormorant 400 italic · Parchment 45% · "The response that holds under pressure."
- **Background texture:** Rule Matrix at 48px pitch · Parchment 4%
- **Side panel (Parchment):** Component list, player count, play time · Ember 2px top rule

### Instruction Booklet

The booklet is a 2-colour editorial piece. Ground and Ember only — no full CMYK. This is not a cost decision. It is a visual decision. 2-colour printing at this scale looks typeset. Full colour would look printed.

- **Cover:** Ember top rule 2px · Wordmark in Ground · Subtitle Cormorant italic
- **Opening spread:** Full-bleed Ground · Ember rule divider · Cormorant 32px body text
- **Phase instructions:** Numbered with Cormorant lining figures 32px Ember · DM Sans 13px body
- **Quote pulls:** Cormorant 20px italic · Left border 2px Ember · Indent 20px

---

## 11 — Typographic Marks

### Valid uses no icons

Icons perform meaning. Typographic marks carry it. The em dash, the midpoint, the rule, the number — these are Valid's vocabulary for navigation, emphasis, and instruction. Every icon need is solved typographically first.

### The Approved Marks

| Mark | Name | Use |
|------|------|-----|
| — | Em dash | Pause in copy. The brand's defining typographic personality. |
| · | Midpoint | Label separator. Three components per label maximum. |
| 01 | Lining figures (Cormorant) | Phase numbers, scenario numbers, score display. |
| → | Arrow | CTA only. Never decorative. Always implies forward motion. |
| " " | Curly quotes | Scenario text. Always curly. Never straight. |
| × | Multiplication | Spatial token notation (8×). Never decorative. |

### Rules

- Never use → as decoration. It means: go here, do this.
- Never use — mid-sentence without intention. The em dash in Valid copy is always a beat, a pivot, a consequence. If you can remove it, remove it.
- Numbers are always Cormorant Garamond when displayed at scale. DM Sans when used at body size in running text.
- No emoji appears anywhere in any brand-level touchpoint.

---

## 12 — Image Direction

### When an image is required

Valid's default position is no photography. Type is the image. When photography appears — in editorial contexts, research documentation, press — it follows five rules that keep it from sliding into wellness brand territory.

### Never Use

- Soft-lit, photogenic people in comfortable environments (aspirational calm)
- Nature, plants, sunrise, abstract light, fog (environmental metaphor)
- Hands holding flowers, books, or coffee (comfort prop)
- Any image that could appear in a meditation app
- Posed groups looking at each other with warm expressions

### When Photography Appears

**The object in context.** Cards on a table. Hands mid-game. The product doing its job. Never posed. Always in progress. These are product photographs, not lifestyle photographs.

**Product close-up.** Macro on a single card face. The scenario text readable. The Ember accent rule visible. The corner mark in frame.

### Treatment

When photography is used, it is treated in one of two ways:

1. **Duotone:** Ground + Parchment. The photograph becomes a texture beneath the type.
2. **Ground overlay:** Full colour with Ground gradient overlay (transparent at top, 70% at bottom). The type always reads on top.

The photograph never competes with the type. It recedes into structure.

### The Rule

> If the layout works without a photograph, do not add one. Typography at scale is the brand image. Adding photography is always a cost, not a benefit.

---

## Volume II — Chapters 13–24

---

## 13 — Response Spectrum System

### Three tiers. One direction.

Every scenario card has three response options. The three-tier spectrum is not a right/wrong binary — it is a visual gradient from counterproductive to skillful. The design must communicate this gradient instantly, before the text is read. Colour does the primary work. Type confirms it.

### Tier 01 — The Wall

**Colour:** `#F5EDED` pale · `#C45050` left accent 3px  
**Number colour:** `#C45050`  
**What it is:** Sounds kind. Creates distance. The response instincts reach for before training.

> "I'm sure it's just the stress talking. Things will look better in the morning — you've got this."

**Why it fails:** Minimises the experience before the feeling is acknowledged. DBT research: logical challenge increases entrenchment, not reconsideration. Reassurance that arrives before acknowledgment lands as invalidation.

---

### Tier 02 — The Bridge

**Colour:** Ember pale `#FBF4E8` · Ember left accent 3px  
**Number colour:** Ember `#C4882A`  
**What it is:** Acknowledges the experience. Keeps the connection. Does not fix, does not minimise.

> "I'm here. Do you want to talk, or do you just want company right now? Either is fine — I'm not going anywhere."

**Why it works:** Leads with presence, not advice. Offers a binary choice that removes decision pressure from someone already overwhelmed. The emotional experience is met without touching the factual content of the distress.

---

### Tier 03 — The Reach

**Colour:** `#EBF4EF` pale · `#4A8C6A` left accent 3px  
**Number colour:** `#4A8C6A`  
**What it is:** Does everything Tier 02 does — and adds a careful, non-pressuring acknowledgment of professional support when the disclosure warrants it.

> "I'm coming over. You don't have to say anything. I just want to be there. And when you're ready — no pressure, no timeline — I'd love to help you find someone trained for this. Not because I can't listen. Because you deserve more than I can give."

**Why it works:** Physical presence is the strongest possible validation signal. The professional referral is framed as abundance, not inadequacy.

---

### Tier Colour System

| Element | Tier 01 | Tier 02 | Tier 03 |
|---------|---------|---------|---------|
| Background | `#F5EDED` | `#FBF4E8` | `#EBF4EF` |
| Left accent | `#C45050` · 3px | Ember · 3px | `#4A8C6A` · 3px |
| Number | Cormorant 600 · `#C45050` | Cormorant 600 · Ember | Cormorant 600 · `#4A8C6A` |

> **Note:** Over-R (`#C45050`) and Over-G (`#4A8C6A`) are tier-only colours. They do not appear in the core brand palette and are never used outside the response spectrum context.

---

## 14 — Colour Accessibility

### Contrast that holds under pressure

Valid's primary pairings were not chosen for accessibility compliance — they were chosen because they were right. The compliance followed. Where contrast falls below AA for body text, an alternative pairing is mandated.

### Contrast Ratios

| Pairing | Ratio | Rating | Use |
|---------|-------|--------|-----|
| Ground on Parchment | 14.2 : 1 | AAA | Primary text — all body copy |
| Parchment on Ground | 14.2 : 1 | AAA | Reversed text — professional surfaces |
| Ground on Ember | 4.8 : 1 | AA | CTA text only |
| Ember on Ground | 4.8 : 1 | AA | Accent text, large sizes only (≥18px) |
| Drift on Parchment | 3.4 : 1 | Fail (body) | Labels ≥18px only |
| Parchment on Tide | 5.1 : 1 | AA | Professional version only |
| Ground on Ember Pale | 13.1 : 1 | AAA | Callout backgrounds |
| Parchment on Resin | 8.6 : 1 | AAA | Limited accent uses |

### The Drift Rule

Drift (`#9A9488`) on Parchment fails WCAG AA for body text (3.4:1). Drift is approved for use only in labels and metadata at 14px+ with letter-spacing applied, or at 18px+ in any context.

For body-sized metadata, use **Ground at 40% opacity** (effective ratio 7.2:1) instead of Drift directly. This rule applies to all versions, all surfaces, without exception.

---

## 15 — Score System

### Measuring what matters

Valid does not score right answers. It scores depth of reasoning, quality of reflection, and growth between Phase One and Phase Three. The visual system for scoring must communicate this immediately — numbers are secondary to the categories that produced them.

### The Four Categories

| Category | Weight | What it measures |
|----------|--------|-----------------|
| Therapeutic Response | 30% | How well the response maintains the person's experience while preserving relationship integrity |
| Relational / Clinical | 30% | How effectively background understanding informs appropriate, evidence-grounded response choices |
| Cultural Awareness | 20% | How thoughtfully the response incorporates cultural and contextual factors |
| Safety Assessment | 20% | How appropriately the response addresses immediate risk while building long-term support |

**100 points per scenario.** Points distributed across the four categories above.

### Milestone System

| Milestone | Condition |
|-----------|-----------|
| **Connected** | All four categories score above 80 across three consecutive rounds |
| **Instinct Updated** | Phase One response improves by 2+ tiers across 3 scenarios |
| **Full Presence** | Tier 03 response produced naturally in Phase One of any round |
| **Clinical Facilitator** | Exceptional growth demonstrated + peer support given during session |

### Score Visual Language

- **Counter display:** Cormorant Garamond 600 at 96–112px · DM Sans 300 for the unit label ("pts")
- **Progress bar:** 2px Ember fill on Ground 8% track · No border-radius
- **Category breakdown:** DM Sans small caps labels · Cormorant 24px values
- **Milestone cards:** Same geometry as scenario cards · Milestone colour as top accent

### Connection Point Tokens (Physical)

32 × 32mm square tokens. Blind-embossed Valid mark on reverse. Three states:
- **Filled** — Ember fill · Ground mark · Earned
- **Half** — Split Ember / empty · Partial credit
- **Empty** — Ember border only · Available

---

## 16 — Inverse / Dark Mode

### Ground as the surface

The professional version lives on Ground. The social version lives on Parchment. Both are primary — neither is a "dark mode" of the other. They are different contexts expressed through the same system.

### Mapping

| Token | Social (Parchment) | Professional (Ground) |
|-------|-------------------|----------------------|
| Text | Ground `#1A1814` | Parchment `#F2EDDF` |
| Background | Parchment `#F2EDDF` | Ground `#1A1814` |
| Primary accent | Ember `#C4882A` | Tide `#3D6B65` |
| Metadata | Drift `#9A9488` | Drift at 40% |
| Rule | Ground 11% | Parchment 7% |
| Card back pattern | −45° Parchment 3.5% | +45° Tide 8% |

### What Changes

- Ember → Tide for all accent roles
- Ground and Parchment swap for all text/background roles
- Rule opacity reduces (11% → 7%) because Ground is already a darker surface
- Card texture changes from Linen to Smooth Matte

### What Never Changes

- Typefaces are identical in both versions
- Card proportions are identical
- Label structure is identical
- Spatial scale is identical

> The versions look different because the context is different — not because one is the other's inverse. They are two expressions of the same system, not a system and its reversal.

---

## 17 — Component Library

### Every element in its place

Components inherit the system's discipline. Sharp corners. No border-radius. Ember for primary actions. Ghost borders for secondary. The instinct textarea uses Cormorant italic because the player's response is a voice, not a form field.

### Buttons

| Variant | Background | Text | Border | Use |
|---------|-----------|------|--------|-----|
| Primary | Ember | Ground | None | Single primary action per screen |
| Secondary | Transparent | Ground | Ground 22% · 1px | Secondary actions |
| Ghost | Transparent | Drift | None | Tertiary / destructive-adjacent |
| Danger | Over-R pale | Over-R | Over-R 35% | Session end, permanent actions |

**Rules:**
- No border-radius on any button variant
- Primary button always includes → arrow after text
- Never more than one Primary button per screen
- Danger buttons never use Ember. They use Over-R (`#C45050`) exclusively.

### Inputs

**Standard input** — DM Sans 15px · Ground border 22% · Focus state: Ember border

**Instinct textarea** — The exception. Cormorant italic 18px · Ember pale background · Ember top border 2px · Minimum height 88px. This is the only input that announces itself visually. It is where the real work of the game happens.

**Label** — DM Sans 500 · 10px · Uppercase · 0.18em tracking · Drift · Always above the field, never inside it.

### Progress Indicators

- **Track:** 2px height · Ground 22% background · No border-radius
- **Fill:** Ember for progress · Over-G (`#4A8C6A`) for milestone achievement
- **Labels:** DM Sans small caps · justified left and right · count format "4 / 6" not "4 of 6"

### Phase Indicator

Numbered squares in sequence. 28 × 28px. Three states:

- **Complete:** Ember background · Ground number
- **Active:** Ember border · Ember number · transparent background
- **Inactive:** Ground 22% border · Drift number

Connected by 1px rules (complete = Ember 40%, inactive = Ground 22%). Never icons. Never words.

### Tabs

1px Ground 22% rule beneath the tab row. Active tab: 2px Ember border-bottom · Ground text. Inactive: no bottom border · Drift text. No background on any state.

### Callout Blocks

- **Standard callout:** Ember pale background · Ember left border 2px · DM Sans 500 label · DM Sans body
- **Clinical note:** Ground background · Tide left border 2px · Tide label · Parchment 70% body
- **Pull quote:** Cormorant italic 20px · Ember left border 2px · 16px indent

---

## 18 — The Connection Moment

### The moment the game is actually for

Not the score. The thing that just happened in the room. The session completion state is the most important surface in the entire system — it is the brand's only moment of ceremony.

### Design Principles

- **Background:** Always Ground. Never a celebration palette.
- **Confetti:** Vertical Ember lines only. 1–2px wide. Varied opacity (30–50%). No colour confetti.
- **Score reveal:** Digits count up individually. 120ms per digit. DM Sans 300 at 96–112px.
- **Milestone cards:** Same geometry as scenario cards. Milestone colour as top accent.
- **Typography:** Cormorant for the moment ("Session complete."). DM Sans for the facts.

### Copy Rules

Milestone copy is always specific, never generic:

- Not: *"Great job!"*
- Yes: *"Instinct Updated — Phase One response quality improved by 2+ tiers across 3 scenarios."*

- Not: *"You're making a difference."*
- Yes: *"340 Connection Points. 85% of possible. Session high."*

### The Closing Display

```
Session
complete.
────────
[Milestone cards]
```

Cormorant 600 "Session" on one line. Cormorant 400 italic "complete." on the next, in Ember. The em dash rule — always 64px, always Ember, always centred — separates the declaration from the data.

---

## 19 — Social Templates

### The brand at scroll speed

Three approved formats. No gradients. No stock imagery. No motivational overlays. Type carries the post. Always.

### Format 01 — Square Post (1:1)

Three colour modes, used independently:

**Dark (Ground background)**
- Ground field with Rule Matrix pattern at 4% opacity
- Cormorant 600 headline at 28–40px · Parchment
- Italic pivot phrase in Ember
- "Valid" wordmark bottom left at 14px · Parchment 25%

**Parchment**
- Parchment field · Standard border
- Card face quote in Cormorant italic · Left Ember 2px border
- "What do you say next?" in Cormorant 600 below
- Wordmark bottom left · Ground 20%

**Ember**
- Full Ember background
- Cormorant 600 headline · Ground
- No wordmark — the colour is the brand signal

### Format 02 — Story (9:16)

Ground background only. Ember top rule 2px. Reproduces the card face verbatim at 60% scale. The card face occupies 60% of the story height. Instruction line at bottom: "Tap to play." Nothing else. No stickers. No native Instagram UI elements over brand content.

### Rules

- Never use filters on any brand social content
- Never use "link in bio" as the primary CTA — "Tap to play" is the only CTA
- Post copy (caption) follows voice principles: specific, cited, no borrowed urgency
- Hashtags: maximum 5 · placed below a line break · never in the post copy itself

---

## 20 — Email Template

### The brand in the inbox

Email inherits the complete visual system. Georgia replaces Cormorant Garamond (unavailable in most email clients). Arial replaces DM Sans. The card face appears as a callout element — the brand's primary motif, present even in email.

### Template Structure

**Header** — Ground background · Ember top rule 2px · Wordmark (Georgia) left · Version tag right (Drift small caps)

**Hero** — Parchment background · Ember eyebrow label · Georgia 36px headline · Arial 15px body · Ember CTA button

**Card callout** — Ember pale background · Ember top rule 2px · Ember label · Cormorant italic scenario text · Session-specific annotation below

**Data rule** — 1px Ground 11%

**Follow-up** — Parchment · Arial 13px · Ember inline link

**Footer** — Ground background · Wordmark left (Georgia, 30% opacity) · Three links right (Arial small caps · Drift 35%)

### Email Typography (Fallback)

| Role | Preferred | Email fallback |
|------|-----------|---------------|
| Display / Headings | Cormorant Garamond | Georgia |
| Body / Labels | DM Sans | Arial |
| Monospace (if needed) | — | Courier New |

---

## 21 — Environmental Expressions

### The brand in a room

Valid appears at conferences, training days, and clinical continuing education events. Environmental expressions follow the same hierarchy as all other surfaces: wordmark, ruling line, type as primary image. Scale is achieved by making the type larger, not by adding elements.

### Table Tent (A5 folded)

- Parchment background · Ember top rule 2px
- Top zone: "Table Tent · A5 folded" in Drift small caps
- Main: Cormorant 600 28px · Ground
- Sub: DM Sans 13px · Ground 55%
- Copy: "Valid is on your table. Scan to play the digital companion."

### Event Badge / Conference Credential

- Ground background · Ember top rule 3px
- Attendee name: Cormorant 600 40px · Parchment
- Role: DM Sans small caps · Ember
- Bottom: Wordmark left (Parchment 25%) · Event detail right (Drift 40%)

### Directional Signage

- Ember background · DM Sans small caps tag at top
- Wordmark at 72px+ · Ground
- Arrow: Cormorant → · Ground 30% · bottom right
- No other elements

### Roll-Up Banner (portrait)

- Ground background · Ember top rule 3px · Rule Matrix texture
- Top zone: "Valid" + italic tagline at 56px
- Middle zone: Pull quote in Cormorant italic · Parchment 40% · ruled above and below
- Bottom: URL and booth number in DM Sans small caps · Drift 30%

### Rules for All Environmental

- Wordmark minimum 40mm for environmental use
- No Ember backgrounds larger than 1m² (signage exception: directional only)
- Typography always left-aligned — centred type does not appear in environmental contexts
- Never add photography or illustration to environmental surfaces

---

## 22 — Expansion Pack System

### Extending without diluting

Expansion packs are supplements to the core game, not standalone products. Each pack has a unique dark-shifted ground colour and a single accent. Always smaller than the core box. Always "Valid + [Pack Name]" — never the full wordmark alone.

### The Four Expansion Packs

**Valid + Digital Age**
- Ground: `#1A1E2A` (shifted toward blue)
- Accent: `#4A6FA5`
- Content: 32 scenario cards · Text messages · DMs · Social media posts
- Preview: "Someone posts: nobody would miss me anyway."

**Valid + Cultural Contexts**
- Ground: `#1E1A14` (shifted toward amber)
- Accent: `#8B6914`
- Content: 40 cards · 8 cultural contexts · Both versions
- Preview: "My family doesn't talk about these things."

**Valid + Clinical Complexity**
- Ground: `#151E1D` (shifted toward tide)
- Accent: Tide `#3D6B65`
- Content: 28 cards · Master level only · Professional version
- Preview: "Managing transference in a long-term therapeutic relationship."

**Valid + Family System**
- Ground: `#1C1718` (shifted toward resin)
- Accent: Resin `#6B3D2E`
- Content: 36 cards · Family Circle pathway only
- Preview: "Your parent has never acknowledged having depression."

### System Rules

**Naming:** Always "Valid + [Pack Name]". The "Valid +" prefix in DM Sans small caps at reduced size. The pack name in Cormorant italic as the dominant element.

**Ground colour:** Each pack ground is shifted ±4–6 hue points from core Ground `#1A1814` in the direction of the pack accent. Never pure black. Never the core Ground exactly.

**Accent colour:** One accent per pack. Appears on the top card edge, pack tag, and count label. Nowhere else. Never replaces Ember or Tide in the core brand context.

**Box size:** Always 60% the volume of the core game box. The proportion communicates supplement status without any copy.

---

## 23 — Print Specifications

### The physical object's truth

Paper stock, finish, and colour mode directly affect how the brand is experienced at the moment of opening the box. These specifications are not suggestions.

### Game Box

| Property | Specification |
|----------|--------------|
| Dimensions | 180 × 180 × 50mm |
| Board weight | 2.5mm greyboard |
| Exterior paper | 150gsm uncoated warm white |
| Laminate | Soft-touch matte · exterior only |
| Spot UV | Wordmark only · gloss over matte |
| Colour mode | CMYK + Pantone 124 C (Ember) |
| Interior | Unlaminated · 120gsm natural |

The spot UV on the wordmark is the one premium finish element. Everything else is disciplined restraint. Soft-touch matte communicates seriousness without luxury signaling.

### Card Stock

| Property | Specification |
|----------|--------------|
| Dimensions | 63 × 88mm |
| Weight | 350gsm black-core |
| Finish — Social | Linen texture |
| Finish — Professional | Smooth matte |
| Corner radius | 0mm (sharp) |
| Colour mode | CMYK · no Pantone on cards |
| Bleed | 3mm all sides |
| Count | 110 scenario · 30 response · 20 misc |

Linen texture references the tactile warmth of the Parchment palette. Smooth matte references clinical precision. The finish is a semantic choice, not a cost choice.

### Instruction Booklet

| Property | Specification |
|----------|--------------|
| Format | A5 · saddle-stitched |
| Pages | 24pp including covers |
| Cover stock | 250gsm uncoated warm white |
| Interior | 120gsm uncoated natural |
| Colour | 2-colour · Ground + Ember only |
| Imagery | None — type and ruling lines only |

### Colour Conversion

| Colour | Screen | Pantone | CMYK |
|--------|--------|---------|------|
| Ember | `#C4882A` | 124 C | C:0 M:37 Y:88 K:8 |
| Ground | `#1A1814` | Black C + warm | C:25 M:20 Y:25 K:92 |
| Tide | `#3D6B65` | — | C:65 M:20 Y:40 K:25 |
| Resin | `#6B3D2E` | — | C:20 M:55 Y:65 K:45 |
| Parchment | `#F2EDDF` | Uncoated warm white stock | No ink required |

> Parchment is always the stock, never an ink. Specifying warm white uncoated stock as the base paper means Parchment appears without ink cost — and the paper's own texture contributes to the surface.

### Colour Modes

| Mode | Surface | Wordmark | When to use |
|------|---------|----------|-------------|
| Full colour · Light | Parchment stock | Ground | Primary — all standard applications |
| Full colour · Dark | Ground field | Parchment | Professional version · event materials |
| 1-colour · Black | White stock | Black | Press materials · contract printing |
| 1-colour · White | Black field | White | Stamping · embossing · single-colour print |

---

## 24 — Brand Audit

### What survives. What doesn't.

The audit is the system's final test. Every decision made across twenty-four chapters is held against the four-persona standard. The audit is not a checklist. It is the governing question asked of every future design decision: does this belong to Valid, or does it belong to someone else?

---

### Does Not Belong to Valid

**Any typeface with rounded letterforms**
Poppins, Nunito, Lato, Quicksand. Rounded type performs approachability. Valid earns it through substance, not form. Once you round the corners, you join the wellness category.

**The mental health blue-green palette**
Teal, sage, lavender, seafoam. Every major mental health brand already owns this territory. Entering it is not humility — it is invisibility. The palette differentiation is non-negotiable.

**Stock photography of composed people**
Soft-lit, photogenic wellness subjects in comfortable environments. This is the visual language of performative care. Valid does not perform care — it builds skill. The imagery must reflect the difference.

**"Break the stigma." "You are not alone." "Safe space."**
Phrases emptied of meaning by overuse. Using them costs Valid its specific voice without buying any credibility in return. The brand earns its register by being specific. Always specific.

**Bounce, spring, or playful easing for UI feedback**
Playful motion signals a product that doesn't take its subject seriously. Valid's motion moves toward stillness. Every animation ends at rest, not at a bounce.

**Rounded corners as a default**
Border-radius communicates approachability by rounding the sharp edges of difficulty. Valid communicates precision. These are incompatible signals for a clinical training product. The card corners are sharp. All component corners are sharp.

**Brain puzzle pieces, heart icons, leaf motifs**
Visual shorthand so overused they communicate "mental health adjacent" rather than anything specific about Valid. Typography solves every icon need in this system. If a typographic mark doesn't exist for the need, revisit whether the need is real.

**Centred, symmetrical, safe compositions**
Symmetry signals neutrality. Valid's layout has a point of view. Type is never perfectly centred on a card face. The composition always has a direction.

---

### Belongs to Valid

**Cormorant Garamond + DM Sans, nothing else**
Two typefaces. Both chosen for what they are not. The pairing is ownable because nobody in this category is using it. Maintain this ruthlessly. No third typeface. No variable weight experimentation. No swapping DM Sans for Inter because it "feels cleaner."

**Ember on Parchment on Ground, nothing added**
Six colours. All warm. None from the mental health brand defaults. Tide reserved for professional version differentiation only. The palette is the claim. Every colour added is an erosion.

**The card face as the primary visual object**
Every layout decision flows from the card's proportions. The card is not placed on a layout — the layout is built around the card. This applies to web, email, signage, and social equally.

**Specific claims grounded in cited research**
"Retrieval practice produces 50–100% better retention." Specific. Citable. Verifiable. This is the register that earns clinical trust. Maintain it in every copy context. The brand's authority comes from its specificity.

**Deliberate, measured motion toward stillness**
Four duration tokens. Spring easing for card reveals. Ease-out for entrances. The brand moves the way someone speaks after they've thought about what they're going to say. Nothing bounces. Nothing loops.

**The ruling line as primary structural device**
Six weights. Three colours. Each with one designated use. The line is not decoration — it is the structure that everything else rests on. When in doubt, add a line. When in doubt about the line, remove the element it was trying to compensate for.

**Geometric patterns derived from the grid**
Rule Matrix, Dot Field, Column Rule, diagonal hatching. All generated from the same geometry as the ruling line. No blobs. No organic forms. No gradients. If the pattern cannot be described as a mathematical operation on the grid, it does not belong here.

**The test: could this element appear on a wellness brand?**
If yes: remove it. Valid's visual territory is defined precisely by what it refuses to share with the category it operates adjacent to. Every exception is an erosion. Every erosion makes the next exception easier to justify.

---

## System Summary

### The Twenty-Four Chapter Index

| Vol | Chapter | Title |
|-----|---------|-------|
| I | 01 | Spatial System — 8-unit grid |
| I | 02 | The Mark — Wordmark anatomy and rules |
| I | 03 | The Ruling Line — Six weights, three colours |
| I | 04 | Pattern Language — Six approved patterns |
| I | 05 | Typography as Image — Type as the primary visual |
| I | 06 | Label System — Three-component maximum |
| I | 07 | Card Anatomy — The primary object |
| I | 08 | Motion Language — Toward stillness |
| I | 09 | Digital Expressions — Screen faithfully |
| I | 10 | Physical Expressions — The object in hand |
| I | 11 | Typographic Marks — No icons |
| I | 12 | Image Direction — When required |
| II | 13 | Response Spectrum — Three tiers |
| II | 14 | Colour Accessibility — Contrast ratios |
| II | 15 | Score System — Categories and milestones |
| II | 16 | Inverse System — Professional version |
| II | 17 | Component Library — Complete |
| II | 18 | The Connection Moment — Milestone design |
| II | 19 | Social Templates — Square, story |
| II | 20 | Email Template — Inbox translation |
| II | 21 | Environmental Expressions — Room scale |
| II | 22 | Expansion Pack System — Four packs |
| II | 23 | Print Specifications — Stock, finish, CMYK |
| II | 24 | Brand Audit — What stays, what goes |

---

### The Governing Principle

The system that emerged across twenty-four chapters is not what any single perspective would have produced alone. It is what all four voices — clinical, lived experience, strategic, scientific — could not argue against.

Every future decision has one test: does this belong to Valid, or does it belong to someone else?

A system that can answer that question consistently — across card backs, email footers, roll-up banners, and score screens — is a system that is doing its job.

---

*Valid — Ground · Parchment · Ember · Resin · Drift · Tide · Cormorant Garamond · DM Sans*  
*Extended Visual Language System · Volumes I & II · All four voices · Both versions · One system*
