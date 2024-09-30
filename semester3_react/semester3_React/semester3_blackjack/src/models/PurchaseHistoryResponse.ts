class PurchaseHistoryResponse{
    skinId: number;
    itemName : string;
    itemPrice : number;
    purchaseDate : number

    constructor(skinId : number,itemName : string, itemPrice : number, purchaseDate : number) {
        this.skinId = skinId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.purchaseDate = purchaseDate;
    }
}

export default PurchaseHistoryResponse;