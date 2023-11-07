import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVars = process.env;

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT
};
