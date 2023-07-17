FROM node:18

WORKDIR /var/www/html/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# CMD ["npm", "start"]

# FROM nginx:latest

# RUN rm -rf /usr/share/nginx/html/*

# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
