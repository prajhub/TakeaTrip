const express = require('express')
const router = express.Router();


const groceryList = [

    {
        item: 'milk',
        quantity: 4,
    },
    {
        item: 'butter',
        quantity: 2,
    },
    {
        item: 'ghee',
        quantity: 6,
    },

]

 router.use((req, res, next) => {
    console.log('Inside Groceries Auth Middleware')
    console.log(req.user)
    if (req.user) next();
    else res.status(401)
 })


router.get('/groceries', (req, res)=> {
    res.send(groceryList)
})


module.exports = router;

