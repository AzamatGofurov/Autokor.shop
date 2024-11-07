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
function incrementLike() {
  // Faqat bir marta bosilishi uchun tekshiruv
  if (!localStorage.getItem("liked")) {
    const likeRef = ref(database, "counters/likes");

    get(likeRef).then((snapshot) => {
      const currentLikes = snapshot.val() || 0;
      set(likeRef, currentLikes + 1).then(() => {
        console.log("Like muvaffaqiyatli oshirildi:", currentLikes + 1);
        // LocalStorage da 'liked' saqlab qo'yiladi, sahifa yangilangunga qadar
        localStorage.setItem("liked", "true");
      }).catch((error) => console.error("Like oshirishda xato:", error));
    }).catch((error) => console.error("Like o'qishda xato:", error));
  } else {
    console.log("Like faqat bir marta bosilishi mumkin.");
  }
}

// Sahifa yangilanganda view sonini oshirish funksiyasi
function incrementView() {
  const viewRef = ref(database, "counters/views");

  get(viewRef).then((snapshot) => {
    const currentViews = snapshot.val() || 0;
    set(viewRef, currentViews + 1).then(() => {
      console.log("View muvaffaqiyatli oshirildi:", currentViews + 1);
    }).catch((error) => console.error("View oshirishda xato:", error));
  }).catch((error) => console.error("View o'qishda xato:", error));
}

// Sahifa yuklanayotganda view sonini oshirish
incrementView();

// Real vaqt rejimida like va view qiymatlarini kuzatish
const likeRef = ref(database, "counters/likes");
const viewRef = ref(database, "counters/views");

onValue(likeRef, (snapshot) => {
  const likeCount = snapshot.val() || 0;
  document.getElementById("like-count").textContent = likeCount;
  console.log("Like yangilandi:", likeCount);
});

onValue(viewRef, (snapshot) => {
  const viewCount = snapshot.val() || 0;
  document.getElementById("view-count").textContent = viewCount;
  console.log("View yangilandi:", viewCount);
});

// Funksiyalarni global qilib belgilash
window.incrementLike = incrementLike;
window.incrementView = incrementView;
