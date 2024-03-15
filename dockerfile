#no funciona con mongo 120324
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4010
CMD ["npm","start"]