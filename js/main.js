// js/main.js - Fixed & Stable Version (Works on iPhone Chrome + Safari)

console.log("✅ main.js loaded successfully");

// ==================== DARK MODE ====================
const themeToggle = document.getElementById('themeToggle');

function initDarkMode() {
  if (!themeToggle) {
    console.log("Theme toggle button not found");
    return;
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  // Toggle function
  function toggleTheme(e) {
    if (e) e.preventDefault();
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  }

  // Add both click and touch events
  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('touchend', toggleTheme);
}

// ==================== HAMBURGER MENU ====================
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    const toggleMenu = (e) => {
      if (e) e.preventDefault();
      mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'flex';
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchend', toggleMenu);
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
  if (!container) {
    console.log("⚠️ posts-container not found");
    return;
  }

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

  console.log("✅ Posts rendered successfully");
}

// ==================== START EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log("📱 Page fully loaded");
  renderPosts();
  initDarkMode();
  initHamburger();
});