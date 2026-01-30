import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DatabaseService, {Song} from '../services/DatabaseService';
import SongItem from '../components/SongItem';
import {useFocusEffect} from '@react-navigation/native';

interface LibraryScreenProps {
  onSongSelect: (song: Song) => void;
}

const LibraryScreen: React.FC<LibraryScreenProps> = ({onSongSelect}) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSongs = useCallback(async () => {
    try {
      const allSongs = await DatabaseService.getAllSongs();
      setSongs(allSongs);
    } catch (error) {
      console.error('Error loading songs:', error);
      Alert.alert('Error', 'Failed to load your collection');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSongs();
    }, [loadSongs]),
  );

  const handleDeleteSong = async (song: Song) => {
    Alert.alert('Delete Song', 'Remove this song from your collection?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            if (song.id) {
              await DatabaseService.deleteSong(song.id);
              await loadSongs();
            }
          } catch (error) {
            console.error('Error deleting song:', error);
            Alert.alert('Error', 'Failed to delete song');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (songs.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No songs in your collection</Text>
        <Text style={styles.emptySubtext}>
          Search and add songs from the Search tab
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={item => item.id?.toString() || item.youtubeId}
        renderItem={({item}) => (
          <View style={styles.songItemContainer}>
            <View style={styles.songItemWrapper}>
              <SongItem song={item} onPress={() => onSongSelect(item)} />
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteSong(item)}>
              <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 24,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  songItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  songItemWrapper: {
    flex: 1,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 28,
  },
});

export default LibraryScreen;
