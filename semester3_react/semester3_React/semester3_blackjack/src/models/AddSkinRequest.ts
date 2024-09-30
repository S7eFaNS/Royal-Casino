class AddSkinRequest{
    name : string;
    price : number;
    description : string;
    img? : string | null;

    constructor(name : string, price : number, description : string) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

export default AddSkinRequest;