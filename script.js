// ===== تنظیمات - یوزرنیم خودت رو بزار =====
const SUB_URL = 'https://raw.githubusercontent.com/wwwTHMwww/NetiShield-Sub/main/sub.txt';
const CONFIG_URL = 'https://raw.githubusercontent.com/wwwTHMwww/NetiShield-Sub/main/config.py';

// ===== متغیرها =====
let configs = [];
let sources = [];

// ===== انیمیشن شمارش =====
function animateNumber(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 30);
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        element.textContent = current.toLocaleString();
    }, 50);
}

// ===== دریافت اطلاعات =====
async function fetchData() {
    try {
        const subResponse = await fetch(SUB_URL);
        if (subResponse.ok) {
            const text = await subResponse.text();
            configs = text.split('\n').filter(line => line.trim());
            updateConfigInfo();
        }

        const configResponse = await fetch(CONFIG_URL);
        if (configResponse.ok) {
            const text = await configResponse.text();
            sources = extractSources(text);
            updateSources();
        }

        updateFooter();
        document.getElementById('status').textContent = '✅ فعال';
        document.getElementById('status').className = 'value status active';
    } catch (error) {
        console.error('خطا:', error);
        document.getElementById('status').textContent = '❌ خطا';
        document.getElementById('status').className = 'value status inactive';
    }
}

function extractSources(text) {
    const match = text.match(/SOURCES\s*=\s*\[([\s\S]*?)\]/);
    if (match) {
        const sourcesText = match[1];
        const urls = sourcesText.match(/"([^"]+)"/g);
        return urls ? urls.map(u => u.replace(/"/g, '')) : [];
    }
    return [];
}

function updateConfigInfo() {
    const count = configs.length;
    animateNumber(document.getElementById('configCount'), count);

    if (configs.length > 0) {
        const firstLine = configs[0];
        const dateMatch = firstLine.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
        if (dateMatch) {
            document.getElementById('lastUpdate').textContent = dateMatch[0];
        }
    }

    document.getElementById('subLink').textContent = SUB_URL;
    displayConfigs();
}

function displayConfigs() {
    const container = document.getElementById('configList');
    container.innerHTML = '';

    if (configs.length === 0) {
        container.innerHTML = '<div class="loading"><div class="spinner"></div>هیچ کانفیگی یافت نشد</div>';
        return;
    }

    const showCount = Math.min(10, configs.length);
    for (let i = 0; i < showCount; i++) {
        const config = configs[i];
        const div = document.createElement('div');
        div.className = 'config-item';
        
        const numberMatch = config.match(/#(\d+)/);
        const tagMatch = config.match(/Channel : @\w+/);
        
        let displayText = config;
        if (numberMatch) {
            displayText = displayText.replace(/#\d+/, `<span class="number">#${numberMatch[1]}</span>`);
        }
        if (tagMatch) {
            displayText = displayText.replace(/Channel : @\w+/, `<span class="tag">${tagMatch[0]}</span>`);
        }
        
        div.innerHTML = displayText;
        container.appendChild(div);
    }

    const moreBtn = document.querySelector('.show-more');
    if (moreBtn) {
        moreBtn.style.display = configs.length > 10 ? 'block' : 'none';
    }
}

function showAllConfigs() {
    const container = document.getElementById('configList');
    container.innerHTML = '';
    
    configs.forEach((config, index) => {
        const div = document.createElement('div');
        div.className = 'config-item';
        div.textContent = config;
        div.style.animationDelay = `${index * 0.02}s`;
        container.appendChild(div);
    });
    
    document.querySelector('.show-more').style.display = 'none';
}

function updateSources() {
    const list = document.getElementById('sourcesList');
    list.innerHTML = '';
    
    if (sources.length === 0) {
        list.innerHTML = '<li>هیچ منبعی یافت نشد</li>';
        return;
    }
    
    list.innerHTML = `<li>📡 تعداد کل منابع: <strong>${sources.length}</strong> عدد</li>`;
}

function updateFooter() {
    const now = new Date();
    const persianDate = now.toLocaleDateString('fa-IR');
    const time = now.toLocaleTimeString('fa-IR');
    document.getElementById('footerUpdate').textContent = `${persianDate} - ${time}`;
}

function copySubLink() {
    navigator.clipboard.writeText(SUB_URL).then(() => {
        showToast('✅ لینک ساب‌لینک کپی شد!');
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = SUB_URL;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✅ لینک ساب‌لینک کپی شد!');
    });
}

function downloadSub() {
    window.open(SUB_URL, '_blank');
}

function refreshData() {
    const btn = document.querySelector('.refresh');
    btn.innerHTML = '<span class="btn-icon">🔄</span> در حال بروزرسانی...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    fetchData().then(() => {
        btn.innerHTML = '<span class="btn-icon">✅</span> بروزرسانی شد!';
        btn.style.opacity = '1';
        setTimeout(() => {
            btn.innerHTML = '<span class="btn-icon">🔄</span> بروزرسانی';
            btn.disabled = false;
        }, 2000);
        showToast('✅ اطلاعات با موفقیت بروزرسانی شد!');
    });
}

// ===== Toast Notification =====
function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(20px);
        padding: 16px 32px;
        border-radius: 14px;
        font-family: 'Vazir', Tahoma, sans-serif;
        font-size: 16px;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        z-index: 1000;
        animation: toastIn 0.5s ease forwards;
        max-width: 90%;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// ===== اضافه کردن استایل‌های Toast =====
const style = document.createElement('style');
style.textContent = `
    @keyframes toastIn {
        from { transform: translateX(-50%) translateY(100px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes toastOut {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== اجرا =====
document.addEventListener('DOMContentLoaded', fetchData);
setInterval(fetchData, 30 * 60 * 1000);