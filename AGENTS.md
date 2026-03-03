# Agent Instructions for Snow Tracker Project

## Package Manager

**MANDATORY: Use pnpm ONLY**

- ❌ NEVER use npm
- ❌ NEVER use yarn
- ❌ NEVER use bun
- ✅ ALWAYS use pnpm

When installing dependencies:
```bash
pnpm add <package>
```

When installing dev dependencies:
```bash
pnpm add -D <package>
```

When running scripts:
```bash
pnpm dev
pnpm build
pnpm lint
```

## Component Development

**BEFORE creating any custom component or UI element, you MUST:**

1. **Check ReUI Registry First**
   - ReUI is configured as the primary component registry in `components.json`
   - Browse available components at: https://reui.io/docs
   - Always prefer ReUI components over custom implementations

2. **Installation Command**
   ```bash
   npx shadcn add @reui/<component-name>
   ```

3. **Available ReUI Components**
   - Alert, Autocomplete, Badge, Data Grid, Date Selector
   - File Upload, Filters, Frame, Kanban, Number Field
   - Phone Input, Rating, Scrollspy, Sortable, Stepper
   - Timeline, Tree

4. **Only create custom components when:**
   - The component does not exist in ReUI
   - The existing ReUI component doesn't meet requirements
   - The functionality is truly custom to this application

## Project Structure

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui with ReUI registry
- React 19

## Component Registry Configuration

The project is configured to use ReUI as the default registry:

```json
{
  "style": "base-nova",
  "registries": {
    "@reui": "https://reui.io/r/{style}/{name}.json"
  }
}
```

## Styling

- Use Tailwind CSS v4 with the Stone base color theme
- ReUI semantic tokens are available: info, success, warning, invert, destructive-foreground
- CSS variables are defined in `src/app/globals.css`
