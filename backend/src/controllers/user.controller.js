const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword,
            role: role || 'customer',
         });
        return res.json({ newUser });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al crear el usuario',
            error: error.message
        })
    }
};

exports.updateUserById = async (req, res) =>{
    const { username, email, password } = req.body;
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const updateUserById = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, password: hashedPassword},  
            { new: true, runValidators: true }  
        );
        if (!updateUserById)
            return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.json({ updateUserById });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al actualizar el usuario',
            error: error.message
        })
    }

};

exports.login = async (req, res) => {

    const { email, password} = req.body;

    try {
        let foundUser = await User.findOne({ email });
    if (!foundUser){
    return res.status(404).json({ msg: 'Usuario no existe' })
    }
    const isValidPassword = await bcryptjs.compare( password, foundUser.password);
    if (!isValidPassword) {
        return res.status(400).json({ msg: 'Usuario o contraseña no corresponden' });
    }

    const payload = { user: { id: foundUser.id, role: foundUser.role } };
    jwt.sign(
        payload,
        process.env.SECRET,
        {
            expiresIn:3600000,
        },
        (error, token) => {
            if(error) throw error;
            res.json(token);
        }
    )

    } catch(error) {
        res.json({
            msg: 'error al iniciar sesion',
            error
        })
    }
};

exports.verifyUser = async (req, res) =>{
 try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
     } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error al consultar usuario',
            error
        })
    }
};

