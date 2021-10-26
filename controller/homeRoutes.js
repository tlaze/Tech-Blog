const router = require('express').Router();
const { Posts, Users } = require('../models');
const withAuth = require('../utils/auth');


// Displays all posts on homepage
router.get('/', async (req, res) => {
    try{
        const postsData = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ]
        });
        // Serialized post data so it can be read by the handlebars template
        const posts = postsData.map((post) => post.get({ plain: true }));
    
        //renders homepage.handlebars
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn,
        }); 
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

// If user is logged in, directs to dashboard, else goes to log in screen
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
}); 

// Routes to signup page
router.get('/signup', async (req,res) => {
  res.render('signup');
});


// Use withAuth middleware to prevent access to route unless logged in
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
        const userData = await Users.findAll({
            attributes: { exclude: ['password'] },
            include: [{ model: Posts }],
      });
  
      const users = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...users,
        loggedIn: true
      });
    } 
    catch(err) {
        res.status(500).json(err);
    }
});

// Gets Posts by User displayed on the dashboard
router.get('/dashboard/:id', async (req, res) => {
    try {
      const postsData = await Posts.findByPk(req.params.id, {
        include: [
          {
            model: Users,
            attributes: ['username'],
          },
        ],
      });
  
      const post = postsData.get({ plain: true });
  
      res.render('dashboard', {
        ...post,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;