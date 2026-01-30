import YouTubeService from '../src/services/YouTubeService';

describe('YouTubeService', () => {
  it('should have searchVideos method', () => {
    expect(YouTubeService.searchVideos).toBeDefined();
  });

  it('should have getVideoStreamUrl method', () => {
    expect(YouTubeService.getVideoStreamUrl).toBeDefined();
  });

  it('should return mock search results', async () => {
    const results = await YouTubeService.searchVideos('test');
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it('should return video stream URL', () => {
    const url = YouTubeService.getVideoStreamUrl('testVideoId');
    expect(url).toContain('youtube.com');
    expect(url).toContain('testVideoId');
  });
});
