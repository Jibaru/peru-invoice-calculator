export class GlobalDiscount {
    constructor(startingGlobalDiscount, igvPercentages, iscPercentages, rcPercentages) {
        this.startingGlobalDiscount = startingGlobalDiscount;
        this.igvPercentages = igvPercentages;
        this.iscPercentages = iscPercentages;
        this.rcPercentages = rcPercentages;
    }
    static empty() {
        return new GlobalDiscount(0, new Set(), new Set(), new Set());
    }
    get baseGlobalDiscount() {
        let totalOverBaseTaxedPercentage = 1.0;
        let totalOverBasePercentage = 1.0;
        this.igvPercentages.forEach((percentage) => {
            totalOverBaseTaxedPercentage += percentage / 100;
        });
        this.iscPercentages.forEach((percentage) => {
            totalOverBasePercentage += percentage / 100;
        });
        this.rcPercentages.forEach((percentage) => {
            totalOverBaseTaxedPercentage += percentage / 100;
        });
        return (this.startingGlobalDiscount /
            (totalOverBaseTaxedPercentage * totalOverBasePercentage));
    }
}
