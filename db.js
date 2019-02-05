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

  const getString = 'SELECT * FROM applications;';
  client.query(getString)
    .then((res) => {
      // console.log(res.rows);
      client.end();
      return res.rows;
    })
    .catch((err) => {
      console.error(err);
      client.end();
    });
  // búa til töflu út frá skema
  /*
  try {

    data = await query(getString.toString('utf8'));
    // console.log(data);
    console.info('applications returned');
  } catch (e) {
    console.error('Error returning applications', e.message);
  }
  return data;
  */
}

module.exports = {
  addApplication,
  getApplications,
};

async function test() {
  const data = getApplications();
  console.log(data);
}
test();
