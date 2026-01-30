import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentSong: {
    title: string;
    artist: string;
    thumbnail: string;
  } | null;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  currentSong,
}) => {
  if (!currentSong) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.songInfo}>
        <Image source={{uri: currentSong.thumbnail}} style={styles.thumbnail} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={onPrevious} style={styles.button}>
          <Text style={styles.buttonText}>⏮</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
          <Text style={styles.playButtonText}>{isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} style={styles.button}>
          <Text style={styles.buttonText}>⏭</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282828',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  artist: {
    fontSize: 12,
    color: '#aaa',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
  playButton: {
    padding: 8,
    marginHorizontal: 8,
  },
  playButtonText: {
    fontSize: 28,
    color: '#1DB954',
  },
});

export default PlayerControls;
