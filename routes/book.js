let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');
let bookController = require('../controllers/book');

// helper function for guard
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


/* Get the route for the book list -> READ operation  */
router.get('/', bookController.displayBookList);

/* Get the route for displaying the ADD page -> CREATE operation  */
router.get('/add', requireAuth, bookController.displayAddPage);

/* POST the route for processing the ADD page -> CREATE operation  */
router.post('/add', requireAuth, bookController.processAddPage);

/* Get the route for displaying EDIT page -> UPDATE operation  */
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/* POST the route for processing EDIT page -> UPDATE operation  */
router.post('/edit/:id', requireAuth, bookController.processEditPage);

/* Get to perform deletion -> DELETE operation  */
router.get('/delete/:id', requireAuth, bookController.performDelete);

module.exports = router;
