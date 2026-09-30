# SK_resume

## Sivamani K - Portfolio Website & Professional Resume Suite

A clean, modern, ultra-fast personal portfolio website designed for **Sivamani K (Full-Stack Software Engineer)**.

---

## 🌟 Features Included

- **Modern Tech Aesthetic**: Sleek glassmorphism with dynamic light/dark theme toggle (saved in `localStorage`).
- **Hero & Metrics Dashboard**: Immediate visibility into your live production apps, role-based access systems, and gate clearance benchmarks.
- **Featured Projects Showcase**:
  - **Hostel Visitor Management System (HVMS)** ([Live Demo](https://hostelvistor.onrender.com/login) | [GitHub](https://github.com/SIVAMANI-arch/Hostelvistor))
  - **BankVCS 2.0 – Intelligent Banking & Version Control** ([Live Demo](https://banking-application-version-control-4.onrender.com/) | [GitHub](https://github.com/71382502157shreka-lgtm/banking-application-version-control))
- **Interactive System Architecture**: Live simulated terminal illustrating cryptographic SHA-256 hash chaining and dynamic QR gate pass validation.
- **Integrated Resume Viewer**: Direct link to your print-ready ATS-optimized resume in the `resume/` directory.
- **One-Click Contact Tools**: One-click copy email button, mailto links, GitHub, and LinkedIn links.
- **Pure Web Standards**: Built with pure HTML5, CSS3, and JavaScript — no slow build steps, no node_modules required, instant loading.

---

## 📁 File Structure

```text
Sivamani_K_Portfolio/
├── index.html        # Main portfolio homepage
├── style.css         # Modern responsive styling & theme variables
├── script.js         # Theme toggler, mobile drawer & interactive terminal
├── README.md         # Deployment & usage instructions
└── resume/
    ├── index.html    # Interactive, print-to-PDF resume
    ├── resume.md     # ATS plain text markdown resume
    └── resume.tex    # Overleaf / LaTeX template
```

---

## 🚀 How to Run Locally

You can simply double-click `index.html` to open it in your browser (Chrome, Edge, Firefox, Brave, Safari).

Alternatively, start a local test server using Python:

```bash
cd Sivamani_K_Portfolio
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

---

## 🌐 Free 2-Minute Deployment Options

### Option 1: GitHub Pages (Recommended)
1. Create a new repository on your GitHub account ([github.com/new](https://github.com/new)) named:
   `SIVAMANI-arch.github.io`
2. Push the files in this directory to that repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/SIVAMANI-arch/SIVAMANI-arch.github.io.git
   git push -u origin main
   ```
3. Your portfolio will immediately go live at: **`https://sivamani-arch.github.io/`**

### Option 2: Render Static Site (Already used for HVMS and BankVCS)
1. Push to any GitHub repo (e.g. `portfolio`).
2. On your Render dashboard ([dashboard.render.com](https://dashboard.render.com)), click **New + > Static Site**.
3. Select your repository, set the publish directory to `.`, and click **Deploy**.
