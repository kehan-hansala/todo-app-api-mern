const jwt = require('jsonwebtoken');

const authMiddleware = (req, resp, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return resp.status(401).json({message: 'authentication header is missing'});
        }
        // bearer ksdjfksflksdjflkdsjfl =>[bearer,sdjfsdjfsdjf]
        const token = authHeader.split(" ")[1];
        if (!token) {
            return resp.status(401).json({message: 'Token missing'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userEmail = decoded.email;
        next();
    } catch (e) {
        resp.status(401).json({message: 'invalid or expired token'});
    }
}
module.exports=authMiddleware;