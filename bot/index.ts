import * as https from "https";
import { IncomingMessage } from "http";
import Docker from "dockerode";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_ID || '';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || '';
const GITHUB_REPO = process.env.GITHUB_REPO || '';

const CONTAINER_NAMES = [
    'university_server-front-1',
    'university_server-backend-1',
];

const container_status: Record<string, string> = {};
const docker = new Docker();

function sendMessage(chatId: string, message: string): void {
    const url = `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const postData = new URLSearchParams({
        chat_id: chatId,
        text: message,
    }).toString();

    const options: https.RequestOptions = {
        hostname: "api.telegram.org",
        port: 443,
        path: url,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": Buffer.byteLength(postData),
        },
    }

    const req = https.request(options, (res: IncomingMessage) => {
        let data = "";

        res.on('data', (chunk: Buffer) => {
            data += chunk.toString();
        });

        res.on('end', () => {
            if(res.statusCode === 200) {
                console.log("Message sent successfully");
            } else {
                console.error("Failed to send message");
            }
        });
    });

    req.on('error', (error) => {
        console.error(`Error while sending message: ${error.message}`); 
    });

    req.write(postData);
    req.end();
}

async function checkContainerStatus(): Promise<void> {
    for(const name of CONTAINER_NAMES){
        try{
            const container = docker.getContainer(name);
            const data = await container.inspect();
            const status = data.State.Status;
            const previousStatus = container_status[name];

            if(previousStatus && previousStatus !== status){
                sendMessage(
                    TELEGRAM_CHAT_ID,
                    `Container ${name} status changed from ${previousStatus} to ${status}`
                );
            }

            container_status[name] = status;
    
        } catch(error: any) {
            console.error(`Error while checking container status ${name}: ${error.message}`);
        }
    }
}

async function handleCommand(command: string): Promise<void> {
    if(command === '/status'){
        const statusMessages: string[] = [];
        for(const name of CONTAINER_NAMES){
            try{
                const container = docker.getContainer(name);
                const data = await container.inspect();
                const status = data.State.Status;
                statusMessages.push(`🟢 Container ${name} is ${status}`);
            } catch(error: any) {
                console.error(`🔴 Error while checking container status ${name}: ${error.message}`);
                statusMessages.push(`🔴 Container ${name}: Error while checking status`);
            }
        }

        sendMessage(TELEGRAM_CHAT_ID, statusMessages.join('\n'));
    } else if (command === '/changes') {
        const commitMessages = await getLatestCommits();
        sendMessage(TELEGRAM_CHAT_ID, commitMessages);
    } else if (command === '/help') {
        `
            Доступные команды:
            /status - Получить статус контейнеров
            /changes - Получить последние изменения из GitHub
            /start <container_name> - Запустить указанный контейнер
            /stop <container_name> - Остановить указанный контейнер
            /restart <container_name> - Перезапустить указанный контейнер
            /logs <container_name> - Получить последние логи контейнера
            /help - Показать это сообщение
        `;
    } else {
        sendMessage(TELEGRAM_CHAT_ID, `Unknown command: ${command}`);
    }
}

async function getLatestCommits(): Promise<string> {
    if(!GITHUB_USERNAME || !GITHUB_REPO){
        return 'Github username or repository not provided';
    }

    try{
        const response = await axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/commits`);
        const commits = (response.data as { commit: { message: string, author: { name: string } } }[]).slice(0, 5);
        let commitMessages = 'Latest commits:\n';

        for(const commit of commits){
            commitMessages += `- ${commit.commit.message} (Author: ${commit.commit.author.name})\n`;
        }

        return commitMessages
    } catch(error: any) {
        console.error(`Error while fetching commits: ${error.message}`);
        return 'Error while fetching commits';
    }
}

function pollUpdates(): void {
    const url = `/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
    let lastUpdateId: number | undefined;

    async function fetchUpdates(): Promise<void> {
        await checkContainerStatus();

        const path = `${url}${lastUpdateId ? `?offset=${lastUpdateId + 1}` : ''}`;
        const options: https.RequestOptions = {
            hostname: "api.telegram.org",
            port: 443,
            path: path,
            method: "GET",
        };

        const req = https.request(options, (res: IncomingMessage) => {
            let data = "";

            res.on('data', (chunk: Buffer) => {
                data += chunk.toString();
            });

            res.on('end', async () => {
                console.log("Raw data from Telegram:", data); 
                try {
                    const parsedData = JSON.parse(data);
            
                    if (!parsedData.ok) {
                        console.error(`Telegram API returned error: ${parsedData.description || 'Unknown error'}`);
                        setTimeout(fetchUpdates, 1000);
                        return;
                    }
            
                    const updates = parsedData.result;
                    if (!Array.isArray(updates)) {
                        console.error(`"result" is not an array. Full response: ${JSON.stringify(parsedData)}`);
                        setTimeout(fetchUpdates, 1000);
                        return;
                    }

                    if(updates.length === 0){
                        console.log("No new updates");
                    } else {
                        for(const update of updates) {
                            const message = update.message;
                            if (message && message.text) {
                                console.log(`Received command: ${message.text}`);
                                await handleCommand(message.text);
                                lastUpdateId = update.update_id;
                            }
                        }
                    }
            
                } catch(error: any) {
                    console.error(`Error while parsing updates: ${error.message}`);
                } finally {
                    setTimeout(fetchUpdates, 1000);
                }
            });                        
        });

        req.on('error', (error) => {
            console.error(`Error while fetching updates: ${error.message}`);
            setTimeout(fetchUpdates, 1000);
        })

        req.end();
    }
    
    fetchUpdates();
}

pollUpdates();