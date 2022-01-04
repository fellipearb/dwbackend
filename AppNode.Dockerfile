FROM node:14
ADD ./package.json .
COPY ./src .
RUN npm i
EXPOSE 4000
ENTRYPOINT nodemon ./server.ts