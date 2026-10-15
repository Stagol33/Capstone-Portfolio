# Breck Cooper, developer portfolio

My Treehouse Front End Web Development capstone: a one-page portfolio built with plain HTML, CSS and JavaScript, with no frameworks or build step.

**Live site:** https://stagol33.github.io/Capstone-Portfolio/

## What's in it

- **Projects:** seven projects, each with a screenshot, what it's built with, the trickiest part, and links to the live site and the code.
- **About:** background, a timeline from audio engineering to front-end development, and skills.
- **Contact:** email, LinkedIn and GitHub, with inline SVG icons.

## JavaScript interactions

All of these are custom, event-driven JavaScript in `js/app.js`:

1. **Theme toggle:** switches between light and dark themes. It starts from your system setting and remembers your choice.
2. **Project filter:** shows vanilla JavaScript, React or Node and Express projects, and announces the count to screen readers.
3. **Mobile menu:** below the tablet breakpoint the nav collapses behind a Menu button. Escape closes it, and so does choosing a link.
4. **Level meter:** the waveform under my name, a nod to my audio engineering background, sweeps up on load and follows your pointer.

## Responsive design

Mobile-first, with breakpoints for tablet (48em / 768px) and desktop (64em / 1024px). Tested at 320px, 768px and 1280px.

## Accessibility

- Semantic landmarks, a skip link, and visible keyboard focus.
- Every text colour meets WCAG AA contrast in both themes.
- Decorative screenshots use empty alt text, because each project's heading link already names it.
- Respects `prefers-reduced-motion`.

## Validation

`index.html` passes the W3C Nu HTML validator, and `css/styles.css` passes the W3C CSS validator, both with no errors.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server
```
