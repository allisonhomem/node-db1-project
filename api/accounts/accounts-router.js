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
  const {id} = req.params

  Accounts.getById(id)
          .then(account => {
            res.status(200).json(account)
          })
          .catch(err => {
            next(err)
          })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const name = req.body.name.trim()
    const {budget} = req.body

    const newAccount = await Accounts.create({name, budget})

    res.status(201).json(newAccount)
  }
  catch (err) {
    next(err);
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try {
    const {id} = req.params
    const name = req.body.name.trim()
    const {budget} = req.body

    const updatedAccount = await Accounts.updateById(id, {name, budget})

    res.status(200).json(updatedAccount)
  }
  catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const {id} = req.params

  Accounts.deleteById(id)
          .then(deletedAccount => {
            res.status(200).json(deletedAccount)
          })
          .catch(err => {
            next(err)
          })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
