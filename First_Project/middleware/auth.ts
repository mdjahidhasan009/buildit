import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')

const auth = async(req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({ error: "Token not provided" })
    }

    const [, token] = authorization.split(" ");
    if(!token) {
        return res.status(401).json({ error: "Token not provided" })
    }

    try {
        const userInfo = await jwt.verify(token, 'username');
        req.userInfo = userInfo;
        next();
    } catch (e) {
        console.log('error while verifying jwt')
        console.error(e);
    }

}

module.exports = auth;