const { Sequelize } = require('sequelize');
		const sequelize = new Sequelize('full_stack_project', 'thylink', 'Irknox!15', {
   		  host: '127.0.0.1',
    		  dialect: 'mysql'
		});