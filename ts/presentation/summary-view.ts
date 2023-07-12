import { Summary } from "../models/summary";

const totalExoneratedTd: HTMLElement | null =
  document.getElementById("total-exonerated");
const totalUnaffectedTd: HTMLElement | null =
  document.getElementById("total-unaffected");
const totalIgvWithoutDescTd: HTMLElement | null = document.getElementById(
  "total-igv-without-desc"
);
const totalIgvWithDescTd: HTMLElement | null = document.getElementById(
  "total-igv-with-desc"
);
const totalIscWithoutDescTd: HTMLElement | null = document.getElementById(
  "total-isc-without-desc"
);
const totalIscWithDescTd: HTMLElement | null = document.getElementById(
  "total-isc-with-desc"
);
const totalRcWithoutDescTd: HTMLElement | null = document.getElementById(
  "total-rc-without-desc"
);
const totalRcWithDescTd: HTMLElement | null =
  document.getElementById("total-rc-with-desc");
const totalIcbperTd: HTMLElement | null =
  document.getElementById("total-icbper");
const totalLineDiscountTd: HTMLElement | null = document.getElementById(
  "total-line-discount"
);
const totalGlobalDiscountTd: HTMLElement | null = document.getElementById(
  "total-global-discount"
);
const totalTaxedTd: HTMLElement | null = document.getElementById("total-taxed");
const totalTd: HTMLElement | null = document.getElementById("total");

export const RenderSummary = (summary: Summary, decimalsQuantity: number) => {
  totalExoneratedTd.innerHTML =
    summary.totalExonerated.toFixed(decimalsQuantity);
  totalUnaffectedTd.innerHTML =
    summary.totalUnaffected.toFixed(decimalsQuantity);

  totalIgvWithDescTd.innerHTML = summary.totalIGV.toFixed(decimalsQuantity);
  totalIgvWithoutDescTd.innerHTML =
    summary.totalIGVWithoutGlobalDiscount.toFixed(decimalsQuantity);

  totalIscWithDescTd.innerHTML = summary.totalISC.toFixed(decimalsQuantity);
  totalIscWithoutDescTd.innerHTML =
    summary.totalISCWithoutGlobalDiscount.toFixed(decimalsQuantity);

  totalRcWithDescTd.innerHTML = summary.totalRC.toFixed(decimalsQuantity);
  totalRcWithoutDescTd.innerHTML =
    summary.totalRCWithoutGlobalDiscount.toFixed(decimalsQuantity);

  totalIcbperTd.innerHTML = summary.totalICBPER.toFixed(decimalsQuantity);

  totalLineDiscountTd.innerHTML =
    summary.totalLineDiscount.toFixed(decimalsQuantity);

  totalGlobalDiscountTd.innerHTML =
    summary.totalGlobalDiscount.toFixed(decimalsQuantity);

  totalTaxedTd.innerHTML = summary.totalTaxed.toFixed(decimalsQuantity);
  totalTd.innerHTML = summary.total.toFixed(decimalsQuantity);
};
