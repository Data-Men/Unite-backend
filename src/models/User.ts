import query from "../services/db";

interface IUser {
    user_id: number;
    user_name: String;
    name: String;
    mobile_number?: number;
    email?: String;
    save(): void;
    userById(): Object;
}

class User implements IUser {
    user_id: number;
    user_name: String;
    name: String;
    mobile_number?: number;
    email?: String;

    constructor(user_id: number, user_name: String, name: String, mobile_number?: number, email?: String) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.name = name;
        this.mobile_number = mobile_number;
        this.email = email;
    }

    async save() {
        /**
         * creating user
         * @param  user_name    -unique name assigned to a user
         * @param  name         -name
         * @param  mobile_number    -user mobile number 
         * @param  email
         */

        const parameters = [this.user_name, this.name, this.mobile_number, this.email];
        try {

            const q = await query("INSERT INTO user (user_name,name,mobile,email) VALUES ($1,$2,$3,$4)", parameters)

        } catch (error) {
            console.error(error);
        }

    }

    async userById() {
        try {
            return Object({})
        } catch (error) {

        }
    }
}


export default User;