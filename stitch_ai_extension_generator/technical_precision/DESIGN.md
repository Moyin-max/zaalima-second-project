---
name: Technical Precision
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
  code-snippet:
    fontFamily: monospace
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base-unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-page: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The brand personality of this design system is engineered, efficient, and authoritative. It is designed for developers who value speed and clarity over decorative flourishes. The aesthetic prioritizes "information density without clutter," mimicking the efficiency of a high-end code editor or a terminal.

The design style is **Minimalism** blended with **Corporate Modern** and a hint of **Brutalism** in its structural rigidity. It evokes a sense of "the machine under the hood," using a strict monochromatic foundation punctuated by high-energy accents. The emotional response should be one of focus, reliability, and technical empowerment.

## Colors

The color palette is rooted in a deep, neutral-gray spectrum to minimize eye strain during long technical sessions. 

- **Backgrounds:** Use a near-black (#09090B) for the primary canvas and a slightly lighter zinc (#18181B) for elevated panels or cards.
- **Accents:** Electric Blue (#3B82F6) serves as the primary action color, signaling interactivity and progress. Soft Purple (#A855F7) is reserved for secondary features, AI-driven insights, or specialized tags.
- **High Contrast:** All text should utilize a crisp white (#FAFAFA) or a high-contrast gray (#A1A1AA) to ensure legibility against dark backgrounds.
- **Status:** Use a sharp Emerald (#10B981) for success and a bright Crimson (#EF4444) for errors, maintaining the high-saturation dev-tool aesthetic.

## Typography

Typography in this design system is used to establish a clear hierarchy of data. 

**Space Grotesk** is utilized for headlines and significant UI labels to provide a technical, slightly futuristic edge. Its geometric nature complements the sharp layout. 

**Inter** is the workhorse for all body copy, inputs, and standard UI elements, chosen for its exceptional readability at small sizes. 

For code blocks and technical data outputs, use a system-default monospace stack (e.g., JetBrains Mono or SF Mono). Maintain a strict adherence to a 4px baseline grid to ensure vertical rhythm remains consistent across dense data displays.

## Layout & Spacing

This design system employs a **Fluid Grid** model with a strictly defined 8-point spacing system. Layouts should feel architectural and intentional.

- **Grid:** Use a 12-column layout for main dashboard views. Use a 2-column "Sidebar/Main" split for application shells, where the sidebar is fixed at 240px and the main content fluidly expands.
- **Density:** Favor "Functional Space." Do not over-pad elements; maintain enough proximity to show relationships between data points, but use generous margins (40px+) around major layout sections to prevent visual claustrophobia.
- **Alignment:** Every element must align to the grid. Avoid centering content in technical views; left-alignment is the default to mimic document and code readability.

## Elevation & Depth

In a dark, developer-focused UI, depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than traditional shadows.

1.  **Level 0 (Base):** The primary background (#09090B).
2.  **Level 1 (Surfaces):** Cards and sidebars use a slightly lighter gray (#18181B) with a subtle 1px border (#27272A).
3.  **Level 2 (Interaction):** Hover states or active elements use a lighter border (#3F3F46) or a very subtle inner glow.

Avoid heavy drop shadows. If a shadow is necessary (e.g., for a floating command palette), use a sharp, high-offset shadow with 0% blur and 100% opacity to maintain the "Brutalist-light" feel, or a very faint, large-radius black shadow to lift the element without softening the edges.

## Shapes

The shape language is "Softened Sharpness." This design system uses a `0.25rem` (4px) base radius for standard components like buttons and inputs. 

- **Standard Elements:** 4px radius (Soft).
- **Large Containers:** 8px radius (rounded-lg).
- **Inner Elements:** When nesting elements (like a button inside a card), the inner radius should be 2px smaller than the outer radius to maintain geometric harmony.

Avoid completely round (pill-shaped) elements except for status indicators or notification badges. The goal is to feel rigid and structural, not playful.

## Components

### Buttons
Buttons are flat with high-contrast text. The primary action button uses the Electric Blue background with white text. Ghost buttons use a subtle border (#27272A) and transition to a solid background on hover.

### Input Fields
Inputs are dark-themed with a 1px border. On focus, the border color shifts to the Primary Blue, and a subtle "outer ring" (2px blue with 20% opacity) may be applied for accessibility.

### Cards & Modules
Cards are defined by their borders rather than background color changes. Use a subtle header section within cards, separated by a 1px horizontal rule, to categorize information.

### Chips & Tags
Technical tags (e.g., API status, Language) should use a monospaced font at 11px. They should be rectangular with the base 4px radius and have a background that is only 10% opaque version of the label color.

### Code Blocks
Code blocks should feature syntax highlighting that mirrors popular VS Code themes (like One Dark or Tokyo Night). Ensure the container has a distinct background (#000000) to separate logic from UI copy.

### Navigation
The sidebar should use high-contrast icons (line-style, 2px stroke) with text labels. The active state is indicated by a vertical 2px line on the far left or right, utilizing the Primary Blue accent.