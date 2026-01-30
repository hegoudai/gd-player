import axios from 'axios';

export interface YouTubeVideo {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
}

// Note: In a production app, you should use a proper YouTube Data API key
// Store API keys in environment variables, never commit them to source control
// For demonstration purposes, we'll use a mock implementation
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';

class YouTubeService {
  async searchVideos(query: string): Promise<YouTubeVideo[]> {
    try {
      // In a real implementation, you would use the YouTube Data API
      // For this demo, we'll return mock data
      // Uncomment the following code when you have a valid API key:
      /*
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            q: query + ' audio',
            type: 'video',
            videoCategoryId: '10', // Music category
            maxResults: 20,
            key: YOUTUBE_API_KEY,
          },
        },
      );

      const videoIds = response.data.items
        .map((item: any) => item.id.videoId)
        .join(',');

      const detailsResponse = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params: {
            part: 'contentDetails,snippet',
            id: videoIds,
            key: YOUTUBE_API_KEY,
          },
        },
      );

      return detailsResponse.data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
        duration: this.formatDuration(item.contentDetails.duration),
      }));
      */

      // Mock data for demonstration
      return this.getMockSearchResults(query);
    } catch (error) {
      console.error('Error searching YouTube:', error);
      throw error;
    }
  }

  private getMockSearchResults(query: string): YouTubeVideo[] {
    // Mock search results for demonstration
    const mockResults: YouTubeVideo[] = [
      {
        id: 'dQw4w9WgXcQ',
        title: `${query} - Song 1`,
        artist: 'Artist 1',
        thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
        duration: '3:32',
      },
      {
        id: 'jNQXAC9IVRw',
        title: `${query} - Song 2`,
        artist: 'Artist 2',
        thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg',
        duration: '4:15',
      },
      {
        id: '9bZkp7q19f0',
        title: `${query} - Song 3`,
        artist: 'Artist 3',
        thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg',
        duration: '3:45',
      },
      {
        id: 'kJQP7kiw5Fk',
        title: `${query} - Song 4`,
        artist: 'Artist 4',
        thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/mqdefault.jpg',
        duration: '4:01',
      },
      {
        id: 'fJ9rUzIMcZQ',
        title: `${query} - Song 5`,
        artist: 'Artist 5',
        thumbnail: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg',
        duration: '3:28',
      },
    ];

    return mockResults;
  }

  private formatDuration(duration: string): string {
    // Parse ISO 8601 duration format (PT3M32S)
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');

    let formatted = '';
    if (hours) {
      formatted += hours + ':';
    }
    formatted += (minutes || '0').padStart(hours ? 2 : 1, '0') + ':';
    formatted += (seconds || '0').padStart(2, '0');

    return formatted;
  }

  getVideoStreamUrl(videoId: string): string {
    // Note: This returns a YouTube embed URL which is intended for web browsers.
    // For actual audio playback in React Native, you would need to:
    // 1. Use a backend service to extract the direct audio stream URL
    // 2. Use a library like react-native-track-player with the stream URL
    // 3. Or use react-native-youtube-iframe for video playback
    // The current implementation is a placeholder for demonstration
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
}

export default new YouTubeService();
