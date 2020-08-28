## Generate RTMP stream

For instance with ffmpeg from a video file

```bash
$ ffmpeg -re -i video.mp4 -vcodec copy -loop -1 -c:a aac -b:a 160k -ar 44100 -strict -2 \
         -f flv rtmp://192.168.1.149/media-server/test
```

## Play

### Stream can be viewed now on: (with VLC for instance)

#### From same RTMP stream/protocol
 > rtmp://192.168.1.149/media-server/test

## In browser/device

### With HLS streaming - with video.js for the not supporting browsers

 > http://192.168.1.149:8080/media/hls/test.m3u8

### With DASH streaming - p- with video.js (or dash.js) for the not supporting browsers

 >http://192.168.1.149:8080/media/dash/test.mpd
