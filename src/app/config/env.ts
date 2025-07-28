import dotenv from 'dotenv';
dotenv.config();

interface EnvConfig {
    PORT: string,
    NODE_ENV: string,
    SALT_ROUND: string,
    MONGODB_URI: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ['PORT', 'NODE_ENV', 'SALT_ROUND', 'MONGODB_URI']

    requiredEnvVariables.forEach(key => {
        if(!process.env[key]){
            throw new Error(`Missing required environment variable ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        SALT_ROUND: process.env.SALT_ROUND as string,
        MONGODB_URI: process.env.MONGODB_URI as string,
    }
}

export const enVars = loadEnvVariables()