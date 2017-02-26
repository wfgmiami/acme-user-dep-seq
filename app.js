const express = require('express');
const app = express();
const swig = require('swig');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const db = require('./routes/db');
const departments = require('./routes/departments');
const users = require('./routes/users');
const User = db.models.User;
const Dept = db.models.Department;
const UserDept = db.models.UserDepartment;

module.exports = app;

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults( {cache:false});

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/vendors', express.static(__dirname + '/' + 'node_modules'));

app.get('/', (req,res,next)=>{
  let depts;
  return Dept.findAll()
  .then( _depts =>{
    depts = _depts;
    return User.getUserDepts()
  })
  .then( users => {
    res.render('index', {depts, users})
  })
  .catch(next);
})

app.use('/departments', departments);
app.use('/users', users);

app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).send(err.message);
})



