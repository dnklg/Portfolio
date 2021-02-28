let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* GET products page. */
router.get('/products', indexController.displayProductsPage);

/* Get the route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST the route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* Get the route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST the route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* Get to perform Logout */
router.get('/logout', indexController.performLogout);



module.exports = router;
