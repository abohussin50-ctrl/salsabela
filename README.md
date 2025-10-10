README - سلسبيلا (final)

محتوى الحزمة:
- صفحات مستقلة: index.html, quran.html, recitations.html, tafsir.html, adhkar.html, about.html, contact.html
- ملفات التصميم: styles.css, common.js
- مجلد data/ يحتوي عينات صغيرة و مكان لوضع quran.json و tafsir_ibn_kathir.json
- fetch-data.sh سكربت لمساعدتك على تنزيل سور المصدر ودمجها في data/quran.json

كيفية إضافة المصحف الكامل (سريع):
1. فك الضغط عن الأرشيف على جهازك.
2. افتح الطرفية في مجلد المشروع.
3. شغّل: bash fetch-data.sh
   -> السكربت سيحاول تنزيل سور منفصلة من مستودع GitHub ويجمعها في data/quran.json
4. لتحميل tafsir ibn kathir، يُفضّل تنزيله من مصدر موثوق ووضعه باسم data/tafsir_ibn_kathir.json

ملاحظة: السكربت يستخدم روابط معروفة لكنها قد تتغير؛ إن واجهت مشكلة سأرشدك خطوة بخطوة لتحميل الملفات يدوياً.
