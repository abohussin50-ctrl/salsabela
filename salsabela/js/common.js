
// common.js - inserts header and footer
function buildHeader(){
  return `
  <header class="site-header">
    <div class="header-inner">
      <div class="brand">سلسبيلا</div>
      <nav class="nav" aria-label="main navigation">
        <a href="index.html">الرئيسية</a>
        <a href="quran.html">المصحف</a>
        <a href="tafsir.html">التفسير</a>
        <a href="adhkar.html">الأذكار</a>
        <a href="radio.html">الإذاعة</a>
        <a href="books.html">الكتب</a>
        <a href="about.html">من نحن</a>
		<a href="contact.html">تواصل</a>
      </nav>
    </div>
  </header>
  `;
}
function buildFooter(){
  return `<footer class="footer"><div class="container">© ${new Date().getFullYear()} — سلسبيلا · جميع الحقوق محفوظة</div></footer>`;
}
document.addEventListener('DOMContentLoaded', ()=>{
  const header = document.getElementById('header-holder');
  const footer = document.getElementById('footer-holder');
  if(header) header.innerHTML = buildHeader();
  if(footer) footer.innerHTML = buildFooter();
});
