(function() {
    // Formani yuborish jarayonini boshqarish
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Formani o'zini o'zgarishidan saqlaydi

        // Elementlarni olish
        const loading = document.getElementById("loading");
        const successAlert = document.getElementById("success-alert");
        const errorAlert = document.getElementById("error-alert");

        // Boshqa alertlarni yashirish va loading animatsiyasini ko‘rsatish
        loading.classList.remove("hidden");
        successAlert.classList.add("hidden");
        errorAlert.classList.add("hidden");

        // Input qiymatlarini olish
        const name = document.getElementById("contact-name").value;
        const phone = document.getElementById("contact-phone").value;
        const message = document.getElementById("contact-message").value;

        // Telegram bot token va chat ID (o'zgaruvchilarni o'zgartiring)
        const botToken = "7755921442:AAH1gppPBqAwmLBPxATn6e1Pe0VGA-moNpM"; // Bu yerga BotFather'dan olingan tokeningizni kiriting
        const chatId = "5999528224"; // O'zingiz yoki guruh uchun chat ID-ni kiriting

        // Yuboriladigan xabarni shakllantirish
        const text = `Ism: ${name}%0ATelefon: ${phone}%0AXabar: ${message}`;

        // Telegram API orqali xabar yuborish
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`)
            .then(response => {
                loading.classList.add("hidden"); // Loading animatsiyasini yashirish
                if (response.ok) {
                    successAlert.classList.remove("hidden");
                    setTimeout(() => successAlert.classList.add("hidden"), 5000); // 5 soniyadan so'ng alertni yashirish
                    document.getElementById("contact-form").reset(); // Formani tozalash
                } else {
                    errorAlert.classList.remove("hidden");
                    setTimeout(() => errorAlert.classList.add("hidden"), 5000); // 5 soniyadan so'ng alertni yashirish
                }
            })
            .catch(error => {
                loading.classList.add("hidden"); // Loading animatsiyasini yashirish
                errorAlert.classList.remove("hidden");
                setTimeout(() => errorAlert.classList.add("hidden"), 5000); // 5 soniyadan so'ng alertni yashirish
                console.error("Error:", error);
            });
    });
})();
