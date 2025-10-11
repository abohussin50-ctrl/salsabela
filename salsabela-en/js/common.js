// common.js — Header + Footer + Left sidebar menu (English version)
function buildHeader() {
  return `
  <header class="site-header">
    <div class="header-inner">
      <button class="menu-toggle" id="menuToggle" aria-label="Open menu">☰</button>
      <div class="brand">Salsabela</div>
    </div>

    <!-- Sidebar menu -->
    <nav class="side-menu" id="sideMenu" aria-label="Main navigation">
      <button class="side-close" id="sideClose" aria-label="Close menu">✖</button>
      <a href="index.html">🏠 Home</a>
      <a href="quran.html">📖 Quran</a>
      <a href="tafsir.html">📚 Tafsir</a>
      <a href="adhkar.html">🌙 Adhkar</a>
      <a href="radio.html">📻 Radio</a>
      <a href="books.html">📕 Books</a>
      <a href="about.html">ℹ️ About</a>
      <a href="contact.html">📩 Contact</a>
    </nav>

    <div id="overlay"></div>
  </header>
  `;
}

function buildFooter() {
  return `<footer class="footer"><div class="container">© ${new Date().getFullYear()} — Salsabela · All rights reserved</div></footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const headerHolder = document.getElementById("header-holder");
  const footerHolder = document.getElementById("footer-holder");
  if (headerHolder) headerHolder.innerHTML = buildHeader();
  if (footerHolder) footerHolder.innerHTML = buildFooter();

  setTimeout(() => {
    const toggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");
    const sideClose = document.getElementById("sideClose");

    if (!toggle || !sideMenu) return;

    function openMenu() {
      sideMenu.classList.add("active");
      if (window.innerWidth <= 768 && overlay) overlay.classList.add("show");
      if (window.innerWidth <= 768) document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      sideMenu.classList.remove("active");
      if (overlay) overlay.classList.remove("show");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", () => {
      if (sideMenu.classList.contains("active")) closeMenu();
      else openMenu();
    });

    if (sideClose) sideClose.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);

    sideMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => closeMenu());
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        if (overlay) overlay.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }, 50);
});
