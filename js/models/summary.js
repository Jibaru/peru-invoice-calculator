export class Summary {
    constructor(baseGlobalDiscount) {
        this.lineItems = [];
        this.baseGlobalDiscount = baseGlobalDiscount;
    }
    setBaseGlobalDiscount(baseGlobalDiscount) {
        this.baseGlobalDiscount = baseGlobalDiscount;
    }
    addLineItem(lineItem) {
        this.lineItems.push(lineItem);
    }
    get total() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.total;
        }, 0.0);
    }
    get subtotal() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.subtotal;
        }, 0.0);
    }
    get totalIGV() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.igvTotal;
        }, 0.0);
    }
    get totalISC() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.iscTotal;
        }, 0.0);
    }
    get totalRC() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.rcTotal;
        }, 0.0);
    }
    get totalLineDiscount() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.discount;
        }, 0.0);
    }
    get totalGlobalDiscount() {
        return this.baseGlobalDiscount;
    }
}
