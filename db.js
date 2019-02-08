require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const {
  Client,
} = require('pg');

/**
 * Inserts new row into table applications
 * @param {inserted data} data
 */
async function createApplication(data) {
  console.info(`test db: ${connectionString}`);
  const client = new Client({
    connectionString,
  });


  const queryString = `INSERT INTO applications
  (name, email, phone, comment, jobTitle)
  VALUES ( $1, $2, $3, $4, $5)`;

  const queryData = [
    data.name, // $1
    data.email, // $2
    data.phone, // $3
    data.comment, // $4
    data.jobTitle, // $5
  ];

  await client.connect();

  try {
    await client.query(queryString, queryData);
  } catch (err) {
    console.error('error sending application', err);
    // reject(err);
    throw new Error('error sending application', err);
  } finally {
    await client.end();
  }
}

/**
 * Returns the content of table applications, ordered by id
 */
async function readApplications() {
  console.info(`test db: ${connectionString}`);
  const client = new Client({
    connectionString,
  });

  await client.connect();
  let res;
  const getString = 'SELECT * FROM applications ORDER BY id;';
  try {
    res = await client.query(getString);
  } catch (err) {
    console.error('error reading table applications', err);
    throw new Error('error reading table applications', err);
  } finally {
    await client.end();
  }
  return res.rows;
}

/**
   * Sets the selected application to processed,
   *  and updates the updated timestamp
   * @param {id key for aplication to be updated} key
   */
async function updateApplications(key) {
  console.info(`test db: ${connectionString}`);
  const client = new Client({
    connectionString,
  });

  const queryString = `UPDATE applications SET
  processed = true,
  updated = current_timestamp
  WHERE id = $1
  `;
  const queryData = [key];

  await client.connect();

  try {
    await client.query(queryString, queryData);
  } catch (err) {
    console.error('error updating application', err);
    throw new Error('error updating application', err);
  } finally {
    await client.end();
  }
}

/**
 * Deletes the selected application
 * @param {id key for aplication to be removed} key
 */
async function deleteApplications(key) {
  console.info(`test db: ${connectionString}`);
  const client = new Client({
    connectionString,
  });

  const queryString = `DELETE FROM applications
  WHERE id = $1
  `;
  const queryData = [key];

  await client.connect();

  try {
    await client.query(queryString, queryData);
  } catch (err) {
    console.error('error deleting application', err);
    throw new Error('error deleting application', err);
  } finally {
    await client.end();
  }
}

module.exports = {
  createApplication,
  readApplications,
  updateApplications,
  deleteApplications,
};

// eslint-disable-next-line no-unused-vars
async function test() {
  const data = await readApplications();
  console.info('test start --------------------------');
  console.info(data);
  console.info('test end  --------------------------');
}
// test();  // used to test reading the database, red evry time the page is saved
