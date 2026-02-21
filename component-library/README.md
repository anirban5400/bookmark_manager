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

## Components (35+)

| Category | Components |
|---|---|
| **General** | Avatar, Button, Badge, Tag, Divider, Typography, Box, Tooltip, Popover |
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

// Re-init after dynamic content
NeuUI.init();
```

## Showcase

Open `index.html` in a browser to see live demos of every component.

## Use in Another Project

1. Copy the `component-library/` folder
2. Link `neu-all.css` in your HTML
3. Add `neu-components.js` before `</body>`
4. Use the class names (all prefixed with `neu-`)
