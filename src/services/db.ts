import { Pool } from 'pg';
import config from './../config';

// console.log(config.db);

const pool: Pool = new Pool(config.db);

/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 * 
 */


async function query(query: string, parameters?: any) {
  const { rows, fields } = await pool.query(query, parameters);
  // await pool.release()

  return rows;
}

export const pools =  () => { return  pool };

export default query;
