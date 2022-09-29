FROM node:16
ADD ./package.json .
ADD ./tsconfig.json .
COPY ./src ./src
RUN yarn
RUN yarn build
EXPOSE 4000
ENTRYPOINT yarn start