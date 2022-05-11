module.exports = {
    
    sendError(res, e){
        e.code = e.code ? e.code : 500;
        res.status(e.code).json({
            err: e.name,
            msg: e.message
        })
    },

    NoUser : class NoUser extends Error {
        constructor(email){
            let msg = `User with email ${email} does not exist`
            super(msg);
            this.name = "NoUser";
            this.message = msg;
            this.code = 400;
        }
    },

    InvalidCredentials : class InvalidCredentials extends Error {
        constructor(email){
            let msg = `Wrong password for user with email ${email} does not exist`
            super(msg);
            this.name = "InvalidCredentials";
            this.message = msg;
            this.code = 401;
        }
    },

    InvalidToken : class InvalidToken extends Error {
        constructor(){
            let msg = `Invalid or no authorization token was sent`
            super(msg);
            this.name = "InvalidToken";
            this.message = msg;
            this.code = 401;
        }
    },

    IncompleteData: class IncompleteData extends Error {
        constructor(){
            let msg = `bad request`
            super(msg);
            this.name = "BadRequest";
            this.message = msg;
            this.code = 400;
        }
    },

    InternalServerError : class InternalServerError extends Error {
        constructor(msg){
            super(msg);
            this.name = "InternalServerError";
            this.message = msg;
            this.code = 500;
        }
    }

}