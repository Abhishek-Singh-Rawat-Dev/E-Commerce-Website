# 🚀 टीम क्विक स्टार्ट गाइड (Team Quick Start Guide)

## 👥 टीम के सदस्य (Team Members)

### 1. **Subham** - टेक लीड और बैकएंड आर्किटेक्ट 👨‍💼
**क्यों सबसे अच्छा रोल:** Subham एक अच्छे इंसान हैं, इसलिए उन्हें टेक लीड की जिम्मेदारी दी गई है। वे पूरी टीम को गाइड करेंगे और सबसे महत्वपूर्ण बैकएंड काम संभालेंगे।

**जिम्मेदारियाँ:**
- 🔐 Authentication (Login/Register) system
- 💾 Database models (User, Product, Order)
- 🛡️ Server setup और security
- 👑 Admin APIs
- 👥 टीम की मदद और code review

**काम करने की फाइलें:**
- `server/index.js`
- `server/routes/auth.js`
- `server/middleware/auth.js`
- `server/models/` (सभी models)
- `server/routes/admin.js`

---

### 2. **Sneha** - फ्रंटएंड लीड और UI/UX स्पेशलिस्ट 👩‍💻
**जिम्मेदारियाँ:**
- 🎨 सुंदर UI बनाना
- 📱 Homepage, Products page, Login/Register pages
- 🗺️ React Router setup
- 🔄 Redux state management
- 🎯 Navbar, Footer जैसे components

**काम करने की फाइलें:**
- `client/src/App.js`
- `client/src/store/` (सभी slices)
- `client/src/pages/HomePage.js`
- `client/src/pages/ProductsPage.js`
- `client/src/pages/LoginPage.js`
- `client/src/components/layout/`

---

### 3. **Harsh** - बैकएंड डेवलपर और पेमेंट स्पेशलिस्ट 👨‍💻
**जिम्मेदारियाँ:**
- 💳 Stripe payment integration
- 📦 Order management system
- 📧 Email service (order confirmation, etc.)
- 💰 Payment security

**काम करने की फाइलें:**
- `server/routes/orders.js`
- `server/routes/payments.js`
- `server/services/emailService.js`
- `client/src/services/stripeService.js`

---

### 4. **Tushar** - फुल-स्टैक डेवलपर और एडमिन पैनल स्पेशलिस्ट 👨‍💻
**जिम्मेदारियाँ:**
- 🎛️ Admin dashboard (products, orders, users manage करना)
- 🛒 Shopping cart system
- 📋 Product management backend
- 🖼️ Image upload (Cloudinary)

**काम करने की फाइलें:**
- `client/src/pages/admin/` (सभी admin pages)
- `client/src/pages/CartPage.js`
- `client/src/components/cart/CartSidebar.js`
- `server/routes/products.js`
- `server/routes/users.js`

---

## 📋 शुरुआत कैसे करें (How to Start)

### स्टेप 1: प्रोजेक्ट सेटअप

```bash
# प्रोजेक्ट फोल्डर में जाएं
cd /Users/adityapandey/Downloads/Basic-E-commerce-Store-main

# सभी dependencies install करें
npm install

# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
cd ..
```

### स्टेप 2: Environment Variables Setup

**Server के लिए `.env` फाइल बनाएं:**
```bash
cd server
touch .env
```

**इस `.env` फाइल में ये डालें:**
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/ecommerce-store
JWT_SECRET=apna_secret_key_yaha_likhen_bahut_lamba
JWT_EXPIRE=7d

# Cloudinary (Image upload के लिए)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (Payment के लिए)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

FRONTEND_URL=http://localhost:3000
```

### स्टेप 3: MongoDB Start करें

```bash
# Mac पर MongoDB start करने के लिए
brew services start mongodb-community

# या सीधे run करें
mongod
```

### स्टेप 4: Application Run करें

```bash
# Root folder से दोनों (frontend + backend) एक साथ चलाएं
npm run dev

# या अलग-अलग terminal में:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### स्टेप 5: Check करें

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5001

---

## 🗓️ काम का टाइमलाइन (Work Timeline)

### Week 1: नींव रखना (Foundation)
- **Subham**: Database models, auth system बनाएं
- **Sneha**: Project setup, routing, state management
- **Harsh**: Email service setup
- **Tushar**: Basic UI components

### Week 2: Main Features
- **Subham**: Admin APIs बनाएं
- **Sneha**: सभी pages बनाएं (Home, Products, Login)
- **Harsh**: Order routes, payment integration
- **Tushar**: Admin dashboard, cart system

### Week 3: Advanced Features
- **Subham**: API optimization, security
- **Sneha**: Advanced filters, search
- **Harsh**: Payment testing, emails
- **Tushar**: Checkout flow

### Week 4: Testing
- **सब साथ में**: Integration testing, bug fixes

### Week 5: Deployment
- **सब साथ में**: Production deployment

---

## 💻 हर दिन क्या करना है (Daily Routine)

### सुबह (Morning)
1. **Standup Meeting** (15 मिनट)
   - कल क्या किया?
   - आज क्या करोगे?
   - कोई problem है?

2. **Git से latest code लें**
```bash
git checkout main
git pull origin main
git checkout -b your-feature-name
```

### दिन में (During Day)
3. **अपना काम करें**
4. **अटक गए तो Subham से पूछें**
5. **बार-बार commit करें**
```bash
git add .
git commit -m "feature: क्या किया वो लिखें"
```

### शाम को (Evening)
6. **Code push करें**
```bash
git push origin your-branch-name
```

7. **Pull Request बनाएं GitHub पर**
8. **Subham से code review के लिए request करें**

---

## 🎯 Important Tips

### Subham के लिए
- ✅ टीम की मदद करना सबसे जरूरी है
- ✅ हर दिन code review करें
- ✅ अच्छे से database design करें
- ✅ सबको unblock करें जल्दी से

### Sneha के लिए
- ✅ UI सुंदर और responsive बनाएं
- ✅ Colors और fonts consistent रखें
- ✅ Mobile पर भी test करें
- ✅ Loading states जरूर दिखाएं

### Harsh के लिए
- ✅ Payment को secure रखें
- ✅ Test mode में ही testing करें
- ✅ हर transaction log करें
- ✅ Errors को सही से handle करें

### Tushar के लिए
- ✅ Admin panel को secure रखें
- ✅ Cart की calculations सही रखें
- ✅ Image upload test करें अच्छे से
- ✅ User data validate करें

---

## 🔧 Useful Commands

```bash
# Development चलाना
npm run dev                    # दोनों (frontend + backend) एक साथ

# केवल backend
npm run server                 # Server चलाएं

# केवल frontend
npm run client                 # React app चलाएं

# Database में sample data डालना
cd server
npm run seed

# Production build
cd client
npm run build
```

---

## 📞 आपस में कैसे बात करें (Communication)

### Daily Standup
- **कब**: हर दिन सुबह
- **कितनी देर**: 15 मिनट
- **कौन lead करेगा**: Subham

### Questions पूछने के लिए
- **Backend issues**: Subham से पूछें
- **Frontend issues**: Sneha से पूछें
- **Payment issues**: Harsh से पूछें
- **Admin/Cart issues**: Tushar से पूछें

### Code Review
- सभी code Subham check करेंगे
- Pull Request detailed होना चाहिए
- Comments का जवाब जल्दी दें

---

## 🆘 Common Problems और Solutions

### Problem 1: MongoDB connect नहीं हो रहा
**Solution:**
```bash
# MongoDB चालू है check करें
brew services list

# MongoDB start करें
brew services start mongodb-community
```

### Problem 2: Port already in use
**Solution:**
```bash
# Port पर चल रही service को बंद करें
lsof -ti:5001 | xargs kill
```

### Problem 3: CORS error
**Solution:**
- Subham से कहें CORS configure करने के लिए
- `server/index.js` में CORS settings check करें

### Problem 4: Dependencies error
**Solution:**
```bash
# node_modules delete करें
rm -rf node_modules package-lock.json

# फिर से install करें
npm install
```

---

## 📚 सीखने के Resources

### Sabke liye
- [Git & GitHub Tutorial](https://www.youtube.com/watch?v=apGV9Kg7ics) (Hindi)
- [VS Code Tutorial](https://www.youtube.com/watch?v=JXeGAB9Yys8) (Hindi)

### Backend (Subham & Harsh)
- [Node.js Tutorial](https://www.youtube.com/watch?v=RLtyhwFtXQA) (Hindi)
- [MongoDB Tutorial](https://www.youtube.com/watch?v=J6mDkcqU_ZE) (Hindi)
- [Express.js](https://expressjs.com/)

### Frontend (Sneha & Tushar)
- [React Tutorial](https://www.youtube.com/watch?v=tiLWCNFzThE) (Hindi)
- [Redux Toolkit](https://www.youtube.com/watch?v=1i04-A7kfFI) (Hindi)
- [Tailwind CSS](https://www.youtube.com/watch?v=qYgogv4R8zg) (Hindi)

---

## ✅ अपना काम Complete हुआ कब मानें

एक feature तब complete है जब:
1. ✅ Code लिखा और test किया
2. ✅ Subham ने code review किया
3. ✅ कोई errors नहीं हैं
4. ✅ Documentation update किया
5. ✅ Main branch में merge हो गया

---

## 🎉 याद रखें (Remember)

- 🤝 **टीम वर्क जरूरी है** - एक दूसरे की मदद करें
- 💬 **सवाल पूछने में शर्म नहीं** - अटके तो पूछें
- 📝 **अच्छा code लिखें** - clean और readable
- 🧪 **Test करें** - push करने से पहले
- 😊 **मज़े करें** - सीखते हुए enjoy करें!

---

## 📁 अपनी Files कहाँ हैं - Quick Reference

### Subham की Files
```
server/
├── index.js                    ← Server setup
├── routes/auth.js              ← Login/Register
├── routes/admin.js             ← Admin APIs
├── middleware/auth.js          ← Authentication
└── models/                     ← Database models
    ├── User.js
    ├── Product.js
    └── Order.js
```

### Sneha की Files
```
client/src/
├── App.js                      ← Main routing
├── store/                      ← Redux
│   └── slices/                 ← All slices
├── pages/
│   ├── HomePage.js
│   ├── ProductsPage.js
│   ├── ProductDetailPage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   └── ProfilePage.js
└── components/layout/
    ├── Navbar.js
    ├── Footer.js
    └── Sidebar.js
```

### Harsh की Files
```
server/
├── routes/
│   ├── orders.js               ← Order management
│   └── payments.js             ← Stripe payments
└── services/
    └── emailService.js         ← Email sending

client/src/services/
    └── stripeService.js        ← Payment helpers
```

### Tushar की Files
```
client/src/
├── pages/
│   ├── admin/                  ← सभी admin pages
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── WishlistPage.js
│   └── OrdersPage.js
├── components/
│   ├── cart/CartSidebar.js
│   └── ui/                     ← UI components

server/routes/
├── products.js                 ← Product CRUD
└── users.js                    ← User routes
```

---

## 🎯 Final Message

यह प्रोजेक्ट आप सबके लिए सीखने का बेहतरीन मौका है। 

**Subham** - आप टेक लीड हैं, टीम को अच्छे से guide करें। आप अच्छे इंसान हैं इसलिए यह responsibility दी गई है। 💪

**Sneha** - आपका frontend पूरे app का चेहरा है। सुंदर बनाएं! ✨

**Harsh** - Payment बहुत important है। सुरक्षित और सही बनाएं! 💳

**Tushar** - Admin panel और cart दोनों crucial हैं। मेहनत करें! 🛒

---

**सब मिलकर एक शानदार e-commerce app बनाएंगे! All the best! 🚀**

---

*किसी भी मदद के लिए एक दूसरे से बात करें। Communication is key!*

**Contact:**
- Subham (Tech Lead) - सबकी मदद के लिए
- Team के बाकी members - अपने area में

**Happy Coding! 💻🎉**

