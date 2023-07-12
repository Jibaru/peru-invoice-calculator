import { LineItem } from "./line-item";

export class Summary {
  private lineItems: LineItem[];
  private baseGlobalDiscount: number;
  private startingGlobalDiscount: number;
  private igvPercentage: number;

  constructor(
    startingGlobalDiscount: number,
    baseGlobalDiscount: number,
    igvPercentage: number
  ) {
    this.lineItems = [];
    this.baseGlobalDiscount = baseGlobalDiscount;
    this.startingGlobalDiscount = startingGlobalDiscount;
    this.igvPercentage = igvPercentage;
  }

  public setBaseGlobalDiscount(baseGlobalDiscount: number) {
    this.baseGlobalDiscount = baseGlobalDiscount;
  }

  public setStartingGlobalDiscount(startingGlobalDiscount: number) {
    this.startingGlobalDiscount = startingGlobalDiscount;
  }

  public setIgvPercentage(igvPercentage: number) {
    this.igvPercentage = igvPercentage;
  }

  public addLineItem(lineItem: LineItem) {
    this.lineItems.push(lineItem);
  }

  public get total(): number {
    return (
      this.totalTaxed +
      this.totalExonerated +
      this.totalUnaffected +
      this.totalRCWithoutGlobalDiscount +
      this.totalIGVWithoutGlobalDiscount +
      this.totalISCWithoutGlobalDiscount +
      this.totalICBPER
    );
  }

  public get totalTaxed(): number {
    const total = this.lineItems.reduce((total: number, lineItem: LineItem) => {
      if (lineItem.hasIGV) {
        return total + lineItem.subtotal;
      }

      return total;
    }, 0.0);

    return total - this.baseGlobalDiscount - this.totalFree;
  }

  private get rcPercentages(): Set<number> {
    return new Set(
      this.lineItems.map((lineItem: LineItem) => lineItem.rcPercentage)
    );
  }

  private get iscPercentages(): Set<number> {
    return new Set(
      this.lineItems.map((lineItem: LineItem) => lineItem.iscPercentage)
    );
  }

  public get totalIGVDiscount(): number {
    let totalOverBaseTaxedPercentage = 1.0;
    totalOverBaseTaxedPercentage += this.igvPercentage / 100;

    this.rcPercentages.forEach((percentage: number) => {
      totalOverBaseTaxedPercentage += percentage / 100;
    });

    const taxableBase =
      this.startingGlobalDiscount / totalOverBaseTaxedPercentage;
    totalOverBaseTaxedPercentage = 1.0;

    if (this.igvPercentage != 0) {
      totalOverBaseTaxedPercentage += this.igvPercentage / 100;
    }

    return taxableBase * (totalOverBaseTaxedPercentage - 1);
  }

  public get totalISCDiscount(): number {
    let totalOverBasePercentage = 1.0;
    let totalOverBaseTaxedPercentage = 1.0;

    totalOverBaseTaxedPercentage += this.igvPercentage / 100;

    this.iscPercentages.forEach((iscPercentage: number) => {
      totalOverBasePercentage += iscPercentage / 100;
    });

    const taxableBase =
      this.startingGlobalDiscount / totalOverBaseTaxedPercentage;
    const base = taxableBase / totalOverBasePercentage;

    return base * (totalOverBasePercentage - 1);
  }

  public get totalRCDiscount(): number {
    let totalOverBasePercentage = 1.0;
    let totalOverBaseTaxedPercentage = 1.0;

    totalOverBaseTaxedPercentage += this.igvPercentage / 100;

    this.iscPercentages.forEach((iscPercentage: number) => {
      totalOverBasePercentage += iscPercentage / 100;
    });

    const taxableBase =
      this.startingGlobalDiscount / totalOverBaseTaxedPercentage;

    totalOverBaseTaxedPercentage = 1.0;

    if (this.rcPercentages.size > 0) {
      this.rcPercentages.forEach((rcPercentage: number) => {
        totalOverBaseTaxedPercentage += rcPercentage / 100;
      });
    }

    return taxableBase * (totalOverBaseTaxedPercentage - 1);
  }

  public get totalIGV(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.igvTotal;
    }, 0.0);
  }

  public get totalIGVWithoutGlobalDiscount(): number {
    return this.totalIGV - this.totalIGVDiscount;
  }

  public get totalISC(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.iscTotal;
    }, 0.0);
  }

  public get totalISCWithoutGlobalDiscount(): number {
    return this.totalISC - this.totalISCDiscount;
  }

  public get totalRC(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.rcTotal;
    }, 0.0);
  }

  public get totalRCWithoutGlobalDiscount(): number {
    return this.totalRC - this.totalRCDiscount;
  }

  public get totalICBPER(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.icbperTotal;
    }, 0.0);
  }

  public get totalLineDiscount(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.discount;
    }, 0.0);
  }

  public get totalGlobalDiscount(): number {
    return this.baseGlobalDiscount;
  }

  public get totalUnaffected(): number {
    return this.lineItems.reduce((acc: number, lineItem: LineItem) => {
      if (lineItem.isUnnafected) {
        return acc + lineItem.subtotal;
      }

      return acc;
    }, 0);
  }

  public get totalExonerated(): number {
    return this.lineItems.reduce((acc: number, lineItem: LineItem) => {
      if (lineItem.isExonerated) {
        return acc + lineItem.subtotal;
      }

      return acc;
    }, 0);
  }

  public get totalFree(): number {
    return this.lineItems.reduce((acc: number, lineItem: LineItem) => {
      if (lineItem.isFree) {
        return acc + lineItem.subtotal;
      }

      return acc;
    }, 0);
  }
}
