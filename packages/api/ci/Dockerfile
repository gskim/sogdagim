FROM node:12.15-alpine
ENV TZ Asia/Seoul
RUN	apk update && \
	apk upgrade && \
	apk add --update tzdata && \
	cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
	echo "${TZ}" > /etc/timezone
# RUN npm install -g pm2
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN yarn
RUN npx lerna bootstrap --force-local --scope=@sogdagim/model --scope=@sogdagim/orm --scope=@sogdagim/api
RUN npx lerna run build --scope=@sogdagim/model --scope=@sogdagim/orm --scope=@sogdagim/api
WORKDIR /usr/src/app/packages/api
RUN rm -rf .env
EXPOSE 80
