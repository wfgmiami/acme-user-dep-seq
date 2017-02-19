const router = require('express').Router();
const db = require('./db');

router.post('/', (req,res,next)=>{
  db.models.Department.findOne({
    where: {name: req.body.name}
  })
  .then( dept => {
    if (dept) return dept;
    return db.models.Department.create( {name: req.body.name });
  })
  .then( dept => res.redirect('/'))
  .catch( e => next(e));
})

router.delete('/:id',(req,res,next)=>{
  db.models.Department.deleteDept(req.params.id)
  .then( ()=> res.redirect('/'))
  .catch (e => next(e));
})

module.exports = router;
