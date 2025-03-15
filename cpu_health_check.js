const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

function getCpuUsage() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;
    cpus.forEach((cpu) => {
        for (const type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    });
    return 100 - (totalIdle / totalTick) * 100;
}

function monitorCpuUsage() {
    setInterval(() => {
        const cpuUsage = getCpuUsage();
        console.log(`CPU Usage: ${cpuUsage.toFixed(2)}%`);
        if (cpuUsage >= 70) {
            console.log('CPU usage exceeded 70%. Restarting server...');
            // Restarting the server in windows by saving the file
            fs.utimesSync(__filename, new Date(), new Date());    
            console.log('Server Restarting with nodemon');

            // // restarting server with PM2
            // exec('pm2 restart INSUREDMINE_Assessment', (error, stdout, stderr) => {
            //     if (error) {
            //         console.error(`Error restarting server: ${error.message}`);
            //         return;
            //     }
            //     console.log(`Server restarted successfully:\n${stdout}`);
            // });        
        }
    }, (1000*10)); // Check every 5 seconds
}
module.exports = {
    monitorCpuUsage
}