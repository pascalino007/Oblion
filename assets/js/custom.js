    
    const hamburger = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });