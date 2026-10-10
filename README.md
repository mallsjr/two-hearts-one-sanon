# Merline & Robinson

A no-build wedding website using plain HTML, CSS, and JavaScript.

## Preview locally

From the project root, run:

```sh
python3 -m http.server 8000 --directory public
```

Then open <http://localhost:8000>.

## Deploy with Cloudflare Pages

1. Push this project to a GitHub or GitLab repository.
2. In Cloudflare, go to **Workers & Pages → Create application → Pages → Connect to Git** and choose the repository.
3. Use these build settings:
   - **Framework preset:** None
   - **Build command:** Leave blank
   - **Build output directory:** `public`
4. Save and deploy. Future pushes to the connected production branch will publish automatically.

The site is entirely static; no build step, package installation, or server-side configuration is required.
