const totalIgvTd = document.getElementById("total-igv");
const totalIscTd = document.getElementById("total-isc");
const totalRcTd = document.getElementById("total-rc");
const totalLineDiscountTd = document.getElementById("total-line-discount");
const totalGlobalDiscountTd = document.getElementById("total-global-discount");
const subtotalTd = document.getElementById("subtotal");
const totalTd = document.getElementById("total");
export const RenderSummary = (summary) => {
    totalIgvTd.innerHTML = summary.totalIGV.toFixed(4);
    totalIscTd.innerHTML = summary.totalISC.toFixed(4);
    totalRcTd.innerHTML = summary.totalRC.toFixed(4);
    totalLineDiscountTd.innerHTML = summary.totalLineDiscount.toFixed(4);
    totalGlobalDiscountTd.innerHTML = summary.totalGlobalDiscount.toFixed(4);
    subtotalTd.innerHTML = summary.subtotal.toFixed(4);
    totalTd.innerHTML = summary.total.toFixed(4);
};
