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
// STEP BY STEP REGISTRATION
// ============================================================

var currentStep = 1;
var totalSteps = 3;

function updateProgress() {
    var progress = (currentStep / totalSteps) * 100;
    var progressBar = document.getElementById('progressBar');
    var stepIndicator = document.getElementById('stepIndicator');
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    
    if (stepIndicator) {
        stepIndicator.textContent = 'Step ' + currentStep + ' of ' + totalSteps;
    }
}

function showStep(step) {
    document.querySelectorAll('.step').forEach(function(el) {
        el.classList.add('hidden');
    });
    
    var targetStep = document.getElementById('step' + step);
    if (targetStep) {
        targetStep.classList.remove('hidden');
        targetStep.style.animation = 'none';
        setTimeout(function() {
            targetStep.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, 10);
    }
    
    currentStep = step;
    updateProgress();
}

function nextStep(current) {
    if (current === 1) {
        var name = document.getElementById('regFullName');
        if (!name || !name.value.trim()) {
            showError('Please enter your name');
            name.focus();
            return;
        }
        if (name.value.trim().length < 2) {
            showError('Name must be at least 2 characters');
            name.focus();
            return;
        }
    }
    
    if (current === 2) {
        var faculty = document.getElementById('regFaculty');
        var shift = document.getElementById('regShift');
        var classSelect = document.getElementById('regClass');
        var section = document.getElementById('regSection');
        
        if (!faculty.value) {
            showError('Please select your faculty');
            return;
        }
        if (!shift.value) {
            showError('Please select your shift');
            return;
        }
        if (!classSelect.value) {
            showError('Please select your class');
            return;
        }
        if (!section.value) {
            showError('Please select your section');
            return;
        }
    }
    
    if (current < totalSteps) {
        showStep(current + 1);
    }
}

function prevStep(current) {
    if (current > 1) {
        showStep(current - 1);
    }
}

function selectOption(type, value) {
    var hiddenInput = document.getElementById('reg' + type.charAt(0).toUpperCase() + type.slice(1));
    if (hiddenInput) {
        hiddenInput.value = value;
    }
    
    var options = document.querySelectorAll('.' + type + '-option');
    options.forEach(function(opt) {
        opt.classList.remove('border-[#3498db]', 'bg-blue-50');
        opt.classList.add('border-gray-200');
    });
    
    var selected = document.querySelector('.' + type + '-option[onclick*="' + value + '"]');
    if (selected) {
        selected.classList.remove('border-gray-200');
        selected.classList.add('border-[#3498db]', 'bg-blue-50');
    }
}

// ============================================================
// TOGGLE PASSWORD
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
// ERROR/SUCCESS FUNCTIONS
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
// REGISTER SUBMIT
// ============================================================

function handleRegisterSubmit(event) {
    event.preventDefault();
    
    var fullName = document.getElementById('regFullName');
    var email = document.getElementById('regEmail');
    var password = document.getElementById('regPassword');
    var confirmPassword = document.getElementById('regConfirmPassword');
    var faculty = document.getElementById('regFaculty');
    var classSelect = document.getElementById('regClass');
    var section = document.getElementById('regSection');
    var shift = document.getElementById('regShift');
    var terms = document.getElementById('regTerms');
    var btn = document.getElementById('registerBtn');
    
    if (!fullName || !email || !password || !confirmPassword || !faculty || !classSelect || !section || !shift || !terms || !btn) return;
    
    var errorEl = document.querySelector('.login-error') || createErrorElement('registerForm');
    var successEl = document.querySelector('.login-success') || createSuccessElement('registerForm');
    
    errorEl.classList.remove('show');
    successEl.classList.remove('show');
    
    if (!fullName.value.trim()) {
        showError('Please enter your full name');
        fullName.focus();
        return;
    }
    
    if (!email.value.trim() || !email.value.includes('@') || !email.value.includes('.')) {
        showError('Please enter a valid email address');
        email.focus();
        return;
    }
    
    if (password.value.length < 6) {
        showError('Password must be at least 6 characters');
        password.focus();
        return;
    }
    
    if (password.value !== confirmPassword.value) {
        showError('Passwords do not match');
        confirmPassword.focus();
        return;
    }
    
    if (!faculty.value) {
        showError('Please select your faculty');
        faculty.focus();
        return;
    }
    
    if (!classSelect.value) {
        showError('Please select your class');
        classSelect.focus();
        return;
    }
    
    if (!section.value) {
        showError('Please select your section');
        section.focus();
        return;
    }
    
    if (!shift.value) {
        showError('Please select your shift');
        shift.focus();
        return;
    }
    
    if (!terms.checked) {
        showError('Please agree to the Terms of Service');
        return;
    }
    
    btn.classList.add('btn-loading');
    btn.innerHTML = '<span class="btn-spinner"></span><span class="btn-text">Creating Account...</span>';
    
    setTimeout(function() {
        // Generate UID
        var uid = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
        
        var users = JSON.parse(localStorage.getItem('viboUsers') || '[]');
        var newUser = {
            uid: uid,
            id: Date.now(),
            name: fullName.value.trim(),
            email: email.value.trim(),
            faculty: faculty.value,
            class: classSelect.value,
            section: section.value,
            shift: shift.value,
            friends: [],
            pendingRequests: [],
            joinedAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('viboUsers', JSON.stringify(users));
        
        btn.classList.remove('btn-loading');
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Account Created!';
        btn.style.background = 'linear-gradient(to right, #22c55e, #16a34a)';
        
        showSuccess('Account created successfully! Welcome to VIBO! Redirecting...');
        
        // Also store as logged in user
        localStorage.setItem('viboUser', JSON.stringify({
            uid: uid,
            email: email.value.trim(),
            name: fullName.value.trim(),
            role: 'student',
            loggedIn: true,
            loginTime: new Date().toISOString()
        }));
        
        setTimeout(function() {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 1500);
}

// ============================================================
// PASSWORD STRENGTH
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    var pwdInput = document.getElementById('regPassword');
    if (pwdInput) {
        pwdInput.addEventListener('input', function() {
            var val = this.value;
            var bars = [
                document.getElementById('pwdStrength1'),
                document.getElementById('pwdStrength2'),
                document.getElementById('pwdStrength3')
            ];
            var text = document.getElementById('pwdStrengthText');
            
            var strength = 0;
            if (val.length >= 6) strength++;
            if (val.length >= 10) strength++;
            if (/[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val)) strength++;
            
            bars.forEach(function(bar, index) {
                if (bar) {
                    if (index < strength) {
                        bar.className = 'h-1 flex-1 rounded-full bg-green-500';
                    } else {
                        bar.className = 'h-1 flex-1 rounded-full bg-gray-200';
                    }
                }
            });
            
            if (text) {
                if (val.length === 0) {
                    text.textContent = 'Use 6+ characters';
                    text.className = 'text-xs text-gray-400 mt-1';
                } else if (strength === 0) {
                    text.textContent = 'Weak - Add more characters';
                    text.className = 'text-xs text-red-500 mt-1';
                } else if (strength === 1) {
                    text.textContent = 'Fair - Try adding uppercase and numbers';
                    text.className = 'text-xs text-yellow-500 mt-1';
                } else if (strength === 2) {
                    text.textContent = 'Good - Almost there!';
                    text.className = 'text-xs text-blue-500 mt-1';
                } else {
                    text.textContent = 'Strong password!';
                    text.className = 'text-xs text-green-500 mt-1';
                }
            }
        });
    }
    
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

console.log(' Register Page Loaded');