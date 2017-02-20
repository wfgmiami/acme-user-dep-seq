const express = require('express');
const app = express();
const swig = require('swig');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const db = require('./routes/db');
const departments = require('./routes/departments');
const users = require('./routes/users');

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults( {cache:false});

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/vendors', express.static(__dirname + '/' + 'node_modules'));

app.get('/', (req,res,next)=>{
  let depts;
  return db.models.Department.findAll()
  .then( _depts =>{
    depts = _depts;
    return db.models.User.findAll({ order: '"name" ASC',
      include: [{
        model: db.models.UserDepartment,
        include: [{
          model: db.models.Department
        }]
      }]
    })
  })
  .then( users => { res.render('index', {depts, users})
  })
  .catch(next);
})

app.use('/departments', departments);
app.use('/users', users);

app.use((err,req,res,next)=>{
  console.log(err);
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log(`listening on port ${port}`)
});

db.seed()
.then(()=>'database is synched and seeded')
.then( e => console.log(e));
