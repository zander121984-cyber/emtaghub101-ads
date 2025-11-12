// js/script.js
// EMTAGHub101 — Homepage interactivity and content population

// --- Article Data ---
const articles = [

{
  id: 'osh-001',
  title: "Understanding the OSHS General Provisions",
  excerpt: "Learn the key rules that form the foundation of workplace safety and health standards.",
  image: "images/article/osh/emtaghub101-occupational-safety-health.jpg",
  category: "OSH General Awareness",
  url: "article/osh/general.awareness/general.provision/index.html",
  published: "2025-11-11",
  trending: true
}

  
];

// --- Helpers ---
const q = sel => document.querySelector(sel);
const qa = sel => Array.from(document.querySelectorAll(sel));

// Format date helper
function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (e) {
    return iso;
  }
}

// --- Populate Home Page ---
function populateContent() {
  const sorted = articles.slice().sort((a, b) => new Date(b.published) - new Date(a.published));

  // 🔹 Frames 1–4 = Most Recent Articles
  for (let i = 0; i < 4; i++) {
    const a = sorted[i];
    const img = q(`#frame${i + 1}Img`);
    const label = q(`#frame${i + 1}Label`);
    const link = q(`#frame${i + 1}Link`);
    if (a && img && label && link) {
      img.src = a.image || "images/default.jpg";
      img.alt = a.title;
      // show title and date under it
      label.innerHTML = `${a.title} <br><small style="font-weight:600; font-size:12px; opacity:0.9;">${formatDate(a.published)}</small>`;
      link.href = a.url || "#";
    }
  }

  // 🔹 Featured Articles (rest)
  const featured = q("#featuredArticles");
  if (featured) {
    featured.innerHTML = "";
    sorted.slice(4).forEach(a => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card-body">
          <h4><a href="${a.url}">${a.title}</a></h4>
          <p>${a.excerpt}</p>
        </div>`;
      featured.appendChild(card);
    });
  }

  // 🔹 Trending Announcement (Blinking) — place latest/trending article in ticker
  const ticker = q("#announcementTicker");
  if (ticker) {
    ticker.innerHTML = "";
    const trending = articles.find(a => a.trending) || sorted[0];
    if (trending) {
      const anchor = document.createElement("a");
      anchor.href = trending.url || "#";
      anchor.className = "ticker-glow"; // uses the CSS glowing animation
      anchor.textContent = `🔥 FEATURED: ${trending.title} — ${formatDate(trending.published)}`;

      ticker.appendChild(anchor);
    }
  }
}

// --- Nav Behavior ---
function setupNavBehavior() {
  qa(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      qa(".nav-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// --- Initialize ---
document.addEventListener("DOMContentLoaded", () => {
  populateContent();
  setupNavBehavior();
  const yearEl = q("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ======================================================
// 🔍 SEARCH FEATURE — Displays results below input
// ======================================================
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const resultBox = document.getElementById("searchResults");

  // Set your GitHub Pages root folder name
  const basePath = '/emtaghub101/';

  if (searchInput && resultBox) {
    searchInput.addEventListener("input", function () {
      const term = this.value.toLowerCase().trim();
      resultBox.innerHTML = "";

      if (!term) return;

      const matches = articles.filter(a =>
        a.title.toLowerCase().includes(term) ||
        a.excerpt.toLowerCase().includes(term)
      );

      if (matches.length === 0) {
        resultBox.innerHTML = `<p class="no-results">No results found.</p>`;
        return;
      }

      matches.forEach(a => {
        const item = document.createElement("div");
        item.className = "search-item";
        item.innerHTML = `
          <a href="${basePath}${a.url}">
            <h4>${a.title}</h4>
            <p>${a.excerpt}</p>
          </a>`;
        resultBox.appendChild(item);
      });

      resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
});


