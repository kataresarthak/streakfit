# StreakFit - Workout Consistency Tracker

A modern Next.js application for tracking workout consistency and building lasting fitness habits. StreakFit helps users maintain momentum and achieve their fitness goals through intuitive tracking and powerful motivation features.

## 🚀 Features

- **Workout Tracking**: Log different types of workouts with duration, intensity, and notes
- **Streak Building**: Track and maintain your fitness streaks with visual progress indicators
- **Weekly Calendar**: Visual representation of your weekly workout schedule
- **Progress Statistics**: Comprehensive stats including total workouts, time, and weekly progress
- **Modern UI**: Clean, responsive design with a fitness-focused theme
- **TypeScript**: Full type safety for better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Icons**: Emoji-based icons for workout types

## 📁 Project Structure

```
streakfit/
├── src/
│   ├── app/                 # App router pages
│   │   ├── dashboard/       # Dashboard page
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/          # Reusable components
│   │   └── WorkoutTracker.tsx
│   ├── lib/                # Utility functions
│   │   └── workout-utils.ts
│   └── types/              # TypeScript definitions
│       └── workout.ts
├── public/                 # Static assets
└── package.json
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd streakfit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Homepage
- Landing page with hero section explaining the app concept
- Features overview and call-to-action

### Dashboard
- **Streak Tracking**: View current and longest streaks
- **Weekly Calendar**: Visual representation of workout days
- **Recent Workouts**: List of logged workouts with details
- **Quick Stats**: Summary of total workouts and time
- **Workout Logger**: Modal form to log new workouts

### Workout Types
The app supports various workout types:
- Cardio ❤️
- Strength 💪
- Flexibility 🧘
- Sports ⚽
- Yoga 🧘‍♀️
- Pilates 🤸
- HIIT ⚡
- Walking 🚶
- Running 🏃
- Cycling 🚴
- Swimming 🏊
- Other 🎯

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Fitness Theme**: Emerald and blue color scheme with fitness-focused imagery
- **Modern UI**: Clean cards, gradients, and smooth animations
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **WorkoutTracker**: Form component for logging workouts
- **Dashboard**: Main dashboard with streak tracking and statistics
- **Layout**: Root layout with navigation and metadata

### Type Definitions

The app includes comprehensive TypeScript definitions for:
- Workout data structure
- User preferences
- Streak calculations
- Workout types and intensities

## 🚀 Deployment

The app is ready for deployment on Vercel, Netlify, or any other Next.js-compatible platform.

## 📈 Future Enhancements

- User authentication and profiles
- Data persistence with database
- Social features and challenges
- Advanced analytics and insights
- Mobile app version
- Integration with fitness devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for fitness enthusiasts everywhere**
