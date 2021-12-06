import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http.exception';
 
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  console.log(error)
  return response.status(status).json({
      status,
      message,
    })
}
 
export default errorMiddleware;