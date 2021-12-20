FROM node:14.15.4-alpine as build

WORKDIR /app

COPY . /app/

#prepare the container for build react app
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
RUN npm run build

#nginx
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

#start nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 