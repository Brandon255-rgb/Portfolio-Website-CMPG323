# 🚀 Brandon van Vuuren - Developer Portfolio

A futuristic, responsive developer portfolio website built with pure HTML, CSS, and JavaScript. Features a sleek dark theme with neon green accents and glassmorphism effects.

## ✨ Features

- **🎨 Futuristic Design**: Dark theme with neon green (#00ff88) accents
- **📱 Fully Responsive**: Mobile-first design that works on all devices
- **🔮 Glassmorphism Effects**: Modern blurred glass panels and backgrounds
- **⚡ Smooth Animations**: Fade-in effects, hover animations, and smooth scrolling
- **🎯 Interactive Elements**: Progress indicator, mobile menu, contact form
- **♿ Accessibility**: Proper ARIA labels, focus states, and semantic HTML
- **📊 Performance Optimized**: Lightweight and fast loading

## 🛠️ Tech Stack

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Custom properties, Grid/Flexbox, animations
- **JavaScript**: Vanilla JS for interactivity
- **Fonts**: Orbitron (headings) + Share Tech Mono (body) from Google Fonts
- **Icons**: Font Awesome 6.4.0

## 📁 Project Structure

```
Portfolio Website CMPG323/
├── assets              # Assets folder
├── index.html          # Main portfolio website
├── styles.css          # Custom styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎨 Design System

### Colors
- **Primary Background**: `#0a0a0a` (Jet Black)
- **Secondary Background**: `#1a1a1a` (Dark Charcoal)
- **Accent Green**: `#00ff88` (Neon Green)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#b0b0b0` (Light Grey)
- **Glass Background**: `rgba(255, 255, 255, 0.05)`

### Typography
- **Headings**: Orbitron (Futuristic, bold)
- **Body**: Share Tech Mono (Monospace, readable)

### Components
- **Glass Cards**: Blurred backgrounds with subtle borders
- **Timeline**: Vertical timeline for professional experience section
- **Skill Grid**: Categorized skills with icons
- **Project Cards**: Showcase projects with hover effects

## 📱 Sections

1. **Hero**: Animated introduction with CTA
2. **About**: Personal bio with statistics
3. **Skills**: Programming languages, tools, and soft skills
4. **Professional Experience**: Timeline of professional experience
5. **Projects**: Featured project showcase
6. **Contact**: Contact information and form
7. **Footer**: Social links and copyright

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open `index.html`** in your web browser
3. **Customize** the content in the HTML file
4. **Modify** styles in `styles.css`
5. **Enhance** functionality in `script.js`

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Performance Features

- **Optimized Images**: Use WebP format when possible  
- **Minimal Dependencies**: Only essential external resources  
- **Efficient CSS**: Custom properties and modern techniques  
- **Smooth Animations**: Hardware-accelerated transforms  

### Performance Steps Taken

- **Minified CSS and JavaScript:** Used tools like PostCSS + cssnano for CSS and Terser for JavaScript to reduce file sizes and improve load times.  
- **Production Asset Loading:** Updated the HTML to load only minified CSS and JS files in production, keeping the site lightweight.  
- **Cache Busting:** Added version query strings (e.g., `?v=1.0.0`) to CSS and JS files to ensure browsers load the latest updates without caching old files.  
- **Efficient Font Loading:** Implemented `preload` and `preconnect` for Google Fonts to speed up font requests and avoid blocking page rendering.  
- **Image Loading Optimisation:** Set the main profile image to load immediately (`loading="eager"`), while all other images use lazy loading (`loading="lazy"`) to improve initial page speed.  
- **3D Avatar Lazy Loading:** The 3D avatar element is only added to the page when the user scrolls to it, reducing the initial load and improving performance.  
- **Minification Reminders:** Included comments in CSS and JS files to remind to minify before deployment.  


## 📞 Contact

- **Email**: brandon.vanvuuren60@gmail.com
- **Phone**: +27 79 643 3447
- **Location**: Vanderbijlpark, Gauteng, South Africa

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Brandon van Vuuren** 
