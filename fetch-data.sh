#!/usr/bin/env bash
set -e
echo "ابدأ تحميل سور quran (من مستودع GitHub)، ودمجها إلى data/quran.json"
mkdir -p data
BASE='https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah'
echo "[" > data/quran.json.tmp
for i in $(seq 1 114); do
  url="$BASE/$i.json"
  echo "تحميل $url ..."
  curl -fsSL "$url" -o "data/surah_$i.json" || { echo "فشل تحميل $url"; exit 1; }
  cat "data/surah_$i.json" >> data/quran.json.tmp
  if [ $i -lt 114 ]; then echo "," >> data/quran.json.tmp; fi
done
echo "]" >> data/quran.json.tmp
mv data/quran.json.tmp data/quran.json
echo "تم إنشاء data/quran.json"
echo "ملاحظة: لتحميل tafsir_ibn_kathir.json، ضع الملف في data/tafsir_ibn_kathir.json أو نزّله من مصدر موثوق."
