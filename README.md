# 🐀 Dancing Rat - Meme Coin Landing Page

A creative and dynamic landing page for the Dancing Rat meme coin, featuring an interactive design with dancing rat videos and a modern crypto purchase interface.

## ✨ Features

- **Dynamic Video Display**: Rotating videos of dancing rats from your collection
- **Interactive Purchase Interface**: ETH-based token purchase with real-time calculations
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Smooth Animations**: Custom Tailwind CSS animations and hover effects
- **Toast Notifications**: User feedback for actions using react-hot-toast
- **Modern UI**: Inspired by popular meme coin landing pages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd ratmeme
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Start the development server
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎥 Video Requirements

Place your dancing rat videos in the `public/videos/` directory:
- `rat_meme1.mp4`
- `rat_meme2.mp4` 
- `rat_meme3.mp4`
- `rat_meme4.mp4`

The videos will automatically rotate every 5 seconds to showcase different dancing rat moments.

## 🎨 Customization

### Colors
- Primary: Yellow theme (`yellow-400`, `yellow-300`, `yellow-500`)
- Accent: Black and white contrast
- Success: Green for price indicators

### Animations
- Custom Tailwind animations: `float`, `bounce-slow`, `pulse-slow`, `wiggle`
- Hover effects with scale transforms
- Smooth transitions throughout the interface

### Content
- Update token information in the `Home` component
- Modify social media links in the header
- Customize the scrolling marquee text

## 🛠️ Built With

- **Next.js 15** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications
- **TypeScript** - Type safety

## 📱 Responsive Design

- **Mobile**: Optimized layout with hidden side videos
- **Tablet**: Adaptive sizing for medium screens
- **Desktop**: Full layout with side videos and floating elements

## 🎯 Key Components

1. **Scrolling Header**: Animated marquee with meme coin slogans
2. **Main Header**: Navigation with social media links
3. **Video Display**: Rotating rat videos on left and right sides
4. **Purchase Interface**: ETH-based token purchase form
5. **Progress Bar**: Visual representation of fundraising progress
6. **Floating Elements**: Animated emojis for visual appeal

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── layout.tsx      # Root layout with Toaster
│   ├── page.tsx        # Main landing page
│   └── globals.css     # Global styles
├── components/         # Reusable components
└── ...
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎉 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License.

---

**🐀 Dance your way to the moon with Dancing Rat tokens! 🚀**
