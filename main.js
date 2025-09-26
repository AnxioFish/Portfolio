// DOM元素选择
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const contactForm = document.querySelector('.contact-form');
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

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
        
        // 显示提交成功消息
        alert('感谢您的留言！我会尽快回复您。');
        
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

// 滚动时导航栏样式变化
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

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