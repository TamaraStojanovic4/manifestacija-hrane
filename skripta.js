/* ==========================================
   1. AUTOMATSKI SLAJDER (index.html)
   ========================================== */
let slike = ["slika1.jpg", "slika2.jpg", "slika1.jpg"]; // Niz slika (podesite imena datoteka)
let trenutnaSlika = 0;

function promeniSliku() {
    trenutnaSlika++;
    if (trenutnaSlika >= slike.length) {
        trenutnaSlika = 0;
    }
    let slider = document.getElementById("slider");
    if (slider) {
        slider.src = slike[trenutnaSlika];
    }
}

if (document.getElementById("slider")) {
    setInterval(promeniSliku, 3000);
}

/* ==========================================
   2. VALIDACIJA KONTAKT FORME & LOCALSTORAGE
   ========================================== */
let forma = document.getElementById("kontaktForma");

if (forma) {
    forma.addEventListener("submit", function (dogadjaj) {
        dogadjaj.preventDefault();

        let ime = document.getElementById("ime").value.trim();
        let email = document.getElementById("email").value.trim();
        let poruka = document.getElementById("poruka").value.trim();

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (ime === "" || ime.length < 2) {
            alert("Morate uneti ispravno ime (minimalno 2 karaktera).");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Unesite ispravnu email adresu.");
            return;
        }

        if (poruka.length < 10) {
            alert("Poruka mora imati najmanje 10 karaktera.");
            return;
        }

        // Čuvanje u LocalStorage
        let svePoruke = JSON.parse(localStorage.getItem("poruke")) || [];
        svePoruke.push({
            ime: ime,
            email: email,
            poruka: poruka,
            datum: new Date().toLocaleString()
        });

        localStorage.setItem("poruke", JSON.stringify(svePoruke));
        alert("Poruka je uspešno sačuvana!");
        forma.reset();
    });
}

/* ==========================================
   3. HAMBURGER MENI (jQuery)
   ========================================== */
function toggleMenu() {
    $("#meni").slideToggle(300, function() {
        if ($(this).is(':visible')) {
            $(this).css('display', 'flex'); // Održava flex strukturu pri prikazu
        }
    }).toggleClass("active");
}

/* ==========================================
   4. PRISTUPOČNOST: BOJA / TEMA (Dark Mode)
   ========================================== */
function promeniTemu() {
    document.body.classList.toggle("dark");
    localStorage.setItem("tema", document.body.classList.contains("dark"));
}

// Provera i postavljanje teme odmah pri učitavanju skripte
if (localStorage.getItem("tema") === "true") {
    document.body.classList.add("dark");
}

/* ==========================================
   5. PRISTUPAČNOST: VELIČINA FONTA (A+ / A-)
   ========================================== */
function veciFont() {
    document.documentElement.style.fontSize = "130%";
    localStorage.setItem("font", "130%");
}

function manjiFont() {
    document.documentElement.style.fontSize = "100%";
    localStorage.setItem("font", "100%");
}

// Učitavanje sačuvanog fonta iz LocalStorage
let sacuvanFont = localStorage.getItem("font");
if (sacuvanFont) {
    document.documentElement.style.fontSize = sacuvanFont;
}