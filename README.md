# React Snowflake Generator

A beautiful, interactive snowflake SVG generator built with React, TypeScript, and Vite. Create unique, mathematically-generated snowflakes with customizable parameters and download them as SVG files.

![Snowflake Generator](https://img.shields.io/badge/React-19.1.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.14-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-cyan.svg)

## ✨ Features

- **Deterministic Generation**: Same seed always produces the same snowflake
- **Customizable Parameters**: Fine-tune every aspect of your snowflake
- **Real-time Preview**: See changes instantly as you adjust parameters
- **SVG Export**: Download high-quality vector graphics
- **Randomization**: Generate new snowflakes with a single click
- **Animation**: Optional rotation animation for dynamic display
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🎨 Customization Options

### Structure Parameters
- **Arms**: Number of symmetrical branches (3-12)
- **Depth**: Fractal recursion depth (1-6)
- **Base Length**: Size of the main branches (80-260)
- **Angle**: Branch angle in degrees (12-45°)
- **Ratio**: Length ratio between levels (0.45-0.75)
- **Jitter**: Randomness factor (0-0.25)

### Visual Parameters
- **Stroke Width**: Line thickness (0.5-4)
- **Tip Fringe**: Decorative endpoints
- **Center Ring Dots**: Circular dots at the center
- **Rotation Animation**: Smooth spinning effect

### Seed System
- **Deterministic**: Same seed = same snowflake
- **Shareable**: Exchange seeds with others
- **Smart Naming**: Auto-generated winter-themed names

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/react-snowflake-generator.git
cd react-snowflake-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🏗️ Tech Stack

- **React 19.1.1** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server (Rolldown variant)
- **Tailwind CSS 4.1.16** - Utility-first styling
- **SVG** - Scalable vector graphics generation

## 📁 Project Structure

```
src/
├── components/
│   ├── Controls.tsx    # Parameter control panel
│   └── Preview.tsx     # SVG snowflake display
├── lib/
│   ├── snowflake.ts    # Snowflake generation algorithm
│   └── rng.ts          # Seeded random number generator
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🎯 Usage Tips

1. **Experiment with Parameters**: Start with the randomize button, then fine-tune
2. **Share Seeds**: The same seed will always generate identical snowflakes
3. **Export Options**: Download as SVG for scalable, high-quality graphics
4. **Performance**: Higher depth values create more detailed but complex snowflakes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the mathematical beauty of natural snowflakes
- Built with modern React and TypeScript best practices
- Styled with Tailwind CSS for rapid development

---

**Pro tip**: The same seed always regenerates the exact same snowflake. Share seeds with friends!

