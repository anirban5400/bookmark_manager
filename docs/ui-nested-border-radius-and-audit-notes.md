# UI notes: nested border radius and extension audit

This document records what we learned while auditing **rounded containers that stack inside other rounded containers** in this Chrome extension (`popup.css`, calculators, settings modal, bookmark form).

## Why it matters

When a **child** sits flush against the **inner edge** of a padded parent (same background family, visible corner curve), the eye expects the curves to be **concentric**: the inner corner’s radius should match the arc you would get if the outer rounded rectangle were inset by the padding.

If the inner radius is **too large** relative to that inset, corners look like a “double curve” or a kink. If it is arbitrary but unrelated to padding, the stack can feel slightly off even when users cannot name why.

This is separate from **pill-shaped** controls (`border-radius: 50px` / `9999px`) inside a toolbar: those are usually fine because they are not pretending to share the parent’s corner geometry.

## Rule of thumb

For a **full-bleed** inner surface (same horizontal inset as the parent’s padding on both sides):

\[
R_\text{inner} \approx R_\text{outer} - P
\]

In CSS, padding and radius may use different units (`rem` vs `px`). Prefer **custom properties** on the parent so both use the same tokens:

```css
.parent {
  --shell-r: 28px;
  --shell-pad: 1.2rem;
  border-radius: var(--shell-r);
  padding: var(--shell-pad);
}

.child-flush-inner {
  border-radius: max(10px, calc(var(--shell-r) - var(--shell-pad)));
}
```

- **`max(10px, …)`** (or similar) avoids razor-sharp corners when subtraction goes small or negative (e.g. large padding vs small outer radius).
- When **media queries** change padding, update the **same** custom property (e.g. `--shell-pad`) so inner radii stay aligned.

## What we applied in this repo

| Area | Parent | Inner elements adjusted |
|------|--------|-------------------------|
| Calculators | `.calculator-card` (`--calc-card-r`, `--calc-card-pad`) | `.calculator-result-panel`, `.calculator-metric` |
| Calculators hero | `.calculators-hero` (`--calc-hero-r`, `--calc-hero-pad`) | `.calculator-stat-chip` |
| Settings modal | `.settings-modal-body` sets `--settings-inset-x` for horizontal inset from `.modal-content` | `.settings-intro`, `.settings-section`; `.settings-row` uses `--settings-section-r` minus section padding |
| Bookmark form | `.bookmark-form` (`--form-shell-r`, `--form-shell-pad`) | `.bookmark-form .form-control` (concentric); **exception**: `.bookmark-modal-body .bookmark-form .form-control` keeps `var(--radius-md)` because the modal form strips card chrome |

Mobile rules that reduce padding (e.g. `.calculator-card` / `.calculators-hero` at narrow widths, `.bookmark-form` padding → `var(--gap-md)`) should update the matching **pad** variables, not only `padding`.

## What we audited and left as-is

- **`.dashboard-shell`** (sidebar) and **`.dashboard-topbar`** (in `main`) are **siblings**, not nested rounded shells—no concentric relationship required.
- **Search inputs** using full pill radius inside toolbars are a different pattern; no change needed for nested-box geometry.
- **`.bookmark-table-shell`** uses outer radius + `overflow: hidden`; inner regions do not compete with the same corner seam in a problematic way.

## Maintenance: duplicate rules

During the audit, `popup.css` contained a **duplicate** block (bookmark card active state through `.bookmark-url`). Removing duplicates reduces drift when one copy is edited and the other is not.

## Related UI fix (Safari)

For **backdrop blur** on overlays, Safari expects **`-webkit-backdrop-filter`** alongside `backdrop-filter` on elements such as `.modal-overlay` so behavior matches Chromium.

## Tax / calculators logic (separate from radius math)

Income-tax planner behavior, slabs, rebates, cess, deduction caps, and sanity checks live in **`popup.js`** / **`popup.html`**. Reference numbers captured from CA worksheets (when available) are intended to live in **`tax_reference_dump.txt`** at the repo root; that file may stay partial until source sheets are re-uploaded.

## Optional follow-up

Inner controls that are **not** full-bleed to the card edge (e.g. `.calculator-input`, `.percentage-mode-toggle`) can optionally use the same **outer − pad − gap** idea if you want every inset control to align to one system—more variables, diminishing returns for small controls.
