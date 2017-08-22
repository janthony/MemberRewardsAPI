/**
 * MembersController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    /**
     * Remove given memberid
     */
    delete: (req, res) => {
        if (req.params.memberId === undefined){
            res.send(400);
            return;
        }

        Member.destroy({
            email: req.params.memberId
        })
        .exec(function (err){
            if (err) {
                return res.negotiate(err);
            }
            sails.log(`Deleted member with ${req.params.memberId} `);
            return res.ok();
        });

    },

    /**
     * Create a member. 
     * Expect member data in the object
     */
    create: (req, res) => {
        if (req.body.member === undefined){
            res.send(400);
            return;
        }

        // TODO: Verify the member does not already exist.

        let member = req.body.member;
        if (member.status === undefined){
            member.status = 1;
        }

        Member.create(member).exec((err, newMember) => {
            if (err){
                res.negotiate(err);
            } 
            else {
                res.send(200, {"memberId": newMember.email});
            }
        });
    },

    /**
     * Return member for the id
     */
    getMemberForId: (req, res) => {
        
        if (req.params.memberId === undefined){
            res.send(400);
            return;
        }

        Member.find(req.params.memberId).exec((err, member) => {
            res.send(200, member);
        })
    }
};

