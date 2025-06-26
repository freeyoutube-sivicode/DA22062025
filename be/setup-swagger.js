const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Swagger for Test Drive Booking API...\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found! Please run this script from the backend directory.');
  process.exit(1);
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully!\n');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Test Swagger configuration
console.log('🔍 Testing Swagger configuration...');
try {
  const testResult = execSync('node test-swagger.js', { encoding: 'utf8' });
  console.log(testResult);
} catch (error) {
  console.error('❌ Swagger test failed:', error.message);
  console.log('\n🔧 Troubleshooting tips:');
  console.log('1. Make sure you have JSDoc comments in your route files');
  console.log('2. Check that file paths in swagger.js are correct');
  console.log('3. Verify that @swagger annotations are properly formatted');
}

console.log('\n🎯 Next steps:');
console.log('1. Start your server: npm run dev');
console.log('2. Open Swagger UI: http://localhost:3000/api-docs');
console.log('3. Add more JSDoc comments to your routes for complete documentation'); 