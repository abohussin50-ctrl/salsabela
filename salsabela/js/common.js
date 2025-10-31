// common.js — Header + Footer + Left sidebar menu (overlay on mobile)
function buildHeader() {
  return `
  <header class="site-header">
    <div class="header-inner">
      <button class="menu-toggle" id="menuToggle" aria-label="فتح القائمة">☰</button>
      <div class="brand">سلسبيلا</div>
    </div>

    <nav class="side-menu" id="sideMenu" aria-label="قائمة الموقع">
      <button class="side-close" id="sideClose" aria-label="إغلاق القائمة">✖</button>
      <a href="index.html">🏠 الرئيسية</a>
      <a href="quran.html">📖 المصحف</a>
      <a href="adhkar.html">🌙 الأذكار</a>
      <a href="radio.html">📻 إذاعة القرآن الكريم</a>
      <a href="asmaulhusna.html">🕋 أسماء الله الحسنى</a>
      <a href="books.html">📕 مكتبة الكتب الإسلامية</a>
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
        <a href="about.html">من نحن</a>
        <a href="contact.html">اتصل بنا</a>
        <a href="privacy.html">سياسة الخصوصية</a>
        <a href="terms.html">شروط الاستخدام</a>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-copy">
        © ${new Date().getFullYear()}
        <span class="footer-brand">سلسبيلا</span> · جميع الحقوق محفوظة
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

  // ✅ القائمة الجانبية
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

  // ✅ زر الرجوع للأعلى
  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.title = "الرجوع للأعلى";
  backToTop.innerHTML = "↑";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 250 ? "flex" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
