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
// CHECK LOGIN STATUS & LOAD USER
// ============================================================

var currentUser = null;
var currentUserData = null;

document.addEventListener('DOMContentLoaded', function() {
    var user = localStorage.getItem('viboUser');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    try {
        currentUser = JSON.parse(user);
        if (!currentUser.loggedIn) {
            window.location.href = 'login.html';
            return;
        }
        
        // Update user info
        document.getElementById('userName').textContent = currentUser.name || 'Student';
        document.getElementById('userAvatar').src = currentUser.avatar || 'assets/images/default-avatar.png';
        
        // Load user data
        var users = JSON.parse(localStorage.getItem('viboUsers') || '[]');
        currentUserData = users.find(u => u.email === currentUser.email);
        
        // Load default page (home)
        navigateTo('home');
        
    } catch (e) {
        window.location.href = 'login.html';
    }
});

// ============================================================
// SIDEBAR TOGGLE (Mobile)
// ============================================================

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// ============================================================
// USER MENU DROPDOWN
// ============================================================

function toggleUserMenu() {
    var dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

document.addEventListener('click', function(event) {
    var profile = document.querySelector('.user-profile');
    var dropdown = document.getElementById('userDropdown');
    if (profile && dropdown && !profile.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});

// ============================================================
// NAVIGATE - Load Pages Dynamically
// ============================================================

var currentPage = 'home';

function navigateTo(page) {
    currentPage = page;
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.classList.remove('active');
        if (item.dataset.page === page) {
            item.classList.add('active');
        }
    });
    
    // Close mobile sidebar
    var sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove('open');
    }
    
    // Close user dropdown
    var dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.add('hidden');
    }
    
    // Show loading
    var container = document.getElementById('pageContainer');
    var loading = document.getElementById('pageLoading');
    if (container && loading) {
        loading.style.display = 'flex';
        container.innerHTML = '';
    }
    
    // Load the page
    loadPage(page);
}

function loadPage(page) {
    var container = document.getElementById('pageContainer');
    var loading = document.getElementById('pageLoading');
    
    // Map page to HTML file path
    var pageMap = {
        'home': 'dash-nav-itm/html/home.html',
        'feed': 'dash-nav-itm/html/feed.html',
        'messages': 'dash-nav-itm/html/messages.html',
        'friends': 'dash-nav-itm/html/friends.html',
        'study-materials': 'dash-nav-itm/html/study-materials.html',
        'my-files': 'dash-nav-itm/html/my-files.html',
        'profile': 'dash-nav-itm/html/profile.html',
        'settings': 'dash-nav-itm/html/settings.html'
    };
    
    var pageFile = pageMap[page];
    if (!pageFile) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #ef4444;">Page not found</p>';
        loading.style.display = 'none';
        return;
    }
    
    // Fetch the HTML content
    fetch(pageFile)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(function(html) {
            container.innerHTML = html;
            loading.style.display = 'none';
            
            // Load corresponding JS
            loadPageJS(page);
            
            // Initialize page specific functionality
            if (page === 'home') {
                if (typeof loadHome === 'function') loadHome();
            } else if (page === 'feed') {
                if (typeof loadFeed === 'function') loadFeed();
            } else if (page === 'profile') {
                // Profile data is loaded via its own JS
            }
        })
        .catch(function(error) {
            console.error('Error loading page:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #6b7280;">
                    <i class="fas fa-exclamation-circle text-4xl mb-3" style="display: block;"></i>
                    <p style="font-size: 16px;">Could not load page</p>
                    <p style="font-size: 14px;">Please try again later</p>
                </div>
            `;
            loading.style.display = 'none';
        });
}

function loadPageJS(page) {
    // Dynamically load the corresponding JS file
    var jsMap = {
        'home': 'dash-nav-itm/js/home.js',
        'feed': 'dash-nav-itm/js/feed.js',
        'messages': 'dash-nav-itm/js/messages.js',
        'friends': 'dash-nav-itm/js/friends.js',
        'study-materials': 'dash-nav-itm/js/study-materials.js',
        'my-files': 'dash-nav-itm/js/my-files.js',
        'profile': 'dash-nav-itm/js/profile.js',
        'settings': 'dash-nav-itm/js/settings.js'
    };
    
    var jsFile = jsMap[page];
    if (!jsFile) return;
    
    // Check if already loaded
    var scriptId = 'script-' + page;
    if (document.getElementById(scriptId)) return;
    
    var script = document.createElement('script');
    script.id = scriptId;
    script.src = jsFile;
    script.async = true;
    document.body.appendChild(script);
}

// ============================================================
// NAVIGATION CLICK HANDLERS
// ============================================================

document.querySelectorAll('.nav-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        var page = this.dataset.page;
        if (page) {
            navigateTo(page);
        }
    });
});

// ============================================================
// CREATE POST MODAL
// ============================================================

function openCreatePost(type) {
    // Navigate to feed page first
    navigateTo('feed');
    
    // Then open modal after a small delay
    setTimeout(function() {
        var modal = document.getElementById('createPostModal');
        if (modal) {
            modal.classList.remove('hidden');
            if (type) {
                selectPostType(type);
            }
        } else {
            // Create modal if it doesn't exist
            createPostModal();
            setTimeout(function() {
                var modal = document.getElementById('createPostModal');
                if (modal) {
                    modal.classList.remove('hidden');
                    if (type) {
                        selectPostType(type);
                    }
                }
            }, 100);
        }
    }, 300);
}

function createPostModal() {
    var modal = document.createElement('div');
    modal.id = 'createPostModal';
    modal.className = 'modal hidden';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create Post</h3>
                <button class="modal-close" onclick="closeCreatePost()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="post-type-selector">
                    <button onclick="selectPostType('study')" class="post-type-btn active" data-type="study"><i class="fas fa-book text-blue-500"></i> Study</button>
                    <button onclick="selectPostType('fun')" class="post-type-btn" data-type="fun"><i class="fas fa-smile text-yellow-500"></i> Fun</button>
                    <button onclick="selectPostType('confession')" class="post-type-btn" data-type="confession"><i class="fas fa-lightbulb text-purple-500"></i> Confession</button>
                </div>
                <textarea placeholder="What's on your mind?" class="post-textarea" id="postContent"></textarea>
                <div class="post-media-upload">
                    <button><i class="fas fa-image"></i> Photo</button>
                    <button><i class="fas fa-video"></i> Video</button>
                    <button><i class="fas fa-file"></i> File</button>
                </div>
                <button class="post-submit-btn" onclick="submitPost()"><i class="fas fa-paper-plane"></i> Post</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeCreatePost();
        }
    });
}

function closeCreatePost() {
    var modal = document.getElementById('createPostModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function selectPostType(type) {
    document.querySelectorAll('.post-type-btn').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        }
    });
}

function submitPost() {
    var content = document.getElementById('postContent');
    var typeBtn = document.querySelector('.post-type-btn.active');
    var type = typeBtn ? typeBtn.dataset.type : 'study';
    
    if (!content || !content.value.trim()) {
        alert('Please write something');
        return;
    }
    
    // Get current user
    var user = JSON.parse(localStorage.getItem('viboUser') || '{}');
    var users = JSON.parse(localStorage.getItem('viboUsers') || '[]');
    var userData = users.find(u => u.email === user.email);
    
    // Create post
    var posts = JSON.parse(localStorage.getItem('viboPosts') || '[]');
    var newPost = {
        id: 'post_' + Date.now(),
        userId: userData ? userData.id : Date.now(),
        content: content.value.trim(),
        type: type,
        isAnonymous: type === 'confession',
        likes: [],
        comments: [],
        createdAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    localStorage.setItem('viboPosts', JSON.stringify(posts));
    
    alert('Post created successfully!');
    closeCreatePost();
    content.value = '';
    
    // Reload feed
    if (currentPage === 'feed' && typeof loadFeed === 'function') {
        loadFeed();
    }
}

// ============================================================
// LOGOUT
// ============================================================

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('viboUser');
        window.location.href = 'login.html';
    }
}

// ============================================================
// GLOBAL SEARCH
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                var query = this.value.trim();
                if (query) {
                    alert('Searching for: ' + query + '\n(Search functionality coming soon!)');
                }
            }
        });
    }
});

console.log(' Dashboard Loaded Successfully!');
console.log(' Welcome to VIBO - Connect, Learn & Collaborate');