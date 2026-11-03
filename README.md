# ⚡ ShopCo Tech — AI-Powered Electronics Store

<div align="center">
  <img src="./docs/preview.jpg" alt="ShopCo Tech Store & AI Assistant" width="100%" />
</div>

ShopCo Tech is a modern, high-performance e-commerce platform for premium tech essentials, high-fidelity audio, and fast charging gear. It features an intelligent **AI Sales Concierge** powered by Google Gemini that provides real-time consultative recommendations, smart budget filters, and live stock checks.

---

## ✨ Features

- **AI Sales Concierge**: Conversational assistant that recommends matching in-stock products, suggests alternatives for sold-out items, and filters by budget in real time.
- **Live Inventory Sync**: Dynamic stock and pricing synchronization ensuring accurate availability for all 25 catalog products.
- **Apple-Inspired Design**: Sleek dark-mode aesthetic featuring curated hardware bento spotlights and smooth animations.
- **100% Mobile Responsive**: Seamlessly optimized layout across mobile, tablet, and desktop devices.
- **Full E-Commerce Flow**: Interactive catalog, category filters, price range sliders, product detail pages, and persistent cart.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS & ShadCN UI |
| **State Management** | Redux Toolkit |
| **AI Engine** | Google Gemini 3.1 Flash Lite |
| **Inventory Source** | Google Sheets API v4 |
| **Animations** | Framer Motion |

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/aleena-ather/shopco-sales-assistant.git
cd shopco-sales-assistant
npm install
```

### 2. Configure Environment
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.1-flash-lite
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_KEY_FILE=your_service_account.json
SUPPORT_EMAIL=support@example.com
```

### 3. Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👩‍💻 Author

**Aleena Ather** — [@aleena-ather](https://github.com/aleena-ather)

---

## 📄 License
This project is licensed under the MIT License.
