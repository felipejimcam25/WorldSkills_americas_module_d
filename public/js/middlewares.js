function verifySession(req, res, next) {
    if(req.session && req.session.user){
        return next();
    }else {
        return res.status(401).json({ message: 'Acceso invalido, Inicie sesion antes de entrar a este endpoint' })
    }
}

module.exports = verifySession;