import { Summary } from "../models/summary";

const totalIgvTd: HTMLElement | null = document.getElementById("total-igv");
const totalIscTd: HTMLElement | null = document.getElementById("total-isc");
const totalRcTd: HTMLElement | null = document.getElementById("total-rc");
const totalLineDiscountTd: HTMLElement | null = document.getElementById(
  "total-line-discount"
);
const totalGlobalDiscountTd: HTMLElement | null = document.getElementById(
  "total-global-discount"
);
const subtotalTd: HTMLElement | null = document.getElementById("subtotal");
const totalTd: HTMLElement | null = document.getElementById("total");

export const RenderSummary = (summary: Summary) => {
  totalIgvTd.innerHTML = summary.totalIGV.toFixed(4);
  totalIscTd.innerHTML = summary.totalISC.toFixed(4);
  totalRcTd.innerHTML = summary.totalRC.toFixed(4);
  totalLineDiscountTd.innerHTML = summary.totalLineDiscount.toFixed(4);
  totalGlobalDiscountTd.innerHTML = summary.totalGlobalDiscount.toFixed(4);
  subtotalTd.innerHTML = summary.subtotal.toFixed(4);
  totalTd.innerHTML = summary.total.toFixed(4);
};
