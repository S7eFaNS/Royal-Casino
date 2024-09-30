class UserModel {
    id : number;
    name : string;
    email : string;
    balance : number;
    userType : string

    constructor(id : number, name : string, email : string, balance : number, userType : string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.balance = balance;
        this.userType = userType;
    }
}

export default UserModel;