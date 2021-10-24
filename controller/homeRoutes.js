const router = require('express').Router();
const { Example } = require('../models/index');

router.get('/', async (req, res) => {
    try{
        //renders all.handlebars
        res.render('all'); 
        // const dbExampleData = await Example.findAll();
        // res.status(200).json(dbExampleData);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;