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
COPY package.json yarn.lock ./
COPY .yarnrc .yarnrc
RUN yarn install

COPY . .
RUN NODE_OPTIONS='--max_old_space_size=8192' yarn build
RUN mv /html/build/static/* /html/build/
RUN rm -rf /html/build/static

#####################################################################
# This is the Production image we run, it combines the apionly stuff
# with the static web content we built. It also adds some labels
# which are used by our Apps infra.
#####################################################################
FROM docker.hq.datarobot.com/datarobot/covid-rhel8-base:2021-01-04 as prod

USER 0

RUN yum -y update && \
  yum -y install xmlsec1 xmlsec1-openssl && \
  yum -y clean all

COPY --from=htmlbuild /html/build/ /html/static/
ENV STATIC_FILES_DIR=/html/static/ \
  API_SERVER_PORT=8081 \
  ENV=production

USER 1001
EXPOSE 8081
CMD ["python", "-m", "app"]

# This label is used to create correct applications bundle and manifest file with <sha>.
ARG GIT_COMMIT=unspecified
LABEL git_commit=$GIT_COMMIT
ARG GIT_REPO=unspecified
LABEL git_repo=$GIT_REPO