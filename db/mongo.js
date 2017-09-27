import bluebird from 'bluebird'
import mongoose from 'mongoose'
import mongoomise from 'mongoomise'

class Mongo{
	constructor(app, config) {
		Object.assign(this, {
			app, 
			config, 
		})

		this.init()
	}

	init() {
		this.env    = this.app.get('env')
		this.dblink = this.config['mongo'][this.env]['connectionString']

		const opts = {
			server: {
				socketOptions: { 
					keepAlive: 1 
				}
			}
		}

		mongoose
			.connect(this.dblink, opts)
			.connection
			.on('error', err => console.log('------ Mongodb connection failed ------' + err))
			.on('open', () => console.log('------ Mongodb connection succeed ------'))
		/*const opts = {
			useMongoClient: true，
			socketTimeoutMS: 0,
			keepAlive: true,
			reconnectTries: 30
		}

		mongoose
			.connect(this.dblink, opts)
			.then(
				() => {  console.log('------ Mongodb connection succeed ------')},
				err => {console.log('------ Mongodb connection failed ------' + err)}
			);*/	

		mongoomise.promisifyAll(mongoose, bluebird)
	}
}

export default Mongo