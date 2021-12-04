import HttpException from '../exceptions/http.exception';
export const isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        next(new HttpException(403,'로그인이 필요합니다.'));
    }
}

export const isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        next();
    } else {
        next(new HttpException(400,'이미 로그인한 상태입니다.'));
    }
}