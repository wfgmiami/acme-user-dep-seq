const expect = require('chai').expect;
const db = require('../routes/db');

describe('Models', ()=> {
  beforeEach((done)=>{
    db.seed()
    .then(()=>done())
    .catch( e=> done(e));
  })

  describe('Department', ()=>{
    it('exists',()=>{
      expect(db.models.Department).to.be.ok
    })


    describe('seeded data', ()=>{
      let depts;
      beforeEach((done)=>{
        db.models.Department.findAll()
        .then( _depts => depts = _depts)
        .then(()=>done())
        .catch(e => done(e));
      })
      it('there are two departments',()=>{
        expect(depts.length).to.equal(2);
      })
    })
  })

  describe('User', ()=> {
    it('exists', ()=>{
      expect(db.models.User).to.be.ok;
    })

    describe('seeded data', ()=>{
      let users;
      beforeEach((done)=>{
        db.models.User.findAll()
          .then((_users)=> users = _users)
          .then (()=>done())
          .catch( e => done(e));
      })
      it('there are two users', ()=>{
        expect(users.length).to.equal(2);
      })
    })
  })


})














