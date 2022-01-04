FROM node:14
ADD ./package.json .
ADD ./tsconfig.json .
COPY ./src ./src
RUN npm i
EXPOSE 4000
ENTRYPOINT yarn start