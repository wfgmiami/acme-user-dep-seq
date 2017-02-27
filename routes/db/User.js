const db = require('./db');

const User = db.define('user', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
},{
    classMethods:{
      getUserDepts: function(){
        return User.findAll({ order: '"name" ASC',
          include: [{
            model: db.models.user_department,
              include: [{
                model: db.models.department
              }]
          }]
        })
      },
      createUser: function(name){
        return db.models.user.findOrCreate({ where: { name: name } })
        .spread( (user, found)=>{
          if(found) return user;
          return db.models.user.create({ name: name })
        })
      }
    },
    instanceMethods:{
      hasAllDepartments: function(allDepts){
        return this.user_departments.length === allDepts;
      },
      hasNoDepartments: function(){
        return this.user_departments.length === 0;
      },
      hasDepartment: function(dept){
        let check = 0;
        this.user_departments.forEach( userDept => {
          if (userDept.department.name === dept)
            check++;
        })
        return check;
      }
    }
  }
)

module.exports = User;
