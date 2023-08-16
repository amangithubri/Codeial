const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

// passport.use(new LocalStrategy({
//     usernameField:'email',
//     passReqToCallback:true
    
// },
// async function(email,password,done){
//     const user=await User.findOne({email:email})
        
         
//         if(!user || user.password !=password){
//             req.flash('error',err);
//             console.log('Invalid Username/Password');
            
//             return done(null,false);
//         }
        
//         return done(null,user);
    
// }
// ));
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
   },   async function (req, email, password, done) {
      try {
        let user = await User.findOne({ email: email })
        if (!user) {
          req.flash('error', err);
          return done(null, false);
       }
        if (user.password != password) {
          req.flash('error', 'Invalid User/Passward');
         return done(null, false);
       }
       return done(null, user);
      } catch (err) {
       return done(err);
     }
  
    }));

passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser (async function(id,done){
  const user=await  User.findById(id);
        if(!user){
            
            return done(null,false);
        }
        return done(null,user);
    });


passport.checkAuthentication = function(req,res,next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;

    }
    return next();
}

module.exports=passport;