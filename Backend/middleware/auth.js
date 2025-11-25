import jwt from "jsonwebtoken"

const authmiddlerware = async (req, res,next) => {

    const { token } = req.headers;

    if (!token) {

        return res.json({ success: false, message: "not authorized login again" })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();

    } catch (err) {
        
        return res.json({ success: false, message: "Error" });

    }
}


export default authmiddlerware;


