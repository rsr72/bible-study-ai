# 📖 Bible Study AI Web App

A modern web application that helps users engage with the Bible daily through AI-driven insights, reflection tools, and a personalized spiritual journey.

---

## ✅ Key Features

### 1. Daily Bible Reading Plan
- Predefined 1-year / 6-month / 90-day reading plans
- Show today’s and upcoming readings
- Mark readings as “Complete”

### 2. AI-Powered Insights
- Click on a reading → Generate:
  - Contextual summary
  - Lessons & key takeaways
  - Application to daily life
  - Short AI-generated prayer
  - Option to ask a question

### 3. Daily Email Summary
- At a set time, email:
  - Reading summary
  - Lessons
  - Prayer
  - Any personal notes

### 4. Ask-AI Anything
- Chat window for deeper questions:
  - “What does John 3:16 mean for my life?”
  - “Who was King David?”

### 5. Creative Continued Learning Area
- **"Grow Deeper" Section**:
  - Weekly themes (Faith, Love, Forgiveness)
  - Recommended resources (videos, devotionals, podcasts)
  - Gamified challenges (memorize verses, journaling prompts)
  - AI-generated "verse of the day" with reflection

---

## ✨ UI Design Principles

- Mobile-first responsive layout
- Dark/light mode toggle
- Card-based reading blocks
- “Today” dashboard with checklist feel
- Clean, minimalist visuals using Tailwind CSS + Heroicons

---

## 📅 Project Roadmap

### MVP Phase 1
- [x] Auth & onboarding
- [ ] Daily reading schedule
- [ ] Reading view with AI insight
- [ ] Email summary
- [ ] Notes + mark as complete

### Phase 2
- [ ] Ask-AI interface
- [ ] Grow Deeper section
- [ ] Admin panel to manage reading plans
- [ ] Social share/email invite

### Phase 3: Personalization & Social
- [ ] User accounts with reading progress saved
- [ ] Friends/family sharing tools
- [ ] Custom reading plans
- [ ] Admin dashboard for content control

---

## 🛠️ Project Scaffold

```
bible-study-ai/
├── backend/               # FastAPI backend for AI, reading plans, and APIs
│   ├── app/
│   │   ├── main.py        # API entrypoint
│   │   ├── routers/       # Endpoints (e.g. /readings, /insights)
│   │   └── services/      # AI and logic handlers
│   ├── requirements.txt   # Python dependencies
│   └── README.md
├── frontend/              # React + TypeScript + Tailwind UI
│   ├── public/
│   ├── src/
│   │   ├── components/    # UI components (cards, navbar, etc.)
│   │   ├── pages/         # Pages like Home, Insights, Ask-AI
│   │   └── App.tsx        # Main app container
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md              # You're here!
```

---

## 🚀 Get Started (Local Dev)

### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn[standard]
pip freeze > requirements.txt
```

### Frontend Setup
```bash
cd frontend
npx create-react-app . --template typescript
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Tailwind Setup:
- Add to `index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Update `tailwind.config.js`:
```js
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 📬 Stay Updated

Follow the project:
🔗 [github.com/rsr72/bible-study-ai](https://github.com/rsr72/bible-study-ai)

---

> _“Your word is a lamp for my feet, a light on my path.”_ — Psalm 119:105
