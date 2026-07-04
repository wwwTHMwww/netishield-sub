

---

📡 NetiShield-Sub

<div align="center">

https://img.shields.io/badge/Automated%20Update-Yes-brightgreen
https://img.shields.io/badge/Python-3.11-blue
https://img.shields.io/badge/License-MIT-yellow
https://img.shields.io/badge/Configs-Updated%20Every%2030min-orange

یک ساب‌لینک خودکار و حرفه‌ای برای V2Ray و سایر پروتکل‌ها

فارسی | English

</div>

---

🚀 معرفی

این پروژه یک ساب‌لینک خودکار است که کانفیگ‌های V2Ray، VLESS، VMESS، Trojan، Shadowsocks و سایر پروتکل‌ها را از چندین منبع دریافت، پاکسازی، مرتب‌سازی و در یک فایل sub.txt خروجی می‌دهد.

✨ ویژگی‌های اصلی

· 🔄 آپدیت خودکار هر ۳۰ دقیقه با GitHub Actions
· 🧹 پاکسازی هوشمند حذف ایموجی‌ها و متن‌های اضافی
· 🏷️ افزودن تگ #🔥 Channel : @NetiShield با شماره‌گذاری منظم
· 🌐 پشتیبانی از پروتکل‌های مختلف (V2Ray, VLESS, VMESS, Trojan, Shadowsocks)
· 🔢 شماره‌گذاری خودکار کانفیگ‌ها برای دسترسی آسان‌تر
· 🛡️ حذف کانفیگ‌های تکراری برای جلوگیری از شلوغی
· 🎨 لاگ‌های رنگی در ترمینال برای عیب‌یابی آسان

---

📥 نحوه استفاده

روش ۱: استفاده از خروجی نهایی (ساده‌ترین راه)

فایل sub.txt در این ریپازیتوری به‌صورت خودکار آپدیت می‌شود. کافی است لینک زیر را در کلاینت خود وارد کنید:

```
https://raw.githubusercontent.com/[YOUR_USERNAME]/NetiShield-Sub/main/sub.txt
```

نکته: [YOUR_USERNAME] را با نام کاربری خود در گیت‌هاب جایگزین کنید.

روش ۲: اجرای دستی روی سیستم شخصی

۱. کلون کردن ریپازیتوری:

```bash
git clone https://github.com/[YOUR_USERNAME]/NetiShield-Sub.git
cd NetiShield-Sub
```

۲. نصب پیش‌نیازها:

```bash
pip install -r requirements.txt
```

۳. اجرای اسکریپت:

```bash
python update.py
```

۴. مشاهده خروجی:
فایل sub.txt در همان پوشه ایجاد می‌شود.

---

🔧 ساختار فایل‌ها

```
NetiShield-Sub/
├── update.py                 # کد اصلی پایتون
├── sub.txt                   # خروجی نهایی (کانفیگ‌ها)
├── requirements.txt          # کتابخانه‌های مورد نیاز
└── .github/
    └── workflows/
        └── update.yml        # تنظیمات آپدیت خودکار
```

---

🗂️ منابع کانفیگ

این پروژه از ۳ منبع زیر کانفیگ دریافت می‌کند:

1. منبع ۱
2. منبع ۲
3. منبع ۳

توجه: در صورت نیاز، می‌توانید منابع جدید را در آرایه sources در فایل update.py اضافه کنید.

---

📊 نمونه خروجی

هر کانفیگ بعد از پردازش به این شکل خواهد بود:

```
vmess://eyJ... #🔥 Channel : @NetiShield (1)
vless://23... #🔥 Channel : @NetiShield (2)
trojan://... #🔥 Channel : @NetiShield (3)
```

---

⚙️ تنظیمات GitHub Actions

فایل update.yml به‌گونه‌ای تنظیم شده که:

· هر ۳۰ دقیقه به‌طور خودکار اجرا می‌شود
· قابل اجرای دستی از طریق دکمه "Run workflow"
· تغییرات را commit و push می‌کند

زمان‌بندی (cron expression):

```yaml
- cron: '*/30 * * * *'
```

---

🛠️ توسعه و شخصی‌سازی

اضافه کردن منبع جدید

در فایل update.py، آرایه sources را ویرایش کنید:

```python
sources = [
    {
        'url': 'https://your-new-source.com/sub',
        'name': 'نام منبع جدید'
    },
    # ... منابع قبلی
]
```

تغییر تگ کانال

در تابع add_channel_tag:

```python
new_tag = f"#🔥 YourNewTag : @YourChannel ({index})"
```

تغییر زمان آپدیت

در فایل .github/workflows/update.yml:

```yaml
- cron: '*/15 * * * *'  # هر ۱۵ دقیقه
```

---

🐛 عیب‌یابی

مشکل راه‌حل
خطای Base64 کد به‌صورت خودکار چند لایه را دیکد می‌کند
کانفیگ‌ها دریافت نمی‌شوند اتصال اینترنت و لینک منابع را بررسی کنید
Actions اجرا نمی‌شود از فعال بودن GitHub Actions در ریپازیتوری اطمینان حاصل کنید
فایل sub.txt خالی است لاگ‌های Actions را برای خطاهای احتمالی بررسی کنید

---

📝 پیش‌نیازها برای اجرای دستی

· Python 3.11 یا بالاتر
· کتابخانه requests

---

👨‍💻 مشارکت در پروژه

۱. Fork کنید
۲. Branch جدید بسازید (git checkout -b feature/amazing-feature)
۳. تغییرات را Commit کنید (git commit -m 'Add some amazing feature')
۴. Push کنید (git push origin feature/amazing-feature)
۵. یک Pull Request باز کنید

---

📜 مجوز

این پروژه تحت مجوز MIT منتشر شده است - برای جزئیات بیشتر به فایل LICENSE مراجعه کنید.

---

🙏 قدردانی

· از تمامی افرادی که کانفیگ‌های رایگان در اختیار عموم قرار می‌دهند
· از جامعه اوپن‌سورس برای ابزارهای فوق‌العاده

---

📞 ارتباط با ما

· کانال تلگرام: @NetiShield
· گروه پشتیبانی: @NetiShieldSupport

---

<div align="center">

⭐ اگر این پروژه برای شما مفید بود، به ما ستاره دهید!

با ❤️ از تیم NetiShield

</div>
