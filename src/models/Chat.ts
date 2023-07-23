

interface IChat {
    id: number;
    sender_id: number;
    reciver_id: number;
    message?: String;
    send_at: String;
}

class Chat implements IChat {
    id: number;
    sender_id: number;
    reciver_id: number;
    message?: String;
    send_at: String;
    constructor() {
        this.id=1;          
        this.sender_id=1;
        this.reciver_id=2;
        this.message="";
        this.send_at=""
    }
}