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
      <a href="tafsir.html">📚 التفسير</a>
      <a href="adhkar.html">🌙 الأذكار</a>
      <a href="radio.html">📻 الإذاعة</a>
      <a href="books.html">📕 الكتب</a>
      <a href="about.html">ℹ️ من نحن</a>
      <a href="contact.html">📩 تواصل</a>
    </nav>

    <div id="overlay"></div>
  </header>
  `;
}

function buildFooter() {
  return `<footer class="footer"><div class="container">© ${new Date().getFullYear()} — سلسبيلا · جميع الحقوق محفوظة</div></footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const headerHolder = document.getElementById("header-holder");
  const footerHolder = document.getElementById("footer-holder");
  if (headerHolder) headerHolder.innerHTML = buildHeader();
  if (footerHolder) footerHolder.innerHTML = buildFooter();

  // بعد الإدراج نربط الأحداث
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

  // ✅ زر الرجوع للأعلى (يضاف تلقائيًا)
  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.title = "الرجوع للأعلى";
  backToTop.innerHTML = "↑"; // يمكنك استبدالها بأيقونة SVG إذا رغبت
  document.body.appendChild(backToTop);

  // عند التمرير يظهر أو يختفي
  window.addEventListener("scroll", () => {
    if (window.scrollY > 250) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  });

  // عند الضغط يصعد للأعلى
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
