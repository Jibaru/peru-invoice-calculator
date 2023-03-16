const lineRows = document.getElementById("line-rows");
export const RenderLineItem = (lineItem) => {
    const tr = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = lineItem.quantity.toString();
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = lineItem.name;
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = `${lineItem.unitPrice.toFixed(4)} (${lineItem.startingUnitPrice.toFixed(4)})`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = lineItem.unitValue.toFixed(4);
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = `${lineItem.igvTotal.toFixed(4)} (${lineItem.igvPercentage.toFixed(4)}%)`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = `${lineItem.iscTotal.toFixed(4)} (${lineItem.iscPercentage.toFixed(4)}%)`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = `${lineItem.rcTotal.toFixed(4)} (${lineItem.rcPercentage.toFixed(4)}%)`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = `${lineItem.discount.toFixed(4)} (${lineItem.startingDiscount.toFixed(4)})`;
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = lineItem.subtotal.toFixed(4);
    tr.appendChild(td);
    td = document.createElement("td");
    td.textContent = lineItem.total.toFixed(4);
    tr.appendChild(td);
    lineRows.appendChild(tr);
};
export const ReRenderLineItems = (lineItems) => {
    lineRows.innerHTML = "";
    for (const lineItem of lineItems) {
        RenderLineItem(lineItem);
    }
};
