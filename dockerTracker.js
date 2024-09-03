const axios = require('axios');
const Docker = require('dockerode');

const docker = new Docker({ socketPath: '' });
const token = "7067024383:AAFT0KE-h5qcMNMl__XsGynkg-ots0enlHc";
const id = "384450703";
const name = "";

async function sendMessage(id, message){
    const url = `https://api/telegram.org/bot${token}/sendMessage`;
    const payload = {
        chat_id: id,
        text: message,
    };

    try{
        const responce = await axios.post(url, payload);
        if(responce.status === 200){
            console.log("Message send!");
        } else {
            console.error(`Error send message: ${responce.data}`);
        }
    } catch(error){
        console.error(`Error while send message: ${error}`)
    }
}

async function getContainerStatus(name){
    try{
        const conteiners = await docker.listContainers({ all: true, limit: 10 });
        const containerInfo = conteiners.find((c) => c.Names.includes(`${name}`));

        if(!containerInfo){
            return `Container with this name ${name} not found.`;
        }

        const containerState = containerInfo.State;
        return `Container ${name} in status: ${containerState}`;
    } catch(error){
        console.error(`Error while fetch container status: ${error}`);
        return `Error while fetch container status: ${error.message}`;
    }
}

async function handleCommand(command){
    if(command === '/status'){
        const statusMessage = await getContainerStatus(name);
        await sendMessage(id, statusMessage);
    }
}

async function pollUpdates(){
    const url = `https://api/telegram.org/bot${token}/getUpdates`;
    let lastUpdateId;

    try{
        while(true){
            const responce = await axios.get(url, {
                params: {
                    offset: lastUpdateId ? lastUpdateId + 1 : undefined,
                }
            });

            const updates = responce.data.result;
            for(const update of updates){
                const message = update.message;
                if(message && message.text){
                    console.log(`Get command: ${message.text}`);
                    await handleCommand(message.text);
                    lastUpdateId = update.update_id;
                }
            }

            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    } catch(error){
        console.error(`Error while fetch updates Telegram: ${error}`);
    }
}

pollUpdates();