const expect = require('chai').expect;
const db = require('../routes/db');
const client = require('supertest')(require('../app'));

describe('Routes testing', ()=>{
  describe('with seeded data', ()=>{

    describe('GET /', ()=>{
      it('expects word user on the web page', (done)=>{
        client.get('/')
        .expect(200)
        .then( result => expect(result.text).to.contain('user'))
        .then( () => done())
        .catch(done);
      })
    })

    describe('GET /', ()=>{
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

    describe('GET /not existing route', ()=>{
      it('expects get/about to return 404', (done)=>{
        client.get('/about')
        .expect(404)
        .then( () => done())
        .catch( e => done(e));

      })
    })

    describe('POST /departments', ()=>{
      it('posts department', (done)=>{
        client.post('/departments')
          .send('name=HR')
          .expect(302)
          .then(()=>{
            return client.get('/')
          })
          .then( result => expect(result.text).to.contain('HR'))
          .then (()=> done())
          .catch(done);
      })
    })

    describe('POST/users',()=>{
      it('posts a user', (done)=>{
        client.post('/users')
        .send('name=Alex')
        .expect(302)
        .then(()=>{
          return client.get('/')
        })
        .then( result => expect(result.text).to.contain('Alex'))
        .then(()=>done())
        .catch(done)
      })
    })

  })
})



