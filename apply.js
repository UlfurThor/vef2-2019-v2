const express = require('express');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function page(req, res) {
  // eslint-disable-next-line no-console
  console.log('--- page> index');

  // `title` verður aðgengilegt sem breyta í template
  res.render('apply', {
    title: 'Umsókn',
  });
}

async function submit(req, res) {
  // eslint-disable-next-line no-console
  console.log('--- page> submit');
  console.log(JSON.stringify(req.body));
  // `title` verður aðgengilegt sem breyta í template
  res.render('thanks', {
    title: 'Umsókn',
  });
}

router.use((req, res, next) => {
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    req.body = chunks.join();
    next();
  });
});

/* todo útfæra */
router.post('/', catchErrors(submit));
router.get('/', catchErrors(page));
// router.get('/thanks',)

module.exports = router;
