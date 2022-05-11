module.exports = {
    
    sendError(res, e){
        res.status(e.code).json({
            err: e.name,
            msg: e.message
        })
    },

    NoUser : class {
        constructor(userId){
            let msg = `User with ${userId} does not exist`
            super(msg);
            this.name = "NoUser";
            this.message = msg;
            this.code = 400;
        }
    },

    InvalidCredentials : class {
        constructor(userId){
            let msg = `User with ${userId} does not exist`
            super(msg);
            this.name = "InvalidCredentials";
            this.message = msg;
            this.code = 401;
        }
    },

    InvalidToken : class {
        constructor(){
            let msg = `The authorization token sent is invalid`
            super(msg);
            this.name = "InvalidToken";
            this.message = msg;
            this.code = 401;
        }
    },

    InternalServerError : class {
        constructor(msg){
            super(msg);
            this.name = "InternalServerError";
            this.message = msg;
            this.code = 500;
        }
    }

}