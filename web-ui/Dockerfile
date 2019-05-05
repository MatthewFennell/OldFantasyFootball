FROM node:10.11.0-slim

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /fantasy/server

COPY . /fantasy
RUN npm i
EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
