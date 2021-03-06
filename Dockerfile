FROM node:8

EXPOSE 80
ENV \
  PORT=80 \
  NODE_ENV=production

WORKDIR /node
COPY . /node
RUN \
  yarn install && \
  yarn run build

CMD yarn run start

HEALTHCHECK --timeout=3s CMD curl -f http://localhost:$PORT || exit 1
