FROM node:14
RUN mkdir -p /usr/src/matching
WORKDIR /usr/src/matching
# Install app dependencies
COPY package.json /usr/src/matching/
COPY yarn.lock /usr/src/matching/
# RUN npm install -g yarn
RUN yarn

COPY . /usr/src/matching

ENV PET_SERVICE_URL=http://pet:3000
ENV SHELTER_SERVICE_URL=http://shelter:3000
ENV USER_SERVICE_URL=http://user:3000
RUN yarn build
CMD ["yarn", "start:prod"]
