# Gd Player

A React Native music player that searches and streams music from YouTube with local collection management using SQLite.

## Features

- 🔍 **YouTube Search**: Search for music directly from YouTube
- 🎵 **Music Streaming**: Stream music from YouTube
- 💾 **Local Collections**: Save your favorite songs locally using SQLite
- 🎮 **Player Controls**: Play, pause, next, and previous controls
- 📱 **Cross-Platform**: Works on both iOS and Android

## Tech Stack

- **React Native**: Mobile app framework
- **TypeScript**: Type-safe development
- **SQLite**: Local database for song collections
- **React Navigation**: Navigation between screens
- **YouTube Integration**: Search and stream music from YouTube

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── PlayerControls.tsx
│   └── SongItem.tsx
├── screens/           # App screens
│   ├── SearchScreen.tsx
│   └── LibraryScreen.tsx
├── services/          # Business logic and data services
│   ├── DatabaseService.ts
│   └── YouTubeService.ts
├── navigation/        # Navigation configuration
│   └── AppNavigator.tsx
└── App.tsx           # Main app component
```

## Setup Instructions

### Prerequisites

- Node.js >= 18
- React Native development environment set up
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hegoudai/gd-player.git
cd gd-player
```

2. Install dependencies:
```bash
npm install
```

3. For iOS, install pods:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Start Metro Bundler
```bash
npm start
```

## Usage

### Search for Music
1. Open the app and navigate to the "Search" tab
2. Enter a song name or artist in the search bar
3. Tap a song to play it
4. Tap the "+" button to add it to your collection

### Manage Your Collection
1. Navigate to the "Library" tab
2. View all your saved songs
3. Tap a song to play it
4. Tap the "×" button to remove a song from your collection

### Player Controls
- The player controls appear at the bottom when a song is playing
- Tap the play/pause button to control playback
- Use next/previous buttons to navigate between songs

## Development

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

## Notes

- The YouTube service currently uses mock data for demonstration
- To enable real YouTube search, you need to:
  1. Get a YouTube Data API key from Google Cloud Console
  2. Set the `YOUTUBE_API_KEY` environment variable
  3. Uncomment the API implementation code in the `searchVideos` method
- For actual audio playback from YouTube:
  - The current implementation uses YouTube embed URLs as a placeholder
  - In a production app, you would need a backend service to extract direct audio streams
  - Or use `react-native-youtube-iframe` for video playback with YouTube's iframe player
  - Note: `ytdl-core` and similar Node.js libraries do not work in React Native
- Database debugging is automatically disabled in production builds

## License

MIT
