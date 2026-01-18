# Copilot Instructions for Agent Prompts

## Project Overview

**Agent Prompts** is a modern SaaS platform for browsing, sharing, and managing AI prompts (similar to aishort.top). It's a **frontend-first single-page application** built with vanilla JavaScript, Tailwind CSS, and Alpine.js—no build tools required. The codebase includes comprehensive product/design documentation and production-ready UI.

## Architecture Essentials

### Frontend Stack
- **HTML/CSS/JS**: Vanilla (no frameworks). Zero dependencies except CDN libraries
- **Styling**: Tailwind CSS (CDN) + custom CSS for glassmorphism effects
- **Interactivity**: Alpine.js for reactive components, vanilla DOM manipulation
- **Icons**: Font Awesome 6.4.0
- **Core Files**: `index.html` (entry), `app.js` (monolithic ~645 lines)

### Design System
- **Style**: Modern minimalism + glassmorphism (semi-transparent cards with blur effects)
- **Theme**: Light/dark mode with localStorage persistence
- **Colors**: Blue primary (#3B82F6), purple accent, slate neutrals
- **Typography**: Inter (UI), JetBrains Mono (code)
- **Responsive**: Mobile-first breakpoints (375px/568px mobile, 768px tablet, 1024px+ desktop)

### Data Architecture
- **State**: All data in `AppData` object (categories, features, sample prompts)
- **Routing**: Hash-based SPA (`/#/feature/1`, `/#/category/ai-tools`, `/#/prompt/123`)
- **Mock Data**: No backend integration yet—`AppData` contains fixtures for 6 categories, 50+ prompts, 6 feature modules
- **No DB/APIs**: Current implementation is frontend-only; server/API structure exists in `/repo` folder but not integrated

## Key Code Patterns

### 1. Data Organization (`app.js` lines 10-200)
```javascript
const AppData = {
  features: [...],      // 6 feature modules (search, upload, favorites, etc.)
  categories: [...],    // 10+ prompt categories with icons
  prompts: [...]        // Sample prompts with metadata (id, title, description, tags, rating)
}
```
**Pattern**: Flat object structure. To add new data, extend these arrays directly.

### 2. Router Pattern (`app.js` lines 204-230)
```javascript
const AppRouter = {
  navigate(page, params = []) { /* hash-based routing */ }
}
```
**Routes**: `home`, `feature`, `category`, `prompt`, `browse`, `upload`
**Convention**: Navigate with `AppRouter.navigate('prompt', ['123'])` → hash becomes `/#/prompt/123`

### 3. Theme Management (`app.js` lines 231-265)
```javascript
const ThemeManager = {
  toggle() { /* toggle dark mode */ },
  set(theme) { /* set to 'light'|'dark' */ },
  get() { /* return current theme */ }
}
```
**Convention**: Always use `ThemeManager` for theme changes; it handles DOM classes + localStorage.

### 4. UI Rendering (`app.js` lines 270+)
- **Pattern**: Template literals in HTML render methods
- **Glassmorphism**: Use CSS classes `.glass` (light mode) / `.glass-dark` (dark mode)
- **Example**: Card containers always include `dark:` prefixed Tailwind classes for theme support

### 5. Interactive Elements
- **Click handlers**: Inline `onclick="AppRouter.navigate(...)"` or Alpine.js `@click`
- **Hover effects**: CSS classes like `.card-hover` with `group-hover:` transitions
- **Loading states**: Not yet implemented; add visual feedback when needed

## Development Workflows

### Running Locally
```bash
cd agent-prompts
python -m http.server 8000
# Access: http://localhost:8000
```
**Why**: Relative paths in HTML require a server. Direct file:// URLs break links.

### Testing Routes
Navigate directly to hash URLs to test different views:
- `http://localhost:8000/#/browse` – browse all prompts
- `http://localhost:8000/#/category/ai-tools` – category page
- `http://localhost:8000/#/upload` – upload form

### Adding New Prompts
1. Edit `app.js` → `AppData.prompts` array
2. Restart server (static changes don't hot-reload)
3. Ensure prompt object has: `id`, `title`, `description`, `category`, `tags`, `difficulty`, `rating`

### Styling Changes
- **Tailwind**: Use existing classes; CDN includes full utilities
- **Custom CSS**: Add to `<style>` block in `index.html` for shared styles (glassmorphism, animations)
- **Dark mode**: Always pair light classes with `dark:` variants (e.g., `bg-white dark:bg-slate-900`)

## Common Tasks

### Add a New Feature Module
1. Add object to `AppData.features` with: `id`, `title`, `icon`, `color`, `description`, `fullDescription`, `features`
2. Router will automatically render it in detail pages via `AppUI.featureDetail()`

### Modify Navigation
Edit `<nav>` in `AppUI.homePage()` template. All theme-aware (light/dark) styles included.

### Update Design System Colors
Change CSS variable values in `<style>` or directly in Tailwind classes. Entire app respects Tailwind's color scale.

### Implement Backend Integration
- API layer doesn't exist yet. When adding backend:
  - Keep `AppData` as fallback/cache
  - Create async `fetch()` calls in router handlers
  - Add loading/error states to UI templates
  - Consider localStorage for offline support (current structure supports it)

## Project-Specific Conventions

1. **No build step**: All code ships as-is. Avoid bundled dependencies.
2. **Responsive mobile-first**: Design for mobile (375px), then enhance for larger screens.
3. **Dark mode everywhere**: Every new component needs `dark:` Tailwind classes.
4. **Glassmorphism style**: Use `.glass` / `.glass-dark` classes for cards instead of flat colors.
5. **Icons via Font Awesome**: Use `<i class="fas fa-icon-name"></i>`, not emoji for consistency.
6. **Template literals for HTML**: Render views with `` app.js`` functions, not separate HTML files.

## Important Files Reference

- **[app.js](../agent-prompts/app.js)**: Core app (router, theme, UI rendering, data)
- **[index.html](../agent-prompts/index.html)**: Entry point with global styles + Alpine.js setup
- **[README.md](../agent-prompts/README.md)**: Feature overview & project structure
- **[DESIGN_SYSTEM.md](../agent-prompts/DESIGN_SYSTEM.md)**: Color palette, typography, components
- **[PRD.md](../agent-prompts/PRD.md)**: Product requirements & feature specs
- **[FEATURES_GUIDE.md](../agent-prompts/FEATURES_GUIDE.md)**: Testing guide for routes & responsive design

## Common Pitfalls & Solutions

| Issue | Solution |
|-------|----------|
| Links broken when opening HTML directly | Use `python -m http.server 8000` to run locally |
| Dark mode styles missing | Add `dark:` Tailwind classes alongside light classes |
| New routes not loading | Ensure `AppRouter.navigate()` is called; routes are hash-based, not file-based |
| Tailwind classes not applying | CDN is loaded; if custom CSS needed, add to `<style>` block in index.html |
| Mobile layout broken | Check responsive classes (sm:, md:, lg:); defaults are mobile-first |
