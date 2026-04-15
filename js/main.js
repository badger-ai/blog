// js/main.js

const posts = [
  {
    title: "My First Soft Pink Day",
    date: "April 14, 2026",
    excerpt: "A peaceful beginning filled with soft colors and gentle thoughts.",
    slug: "first-post",
    image: "images/R.jpg"   // Change this to your image name
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

// Scroll Animation for Cards
function animateOnScroll() {
  const cards = document.querySelectorAll('.post-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 150);
  });
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  if (mobileMenu.style.display === 'flex') {
    mobileMenu.style.display = 'none';
  } else {
    mobileMenu.style.display = 'flex';
  }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
  setTimeout(animateOnScroll, 300);   // Slight delay for smooth effect
});