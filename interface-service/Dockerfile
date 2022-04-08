FROM node:14
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client
# Install app dependencies
COPY package.json /usr/src/client/
COPY yarn.lock /usr/src/client/
# RUN npm install -g yarn
RUN yarn

# VITE_API_ROUTE=https://api.honoku.com
ENV PORT=8080
ENV VITE_HOST_DOMAIN=http://localhost
COPY . /usr/src/client

RUN yarn build
EXPOSE 8080

CMD ["yarn", "start"]
