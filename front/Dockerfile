FROM node:alpine AS build-stage

COPY . .
RUN npm install
RUN npm run build
RUN rm -rf src tsconfig.build.tsbuildinfo package-lock.json tsconfig.json

FROM nginx:alpine AS front

EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY --from=build-stage build .
CMD ["nginx", "-g", "daemon off;"]
