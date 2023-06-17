FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install --force
RUN npm install -g cookie-session sequelize pg express-session
COPY . .
ENV NODE_PATH=/usr/local/lib/node_modules
COPY . .
CMD ["npm", "run", "start"]
