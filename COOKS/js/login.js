// ============================================================
// PRELOADER - FAST
// ============================================================

(function() {
    var preloader = document.getElementById('preloader');
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
// TOGGLE PASSWORD VISIBILITY
// ============================================================

function togglePasswordVisibility(inputId, iconId) {
    var input = document.getElementById(inputId);
    var icon = document.getElementById(iconId);
    if (input && icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }
}

// ============================================================
// CREATE ERROR/SUCCESS ELEMENTS
// ============================================================

function createErrorElement(formId) {
    var form = document.getElementById(formId);
    if (!form) return document.createElement('div');
    var div = document.createElement('div');
    div.className = 'login-error';
    div.innerHTML = '<i class="fas fa-exclamation-circle"></i> <span class="error-text"></span>';
    form.insertBefore(div, form.firstChild);
    return div;
}

function createSuccessElement(formId) {
    var form = document.getElementById(formId);
    if (!form) return document.createElement('div');
    var div = document.createElement('div');
    div.className = 'login-success';
    div.innerHTML = '<i class="fas fa-check-circle"></i> <span class="success-text"></span>';
    form.insertBefore(div, form.firstChild);
    return div;
}

// ============================================================
// SHOW ERROR/SUCCESS MESSAGES
// ============================================================

function showError(message) {
    var errorEl = document.querySelector('.login-error');
    if (errorEl) {
        var textEl = errorEl.querySelector('.error-text');
        if (textEl) textEl.textContent = message;
        errorEl.classList.add('show');
        setTimeout(function() {
            errorEl.classList.remove('show');
        }, 5000);
    }
}

function showSuccess(message) {
    var successEl = document.querySelector('.login-success');
    if (successEl) {
        var textEl = successEl.querySelector('.success-text');
        if (textEl) textEl.textContent = message;
        successEl.classList.add('show');
    }
}

// ============================================================
// LOGIN SUBMIT
// ============================================================

function handleLoginSubmit(event) {
    event.preventDefault();
    
    var email = document.getElementById('loginEmail');
    var password = document.getElementById('loginPassword');
    var btn = document.getElementById('loginBtn');
    
    if (!email || !password || !btn) return;
    
    var emailValue = email.value.trim();
    var passwordValue = password.value.trim();
    
    var errorEl = document.querySelector('.login-error') || createErrorElement('loginForm');
    var successEl = document.querySelector('.login-success') || createSuccessElement('loginForm');
    
    errorEl.classList.remove('show');
    successEl.classList.remove('show');
    
    if (!emailValue || !passwordValue) {
        showError('Please enter both email and password');
        return;
    }
    
    if (!emailValue.includes('@') || !emailValue.includes('.')) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (passwordValue.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    btn.classList.add('btn-loading');
    btn.innerHTML = '<span class="btn-spinner"></span><span class="btn-text">Signing In...</span>';
    
    var demoUsers = [
        { email: 'admin@vibo.com', password: 'admin123', role: 'admin', name: 'Admin User' },
        { email: 'student@vibo.com', password: 'student123', role: 'student', name: 'Student User' }
    ];
    
    var user = null;
    for (var i = 0; i < demoUsers.length; i++) {
        if (demoUsers[i].email === emailValue && demoUsers[i].password === passwordValue) {
            user = demoUsers[i];
            break;
        }
    }
    
    setTimeout(function() {
        if (user) {
            btn.classList.remove('btn-loading');
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Success!';
            btn.style.background = 'linear-gradient(to right, #22c55e, #16a34a)';
            
            showSuccess('Welcome back, ' + user.name + '! Redirecting...');
            
            // Generate UID for user
            var uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
            
            localStorage.setItem('viboUser', JSON.stringify({
                uid: uid,
                email: user.email,
                name: user.name,
                role: user.role,
                loggedIn: true,
                loginTime: new Date().toISOString()
            }));
            
            setTimeout(function() {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            btn.classList.remove('btn-loading');
            btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
            btn.style.background = '';
            
            var emailExists = false;
            for (var j = 0; j < demoUsers.length; j++) {
                if (demoUsers[j].email === emailValue) {
                    emailExists = true;
                    break;
                }
            }
            
            if (emailExists) {
                showError('Incorrect password. Please try again.');
            } else {
                showError('Account not found. Please check your email or sign up.');
            }
        }
    }, 1500);
}

// ============================================================
// CHECK LOGIN STATUS
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    var user = localStorage.getItem('viboUser');
    if (user) {
        try {
            var parsed = JSON.parse(user);
            if (parsed.loggedIn) {
                window.location.href = 'dashboard.html';
            }
        } catch (e) {}
    }
});

console.log(' Login Page Loaded');