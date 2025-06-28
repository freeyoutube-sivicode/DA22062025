// Import routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const testDriveRoutes = require('./routes/testDriveOrders');
const serviceRoutes = require('./routes/services');
const newsEventRoutes = require('./routes/newsEvents');
const favoritesRoutes = require('./routes/favorites');
const roleRoutes = require('./routes/roles');
const roleUserRoutes = require('./routes/roleUsers');
const generalOrderRoutes = require('./routes/generalOrders'); // New file for General Orders, using ordersController
const servicesApis = require('./routes/services'); // Corrected import name
const newsEventsApis = require('./routes/newsEvents'); // Corrected import name
const statisticsRoutes = require('./routes/statistics');
const businessRoutes = require('./routes/business');
const serviceRequestsRouter = require('./routes/serviceRequests');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/san-pham', productRoutes);
app.use('/api/nguoi-dung', userRoutes); // API for user management (needs review - possible duplication)
app.use('/api/vai-tro', roleRoutes);
app.use('/api/nguoi-dung', roleUserRoutes); // May need to clarify purpose if userRoutes covers this (possible duplication)
app.use('/api/gio-hang', favoritesRoutes); // Changed: Cart route now uses favorites functionality
// Comment out cartItemRoutes as it's causing routing conflicts
// app.use('/api/gio-hang', cartItemRoutes); 
app.use('/api/lich-lai-thu', testDriveRoutes); // Route for Test Drive Orders
app.use('/api/don-hang', generalOrderRoutes); // Route for General Orders
app.use('/api/dich-vu', servicesApis); // Route for Services
app.use('/api/tin-tuc-su-kien', newsEventsApis); // Route for News & Events
app.use('/api/thong-ke', statisticsRoutes);
app.use('/api', businessRoutes);
app.use('/api/service-requests', serviceRequestsRouter); 