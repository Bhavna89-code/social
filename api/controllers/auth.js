import { db } from '../connect.js'; // Ensure db is connected
import bcrypt from 'bcrypt'; // Import bcrypt
import jwt from 'jsonwebtoken'; 

export const register = (req, res) => {
    // Check if user exists
    const q = "SELECT * FROM users WHERE userName=?";
    
    db.query(q, [req.body.userName], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        // Hash the password
        const salt = bcrypt.genSaltSync(10); // Use genSaltSync
        const hashedPassword = bcrypt.hashSync(req.body.password, salt); // Hash the password

        const insertQuery = "INSERT INTO users (userName, email, password, name) VALUES (?, ?, ?, ?)";
        const values = [req.body.userName, req.body.email, hashedPassword, req.body.name]; // Ensure hashedPassword is used

        db.query(insertQuery, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email=?";
    
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        
        // Check if the user exists
        if (data.length === 0) return res.status(404).json("User Not Found!");

        // Compare the password
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) return res.status(400).json("Wrong Password or UserName");

        // Sign the token
        const token = jwt.sign({ id: data[0].userID }, "secretkey"); // Corrected to jwt.sign

        // Destructure password and send others
        const { password, ...others } = data[0];

        // Send the response with the token in a cookie
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json(others);
    });
};

export const logout = (req, res) => {

}
