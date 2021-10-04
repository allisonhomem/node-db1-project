const router = require('express').Router()
const Accounts = require('./accounts-model.js');
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware.js');

router.get('/', (req, res, next) => {
  Accounts.getAll()
          .then(accounts => {
            res.status(200).json(accounts)
          })
          .catch(err => {
            next(err)
          })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

router.post('/', checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
