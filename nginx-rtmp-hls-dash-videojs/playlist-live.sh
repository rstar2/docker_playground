#!/bin/sh
rm -f ./tmp/playlist-dash-live
mkdir -p ./tmp/dash-live
for file in `(pwd)`/videos/*
do
	echo "file '$file'" >> ./tmp/playlist-dash-live
done

# ffmpeg \
# 	-re \
# 	-loglevel error \
# 	-stream_loop -1 \
# 	-f concat \
# 	-safe 0 \
# 	-i ./tmp/playlist-dash-live \
# 	-vf "drawtext=\
# 			fontfile=/usr/share/fonts/truetype/ttf-dejavu/DejaVuSans-Bold.ttf:\
# 			text='%{gmtime\:%Y-%m-%d %T} UTC':\
# 			fontcolor=white:\
# 			x=(w-text_w)/2:y=128:\
# 			box=1:boxcolor=black:\
# 			fontsize=72,
# 		drawtext=\
# 			fontfile=/usr/share/fonts/truetype/ttf-dejavu/DejaVuSans-Bold.ttf:\
# 			text='REBROADCAST':\
# 			fontcolor=white:\
# 			x=(w-text_w)/2:y=16:\
# 			box=1:boxcolor=black:\
# 			fontsize=48" \
# 	-codec:v libx264 \
# 	-profile:v baseline \
# 	-pix_fmt yuv420p \
# 	-level 4 \
# 	-preset veryfast \
# 	-codec:a aac \
# 	-f dash \
# 	-window_size 5 \
# 	-remove_at_exit 1 \
# 	./tmp/dash-live/live.mpd

ffmpeg \
    -re \
    -loglevel error \
    -f concat \
    -safe 0 \
	-i `(pwd)`/tmp/playlist-dash-live \
    -vf "drawtext=\
			fontfile=/usr/share/fonts/truetype/ttf-dejavu/DejaVuSans-Bold.ttf:\
			text='%{gmtime\:%Y-%m-%d %T} UTC':\
			fontcolor=white:\
			x=(w-text_w)/2:y=128:\
			box=1:boxcolor=black:\
			fontsize=72,
		drawtext=\
			fontfile=/usr/share/fonts/truetype/ttf-dejavu/DejaVuSans-Bold.ttf:\
			text='REBROADCAST':\
			fontcolor=white:\
			x=(w-text_w)/2:y=16:\
			box=1:boxcolor=black:\
			fontsize=48" \
    -codec:v libx264  -loop -1 -c:a aac -b:a 160k -ar 44100 -strict -2 \
	-f dash \
	-window_size 5 \
	-remove_at_exit 1 \
	./tmp/dash-live/live.mpd

# The live stream can be played in VLC on :
# file:///home/rumen/ProjectsLearn/docker/playground/nginx-rtmp-hls-dash-videojs/tmp/dash-live/live.mpd
# http://192.168.1.149:5000/dash-live/live.mpd if a web server is on
