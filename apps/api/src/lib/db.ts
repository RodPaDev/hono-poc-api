import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

console.log('Connecting to database with URL:', process.env.DATABASE_URL);

export const db = drizzle(process.env.DATABASE_URL!);