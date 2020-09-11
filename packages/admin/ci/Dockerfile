FROM node:12.15-alpine
ENV TZ Asia/Seoul
RUN	apk update && \
	apk upgrade && \
	apk add --update tzdata && \
	cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
	echo "${TZ}" > /etc/timezone
ADD . /usr/src/app
WORKDIR /usr/src/app

RUN yarn
RUN npx lerna bootstrap --force-local --scope=@sogdagim/model --scope=@sogdagim/admin
ENV STAGE production
RUN npx lerna run build --scope=@sogdagim/model --scope=@sogdagim/admin
RUN rm -rf packages/api
RUN rm -rf packages/expo
RUN rm -rf packages/orm
RUN rm -rf node_modules
WORKDIR /usr/src/app/packages/admin
RUN rm -rf .env
EXPOSE 80
