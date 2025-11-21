# Riaz Aslam — Portfolio

This repository contains the source for my personal portfolio site.

Contents:
- `index.html` — main site
- `style.css` — styles
- `script.js` — client-side behavior (GitHub loader, contact form fallback)
- images and PDF resume (add `Riaz_Aslam_Portfolio.pdf` to enable resume download)

How to publish (quick):
1. Initialize git and commit locally:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial commit — portfolio"
```

2a. (Recommended) Create & publish with GitHub CLI (must be installed & authenticated):

```powershell
# run in project root
gh repo create riazaslam029/portfolio --public --source=. --remote=origin --push
```

2b. Or create an empty repo on GitHub web (https://github.com/new), then run:

```powershell
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Notes & tips:
- Add `Riaz_Aslam_Portfolio.pdf` to the project root so the `Download Resume` button works.
- If you want me to push the repo for you, I can if you provide a temporary GitHub repo URL and confirm you want me to run git push (you must authenticate on your machine or provide a secure method).
- For a private upload, create a private repo and then push using the commands above.

If you'd like, I can also create a small `gh` script that automates creation and push once you confirm you have `gh` authenticated locally.
