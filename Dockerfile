FROM node:12-alpine
WORKDIR /app
COPY package*.json yarn.lock ./
COPY . .
RUN yarn --production --frozen-lockfile
RUN yarn build
EXPOSE 4000
CMD ["yarn", "start"]