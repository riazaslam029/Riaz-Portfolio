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

Contact form setup (automatic delivery)
------------------------------------
This site supports sending contact form messages using Formspree (serverless form handling) or falling back to opening the user's email client.

1) Formspree (recommended — will send message to your email automatically):
	- Create a free Formspree form at https://formspree.io/
	- After creation you'll get an endpoint like `https://formspree.io/f/abcd1234`
	- Open `script.js` and set `window.CONTACT_CONFIG = { provider: 'formspree', formspreeEndpoint: 'https://formspree.io/f/abcd1234' }` near the top of the script or in a small inline script inside `index.html` before the main script is loaded.
	- The contact form will then submit via AJAX to Formspree and show success/failure messages in-page.

2) Mailto fallback (no setup required):
	- If you do not configure a Formspree endpoint, the contact form will open the visitor's email client prefilled with your address (`riazaslam029@gmail.com`). This is less reliable for auto-delivery but works without a backend.

If you want, I can help create the Formspree form and show the exact line to add to `index.html` so it works immediately.

If you'd like, I can also create a small `gh` script that automates creation and push once you confirm you have `gh` authenticated locally.
