class SkinModel {
    id : number;
    name : string;
    price : number;
    description : string;
    img : string;

    constructor(id : number, name : string, price : number, description : string, img : string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.img = img;
    }
}

export default SkinModel;