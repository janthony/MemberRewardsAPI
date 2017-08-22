/**
 * Reward.js
 *
 * @description :: A reward available to applicable members, based on the conditions
 *                 defined in the rule.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
let RuleEngine = require('json-rules-engine');

module.exports = {

  attributes: {
    rewardId:  {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },

    // Rule definition. This is based on 'json-rules-engine' (https://github.com/cachecontrol/json-rules-engine)
    // This value represents ```rule.toJSON()```
    // To convere the string definition back a rule 
    // ```new Rule(jsonString)```
    // Other options maxant rule-js[https://github.com/maxant/rules/tree/master/rules-js]
    rule:  {
      type: 'json',
      required: true
    },

    // Promotion start date.
    startDate:  {
      type: 'date',
      required: true
    },

    // Promotion end date.
    endDate:  {
      type: 'date',
      required: true
    },

    rewardDetails: {
      type: 'string',
      required: true
    }, 

    status: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    }
  },

  // Attribute methods
  getRule: () => {
    return new RuleEngine.Rule(this.rule);
  }
};

