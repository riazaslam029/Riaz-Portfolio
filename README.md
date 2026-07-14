# 🌐 Riaz Aslam — Personal Portfolio

Welcome to my personal portfolio repository! This website showcases my background, technical skills, projects, certifications, achievements, and ways to connect with me.

## 🚀 Live Portfolio

🔗 **Visit Here:** https://riazaslam029.github.io/Riaz-Portfolio/

---

## 📂 Project Structure

```
├── index.html          # Main website
├── style.css           # Styling
├── script.js           # Client-side functionality
├── assets/             # Images, icons, and other assets
└── Riaz_Aslam_Portfolio.pdf   # Resume (optional)
```

---

## ✨ Features

- 🎨 Modern and responsive design
- 📱 Mobile-friendly layout
- 💼 Professional project showcase
- 🛠 Skills and technologies section
- 📜 Certifications & achievements
- 📄 Resume download
- 📬 Contact form with Formspree support
- ⚡ Smooth animations and interactive UI

---

## 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Git & GitHub
- GitHub Pages

---

# 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/riazaslam029/Riaz-Portfolio.git
```

Navigate into the project:

```bash
cd Riaz-Portfolio
```

Open `index.html` in your browser.

---

# 🌍 Deploy on GitHub Pages

### Initialize Git

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit — Portfolio"
```

### Using GitHub CLI (Recommended)

```bash
gh repo create riazaslam029/Riaz-Portfolio --public --source=. --remote=origin --push
```

### Or Create a Repository Manually

Create an empty GitHub repository, then run:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

After pushing:

1. Open your GitHub repository.
2. Go to **Settings → Pages**.
3. Select:
   - Branch: **main**
   - Folder: **/(root)**
4. Save.

Your portfolio will be available at:

**https://riazaslam029.github.io/Riaz-Portfolio/**

---

# 📄 Resume

To enable the **Download Resume** button, place:

```
Riaz_Aslam_Portfolio.pdf
```

in the project root directory.

---

# 📬 Contact Form Setup

This portfolio supports two methods for receiving messages.

## Option 1 — Formspree (Recommended)

1. Create a free account at https://formspree.io/
2. Create a form.
3. Copy your endpoint:

```
https://formspree.io/f/yourFormID
```

4. In `script.js`, configure:

```javascript
window.CONTACT_CONFIG = {
    provider: "formspree",
    formspreeEndpoint: "https://formspree.io/f/yourFormID"
};
```

Messages will then be delivered directly to your email.

---

## Option 2 — Mailto

Without any setup, the contact form falls back to opening the visitor's email client with:

**riazaslam029@gmail.com**

---

# 👨‍💻 About Me

I'm **Riaz Aslam**, a Software Engineering student passionate about building modern web applications and AI-powered solutions.

My interests include:

- Artificial Intelligence
- Machine Learning
- Full Stack Development
- FastAPI
- React
- Python
- Cloud Technologies
- UI/UX Design

---

## 🤝 Connect With Me

🌐 Portfolio: https://riazaslam029.github.io/Riaz-Portfolio/

💼 LinkedIn: https://www.linkedin.com/in/riazaslam029/

💻 GitHub: https://github.com/riazaslam029

📧 Email: riazaslam029@gmail.com

---

## ⭐ Support

If you found this project helpful or inspiring, consider giving it a ⭐ on GitHub. It helps support my work and encourages future projects.

Thank you for visiting!
