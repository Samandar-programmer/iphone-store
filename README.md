iPhone Store
iPhone va aksessuarlarini onlayn sotish uchun zamonaviy e-commerce platforma. Foydalanuvchilar mahsulotlarni ko'rish, savatga qo'shish va xavfsiz to'lov qilish imkoniyatiga ega.
Loyiha maqsadi
Ushbu loyiha iPhone modellari va ularga tegishli aksessuarlarni sotuvchi to'liq funksional internet do'konini yaratishga qaratilgan. Asosiy maqsadlar:

Mahsulotlar katalogini qulay va tez ko'rsatish
Foydalanuvchilar uchun ro'yxatdan o'tish va autentifikatsiya
Savatcha (cart) va buyurtma berish tizimi
Xavfsiz to'lov integratsiyasi
Administrator uchun mahsulotlarni boshqarish paneli

Texnologiyalar



Qatlam
Texnologiya



Frontend
React, React Router, Axios


Backend
Node.js, Express


Ma'lumotlar bazasi
PostgreSQL


Autentifikatsiya
JWT (JSON Web Token)


Talablar
Loyihani ishga tushirishdan oldin quyidagilar o'rnatilgan bo'lishi kerak:

Node.js (v18 yoki undan yuqori)
PostgreSQL (v14 yoki undan yuqori)
npm yoki yarn

O'rnatish va ishga tushirish
1. Repositoryni klonlash

Copy to clipboard
Insert at cursor
git clone https://github.com/<username>/iphone-store.git
cd iphone-store

2. Backend sozlash

Copy to clipboard
Insert at cursor
cd backend
npm install

backend papkasida .env faylini yarating:

Copy to clipboard
Insert at cursor
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/iphone_store
JWT_SECRET=sizning_maxfiy_kalitingiz

Ma'lumotlar bazasini yarating va migratsiyalarni ishga tushiring:

Copy to clipboard
Insert at cursor
createdb iphone_store
npm run migrate

Backendni ishga tushiring:

Copy to clipboard
Insert at cursor
npm run dev

Backend http://localhost:5000 manzilida ishlaydi.
3. Frontend sozlash
Yangi terminal oynasida:

Copy to clipboard
Insert at cursor
cd frontend
npm install
npm start

Frontend http://localhost:3000 manzilida ochiladi.
Loyiha tuzilishi

Copy to clipboard
Insert at cursor
iphone-store/
├── backend/          # Node.js + Express API
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/         # React ilovasi
│   ├── src/
│   └── package.json
└── README.md

Asosiy funksiyalar

📱 Mahsulotlar katalogi va qidiruv
🛒 Savatcha va buyurtma berish
🔐 Foydalanuvchi autentifikatsiyasi (JWT)
💳 To'lov tizimi integratsiyasi
👤 Admin paneli