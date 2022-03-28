import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default function authenticateToken (request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) {
		response.json({ success: false })
	}

	jwt.verify((<string>token), <string>process.env.TOKEN_SECRET, (err: any, user: any) => {
		console.log(err)

		if (err) return response.sendStatus(403)

		// request.user = user

		next()
	})
}