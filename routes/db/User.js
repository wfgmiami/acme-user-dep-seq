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
        });
      },
      createUser: function(name){
        //could use this here...
        return db.models.user.findOrCreate({ where: { name } })
        .spread( (user, found)=>{
          if(found) return user;
          return db.models.user.create({ name });//why should you have to do this if you are using findOrCreate?
        });
      }
    },
    instanceMethods:{
      hasAllDepartments: function(departments){
        return this.user_departments.length === departments;
      },
      hasNoDepartments: function(){
        return this.user_departments.length === 0;
      },
      hasDepartment: function(dept){
        let check = 0;
        //use filter instead
        this.user_departments.forEach( userDept => {
          if (userDept.department.name === dept)
            check++;
        });
        return check;
      }
    }
  }
);

module.exports = User;
