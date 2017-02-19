const router = require('express').Router();
const db = require('./db');

router.post('/', (req,res,next)=>{
  db.models.User.findOne({ where: {name: req.body.name }})
  .then( (user) => {
    if (user) return users;
    return db.models.User.create( { name: req.body.name })
  })
  .then( (user) => res.redirect('/'))
  .catch (next);
});

router.post('/:id/user_departments', (req,res,next)=>{
  db.models.UserDepartment.create({ userId: req.params.id, departmentId: req.body.departmentId})
  .then( (result) => res.redirect('/'))
  .catch(next);
})

router.delete('/:userId/user_departments/:id', (req,res,next)=>{
  db.models.UserDepartment.destroy({
    where: { userId: req.params.userId, departmentId: req.params.id }
  })
  .then( ()=> res.redirect('/'))
  .catch(next);
})

router.delete('/:id', (req,res,next)=>{
  db.models.UserDepartment.destroy({
    where: { userId: req.params.id }
  })
  .then( ()=> db.models.User.destroy({ where: { id: req.params.id }}))
  .then( ()=> res.redirect('/'))
  .catch(next);
})

module.exports = router;
