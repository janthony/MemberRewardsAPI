/**
 * RewardController
 *
 * @description :: Server-side logic for managing rewards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let Engine = require('json-rules-engine').Engine;
let Rule = require('json-rules-engine').Rule;

module.exports = {

    /**
     * Create a reward
     */
    create: (req, res) => {
        if (req.body.reward === undefined) {
            res.send(400);
            return;
        }

        let data = req.body.reward;
        
        data.rule = JSON.stringify(data.rule);
        Reward
            .create(data)
            .exec((err, newRecord) => {
                if (err) {
                    res.send(400, err);
                }
                else {
                    res.send(200, {rewardId: newRecord.rewardId});
                }
            });
    },

    /**
     * Return rewards for given member id.
     */
    getRewardsForMember: (req, res) => {
        if (req.params.memberId === undefined) {
            res.send(400);
            return;
        }

        let memberId = req.params.memberId;

        // Get the member
        Member.findOneByEmail(memberId).exec((err, member) => {
            if (err) {
                res.send(500, err);
            }
            else {
                // Get current active rewards.
                Reward.findByStatus(1).exec((err, rewards) => {
                    if (err){
                        res.send(500, err);
                        return;
                    }

                    if (rewards.length > 0) {
                        let engine = new Engine();

                        rewards.forEach((i) => {
                            i.rule.event.params.reward = {
                                details: i.rewardDetails,
                                rewardId: i.rewardId
                            }; // Set the reward so we can access it when returning to the member
                            engine.addRule(new Rule(i.rule));
                        });

                        // Evaluate each rule of the reward and return it if it's applicable
                        // to the member.
                        let facts = { member: {
                            age: member.age(member.dob)
                        }};

                        engine
                            .run(facts)
                            .then(events => { // run() returns events with truthy conditions
                                rewards = events.map((event) => {
                                    return { "details": event.params.reward.details, "rewardId": event.params.reward.rewardId };
                                });

                                res.send(200, rewards);
                            })
                            .catch(err => res.send(500, err));

                    } 
                    else {
                        res.send(200, []);
                    }
                });
            }
        });
    }
};

