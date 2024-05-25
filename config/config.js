module.exports = { 
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    UAE_PASS_AUTH_URL: process.env.UAE_PASS_AUTH_URL,
    UAE_PASS_TOKEN_URL: process.env.UAE_PASS_TOKEN_URL,
    UAE_PASS_USERINFO_URL: process.env.UAE_PASS_USERINFO_URL,
    UAE_PASS_LOGOUT_URL: process.env.UAE_PASS_LOGOUT_URL,
    UAE_PASS_REDIRECT_URI: process.env.UAE_PASS_REDIRECT_URI,
    UAE_PASS_CLIENT_ID: process.env.UAE_PASS_CLIENT_ID,
    UAE_PASS_CLIENT_SECRET: process.env.UAE_PASS_CLIENT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET
};


// module.exports = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
//   },
//   test: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
//   },
//   production: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
//   }
// };
