// js/main.js - Fixed Mobile Dark Mode + Better Touch Support

// ==================== DARK MODE TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');

function initDarkMode() {
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  // Better click handler for both desktop and mobile
  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('touchend', (e) => {
    e.preventDefault();        // Prevent ghost clicks
    toggleTheme();
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  
  // Update button icon
  if (themeToggle) {
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }
}

// ==================== HAMBURGER MENU ====================
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'flex';
    });

    // Also support touch on mobile
    hamburger.addEventListener('touchend', (e) => {
      e.preventDefault();
      mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'flex';
    });
  }
}

// ==================== RENDER POSTS ====================
const posts = [
  {
    title: "My First Soft Pink Day",
    date: "April 14, 2026",
    excerpt: "A peaceful beginning filled with soft colors and gentle thoughts.",
    slug: "first-post",
    image: "images/R.jpg"
  },
  {
    title: "The Beauty of Slow Living",
    date: "April 12, 2026",
    excerpt: "Learning to enjoy every small moment in this fast world.",
    slug: "slow-living",
    image: "images/S.jpg"
  }
];

function renderPosts() {
  const container = document.getElementById('posts-container');
  if (!container) return;

  container.innerHTML = posts.map(post => `
    <div class="post-card">
      ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
      <div class="card-content">
        <h3>${post.title}</h3>
        <p class="date">${post.date}</p>
        <p class="excerpt">${post.excerpt}</p>
        <a href="posts/${post.slug}.html" class="read-more">Read More →</a>
      </div>
    </div>
  `).join('');
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
  initDarkMode();
  initHamburger();
});