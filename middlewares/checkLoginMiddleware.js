  module.exports=checkLoginMiddleware = (req,res,next) => {
    if(!req.session.username){
      return res.redirect('/login')
    }
    next()
  }