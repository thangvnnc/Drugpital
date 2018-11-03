"use strict";
class ResError{
    /**
     * Hàm tạo dữ liệu error
     */
    constructor(code, response, message){
        this.code       = code;
        this.message    = message;
	    this.response   = response;
    }

    static from(code, response, message){
        return new ResError(code, response, message);
    }

    static from(code, response, msg, ...args){
        return new ResError(code, response, this.setArgsToMessage(msg, ...args));
    }

    static setArgsToMessage(message, ...args) {
        var msg = message;
        for (var idx = 0; idx < args.length; idx++) {
            msg = msg.replace("{" + idx + "}", args[idx]);
        }
        return msg;
    }
}

module.exports = ResError;
