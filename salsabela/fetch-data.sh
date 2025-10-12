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
async function loadSurah(number) {
  const content = document.getElementById('surah-content');
  content.innerHTML = '<p>⏳ جاري تحميل السورة...</p>';

  try {
    // تحميل بيانات السورة
    const surahRes = await fetch(`source/surah/surah_${number}.json`);
    const surahData = await surahRes.json();

    // تحديد اللغة المختارة من المستخدم (إن وُجدت)
    const langSelect = document.getElementById('translationLang');
    const lang = langSelect ? langSelect.value : 'en';

    // تحميل ملف الترجمة المطابق
    let translationData = {};
    try {
      const transRes = await fetch(`source/translation/${lang}/${lang}_translation_${number}.json`);
      if (transRes.ok) {
        translationData = await transRes.json();
      }
    } catch (e) {
      console.warn(`No translation found for ${lang}, surah ${number}`);
    }

    // عرض السورة + الترجمة
    content.innerHTML = `<h2>سورة ${surahData.name}</h2>`;
    surahData.verses.forEach((v) => {
      const div = document.createElement('div');
      div.classList.add('verse');
      div.innerHTML = `
        <p><strong>${v.number}.</strong> ${v.text}</p>
        <p class="translation" style="color:#555; font-size:0.9rem;">
          ${translationData[`verse_${v.number}`] || ''}
        </p>
      `;
      content.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading surah or translation:', err);
    content.innerHTML = `<p style="color:red;">⚠️ حدث خطأ أثناء تحميل السورة.</p>`;
  }
}
