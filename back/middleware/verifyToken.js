import jwt from 'jsonwebtoken';

export function verifyToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next(); 
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
    
    
}