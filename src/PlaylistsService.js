const { Pool } = require('pg');
const NotFoundError = require('./exceptions/NotFoundError');
class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistById(id) {
        const query = {
            text: `SELECT * FROM playlists where id = $1`,
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Playlist tidak ditemukan');
        }

        return result.rows[0];
    }
    async getSongPlaylist(id) {
        const query = {
            text: `SELECT songs.id, songs.title, songs.performer FROM songs JOIN playlist_songs ON songs.id = playlist_songs.song_id JOIN playlists ON playlists.id = playlist_songs.playlist_id where playlist_songs.playlist_id = $1`,
            values: [id],
        };
        const result = await this._pool.query(query);

        return result.rows;
    }


}

module.exports = PlaylistsService;