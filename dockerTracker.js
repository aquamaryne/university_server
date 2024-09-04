const https = require('https');
const { exec } = require('child_process');

const token = "7067024383:AAFT0KE-h5qcMNMl__XsGynkg-ots0enlHc";
const id = "384450703";
const containerName = ["university_server-front-1", "university_server-backend-1", "university_server-mysql-1"];

function sendMessage(id, message){
    const url = `/bot/${token}/sendMessage?chat_id=${id}&text=${encodeURIComponent(message)}`;
    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: url,
        method: 'GET',
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if(res.statusCode === 200){
                console.log("Message sent!");
            } else {
                console.error(`Error sending message: ${data}`);
            }
        });
    });

    req.on('error', (error) => {
        console.log(`Error while sending message: ${error.message}`);
    });

    req.end();
}

function getContainerStatus(name, callback){
    exec(`docker ps -a`, (error, stdout, stderr) => {
        if(error){
            console.error(`Error fetching container status: ${stderr}`);
            callback(`Error fetching container status: ${stderr}`);
            return;
        }

        const lines = stdout.trim().split('\n');
        const header = lines[0];
        const containers = lines.slice(1);

        const containerInfo = containers.find(line => line.includes(name));
        if(!containerInfo){
            callback(`Container with ${name} not found.`);
            return;
        }

        const parts = containerInfo.split(/\s{2,}/);
        const status = parts[4];

        callback(`Container ${name} is in status: ${status}`);
    });
}

function handleCommand(command){
    if(command === '/status'){
        let statusMessages = [];
        let completed = 0;

        containerName.forEach((name) => {
            getContainerStatus(name, (statusMessage) => {
                statusMessages.push(statusMessage);
                completed++;

                if(completed === containerName.length){
                    sendMessage(id, statusMessages.join('\n'));
                }
            })
        })
    }
}

function pollUpdates(){
    const url = `/bot${token}/getUpdates`;
    let lastUpdateId;

    function fetchUpdates(){
        const path = url + (lastUpdateId ? `?offset=${lastUpdateId + 1}` : '');
        const options = {
            hostname: 'api.telegram.org',
            port: 443,
            path: url,
            method: 'GET',
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const updates = JSON.parse(data).result;

                updates.forEach((update) => {
                    const message = update.message;
                    if(message && message.text){
                        console.log(`Received command: ${message.text}`);
                        handleCommand(message.text);
                        lastUpdateId = update.update_id;
                    }
                });

                setTimeout(fetchUpdates, 10000);
            });
        });

        req.on('error', (error) => {
            console.error(`Error while fetching updates: ${error.message}`);
        })

        req.end();
    }

    fetchUpdates();
}

pollUpdates();




