export class LineItem {
  constructor(
    public readonly name: string,
    public readonly quantity: number,
    public readonly startingUnitPrice: number,
    public readonly iscPercentage: number,
    public igvPercentage: number,
    public readonly rcPercentage: number,
    public readonly icbperUnitAmount: number,
    public readonly startingDiscount: number,
    public baseGlobalDiscount: number,
    public readonly isUnnafected: boolean = false,
    public readonly isExonerated: boolean = false,
    public readonly isFree: boolean = false
  ) {}

  public setBaseGlobalDiscount(baseGlobalDiscount: number) {
    this.baseGlobalDiscount = baseGlobalDiscount;
  }

  public setIgvPercentage(igvPercentage: number) {
    this.igvPercentage = igvPercentage;
  }

  public get hasIGV(): boolean {
    return this.igvPercentage != 0;
  }

  public get hasISC(): boolean {
    return this.iscPercentage != 0;
  }

  public get hasRC(): boolean {
    return this.rcPercentage != 0;
  }

  public get hasICBPER(): boolean {
    return this.icbperUnitAmount > 0;
  }

  private get igv(): number {
    if (this.isExonerated || this.isUnnafected) {
      return 0;
    }

    return this.igvPercentage / 100;
  }

  private get isc(): number {
    return this.iscPercentage / 100;
  }

  private get rc(): number {
    return this.rcPercentage / 100;
  }

  public get unitValue(): number {
    let divider = 1.0;

    if (this.hasIGV && this.hasISC && this.hasRC) {
      const firstBase = this.startingUnitPrice / (1 + this.igv + this.rc);
      return firstBase / (1 + this.isc);
    } else if (this.hasIGV && this.hasISC && !this.hasRC) {
      divider = (1 + this.isc) * (1 + this.igv);
    } else if (this.hasISC && !this.hasIGV) {
      divider = 1 + this.isc + this.rc;
    } else if (this.hasIGV && !this.hasISC) {
      divider = 1 + this.igv + this.rc;
    }

    return this.startingUnitPrice / divider;
  }

  public get unitPrice(): number {
    const quantity = this.quantity == 0 ? 1 : this.quantity;

    const rcPerUnit = this.rcTotal / quantity;

    return this.startingUnitPrice - rcPerUnit;
  }

  public get discount(): number {
    const divider = (1 + this.igv + this.rc) * (1 + this.isc);
    return this.startingDiscount / divider;
  }

  public get iscTotal(): number {
    if (!this.hasISC) {
      return 0;
    }

    return (this.unitValue * this.quantity - this.discount) * this.isc;
  }

  public get rcTotal(): number {
    if (!this.hasRC) {
      return 0;
    }

    let total =
      (this.unitValue * this.quantity - this.discount + this.iscTotal) *
      this.rc;

    if (this.baseGlobalDiscount != 0) {
      const discount = this.baseGlobalDiscount * this.rcPercentage;
      return total - discount;
    }

    return total;
  }

  public get igvTotal(): number {
    if (!this.hasIGV) {
      return 0;
    }

    return (
      (this.unitValue * this.quantity - this.discount + this.iscTotal) *
      this.igv
    );
  }

  public get icbperTotal(): number {
    if (!this.hasICBPER) {
      return 0;
    }

    return this.icbperUnitAmount * this.quantity;
  }

  public get subtotal(): number {
    return this.quantity * this.unitValue - this.discount;
  }

  public get total(): number {
    return this.unitPrice * this.quantity - this.startingDiscount;
  }
}
