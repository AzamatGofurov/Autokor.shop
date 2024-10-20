// ------ Navigation barni "active" qilish va tegishli sectionni ko'rsatish -----
// Barcha IDli div elementlarni tanlab olish
const divs = document.querySelectorAll('div[id]'); // IDga ega bo'lgan barcha divlarni tanlaymiz
const navLinks = document.querySelectorAll('.navigation a'); // Har bir navigation linkini tanlab olish

// Funktsiya: Faqat tegishli IDga ega bo'lgan divlarni ko'rsatish, qolganlarini yashirish
function showDivs(e) {
    e.preventDefault(); // Havola (link)ning standart funksiyasini bekor qilish

    // Barcha divlarni "display: none" qilib yashirish
    divs.forEach(div => {
        div.style.display = 'none'; // Barcha divlarni yashiramiz
    });

    // Linkning href atributidan IDlarni olish (bir nechta ID bo'lsa, ',' bilan ajratamiz)
    const ids = e.target.getAttribute('href').split(','); // Href ichidagi IDlarni ajratamiz

    // Har bir ID uchun tegishli divni ko'rsatish
    ids.forEach(id => {
        const divToShow = document.getElementById(id.trim().replace('#', '')); // IDdan # belgisini olib tashlash
        if (divToShow) {
            divToShow.style.display = ''; // Divni asl display qiymatini tiklash (flex yoki block bo'lishi mumkin)
        }
    });
}

// Har bir navigation link uchun event listener qo'shish
navLinks.forEach(link => {
    link.addEventListener('click', showDivs); // Har bir link bosilganda showDivs funksiyasi ishlaydi
});

// Sahifa yuklanganda faqat "Uy" bo'limlari ko'rinadi, qolganlari yashiriladi
window.addEventListener('DOMContentLoaded', () => {
    divs.forEach(div => {
        if (div.id === 'main_section' || div.id === 'content-section' || div.id === 'mashinalar-section' || div.id === 'car-listing__section') {
            div.style.display = ''; // "Uy" bo'limlarini ko'rsatamiz
        } else {
            div.style.display = 'none'; // Boshqa bo'limlarni yashiramiz
        }
    });
});
 


// ------ Nav linklari uchun 'active' class qo'shish -----
navLinks.forEach((link) => {
    link.addEventListener('click', function() {
        // Hamma linklardan 'active' sinfini olib tashlaymiz
        navLinks.forEach((link) => link.classList.remove('active'));

        // Bosilgan linkga 'active' sinfini qo'shamiz
        this.classList.add('active');
    });
});

// ------ "Avto Top" H1 matn animatsiyasi ------
const text = document.querySelector('.letter-animation');
const textContent = text.textContent;
text.innerHTML = ''; // Matnni bo'shatamiz

// Har bir harfni span ichiga joylashtiramiz
textContent.split('').forEach((letter) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.setAttribute('data-letter', letter); // Soya uchun harfni data-attribute sifatida saqlaymiz
    text.appendChild(span);
});

const spans = document.querySelectorAll('.letter-animation span');

function animateLetters() {
    // Hamma harflarni ko'rsatish (kattalashtirish)
    spans.forEach((span, i) => {
        setTimeout(() => {
            span.classList.add('show');
        }, i * 300); // Har bir harf 300ms kechikish bilan ko'rinadi
    });

    // Harflar ko'rinib bo'lgandan keyin 3 soniya kutamiz va keyin kichraytiramiz
    setTimeout(() => {
        spans.forEach((span, i) => {
            setTimeout(() => {
                span.classList.remove('show');
            }, i * 300); // Har bir harf 300ms kechikish bilan yo'qoladi
        });
    }, spans.length * 300 + 3000); // Harflar chiqib bo'lgandan keyin 3 soniya kutish
}

// Har 6 sekundda animatsiyani qayta boshlaymiz (harflar chiqish va kichiklashish jarayoni bilan kutish uchun yetarli vaqt)
setInterval(animateLetters, spans.length * 300 + 6000);

// Dastlab animatsiyani ishga tushiramiz
animateLetters();

// ------ Nav Bar uchun "slideInDown" animatsiyasi ------
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navigation a');

    navLinks.forEach((link, index) => {
        // Har bir elementga CSS kechiktirishini dinamik tarzda qo'shish
        link.style.animationDelay = `${index * 0.5}s`;
        link.classList.add('animate__slideInDown');
    });
});

// ----Mashinalar bo'limi (Qidiruv va filter) ----
// Search button functionality
document.getElementById("search-button").addEventListener("click", function () {
    const searchInput = document.getElementById("search-input");
    searchInput.classList.toggle("open");
    this.classList.toggle("active");
  });
  
  // Filter button functionality
  document.getElementById("filter-button").addEventListener("click", function () {
    const filterInput = document.getElementById("filter-car-name");
    filterInput.classList.toggle("open");
    this.classList.toggle("active");
  });
  
  // Dual handle range slider for min and max year
  const slider = document.getElementById("year-range");
  const yearLabel = document.getElementById("year-label");
  
  slider.addEventListener("input", function () {
    const minYear = slider.min;
    const maxYear = slider.max;
    const currentValue = slider.value;
  
    yearLabel.textContent = `${minYear} - ${currentValue}`;
  });
  
  // To make sure both the handles (min and max) update
  function updateRange() {
    const minYear = document.getElementById("min-year");
    const maxYear = document.getElementById("max-year");
  
    const minValue = minYear.value;
    const maxValue = maxYear.value;
  
    document.getElementById("year-label").textContent = `${minValue} - ${maxValue}`;
  }
  

// ---- Login va Sign Up bo'limi uchun ----

// Sahifa to‘liq yuklangach, JavaScript ishga tushadi
// Sahifa yuklangandan so'ng kodni ishga tushirish
document.addEventListener('DOMContentLoaded', function () {
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Ro'yxatdan o'tish formasiga o'tish
    switchToSignup.addEventListener('click', function () {
        loginForm.classList.add('hidden'); // Login form yashiriladi
        signupForm.classList.remove('hidden'); // Signup form ko'rsatiladi
    });

    // Login formasiga qaytish
    switchToLogin.addEventListener('click', function () {
        signupForm.classList.add('hidden'); // Signup form yashiriladi
        loginForm.classList.remove('hidden'); // Login form ko'rsatiladi
    });
});


