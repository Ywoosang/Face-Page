import * as express from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import HttpException from '../exceptions/http.exception';

function validationMiddleware<T>(type: any, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}
export default validationMiddleware;


// 객체를 검사 후 오류가 발생하면 에러 미들웨어 호출
// type 으로 Dto 와 request body 검사
// 검사 완료 후 next 호출되므로 request 객체는 변경 없음
// errors 는 에러에 대한 설명이 있는 constraints 오브젝트를 가지고 있는 error의 배열