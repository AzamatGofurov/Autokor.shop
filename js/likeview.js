// Firebase SDK modullarini import qilish
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyCCLz8o9JF1_ma4bszYpTZ4S8ttLhy_r8Q",
  authDomain: "like-view-fd45a.firebaseapp.com",
  databaseURL: "https://like-view-fd45a-default-rtdb.firebaseio.com",
  projectId: "like-view-fd45a",
  storageBucket: "like-view-fd45a.appspot.com",
  messagingSenderId: "397323485630",
  appId: "1:397323485630:web:387df9acb1a0ae4a9639ef",
  measurementId: "G-N305K0KK1E"
};

// Firebase’ni ishga tushirish
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Like sonini oshirish funksiyasi
function incrementLike(itemId) {
  // Foydalanuvchi allaqachon like bosganligini tekshirish
  if (localStorage.getItem(`liked_${itemId}`)) {
    console.log(`Foydalanuvchi ${itemId} uchun like allaqachon bosgan.`);
    return;
  }

  const likeRef = ref(database, `counters/${itemId}/likes`);
  
  get(likeRef).then((snapshot) => {
    const currentLikes = snapshot.val() || 0;
    set(likeRef, currentLikes + 1).then(() => {
      console.log(`${itemId} uchun like muvaffaqiyatli oshirildi:`, currentLikes + 1);
      // Foydalanuvchiga like bosganligini belgilash
      localStorage.setItem(`liked_${itemId}`, true);
    }).catch((error) => console.error("Like oshirishda xato:", error));
  }).catch((error) => console.error("Like o'qishda xato:", error));
}

// View sonini oshirish funksiyasi (faqat sahifa yuklanganda chaqiriladi)
function incrementView(itemId) {
  const viewRef = ref(database, `counters/${itemId}/views`);

  get(viewRef).then((snapshot) => {
    const currentViews = snapshot.val() || 0;
    set(viewRef, currentViews + 1).then(() => {
      console.log(`${itemId} uchun view muvaffaqiyatli oshirildi:`, currentViews + 1);
    }).catch((error) => console.error("View oshirishda xato:", error));
  }).catch((error) => console.error("View o'qishda xato:", error));
}

// Real vaqt rejimida like va view qiymatlarini kuzatish
function watchCounts(itemId) {
  const likeRef = ref(database, `counters/${itemId}/likes`);
  const viewRef = ref(database, `counters/${itemId}/views`);

  onValue(likeRef, (snapshot) => {
    const likeCount = snapshot.val() || 0;
    document.getElementById(`like-count-${itemId}`).textContent = likeCount;
    console.log(`${itemId} uchun like yangilandi:`, likeCount);
  });

  onValue(viewRef, (snapshot) => {
    const viewCount = snapshot.val() || 0;
    document.getElementById(`view-count-${itemId}`).textContent = viewCount;
    console.log(`${itemId} uchun view yangilandi:`, viewCount);
  });
}

// Item ID-larini dinamik ro'yxati
const items = ['item1', 'item2', 'item3', 'item4']; // Bu yerda istalgancha item qo'shishingiz mumkin

// Sahifa yuklanganda har bir item uchun view sonini oshirish
window.addEventListener('DOMContentLoaded', () => {
  items.forEach(itemId => {
    incrementView(itemId);
  });
});

// Har bir item uchun kuzatishni ishga tushirish
items.forEach(itemId => {
  watchCounts(itemId);
});

// Funksiyalarni global qilib belgilash
window.incrementLike = incrementLike;
