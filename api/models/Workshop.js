/**
* Workshop.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Subject = require('./Subject');

module.exports = {

  attributes: {
  	topic: String,
  	content: String,
  	subject: Subject
  }
};

