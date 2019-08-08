const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const fs = require('fs')
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const http = require('http');

app.use(bodyParser())

app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}
));

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

const loadData = (path) => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch (err) {
      console.error(err)
      return false
    }
  }

router.post('/teams', (ctx, next) => {
    storeData(ctx.request.body, 'data/teams.json')
})

router.post('/events', (ctx, next) => {
    storeData(ctx.request.body, 'data/events.json')
    ctx.body = "Ok"
})

router.get('/teams', (ctx, next) => {
  ctx.body = loadData('data/teams.json')
})

router.get('/events', (ctx, next) => {
  ctx.body = loadData('data/events.json')
})

app
  .use(router.routes())
  .use(router.allowedMethods());

http.createServer(app.callback()).listen(3000);
console.log('Server listen on localhost:3000');