# Members rewards api

- The api is based on [SailsJS](http://sailsjs.com/)
- For development, ```config/models.js``` migrate is set to ```drop```. This will recreat the db, eveytime sails is lifted.
- To run the tests do ```yarn test```
- ```PostmanTests``` folder contains the API calls

# Setup
- Install [yarn](https://yarnpkg.com/lang/en/docs/install/).
- Install dependancies
```
cd member-rewards-api
yarn install
```
- Run the integration tests
```
yarn test
```
- To run the application
```
sails lift
```

# Design
- The domain model contains 'reward' and 'member' entities. 
- When creating a reward, a rule has to be defined to test the applicability of the reward for a member. 
- The rules are based on [json-rules-engine](https://www.npmjs.com/package/json-rules-engine)
- When rewards are requested for a user, every 'active' reward rule is executed for the user. 

## TASKS: 
- Creating a member and reward = DONE
- Associate a reward to a member = DONE 
- Retrieve a member and their rewards = DONE
- Delete a member and reward = Delete member DONE

## TODO: 
- Delete Reward
- Move rewards to a REDIS datastore, as the rewards are accessed often
- ```sails-hook-cron``` is installed. The intention is to define cron jobs for;
  - Cleaning up expired rewards
  - Batch mail rewards applicable to the users


