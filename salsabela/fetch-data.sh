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

    // تحديد اللغة المختارة (افتراضي: en)
    const langSelect = document.getElementById('translationLang');
    const lang = langSelect ? langSelect.value : 'en';

    // تحميل ملف الترجمة
    let translationVerses = {};
    try {
      const transRes = await fetch(`source/translation/${lang}/${lang}_translation_${number}.json`);
      if (transRes.ok) {
        const transData = await transRes.json();
        translationVerses = transData.verse || {};
      }
    } catch (e) {
      console.warn(`⚠️ لم يتم العثور على ترجمة ${lang} للسورة ${number}`);
    }

    // عرض السورة + الترجمة
    content.innerHTML = `<h2>سورة ${surahData.name}</h2>`;

    // ترتيب الآيات
    const verseKeys = Object.keys(surahData.verses || {}).sort((a, b) => {
      return parseInt(a.replace('verse_', '')) - parseInt(b.replace('verse_', ''));
    });

    verseKeys.forEach((key) => {
      const arabicText = surahData.verses[key];
      const translationText = translationVerses[key] || '';

      const div = document.createElement('div');
      div.classList.add('verse');

      div.innerHTML = `
        <p class="ayah-text" style="cursor:pointer;">
          <strong>${key.replace('verse_', '')}.</strong> ${arabicText}
        </p>
        <p class="translation" style="display:none;color:#555;font-size:0.9rem;margin-right:1.5rem;">
          ${translationText}
        </p>
      `;

      // عند الضغط على نص الآية فقط، عرض/إخفاء الترجمة
      const ayahText = div.querySelector('.ayah-text');
      const transEl = div.querySelector('.translation');

      if (translationText) {
        ayahText.addEventListener('click', () => {
          transEl.style.display = transEl.style.display === 'none' ? 'block' : 'none';
        });
      }

      content.appendChild(div);
    });

  } catch (err) {
    console.error('Error loading surah or translation:', err);
    content.innerHTML = `<p style="color:red;">⚠️ حدث خطأ أثناء تحميل السورة.</p>`;
  }
}
