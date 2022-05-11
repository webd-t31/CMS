class SessionMap {

    #register;

    constructor(){
        this.#register = {};
    }

    addSession(token, userData){
        userData.ts = new Date().getTime();
        this.#register[token] = userData;
    }

    checkSession(token){
        if(this.#register[token]){
            return this.#register[token];
        } else return null;
    }

    deleteSession(token){
        if(this.#register[token]){
            let data = this.#register[token];
            delete this.#register[token];
            return data;
        } else return null;
    }

    static serializeData(data){
        return {
            _id: data._id.toString(),
            username: data.username
        }
    }
}

module.exports = SessionMap;