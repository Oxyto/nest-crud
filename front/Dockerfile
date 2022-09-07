FROM nginx:alpine AS front-server

EXPOSE 80
COPY . .
RUN npm run build && cp build /use/share/nginx/html
