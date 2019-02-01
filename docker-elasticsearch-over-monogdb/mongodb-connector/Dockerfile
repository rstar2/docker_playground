FROM python:3.7

ENV DEBIAN_FRONTEND noninteractive
ENV TZ UTC

RUN apt-get update && apt-get install -y jq mongodb-clients
RUN pip install 'mongo-connector[elastic5]'

COPY docker-entrypoint.sh .

ENTRYPOINT ["./docker-entrypoint.sh"]
