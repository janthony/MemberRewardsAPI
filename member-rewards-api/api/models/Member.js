/**
 * Member.js
 *
 * @description :: Represents a member instance
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
let moment = require('moment');

module.exports = {

  attributes: {

    // This will be the unique ID of the user
    // e.g., "user@gmail.com"
    email: {
      primaryKey: true,
      type: 'string',
      required: true,
      unique: true
    },

    // e.g., "John"
    name: {
      type: 'string',
      required: true
    },

    // e.g., "2017-01-02"
    dob: {
      type: 'date',
      required: true
    },

    // e.g., "(lat,lng)"
    city: {
      type: 'string',
      required: true
    },

    // e.g., "(lat,lng)"
    country: {
      type: 'string',
      required: true
    },

    // e.g., "(lat,lng)"
    street: {
      type: 'string',
      required: true
    },

    state: {
      type: 'string',
      required: true
    },

    status: {
      type: 'integer',
      defaultsTo: 1
    },

    // Attribute methods
    age: (dob) => {
      let memberAge = moment().diff(dob, 'years', true);
      return Math.round(memberAge);
    }

  }
};

