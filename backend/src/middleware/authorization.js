const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ msg: 'Acceso no autorizado' });
    }

    try {
        let [ type, token ] = authorization.split(' ');

        if (type !== 'Bearer') {
            return res.status(401).json({ msg: 'El tipo no corresponde' });
        }

        const openToken = jwt.verify(token, process.env.SECRET);
        console.log(openToken); 

        req.user = openToken.user;
        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Ocurrió un error al verificar el token',
            error
        });
    }
};
