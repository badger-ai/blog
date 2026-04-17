// js/main.js - Connected to Sanity

console.log("✅ main.js loaded - fetching from Sanity");

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

// ==================== FETCH POSTS FROM SANITY ====================
async function loadPostsFromSanity() {
  const container = document.getElementById('posts-container');
  if (!container) return;

  container.innerHTML = '<p>Loading posts...</p>';

  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      excerpt,
      "imageUrl": image.asset->url
    }`;

    // Replace with your actual Sanity client setup
    const posts = await fetch('https://bw8xzmsp.api.sanity.io/v2024-04-17/data/query/production?query=' + encodeURIComponent(query))
      .then(res => res.json())
      .then(data => data.result);

    if (posts.length === 0) {
      container.innerHTML = '<p>No posts yet. Create some in Sanity Studio.</p>';
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
    console.error("Failed to load posts from Sanity:", error);
    container.innerHTML = '<p>Could not load posts from Sanity. Please check your connection.</p>';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadPostsFromSanity();
});