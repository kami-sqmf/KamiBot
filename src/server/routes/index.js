const express = require('express');
const router = express.Router();

/* Example 🔽
    router.use('/', function(req,res){
        
    });
*/
router.use('/', function(req,res){
        res.send("Sever Deployed!")
});

module.exports = router;