FROM python:3.7

ENV DEBIAN_FRONTEND noninteractive
ENV TZ UTC

RUN apt-get update && apt-get install -y mongo-tools
RUN pip install 'mongo-connector[elastic5]'

COPY . .

# Make it executable just in case the local file while building the image is not
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
