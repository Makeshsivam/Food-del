import foodModel from "../models/foodmodel.js";
import fs from "fs";
import foodrouter from "../routes/foodroute.js";
import e from "express";

// add food item

 const addFood = async (req, res) => {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                SUCCESS: false,
                message: "No file uploaded. Make sure the key is 'image' and the uploads folder exists"
            });
        }

        const { name, description, price, category } = req.body;

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: req.file.filename, // safe now
        });

        await food.save();
        res.status(201).json({
            SUCCESS: true,
            message: "Food item added successfully",
            food
        });

    } catch (error) {
        console.error("AddFood Error:", error);
        res.status(500).json({
            SUCCESS: false,
            message: "Error adding food item",
            error: error.message
        });
    }
};


//all food list

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            SUCCESS: true,
            data:foods
        });
    } catch (error) {
        console.error(error);
        res.json({success:false,message:error.message})

}
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food item removed"});
    } catch (error) {
        console.error(error);
        res.json({success:false,message:"error"})
    }   

}




export{ addFood,listFood,removeFood}