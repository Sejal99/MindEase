# Stress Guide

An offline-first mental wellness mobile app built with React Native CLI that helps users manage stress in real-time and learns from their behavior.

## Features

- **Home Screen**: Quick access to stress logging with recent insights
- **Stress Flow**: Log stress triggers and intensity levels
- **Action Selection**: Choose from 5 evidence-based stress relief techniques
- **Breathing Exercise**: Animated breathing exercise for immediate relief
- **5-4-3-2-1 Grounding**: Interactive sensory grounding technique for anxiety control
- **Brain Dump**: 2-minute timer for mental unloading and clarity
- **Movement Reset**: Multiple physical exercises to release stress
- **Thought Reframing**: Mini CBT exercise to replace negative thoughts
- **Feedback System**: Track effectiveness of stress management actions
- **History**: View all past stress events grouped by date
- **Insights**: Learn patterns from your stress data (common triggers, peak times, effective actions)

## Architecture

The app follows **MVVM (Model-View-ViewModel)** architecture and **Atomic Design** principles:

### MVVM Architecture
- **View**: UI components (screens) - dumb components that only render
- **ViewModel**: Handles state, business logic, and interactions using Zustand
- **Model**: Data structures and storage layer

### Atomic Design
- **Atoms**: Basic UI elements (Button, AppText, Card)
- **Molecules**: Small combinations (TriggerChips, IntensitySelector)
- **Organisms**: Complex UI sections (StressForm, InsightCard)
- **Screens**: Composed using organisms

### Folder Structure
```
/src
  /components
    /atoms          # Basic UI elements
    /molecules      # Small component combinations
    /organisms      # Complex UI sections
  /screens         # Screen components
  /viewmodels      # State management with Zustand
  /models          # TypeScript type definitions
  /storage         # MMKV storage wrapper
  /services        # Business logic services
  /utils           # Utility functions (insights calculation)
  /navigation      # React Navigation setup
```

## Tech Stack

- **React Native CLI** 0.73.0
- **TypeScript** 5.2.0
- **Zustand** for state management
- **react-native-mmkv** for local storage
- **React Navigation** for navigation
- **StyleSheet** for styling (no UI libraries)

## Installation

### Prerequisites
- Node.js >= 18
- React Native CLI
- iOS: Xcode (for iOS development)
- Android: Android Studio (for Android development)

### Setup

1. Install dependencies:
```bash
npm install
```

2. For iOS only:
```bash
cd ios
pod install
cd ..
```

3. Run the app:
```bash
# iOS
npm run ios

# Android
npm run android
```

## Data Model

Data is stored locally using MMKV:

```typescript
{
  stressEvents: [
    {
      id: string,
      trigger: 'work' | 'overthinking' | 'social' | 'health' | 'other',
      intensity: number, // 1-5
      action: 'breathing' | 'grounding' | 'brainDump' | 'movement' | 'thoughtReframing',
      effectiveness: 'yes' | 'neutral' | 'no',
      createdAt: string // ISO timestamp
    }
  ],
  moodLogs: []
}
```

## Key Features

### Offline-First
All data is stored locally using MMKV, ensuring the app works without an internet connection.

### Dark Theme
The app uses a calming dark theme with colors optimized for mental wellness:
- Background: #111827
- Primary: #6366F1 (Indigo)
- Text: #F9FAFB
- Secondary: #374151

### Large Touch Targets
All interactive elements have minimum 56px height for better accessibility.

## Business Logic

ViewModels handle:
- Saving stress events to local storage
- Computing insights from historical data
- Managing UI state

Views remain dumb with no heavy logic, following separation of concerns.

## Development

### Adding New Features

1. **Add Types**: Update `src/models/types.ts`
2. **Add Storage**: Use `StorageService` in `src/storage/storage.ts`
3. **Add ViewModel**: Create in `src/viewmodels/` using Zustand
4. **Add Components**: Follow Atomic Design in `src/components/`
5. **Add Screen**: Create in `src/screens/`
6. **Add Navigation**: Update `src/navigation/AppNavigator.tsx`

### Code Style

- Functional components with hooks
- TypeScript for type safety
- StyleSheet for styling (no external UI libraries)
- Clean, readable, production-level code

## License

MIT
