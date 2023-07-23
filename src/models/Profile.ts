import query from "../services/db";
import User from './User';


const user = new User(1, "", "");

interface IProfile {
    user_id: number;
    profile_img: String;
}

class Profile implements IProfile {
    user_id: number;
    profile_img: String;

    constructor() {
        this.user_id = 1;
        this.profile_img = ""
    }
    
}