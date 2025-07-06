let DBConfig;

if (!process.env.POSTGRES_STRING) {
    DBConfig = {
        host        : process.env.POSTGRES_HOST     ?? "",
        database    : process.env.POSTGRES_DATABASE ?? "",
        user        : process.env.POSTGRES_USER     ?? "",
        password    : process.env.POSTGRES_PASSWORD ?? "",
        port        : process.env.POSTGRES_PORT     ?? 5432
    };
} else {
    DBConfig = { connectionString: process.env.POSTGRES_STRING };
}

export default DBConfig;