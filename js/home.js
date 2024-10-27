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

// -------Search va Filter section
// Elementlarni tanlash
const filterContainer = document.querySelector('.filter-container');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const carCards = document.querySelectorAll('.car-card__article');

// Qidiruv va filtr funksiyasi
function filterCars() {
    const priceMin = document.getElementById('price-min').value;
    const priceMax = document.getElementById('price-max').value;
    const yearMin = document.getElementById('year-min').value;
    const yearMax = document.getElementById('year-max').value;
    const fuelType = document.getElementById('fuel-type').value.toLowerCase();
    const searchQuery = searchInput.value.toLowerCase();

    carCards.forEach(card => {
        const price = parseInt(card.querySelector('.car-card__info i').textContent.replace(/\D/g, ''));
        const year = parseInt(card.querySelector('.car-card__info:nth-of-type(2)').textContent.replace(/\D/g, ''));
        const fuel = card.querySelector('.car-card__info:nth-of-type(4)').textContent.toLowerCase();
        const title = card.querySelector('.car-card__title').textContent.toLowerCase();

        const isVisible =
            (priceMin === '' || price >= priceMin) &&
            (priceMax === '' || price <= priceMax) &&
            (yearMin === '' || year >= yearMin) &&
            (yearMax === '' || year <= yearMax) &&
            (fuelType === '' || fuel.includes(fuelType)) &&
            (searchQuery === '' || title.includes(searchQuery));

        card.style.display = isVisible ? 'block' : 'none';
    });
}

// Filter formani yuborishdan to‘xtatish va qidiruvni amalga oshirish
filterContainer.addEventListener('submit', function (e) {
    e.preventDefault();
    filterCars();
});

// Qidiruv tugmasini bosganda qidiruvni amalga oshirish
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    filterCars();
});


// --------Mashina card ramslarni yonga o'tkazish
class ImageSlider {
    constructor(sliderElement) {
        this.sliderElement = sliderElement;
        this.images = sliderElement.querySelectorAll('[data-slider-images] img');
        this.prevBtn = sliderElement.querySelector('[data-slider-prev]');
        this.nextBtn = sliderElement.querySelector('[data-slider-next]');
        this.counter = sliderElement.querySelector('[data-slider-counter]');
        this.currentIndex = 0;

        // Tugmalarni eventlarga bog'lash
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());

        // Swipe funksiyasi uchun
        this.isDragging = false;
        this.startX = 0;

        this.sliderElement.addEventListener('mousedown', (e) => this.startDrag(e));
        this.sliderElement.addEventListener('mousemove', (e) => this.onDrag(e));
        this.sliderElement.addEventListener('mouseup', () => this.endDrag());

        this.sliderElement.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        this.sliderElement.addEventListener('touchmove', (e) => this.onDrag(e.touches[0]));
        this.sliderElement.addEventListener('touchend', () => this.endDrag());

        this.updateSlider();
    }

    updateSlider() {
        this.images.forEach((img, index) => {
            img.style.display = index === this.currentIndex ? 'block' : 'none';
        });
        this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateSlider();
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateSlider();
    }

    startDrag(e) {
        this.isDragging = true;
        this.startX = e.clientX;
    }

    onDrag(e) {
        if (!this.isDragging) return;
        const deltaX = e.clientX - this.startX;
        if (deltaX > 50) this.prevImage(); // Chapga surilganda
        if (deltaX < -50) this.nextImage(); // O'ngga surilganda
    }

    endDrag() {
        this.isDragging = false;
    }
}

// Sahifadagi barcha slayderlarni ishga tushirish
document.querySelectorAll('[data-slider]').forEach(slider => new ImageSlider(slider));

