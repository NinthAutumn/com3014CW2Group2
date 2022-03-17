FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
# RUN npm install -g yarn
RUN yarn

COPY . /usr/src/app
# ENV PG_CONNECTION_STRING=
# ENV CLIENT_URL=
# ENV SENDGRID_API_KEY=S
RUN yarn build
EXPOSE 3000

CMD ["yarn", "start:prod"]
