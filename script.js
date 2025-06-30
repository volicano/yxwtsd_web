// Font Awesome 检测和备用图标功能
document.addEventListener('DOMContentLoaded', function() {
    // 检测Font Awesome是否加载成功
    function checkFontAwesome() {
        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-leaf';
        testIcon.style.position = 'absolute';
        testIcon.style.left = '-9999px';
        testIcon.style.visibility = 'hidden';
        document.body.appendChild(testIcon);
        
        const computedStyle = window.getComputedStyle(testIcon, ':before');
        const content = computedStyle.getPropertyValue('content');
        
        document.body.removeChild(testIcon);
        
        // 如果Font Awesome没有加载，使用备用图标
        if (!content || content === 'none' || content === 'normal') {
            console.log('Font Awesome 未加载，使用备用图标');
            useFallbackIcons();
        } else {
            console.log('Font Awesome 加载成功');
        }
    }
    
    // 使用备用图标
    function useFallbackIcons() {
        const iconMappings = {
            'fas fa-leaf': 'icon-leaf',
            'fas fa-seedling': 'icon-seedling',
            'fas fa-award': 'icon-award',
            'fas fa-clock': 'icon-clock',
            'fas fa-heart': 'icon-heart',
            'fas fa-building': 'icon-building',
            'fas fa-office-building': 'icon-office-building',
            'fas fa-tree': 'icon-tree',
            'fas fa-check': 'icon-check',
            'fas fa-map-marker-alt': 'icon-map-marker',
            'fas fa-phone': 'icon-phone',
            'fas fa-envelope': 'icon-envelope'
        };
        
        // 替换所有Font Awesome图标
        Object.keys(iconMappings).forEach(faClass => {
            const elements = document.querySelectorAll(`.${faClass.replace(' ', '.')}`);
            elements.forEach(element => {
                element.className = `icon-fallback ${iconMappings[faClass]}`;
            });
        });
    }
    
    // 延迟检测，确保Font Awesome有时间加载
    setTimeout(checkFontAwesome, 1000);
});

// 导航栏功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接时关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 滚动时导航栏样式变化
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .advantage-item, .feature, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// 表单处理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const name = formData.get('name') || '未填写';
        const phone = formData.get('phone') || '未填写';
        const email = formData.get('email') || '未填写';
        const service = formData.get('service') || '未选择';
        const message = formData.get('message') || '未填写';
        
        // 构建消息内容
        const title = '🌿 新的绿植租赁咨询';
        const content = `姓名：${name}
电话：${phone}
邮箱：${email}
服务类型：${service}
详细需求：${message}
时间：${new Date().toLocaleString('zh-CN')}`;
        
        // Server酱推送
        const sendKey = 'SCT286062TMMgWhtCxAFqjPdoedYEtWKUq';
        const url = `https://sctapi.ftqq.com/${sendKey}.send`;
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                title: title,
                desp: content
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 0) {
                alert('提交成功！我们会尽快与您联系。');
                contactForm.reset();
            } else {
                alert('提交失败，请稍后重试或直接拨打电话联系我们。');
            }
        })
        .catch(error => {
            console.error('推送失败:', error);
            alert('提交失败，请稍后重试或直接拨打电话联系我们。');
        });
    });
}

// 数字动画效果
function animateNumbers() {
    const numbers = document.querySelectorAll('.advantage-number');
    numbers.forEach((number, index) => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = String(Math.floor(current)).padStart(2, '0');
        }, 50);
    });
}

// 当优势部分进入视口时触发数字动画
const advantagesSection = document.querySelector('.advantages');
if (advantagesSection) {
    const advantagesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                advantagesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    advantagesObserver.observe(advantagesSection);
}

// 服务卡片悬停效果增强
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 优势项目悬停效果
document.querySelectorAll('.advantage-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// 联系表单输入验证
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#2e7d32';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '#2e7d32';
        }
    });
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 为导航链接添加活跃状态
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// 添加活跃状态的CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2e7d32 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .service-card {
        transition: all 0.3s ease;
    }
    
    .advantage-item {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// 首页全屏轮播横幅功能
(function() {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    const dots = document.querySelectorAll('.hero-dots .dot');
    let current = 0;
    let timer = null;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
            if (dots[i]) dots[i].classList.toggle('active', i === idx);
        });
        current = idx;
    }

    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }
    function prevSlide() {
        showSlide((current - 1 + slides.length) % slides.length);
    }
    function startAuto() {
        timer = setInterval(nextSlide, 3000);
    }
    function stopAuto() {
        clearInterval(timer);
    }

    if (slides.length > 0 && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAuto(); startAuto();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAuto(); startAuto();
        });
        if (dots.length) {
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    showSlide(i);
                    stopAuto(); startAuto();
                });
            });
        }
        startAuto();
    }
})(); 