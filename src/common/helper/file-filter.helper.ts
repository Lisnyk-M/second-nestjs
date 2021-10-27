import { HttpException, HttpStatus } from "@nestjs/common";

export const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg'){
       return cb(new HttpException('Extension not allowed', HttpStatus.BAD_REQUEST), false)
    }
    return cb(null, true);
}