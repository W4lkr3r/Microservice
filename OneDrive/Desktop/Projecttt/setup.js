const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const services = [
    'api-gateway',
    'auth-service',
    'ticket-service',
    'notification-service'
];

console.log('🚀 Starting "Smart" Project Initialization...');

services.forEach(service => {
    const servicePath = path.join(__dirname, service);

    if (fs.existsSync(servicePath)) {
        console.log(`\n📦 Initializing ${service}...`);
        try {
            // Initialize package.json
            execSync('npm init -y', { cwd: servicePath, stdio: 'inherit' });

            // Install common dependencies (Express, dotenv, nodemon)
            console.log(`   Running: npm install express dotenv (and nodemon as dev)...`);
            execSync('npm install express dotenv', { cwd: servicePath, stdio: 'inherit' });
            execSync('npm install -D nodemon', { cwd: servicePath, stdio: 'inherit' });

            console.log(`✅ ${service} ready!`);
        } catch (error) {
            console.error(`❌ Failed to setup ${service}:`, error.message);
        }
    } else {
        console.warn(`⚠️ Folder ${service} not found!`);
    }
});

console.log('\n✨ All backend services initialized! For the client, we will run "ng new" manually later.');
