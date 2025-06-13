let config;

if (process.env.POSTGRES_STRING === undefined) {
    config = {
        host        : process.env.POSTGRES_HOST || "localhost",
        database    : process.env.POSTGRES_DATABASE || "postgres",
        user        : process.env.POSTGRES_USER || "postgres",
        password    : process.env.POSTGRES_PASSWORD || "root",
        port        : parseInt(process.env.POSTGRES_PORT) || 5432
    };
} else {
    config = { connectionString: process.env.POSTGRES_STRING };
}

export default config;