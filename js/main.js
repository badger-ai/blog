// js/main.js - Working Version + Dark Mode

console.log("✅ main.js loaded successfully");

// ==================== DARK MODE ====================
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  // Toggle function
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    themeToggle.textContent = current === 'dark' ? '☀️' : '🌙';
  }

  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('touchend', (e) => {
    e.preventDefault();
    toggleTheme();
  });
}

// ==================== HAMBURGER MENU ====================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'flex';
  });
}

// ==================== YOUR POSTS ====================
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
  // Add new posts here easily:
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

// Scroll Animation
function animateOnScroll() {
  const cards = document.querySelectorAll('.post-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 150);
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
  setTimeout(animateOnScroll, 300);
});