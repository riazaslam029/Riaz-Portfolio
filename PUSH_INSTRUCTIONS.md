Upload checklist and commands

1) Ensure files to include are present in the project root:
   - `index.html`, `style.css`, `script.js`
   - `Riaz_Aslam_Portfolio.pdf` (optional — used by the Resume download button)
   - images (profile-photo.jpg, ecom-01.jpg etc.)

2) Initialize and push (PowerShell):

```powershell
cd "F:\Riaz Portfolio"
# initialize repo if needed
git init
git branch -M main
git add .
git commit -m "Initial portfolio commit"

# If you have GitHub CLI and are authenticated:
gh repo create <your-username>/portfolio --public --source=. --remote=origin --push

# Or, if you created a repo on github.com and have its HTTPS/SSH URL:
# HTTPS example:
# git remote add origin https://github.com/<your-username>/portfolio.git
# git push -u origin main
```

3) If you prefer SSH, ensure your SSH key is added to GitHub and use the SSH remote URL.

4) Troubleshooting:
- If `git push` is rejected, run `git remote -v` and ensure the origin URL is correct.
- If `gh` isn't installed, get it from https://cli.github.com/ and run `gh auth login`.

If you'd like, provide the GitHub repo URL and confirm you want me to push; I can attempt to run the push commands from here, but you'll need to authenticate on your machine or give me limited push access (not recommended to share tokens in chat).