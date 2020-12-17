var config = {};
config.config_path = __dirname;
config.version = '1.2.2';
config.PRODUCTS_PER_PAGE = 30;

config.debug = true;
config.port = process.env.APP_PORT || 4442; //port it

config.maxage = 86400 * 30 * 12 * 100; // one year
config.sessionKey = 'session_cookie_name';
config.sesssionSecret = 'bigboss';


config.dbOptions = {
    "host": process.env.DB_HOST || "localhost",
    "user": process.env.DB_USER || "postgres",
    "password": process.env.DB_PASSWORD || "Thanhtu69",
    "port": process.env.DB_PORT || 5432,
    "database": process.env.DB_DATABASE || "19/10",
    "connectionLimit": process.env.DB_CONNECTION_LIMIT || 5000,
    "waitForConnections": process.env.DB_WAIT_FOR_CONNECTIONS || true,
    "debug": false,
    "connectTimeout ": 60 * 1000,
    "acquireTimeout": 60 * 1000,
    "timeout": 60 * 1000
}


config.loginExpireTime = 3600 * 0.5; //1800 ms ? s
config.loginExpireTimeMac = 86400 * 30 * 12 * 100;

module.exports = config;