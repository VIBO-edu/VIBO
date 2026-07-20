// ============================================================
// PRELOADER - FAST (300ms)
// ============================================================

(function() {
    const preloader = document.getElementById('preloader');
    
    if (document.readyState === 'complete') {
        setTimeout(function() {
            if (preloader) preloader.classList.add('hidden');
        }, 100);
        return;
    }
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            if (preloader) preloader.classList.add('hidden');
        }, 300);
    });
    
    setTimeout(function() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 800);
})();

// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        }
    }
});

// ============================================================
// MOBILE MENU
// ============================================================

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.querySelector('#menuIcon');
    if (menu) {
        menu.classList.toggle('hidden');
        if (menu.classList.contains('hidden')) {
            icon.className = 'fas fa-bars';
        } else {
            icon.className = 'fas fa-times';
        }
    }
}

document.querySelectorAll('#mobileMenu a').forEach(function(link) {
    link.addEventListener('click', function() {
        const menu = document.getElementById('mobileMenu');
        const icon = document.querySelector('#menuIcon');
        if (menu) {
            menu.classList.add('hidden');
            icon.className = 'fas fa-bars';
        }
    });
});

// ============================================================
// FAQ TOGGLE
// ============================================================

function toggleFaq(button) {
    var answer = button.nextElementSibling;
    var icon = button.querySelector('i');
    
    document.querySelectorAll('.faq-answer').forEach(function(ans) {
        if (ans !== answer && ans.classList.contains('show')) {
            ans.classList.remove('show');
            ans.previousElementSibling.classList.remove('active');
            ans.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
    
    answer.classList.toggle('show');
    button.classList.toggle('active');
    
    if (answer.classList.contains('show')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// ============================================================
// SMOOTH SCROLL
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================================
// SCROLL TO TOP BUTTON
// ============================================================

var scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.className = 'fixed bottom-6 right-6 bg-[#3498db] text-white w-12 h-12 rounded-full shadow-lg hover:bg-[#2c3e50] transition-all opacity-0 pointer-events-none z-50 hover:scale-110';
scrollBtn.id = 'scrollTopBtn';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.pointerEvents = 'auto';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
    }
});

scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================
// NEWSLETTER
// ============================================================

function subscribeNewsletter() {
    var email = document.getElementById('newsletterEmail');
    if (email) {
        var value = email.value.trim();
        if (!value) {
            alert('Please enter your email address');
            return;
        }
        if (!value.includes('@') || !value.includes('.')) {
            alert('Please enter a valid email address');
            return;
        }
        alert('Thank you for subscribing to VIBO updates!');
        email.value = '';
    }
}

// ============================================================
// WATCH DEMO
// ============================================================

function watchDemo() {
    alert('Demo video coming soon!');
}

// ============================================================
// CONSOLE
// ============================================================

console.log('%c VIBO Education', 'font-size: 30px; font-weight: bold; color: #2c3e50;');
console.log('%cWelcome to VIBO - Connect, Learn & Collaborate', 'font-size: 16px; color: #3498db;');
console.log('%c Start your learning journey today!', 'font-size: 14px; color: #2ecc71;');
console.log(' VIBO Loaded Successfully!');