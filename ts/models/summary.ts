import { LineItem } from "./line-item";

export class Summary {
  private lineItems: LineItem[];
  private baseGlobalDiscount: number;

  constructor(baseGlobalDiscount: number) {
    this.lineItems = [];
    this.baseGlobalDiscount = baseGlobalDiscount;
  }

  public setBaseGlobalDiscount(baseGlobalDiscount: number) {
    this.baseGlobalDiscount = baseGlobalDiscount;
  }

  public addLineItem(lineItem: LineItem) {
    this.lineItems.push(lineItem);
  }

  public get total(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.total;
    }, 0.0);
  }

  public get subtotal(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.subtotal;
    }, 0.0);
  }

  public get totalIGV(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.igvTotal;
    }, 0.0);
  }

  public get totalISC(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.iscTotal;
    }, 0.0);
  }

  public get totalRC(): number {
    return this.lineItems.reduce((total: number, lineItem: LineItem) => {
      return total + lineItem.rcTotal;
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
}
