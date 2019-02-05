require('dotenv').config();

const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka
const {
  Client,
} = require('pg');

async function query(q) {
  const client = new Client({
    connectionString,
  });

  await client.connect();

  try {
    const result = await client.query(q);
    const {
      rows,
    } = result;
    return rows;
  } catch (err) {
    throw err;
  } finally {
    await client.end();
  }
}


async function addApplication(data) {
  console.info(`test db: ${connectionString}`);

  try {
    const insertString = `INSERT INTO applications (name, email, phone, comment, job)
    VALUES (
      '${data.name}',
      '${data.email}',
      '${data.phone}',
      '${data.comment}',
      '${data.jobTitle}'
      );`;
    await query(insertString.toString('utf8'));
    console.info('application inserted');
  } catch (e) {
    console.error('Error inserting application', e.message);
  }
}

async function getApplications() {
  console.info(`test db: ${connectionString}`);
  const client = new Client({
    connectionString,
  });

  await client.connect();
  let res;
  const getString = 'SELECT * FROM applications ORDER BY id;';
  try {
    res = await client.query(getString);
  } catch (error) {
    console.error('error reading table applications');
    throw new Error('error reading table applications', error); // Express will catch this on its own.
  } finally {
    await client.end();
  }
  return res.rows;
}

module.exports = {
  addApplication,
  getApplications,
};


// eslint-disable-next-line no-unused-vars
async function test() {
  const data = await getApplications();
  console.log('test start --------------------------');
  console.log(data);
  console.log('test end  --------------------------');
}
// test();
