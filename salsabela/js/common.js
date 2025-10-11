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
  // استخدم timeout صغير للتأكد أن الـ DOM تم ادراجه
  setTimeout(() => {
    const toggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");
    const sideClose = document.getElementById("sideClose");

    if (!toggle || !sideMenu) return;

    function openMenu() {
      sideMenu.classList.add("active");
      // عرض overlay فقط على الشاشات الصغيرة
      if (window.innerWidth <= 768 && overlay) overlay.classList.add("show");
      // منع تمرير الخلفية عندما تكون القائمة مفتوحة على الموبايل
      if (window.innerWidth <= 768) document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      sideMenu.classList.remove("active");
      if (overlay) overlay.classList.remove("show");
      document.body.style.overflow = ""; // اعادة التمرير
    }

    toggle.addEventListener("click", () => {
      if (sideMenu.classList.contains("active")) closeMenu();
      else openMenu();
    });

    if (sideClose) sideClose.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);

    // إغلاق القائمة عند الضغط على أي رابط داخلها
    sideMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        closeMenu();
      });
    });

    // عند تغيير حجم الشاشة: إذا تم تكبير الشاشة وأُغلق overlay سابقًا، نزيل الانطباع
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        // لا نريد overlay على الشاشات الكبيرة
        if (overlay) overlay.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }, 50);
});
