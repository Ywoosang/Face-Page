import * as path from 'path';
import * as dotenv from 'dotenv'

const { NODE_ENV } = process.env;
const envPath =  NODE_ENV === 'development' ? '.env.development' : '.env'

dotenv.config({
    path: path.resolve(process.cwd(),envPath)
});