export class GlobalDiscount {
  constructor(
    public readonly startingGlobalDiscount: number,
    public readonly igvPercentages: Set<number>,
    public readonly iscPercentages: Set<number>,
    public readonly rcPercentages: Set<number>
  ) {}

  public static empty() {
    return new GlobalDiscount(0, new Set(), new Set(), new Set());
  }

  public get baseGlobalDiscount(): number {
    let totalOverBaseTaxedPercentage = 1.0;
    let totalOverBasePercentage = 1.0;

    this.igvPercentages.forEach((percentage: number) => {
      totalOverBaseTaxedPercentage += percentage / 100;
    });

    this.iscPercentages.forEach((percentage: number) => {
      totalOverBasePercentage += percentage / 100;
    });

    this.rcPercentages.forEach((percentage: number) => {
      totalOverBaseTaxedPercentage += percentage / 100;
    });

    return (
      this.startingGlobalDiscount /
      (totalOverBaseTaxedPercentage * totalOverBasePercentage)
    );
  }
}
