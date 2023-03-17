const totalExoneratedTd = document.getElementById("total-exonerated");
const totalUnaffectedTd = document.getElementById("total-unaffected");
const totalIgvWithoutDescTd = document.getElementById("total-igv-without-desc");
const totalIgvWithDescTd = document.getElementById("total-igv-with-desc");
const totalIscWithoutDescTd = document.getElementById("total-isc-without-desc");
const totalIscWithDescTd = document.getElementById("total-isc-with-desc");
const totalRcTd = document.getElementById("total-rc");
const totalIcbperTd = document.getElementById("total-icbper");
const totalLineDiscountTd = document.getElementById("total-line-discount");
const totalGlobalDiscountTd = document.getElementById("total-global-discount");
const totalTaxedTd = document.getElementById("total-taxed");
const totalTd = document.getElementById("total");
export const RenderSummary = (summary, decimalsQuantity) => {
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
    totalRcTd.innerHTML = summary.totalRC.toFixed(decimalsQuantity);
    totalIcbperTd.innerHTML = summary.totalICBPER.toFixed(decimalsQuantity);
    totalLineDiscountTd.innerHTML =
        summary.totalLineDiscount.toFixed(decimalsQuantity);
    totalGlobalDiscountTd.innerHTML =
        summary.totalGlobalDiscount.toFixed(decimalsQuantity);
    totalTaxedTd.innerHTML = summary.totalTaxed.toFixed(decimalsQuantity);
    totalTd.innerHTML = summary.total.toFixed(decimalsQuantity);
};
