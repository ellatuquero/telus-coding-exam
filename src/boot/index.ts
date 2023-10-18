import httpServer from 'http'
import { server } from './express'
import { bootDatabase } from './mongo';
import { log } from '@/utils/utils';
import { SERVER_PORT } from '@/constants/constants';


async function bootService () {

    bootDatabase()
    .then(async() =>{

        const serverInstance = httpServer.createServer(server)
              serverInstance.listen(SERVER_PORT, () => {
                log('Database connected successfully.')
                log('Service successfully initialized.')
              });

    })
    .catch((error) => log('Failed to connect to DB.', error))
    
}

export { bootService }