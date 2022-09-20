FROM node:alpine AS build-stage

COPY . .
EXPOSE 8080
RUN npm install
RUN npm run build
RUN rm -rf src tsconfig.build.tsbuildinfo
CMD ["npm", "start"]
