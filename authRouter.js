const user = require('./userModel.js')
const bcrypt = require('bcrypt')
const router = require('express').Router()

router.post('/register' , async (req , res) =>{
    const {username , password} = req.body
    const exist = await user.findOne({username})
    if(exist){
        return res.status(200).json({msg : "Username already exists"})
    }
    hashPswd = await bcrypt.hash(password , 10)
    const newUser = new user({username, password:hashPswd})
    try{
        await newUser.save()
        req.session.userId = newUser._id
        return res.status(200).json({msg: "registration successful"})
    }catch(e){
        console.log(e)
        return res.status(400).json({msg:"Some error took place"})
    }

})

router.post('/login' , async(req,res) => {
    const {username , password} = req.body
    const exist = await user.findOne({username})
    if(exist){
        const valid = await bcrypt.compare(password , exist.password)
        if(valid){
            req.session.userId = exist._id
            return res.status(200).json({msg:"Logged In"})
        }
        return res.status(400).json({msg:"Incorrect Password"})
    }
    return res.status(400).json({msg:"Username Not Found"})
})

router.post('/logout',(req,res)=>{
    if(!req.session){
        return res.status(400).json({msg:"Cant logout when never logged in"})
    }
    req.session.destroy()
    res.clearCookie('connect.sid')
    return res.status(200).json({msg:"Logged out successfully"})
})

module.exports = router