FROM docker.elastic.co/elasticsearch/elasticsearch:6.5.3

# Note we are in already in the right folder
# WORKDIR /usr/share/elasticsearch

COPY docker-entrypoint.sh /docker-entrypoint.sh
# COPY config config  $ if needed to add a custom elasticsearch.yml for instance
COPY setup setup
# RUN mkdir utils
COPY utils utils

USER root
RUN chmod +x /docker-entrypoint.sh utils/wait-for-it.sh setup/setup.sh \
    && chown elasticsearch:elasticsearch /docker-entrypoint.sh utils/wait-for-it.sh setup/setup.sh

USER elasticsearch
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["elasticsearch"]
