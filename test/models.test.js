const expect = require('chai').expect;
const db = require('../routes/db');

describe('Models', ()=> {
  describe('User', ()=> {
    it('exists', ()=>{
      expect(db.models.User).to.be.ok;
    })
  })
})
