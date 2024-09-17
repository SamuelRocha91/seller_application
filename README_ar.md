# مشروع البائع - تطبيق توصيل

<h2>🌐</h2>
<ul>
  <li><a href="https://github.com/SamuelRocha91/seller_application" target="_blank">Português</a></li>
  <li><a href="https://github.com/SamuelRocha91/seller_application/blob/main/README_es.md" target="_blank">Español</a></li>
  <li><a href="https://github.com/SamuelRocha91/seller_application/blob/main/README_en.md" target="_blank">English</a></li>
  <li><a href="https://github.com/SamuelRocha91/seller_application/blob/main/README_ru.md" target="_blank">Русский</a></li>
  <li><a href="https://github.com/SamuelRocha91/seller_application/blob/main/README_ch.md" target="_blank">中文</a></li>
  <li><a href="https://github.com/SamuelRocha91/seller_application/blob/main/README_ar.md" target="_blank">العربية</a></li>
</ul>

هذا المستودع يحتوي على تطبيق البائع لمنصة التوصيل، والذي تم تطويره باستخدام Vue.js. يوفر هذا التطبيق واجهة لإدارة الطلبات والمنتجات من قبل البائعين.

![توضيح تسجيل المستخدم](./assets/internal.gif)

## المستودعات ذات الصلة

- [تطبيق التوصيل](https://github.com/SamuelRocha91/delivery_back) - خلفية Rails لتطبيق التوصيل.
- [تطبيق المستهلك](https://github.com/SamuelRocha91/consumy) - تطبيق للمستهلكين.

![توضيح الوظائف الداخلية](./assets/registerseller.gif)

**روابط المشروع:**

- [تصميم على Figma](https://www.figma.com/file/tS8r4eROXBknYixtDcijXd/Meu-portf%C3%B3lio?type=design&node-id=0-1&mode=design&t=pL6yJYx6lOSWBGdw-0)

## الاعتماديات والوظائف

### الاعتماديات الرئيسية

- **Vue.js:** إطار عمل جافا سكريبت تقدمي لبناء الواجهات.
- **Vue Router:** للتوجيه في Vue.js.
- **Vite:** أداة بناء للتطوير السريع والمحسن.
- **Vitest:** إطار عمل لاختبارات الوحدة لـ Vue.js.
- **ESLint & Prettier:** أدوات للتحقق من جودة الكود وتنسيقه.
- **TypeScript:** دعم لـ TypeScript لتطوير أكثر أمانًا وقابلية للتوسع.
- **Pinia:** مكتبة لإدارة الحالة مستوحاة من Vuex.

### الوظائف المنفذة

- **Fetch Event Source:** للتواصل في الوقت الفعلي مع الخادم.
- **SweetAlert2:** لعرض التنبيهات والنوافذ الحوارية بشكل جميل وقابل للتخصيص.
- **Vuedraggable:** للسحب والإفلات للعناصر في الواجهة.

### أدوات وإضافات أخرى

- **@rails/actioncable:** للتكامل مع WebSockets في الخلفية Rails.
- **lodash.debounce:** أداة للمساعدة في عمليات debounce.
- **@types/rails__actioncable:** تعريفات TypeScript لـ ActionCable.

## إعداد المشروع

للاستخدام المتكامل، راجع الخطوات التالية:

- [خلفية التوصيل](https://github.com/SamuelRocha91/delivery_back) - خلفية Rails لمنصة التوصيل.

لتكوين وتشغيل المستودع بشكل منفصل، اتبع الخطوات التالية:

### المتطلبات الأساسية

تأكد من أنك قمت بتثبيت [Node.js](https://nodejs.org/) و [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) على جهازك.

### تثبيت الاعتماديات

```sh
npm install
```

### بدء خادم التطوير

لتشغيل خادم التطوير، قم بتنفيذ:

```sh
npm run dev
```

### تشغيل الاختبارات

لتشغيل اختبارات الوحدة، استخدم:

```sh
npm run test:unit
```

---

تم إنشاء هذا المشروع كمتطلب لتقييم برنامج Quero Ser Dev النسخة التاسعة من LWSA.

---