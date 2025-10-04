import express from "express";
import { addFood ,listFood,removeFood} from "../controllers/foodcontroller.js";
import multer from "multer";

const foodrouter = express.Router();

// Imsage storage
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploads = multer({ storage: storage });

foodrouter.post('/add', uploads.single('image'),addFood);
foodrouter.get("/list",listFood);
foodrouter.post("/remove",removeFood);





export default foodrouter;
