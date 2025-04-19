exports.Middleware = (req, res, next) => {
    // Middleware para verificar se o usuário está autenticado
    console.log('Middleware executado');
    next();
}