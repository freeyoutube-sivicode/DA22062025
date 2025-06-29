const OrderTestDrive = require('../models/OrderTestDrive');
const User = require('../models/User');
const Product = require('../models/Product');
const { successResponse, errorResponse, HTTP_STATUS } = require('../utils/responseHandler');

// Thống kê lịch lái thử
const getOrderStatistics = async (req, res) => {
  try {
    const totalOrders = await OrderTestDrive.countDocuments();
    const pendingOrders = await OrderTestDrive.countDocuments({ Status: 'pending' });
    const confirmedOrders = await OrderTestDrive.countDocuments({ Status: 'confirmed' });
    const completedOrders = await OrderTestDrive.countDocuments({ Status: 'completed' });
    const cancelledOrders = await OrderTestDrive.countDocuments({ Status: 'cancelled' });
    const totalAmount = await OrderTestDrive.aggregate([
      { $group: { _id: null, total: { $sum: '$Total_Amount' } } }
    ]);
    successResponse(res, {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      completedOrders,
      cancelledOrders,
      totalAmount: totalAmount[0]?.total || 0
    });
  } catch (error) {
    errorResponse(res, 'Lỗi thống kê lịch lái thử', HTTP_STATUS.INTERNAL_SERVER_ERROR, error);
  }
};

// Thống kê người dùng
const getUserStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    // Số người dùng đã từng đặt lịch lái thử
    const usersWithOrders = await OrderTestDrive.distinct('UserID');
    const bookedUsers = usersWithOrders.length;
    successResponse(res, {
      totalUsers,
      bookedUsers
    });
  } catch (error) {
    errorResponse(res, 'Lỗi thống kê người dùng', HTTP_STATUS.INTERNAL_SERVER_ERROR, error);
  }
};

// Thống kê sản phẩm
const getProductStatistics = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const availableProducts = await Product.countDocuments({ Status: 'available' });
    const outOfStockProducts = await Product.countDocuments({ Stock: 0 });
    
    successResponse(res, {
      totalProducts,
      availableProducts,
      outOfStockProducts
    });
  } catch (error) {
    errorResponse(res, 'Lỗi thống kê sản phẩm', HTTP_STATUS.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = {
  getOrderStatistics,
  getUserStatistics,
  getProductStatistics
}; 