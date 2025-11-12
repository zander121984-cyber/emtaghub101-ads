// EMTAGHub101 — Homepage interactivity and content population

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
    published: "2025-11-11",
    trending: true
  }
];

// --- Helpers ---
const q = sel => document.querySelector(sel);
const qa = sel => Array.from(document.querySelectorAll(sel));

// Automatically detect GitHub Pages base path (e.g., /emtaghub101/)
const pathParts = window.location.pathname.split("/");
const basePath = pathParts.length > 1 ? `/${pathParts[1]}/` : "/";

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
      img.src = `${basePath}${a.image || "images/default.jpg"}`;
      img.alt = a.title;
      label.innerHTML = `${a.title} <br><small style="font-weight:600; font-size:12px; opacity:0.9;">${formatDate(a.published)}</small>`;
      link.href = `${basePath}${a.url}`;
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
          <h4><a href="${basePath}${a.url}">${a.title}</a></h4>
          <p>${a.excerpt}</p>
        </div>`;
      featured.appendChild(card);
    });
  }

  // 🔹 Trending Announcement
  const ticker = q("#announcementTicker");
  if (ticker) {
    ticker.innerHTML = "";
    const trending = articles.find(a => a.trending) || sorted[0];
    if (trending) {
      const anchor = document.createElement("a");
      anchor.href = `${basePath}${trending.url}`;
      anchor.className = "ticker-glow";
      anchor.textContent = `🔥 FEATURED: ${trending.title} — ${formatDate(trending.published)}`;
      ticker.appendChild(anchor);
    }
  }
}

