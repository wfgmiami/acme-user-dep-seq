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
    }
  }
})

module.exports = Department;
