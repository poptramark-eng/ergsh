FROM node:24

WORKDIR /app

# Copy everything
COPY . .

# Install and build
RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]