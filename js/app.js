import { GlobalDiscount } from "./models/global-discount.js";
import { LineItem } from "./models/line-item.js";
import { Summary } from "./models/summary.js";
import { RenderLineItem, ReRenderLineItems, } from "./presentation/line-items-view.js";
import { RenderSummary } from "./presentation/summary-view.js";
const addLineForm = document.getElementById("add-line-form");
const globalDiscountInput = document.getElementById("stating-global-discount");
const igvInput = document.getElementById("igv");
const decimalsQuantityInput = document.getElementById("decimals-quantity");
const LINE_ITEMS = [];
let GLOBAL_DISCOUNT = GlobalDiscount.empty();
let IGV_PERCENTAGE = 18;
let DECIMALS_QUANTITY = 4;
const SUMMARY = new Summary(GLOBAL_DISCOUNT.startingGlobalDiscount, GLOBAL_DISCOUNT.baseGlobalDiscount, IGV_PERCENTAGE);
globalDiscountInput?.addEventListener("keyup", (e) => {
    if (globalDiscountInput instanceof HTMLInputElement) {
        GLOBAL_DISCOUNT = new GlobalDiscount(Number(globalDiscountInput.value), new Set(LINE_ITEMS.map((lineItem) => lineItem.igvPercentage)), new Set(LINE_ITEMS.map((lineItem) => lineItem.iscPercentage)), new Set(LINE_ITEMS.map((lineItem) => lineItem.rcPercentage)));
        SUMMARY.setBaseGlobalDiscount(GLOBAL_DISCOUNT.baseGlobalDiscount);
        SUMMARY.setStartingGlobalDiscount(GLOBAL_DISCOUNT.startingGlobalDiscount);
        for (const lineItem of LINE_ITEMS) {
            lineItem.setBaseGlobalDiscount(GLOBAL_DISCOUNT.baseGlobalDiscount);
        }
        RenderSummary(SUMMARY, DECIMALS_QUANTITY);
        ReRenderLineItems(LINE_ITEMS, DECIMALS_QUANTITY);
    }
});
igvInput?.addEventListener("keyup", (e) => {
    if (igvInput instanceof HTMLInputElement) {
        IGV_PERCENTAGE = Number(igvInput.value);
        for (const lineItem of LINE_ITEMS) {
            lineItem.setIgvPercentage(IGV_PERCENTAGE);
        }
        SUMMARY.setIgvPercentage(IGV_PERCENTAGE);
        RenderSummary(SUMMARY, DECIMALS_QUANTITY);
        ReRenderLineItems(LINE_ITEMS, DECIMALS_QUANTITY);
    }
});
decimalsQuantityInput?.addEventListener("keyup", (e) => {
    if (decimalsQuantityInput instanceof HTMLInputElement) {
        DECIMALS_QUANTITY = Number(decimalsQuantityInput.value);
        RenderSummary(SUMMARY, DECIMALS_QUANTITY);
        ReRenderLineItems(LINE_ITEMS, DECIMALS_QUANTITY);
    }
});
addLineForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (addLineForm instanceof HTMLFormElement) {
        const elements = addLineForm.elements;
        const isFree = Boolean(elements["is_free"].checked);
        const igvType = Number(elements["has_igv"].value);
        const values = {
            name: elements["name"].value,
            quantity: Number(elements["quantity"].value),
            igv: igvType == 1 ? IGV_PERCENTAGE : 0,
            isc: Number(elements["isc"].value),
            rc: Number(elements["rc"].value),
            icbper: Number(elements["icbper"].value),
            startingUnitPrice: Number(elements["starting_unit_price"].value),
            startingDiscount: Number(elements["starting_discount"].value),
            baseGlobalDiscount: GLOBAL_DISCOUNT.baseGlobalDiscount,
        };
        const lineItem = new LineItem(values.name, values.quantity, values.startingUnitPrice, values.isc, values.igv, values.rc, values.icbper, values.startingDiscount, values.baseGlobalDiscount, igvType == 3, igvType == 2, isFree);
        LINE_ITEMS.push(lineItem);
        SUMMARY.addLineItem(lineItem);
        RenderLineItem(lineItem, DECIMALS_QUANTITY);
        RenderSummary(SUMMARY, DECIMALS_QUANTITY);
    }
});
