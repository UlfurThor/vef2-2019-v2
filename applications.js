const express = require('express');

const router = express.Router();
const {
  getApplications,
} = require('./db');

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function page(req, res) {
  console.info('--- page> applications');
  const data = await getApplications();
  console.log('test start --------------------------');
  console.log(data);
  console.log('test end  --------------------------');
  // `title` verður aðgengilegt sem breyta í template
  res.render('applications', {
    title: 'Umsókn',
  });
}

router.get('/', catchErrors(page));

module.exports = router;
