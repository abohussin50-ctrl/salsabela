// تحميل ملف السور الرئيسي
fetch('source/surah.json')
  .then(response => response.json())
  .then(data => {
    // data يحتوي على كل السور
    displaySurahs(data);
  })
  .catch(error => console.error('Error loading surahs:', error));

function displaySurahs(surahs) {
  const container = document.getElementById('surah-list');
  for (let surah of surahs) {
    const div = document.createElement('div');
    div.classList.add('surah');
    div.innerHTML = `
      <h3>${surah.number}. ${surah.name}</h3>
      <p>عدد الآيات: ${surah.verses_count}</p>
      <button onclick="loadSurah(${surah.number})">عرض السورة</button>
    `;
    container.appendChild(div);
  }
}

// تحميل سورة معينة عند الضغط على زر
function loadSurah(number) {
  fetch(`source/surah/surah_${number}.json`)
    .then(res => res.json())
    .then(data => {
      const content = document.getElementById('surah-content');
      content.innerHTML = '';
      data.verses.forEach(v => {
        const p = document.createElement('p');
        p.textContent = `${v.number}. ${v.text}`;
        content.appendChild(p);
      });
    });
}