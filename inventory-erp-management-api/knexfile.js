
const knexfile = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'inventory-management-db',
  },
  migrations: {
    directory: './migrations',
  },
  debug: true,  // Enable debug mode
};

export default knexfile;