const fs = require('fs');
const { spawn } = require('child_process');

if (fs.existsSync('.next')) {
  console.log('Starting Next.js production server...');
  const proc = spawn('next', ['start'], { stdio: 'inherit', shell: true });
  proc.on('exit', (code) => process.exit(code || 0));
} else {
  console.log('Build not found. EdgeOne Pages will serve static files directly.');
  process.exit(0);
}
