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
      <a href="adhkar.html">🌙 Adhkar</a>
      <a href="radio.html">📻 Radio</a>
      <a href="books.html">📕 Books</a>
    </nav>

    <div id="overlay"></div>
  </header>
  `;
}

function buildFooter() {
  return `
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-links">
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="privacy.html">Privacy Policy</a>
        <a href="terms.html">Terms of Use</a>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-copy">
        © ${new Date().getFullYear()} — <span class="footer-brand">Salsabela</span> · All rights reserved
      </div>
    </div>
  </footer>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const headerHolder = document.getElementById("header-holder");
  const footerHolder = document.getElementById("footer-holder");
  if (headerHolder) headerHolder.innerHTML = buildHeader();
  if (footerHolder) footerHolder.innerHTML = buildFooter();

  // ⏳ Sidebar menu functionality
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
    sideMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        if (overlay) overlay.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }, 50);

  // ✅ Back to Top Button
  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.title = "Back to top";
  backToTop.innerHTML = "↑";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 250 ? "flex" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

