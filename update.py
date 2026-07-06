import requests
import base64
import re
import random
import json
from datetime import datetime
import time
import os

try:
    from config import *
except ImportError:
    print("❌ config.py پیدا نشد!")
    exit(1)

try:
    from telegram import send_telegram_message
except ImportError:
    def send_telegram_message(msg): return False

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
    return f"{clean_config(c)}#{idx} {FINAL_TAG}"

def create_info_config(total_configs):
    now = datetime.now()
    time_str = now.strftime("%Y-%m-%d %H:%M:%S")
    info_config = {
        "v": "2",
        "ps": f"📊 NetiShield | Update: {time_str} | Configs: {total_configs} | {FINAL_TAG}",
        "add": "185.159.157.229",
        "port": "443",
        "id": "netishield-info",
        "aid": "0",
        "scy": "auto",
        "net": "ws",
        "type": "none",
        "host": "info.netishield.ir",
        "path": "/info",
        "tls": "tls"
    }
    vmess_json = json.dumps(info_config)
    vmess_b64 = base64.b64encode