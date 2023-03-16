export class LineItem {
    constructor(name, quantity, startingUnitPrice, iscPercentage, igvPercentage, rcPercentage, startingDiscount, baseGlobalDiscount) {
        this.name = name;
        this.quantity = quantity;
        this.startingUnitPrice = startingUnitPrice;
        this.iscPercentage = iscPercentage;
        this.igvPercentage = igvPercentage;
        this.rcPercentage = rcPercentage;
        this.startingDiscount = startingDiscount;
        this.baseGlobalDiscount = baseGlobalDiscount;
    }
    setBaseGlobalDiscount(baseGlobalDiscount) {
        this.baseGlobalDiscount = baseGlobalDiscount;
    }
    setIgvPercentage(igvPercentage) {
        this.igvPercentage = igvPercentage;
    }
    get hasIGV() {
        return this.igvPercentage != 0;
    }
    get hasISC() {
        return this.iscPercentage != 0;
    }
    get hasRC() {
        return this.rcPercentage != 0;
    }
    get igv() {
        return this.igvPercentage / 100;
    }
    get isc() {
        return this.iscPercentage / 100;
    }
    get rc() {
        return this.rcPercentage / 100;
    }
    get unitValue() {
        let divider = 1.0;
        if (this.hasIGV && this.hasISC && this.hasRC) {
            const firstBase = this.startingUnitPrice / (1 + this.igv + this.rc);
            divider = firstBase / (1 + this.isc);
        }
        else if (this.hasIGV && this.hasISC && !this.hasRC) {
            divider = (1 + this.isc) * (1 + this.igv);
        }
        else if (this.hasISC && !this.hasIGV) {
            divider = 1 + this.isc + this.rc;
        }
        else if (this.hasIGV && !this.hasISC) {
            divider = 1 + this.igv + this.rc;
        }
        return this.startingUnitPrice / divider;
    }
    get unitPrice() {
        const quantity = this.quantity == 0 ? 1 : this.quantity;
        const rcPerUnit = this.rcTotal / this.quantity;
        return this.startingUnitPrice - rcPerUnit;
    }
    get discount() {
        const divider = (1 + this.igv + this.rc) * (1 + this.isc);
        return this.startingDiscount / divider;
    }
    get iscTotal() {
        if (!this.hasISC) {
            return 0;
        }
        return (this.unitValue * this.quantity - this.discount) * this.isc;
    }
    get rcTotal() {
        if (!this.hasRC) {
            return 0;
        }
        let total = (this.unitValue * this.quantity - this.discount + this.iscTotal) *
            this.rc;
        if (this.baseGlobalDiscount != 0) {
            const discount = this.baseGlobalDiscount * this.rcPercentage;
            return total - discount;
        }
        return total;
    }
    get igvTotal() {
        if (!this.hasIGV) {
            return 0;
        }
        return ((this.unitValue * this.quantity - this.discount + this.iscTotal) *
            this.igv);
    }
    get subtotal() {
        return this.quantity * this.unitValue - this.discount;
    }
    get total() {
        return this.unitPrice * this.quantity - this.startingDiscount;
    }
}
