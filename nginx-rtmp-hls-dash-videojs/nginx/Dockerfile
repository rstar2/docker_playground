# Dockerfile for a simple Nginx stream replicator

FROM ubuntu:focal

RUN apt update && \
    apt install -y nginx libnginx-mod-rtmp

RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Set up exposed ports
EXPOSE 80
EXPOSE 1935

# Set up entrypoint
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 555 /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD []
