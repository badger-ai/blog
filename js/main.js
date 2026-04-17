// js/main.js - Simple Sanity Pull

console.log("✅ main.js loaded - trying to pull posts from Sanity");

// ==================== DARK MODE ====================
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    themeToggle.textContent = current === 'dark' ? '☀️' : '🌙';
  }

  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('touchend', toggleTheme);
}

// ==================== HAMBURGER MENU ====================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.style.display = (mobileMenu.style.display === 'flex') ? 'none' : 'flex';
  });
}

// ==================== PULL POSTS FROM SANITY ====================
async function loadPosts() {
  const container = document.getElementById('posts-container');
  if (!container) return;

  container.innerHTML = '<p>Loading posts from Sanity...</p>';

  try {
    const PROJECT_ID = 'bw8xzmsp';
    const DATASET = 'production';

    const query = `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      excerpt,
      "imageUrl": image.asset->url
    }`;

    const url = `https://${PROJECT_ID}.api.sanity.io/v2024-04-17/data/query/${DATASET}?query=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const data = await response.json();
    const posts = data.result || [];

    console.log("Sanity returned these posts:", posts);

    if (posts.length === 0) {
      container.innerHTML = '<p>No posts found in Sanity. Create and publish some posts in Sanity Studio.</p>';
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
    console.error("Error fetching from Sanity:", error);
    container.innerHTML = `<p>Could not load posts from Sanity.<br>Error: ${error.message}</p>`;
  }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', loadPosts);