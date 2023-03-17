export class Summary {
    lineItems;
    baseGlobalDiscount;
    startingGlobalDiscount;
    igvPercentage;
    constructor(startingGlobalDiscount, baseGlobalDiscount, igvPercentage) {
        this.lineItems = [];
        this.baseGlobalDiscount = baseGlobalDiscount;
        this.startingGlobalDiscount = startingGlobalDiscount;
        this.igvPercentage = igvPercentage;
    }
    setBaseGlobalDiscount(baseGlobalDiscount) {
        this.baseGlobalDiscount = baseGlobalDiscount;
    }
    setStartingGlobalDiscount(startingGlobalDiscount) {
        this.startingGlobalDiscount = startingGlobalDiscount;
    }
    setIgvPercentage(igvPercentage) {
        this.igvPercentage = igvPercentage;
    }
    addLineItem(lineItem) {
        this.lineItems.push(lineItem);
    }
    get total() {
        return (this.totalTaxed +
            this.totalExonerated +
            this.totalUnaffected +
            this.totalRC +
            this.totalIGVWithoutGlobalDiscount +
            this.totalISCWithoutGlobalDiscount +
            this.totalICBPER);
    }
    get totalTaxed() {
        const total = this.lineItems.reduce((total, lineItem) => {
            if (lineItem.hasIGV) {
                return total + lineItem.subtotal;
            }
            return total;
        }, 0.0);
        return total - this.baseGlobalDiscount - this.totalFree;
    }
    get rcPercentages() {
        return new Set(this.lineItems.map((lineItem) => lineItem.rcPercentage));
    }
    get iscPercentages() {
        return new Set(this.lineItems.map((lineItem) => lineItem.iscPercentage));
    }
    get totalIGVDiscount() {
        let totalOverBaseTaxedPercentage = 1.0;
        totalOverBaseTaxedPercentage += this.igvPercentage / 100;
        this.rcPercentages.forEach((percentage) => {
            totalOverBaseTaxedPercentage += percentage / 100;
        });
        const taxableBase = this.startingGlobalDiscount / totalOverBaseTaxedPercentage;
        totalOverBaseTaxedPercentage = 1.0;
        if (this.igvPercentage != 0) {
            totalOverBaseTaxedPercentage += this.igvPercentage / 100;
        }
        return taxableBase * (totalOverBaseTaxedPercentage - 1);
    }
    get totalISCDiscount() {
        let totalOverBasePercentage = 1.0;
        let totalOverBaseTaxedPercentage = 1.0;
        totalOverBaseTaxedPercentage += this.igvPercentage / 100;
        this.iscPercentages.forEach((iscPercentage) => {
            totalOverBasePercentage += iscPercentage / 100;
        });
        const taxableBase = this.startingGlobalDiscount / totalOverBaseTaxedPercentage;
        const base = taxableBase / totalOverBasePercentage;
        return base * (totalOverBasePercentage - 1);
    }
    get totalIGV() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.igvTotal;
        }, 0.0);
    }
    get totalIGVWithoutGlobalDiscount() {
        return this.totalIGV - this.totalIGVDiscount;
    }
    get totalISC() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.iscTotal;
        }, 0.0);
    }
    get totalISCWithoutGlobalDiscount() {
        return this.totalISC - this.totalISCDiscount;
    }
    get totalRC() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.rcTotal;
        }, 0.0);
    }
    get totalICBPER() {
        return this.lineItems.reduce((total, lineItem) => {
            return total + lineItem.icbperTotal;
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
    get totalUnaffected() {
        return this.lineItems.reduce((acc, lineItem) => {
            if (lineItem.isUnnafected) {
                return acc + lineItem.subtotal;
            }
            return acc;
        }, 0);
    }
    get totalExonerated() {
        return this.lineItems.reduce((acc, lineItem) => {
            if (lineItem.isExonerated) {
                return acc + lineItem.subtotal;
            }
            return acc;
        }, 0);
    }
    get totalFree() {
        return this.lineItems.reduce((acc, lineItem) => {
            if (lineItem.isFree) {
                return acc + lineItem.subtotal;
            }
            return acc;
        }, 0);
    }
}
