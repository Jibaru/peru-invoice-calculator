import { GlobalDiscount } from "./models/global-discount.js";
import { LineItem } from "./models/line-item.js";
import { Summary } from "./models/summary.js";
import {
  RenderLineItem,
  ReRenderLineItems,
} from "./presentation/line-items-view.js";
import { RenderSummary } from "./presentation/summary-view.js";

const addLineForm: HTMLFormElement | HTMLElement | null =
  document.getElementById("add-line-form");
const globalDiscountInput: HTMLElement | HTMLInputElement | null =
  document.getElementById("stating-global-discount");
const igvInput: HTMLElement | HTMLInputElement | null =
  document.getElementById("igv");

const LINE_ITEMS: LineItem[] = [];
const SUMMARY = new Summary(0);
let GLOBAL_DISCOUNT = GlobalDiscount.empty();
let IGV_PERCENTAGE = 18;

globalDiscountInput?.addEventListener("keyup", (e) => {
  if (globalDiscountInput instanceof HTMLInputElement) {
    GLOBAL_DISCOUNT = new GlobalDiscount(
      Number(globalDiscountInput.value),
      new Set(LINE_ITEMS.map((lineItem: LineItem) => lineItem.igvPercentage)),
      new Set(LINE_ITEMS.map((lineItem: LineItem) => lineItem.iscPercentage)),
      new Set(LINE_ITEMS.map((lineItem: LineItem) => lineItem.rcPercentage))
    );

    SUMMARY.setBaseGlobalDiscount(GLOBAL_DISCOUNT.baseGlobalDiscount);

    for (const lineItem of LINE_ITEMS) {
      lineItem.setBaseGlobalDiscount(GLOBAL_DISCOUNT.baseGlobalDiscount);
    }

    RenderSummary(SUMMARY);
    ReRenderLineItems(LINE_ITEMS);
  }
});

igvInput?.addEventListener("keyup", (e) => {
  if (igvInput instanceof HTMLInputElement) {
    IGV_PERCENTAGE = Number(igvInput.value);

    for (const lineItem of LINE_ITEMS) {
      lineItem.setIgvPercentage(IGV_PERCENTAGE);
    }

    RenderSummary(SUMMARY);
    ReRenderLineItems(LINE_ITEMS);
  }
});

addLineForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (addLineForm instanceof HTMLFormElement) {
    const elements = addLineForm.elements;

    const hasIGV = Boolean(elements["has_igv"].value);

    const values = {
      name: elements["name"].value,
      quantity: Number(elements["quantity"].value),
      igv: hasIGV ? IGV_PERCENTAGE : 0,
      isc: Number(elements["isc"].value),
      rc: Number(elements["rc"].value),
      startingUnitPrice: Number(elements["starting_unit_price"].value),
      startingDiscount: Number(elements["starting_discount"].value),
      baseGlobalDiscount: GLOBAL_DISCOUNT.baseGlobalDiscount,
    };

    const lineItem = new LineItem(
      values.name,
      values.quantity,
      values.startingUnitPrice,
      values.isc,
      values.igv,
      values.rc,
      values.startingDiscount,
      values.baseGlobalDiscount
    );

    LINE_ITEMS.push(lineItem);
    SUMMARY.addLineItem(lineItem);

    RenderLineItem(lineItem);
    RenderSummary(SUMMARY);
  }
});
