const jwt = require('jsonwebtoken')


const jwtAuthMiddleware = (req, res, next) => {
    const header = req.headers.authorization;

    if (header) {
        const token = header.split(' ')[1];

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export default jwtAuthMiddleware;