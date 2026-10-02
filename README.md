# GBX One prototype

A lightweight, local website prototype for a customizable employee launchpad.

## Run it

Open `index.html` in a modern browser. No install or build step is required.

For the most reliable local experience, you can also run a tiny local web server from this folder:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## What is interactive

- Create and edit links with names, notes, tags, colors, and collections
- Create and rename collections
- Drag tiles within and between collections
- Search across link names, notes, URLs, and tags
- Switch between large tile, compact, and list views
- Favorite links and filter the launchpad
- Share a link with a coworker (prototype confirmation flow)
- Accept or decline incoming shared links from the notification panel
- Dismiss announcements
- Persist changes locally in browser storage

The coworker sharing experience is simulated locally in this first version. A production version would connect it to employee identity, a database, and real-time notifications.

## Deployment

- GitHub: https://github.com/cturba04/GBXOne
- Live site: https://ambitious-pond-008f1ce0f.1.azurestaticapps.net/
- Azure Static Web App: `gbxone-cturba` (Free tier)
- Resource group: `rg-gbxone-cturba`

Pushing to `main` runs `.github/workflows/azure-static-web-apps.yml`, validates the JavaScript, and deploys the site. The Azure deployment token is stored in the GitHub Actions secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.
