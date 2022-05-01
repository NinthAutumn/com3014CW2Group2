FROM node:14
RUN mkdir -p /usr/src/auth
WORKDIR /usr/src/auth
# Install app dependencies
COPY package.json /usr/src/auth/
COPY yarn.lock /usr/src/auth/
# RUN npm install -g yarn
RUN yarn

COPY . /usr/src/auth
# ENV PG_CONNECTION_STRING=
ENV USER_SERVICE_URL=http://user:3000
ENV EMAIL_SERVICE_URL=http://email:3000
# ENV CLIENT_URL=
# ENV SENDGRID_API_KEY=S
RUN yarn build

CMD ["yarn", "start:prod"]
