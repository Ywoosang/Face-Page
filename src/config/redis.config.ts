import * as redis from 'redis'
import '../env';

let client;
if(process.env.NODE_ENV !== 'test'){
    const redisConfig = {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || 'redisdb',
    } as any;
    
    client = redis.createClient(redisConfig);
    
    client.on('error', err => {
      console.log(err)
    });
    
    client.on("ready", () => {
        console.log("REDIS CONNECTED");
    });
} 

export default client;