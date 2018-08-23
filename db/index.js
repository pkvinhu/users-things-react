const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL, { logging:false });
const { users, things } = require('./seed');

const User = db.define('user', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false
  }
})

const Thing = db.define('thing', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false
  }
})

// User.hasMany(Thing, {through:'UserThing'});
// Thing.hasMany(User, {through: 'UserThing'});
User.belongsToMany(Thing, {through: 'UserThing'});
Thing.belongsToMany(User, {through: 'UserThing'})

const syncAndSeed = async() => {
  await db.sync({ force:true })
  const [ Moe, Larry, Curly, Shep, Joe ] = await Promise.all(users.map((user)=>{
  	return User.create(user);
  }))
  const [ Foo, Baz ] = await Promise.all(things.map((thing)=>{
  	return Thing.create(thing);
  }))
  Foo.addUser(Moe)
  Foo.addUser(Curly)
  Foo.addUser(Shep)
  Baz.addUser(Larry)
  Moe.addThing(Baz)
  .then(()=> console.log('done'))
}

module.exports = {
	db,
	syncAndSeed,
	models: {
	  User,
	  Thing
	}
}

