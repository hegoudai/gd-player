import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {YouTubeVideo} from '../services/YouTubeService';
import {Song} from '../services/DatabaseService';

type SongType = YouTubeVideo | Song;

interface SongItemProps {
  song: SongType;
  onPress: () => void;
  onAddToCollection?: () => void;
  showAddButton?: boolean;
}

const SongItem: React.FC<SongItemProps> = ({
  song,
  onPress,
  onAddToCollection,
  showAddButton = false,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: song.thumbnail}} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
        </Text>
        <Text style={styles.duration}>{song.duration}</Text>
      </View>
      {showAddButton && onAddToCollection && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={(e: GestureResponderEvent) => {
            e.stopPropagation();
            onAddToCollection();
          }}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1a1a1a',
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: '#777',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SongItem;
