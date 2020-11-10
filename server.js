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
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
	})
	if (!found) {
			res.status(400).json("no user found")
	}
})

app.post('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		} 
	})
	if (!found) {
			res.status(400).json("user not found");
	}

})

app.listen(3000, ()=> {
	console.log('app is runninig on port 3000')
});