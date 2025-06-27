# ✨ Mizzy — Girly Fashion Shopping App

**Mizzy** is a soft-styled shopping MVP focused on girly fashion and accessories.  
It’s the **first app** in my journey to build **100 Emotionally Designed MVPs** — building real, love-inspired products that feel special.

🎬 [Watch Demo on YouTube](https://youtu.be/zvsqy1Lg3GQ?feature=shared)  
📱 [Watch Insta Reel](https://www.instagram.com/reel/DKaMqUmSBT5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==)

---

## 🌸 Features

- 🛍️ Fashion product catalog (girly-themed)
- 🔒 Firebase Authentication (email/password)
- 🔁 Infinite scroll with **TanStack Query**
- 💖 Optimistic likes & cart actions
- 💅 Soft UI with subtle animations
- 🔐 Firestore backend for user & product data

---

## 🖼️ Banner Preview

![Mizzy Banner](./media/Mizzy%20Banner.png)

---

## 🧠 Tech Stack

- **React Native (Expo)**
- **Firebase** (Auth, Firestore)
- **TanStack Query** – Infinite scrolling & optimistic UI
- **React Native Paper**
- **Reanimated**, **Expo Tab View**, **Gradient**, **Carousel**

---

## 🛠️ Setup Instructions

1. Clone the repo
```
git clone https://github.com/bharat2005/mizzy-app.git
cd mizzy-app
```

2. Install dependencies
```
npm install
```

3. Configure environment
  Rename the example file:
```
mv example.env .env
```
   And update it with your Firebase credentials:
```
API_KEY=XXXX
AUTH_DOMAIN=XXXX
PROJECT_ID=XXXX
STORAGE_BUCKET=XXXX
MESSAGING_SENDER_ID=XXXX
APP_ID=XXXX
```

 4. Run the app 
```
npx expo start
```

---

### ⚠️ Note on Firestore Data

This app uses Firestore to fetch catalog and product feed data.
If you're running the app locally with your own Firebase project, you'll need to manually seed your Firestore with product/category documents — otherwise, the feed may appear empty.

---

## 📄 License  
This project is licensed under the [MIT License](./LICENSE).


