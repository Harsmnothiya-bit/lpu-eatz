import {Pool} from '@neondatabase/serverless';
import {drizzle} from 'drizzle-orm/neon-serverless';

const pool = new Pool({
  connectionString:
    'postgresql://harshmnothiya74:Jb8sXM0GmOkr@ep-orange-term-a1shoukz-pooler.ap-southeast-1.aws.neon.tech/lpu?sslmode=require',
});
const db = drizzle(pool);

export {db, pool};
