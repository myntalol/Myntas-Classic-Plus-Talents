// tooltip_extras.js
function renderSubSpell(spell) {
  const iconHtml = spell.icon
    ? `<img class="inline-icon" src="images/icons/${spell.icon}" alt="">`
    : "";

  const left = (spell.left || []).join("<br>");
  const right = (spell.right || []).join("<br>");
  const req = (spell.requirements || []).join("<br>");

  return `
    <hr class="tooltip-divider">

    <div class="subspell-block">
      <div class="subspell-title">
        ${iconHtml}<span class="text-white">${spell.name}</span>
      </div>

      <div class="tooltip-details-row">
        <div class="tooltip-details-left text-white">${left}</div>
        <div class="tooltip-details-right text-white">${right}</div>
      </div>

      ${req ? `<div class="tooltip-req text-white" style="margin-top:6px;">${req}</div>` : ""}

      <div class="talent-description" style="margin-top:8px;">
        ${spell.body || ""}
      </div>
    </div>
  `;
}