import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import YouTubeService, {YouTubeVideo} from '../services/YouTubeService';
import DatabaseService from '../services/DatabaseService';
import SongItem from '../components/SongItem';

interface SearchScreenProps {
  onSongSelect: (song: YouTubeVideo) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({onSongSelect}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    try {
      const results = await YouTubeService.searchVideos(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search for songs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCollection = async (song: YouTubeVideo) => {
    try {
      const exists = await DatabaseService.songExists(song.id);
      if (exists) {
        Alert.alert('Info', 'Song already in your collection');
        return;
      }

      await DatabaseService.addSong({
        title: song.title,
        artist: song.artist,
        youtubeId: song.id,
        thumbnail: song.thumbnail,
        duration: song.duration,
      });

      Alert.alert('Success', 'Song added to your collection');
    } catch (error) {
      console.error('Error adding song:', error);
      Alert.alert('Error', 'Failed to add song to collection');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for songs..."
          placeholderTextColor="#777"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SongItem
              song={item}
              onPress={() => onSongSelect(item)}
              onAddToCollection={() => handleAddToCollection(item)}
              showAddButton={true}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Search for your favorite songs on YouTube
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  searchInput: {
    backgroundColor: '#282828',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default SearchScreen;
