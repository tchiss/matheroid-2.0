/**
* Post.js
*
* @description :: 
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var User = require('./User');

module.exports = {

  attributes: {
  	title: {
  		type: 'string',
  		required: true,
  	},
  	content: {
  		type: 'string',
  		required: true,
  	},
  	author: User
  }
};
