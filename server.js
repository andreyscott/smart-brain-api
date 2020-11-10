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
	res.json(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password){
      res.json('sigining in successful')
	} else {
		res.status(400).json("erroring loading");
	}
})

app.post('/register', (req, res) => {
	const {name, email, password } = req.body; 
	database.users.push({
		id: "126",
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	database.users.forEach(user => {
		if (user.id === id) {
			res.json(user);
		} else {
			res.status(404).json("no user found")
		}
	})
})

app.listen(3000, ()=> {
	console.log('app is runninig on port 3000')
});