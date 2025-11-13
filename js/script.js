// ===============================
// 📰 EMTAGHub101 — Article Script
// ===============================

// 🧱 Article Data (with ID, URL, and Publish Date)
const articles = [
  {
    id: 1,
    title: "Understanding OSH General Awareness",
    desc: "A beginner-friendly introduction to Occupational Safety and Health principles.",
    img: "https://picsum.photos/400/250?1",
    url: "articles/osh-general-awareness.html",
    date: "2025-11-10",
  },
  {
    id: 2,
    title: "Effective Workplace Safety Programs",
    desc: "Learn how to implement safety programs that actually work.",
    img: "https://picsum.photos/400/250?2",
    url: "articles/workplace-safety-programs.html",
    date: "2025-11-09",
  },
  {
    id: 3,
    title: "Troubleshooting Common PC Issues",
    desc: "Quick fixes for everyday technical problems in your workstation.",
    img: "https://picsum.photos/400/250?3",
    url: "articles/troubleshooting-pc.html",
    date: "2025-11-08",
  },
  {
    id: 4,
    title: "Networking Basics for IT Beginners",
    desc: "Understand how networks work and how to manage them efficiently.",
    img: "https://picsum.photos/400/250?4",
    url: "articles/networking-basics.html",
    date: "2025-11-07",
  },
  {
    id: 5,
    title: "DIY Home Electrical Safety Tips",
    desc: "Stay safe while doing home repairs and small electrical projects.",
    img: "https://picsum.photos/400/250?5",
    url: "articles/diy-electrical-safety.html",
    date: "2025-11-06",
  },
  {
    id: 6,
    title: "OSH Program: Fire Safety Management",
    desc: "Learn how to establish a workplace fire prevention program.",
    img: "https://picsum.photos/400/250?6",
    url: "articles/fire-safety-management.html",
    date: "2025-11-05",
  },
  {
    id: 7,
    title: "Network Troubleshooting Tools You Need",
    desc: "These tools will make your life easier when diagnosing connectivity issues.",
    img: "https://picsum.photos/400/250?7",
    url: "articles/network-troubleshooting-tools.html",
    date: "2025-11-04",
  },
  {
    id: 8,
    title: "Smart DIY Repairs for Every Home",
    desc: "Quick, cheap, and safe repair hacks that save you money.",
    img: "https://picsum.photos/400/250?8",
    url: "articles/smart-diy-repairs.html",
    date: "2025-11-03",
  },
  {
    id: 9,
    title: "OSH: Personal Protective Equipment (PPE)",
    desc: "Why PPE matters and how to select the right equipment.",
    img: "https://picsum.photos/400/250?9",
    url: "articles/ppe-awareness.html",
    date: "2025-11-02",
  },
  {
    id: 10,
    title: "Advanced Networking Concepts",
    desc: "Dive deeper into routers, switches, and real-world network optimization.",
    img: "https://picsum.photos/400/250?10",
    url: "articles/advanced-networking.html",
    date: "2025-11-01",
  },
];

// ===============================
// 📰 Update Latest Article
// ===============================
const latestArticleElement = document.getElementById("latest-article");
if (latestArticleElement) {
  const latest = articles[0];
  latestArticleElement.innerHTML = `
    <a href="${latest.url}" class="latest-blink" target="_blank">
      "${latest.title}"
    </a>`;
}

// ===============================
// 📑 Render Article Cards
// ===============================
const articlesContainer = document.getElementById("articlesContainer");

function renderArticles(list) {
  if (!articlesContainer) return;

  articlesContainer.innerHTML = "";
  list.forEach((a) => {
    const formattedDate = new Date(a.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const card = document.createElement("a");
    card.classList.add("article-card");
    card.href = a.url;
    card.target = "_blank";
    card.innerHTML = `
      <img src="${a.img}" alt="${a.title}">
      <div class="article-card-content">
        <h3>${a.title}</h3>
        <p>${a.desc}</p>
        <small>📅 Published: ${formattedDate}</small>
      </div>
    `;
    articlesContainer.appendChild(card);
  });
}

renderArticles(articles);

// ===============================
// 🔍 Search Filter + Results Dropdown
// ===============================
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

if (searchInput && searchResults) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (query === "") {
      searchResults.style.display = "none";
      renderArticles(articles);
      return;
    }

    const filtered = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.desc.toLowerCase().includes(query)
    );

    // Show filtered articles below
    renderArticles(filtered);

    // Show dropdown suggestions
    if (filtered.length > 0) {
      searchResults.style.display = "block";
      filtered.forEach((a) => {
        const item = document.createElement("div");
        item.classList.add("search-item");
        item.textContent = a.title;
        item.addEventListener("click", () => {
          window.open(a.url, "_blank");
        });
        searchResults.appendChild(item);
      });
    } else {
      searchResults.style.display = "block";
      searchResults.innerHTML = "<div class='no-result'>No results found</div>";
    }
  });
}

// ===============================
// 🍔 Mobile Navigation Toggle
// ===============================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ===============================
// 🍔 Dropdown Submenu Toggle (Mobile) 
// ===============================
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const dropdownToggle = dropdown.querySelector("a");

  dropdownToggle.addEventListener("click", (event) => {
    event.preventDefault();  // Prevent link navigation

    // Toggle the dropdown visibility
    dropdown.classList.toggle("active");

    // Optionally close other dropdowns
    dropdowns.forEach((otherDropdown) => {
      if (otherDropdown !== dropdown) {
        otherDropdown.classList.remove("active");
      }
    });
  });
});

