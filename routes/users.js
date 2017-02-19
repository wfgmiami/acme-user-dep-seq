const router = require('express').Router();
const db = require('./db');

router.post('/', (req,res,next)=>{
  // db.models.User.create({name: req.body.name})
  // res.redirect('/');
});

router.post('/:id/user_departments', (req,res,next)=>{

  res.send(req.params.id);;
  //res.redirect('/');

})


router.delete('/:id', (req,res,next)=>{

  res.send(req.params.id)
})

module.exports = router;
