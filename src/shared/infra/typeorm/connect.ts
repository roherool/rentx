import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === "test" ? "pgdb-test" : defaultOptions.database,
    })
  );
};

// import { createConnection, getConnectionOptions } from 'typeorm'

// getConnectionOptions().then(options => {
//   createConnection(Object.assign(options, {
//     host: 'pgdb'
//   })).then(() => console.log('📦 Database connected successfully'))
// });
