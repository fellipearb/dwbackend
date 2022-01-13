FROM node:16
ADD ./package.json .
COPY ./storage .
RUN npm i
EXPOSE 9000
ENTRYPOINT node ./index.ts