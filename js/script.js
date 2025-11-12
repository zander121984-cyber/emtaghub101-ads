// =====================================================
// EMTAGHub101 — Homepage interactivity and article loader
// =====================================================

// --- Article Data ---
const articles = [
  {
    id: 'osh-002',
    title: "👉 Explore Rule 1010: Other Safety Rules | Explanation and Practical Examples (OSHS Philippines)",
    excerpt: "Discover how Rule 1010 — Other Safety Rules — strengthens workplace safety through real-world applications and examples.",
    image: "images/article/osh/emtaghub101-osh-inspection-kitchen.jpg",
    category: "OSH General Awareness",
    url: "article/osh/general.awareness/other.safety.rule/index.html",
    published: "2025-11-11",
    trending: true
  },
  {
    id: 'osh-001',
    title: "Understanding the OSHS General Provisions",
    excerpt: "Learn the key rules that form the foundation of workplace safety and health standards.",
    image: "images/article/osh/emtaghub101-occupational-safety-health.jpg",
    category: "OSH General Awareness",
    url: "article/osh/general.awareness/general.provision/index.html",
    published: "2025-11-10",
    trending: false
  }
];

// --- Helpers ---
const q = s => document.querySelector(s);
const qa = s => Array.from(document.querySelectorAll(s));

// Automatically detect GitHub Pages base path (e.g., /emtaghub101/)
const pathParts = window.location.pathname.split("/");
const basePath = pathParts.includes("emtaghub101") ? "/emtaghub101/" : "/";

// --- Format date helper ---
function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

// =====================================================
// 📰 POPULATE HOMEPAGE ARTICLES
// =====================================================
function populateContent() {
  console.log("✅ populateContent() running...");

  if (!articles.length) return console.warn("⚠️ No articles found!");

  const sorted = [...articles].sort((a, b) => new Date(b.published) - new Date(a.published));

  // 🔹 Fill top 4 frames (most recent)
  for (let i = 0; i < Math.min(4, sorted.length); i++) {
    const a = sorted[i];
    const img = q(`#frame${i + 1}Img`);
    const label = q(`#frame${i + 1}Label`);
    const link = q(`#frame${i + 1}Link`);
    if (img && label && link) {
      img.src = basePath + a.image;
      img.alt = a.title;
      label.innerHTML = `${a.title}<br><small>${formatDate(a.published)}</small>`;
      link.href = basePath + a.url;
    }
  }

  // 🔹 Display all articles as cards
  const featured = q("#featuredArticles");
  if (featured) {
    featured.innerHTML = "";
    sorted.forEach(a => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card-body">
          <h4><a href="${basePath + a.url}">${a.title}</a></h4>
          <p>${a.excerpt}</p>
        </div>`;
      featured.appendChild(card);
    });
  }

  // 🔹 Announcement ticker (first trending or latest)
  const ticker = q("#announcementTicker");
  if (ticker) {
    ticker.innerHTML = "";
    const trending = articles.find(a => a.trending) || sorted[0];
    const a = trending;
    const anchor = document.createElement("a");
    anchor.href = basePath + a.url;
    anchor.className = "ticker-glow";
    anchor.textContent = `🔥 FEATURED: ${a.title} — ${formatDate(a.published)}`;
    ticker.appendChild(anchor);
  }
}

// =====================================================
// 🔍 UNIVERSAL SEARCH
// =====================================================
function setupSearch() {
  const input = q("#searchInput");
  const box = q("#searchResults");
  if (!input || !box) return;

  input.addEventListener("input", () => {
    const term = input.value.toLowerCase().trim();
    box.innerHTML = "";
    if (!term) return;

    const matches = articles.filter(
      a => a.title.toLowerCase().includes(term) || a.excerpt.toLowerCase().includes(term)
    );

    if (!matches.length) {
      box.innerHTML = `<p class="no-results">No results found.</p>`;
      return;
    }

    matches.forEach(a => {
      const item = document.createElement("div");
      item.className = "search-item";
      item.innerHTML = `
        <a href="${basePath + a.url}">
          <h4>${a.title}</h4>
          <p>${a.excerpt}</p>
        </a>`;
      box.appendChild(item);
    });
  });
}

// =====================================================
// 🚀 INIT
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ EMTAGHub101 JS Loaded!");
  populateContent();
  setupSearch();
  const yearEl = q("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
