# موقع «ولاد الملك» — Astro + Sveltia CMS

موقع ثابت (Static) سريع ومجاني الاستضافة، بتتحكم في محتواه من لوحة تحكم بالعربي بدون أي كود.
تم بناؤه بـ **Astro** والتعديل من خلال **Sveltia CMS** (الوريث الحديث لـ Decap/Netlify CMS).

المحتوى متنقّل فعليًا من الموقع القديم: **20 مؤتمر/كرنفال + 70 مادة خدمة + 5 صفحات ثابتة + الصور**.

---

## 1) التشغيل محليًا

المتطلبات: Node.js 18.14+ .

```bash
npm install
npm run dev        # افتح http://localhost:4321
npm run build      # يبني الموقع في مجلد dist/
```

## 2) إزاي تعدّل المحتوى

**الطريقة الأسهل — لوحة التحكم (Sveltia CMS):**
- بعد النشر: افتح `https://موقعك/admin/`
- سجّل دخول بحساب GitHub (لمستخدم واحد يكفي Fine-grained Personal Access Token له صلاحية Contents على المستودع).
- ضيف/عدّل «مؤتمر» أو «مادة» بالفورم، ارفع صور، ثم Save → بيتحفظ على GitHub وينشر تلقائيًا.

**تعديل محلي من اللوحة (اختياري):**
```bash
npx decap-server         # يشغّل بروكسي على 8081
npm run dev              # في تيرمينال تاني
# افتح http://localhost:4321/admin/  (يشتغل بفضل local_backend في config.yml)
```

**الطريقة اليدوية:** عدّل ملفات `.md` في `src/content/` مباشرة.

## 3) النشر مجانًا على Cloudflare Pages

1. ارفع المجلد ده على مستودع GitHub جديد.
2. في Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**، اختار المستودع.
3. الإعدادات:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy. (Bandwidth غير محدود على الخطة المجانية — مثالي لموقع صور.)
5. مهم: افتح `public/admin/config.yml` وغيّر `OWNER/REPO` لاسم مستودعك، واضبط `branch`.

> بديل: **GitHub Pages** يشتغل برضه (حد ريبو 1GB — الصور عندنا ~52MB، تمام).

## 4) نموذج المحتوى (المكوّنات)

| Collection | المجلد | المعنى | حقول مهمة |
|---|---|---|---|
| `events` | `src/content/events` | المؤتمرات والكرنفالات | `type` (مؤتمر/كرنفال)، `year`، `cover`، `gallery` |
| `materials` | `src/content/materials` | ترانيم/ألعاب/مسرحيات/برامج/بامفلت | `kind`، `gallery` |
| `pages` | `src/content/pages` | عن الخدمة، لائحة الخدمة، الافتقاد، الحجز | `body` |

**إضافة مؤتمر جديد** = إدخال واحد في `events` (العنوان + النوع=مؤتمر + السنة + الصور). مش صفحة جديدة.

## 5) ملاحظات على النقل

- التصنيف تلقائي حسب عنوان الصفحة القديمة. لو مادة اتصنّفت غلط، غيّر `type`/`kind` من اللوحة في ثانية.
- الصور المكررة (شعار/بنرات) اتشالت من المعارض؛ الصور الفعلية اتنقلت في `public/img/`.
- صفحات المؤتمرات القديمة كانت landing بدون صور خاصة، فبتظهر بكروت متدرجة اللون بالعنوان والسنة (تصميم مقصود، مش خطأ). ممكن ترفعلها غلاف من اللوحة.
- ملف `_migration_report.json` فيه تفاصيل إيه اتنقل لفين (مرجع، مش مطلوب للموقع).

## البنية
```
src/
  content/{events,materials,pages}/*.md   # المحتوى
  content/config.ts                        # الـ schema
  layouts/Base.astro  components/*  pages/*  styles/global.css
public/
  img/*                                    # الصور
  admin/{index.html,config.yml}            # لوحة Sveltia CMS
```
