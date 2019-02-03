require('dotenv').config();

const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka
const { Client } = require('pg');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

async function query(q) {
  const client = new Client({ connectionString });

  await client.connect();

  try {
    const result = await client.query(q);

    const { rows } = result;
    return rows;
  } catch (err) {
    throw err;
  } finally {
    await client.end();
  }
}


module.exports = query;

console.log('test');


async function main() {
  console.info(`test db: ${connectionString}`);
  // droppa töflu ef til


  // búa til töflu út frá skema
  try {
    const createTable = await readFileAsync('./schema.sql');
    await query(createTable.toString('utf8'));
    console.info('Tafla búin til');
  } catch (e) {
    console.error('Villa við að búa til töflu:', e.message);
    return;
  }

}


main().catch((err) => {
  console.error(err);
});
