"use strict";
const GatewayApi = require("moleculer-web");
module.exports = {
	name: "www",
	mixins: [GatewayApi],
	/**
	 * Service settings
	 */
	settings: {
		port: 3333,
		routes:[
			{
				path: '/',
				aliases:{
					"GET ": [//will not work
						(req,res, next)=>{console.log("Middleware");return next()},
						"www.welcome"
					],
					"GET /test": "www.welcome",//Will work good
					"GET /hello": [//will not work
						(req,res, next)=>{console.log("Middleware");return next()},
						"www.hello"
					],
					"GET /hello1": "www.hello"//Will work good
				}
			}
		]
	},

	/**
	 * Service dependencies
	 */
	//dependencies: [],	

	/**
	 * Actions
	 */
	actions: {
		/**
		 * Welcome a username
		 * 
		 * @param {String} name - User name
		 */
		welcome: {
			pack: true,
			handler() {
				return `Welcome`;
			}
		},
		hello: {
			handler() {
				throw new Error("error");
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}	
};