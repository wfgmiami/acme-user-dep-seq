const expect = require('chai').expect;
const db = require('../routes/db');
const client = require('supertest')(require('../app'));

describe('routes', ()=>{
  describe('with seeded data', ()=>{
    describe('GET /', ()=>{
      it('expects word user', (done)=>{
        client.get('/')
        .expect(200)
        .then( result => expect(result.text).to.contain('user'))
        .then( () => done())
        .catch( e => done(e));
      })
    })

    describe('GET /page', ()=>{
      it('expects page', (done)=>{
        client.get('/page')
        .expect(404)
        .then( () => done())
        .catch( e => done(e));

      })
    })

    describe('get /', ()=>{
      it('should return name of user- Adam', (done)=>{
        client.get('/')
          .expect(200)
          .then( result => {
            expect(result.text).to.contain('Adam')
            expect(result.text).not.to.contain('John')
          })
        .then(()=>done())
        .catch( e=> done(e));
      })
    })

    describe('post /departments', ()=>{
      it('posts deparment', (done)=>{
        client.post('/departments')
          .send('name=HR')
          .expect(302)
          .then(()=>{
            return client.get('/')
          })
          .then( result => expect(result.text).to.contain('HR'))
          .then (()=> done())
          .catch( e => done(e));
      })
    })

  })
})



