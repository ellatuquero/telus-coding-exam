import mongoose, { Mongoose } from 'mongoose';
import { DB_CONNECTION_STRING, DB_NAME } from '@/constants/constants';

// TODO: Database config
export async function bootDatabase() : Promise<Mongoose> {
    console.log('DB STRING:', DB_CONNECTION_STRING)
    console.log('DB NAME:', DB_NAME)
    
    mongoose.set('strictQuery',false);
    return mongoose.connect(String(DB_CONNECTION_STRING), {
        dbName : DB_NAME
    })
}