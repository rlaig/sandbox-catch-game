
# sandbox-test

a catch game fullstack dev by raymundo laig

# backend

- Node.js
- Express.js
- Typescript
- RethinkDB
- Socket.io

## Local Setup
Navigate first to `backend` folder
1. Install dependencies
```bash
nvm use
npm install
```
2. run dev server locally
```bash
npm run dev
```

## Database Setup
You can skip this entirely and use the one readily available on my host by default
or if you wish you can proceed and follow the steps to run it locally on your machine:

1. Install and setup [RethinkDB](https://rethinkdb.com/docs/install/) locally on your machine
2. Run the server [Guide](https://rethinkdb.com/docs/start-a-server/)
3. Open `backend\src\config\index.ts` and change `host`, `port` and `db`
example default localhost config: 
```javascript
...
  connectionOptions: {
    server: {
      host: 'localhost',
      port: 29015
    },
    db: 'test'
  }
...
```
4. Run the setup endpoint once to create db table and set index
`http://localhost:3010/setup`

## API Endpoints

Init database setup - setup database table and index
> Method: `GET`
URL: `'/setup'`
Sample Response:
```
{
"status":"error",
"error":{
	"msg":"Table `test.scores` already exists.",
	"type":17,
	"name":"ReqlOpFailedError",
	"term":[60,[[14,["test"]],"scores"]],
	"backtrace":[]
	}
}
```

Fetch Scores - top 100 scores order by score descending
> Method: `GET`
URL: `'/scores'`
Success Response:
```
{
	"status":"ok",
	"response":[
		{"id":"09c955e0-0301-4861-8375-936897467359","name":"yeah","score":2100},
		{"id":"5548cd1e-29b9-40b1-923d-f32e85c70ed7","name":"keiwai2","score":1650},
		{"id":"21fa9e94-1f58-4091-b211-697b680270e9","name":"keiwai","score":1200}
		]
}
```

Add Score - add new high score
> Method: `POST`
URL: `'/scores'`
HEADER:
```
...
Content-Type: application/json
...
```
BODY:
```
{
    "name": "Someone",
    "score": 100
}
```
Success Response:
```
{
    "status": "ok",
    "results": {
        "deleted": 0,
        "errors": 0,
        "generated_keys": [
            "dac2bf39-978a-4e1f-9b55-2c1404aebc43"
        ],
        "inserted": 1,
        "replaced": 0,
        "skipped": 0,
        "unchanged": 0
    }
}
```


# frontend

- Vite
- React
- Typescript
- Phaser3
- Socket.io
- FramerMotion

## Setup
Navigate to `frontend` folder
1. Install dependencies
```bash
nvm use
yarn
```
2. run dev server locally
```bash
yarn dev
```

## Configuration
Configure the `backend` api base url if needed
`frontend\.env.local-dev`
```
...
VITE_APP_API_BASE_URL = http://localhost:3010
...
```

