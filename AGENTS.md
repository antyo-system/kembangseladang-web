# Global Antigravity IDE Rules (AGENTS.md)

## Developer Profile & Preferences
- **OS Environment**: Windows. Always assume Windows paths and use PowerShell for terminal commands.
- **Project Isolation**: Strict boundary between admin repository (`kembangseladang`) and this public storefront repository (`kembangseladang-web`).
- **Tech Stack Focus**: React 19 + TypeScript + Vite + TailwindCSS v4 + Supabase client.
- **Quality Standard**: Premium look-and-feel storefront (WOW aesthetics, custom fonts, soft pink/cream tones), fully responsive, seamless local cart state, direct-to-WhatsApp checkout.

## Development Philosophy (5-Step Algorithm)
1. **Question Every Requirement**: Deliver exactly what's needed for the storefront. Keep the checkout simple: WhatsApp redirection instead of complex payment gateway or account setup.
2. **Delete Parts or Processes**: No user login/auth, no checkout forms on-site, no order management db writes (we direct the user to WhatsApp which then gets processed on the Admin panel).
3. **Simplify and Optimize**: Keep server state light with client caching. Store cart items in local storage.
4. **Accelerate Cycle Time**: Quick interactive feedback, instant cart drawer, smooth slide-ins.
5. **Automate Last**: No automated stock updates or booking automation on the public side; keep it manual-confirm via WhatsApp checkout.

## UI Language Policy
- **Language**: Use **Bahasa Indonesia** for customer-facing texts, product names, cart descriptions, categories, and checkout instructions (as it is a local Tangerang Selatan shop). Keep code, logs, and comments in English.

## Git & Version Control
- Write descriptive commit messages using Conventional Commits format (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- Always use `main` branch.
