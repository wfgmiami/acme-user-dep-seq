const expect = require('chai').expect;
const db = require('../routes/db');
const User = db.models.User;
const Dept = db.models.Department;

describe('Models Testing', ()=> {
  beforeEach((done)=>{
    db.seed()
    .then(()=>done())
    .catch(done);
  })

  describe('Department Model', ()=>{
    it('exists',()=>{
      expect(Dept).to.be.ok
    })

    describe('Department seeded data', ()=>{
      let depts;
      beforeEach((done)=>{
        Dept.findAll()
        .then( _depts => depts = _depts)
        .then(()=>done())
        .catch(e => done(e));
      })
      it('there are two departments',()=>{
        expect(depts.length).to.equal(2);
      })
    })
  })

  describe('User Model', ()=> {
    it('exists', ()=>{
      expect(User).to.exist;
    })

    describe('test seeded data', ()=>{
      let users;
      beforeEach((done)=>{
        User.findAll()
          .then((_users)=> users = _users)
          .then (()=>done())
          .catch(done);
      })
      it('there are two users', ()=>{
        expect(users.length).to.equal(2);
      })
    })

    describe('field validation', ()=>{
      describe('should not accept null name', ()=>{

        it('validation error with null name', (done)=>{
          var user = User.build({name: 'alex'})
          user.name = null;
          user.validate()
          .then( result => {
            expect(result.errors[0].path).to.equal('name');
            done();
          })
          .catch(done);
        })

      })

      describe('create Sales dept again', ()=> {
        it('does not return Sales dept', (done)=>{
          db.models.Department.create({ name: 'Sales' })
          .catch( e => done());
        })
      })

    })

    describe('class method testing',()=>{
      it('returns all dept for users', (done)=>{
        User.getUserDepts()
        .then( depts => {
          expect(depts).to.have.lengthOf(2);
          done();
        })
        .catch(done);

      })
    })

    describe('instance method testing', ()=>{

      it('checks if user has all depts',(done)=>{
        User.getUserDepts()
        .then( users =>{
          expect(users[0].hasAllDepartments(2)).to.be.true;
          done();
        })
        .catch(done);
      })

      it('checks if user has no dept', (done)=>{
        User.getUserDepts()
        .then( users =>{
          expect(users[0].hasNoDepartments()).to.be.false;
          done();
        })
        .catch(done);
      })

      it('checks if user has a particular dept', (done)=>{
        User.getUserDepts()
        .then( users =>{
          expect(users[0].hasDepartment('Sales')).to.equal(1);
          expect(users[0].hasDepartment('Finance')).to.equal(1);
          expect(users[0].hasDepartment('HR')).to.equal(0);
          done();
        })
        .catch(done);
      })
    })

  })

})














