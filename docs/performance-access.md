# Performance and Yemen access plan

- Keep GitHub Pages as the current canonical deployment.
- Reduce first-load JavaScript by lazy-loading the exam simulator and prompt library instead of shipping both on the landing page.
- Remove unused runtime providers from the app shell when they are not referenced by the product experience.
- Keep large exam data out of the first page bundle.
- Provide a second static-host configuration (Vercel) because an ISP-level restriction or routing problem affecting `github.io` cannot be fixed from React code.
- The alternate host must build the same static app from the same repository and must not change exam state/storage semantics.
