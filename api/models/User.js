/**
* User.js
*
* @description :: 
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string'
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string',
      required: true
    },

    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    gravatarUrl: {
      type: 'string'
    }
  }
};
