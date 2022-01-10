# Set the base image to node:12-alpine
FROM node:12-alpine as build

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . /app/

# Prepare the container for building React
RUN yarn
# We want the production version
RUN yarn build

#Prepare nginx
FROM nginx:1.18.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
#ARG REACT_APP_SERVER_URL
#ENV REACT_APP_SERVER_URL = "http://api-development.patience.vn/api"
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#CMD ["yarn", "start"]