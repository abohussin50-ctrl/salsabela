// common.js - inserts header and footer
function buildHeader(){
  return `
  <header class="site-header">
    <div class="header-inner">
      <div class="brand">Salsabela</div>
      <nav class="nav" aria-label="main navigation">
        <a href="index.html">Home</a>
        <a href="quran.html">Quran</a>
        <a href="tafsir.html">Tafsir</a>
        <a href="adhkar.html">Adhkar</a>
        <a href="radio.html">Radio</a>
        <a href="books.html">Books</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
  </header>
  `;
}
function buildFooter(){
  return `<footer class="footer"><div class="container">© ${new Date().getFullYear()} — Salsabela · All rights reserved</div></footer>`;
}
document.addEventListener('DOMContentLoaded', ()=>{
  const header = document.getElementById('header-holder');
  const footer = document.getElementById('footer-holder');
  if(header) header.innerHTML = buildHeader();
  if(footer) footer.innerHTML = buildFooter();
});
