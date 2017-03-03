const db = require('./db');

const Department = db.define('department',{
  name: {
    type: db.Sequelize.STRING,
    unique: true
  }
},{
  classMethods: {
    deleteDept: function(id){
      return this.destroy({ where: { id: id }})
    },
    createDept: function(name){
      //this makes sense... 
      return db.models.department.findOne({ where: { name } })
      .then( dept => {
        if(dept) return dept;
        return db.models.department.create({ name });
      });
    }
  }
});

module.exports = Department;
