export default () => ({
  port: parseInt(process.env.PORT),
  secret: process.env.SECRET_KEY,


  // Database configurations
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT),
  username: process.env.USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
});
