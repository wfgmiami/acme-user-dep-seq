const db = require('./routes/db');
const server = require('http').createServer(require('./app'));

const port = process.env.PORT || 3000;

server.listen(port, ()=>{
  console.log(`listening on port ${port}`);
});

db.seed()
.then(()=>'database is synched and seeded')
.then( e => console.log(e));

