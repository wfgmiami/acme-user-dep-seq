const db = require('./db');

const User = db.define('user', {
  name: db.Sequelize.STRING
},{
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
      },
      getUserDepartment: function(){

      }

    }
  }
)


module.exports = User;
