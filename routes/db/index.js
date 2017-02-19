const db = require('./db');
const User = require('./User');
const Department = require('./Department');
const UserDepartment = require('./UserDepartment');

UserDepartment.belongsTo(User);
UserDepartment.belongsTo(Department);
User.hasMany(UserDepartment);
Department.hasMany(UserDepartment);

const sync = ()=> {
  return db.sync({ force: true })
}

const seed = ()=> {
  return sync()
  .then(()=>{
    return Promise.all([
      User.create({ name: 'Adam' }),
      User.create({ name: 'Eve' }),
      Department.create({ name: 'Finance' }),
      Department.create({ name: 'Sales' })

    ])
  })
  .spread( (user1, user2, dept1, dept2) => {
    return Promise.all([
      UserDepartment.create({ userId: user1.id, departmentId: dept1.id }),
      UserDepartment.create({ userId: user1.id, departmentId: dept2.id }),
      UserDepartment.create({ userId: user2.id, departmentId: dept1.id }),
    ])
  })

}

module.exports = {
  sync,
  seed,
  models: {
    User,
    Department,
    UserDepartment
  }
}
