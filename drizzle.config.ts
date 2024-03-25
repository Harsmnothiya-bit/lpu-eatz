import type {Config} from 'drizzle-kit';

export default {
  schema: './src/libs/db/schemas',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString:
      'postgresql://harshmnothiya74:Jb8sXM0GmOkr@ep-orange-term-a1shoukz-pooler.ap-southeast-1.aws.neon.tech/lpu?sslmode=require',
  },
} satisfies Config;
