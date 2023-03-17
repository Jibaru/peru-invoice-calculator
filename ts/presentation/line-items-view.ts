import { LineItem } from "../models/line-item";

const lineRows = document.getElementById("line-rows");

export const RenderLineItem = (
  lineItem: LineItem,
  decimalsQuantity: number
) => {
  const tr = document.createElement("tr");

  let td = document.createElement("td");
  td.textContent = lineItem.quantity.toString();
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = lineItem.name;
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = `${lineItem.unitPrice.toFixed(
    decimalsQuantity
  )} (${lineItem.startingUnitPrice.toFixed(decimalsQuantity)})`;
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = lineItem.unitValue.toFixed(decimalsQuantity);
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = `${lineItem.igvTotal.toFixed(
    decimalsQuantity
  )} (${lineItem.igvPercentage.toFixed(decimalsQuantity)}%)`;
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = `${lineItem.iscTotal.toFixed(
    decimalsQuantity
  )} (${lineItem.iscPercentage.toFixed(decimalsQuantity)}%)`;
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = `${lineItem.rcTotal.toFixed(
    decimalsQuantity
  )} (${lineItem.rcPercentage.toFixed(decimalsQuantity)}%)`;
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = `${lineItem.icbperTotal.toFixed(
    decimalsQuantity
  )} (${lineItem.icbperUnitAmount.toFixed(decimalsQuantity)} x u)`;
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = `${lineItem.discount.toFixed(
    decimalsQuantity
  )} (${lineItem.startingDiscount.toFixed(decimalsQuantity)})`;
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = lineItem.subtotal.toFixed(decimalsQuantity);
  tr.appendChild(td);

  td = document.createElement("td");
  td.textContent = lineItem.total.toFixed(decimalsQuantity);
  tr.appendChild(td);

  lineRows.appendChild(tr);
};

export const ReRenderLineItems = (
  lineItems: LineItem[],
  decimalsQuantity: number
) => {
  lineRows.innerHTML = "";
  for (const lineItem of lineItems) {
    RenderLineItem(lineItem, decimalsQuantity);
  }
};
