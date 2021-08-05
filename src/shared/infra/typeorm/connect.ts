// import { Connection, createConnection, getConnectionOptions } from 'typeorm'

// export default async(host = 'pgdb'): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions()

//   return createConnection(
//     Object.assign(defaultOptions, {
//       host
//     })
//   )
// }

import { createConnection, getConnectionOptions } from 'typeorm'

getConnectionOptions().then(options => {
  createConnection(Object.assign(options, {
    host: 'pgdb'
  })).then(() => console.log('📦 Database connected successfully'))
});