import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Alert} from 'react-native';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PlayerControls from '../components/PlayerControls';
import DatabaseService from '../services/DatabaseService';
import {YouTubeVideo} from '../services/YouTubeService';
import {Song} from '../services/DatabaseService';

const Tab = createBottomTabNavigator();

// Unified type for songs in the player
export type PlayableSong = {
  youtubeId: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
};

const AppNavigator: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<PlayableSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<PlayableSong[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    // Initialize database
    const initDatabase = async () => {
      try {
        await DatabaseService.initDB();
      } catch (error) {
        console.error('Failed to initialize database:', error);
        if (isMounted.current) {
          Alert.alert('Error', 'Failed to initialize database');
        }
      }
    };

    initDatabase();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const normalizeSong = (song: YouTubeVideo | Song): PlayableSong => {
    return {
      youtubeId: 'youtubeId' in song ? song.youtubeId : song.id,
      title: song.title,
      artist: song.artist,
      thumbnail: song.thumbnail,
      duration: song.duration,
    };
  };

  const handleSongSelect = (song: YouTubeVideo | Song) => {
    const normalizedSong = normalizeSong(song);
    setCurrentSong(normalizedSong);
    setIsPlaying(true);
    
    // Update playlist with current song
    setPlaylist([normalizedSong]);
    setCurrentIndex(0);
    
    console.log('Playing song:', normalizedSong.title);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (playlist.length > 0 && currentIndex < playlist.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentSong(playlist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#1DB954',
            tabBarInactiveTintColor: '#777',
            headerStyle: styles.header,
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitle,
          }}>
          <Tab.Screen
            name="Search"
            options={{
              tabBarIcon: ({color}) => (
                <View>
                  <View style={[styles.icon, {borderColor: color}]} />
                </View>
              ),
            }}>
            {() => <SearchScreen onSongSelect={handleSongSelect} />}
          </Tab.Screen>
          <Tab.Screen
            name="Library"
            options={{
              tabBarIcon: ({color}) => (
                <View>
                  <View style={[styles.icon, {borderColor: color}]} />
                </View>
              ),
            }}>
            {() => <LibraryScreen onSongSelect={handleSongSelect} />}
          </Tab.Screen>
        </Tab.Navigator>
        {currentSong && (
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentSong={{
              title: currentSong.title,
              artist: currentSong.artist,
              thumbnail: currentSong.thumbnail,
            }}
          />
        )}
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  tabBar: {
    backgroundColor: '#1a1a1a',
    borderTopColor: '#333',
  },
  header: {
    backgroundColor: '#1a1a1a',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
  },
});

export default AppNavigator;
