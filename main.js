// DOM元素选择
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const contactForm = document.querySelector('.contact-form');
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

// 翻译数据 - 修复HTML标签中的引号问题
const translations = {
    zh: {
        nav: {
            logo: "我的作品集",
            home: "首页",
            about: "关于",
            projects: "项目",
            contact: "联系"
        },
        hero: {
            title: "你好，我是<span class='highlight'>Python开发工程师</span>",
            subtitle: "专注于消息中间件和分布式系统开发",
            cta: "了解更多"
        },
        about: {
            title: "关于<span class='highlight'>我</span>",
            subtitle: "你好，我是<span class='highlight'>Python Developer</span>",
            intro: "我是一名专注于后端开发的Python开发者，擅长消息中间件、实时数据处理和高可用架构设计。",
            edu: "我拥有清华大学计算机科学学士学位和斯坦福大学计算机科学硕士学位。",
            social: {
                github: "GitHub",
                linkedin: "LinkedIn"
            }
        },
        skills: {
            title: "专业技能"
        },
        skill: {
            python: "Python",
            nextjs: "Next.js",
            rust: "Rust",
            mongodb: "MongoDB",
            elasticsearch: "ElasticSearch"
        },
        experience: {
            title: "专业经历"
        },
        achievements: {
            title: "成就与证书"
        },
        achievement: {
            graduate: "清华优秀毕业生",
            award: "Google技术创新奖",
            patent: "分布式系统架构专利"
        },
        projects: {
            title: "我的项目"
        },
        contact: {
            title: "联系<span class='highlight'>我</span>",
            name: "姓名",
            email: "邮箱",
            message: "留言",
            submit: "提交",
            info: "联系方式",
            social: {
                web: "个人网页",
                email: "电子邮箱"
            },
            note: "有任何问题或合作意向，欢迎随时联系我！我会尽快回复您。"
        },
        footer: {
            copyright: "&copy; 2024 个人作品集 保留所有权利"
        },
        form: {
            success: "提交成功！感谢您的留言，我会尽快回复。",
            error: "提交失败，请稍后重试。",
            fillAllFields: "请填写所有必填字段"
        }
    },
    en: {
        nav: {
            logo: "My Portfolio",
            home: "Home",
            about: "About",
            projects: "Projects",
            contact: "Contact"
        },
        hero: {
            title: "Hello, I'm a <span class='highlight'>Python Developer</span>",
            subtitle: "Specialized in message middleware and distributed systems development",
            cta: "Learn More"
        },
        about: {
            title: "About <span class='highlight'>Me</span>",
            subtitle: "Hello, I'm a <span class='highlight'>Python Developer</span>",
            intro: "I am a backend-focused Python developer, specializing in message middleware, real-time data processing, and high-availability architecture design.",
            edu: "I hold a Bachelor's degree in Computer Science from Tsinghua University and a Master's degree in Computer Science from Stanford University.",
            social: {
                github: "GitHub",
                linkedin: "LinkedIn"
            }
        },
        skills: {
            title: "Professional Skills"
        },
        skill: {
            python: "Python",
            nextjs: "Next.js",
            rust: "Rust",
            mongodb: "MongoDB",
            elasticsearch: "ElasticSearch"
        },
        experience: {
            title: "Professional Experience"
        },
        achievements: {
            title: "Achievements & Certifications"
        },
        achievement: {
            graduate: "Tsinghua Outstanding Graduate",
            award: "Google Technical Innovation Award",
            patent: "Distributed System Architecture Patent"
        },
        projects: {
            title: "My Projects"
        },
        contact: {
            title: "Contact <span class='highlight'>Me</span>",
            name: "Name",
            email: "Email",
            message: "Message",
            submit: "Submit",
            info: "Contact Information",
            social: {
                web: "Personal Website",
                email: "Email Address"
            },
            note: "Have any questions or cooperation intentions? Feel free to contact me anytime! I'll reply as soon as possible."
        },
        footer: {
            copyright: "&copy; 2024 My Portfolio All Rights Reserved"
        },
        form: {
            success: "Submission successful! Thank you for your message, I'll reply soon.",
            error: "Submission failed, please try again later.",
            fillAllFields: "Please fill in all required fields"
        }
    }
};

// 当前语言设置
let currentLanguage = localStorage.getItem('preferredLanguage') || 'zh';

// 语言切换函数
function changeLanguage(lang) {
    // 参数验证
    if (!['zh', 'en'].includes(lang)) {
        console.error('Invalid language:', lang);
        return;
    }
    
    currentLanguage = lang;
    
    // 更新语言按钮状态
    if (document.getElementById('zhBtn') && document.getElementById('enBtn')) {
        document.getElementById('zhBtn').classList.toggle('active', lang === 'zh');
        document.getElementById('enBtn').classList.toggle('active', lang === 'en');
    }
    
    // 应用翻译
    applyTranslations(lang);
    
    // 保存语言偏好到本地存储
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch (error) {
        console.error('Failed to save language preference:', error);
    }
}

// 应用翻译函数
function applyTranslations(lang) {
    const translation = translations[lang] || translations.zh;
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        // 解析嵌套键路径
        const value = key.split('.').reduce((obj, k) => obj && obj[k], translation);
        
        if (value) {
            // 检查是否包含HTML标签
            if (value.includes('<')) {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
        }
    });
}

// 主题切换函数
function toggleTheme() {
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    
    // 更新主题按钮图标
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = isDarkTheme ? '🌙' : '🌞';
    }
    
    // 保存主题偏好到本地存储
    try {
        localStorage.setItem('preferredTheme', isDarkTheme ? 'dark' : 'light');
    } catch (error) {
        console.error('Failed to save theme preference:', error);
    }
}

// 加载用户偏好设置
function loadUserPreferences() {
    try {
        // 加载语言偏好
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && ['zh', 'en'].includes(savedLanguage)) {
            changeLanguage(savedLanguage);
        } else {
            // 使用默认语言
            changeLanguage('zh');
        }
        
        // 加载主题偏好
        const savedTheme = localStorage.getItem('preferredTheme');
        const themeToggle = document.getElementById('themeToggle');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggle) {
                themeToggle.textContent = '🌙';
            }
        } else {
            document.body.classList.remove('dark-theme');
            if (themeToggle) {
                themeToggle.textContent = '🌞';
            }
        }
    } catch (error) {
        console.error('Failed to load user preferences:', error);
        // 使用默认设置
        changeLanguage('zh');
    }
}

// 处理滚动效果
function handleScrollEffects() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            // 检查是否是暗色主题并应用相应的背景色
            if (document.body.classList.contains('dark-theme')) {
                nav.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
            } else {
                nav.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            }
        } else {
            nav.classList.remove('scrolled');
            nav.style.backgroundColor = 'transparent';
        }
    });
}

// 处理导航菜单交互
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // 动画显示导航项
            navItems.forEach((item, index) => {
                if (item.style.animation) {
                    item.style.animation = '';
                } else {
                    item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
        
        // 点击导航链接后关闭菜单
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                
                // 清除动画
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            });
        });
    }
}

// 处理平滑滚动
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // 关闭移动菜单（如果打开）
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 处理技能进度条动画
function animateSkillProgress() {
    const skillBars = document.querySelectorAll('.progress-bar');
    if (!skillBars.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                if (progress) {
                    entry.target.style.width = `${progress}%`;
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // 观察所有技能条
    skillBars.forEach(bar => observer.observe(bar));
}

// 处理表单提交
function handleFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 表单验证
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        if (!name || !email || !message) {
            console.error('Form fields not found');
            alert(translations[currentLanguage]?.form?.error || 'Submission failed');
            return;
        }
        
        if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
            alert(translations[currentLanguage]?.form?.fillAllFields || '请填写所有必填字段');
            return;
        }
        
        // 模拟表单提交
        setTimeout(() => {
            // 重置表单
            form.reset();
            // 显示成功消息
            alert(translations[currentLanguage]?.form?.success || 'Submission successful');
        }, 1000);
    });
}

// 处理响应式图片
function handleResponsiveImages() {
    const images = document.querySelectorAll('img');
    
    function updateImageSizes() {
        images.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
    }
    
    // 初始调整和窗口大小变化时调整
    updateImageSizes();
    window.addEventListener('resize', updateImageSizes);
}

// 设置语言和主题切换
function setupLanguageAndTheme() {
    // 语言切换事件监听
    const zhBtn = document.getElementById('zhBtn');
    const enBtn = document.getElementById('enBtn');
    
    if (zhBtn) {
        zhBtn.addEventListener('click', () => changeLanguage('zh'));
    }
    
    if (enBtn) {
        enBtn.addEventListener('click', () => changeLanguage('en'));
    }
    
    // 主题切换事件监听
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// 页面加载动画
function pageLoadAnimation() {
    document.body.classList.add('loaded');
}

// 初始化函数
function init() {
    // 加载用户偏好设置
    loadUserPreferences();
    
    // 设置语言和主题切换
    setupLanguageAndTheme();
    
    // 应用初始翻译
    applyTranslations(currentLanguage);
    
    // 设置导航菜单
    setupNavigation();
    
    // 设置平滑滚动
    setupSmoothScrolling();
    
    // 设置滚动效果
    handleScrollEffects();
    
    // 设置技能进度条动画
    animateSkillProgress();
    
    // 设置表单提交处理
    handleFormSubmission();
    
    // 设置响应式图片
    handleResponsiveImages();
    
    // 页面加载动画
    pageLoadAnimation();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);