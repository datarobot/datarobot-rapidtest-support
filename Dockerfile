#####################################################################
# Used for building web code down into static HTML and minified JS
#####################################################################
FROM node:14 as htmlbuild

ENV YARN_VERSION 1.16.0

RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
  && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
  && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
  && rm yarn-v$YARN_VERSION.tar.gz

WORKDIR /html/
ENV NODE_ENV=production
COPY package.json ./
COPY .yarnrc .yarnrc
RUN yarn install

COPY . .
# RUN yarn build-docs
RUN NODE_OPTIONS='--max_old_space_size=8192' yarn build

FROM registry.access.redhat.com/ubi8/nodejs-14:1-46 as prod

ENV IS_PROD=true

USER 0

RUN mkdir /logs ; touch /logs/error.log

RUN yum -y update && \
  yum -y install xmlsec1 xmlsec1-openssl nginx golang && \
  yum -y clean all

WORKDIR /api
COPY ./api/.env ./api ./
RUN go mod download
RUN go build -o main .

WORKDIR /
COPY --from=htmlbuild /html/build /usr/share/nginx/html
# COPY --from=htmlbuild /html/docs/build /usr/share/nginx/docs/docs
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./Makefile ./Makefile

EXPOSE 8080

CMD ["make", "start-app"]

ENV STATIC_FILES_DIR=/html/static/ \
  API_SERVER_PORT=8081 \
  ENV=production
