FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN rm /usr/local/bin/yarn
RUN rm /usr/local/bin/yarnpkg && npm install -g yarn

RUN yarn install
# If you are building your code for production
# Bundle app source
COPY . .

# RUN npm ci --only=production
RUN yarn build

EXPOSE 1337

CMD [ "yarn", "start" ]


