# Members rewards api

* The api is based on [SailsJS](http://sailsjs.com/)
* For development, ```config/models.js``` migrate is set to ```drop```. This will recreat the db, eveytime sails is lifted.
* To run the tests do ```yarn test```
* ```PostmanTests``` folder contains the API calls

# Design
* The domain model contains 'reward' and 'member'. 
* When creating a reward, a rule has to be defined for applicability of the reward. The rules are based on [json-rules-engine](https://www.npmjs.com/package/json-rules-engine)
* When rewards are requetsed for a user, every 'active' reward rule is executed for the user. 

## TODO: 
* Move rewards to a REDIS datastore, as the rewards are accessed often
* ```sails-hook-cron``` is installed. The intention is to define cron jobs for;
  - Cleaning up expired rewards
  - Batch mail rewards applicable to the users


