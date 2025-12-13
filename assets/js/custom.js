    
    const hamburger = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    $('#webticker-dark-icons').webTicker('stop');
$('#webticker-dark-icons').webTicker('destroy');

loadCryptoPrices().then(() => {
    $('#webticker-dark-icons').webTicker({
        duplicate: false
    });
});

    async function loadCryptoPrices() {
    const coins = ["bitcoin", "ethereum", "neo"];
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(",")}&vs_currencies=usd`;

    const res = await fetch(url);
    const data = await res.json();

    document.querySelectorAll("#webticker-dark-icons li").forEach(li => {
        const coinId = li.dataset.coin;
        if (data[coinId]) {
            li.querySelector(".coin-value").textContent =
                `$${data[coinId].usd.toLocaleString()}`;
        }
    });
}

// 1️⃣ Load prices
loadCryptoPrices().then(() => {
    // 2️⃣ Start ticker AFTER prices are set
    $('#webticker-dark-icons').webTicker({
        speed: 40,
        duplicate: false   // 🔥 VERY IMPORTANT
    });
});

    