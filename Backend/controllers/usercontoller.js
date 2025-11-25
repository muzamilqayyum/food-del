import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import usermodel from "../models/usermodels.js";
//login user

const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usermodel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "user does't exsist" });
        }

        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });

    } catch (err) {

        return res.json({ success: false, message: "Error" });
    }

}

//register user

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const registeruser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exsists = await usermodel.findOne({ email });

        if (exsists) {
            return res.json({ success: false, message: "user already exists" });
        }

        //validatiing the email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email " })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "please enter a strong password" })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newuser = new usermodel({
            name: name,
            email: email,
            password: hashpassword
        });

        const user = await newuser.save();
        const token = createToken(user._id);

        return res.json({ success: true, token });

    } catch (err) {
       
        res.json({ success: false, message: "Error" });
    }

}

export { loginuser, registeruser };
