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
COPY package.json yarn.lock ./
COPY .yarnrc .yarnrc
RUN yarn install

COPY . .
RUN NODE_OPTIONS='--max_old_space_size=8192' yarn build

#####################################################################
# This is the Production image we run, it combines the apionly stuff
# with the static web content we built. It also adds some labels
# which are used by our Apps infra.
#####################################################################
FROM docker.hq.datarobot.com/datarobot/covid-rhel8-base:2021-03-15 as prod

ENV IS_PROD=true

USER 0

RUN mkdir /logs ; touch /logs/error.log

RUN yum -y update && \
  yum -y install xmlsec1 xmlsec1-openssl nginx golang && \
  yum -y clean all

WORKDIR /mcfly
# COPY ./mcfly/go.mod ./mcfly/go.sum ./mcfly/schools.csv ./mcfly/captcha/captcha.go ./
COPY ./mcfly/.env ./mcfly ./
RUN go mod download
RUN go build -o main .

WORKDIR /

COPY --from=htmlbuild /html/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./Makefile ./Makefile

EXPOSE 8080

CMD ["make", "start-app"]

ENV STATIC_FILES_DIR=/html/static/ \
  API_SERVER_PORT=8081 \
  ENV=production

# This label is used to create correct applications bundle and manifest file with <sha>.
ARG GIT_COMMIT=unspecified
LABEL git_commit=$GIT_COMMIT
ARG GIT_REPO=unspecified
LABEL git_repo=$GIT_REPO
