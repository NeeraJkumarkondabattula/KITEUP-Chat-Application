const User = require('../model/userModel')
const bcrypt = require('bcrypt');

module.exports.register = async (req,res) =>{
    try{
        const {username,email,password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
           return res.json({
                message:"username already is used",
                status:false
            })
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
           return res.json({
                message:"email already is used",
                status:false
            })
        }
        const hashedPassword =await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })
        delete user.password;
        return res.json({
            status:true,
            user
        })
    }catch(err){
        res.status(500).json({
            message:"error while creating new user"
        })
    }
}

module.exports.login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
           return res.json({
                message:"Account not found!",
                status:false
            })
        }else{
            const passwordCheck = await bcrypt.compare(password,user.password)
            if(!passwordCheck){
                return res.json({
                    message:"Password is incorrect!",
                    status:false
                })
            }
            delete user.password;
        return res.json({
            status:true,
            user
        })
        }
    }catch(err){
        res.status(500).json({
            message:"error while creating new user"
        })
    }
}

module.exports.setAvatar= async (req,res)=>{
    try{
        const {id} = req.params;
        const {avatarImage} = req.body;
        const user = await User.findByIdAndUpdate(id,{
            isAvatarImageSet:true,
            avatarImage:avatarImage.url
        })
        return res.json({
            isSet: user.isAvatarImageSet,
            image:user.avatarImage
        })

    }catch(err){
        res.json(err);
    }
}

module.exports.allUsers= async (req,res)=>{
    try{
        const {id} =req.params;
        const users =await User.find({_id:{$ne:req.params.id}}).select([
            "username",
            "email",
            "avatarImage",
            "_id"
        ]);
        return res.json(users);
    }catch(err){

    }
}