FROM node:18-alpine
WORKDIR /api
COPY package*.json .
RUN npm ci
COPY . . 
EXPOSE 3666
CMD ["npm", "run" , "dev"]