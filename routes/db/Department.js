const db = require('./db');

const Department = db.define('department',{
  name: db.Sequelize.STRING
},{
  classMethods: {
    deleteDept: function(id){
      return this.destroy({ where: { id: id }})
    }
  }
})

module.exports = Department;
