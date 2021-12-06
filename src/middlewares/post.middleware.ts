import HttpException from '../exceptions/http.exception';
export const isPostOwner = (req,res,next) => {
    if(req.body.userId == req.user.id){ 
        next();
    } else {
        next(new HttpException(403,'본인이 게시한 사진만 지울 수 있습니다.'));
    }
}
