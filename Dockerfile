FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package files từ thư mục be
COPY be/package*.json ./

# Cài đặt dependencies
RUN npm ci --omit=dev

# Copy toàn bộ source code từ thư mục be
COPY be/ .

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"] 