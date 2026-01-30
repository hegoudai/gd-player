import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(__DEV__);
SQLite.enablePromise(true);

export interface Song {
  id?: number;
  title: string;
  artist: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  addedAt?: string;
}

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async initDB(): Promise<void> {
    try {
      this.db = await SQLite.openDatabase({
        name: 'gdplayer.db',
        location: 'default',
      });

      await this.createTables();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const query = `
      CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        youtubeId TEXT NOT NULL UNIQUE,
        thumbnail TEXT,
        duration TEXT,
        addedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await this.db.executeSql(query);
  }

  async addSong(song: Song): Promise<number> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const query = `
      INSERT INTO songs (title, artist, youtubeId, thumbnail, duration)
      VALUES (?, ?, ?, ?, ?);
    `;

    const result = await this.db.executeSql(query, [
      song.title,
      song.artist,
      song.youtubeId,
      song.thumbnail,
      song.duration,
    ]);

    return result[0].insertId;
  }

  async getAllSongs(): Promise<Song[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const query = 'SELECT * FROM songs ORDER BY addedAt DESC;';
    const result = await this.db.executeSql(query);

    const songs: Song[] = [];
    for (let i = 0; i < result[0].rows.length; i++) {
      songs.push(result[0].rows.item(i));
    }

    return songs;
  }

  async deleteSong(id: number): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const query = 'DELETE FROM songs WHERE id = ?;';
    await this.db.executeSql(query, [id]);
  }

  async songExists(youtubeId: string): Promise<boolean> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const query = 'SELECT COUNT(*) as count FROM songs WHERE youtubeId = ?;';
    const result = await this.db.executeSql(query, [youtubeId]);

    return result[0].rows.item(0).count > 0;
  }

  async closeDB(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}

export default new DatabaseService();
