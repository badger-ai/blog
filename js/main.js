// js/main.js - Fixed Dark Mode + Sanity Posts

console.log("✅ main.js loaded");

// ==================== DARK MODE ====================
const themeToggle = document.getElementById('themeToggle');

function initDarkMode() {
  if (!themeToggle) {
    console.warn("Theme toggle button not found");
    return;
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  // Toggle function
  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  }

  // Add listeners
  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('touchend', (e) => {
    e.preventDefault();
    toggleTheme();
  });
}

// ==================== HAMBURGER MENU ====================
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    const toggleMenu = () => {
      mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'flex';
    };
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchend', (e) => {
      e.preventDefault();
      toggleMenu();
    });
  }
}

// ==================== FETCH POSTS FROM SANITY ====================
async function loadPostsFromSanity() {
  const container = document.getElementById('posts-container');
  if (!container) return;

  container.innerHTML = '<p>Loading posts...</p>';

  try {
    const PROJECT_ID = 'bw8xzmsp';
    const DATASET = 'production';
    const QUERY = `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      excerpt,
      "imageUrl": image.asset->url
    }`;

    const url = `https://${PROJECT_ID}.api.sanity.io/v2024-04-17/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}`;

    const response = await fetch(url);
    const data = await response.json();
    const posts = data.result || [];

    if (posts.length === 0) {
      container.innerHTML = '<p>No posts yet.</p>';
      return;
    }

    container.innerHTML = posts.map(post => `
      <div class="post-card">
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}">` : ''}
        <div class="card-content">
          <h3>${post.title}</h3>
          <p class="date">${new Date(post.publishedAt).toLocaleDateString()}</p>
          <p class="excerpt">${post.excerpt || ''}</p>
          <a href="posts/${post.slug.current}.html" class="read-more">Read More →</a>
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error("Sanity error:", error);
    container.innerHTML = '<p>Could not load posts from Sanity.</p>';
  }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
  loadPostsFromSanity();
  initDarkMode();
  initHamburger();
});