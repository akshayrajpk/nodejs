const express = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const connectDB = require('./config/dbConnect')


const user = require('./models/UserModel')
const auth = require('./middleware/auth')

const app = express();

//Connect DB
connectDB()

app.use(express.json({ extend: false}))

app.post('/register', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include Valid Email').isEmail()
], 

auth,

async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password, role, address, age} = req.body;

    try{
        let existCheck = await user.findOne({email})
        if(existCheck){
            return res.status(400).json({errors: [{ msg: 'User Already Exist'}]})
        }

        let userData = new user({
            name,
            email,
            password,
            role,
            address,
            age
        })

        const salt = await bcrypt.genSalt(10)
        userData.password = await bcrypt.hash(password, salt)

        await userData.save()

    }
    catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }

    console.log(req.body)
    res.send('Server Home') 

})

app.post('/login', 
[
    check('email', 'Please include Valid Email').isEmail(),
    check('password', 'Password required').exists()
], 

async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try{
        let existCheck = await user.findOne({email})
        if(!existCheck){
            return res.status(400).json({errors: [{ msg: 'Invalid E-mail'}]})
        }

        const isMatch = await bcrypt.compare(password, existCheck.password)
        if(!isMatch){
            return res.status(400).json({errors: [{ msg: 'Invalid Password'}]})
        }
        
        const payload = {
            user:{
                id: existCheck.id,
                email: existCheck.email,
                address: existCheck.address,
                name: existCheck.name,
                role: existCheck.role
            }
        }

        jwt.sign(payload,config.get('jwtSecret'), {expiresIn: 3600},
        (err, token) => {
            if(err) throw err
            res.json({token, payload})
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }

    // console.log("The log"+typeof(existCheck.id))
    // res.send('Server Home') 

})

app.post('/updateDetails', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include Valid Email').isEmail(),
    check('address', 'Address is required').not().isEmpty()
], 

auth,

async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, address, id} = req.body;

    try{
        let existCheck = await user.findOne({_id: id})
        if(!existCheck){
            return res.status(400).json({errors: [{ msg: 'Invalid Id'}]})
        }

        let userData = {
            name,
            email,
            address
        }       

        await user.updateOne({_id: id},  
            userData, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                return res.status(200).json({ msg: 'Success'})
            } 
        }); 

    }
    catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }

    // console.log(req.body)
    // res.send('Server Home') 

})

app.post('/updatePassword', 
[
    check('password', 'Password is required').not().isEmpty(),
], 

auth,

async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {password, id} = req.body;

    try{
        let existCheck = await user.findOne({_id: id})
        if(!existCheck){
            return res.status(400).json({errors: [{ msg: 'Invalid Id'}]})
        }

        let userData = {
            password
        }  
        
        const salt = await bcrypt.genSalt(10)
        userData.password = await bcrypt.hash(password, salt)

        await user.updateOne({_id: id},  
            userData, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                return res.status(200).json({ msg: 'Password Changed'})
            } 
        }); 

    }
    catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }

    // console.log(req.body)
    // res.send('Server Home') 

})

app.get('/displayList/:role', 

auth,

async (req,res) => {
    let role = req.params.role;
    console.log(role)
    console.log(typeof(role))
    user.find({ role :role }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
            return res.status(200).json(result);
        }
      });
})

app.get('/deleteUser/:id', 

auth,

async (req,res) => {
    let id = req.params.id;
    user.remove({ _id:id }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
            return res.status(200).json({ msg: 'Deleted'})
        }
      });
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))