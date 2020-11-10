const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const database = {
	users: [
	{
		id: "123",
		name: "AnDrey",
		email: "andreyscott@gmail.com",
		password: "password",
		entries: 0,
		joined: new Date()
	},
	{
		id: "124",
		name: "AnDrew",
		email: "andrewking@gmail.com",
		password: "incorret",
		entries: 0,
		joined: new Date()
    }
  ]
}


app.get('/', (req, res) => {
	console.log(req.body)
	res.json("this is working");
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password){
      res.json('sigining in successful')
	} else {
		res.status(400).json("erroring loading");
	}
})

app.listen(3000, ()=> {
	console.log('app is runninig on port 3000')
});