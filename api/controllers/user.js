const User = require("../../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require("google-auth-library")


module.exports.register = async (req,res)=>{
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists',
                success: false,
            });
        }
        let hash = await bcrypt.hash(req.body.password, 10);
        user =  User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            provider:"Local"
        });
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {expiresIn: '12h'});
        await user.save();

        res.status(200).json({
            message: 'Registered Successfully',
            data: {
                user: user,
                token: token,
            },
            success: true,
        });

    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: 'something went wrong',
            success: false,
        });
    }
}

module.exports.login = async(req,res)=>{
    try {
        let user = await User.findOne({ email: req.body.email })

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).json({
                message: 'Invalid email or password',
                success: false,
            });
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {expiresIn: '12h'});
        
        res.status(200).json({
            message: 'User logged in successfully',
            data: {
                user:{
                    name:user.name,
                    email:user.email,
                    _id:user._id,
                }, 
                token
            },
            success: true,
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
            success: false,
        });
    }
}

module.exports.googleSignup = async( req,res)=>{
    try {
        const client = new OAuth2Client(process.env.OAUTH_CLIENT)

        const {tokenId}=req.body
        client.verifyIdToken({idToken: tokenId, audience:process.env.OAUTH_CLIENT}).then(async (response)=>{
          const {email_verified,name,email} = response.payload;
          if(email_verified){
            let user = await User.findOne({email:email}).select(['-password','-provider'])
              if(user){
                //login the user
                const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {expiresIn: '12h'});
                success=true;
                res.status(200).json({
                    message: 'LogIn Successfully',
                    data: {
                        user: user,
                        token: token,
                    },
                    success: true,
                });
              }
              else{
                //Sign up the user
                const password = email+process.env.JWT_SECRET;
                const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {expiresIn: '12h'});
                let hash = await bcrypt.hash(password, 10);
                user = new User({
                    name: name,
                    email: email,
                    password: hash,
                    provider: "Google"
                });
                await user.save();
                res.status(200).json({
                  message: 'Registered Successfully',
                  data: {
                      user: user,
                      token: token,
                  },
                  success: true,
                });
              }
          }
        })
        
      } catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
            success: false,
        });
      }
}