ffmpeg -re -i KatoSlunce-Laktnik-2019.mp4 -vcodec copy -loop -1 -c:a aac -b:a 160k -ar 44100 -strict -2 \
       -f flv rtmp://192.168.1.149/media-server/test

