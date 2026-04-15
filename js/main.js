// js/main.js - Complete Version with Dark Mode

// ==================== DARK MODE TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');

function initDarkMode() {
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme');

  // Apply saved theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  // Click handler
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  });
}

// ==================== HAMBURGER MENU ====================
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      if (mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
      } else {
        mobileMenu.style.display = 'flex';
      }
    });
  }
}

// ==================== RENDER POSTS ON HOMEPAGE ====================
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

// ==================== SCROLL ANIMATION ====================
function animateCards() {
  const cards = document.querySelectorAll('.post-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 150);
  });
}

// ==================== INITIALIZE EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
  initDarkMode();
  initHamburger();
  setTimeout(animateCards, 300);
});