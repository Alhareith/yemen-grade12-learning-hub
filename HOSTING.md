# الاستضافة والإتاحة

## الروابط العامة

- الرابط الأساسي (GitHub Pages): https://alhareith.github.io/yemen-grade12-learning-hub/
- الرابط البديل لليمن (Vercel): https://yemen-grade12-learning-hub-alhareith.vercel.app/

## سبب وجود رابط بديل

بعض شبكات المستخدمين قد تواجه مشكلة في الوصول إلى نطاق `github.io`. لذلك توجد نسخة إنتاجية مستقلة على Vercel تعمل كمسار وصول بديل للطالب، مع بقاء GitHub Pages فعالًا بالتوازي.

## طريقة النشر

- GitHub Pages يبني المشروع من الفرع `main` باستخدام GitHub Actions، ويستخدم Vite base بقيمة `/yemen-grade12-learning-hub/`.
- Vercel مرتبط مباشرة بالمستودع `Alhareith/yemen-grade12-learning-hub` ويبني المشروع نفسه من جذر المستودع.
- إعداد Vercel: Framework = `Vite`، Root Directory = `.`، Build Command = `pnpm exec vite build`، Output Directory = `dist/public`.
- عند البناء خارج GitHub Actions يستخدم Vite base بقيمة `/`، لذلك تعمل أصول Vercel من جذر النطاق مباشرة.
- لا يعتمد نشر Vercel على Proxy أو Rewrite إلى GitHub Pages.

## الأداء

تم فصل المحاكاة وطبقة تنسيق الرياضيات عن الحزمة الأولى وتحميلهما عند الطلب فقط، وإزالة Google Fonts من مسار الإقلاع. بعد التحسين هبطت الحزمة الرئيسية من نحو 316.67 kB إلى 140.46 kB قبل gzip، ومن 85.84 kB إلى 35.26 kB بعد gzip.
