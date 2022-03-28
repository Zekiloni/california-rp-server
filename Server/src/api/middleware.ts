import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ServerConfig } from '@configs';
import { Lang } from '@constants';


export interface IRequestAccount extends Request {
	username?: string
}


export function generateToken (aUsername: string) {
	return jwt.sign(aUsername, <string>ServerConfig.api.token);
}


export function authenticateToken (request: IRequestAccount, response: Response, next: NextFunction) {
	const authHeader = request.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return response.json({ success: false, message: Lang.notAllowed });
	}

	jwt.verify((<string>token), <string>ServerConfig.api.token, (error: any, aUsername: any) => {
		if (error) 
			return response.sendStatus(403);


		request.username = aUsername;

		next();
	})
}
