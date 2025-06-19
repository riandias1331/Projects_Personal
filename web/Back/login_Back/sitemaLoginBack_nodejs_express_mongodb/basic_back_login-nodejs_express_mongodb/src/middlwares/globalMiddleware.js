const globalMiddleware = (req, res, next) => {
  // Middleware logic here
  console.log('Global middleware executed');
  
  // Call the next middleware or route handler
  next();
}

module.exports = globalMiddleware