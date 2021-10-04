const Accounts = require('./accounts-model.js');

const checkAccountPayload = (req, res, next) => {
  try{
    const {name, budget} = req.body

    if(!name || !budget){
      res.status(400).json({message: "name and budget are required"})
    }
    else if(typeof name!=='string'){
      res.status(400).json({message: "name of account must be a string"})
    }
    else if(name.trim().length() < 3 || name.trim().length() > 100){
      res.status(400).json({message: "name of account must be between 3 and 100"})
    }
    else if(typeof budget!=='number' || isNaN(budget)){
      res.status(400).json({message: "budget of account must be a number"})
    }
    else if(budget < 0 || budget > 1000000){
      res.status(400).json({message: "budget of account is too large or too small"})
    }
    else {
      next()
    }
  }
  catch(err){
    res.status(500).json({message: "an error occurred verifying data"})
  }
}

const checkAccountNameUnique = (req, res, next) => {
  try {
    const {name} = req.body

    
  }
  catch(err){
    res.status(500).json({message: "an error occurred verifying data"})
  }
}

const checkAccountId = async (req, res, next) => {
  try {
    const {id} = req.params

    const account = await Accounts.getById(id)

    if(!account){
      res.status(404).json({message: "account not found"})
    }
    else {
      next();
    }
  }
  catch(err){
    res.status(500).json({message: "an error occurred verifying data"})
  }
}


module.exports = {checkAccountPayload, checkAccountId, checkAccountNameUnique}
