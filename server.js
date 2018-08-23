const express = require('express');
const app = express();
const router = require('./routes');
const { syncAndSeed } = require('./db');
const path = require('path');


app.use(express.static(path.join(process.cwd(), './public')))
app.use('/api', router);

const PORT = process.env.PORT || 3000;

const init = ()=>{
	syncAndSeed();
	app.listen(PORT, ()=>{
		console.log('Listening');
	})
}

init();