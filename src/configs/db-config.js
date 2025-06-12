import 'dotenv/config';

const config = {
    host        : process.env.POSTGRES_HOST || "localhost",
    database    : process.env.POSTGRES_DATABASE || "postgres",
    user        : process.env.POSTGRES_USER || "root",
    password    : process.env.POSTGRES_PASSWORD || "root",
    port        : parseInt(process.env.POSTGRES_PORT) || 5432
}

export default config;