let selectedFiles = []; // Tanlangan fayllarni saqlash uchun array

document.getElementById("car-image").addEventListener("change", function () {
    const files = Array.from(this.files);

    // Tanlangan fayllarni `selectedFiles` arrayiga qo'shish
    selectedFiles = selectedFiles.concat(files);

    // Rasmlarni ko'rsatish
    displaySelectedImages();
});

// Rasmlarni ko'rsatish funksiyasi
function displaySelectedImages() {
    const previewContainer = document.getElementById("preview-container");
    previewContainer.innerHTML = ""; // Oldingi rasmlarni tozalash

    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const imgWrapper = document.createElement("div");
            imgWrapper.classList.add("image-preview-wrapper");

            const img = document.createElement("img");
            img.src = event.target.result;
            img.alt = "Selected Image";
            img.classList.add("image-preview"); // Kichik rasm ko‘rsatish uchun class qo‘shildi
            imgWrapper.appendChild(img);

            // Olib tashlash tugmasi
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.innerHTML = "&times;";
            deleteButton.onclick = function () {
                selectedFiles.splice(index, 1); // Faylni arraydan olib tashlash
                displaySelectedImages(); // Ko'rinadigan rasmlarni yangilash
            };

            imgWrapper.appendChild(deleteButton);
            previewContainer.appendChild(imgWrapper);
        };
        reader.readAsDataURL(file);
    });
}

// ------------TELEGRAM BOT GA JO'NATISH-----

document.querySelector(".ad-post-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const BOT_TOKEN = "7755921442:AAH1gppPBqAwmLBPxATn6e1Pe0VGA-moNpM";
    const CHAT_ID = "5999528224";

    const loadingElement = document.getElementById("loading-element");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    // Animatsiyani ko'rsatish
    loadingElement.style.display = "flex";
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    const carTitle = document.getElementById("car-title").value;
    const carPrice = document.getElementById("car-price").value;
    const carYear = document.getElementById("car-year").value;
    const carDistance = document.getElementById("car-distance").value;
    const carFuel = document.getElementById("car-fuel").value;
    const carPhone = document.getElementById("car-phone").value;
    const carDescription = document.getElementById("car-description").value;

    const message = `
        🆕 Yangi E'lon:
        🚗 Mashina nomi: ${carTitle}
        💵 Narxi: ${carPrice} KRW
        📅 Yili: ${carYear}
        📏 Yurgan masofa: ${carDistance} km
        ⛽ Yoqilg'i turi: ${carFuel}
        📞 Telefon: ${carPhone}
        📄 Tavsif: ${carDescription}
    `;

    const selectedFiles = document.getElementById("car-image").files;
    const mediaGroup = [];

    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append("chat_id", CHAT_ID);
        formData.append("photo", file);

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.ok) {
                mediaGroup.push({
                    type: "photo",
                    media: result.result.photo[result.result.photo.length - 1].file_id,
                    caption: i === 0 ? message : ""
                });
            } else {
                console.error("Rasm yuklashda xatolik:", result.description);
                loadingElement.style.display = "none";
                errorMessage.style.display = "block";
                errorMessage.textContent = "Rasmlarni yuklashda xatolik yuz berdi.";
                return;
            }
        } catch (error) {
            console.error("Rasm yuklashda xato:", error);
            loadingElement.style.display = "none";
            errorMessage.style.display = "block";
            errorMessage.textContent = "Xatolik yuz berdi. Iltimos, yana urinib ko'ring.";
            return;
        }
    }

    if (mediaGroup.length > 0) {
        try {
            const mediaResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    media: mediaGroup
                })
            });

            loadingElement.style.display = "none";

            if (mediaResponse.ok) {
                successMessage.style.display = "block";
                successMessage.textContent = "E'lon va barcha rasmlar guruhlab muvaffaqiyatli yuborildi!";
            } else {
                const errorText = await mediaResponse.text();
                console.error("Guruh jo'natishda xatolik:", errorText);
                errorMessage.style.display = "block";
                errorMessage.textContent = "Rasmlarni guruhlab yuborishda xatolik yuz berdi.";
            }
        } catch (error) {
            console.error("Telegramga guruh jo'natishda xato:", error);
            errorMessage.style.display = "block";
            errorMessage.textContent = "Xatolik yuz berdi. Iltimos, yana urinib ko'ring.";
        }
    }

    // Yuklanish animatsiyasini yashirish
    loadingElement.style.display = "none";
});
