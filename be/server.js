// Import các thư viện cần thiết
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// Load biến môi trường
dotenv.config();

// Khởi tạo Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Test Drive Booking API Documentation'
}));

// Middleware log request (tạm thời để debug)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  // console.log('Request Headers:', req.headers); // Uncomment for detailed headers
  // console.log('Request Body:', req.body); // Uncomment for request body
  next();
});

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Đã kết nối thành công đến MongoDB'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Import routes
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users'); // User management routes
const roleRoutes = require('./routes/roles');
const roleUserRoutes = require('./routes/roleUsers');
const favoritesRoutes = require('./routes/favorites'); // Favorites routes
const servicesApis = require('./routes/services'); // Services API
const newsEventsApis = require('./routes/newsEvents'); // News & Events API
const statisticsRoutes = require('./routes/statistics');
const businessRoutes = require('./routes/business');
const serviceRequestsRouter = require('./routes/serviceRequests');

// Sử dụng routes
app.use('/api/users', userRoutes); // User management routes
// Consider consolidating user-related routes if userRoutes and roleUserRoutes overlap
app.use('/api/nguoi-dung', userRoutes); // Example mount for userRoutes
app.use('/api/vai-tro', roleRoutes); // Example mount for roleRoutes
app.use('/api/nguoi-dung', roleUserRoutes); // Example mount for roleUserRoutes

// Mount category routes
app.use('/api/danh-muc', categoryRoutes);

app.use('/api/xe', productRoutes);

// Mount favorites routes
app.use('/api/yeu-thich', favoritesRoutes);

app.use('/api/dich-vu', servicesApis);
app.use('/api/tin-tuc-su-kien', newsEventsApis);
app.use('/api/thong-ke', statisticsRoutes);
app.use('/api', businessRoutes);
app.use('/api/service-requests', serviceRequestsRouter);

// Xử lý lỗi 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Không tìm thấy API endpoint'
  });
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Đã xảy ra lỗi server',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
}); 