import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // generate token
        const token = createeToken(user._id);
        res.json({ success: true, token});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Login failed" });
    }
};



const createeToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// register user
const registerUser = async (req, res) => {
    const { name, password ,email} = req.body;
    try{
        //checking user already exist
        const exist= await userModel.findOne({email});
        if(exist){
            return res.json({success:false, message:"User already exist"});
        }
        //validating email
        if(!validator.isEmail(email)){  
            return res.json({success:false, message:"Invalid email"});
        }

        if(password.length<8){
            return res.json({success:false, message:"Password must be at least 8 characters"});
        }

        //hashing password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        //creating user
        const newUser= new userModel({  
            name:name,
            email:email,
            password:hashedPassword});
        
        const user=await newUser.save();
        const token=createeToken(user._id);
        res.json({success:true,token ,message:"User registered successfully"});

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Registeration failed"});
    }
}


export { loginUser, registerUser };