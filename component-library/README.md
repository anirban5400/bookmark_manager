# NEU UI — Neumorphic Component Library

A standalone, reusable **neumorphic (soft UI)** component library built with **vanilla CSS & JS**. Extracted from a production Chrome extension UI. Light & Dark mode included.

## Quick Start

```html
<!-- Single CSS import -->
<link rel="stylesheet" href="component-library/neu-all.css">

<!-- JS for interactive components -->
<script src="component-library/js/neu-components.js"></script>
```

Or cherry-pick individual components:
```html
<link rel="stylesheet" href="component-library/core/tokens.css">
<link rel="stylesheet" href="component-library/core/reset.css">
<link rel="stylesheet" href="component-library/core/base.css">
<link rel="stylesheet" href="component-library/components/general/button.css">
```

## Components (38+)

| Category | Components |
|---|---|
| **General** | Avatar, Button, Badge, Tag, Divider, Typography, Box, Tooltip, Popover |
| **Layout** | Workspace Shell |
| **Workspace** | View Toggle, Board Cards |
| **Navigation** | Tab, Dropdown, Steps, Pagination, Menu List, Tree View, Breadcrumb |
| **Data Display** | Timeline, Collapse, Accordion, Legend, Table |
| **Feedback** | Progress, Circle Bar, Skeleton, Spinner, Notification/Toast, Alert, Mask, Contextual Help |
| **Overlay** | Modal, Drawer, Scroll Shadow |
| **Rich** | Carousel, Charts (Bar, Donut, Sparkline) |
| **Forms** | Input, Textarea, Select, Checkbox, Radio, Toggle, Slider |

## Dark Mode

```html
<html data-theme="dark">
```

Or use the JS toggle:
```html
<button data-neu-theme-toggle>🌙</button>
```

## JavaScript API

```js
// Toast notifications
NeuUI.toast('Saved!', 'success');
NeuUI.toast('Error!', 'danger');
NeuUI.toast('Warning!', 'warning');
NeuUI.toast('Info', 'info');
NeuUI.success('Bookmark saved');
NeuUI.warning('Storage almost full');
NeuUI.error('Sync failed');
NeuUI.alert('Review this item', { title: 'Attention' });

// Rich toast object
NeuUI.toast({
  title: 'Saved',
  message: 'Card layout synced to local storage.',
  type: 'success',
  position: 'top',
  duration: 4000
});

// Re-init after dynamic content
NeuUI.init();
```

## New Reusable Patterns

### Responsive Workspace Shell

```html
<div class="neu-workspace" data-neu-workspace data-neu-workspace-persist="demo-shell">
  <aside class="neu-workspace-sidebar">
    <div class="neu-workspace-brand">
      <div class="neu-workspace-brand-main">
        <div class="neu-workspace-brand-mark">BM</div>
        <div class="neu-workspace-brand-copy">
          <span class="neu-workspace-brand-title">Bookmarks</span>
          <span class="neu-workspace-brand-subtitle">Workspace</span>
        </div>
      </div>
      <button class="neu-workspace-sidebar-toggle" data-neu-sidebar-toggle>
        <span data-neu-sidebar-toggle-icon>←</span>
      </button>
    </div>
  </aside>
  <main class="neu-workspace-main">...</main>
</div>
```

### View Toggle

```html
<div data-neu-view-root>
  <div class="neu-view-toggle" data-neu-view-toggle>
    <button class="neu-view-toggle-btn active" data-neu-view="cards">Cards</button>
    <button class="neu-view-toggle-btn" data-neu-view="table">Table</button>
  </div>

  <div class="neu-view-panel active" data-neu-view-panel="cards">...</div>
  <div class="neu-view-panel" data-neu-view-panel="table">...</div>
</div>
```

### Drag-and-Drop Board Cards

```html
<div class="neu-board" data-neu-board data-neu-board-persist="notes-board">
  <article class="neu-board-card" data-neu-card-id="card-1">
    <div class="neu-board-header">
      <button class="neu-board-drag-handle" type="button">⋮⋮</button>
      <div class="neu-board-title-wrap">
        <div class="neu-board-title">Ideas</div>
      </div>
    </div>
    <div class="neu-board-body">Resizable and reorderable.</div>
  </article>
</div>
```

Cards automatically:

- support drag-and-drop reordering
- persist order and size with `data-neu-board-persist`
- support accent variants with `data-neu-accent="success|warning|danger|info"`

## Showcase

Open `index.html` in a browser to see live demos of every component.

## Use in Another Project

1. Copy the `component-library/` folder
2. Link `neu-all.css` in your HTML
3. Add `neu-components.js` before `</body>`
4. Use the class names (all prefixed with `neu-`)
