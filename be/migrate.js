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
const OrderTestDrive = require('./models/OrderTestDrive');

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

// Sample users data
const sampleUsers = [
  {
    UserName: 'user1',
    Password: 'password123',
    Email: 'user1@example.com',
    Phone: '0123456781',
    FullName: 'Nguyễn Văn An',
    Address: 'Hà Nội, Việt Nam',
    Role: 'user',
    Status: 'active'
  },
  {
    UserName: 'user2',
    Password: 'password123',
    Email: 'user2@example.com',
    Phone: '0123456782',
    FullName: 'Trần Thị Bình',
    Address: 'TP.HCM, Việt Nam',
    Role: 'user',
    Status: 'active'
  },
  {
    UserName: 'user3',
    Password: 'password123',
    Email: 'user3@example.com',
    Phone: '0123456783',
    FullName: 'Lê Văn Cường',
    Address: 'Đà Nẵng, Việt Nam',
    Role: 'user',
    Status: 'active'
  },
  {
    UserName: 'user4',
    Password: 'password123',
    Email: 'user4@example.com',
    Phone: '0123456784',
    FullName: 'Phạm Thị Dung',
    Address: 'Hải Phòng, Việt Nam',
    Role: 'user',
    Status: 'active'
  },
  {
    UserName: 'user5',
    Password: 'password123',
    Email: 'user5@example.com',
    Phone: '0123456785',
    FullName: 'Hoàng Văn Em',
    Address: 'Cần Thơ, Việt Nam',
    Role: 'user',
    Status: 'active'
  },
  {
    UserName: 'user6',
    Password: 'password123',
    Email: 'user6@example.com',
    Phone: '0123456786',
    FullName: 'Vũ Thị Phương',
    Address: 'Nha Trang, Việt Nam',
    Role: 'user',
    Status: 'active'
  },
  {
    UserName: 'user7',
    Password: 'password123',
    Email: 'user7@example.com',
    Phone: '0123456787',
    FullName: 'Đỗ Văn Giang',
    Address: 'Huế, Việt Nam',
    Role: 'user',
    Status: 'active'
  },
  {
    UserName: 'user8',
    Password: 'password123',
    Email: 'user8@example.com',
    Phone: '0123456788',
    FullName: 'Ngô Thị Hoa',
    Address: 'Vũng Tàu, Việt Nam',
    Role: 'user',
    Status: 'active'
  },
  {
    UserName: 'user9',
    Password: 'password123',
    Email: 'user9@example.com',
    Phone: '0123456789',
    FullName: 'Lý Văn Inh',
    Address: 'Bình Dương, Việt Nam',
    Role: 'user',
    Status: 'active'
  },
  {
    UserName: 'user10',
    Password: 'password123',
    Email: 'user10@example.com',
    Phone: '0123456790',
    FullName: 'Bùi Thị Kim',
    Address: 'Đồng Nai, Việt Nam',
    Role: 'user',
    Status: 'active'
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
  const now = new Date();

  for (let i = 0; i < 100; i++) {
    const model = bmwModels[i % bmwModels.length];
    const variant = variants[i % variants.length];
    const variantIndex = Math.floor(i / bmwModels.length);
    const adjustedVariant = variantIndex > 0 ? `${variant} ${variantIndex + 1}` : variant;
    const basePrice = model.basePrice;
    const priceVariation = Math.random() * 0.2 - 0.1;
    const finalPrice = Math.round(basePrice * (1 + priceVariation));
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
    // Random ngày bắt đầu/kết thúc chạy thử
    const startOffset = Math.floor(Math.random() * 10); // 0-9 ngày trước
    const endOffset = Math.floor(Math.random() * 35) + 5; // 5-39 ngày sau start
    const TestDriveStartDate = new Date(now.getTime() - startOffset * 24 * 60 * 60 * 1000);
    const TestDriveEndDate = new Date(TestDriveStartDate.getTime() + endOffset * 24 * 60 * 60 * 1000);
    // Status: active nếu còn hạn, expired nếu đã hết hạn
    const today = new Date();
    let Status = 'active';
    if (TestDriveEndDate < today) Status = 'expired';

    // Tạo mô tả chi tiết cho từng xe
    let detailedDescription = '';
    
    if (model.series === 'Series 1') {
      detailedDescription = `${model.name} ${adjustedVariant} là mẫu xe hatchback cao cấp thuộc dòng BMW Series 1, được thiết kế với tinh thần thể thao và năng động. Với động cơ ${model.engine} mạnh mẽ, xe sở hữu công suất ${model.power} và mô-men xoắn ${model.torque}, cho phép tăng tốc từ 0-100km/h chỉ trong ${model.acceleration} giây. Thiết kế ${adjustedVariant.toLowerCase()} mang đến vẻ ngoài thể thao với các chi tiết M Sport độc đáo, bao gồm lưới tản nhiệt đặc trưng, đèn pha LED Adaptive, và bánh xe hợp kim 18 inch. Nội thất được trang bị màn hình cảm ứng 10.25 inch, hệ thống âm thanh Harman Kardon, và ghế thể thao với đệm chỉnh điện. Hệ thống an toàn bao gồm cảnh báo điểm mù, hỗ trợ giữ làn đường, và phanh tự động khẩn cấp. Đây là lựa chọn hoàn hảo cho những người yêu thích sự năng động và hiệu suất cao trong một chiếc xe nhỏ gọn.`;
    } else if (model.series === 'Series 3') {
      detailedDescription = `${model.name} ${adjustedVariant} đại diện cho sự hoàn hảo của dòng sedan thể thao BMW Series 3. Được trang bị động cơ ${model.engine} tiên tiến, xe phát triển công suất ${model.power} và mô-men xoắn ${model.torque} ấn tượng. Khả năng tăng tốc từ 0-100km/h chỉ trong ${model.acceleration} giây và tốc độ tối đa ${model.topSpeed} km/h thể hiện rõ bản chất thể thao của chiếc xe. Thiết kế ${adjustedVariant.toLowerCase()} kết hợp hoàn hảo giữa sự thanh lịch và năng động, với đường nét chảy mượt, đèn pha LED Matrix, và bánh xe hợp kim 19 inch. Nội thất sang trọng với da Nappa cao cấp, màn hình cảm ứng 12.3 inch, và hệ thống âm thanh surround 16 loa. Công nghệ iDrive 7.0 với điều khiển cử chỉ và trợ lý ảo BMW Intelligent Personal Assistant. Hệ thống an toàn toàn diện bao gồm Driving Assistant Professional, Parking Assistant Plus, và Reversing Assistant. Đây là sự lựa chọn lý tưởng cho những người đam mê lái xe và đánh giá cao sự kết hợp giữa hiệu suất và tiện nghi.`;
    } else if (model.series === 'Series 5') {
      detailedDescription = `${model.name} ${adjustedVariant} là hiện thân của sự sang trọng và hiệu suất trong phân khúc sedan hạng sang. Động cơ ${model.engine} mạnh mẽ cung cấp công suất ${model.power} và mô-men xoắn ${model.torque}, cho phép tăng tốc từ 0-100km/h trong ${model.acceleration} giây và đạt tốc độ tối đa ${model.topSpeed} km/h. Thiết kế ${adjustedVariant.toLowerCase()} thể hiện sự tinh tế với đường nét chảy mượt, đèn pha Laserlight công nghệ cao, và bánh xe hợp kim 20 inch. Nội thất được chế tác thủ công với vật liệu cao cấp, ghế massage chỉnh điện, và hệ thống âm thanh Bowers & Wilkins Diamond Surround. Màn hình cảm ứng 12.3 inch với iDrive 7.0 và trợ lý ảo thông minh. Hệ thống an toàn tiên tiến bao gồm Driving Assistant Professional, Parking Assistant Plus, và Reversing Assistant. Tính năng đặc biệt như Gesture Control, Wireless Charging, và Ambient Lighting tạo nên trải nghiệm lái xe đẳng cấp. Đây là chiếc xe hoàn hảo cho những người thành đạt, kết hợp giữa sự sang trọng, hiệu suất và công nghệ tiên tiến.`;
    } else if (model.series === 'Series 7') {
      detailedDescription = `${model.name} ${adjustedVariant} là đỉnh cao của công nghệ và sang trọng trong dòng xe flagship của BMW. Động cơ ${model.engine} mạnh mẽ phát triển công suất ${model.power} và mô-men xoắn ${model.torque}, đưa xe từ 0-100km/h chỉ trong ${model.acceleration} giây và đạt tốc độ tối đa ${model.topSpeed} km/h. Thiết kế ${adjustedVariant.toLowerCase()} thể hiện sự uy nghi với kích thước lớn, đèn pha Laserlight công nghệ cao, và bánh xe hợp kim 21 inch. Nội thất được chế tác thủ công với vật liệu cao cấp nhất, ghế massage chỉnh điện với chức năng thở, và hệ thống âm thanh Bowers & Wilkins Diamond Surround 3D. Màn hình cảm ứng 12.3 inch với iDrive 7.0 và trợ lý ảo thông minh. Tính năng đặc biệt bao gồm Gesture Control, Wireless Charging, Ambient Lighting, và Sky Lounge Panorama. Hệ thống an toàn toàn diện với Driving Assistant Professional, Parking Assistant Plus, và Reversing Assistant. Đây là chiếc xe dành cho những người đứng đầu, kết hợp hoàn hảo giữa sự sang trọng đẳng cấp, hiệu suất mạnh mẽ và công nghệ tiên tiến nhất.`;
    } else if (model.series === 'X Series') {
      detailedDescription = `${model.name} ${adjustedVariant} là mẫu SUV/SAV đa dụng thuộc dòng BMW X Series, kết hợp hoàn hảo giữa khả năng vượt địa hình và sự thoải mái của xe hạng sang. Động cơ ${model.engine} mạnh mẽ cung cấp công suất ${model.power} và mô-men xoắn ${model.torque}, cho phép tăng tốc từ 0-100km/h trong ${model.acceleration} giây và đạt tốc độ tối đa ${model.topSpeed} km/h. Thiết kế ${adjustedVariant.toLowerCase()} thể hiện sự mạnh mẽ với đường nét góc cạnh, đèn pha LED Adaptive, và bánh xe hợp kim 19-21 inch tùy phiên bản. Hệ thống xDrive thông minh đảm bảo khả năng vượt địa hình xuất sắc. Nội thất rộng rãi với ghế chỉnh điện, màn hình cảm ứng 12.3 inch, và hệ thống âm thanh Harman Kardon. Tính năng đặc biệt bao gồm Panorama Glass Roof, Hands-free Tailgate, và Wireless Charging. Hệ thống an toàn toàn diện với Driving Assistant Professional, Parking Assistant Plus, và Reversing Assistant. Đây là lựa chọn hoàn hảo cho những gia đình hiện đại, kết hợp giữa sự thoải mái, an toàn và khả năng đa dụng.`;
    } else if (model.series === 'M Series') {
      detailedDescription = `${model.name} ${adjustedVariant} là hiện thân của sức mạnh và hiệu suất đỉnh cao trong dòng xe thể thao BMW M. Động cơ ${model.engine} mạnh mẽ phát triển công suất ${model.power} và mô-men xoắn ${model.torque} ấn tượng, đưa xe từ 0-100km/h chỉ trong ${model.acceleration} giây và đạt tốc độ tối đa ${model.topSpeed} km/h. Thiết kế ${adjustedVariant.toLowerCase()} thể hiện bản chất thể thao với các chi tiết M Sport độc đáo, đèn pha LED Adaptive, và bánh xe hợp kim M 20-21 inch. Hệ thống treo M Adaptive với chế độ chỉnh Sport, Sport+, và Track. Nội thất thể thao với ghế M Sport chỉnh điện, vô lăng M với nút M1/M2, và màn hình cảm ứng 12.3 inch. Hệ thống âm thanh Harman Kardon Surround và trợ lý ảo BMW Intelligent Personal Assistant. Tính năng đặc biệt bao gồm M xDrive, M Differential, và Launch Control. Hệ thống an toàn tiên tiến với Driving Assistant Professional và Parking Assistant Plus. Đây là chiếc xe dành cho những người đam mê tốc độ và hiệu suất, kết hợp hoàn hảo giữa sức mạnh mạnh mẽ và công nghệ tiên tiến.`;
    } else if (model.series === 'i Series') {
      detailedDescription = `${model.name} ${adjustedVariant} đại diện cho tương lai của ngành công nghiệp ô tô với công nghệ điện tiên tiến. ${model.engine} mạnh mẽ cung cấp công suất ${model.power} và mô-men xoắn ${model.torque} ngay lập tức, cho phép tăng tốc từ 0-100km/h chỉ trong ${model.acceleration} giây và đạt tốc độ tối đa ${model.topSpeed} km/h. Quãng đường di chuyển lên đến ${model.range} km với một lần sạc. Thiết kế ${adjustedVariant.toLowerCase()} thể hiện sự hiện đại với đường nét tương lai, đèn pha LED Matrix, và bánh xe hợp kim 19-21 inch. Nội thất được thiết kế với vật liệu bền vững, ghế chỉnh điện, và màn hình cảm ứng 14.9 inch với iDrive 8.0. Hệ thống âm thanh Harman Kardon Surround và trợ lý ảo BMW Intelligent Personal Assistant. Tính năng đặc biệt bao gồm Wireless Charging, Gesture Control, và Ambient Lighting. Hệ thống an toàn toàn diện với Driving Assistant Professional và Parking Assistant Plus. Đây là chiếc xe của tương lai, kết hợp hoàn hảo giữa hiệu suất cao, thân thiện môi trường và công nghệ tiên tiến nhất.`;
    } else {
      // Fallback cho các series khác
      detailedDescription = `${model.name} ${adjustedVariant} là mẫu xe cao cấp thuộc dòng BMW ${model.series}, được thiết kế với tinh thần thể thao và sang trọng. Động cơ ${model.engine} mạnh mẽ cung cấp công suất ${model.power} và mô-men xoắn ${model.torque}, cho phép tăng tốc từ 0-100km/h chỉ trong ${model.acceleration} giây và đạt tốc độ tối đa ${model.topSpeed} km/h. Thiết kế ${adjustedVariant.toLowerCase()} kết hợp hoàn hảo giữa sự thanh lịch và năng động, với các chi tiết thiết kế độc đáo, đèn pha LED công nghệ cao, và bánh xe hợp kim cao cấp. Nội thất sang trọng với vật liệu cao cấp, ghế chỉnh điện, và hệ thống âm thanh chất lượng cao. Màn hình cảm ứng với iDrive và trợ lý ảo thông minh. Hệ thống an toàn toàn diện với các tính năng tiên tiến. Đây là sự lựa chọn hoàn hảo cho những người đánh giá cao sự kết hợp giữa hiệu suất, sang trọng và công nghệ tiên tiến.`;
    }

    products.push({
      Product_Name: `${model.name} ${adjustedVariant}`,
      CategoryID: null,
      Description: detailedDescription,
      Price: finalPrice,
      Main_Image: mainImage,
      List_Image: listImages,
      Specifications: specifications,
      TestDriveStartDate,
      TestDriveEndDate,
      Status
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
  },
  {
    Title: 'BMW tổ chức giải đua xe thể thao tại Hà Nội',
    Content: 'Sự kiện đua xe thể thao BMW lần đầu tiên được tổ chức tại Hà Nội, quy tụ nhiều tay đua nổi tiếng và các mẫu xe hiệu suất cao.',
    PublishDate: new Date('2024-04-05'),
    ImageUrl: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW hợp tác cùng VinFast phát triển xe điện',
    Content: 'BMW và VinFast ký kết hợp tác chiến lược phát triển các dòng xe điện thông minh tại thị trường Việt Nam.',
    PublishDate: new Date('2024-04-12'),
    ImageUrl: 'https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW ra mắt công nghệ tự lái thế hệ mới',
    Content: 'BMW giới thiệu công nghệ tự lái cấp độ 3, giúp xe vận hành an toàn và thông minh hơn trên mọi cung đường.',
    PublishDate: new Date('2024-05-01'),
    ImageUrl: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW nhận giải thưởng thiết kế quốc tế',
    Content: 'BMW được vinh danh tại giải thưởng Red Dot Award 2024 với thiết kế đột phá của dòng xe BMW 7 Series.',
    PublishDate: new Date('2024-05-10'),
    ImageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW triển khai dịch vụ bảo dưỡng lưu động',
    Content: 'Khách hàng BMW có thể đặt lịch bảo dưỡng tận nơi với dịch vụ lưu động mới, tiện lợi và nhanh chóng.',
    PublishDate: new Date('2024-05-15'),
    ImageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW tổ chức hội thảo công nghệ xanh',
    Content: 'Hội thảo về công nghệ xanh và phát triển bền vững trong ngành ô tô do BMW tổ chức tại TP.HCM.',
    PublishDate: new Date('2024-06-01'),
    ImageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW ra mắt showroom mới tại Đà Nẵng',
    Content: 'Showroom BMW mới với không gian hiện đại, trưng bày đầy đủ các dòng xe mới nhất vừa khai trương tại Đà Nẵng.',
    PublishDate: new Date('2024-06-10'),
    ImageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW tài trợ giải golf doanh nhân 2024',
    Content: 'BMW là nhà tài trợ chính cho giải golf doanh nhân toàn quốc, thúc đẩy phong trào thể thao và kết nối doanh nghiệp.',
    PublishDate: new Date('2024-06-15'),
    ImageUrl: 'https://images.unsplash.com/photo-1468421870903-4df1664ac249?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW công bố chương trình lái thử xe toàn quốc',
    Content: 'Khách hàng có thể đăng ký lái thử các mẫu xe BMW mới nhất tại hơn 20 đại lý trên toàn quốc.',
    PublishDate: new Date('2024-07-01'),
    ImageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW ra mắt ứng dụng chăm sóc khách hàng',
    Content: 'Ứng dụng BMW Care giúp khách hàng quản lý lịch bảo dưỡng, đặt lịch hẹn và nhận ưu đãi trực tiếp trên điện thoại.',
    PublishDate: new Date('2024-07-10'),
    ImageUrl: 'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW đồng hành cùng chiến dịch bảo vệ môi trường',
    Content: 'BMW phát động chiến dịch trồng 10.000 cây xanh tại các thành phố lớn nhằm bảo vệ môi trường sống.',
    PublishDate: new Date('2024-07-20'),
    ImageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW giới thiệu dịch vụ tài chính linh hoạt',
    Content: 'Khách hàng BMW có thể lựa chọn nhiều gói tài chính linh hoạt, lãi suất ưu đãi khi mua xe mới.',
    PublishDate: new Date('2024-08-01'),
    ImageUrl: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW tổ chức ngày hội gia đình 2024',
    Content: 'Ngày hội gia đình BMW với nhiều hoạt động vui chơi, giải trí và lái thử xe dành cho khách hàng và người thân.',
    PublishDate: new Date('2024-08-10'),
    ImageUrl: 'https://images.unsplash.com/photo-1466027018945-1834b6cc8c8a?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW khai trương trung tâm dịch vụ mới tại Cần Thơ',
    Content: 'Trung tâm dịch vụ BMW tại Cần Thơ cung cấp đầy đủ các dịch vụ bảo dưỡng, sửa chữa và phụ tùng chính hãng.',
    PublishDate: new Date('2024-08-20'),
    ImageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW ra mắt phiên bản giới hạn BMW X5',
    Content: 'BMW X5 phiên bản giới hạn với màu sơn độc quyền và trang bị cao cấp vừa được giới thiệu tại Việt Nam.',
    PublishDate: new Date('2024-09-01'),
    ImageUrl: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?w=800&h=600&fit=crop',
    Status: 'published'
  },
  {
    Title: 'BMW tổ chức workshop chăm sóc xe miễn phí',
    Content: 'Khách hàng BMW được tham gia workshop chăm sóc xe miễn phí với các chuyên gia kỹ thuật hàng đầu.',
    PublishDate: new Date('2024-09-10'),
    ImageUrl: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?w=800&h=600&fit=crop',
    Status: 'published'
  }
];

// Function to generate sample test drive orders
function generateSampleTestDriveOrders(users, products) {
  const orders = [];
  const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
  const addresses = [
    '123 Nguyễn Huệ, Quận 1, TP.HCM',
    '456 Lê Lợi, Quận 3, TP.HCM',
    '789 Trần Hưng Đạo, Quận 5, TP.HCM',
    '321 Võ Văn Tần, Quận 3, TP.HCM',
    '654 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM',
    '987 Cách Mạng Tháng 8, Quận 10, TP.HCM',
    '147 Nguyễn Thị Minh Khai, Quận 1, TP.HCM',
    '258 Lý Tự Trọng, Quận 1, TP.HCM',
    '369 Hai Bà Trưng, Quận 1, TP.HCM',
    '741 Đồng Khởi, Quận 1, TP.HCM'
  ];
  const now = new Date();

  // Tổng số đơn tối đa cho toàn bộ sản phẩm
  let totalOrders = 0;
  const maxTotalOrders = 200;

  // Sinh số lượng đơn cho từng xe: phân phối ngẫu nhiên, có xe nhiều, có xe ít
  const productOrderCounts = products.map((_, idx) => {
    // Tăng xác suất xe đầu danh sách nhiều đơn, xe cuối ít đơn
    let base = Math.floor(Math.random() * 10) + 2; // 2-11
    if (idx % 7 === 0) base += Math.floor(Math.random() * 8); // Một số xe nổi bật
    if (idx % 13 === 0) base += Math.floor(Math.random() * 5); // Một số xe rất nổi bật
    return Math.min(base, 20);
  });

  products.forEach((product, idx) => {
    let numOrders = productOrderCounts[idx];
    if (totalOrders + numOrders > maxTotalOrders) numOrders = maxTotalOrders - totalOrders;
    if (numOrders < 2) numOrders = 2;
    for (let i = 0; i < numOrders; i++) {
      if (totalOrders >= maxTotalOrders) break;
      const user = users[(idx * 7 + i) % users.length];
      const status = statuses[(idx + i) % statuses.length];
      const address = addresses[(idx + i) % addresses.length];
      // Random date within last 30 days
      const daysAgo = Math.floor(Math.random() * 30);
      const orderDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      // Random test drive date (future date)
      const testDriveDays = Math.floor(Math.random() * 14) + 1;
      const testDriveDate = new Date(now.getTime() + testDriveDays * 24 * 60 * 60 * 1000);
      // Random amount based on product price
      const baseAmount = product.Price || 2000000000;
      const amountVariation = Math.random() * 0.3 - 0.15;
      const finalAmount = Math.round(baseAmount * (1 + amountVariation));
      // Random ngày tạo đơn (trong 30 ngày gần nhất)
      const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      orders.push({
        UserID: user._id,
        ProductID: product._id,
        Order_Date: orderDate,
        Test_Drive_Date: testDriveDate,
        Address: address,
        Status: status,
        Total_Amount: finalAmount,
        Notes: `Đơn lái thử ${product.Product_Name} cho ${user.FullName}`,
        ImageUrl: product.Main_Image || null,
        createdAt
      });
      totalOrders++;
    }
  });
  return orders;
}

// Migration function
async function migrate() {
  try {
    
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI chưa được cấu hình trong file .env');
    }
    
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await User.deleteMany({});
    await Role.deleteMany({});
    await RoleUser.deleteMany({});
    await ProductCategory.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Service.deleteMany({});
    await NewsEvent.deleteMany({});
    await OrderTestDrive.deleteMany({});

    // Create roles
    const createdRoles = await Role.insertMany(sampleRoles);
    const adminRole = createdRoles.find(role => role.Role_Name === 'admin');
    const userRole = createdRoles.find(role => role.Role_Name === 'user');

    // Create admin user
    const adminUser = new User({
      UserName: 'admin',
      Password: 'admin123',
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

    // Create product categories
    const createdProductCategories = await ProductCategory.insertMany(sampleProductCategories);

    // Create general categories
    const createdCategories = await Category.insertMany(sampleCategories);

    // Create products with category references
    const productsWithCategories = sampleProducts.map((product, index) => {
      const categoryIndex = index % createdProductCategories.length;
      return {
        ...product,
        CategoryID: createdProductCategories[categoryIndex]._id
      };
    });
    await Product.insertMany(productsWithCategories);

    // Lấy lại danh sách sản phẩm từ DB (có _id thực tế)
    const dbProducts = await Product.find({});

    // Create services
    await Service.insertMany(sampleServices);

    // Create news events
    await NewsEvent.insertMany(sampleNewsEvents);

    // Create users
    const createdUsers = await User.insertMany(sampleUsers);

    // Create test drive orders
    const testDriveOrders = generateSampleTestDriveOrders(createdUsers, dbProducts);
    await OrderTestDrive.insertMany(testDriveOrders);



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
    }
  }
}

// Run migration
migrate(); 