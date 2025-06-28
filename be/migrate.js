const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import all models
const User = require('./models/User');
const Role = require('./models/Role');
const RoleUser = require('./models/RoleUser');
const ProductCategory = require('./models/ProductCategory');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Service = require('./models/Service');
const NewsEvent = require('./models/NewsEvent');

// Sample data
const sampleRoles = [
  {
    Role_Name: 'admin',
    Role_Description: 'Quản trị viên hệ thống',
    Permissions: [
      'read:products', 'write:products',
      'read:categories', 'write:categories',
      'read:users', 'write:users',
      'read:orders', 'write:orders',
      'read:roles', 'write:roles'
    ],
    Status: 'active'
  },
  {
    Role_Name: 'user',
    Role_Description: 'Người dùng thông thường',
    Permissions: ['read:products', 'read:categories'],
    Status: 'active'
  }
];

const sampleProductCategories = [
  {
    Category_Name: 'BMW Series 1',
    Description: 'Dòng xe nhỏ gọn, tiết kiệm nhiên liệu',
    Status: 'active'
  },
  {
    Category_Name: 'BMW Series 3',
    Description: 'Dòng xe sedan cỡ trung, thể thao',
    Status: 'active'
  },
  {
    Category_Name: 'BMW Series 5',
    Description: 'Dòng xe sedan hạng sang, cao cấp',
    Status: 'active'
  },
  {
    Category_Name: 'BMW Series 7',
    Description: 'Dòng xe sedan flagship, xa xỉ',
    Status: 'active'
  },
  {
    Category_Name: 'BMW X Series',
    Description: 'Dòng xe SUV/SAV đa dụng',
    Status: 'active'
  },
  {
    Category_Name: 'BMW M Series',
    Description: 'Dòng xe hiệu suất cao, thể thao',
    Status: 'active'
  },
  {
    Category_Name: 'BMW i Series',
    Description: 'Dòng xe điện, thân thiện môi trường',
    Status: 'active'
  }
];

const sampleCategories = [
  {
    Name: 'Xe mới',
    Description: 'Các mẫu xe mới nhất từ BMW',
    Image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    Status: 'active',
    Order: 1
  },
  {
    Name: 'Xe đã qua sử dụng',
    Description: 'Xe đã qua sử dụng chất lượng cao',
    Image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    Status: 'active',
    Order: 2
  },
  {
    Name: 'Dịch vụ',
    Description: 'Dịch vụ bảo hành và bảo dưỡng',
    Image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    Status: 'active',
    Order: 3
  },
  {
    Name: 'Tin tức',
    Description: 'Tin tức và sự kiện mới nhất',
    Image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop',
    Status: 'active',
    Order: 4
  }
];

// Function to generate sample products
function generateSampleProducts() {
  const products = [];
  // Danh sách ảnh BMW thực tế từ Unsplash, mỗi model một ảnh riêng biệt
  const bmwModels = [
    { name: 'BMW 118i', series: 'Series 1', basePrice: 1200000000, engine: '1.5L 3-cylinder Turbo', power: '109 hp', torque: '190 Nm', acceleration: '9.4', topSpeed: '205', fuelConsumption: '5.4', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop' },
    { name: 'BMW 218i', series: 'Series 2', basePrice: 1350000000, engine: '1.5L 3-cylinder Turbo', power: '109 hp', torque: '190 Nm', acceleration: '9.2', topSpeed: '210', fuelConsumption: '5.6', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop' },
    { name: 'BMW 320i', series: 'Series 3', basePrice: 1890000000, engine: '2.0L 4-cylinder Turbo', power: '184 hp', torque: '300 Nm', acceleration: '7.1', topSpeed: '235', fuelConsumption: '6.2', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop' },
    { name: 'BMW 330i', series: 'Series 3', basePrice: 2200000000, engine: '2.0L 4-cylinder Turbo', power: '258 hp', torque: '400 Nm', acceleration: '5.8', topSpeed: '250', fuelConsumption: '6.8', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop' },
    { name: 'BMW 420i', series: 'Series 4', basePrice: 2100000000, engine: '2.0L 4-cylinder Turbo', power: '184 hp', torque: '300 Nm', acceleration: '7.5', topSpeed: '235', fuelConsumption: '6.4', image: 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&h=600&fit=crop' },
    { name: 'BMW 520i', series: 'Series 5', basePrice: 2890000000, engine: '2.0L 4-cylinder Turbo', power: '184 hp', torque: '290 Nm', acceleration: '8.2', topSpeed: '235', fuelConsumption: '6.8', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=entropy' },
    { name: 'BMW 530i', series: 'Series 5', basePrice: 3200000000, engine: '2.0L 4-cylinder Turbo', power: '252 hp', torque: '350 Nm', acceleration: '6.9', topSpeed: '250', fuelConsumption: '7.2', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=entropy' },
    { name: 'BMW 630i', series: 'Series 6', basePrice: 3800000000, engine: '2.0L 4-cylinder Turbo', power: '258 hp', torque: '400 Nm', acceleration: '6.8', topSpeed: '250', fuelConsumption: '7.5', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=entropy' },
    { name: 'BMW 730i', series: 'Series 7', basePrice: 4500000000, engine: '2.0L 4-cylinder Turbo', power: '258 hp', torque: '400 Nm', acceleration: '6.9', topSpeed: '250', fuelConsumption: '7.8', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop&crop=entropy' },
    { name: 'BMW 740i', series: 'Series 7', basePrice: 5200000000, engine: '3.0L 6-cylinder Turbo', power: '340 hp', torque: '450 Nm', acceleration: '5.4', topSpeed: '250', fuelConsumption: '8.2', image: 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&h=600&fit=crop&crop=entropy' },
    { name: 'BMW X1 sDrive18i', series: 'X Series', basePrice: 1500000000, engine: '1.5L 3-cylinder Turbo', power: '109 hp', torque: '190 Nm', acceleration: '10.5', topSpeed: '195', fuelConsumption: '6.1', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=faces' },
    { name: 'BMW X2 sDrive18i', series: 'X Series', basePrice: 1650000000, engine: '1.5L 3-cylinder Turbo', power: '109 hp', torque: '190 Nm', acceleration: '10.3', topSpeed: '200', fuelConsumption: '6.3', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=faces' },
    { name: 'BMW X3 xDrive20i', series: 'X Series', basePrice: 2300000000, engine: '2.0L 4-cylinder Turbo', power: '184 hp', torque: '300 Nm', acceleration: '8.4', topSpeed: '210', fuelConsumption: '7.2', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=faces' },
    { name: 'BMW X3 xDrive30i', series: 'X Series', basePrice: 2590000000, engine: '2.0L 4-cylinder Turbo', power: '252 hp', torque: '350 Nm', acceleration: '6.3', topSpeed: '240', fuelConsumption: '7.5', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop&crop=faces' },
    { name: 'BMW X4 xDrive20i', series: 'X Series', basePrice: 2500000000, engine: '2.0L 4-cylinder Turbo', power: '184 hp', torque: '300 Nm', acceleration: '8.6', topSpeed: '210', fuelConsumption: '7.4', image: 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&h=600&fit=crop&crop=faces' },
    { name: 'BMW X5 xDrive40i', series: 'X Series', basePrice: 3800000000, engine: '3.0L 6-cylinder Turbo', power: '340 hp', torque: '450 Nm', acceleration: '5.7', topSpeed: '250', fuelConsumption: '8.8', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=center' },
    { name: 'BMW X6 xDrive40i', series: 'X Series', basePrice: 4200000000, engine: '3.0L 6-cylinder Turbo', power: '340 hp', torque: '450 Nm', acceleration: '5.9', topSpeed: '250', fuelConsumption: '9.1', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=center' },
    { name: 'BMW X7 xDrive40i', series: 'X Series', basePrice: 5500000000, engine: '3.0L 6-cylinder Turbo', power: '340 hp', torque: '450 Nm', acceleration: '6.1', topSpeed: '250', fuelConsumption: '9.5', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center' },
    { name: 'BMW M2 Competition', series: 'M Series', basePrice: 4200000000, engine: '3.0L 6-cylinder Twin-Turbo', power: '410 hp', torque: '550 Nm', acceleration: '4.2', topSpeed: '280', fuelConsumption: '10.2', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop&crop=center' },
    { name: 'BMW M3 Competition', series: 'M Series', basePrice: 5890000000, engine: '3.0L 6-cylinder Twin-Turbo', power: '510 hp', torque: '650 Nm', acceleration: '3.8', topSpeed: '290', fuelConsumption: '10.8', image: 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&h=600&fit=crop&crop=center' },
    { name: 'BMW M4 Competition', series: 'M Series', basePrice: 6200000000, engine: '3.0L 6-cylinder Twin-Turbo', power: '510 hp', torque: '650 Nm', acceleration: '3.9', topSpeed: '290', fuelConsumption: '11.0', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=top' },
    { name: 'BMW M5 Competition', series: 'M Series', basePrice: 8500000000, engine: '4.4L 8-cylinder Twin-Turbo', power: '625 hp', torque: '750 Nm', acceleration: '3.3', topSpeed: '305', fuelConsumption: '12.5', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=top' },
    { name: 'BMW M8 Competition', series: 'M Series', basePrice: 12000000000, engine: '4.4L 8-cylinder Twin-Turbo', power: '625 hp', torque: '750 Nm', acceleration: '3.2', topSpeed: '305', fuelConsumption: '13.2', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=top' },
    { name: 'BMW i3', series: 'i Series', basePrice: 1800000000, engine: 'Động cơ điện', power: '170 hp', torque: '250 Nm', acceleration: '7.3', topSpeed: '150', range: '310', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop&crop=top' },
    { name: 'BMW i4 eDrive40', series: 'i Series', basePrice: 3290000000, engine: 'Động cơ điện', power: '340 hp', torque: '430 Nm', acceleration: '5.7', topSpeed: '190', range: '590', image: 'https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800&h=600&fit=crop&crop=top' },
    { name: 'BMW iX xDrive50', series: 'i Series', basePrice: 4500000000, engine: 'Động cơ điện', power: '523 hp', torque: '765 Nm', acceleration: '4.6', topSpeed: '200', range: '630', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&crop=bottom' },
    { name: 'BMW i7 xDrive60', series: 'i Series', basePrice: 6800000000, engine: 'Động cơ điện', power: '544 hp', torque: '745 Nm', acceleration: '4.7', topSpeed: '240', range: '625', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=bottom' }
  ];

  const variants = ['M Sport', 'Luxury', 'Sport', 'Executive', 'Premium', 'Comfort', 'Dynamic', 'Exclusive'];

  for (let i = 0; i < 100; i++) {
    const model = bmwModels[i % bmwModels.length];
    const variant = variants[i % variants.length];
    const variantIndex = Math.floor(i / bmwModels.length);
    const adjustedVariant = variantIndex > 0 ? `${variant} ${variantIndex + 1}` : variant;
    const basePrice = model.basePrice;
    const priceVariation = Math.random() * 0.2 - 0.1;
    const finalPrice = Math.round(basePrice * (1 + priceVariation));
    const stock = Math.floor(Math.random() * 10) + 1;
    const mainImage = model.image;
    const listImages = [model.image];
    let specifications = {};
    if (model.engine.includes('Động cơ điện')) {
      specifications = {
        'Động cơ': model.engine,
        'Công suất': model.power,
        'Mô-men xoắn': model.torque,
        'Hộp số': '1-speed',
        'Tăng tốc 0-100km/h': `${model.acceleration} giây`,
        'Tốc độ tối đa': `${model.topSpeed} km/h`,
        'Quãng đường': `${model.range} km`
      };
    } else {
      const transmission = model.series.includes('M Series') ? '8-speed M Steptronic' : '8-speed Steptronic';
      specifications = {
        'Động cơ': model.engine,
        'Công suất': model.power,
        'Mô-men xoắn': model.torque,
        'Hộp số': transmission,
        'Tăng tốc 0-100km/h': `${model.acceleration} giây`,
        'Tốc độ tối đa': `${model.topSpeed} km/h`,
        'Tiêu thụ nhiên liệu': `${model.fuelConsumption}L/100km`
      };
    }
    products.push({
      Product_Name: `${model.name} ${adjustedVariant}`,
      CategoryID: null,
      Description: `${model.series} với thiết kế ${adjustedVariant.toLowerCase()}, ${model.engine}`,
      Price: finalPrice,
      Main_Image: mainImage,
      List_Image: listImages,
      Specifications: specifications,
      Status: 'available',
      Stock: stock
    });
  }
  return products;
}

const sampleProducts = generateSampleProducts();

const sampleServices = [
  {
    Name: 'Bảo dưỡng định kỳ',
    Description: 'Dịch vụ bảo dưỡng định kỳ theo khuyến nghị của BMW',
    Price: 2000000,
    Status: 'available',
    ImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
  },
  {
    Name: 'Thay dầu động cơ',
    Description: 'Thay dầu động cơ và lọc dầu theo tiêu chuẩn BMW',
    Price: 1500000,
    Status: 'available',
    ImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
  },
  {
    Name: 'Kiểm tra hệ thống phanh',
    Description: 'Kiểm tra và bảo dưỡng hệ thống phanh toàn diện',
    Price: 1800000,
    Status: 'available',
    ImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
  },
  {
    Name: 'Đánh son xe',
    Description: 'Dịch vụ đánh son xe chuyên nghiệp',
    Price: 3000000,
    Status: 'available',
    ImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
  },
  {
    Name: 'Nâng cấp hiệu suất',
    Description: 'Nâng cấp hiệu suất động cơ và hệ thống treo',
    Price: 5000000,
    Status: 'available',
    ImageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'
  }
];

const sampleNewsEvents = [
  {
    Title: 'BMW ra mắt dòng xe điện mới iX',
    Content: 'BMW vừa chính thức ra mắt dòng xe điện hoàn toàn mới BMW iX tại Việt Nam. Đây là mẫu xe SUV điện đầu tiên của BMW với thiết kế hiện đại và công nghệ tiên tiến.',
    PublishDate: new Date('2024-01-15'),
    ImageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'Khuyến mãi đặc biệt tháng 3/2024',
    Content: 'BMW Việt Nam triển khai chương trình khuyến mãi đặc biệt trong tháng 3/2024 với ưu đãi lên đến 200 triệu đồng cho các mẫu xe BMW Series 3 và Series 5.',
    PublishDate: new Date('2024-03-01'),
    ImageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW M3 Competition - Sức mạnh đỉnh cao',
    Content: 'Khám phá BMW M3 Competition - mẫu xe thể thao mới nhất với động cơ 3.0L Twin-Turbo mạnh mẽ và thiết kế M Sport độc đáo.',
    PublishDate: new Date('2024-02-20'),
    ImageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'Dịch vụ bảo hành mở rộng cho xe BMW',
    Content: 'BMW Việt Nam triển khai chương trình bảo hành mở rộng lên đến 5 năm cho tất cả các mẫu xe BMW mới, đảm bảo sự yên tâm cho khách hàng.',
    PublishDate: new Date('2024-01-10'),
    ImageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    Status: 'published'
  }
];

// Migration function
async function migrate() {
  try {
    console.log('🔗 Kết nối đến MongoDB...');
    console.log('📝 MONGO_URI:', process.env.MONGO_URI ? 'Đã cấu hình' : 'CHƯA CẤU HÌNH');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI chưa được cấu hình trong file .env');
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Đã kết nối thành công đến MongoDB');

    // Clear existing data
    console.log('🧹 Xóa dữ liệu cũ...');
    await User.deleteMany({});
    await Role.deleteMany({});
    await RoleUser.deleteMany({});
    await ProductCategory.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Service.deleteMany({});
    await NewsEvent.deleteMany({});
    console.log('✅ Đã xóa dữ liệu cũ');

    // Create roles
    console.log('👥 Tạo vai trò...');
    const createdRoles = await Role.insertMany(sampleRoles);
    const adminRole = createdRoles.find(role => role.Role_Name === 'admin');
    const userRole = createdRoles.find(role => role.Role_Name === 'user');
    console.log('✅ Đã tạo vai trò');

    // Create admin user
    console.log('👤 Tạo tài khoản admin...');
    const adminUser = new User({
      UserName: 'admin',
      Password: 'password123',
      Email: 'admin@bmw.com',
      Phone: '0123456789',
      FullName: 'Administrator',
      Address: 'Hà Nội, Việt Nam',
      Role: 'admin',
      Status: 'active'
    });
    await adminUser.save();

    // Create role-user relationship for admin
    await RoleUser.create({
      UserID: adminUser._id,
      RoleID: adminRole._id,
      Status: 'active'
    });
    console.log('✅ Đã tạo tài khoản admin');

    // Create product categories
    console.log('📂 Tạo danh mục sản phẩm...');
    const createdProductCategories = await ProductCategory.insertMany(sampleProductCategories);
    console.log('✅ Đã tạo danh mục sản phẩm');

    // Create general categories
    console.log('📁 Tạo danh mục chung...');
    const createdCategories = await Category.insertMany(sampleCategories);
    console.log('✅ Đã tạo danh mục chung');

    // Create products with category references
    console.log('🚗 Tạo sản phẩm...');
    const productsWithCategories = sampleProducts.map((product, index) => {
      const categoryIndex = index % createdProductCategories.length;
      return {
        ...product,
        CategoryID: createdProductCategories[categoryIndex]._id
      };
    });
    await Product.insertMany(productsWithCategories);
    console.log('✅ Đã tạo sản phẩm');

    // Create services
    console.log('🔧 Tạo dịch vụ...');
    await Service.insertMany(sampleServices);
    console.log('✅ Đã tạo dịch vụ');

    // Create news events
    console.log('📰 Tạo tin tức...');
    await NewsEvent.insertMany(sampleNewsEvents);
    console.log('✅ Đã tạo tin tức');

    console.log('\n🎉 Migration hoàn thành thành công!');
    console.log('\n📊 Thống kê dữ liệu đã tạo:');
    console.log(`- Vai trò: ${createdRoles.length}`);
    console.log(`- Người dùng admin: 1`);
    console.log(`- Danh mục sản phẩm: ${createdProductCategories.length}`);
    console.log(`- Danh mục chung: ${createdCategories.length}`);
    console.log(`- Sản phẩm: ${sampleProducts.length}`);
    console.log(`- Dịch vụ: ${sampleServices.length}`);
    console.log(`- Tin tức: ${sampleNewsEvents.length}`);

    console.log('\n🔑 Thông tin đăng nhập admin:');
    console.log('Username: admin');
    console.log('Password: password123');
    console.log('Email: admin@bmw.com');

  } catch (error) {
    console.error('❌ Lỗi trong quá trình migration:', error.message);
    if (error.message.includes('MONGO_URI')) {
      console.log('\nHướng dẫn sửa lỗi:');
      console.log('1. Kiểm tra file .env có tồn tại không');
      console.log('2. Đảm bảo MONGO_URI được cấu hình đúng');
      console.log('3. Ví dụ: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('🔌 Đã ngắt kết nối MongoDB');
    }
  }
}

// Run migration
migrate(); 