const express = require('express');
const {
  check,
  validationResult,
} = require('express-validator/check');
const {
  sanitize,
} = require('express-validator/filter');

const router = express.Router();


router.use(express.urlencoded({
  extended: true,
}));

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
  const data = req.body;

  // const errors = {};
  const errors = validationResult(req);
  console.log(errors);

  console.log(data);
  if (!errors.isEmpty()) {
    const err = {};
    err.msgList = errors.array().map(i => i.msg);
    for (let j = 0; j < errors.array().length; j += 1) {
      err[errors.array()[j].param] = true;
    }
    console.log(errors.array());
    console.log(err);
    res.render('apply', {
      title: 'Umsókn',
      err,
      data,
    });
    return;
  }


  res.render('thanks', {
    title: 'Umsókn',
  });
}


/* todo fix formating */
router.post('/',
  check('name').isLength({
    min: 1,
  }).withMessage('Name must not be empty'),
  check('email').isLength({
    min: 1,
  }).withMessage('Email must not be empty'),
  check('email').isEmail().withMessage('Email must be formated as an email'),
  check('phone').isLength({
    min: 1,
  }).withMessage('Phone must not be empty'),
  check('phone')
    .matches(/^([0-9]){3}[- ]?([0-9]){4}$/)
    .withMessage('Phone number must be 7 characters long (posible dash after 3rd char)'),
  check('comment').isLength({
    min: 100,
  }).withMessage('Comment must be at least 100 character long'),
  check('jobTitle').isIn(['programer', 'designer', 'admin']).withMessage('Job title not valid'),

  sanitize('name').trim().escape(),
  sanitize('email').normalizeEmail(),
  sanitize('phone').blacklist('- ').toInt(),
  sanitize('comment').trim().escape(),
  sanitize('jobTitle').trim().escape(),


  catchErrors(submit));
router.get('/', catchErrors(page));
// router.get('/thanks',)

module.exports = router;
