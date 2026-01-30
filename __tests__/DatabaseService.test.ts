import DatabaseService from '../src/services/DatabaseService';

describe('DatabaseService', () => {
  it('should have necessary methods', () => {
    expect(DatabaseService.initDB).toBeDefined();
    expect(DatabaseService.addSong).toBeDefined();
    expect(DatabaseService.getAllSongs).toBeDefined();
    expect(DatabaseService.deleteSong).toBeDefined();
    expect(DatabaseService.songExists).toBeDefined();
    expect(DatabaseService.closeDB).toBeDefined();
  });
});
