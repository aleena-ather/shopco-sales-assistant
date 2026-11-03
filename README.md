# ⚡ ShopCo Tech — AI Sales Concierge & Electronics Store

> **Capstone Project**: A production-grade e-commerce web application featuring real-time Google Sheets inventory synchronization and an intelligent AI Sales Concierge powered by **Google Gemini 3.1 Flash Lite**.

---

## 🌟 Overview

**ShopCo Tech** is a modern e-commerce platform specializing in everyday technology, audio gear, fast chargers, gaming accessories, and desk setup essentials. 

Unlike traditional static stores, ShopCo is backed by a **live Google Sheets inventory feed** and an **AI Sales Concierge** that acts as an in-store tech advisor—answering questions, respecting budget constraints, suggesting alternatives for out-of-stock items, and guiding customers through a seamless shopping journey.

---

## ✨ Key Features

### 🤖 Intelligent AI Sales Concierge (Google Gemini 3.1 Flash Lite)
* **Grounded Catalog Recommendations**: Strictly uses live inventory data—never hallucinates prices, fake discounts, or unverified claims.
* **Smart Out-of-Stock Handling**: When a shopper asks for a sold-out product, the concierge explains its status and curates in-stock alternatives from the same category.
* **Budget Searches**: Instantly identifies and displays matching products under any specified price ceiling (e.g., *"What do you have under $40?"*).
* **Interactive Product Cards**: Directly returns clickable product cards inside the chat with photos, prices, category badges, and quick links to detail pages.
* **Customer Support Routing**: Seamlessly provides official store support channels when asked non-product inquiries.
* **Ultra-Fast Latency**: Uses in-memory catalog caching and Gemini 3.1 Flash Lite to deliver answers in under 2 seconds.

### 📊 Real-Time Google Sheets Inventory Synchronization
* Connects directly to Google Sheets API v4 via a secure Google Cloud service account.
* Dynamically syncs 25 product rows with live pricing, stock status (*In Stock* / *Out of Stock*), categories, descriptions, and ratings.
* Dynamic category aggregation and stock badges across the entire storefront.

### 🎨 Modern Apple-Inspired Hardware Design
* **Bento Grid Showcase**: Elegant hardware spotlight featuring studio sound, GaN fast chargers, and competitive gaming gear.
* **100% Fully Responsive**: 
  * **Mobile (< 640px)**: Full slide-out navigation drawer and app-like floating chat modal with touch-scrollable quick suggestion chips.
  * **Tablet (768px - 1024px)**: 2-column adaptive layouts.
  * **Desktop (> 1024px)**: Full dropdown menu, expandable chat window (440px to 560px), and rich product filter sidebars.

### 🛒 Complete E-Commerce Experience
* **Catalog & Filter Page**: Filter by category, price bounds slider, search keywords, and sorting (price low-to-high, high-to-low, popularity).
* **Product Detail Pages**: Dynamic routing, image galleries, live stock pills, and customer review tabs.
* **Persistent Cart**: Redux-powered shopping cart with promo codes, subtotal calculations, and checkout modal.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **AI Engine** | [Google Gemini 3.1 Flash Lite](https://ai.google.dev/) |
| **Inventory Source** | [Google Sheets API v4](https://developers.google.com/sheets/api) |
| **Icons** | [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/) |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/aleena-ather/shopco-sales-assistant.git
cd shopco-sales-assistant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=your_service_account.json
SUPPORT_EMAIL=support@example.com
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 3-Question Capstone Verification

The AI Sales Concierge is tested and verified against core retail scenarios:

1. **Budget Search**: *"What items do you have under $40?"*  
   ➔ Returns curated in-stock accessories and audio gear under $40 with interactive product cards.
2. **Out-of-Stock Check**: *"Is the Wireless Gaming Headset available?"*  
   ➔ Acknowledges the item is sold out and immediately recommends in-stock alternatives (Wired Gaming Headset, Earbuds).
3. **Store Support**: *"How do I contact customer support?"*  
   ➔ Shares the verified support email channel without showing unrelated product cards.

---

## 👩‍💻 Author

**Aleena Ather**  
* GitHub: [@aleena-ather](https://github.com/aleena-ather)

---

## 📄 License
This project is licensed under the MIT License.
