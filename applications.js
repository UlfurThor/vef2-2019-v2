const express = require('express');

const router = express.Router();


function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function page(req, res) {
  console.info('--- page> index');

  // `title` verður aðgengilegt sem breyta í template
  res.render('applications', {
    title: 'Umsókn',
  });
}

router.get('/', catchErrors(page));

module.exports = router;
