import requests
import base64
import re
import random
import json
from datetime import datetime
import time

try:
    from config import *
except ImportError:
    print("❌ config.py پیدا نشد!")
    exit(1)

GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
BLUE = "\033[94m"
RESET = "\033[0m"

def log(msg, t="info"):
    if t == "success":
        print(f"{GREEN}✅ {msg}{RESET}")
    elif t == "error":
        print(f"{RED}❌ {msg}{RESET}")
    elif t == "wait":
        print(f"{YELLOW}⏳ {msg}{RESET}")
    else:
        print(f"{BLUE}📡 {msg}{RESET}")

def fetch_source(url, retry=0):
    try:
        log(f"دریافت: {url[50:70]}...", "wait")
        r = requests.get(url, timeout=TIMEOUT)
        if r.status_code != 200:
            raise Exception(f"HTTP {r.status_code}")
        try:
            decoded = base64.b64decode(r.text).decode('utf-8')
            configs = decoded.splitlines()
        except:
            configs = r.text.splitlines()
        configs = [c.strip() for c in configs if c.strip() and len(c) > 20]
        log(f"✅ {len(configs)} کانفیگ", "success")
        return configs
    except Exception as e:
        if retry < MAX_RETRIES:
            time.sleep(2)
            return fetch_source(url, retry + 1)
        log(f"خطا: {str(e)}", "error")
        return []

def clean_config(c):
    return re.sub(r'#.*$', '', c).strip()

def rename_config(c, idx):
    return f"{clean_config(c)}{FINAL_TAG}{idx}"

def create_info_config(total_configs):
    """ساخت کانفیگ اطلاعاتی با پروتکل VMESS معتبر"""
    now = datetime.now()
    time_str = now.strftime("%Y-%m-%d %H:%M:%S")
    
    # محاسبه دقیقه گذشته از نیمه شب
    minute_of_day = now.hour * 60 + now.minute
    
    # یک کانفیگ VMESS سبک و معتبر (سرور تستی)
    info_config = {
        "v": "2",
        "ps": f"📊 NetiShield Info | Update: {time_str} | Configs: {total_configs}",
        "add": "185.159.157.229",
        "port": "443",
        "id": "netishield-info-display",
        "aid": "0",
        "scy": "auto",
        "net": "ws",
        "type": "none",
        "host": "info.netishield.ir",
        "path": "/info",
        "tls": "tls"
    }
    
    # تبدیل به VMESS
    vmess_json = json.dumps(info_config)
    vmess_b64 = base64.b64encode(vmess_json.encode()).decode()
    
    return f"vmess://{vmess_b64}"

def main():
    log("🚀 شروع NetiShield", "info")
    log(f"تعداد منابع: {len(SOURCES)}", "info")
    
    all_configs = []
    for url in SOURCES:
        all_configs.extend(fetch_source(url))
    
    if not all_configs:
        log("هیچ کانفیگی دریافت نشد!", "error")
        return False
    
    log(f"مجموع خام: {len(all_configs)} کانفیگ", "success")
    
    # حذف تکراری
    unique = []
    seen = set()
    for c in all_configs:
        key = re.sub(r'#.*$', '', c)
        if key not in seen:
            seen.add(key)
            unique.append(c)
    
    log(f"بدون تکراری: {len(unique)} کانفیگ", "success")
    
    # انتخاب تصادفی
    if len(unique) > TOTAL_CONFIGS:
        selected = random.sample(unique, TOTAL_CONFIGS)
        log(f"انتخاب {TOTAL_CONFIGS} کانفیگ تصادفی", "success")
    else:
        selected = unique
        log(f"همه {len(selected)} کانفیگ استفاده شد", "wait")
    
    # تغییر نام
    renamed = [rename_config(c, i+1) for i, c in enumerate(selected)]
    
    # کانفیگ اطلاعاتی (با VMESS معتبر)
    info_config = create_info_config(len(renamed))
    
    # ترکیب نهایی
    final = [info_config] + renamed
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(final))
    
    log(f"✅ {OUTPUT_FILE} ذخیره شد", "success")
    log(f"📊 {len(final)} کانفیگ:", "info")
    log(f"   - کانفیگ اطلاعات: 1 (VMESS)", "info")
    log(f"   - کانفیگ NetiShield: {len(renamed)}", "info")
    
    return True

if __name__ == "__main__":
    exit(0 if main() else 1)
