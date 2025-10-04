import mangoose from "mongoose";

 export const connectDB = async () => {
    await mangoose.connect("mongodb+srv://MkSivam:Makesh02022005@cluster0.jdtepge.mongodb.net/food-del").then(()=>console.log("DB connected"));
}