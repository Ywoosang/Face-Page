import { ConnectionOptions } from "typeorm";

interface TypeormConfig {
    development: ConnectionOptions;
    production: ConnectionOptions; 
}

export default TypeormConfig;