FROM node:14
RUN mkdir -p /usr/src/matching
WORKDIR /usr/src/matching
# Install app dependencies
COPY package.json /usr/src/matching/
COPY yarn.lock /usr/src/matching/
# RUN npm install -g yarn
RUN yarn

COPY . /usr/src/matching
# ENV PG_CONNECTION_STRING=
# ENV CLIENT_URL=
# ENV SENDGRID_API_KEY=S
RUN yarn build
EXPOSE 3007

CMD ["yarn", "start:prod"]
