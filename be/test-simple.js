const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

console.log('🔍 Testing Swagger configuration...\n');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
    },
  },
  apis: [
    path.join(__dirname, 'routes/*.js'),
    path.join(__dirname, 'controllers/*.js'),
    path.join(__dirname, 'models/*.js'),
    path.join(__dirname, 'docs/*.js')
  ]
};

try {
  const specs = swaggerJsdoc(options);
  const paths = Object.keys(specs.paths || {});
  
  console.log('✅ Swagger configuration loaded successfully!');
  console.log(`📊 Found ${paths.length} API endpoints`);
  
  if (paths.length > 0) {
    console.log('\n📋 Available endpoints:');
    paths.forEach(path => {
      console.log(`  - ${path}`);
    });
  } else {
    console.log('\n⚠️  No endpoints found. Possible issues:');
    console.log('  1. No JSDoc comments in route files');
    console.log('  2. Incorrect file paths');
    console.log('  3. Wrong @swagger annotation format');
  }
  
  console.log('\n🎯 Next steps:');
  console.log('1. Start server: npm run dev');
  console.log('2. Open: http://localhost:3000/api-docs');
  
} catch (error) {
  console.error('❌ Error loading Swagger configuration:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Run: npm install');
  console.log('2. Check file paths in config/swagger.js');
  console.log('3. Verify JSDoc comments in route files');
} 