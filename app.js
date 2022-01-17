const fs = require('fs');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');

const playlistCollection = async () => {
    return await ytpl('youtube-playlist-url');
}

playlistCollection().then(playlist => {
    const videos = [...playlist.items];
    fs.writeFileSync('playlist.txt', JSON.stringify(playlist));

    videos.forEach(async video => {
        const info = await ytdl.getInfo(video.id);
        const format = ytdl.chooseFormat(info.formats, { quality: '18' });

        ytdl(video.url, { format: format }).pipe(fs.createWriteStream(`${video.index}.mp4`));
    });
});