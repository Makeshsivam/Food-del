import mangoose from "mongoose";

const foodSchema = new mangoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true}
});

const foodModel = mangoose.models.food||mangoose.model("food",foodSchema);




export default foodModel;