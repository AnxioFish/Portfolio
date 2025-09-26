// DOM元素选择
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const contactForm = document.querySelector('.contact-form');
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

// 语言切换功能 - 完整翻译数据
const translations = {
    'zh': {
        'nav.home': '首页',
        'nav.about': '关于',
        'nav.projects': '项目',
        'nav.contact': '联系',
        'hero.title': '你好，我是<span class="highlight">Python开发工程师</span>',
        'hero.subtitle': '专注于消息中间件和分布式系统开发',
        'hero.cta': '了解更多',
        'about.title': '关于<span class="highlight">我</span>',
        'about.intro': '我是一名Python开发工程师，擅长消息中间件和分布式系统开发。我热爱技术，喜欢不断学习新技术和解决方案。在空闲时间，我喜欢阅读技术书籍、参与开源项目和进行一些编程挑战。',
        'about.edu': '我拥有清华大学计算机科学学士学位和斯坦福大学计算机科学硕士学位。',
        'about.social.github': 'GitHub',
        'about.social.linkedin': 'LinkedIn',
        'skills.title': '我的技能',
        'experience.title': '专业经历',
        'achievements.title': '个人成就',
        'projects.title': '我的项目',
        'contact.title': '联系<span class="highlight">我</span>',
        'contact.name': '姓名',
        'contact.email': '邮箱',
        'contact.message': '留言',
        'contact.submit': '提交',
        'contact.info': '联系方式',
        'contact.social.web': '个人网页',
        'contact.social.email': '电子邮箱',
        'contact.note': '我会尽快回复您的留言！',
        'footer.copyright': '© 2024 个人作品集 保留所有权利',
        'skill.python': 'Python',
        'skill.mongodb': 'MongoDB',
        'skill.nextjs': 'Next.js',
        'skill.elasticsearch': 'ElasticSearch',
        'skill.rust': 'Rust',
        'experience.tsinghua': '清华大学计算机科学学士',
        'experience.stanford': '斯坦福大学计算机科学硕士',
        'experience.google': 'Google软件工程师',
        'experience.openai': 'OpenAI高级软件工程师',
        'achievement.graduate': '清华优秀毕业生',
        'achievement.award': 'Google技术创新奖',
        'achievement.patent': '分布式系统架构专利'
    },
    'en': {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'hero.title': 'Hello, I\'m a <span class="highlight">Python Developer</span>',
        'hero.subtitle': 'Focused on message middleware and distributed systems',
        'hero.cta': 'Learn More',
        'about.title': 'About <span class="highlight">Me</span>',
        'about.intro': 'I am a Python developer specializing in message middleware and distributed systems. I love technology and enjoy continuously learning new technologies and solutions. In my free time, I enjoy reading technical books, contributing to open-source projects, and participating in programming challenges.',
        'about.edu': 'I hold a Bachelor\'s degree in Computer Science from Tsinghua University and a Master\'s degree in Computer Science from Stanford University.',
        'about.social.github': 'GitHub',
        'about.social.linkedin': 'LinkedIn',
        'skills.title': 'My Skills',
        'experience.title': 'Experience',
        'achievements.title': 'Achievements',
        'projects.title': 'My Projects',
        'contact.title': 'Contact <span class="highlight">Me</span>',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.message': 'Message',
        'contact.submit': 'Submit',
        'contact.info': 'Contact Information',
        'contact.social.web': 'Personal Website',
        'contact.social.email': 'Email Address',
        'contact.note': 'I will reply to your message as soon as possible!',
        'footer.copyright': '© 2024 Personal Portfolio All Rights Reserved',
        'skill.python': 'Python',
        'skill.mongodb': 'MongoDB',
        'skill.nextjs': 'Next.js',
        'skill.elasticsearch': 'ElasticSearch',
        'skill.rust': 'Rust',
        'experience.tsinghua': 'Bachelor of Computer Science, Tsinghua University',
        'experience.stanford': 'Master of Computer Science, Stanford University',
        'experience.google': 'Software Engineer at Google',
        'experience.openai': 'Senior Software Engineer at OpenAI',
        'achievement.graduate': 'Tsinghua Excellent Graduate',
        'achievement.award': 'Google Technology Innovation Award',
        'achievement.patent': 'Distributed System Architecture Patent'
    }
};

// 当前语言设置
let currentLang = 'zh';

// 切换语言 - 改进的实现
function changeLanguage(lang) {
    if (lang === currentLang || !translations[lang]) return;
    
    currentLang = lang;
    
    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // 应用翻译
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // 保存语言偏好到本地存储
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
        console.warn('无法保存语言偏好到本地存储:', e);
    }
}

// 主题切换功能 - 改进的实现
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    
    // 更新主题按钮图标
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = isDark ? '🌞' : '🌙';
    }
    
    // 保存主题偏好到本地存储
    try {
        localStorage.setItem('preferredTheme', isDark ? 'dark' : 'light');
    } catch (e) {
        console.warn('无法保存主题偏好到本地存储:', e);
    }
}

// 从本地存储加载偏好设置
function loadUserPreferences() {
    // 加载语言偏好
    try {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && translations[savedLang]) {
            changeLanguage(savedLang);
        }
    } catch (e) {
        console.warn('无法加载语言偏好:', e);
    }
    
    // 加载主题偏好
    try {
        const savedTheme = localStorage.getItem('preferredTheme');
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggle) themeToggle.textContent = '🌞';
        } else {
            if (themeToggle) themeToggle.textContent = '🌙';
        }
    } catch (e) {
        console.warn('无法加载主题偏好:', e);
    }
}

// 汉堡菜单交互
hamburger.addEventListener('click', () => {
    // 切换导航菜单
    navLinks.classList.toggle('active');
    
    // 动画显示导航项
    navItems.forEach((item, index) => {
        if (item.style.animation) {
            item.style.animation = '';
        } else {
            item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // 汉堡菜单动画
    hamburger.classList.toggle('toggle');
});

// 表单提交处理
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // 在实际项目中，这里会发送表单数据到服务器
        console.log('表单数据:', formValues);
        
        // 显示提交成功消息（根据当前语言）
        alert(currentLang === 'zh' ? '感谢您的留言！我会尽快回复您。' : 'Thank you for your message! I will reply to you as soon as possible.');
        
        // 重置表单
        contactForm.reset();
    });
}

// 平滑滚动功能
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 关闭移动菜单（如果打开）
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
            navItems.forEach(item => {
                item.style.animation = '';
            });
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 减去导航栏高度
                behavior: 'smooth'
            });
        }
    });
});

// 技能进度条动画
function animateSkillProgress() {
    const skillBars = document.querySelectorAll('.progress-bar');
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// 设置语言切换和主题切换事件监听
function setupLanguageAndTheme() {
    // 设置语言切换按钮事件
    const langButtons = document.querySelectorAll('.lang-btn');
    if (langButtons.length > 0) {
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => changeLanguage(btn.dataset.lang));
        });
    }
    
    // 设置主题切换按钮事件
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// 滚动时导航栏样式变化 - 优化版本
function handleScrollEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const bgColor = isDarkTheme ? 'rgba(17, 25, 40, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    
    if (window.scrollY > 50) {
        header.style.backgroundColor = bgColor;
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = isDarkTheme ? 'rgba(17, 25, 40, 1)' : 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

// 项目卡片悬停效果增强
const projectItems = document.querySelectorAll('.project-item');

projectItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const image = item.querySelector('img');
        if (image) {
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.3s ease';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const image = item.querySelector('img');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    // 移除加载时的过渡效果
    document.body.classList.add('loaded');
    
    // 滚动到顶部
    window.scrollTo(0, 0);
});

// 添加响应式图片支持
function handleResponsiveImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (window.innerWidth < 768) {
            // 在移动设备上使用低分辨率图片或不同裁剪
            const mobileSrc = img.src.replace('.jpg', '-mobile.jpg');
            // 这里只是示例，实际项目中需要有对应的移动版图片
        }
    });
}

// 初始化响应式图片
window.addEventListener('resize', handleResponsiveImages);

// 执行初始化
function init() {
    // 加载用户偏好设置（语言和主题）
    loadUserPreferences();
    
    // 设置语言和主题切换
    setupLanguageAndTheme();
    
    // 添加滚动效果
    window.addEventListener('scroll', handleScrollEffects);
    
    // 初始化技能进度条动画
    animateSkillProgress();
    
    // 处理响应式图片
    handleResponsiveImages();
    
    // 添加页面淡入效果
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}