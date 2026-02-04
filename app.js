// ===== Attar Store JS (Search + WhatsApp Order) =====

const searchInput = document.getElementById("searchInput");
const resultText = document.getElementById("resultText");

// Your WhatsApp number (Sri Lanka format without +)
const WHATSAPP_NUMBER = "94788368642";

function normalize(s) {
  return (s || "").toLowerCase().trim();
}

function updateWhatsAppLinks() {
  const buttons = document.querySelectorAll(".wa-btn");

  buttons.forEach(btn => {
    const productName = btn.dataset.product || "Attar";
    const message =
`Hello Attar Store!
I want to order:

• ${productName}
Price: LKR 250

Please confirm availability and delivery.`;

    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    btn.href = link;
  });
}

function filterProducts(query) {
  const q = normalize(query);
  const cards = [...document.querySelectorAll(".product")];

  let visible = 0;

  cards.forEach(card => {
    const name = normalize(card.dataset.name);
    const title = normalize(card.querySelector(".pname")?.innerText);

    const match = name.includes(q) || title.includes(q);

    if (q === "" || match) {
      card.style.display = "";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  if (q === "") {
    resultText.textContent = "Showing all attars";
  } else {
    resultText.textContent = `Search: "${query}" • Showing ${visible} attar(s)`;
  }
}

// Live search
searchInput.addEventListener("input", (e) => {
  filterProducts(e.target.value);
});

// Initial load
updateWhatsAppLinks();
filterProducts("");
