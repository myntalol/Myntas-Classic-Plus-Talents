/* talent_engine.js
   Shared talent calculator engine (all classes)

   EXPECTS (globals, defined by the class JS loaded BEFORE this file):
     const CLASS_NAME = "Hunter";
     const talentData = { ... };

   HTML must include:
     #points-spent, #reset-button, #tooltip
     For each treeKey in talentData:
       #${treeKey}-grid
       #${treeKey}-points

   CSS should define your exact arrow look (as before) via:
     .talent-arrow-path
     .talent-arrow-glow
     plus the ".available" variants/animations you already had.
*/

(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const GRID_ROWS = 8;
  const GRID_COLS = 4;
  const MAX_POINTS = 51;

  // Keep this at 0 so the marker shape itself provides the overlay feel (as before)
  const ARROW_OVERLAY = 0;

  const ARROW_INACTIVE = "#404040";
  const ARROW_ACTIVE = "#ffd700";

  // -------------------- Guards --------------------
  function assertGlobals() {
    if (typeof CLASS_NAME === "undefined") {
      throw new Error("CLASS_NAME is not defined. Define it in your class JS before talent_engine.js loads.");
    }
    if (typeof talentData === "undefined") {
      throw new Error("talentData is not defined. Define it in your class JS before talent_engine.js loads.");
    }
  }

  // -------------------- State --------------------
  let state = null; // { totalPoints, trees: { [treeKey]: { points, talents: { [id]: n } } } }
  let pointsSpentEl = null;
  let resetButton = null;
  let tooltip = null;

  // Cursor tracking so tooltip never teleports to (0,0)
  let lastMouseX = 0;
  let lastMouseY = 0;

  // Arrow defs per tree
  const arrowDefs = {};

  // -------------------- Utilities --------------------
  function safeGetEl(id) {
    const el = document.getElementById(id);
    if (!el) console.warn(`Missing element #${id}`);
    return el;
  }

  function makeEmptyOccupancy() {
    return Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(false));
  }

  function buildOccupiedMap(treeKey, ignoreIds = []) {
    const ignore = new Set(ignoreIds);
    const occ = makeEmptyOccupancy();
    const talents = talentData[treeKey]?.talents || [];
    talents.forEach(t => {
      if (!t || !t.id) return;
      if (ignore.has(t.id)) return;
      if (typeof t.row !== "number" || typeof t.col !== "number") return;
      if (t.row < 0 || t.row >= GRID_ROWS || t.col < 0 || t.col >= GRID_COLS) return;
      occ[t.row][t.col] = true;
    });
    return occ;
  }

  // Horizontal → Vertical (includes the corner tile), excludes destination tile on vertical leg.
  function isHorizThenVertClear(start, end, occupied) {
    const rowDir = end.row > start.row ? 1 : -1;
    const colDir = end.col > start.col ? 1 : -1;
    const row = start.row;

    // horizontal leg along start.row (INCLUDES corner at [row][end.col])
    for (let c = start.col + colDir; c !== end.col + colDir; c += colDir) {
      if (occupied[row][c]) return false;
    }

    // vertical leg along end.col (EXCLUDES destination [end.row][end.col])
    for (let r = start.row + rowDir; r !== end.row; r += rowDir) {
      if (occupied[r][end.col]) return false;
    }

    return true;
  }

  // Vertical → Horizontal (includes the corner tile), excludes destination tile on horizontal leg.
  function isVertThenHorizClear(start, end, occupied) {
    const rowDir = end.row > start.row ? 1 : -1;
    const colDir = end.col > start.col ? 1 : -1;
    const col = start.col;

    // vertical leg along start.col (INCLUDES corner at [end.row][col])
    for (let r = start.row + rowDir; r !== end.row + rowDir; r += rowDir) {
      if (occupied[r][col]) return false;
    }

    // horizontal leg along end.row (EXCLUDES destination [end.row][end.col])
    for (let c = start.col + colDir; c !== end.col; c += colDir) {
      if (occupied[end.row][c]) return false;
    }

    return true;
  }

  function syncSvgToGrid(svg, grid) {
    const rect = grid.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("preserveAspectRatio", "none");
  }

  // EXACT marker geometry you had working before (same as your warrior/hunter JS)
  function makeMarker(id, fillColor) {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", id);
    marker.setAttribute("viewBox", "0 -4 6 8");
    marker.setAttribute("refX", "1.0");
    marker.setAttribute("refY", "0");
    marker.setAttribute("markerWidth", "12");
    marker.setAttribute("markerHeight", "4");
    marker.setAttribute("orient", "auto");
    marker.setAttribute("markerUnits", "strokeWidth");

    const markerPath = document.createElementNS(SVG_NS, "path");
markerPath.setAttribute("d", "M 0 -2.8 L 3.0 0 L 0 2.8 z");
    markerPath.setAttribute("fill", fillColor);

    // subtle dark outline on arrowhead
markerPath.setAttribute("stroke", "rgba(0, 0, 0, 0.45)");
markerPath.setAttribute("stroke-width", "0.35");
markerPath.setAttribute("paint-order", "stroke fill");
markerPath.setAttribute("stroke-linejoin", "round");

    marker.appendChild(markerPath);
    return marker;
  }

  function ensureArrowSVG(grid, treeKey) {
    let svg = grid.querySelector("svg.talent-arrows");
    if (!svg) {
      svg = document.createElementNS(SVG_NS, "svg");
      svg.classList.add("talent-arrows");
      svg.style.position = "absolute";
      svg.style.inset = "0";
      svg.style.width = "100%";
      svg.style.height = "100%";
      svg.style.pointerEvents = "none";

      // Put arrows above talents so heads can overlay
      svg.style.zIndex = "5";
      svg.style.overflow = "visible";

      grid.appendChild(svg);
    }

    syncSvgToGrid(svg, grid);

    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS(SVG_NS, "defs");
      svg.appendChild(defs);
    }

    const inactiveId = `talent-arrow-head-${treeKey}-inactive`;
    const activeId = `talent-arrow-head-${treeKey}-active`;

    if (!defs.querySelector(`#${CSS.escape(inactiveId)}`)) {
      defs.appendChild(makeMarker(inactiveId, ARROW_INACTIVE));
    }
    if (!defs.querySelector(`#${CSS.escape(activeId)}`)) {
      defs.appendChild(makeMarker(activeId, ARROW_ACTIVE));
    }

    // Ensure BOTH markers (even existing ones) have the outline
    [inactiveId, activeId].forEach(id => {
      const p = defs.querySelector(`#${CSS.escape(id)} path`);
      if (!p) return;
p.setAttribute("stroke", "rgba(0, 0, 0, 0.45)");
p.setAttribute("stroke-width", "0.35");
p.setAttribute("paint-order", "stroke fill");
p.setAttribute("stroke-linejoin", "round");
    });

    return svg;
  }

  // -------------------- Core init --------------------
  function initState() {
    state = {
      totalPoints: 0,
      trees: Object.fromEntries(
        Object.keys(talentData).map(k => [k, { points: 0, talents: {} }])
      )
    };
  }

  function initializeCalculator() {
    Object.entries(talentData).forEach(([treeKey, treeValue]) => {
      const grid = safeGetEl(`${treeKey}-grid`);
      if (!grid) return;

      // Reset grid
      grid.innerHTML = "";
      grid.style.position = "relative";

      // Placeholders
      const slotMap = {};
      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const slot = document.createElement("div");
          slot.style.gridArea = `${r + 1} / ${c + 1}`;
          slot.classList.add("talent-slot-placeholder");
          slotMap[`${r}-${c}`] = slot;
        }
      }

      // Populate talents
      (treeValue.talents || []).forEach(talent => {
        const slot = slotMap[`${talent.row}-${talent.col}`];
        if (!slot) return;

        slot.className = "talent-slot";
        slot.id = talent.id;

        // keep talent tiles below SVG arrows (arrows zIndex is higher)
        slot.style.position = "relative";
        slot.style.zIndex = "1";

        const iconUrl = (talent.icon && (talent.icon.startsWith("http://") || talent.icon.startsWith("https://")))
          ? talent.icon
          : `https://wow.zamimg.com/images/wow/icons/large/${talent.icon}`;

        slot.innerHTML = `
          <img src="${iconUrl}" class="talent-icon" alt="${talent.name}">
          <div class="talent-points">0/${talent.maxPoints}</div>
        `;

        slot.addEventListener("click", (e) => handleTalentClick(treeKey, talent.id, false, e));
        slot.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          handleTalentClick(treeKey, talent.id, true, e);
        });

        slot.addEventListener("mouseenter", (e) => showTooltip(e, treeKey, talent.id));
        slot.addEventListener("mouseleave", hideTooltip);
        slot.addEventListener("mousemove", moveTooltip);

        state.trees[treeKey].talents[talent.id] = 0;
      });

      Object.values(slotMap).forEach(el => grid.appendChild(el));

      // SVG overlay
      ensureArrowSVG(grid, treeKey);

      // Arrow defs
      arrowDefs[treeKey] = [];
      (treeValue.talents || []).forEach(t => {
        if (t.prereq) arrowDefs[treeKey].push({ fromId: t.prereq, toId: t.id });
      });
    });

    rebuildAllArrows();
    updateAllUI();
  }

  function rebuildAllArrows() {
    Object.keys(talentData).forEach(treeKey => {
      const grid = safeGetEl(`${treeKey}-grid`);
      if (!grid) return;

      const svg = ensureArrowSVG(grid, treeKey);

      // remove only paths, keep defs
      svg.querySelectorAll("path.talent-arrow-path, path.talent-arrow-glow").forEach(p => p.remove());

      (arrowDefs[treeKey] || []).forEach(({ fromId, toId }) => {
        const fromTalent = talentData[treeKey].talents.find(t => t.id === fromId);
        const toTalent = talentData[treeKey].talents.find(t => t.id === toId);
        if (!fromTalent || !toTalent) return;
        drawArrow(grid, treeKey, fromTalent, toTalent);
      });
    });
  }

  function drawArrow(grid, treeKey, startTalent, endTalent) {
    const startEl = document.getElementById(startTalent.id);
    const endEl = document.getElementById(endTalent.id);
    if (!startEl || !endEl) return;

    const svg = grid.querySelector("svg.talent-arrows");
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();
    const sRect = startEl.getBoundingClientRect();
    const eRect = endEl.getBoundingClientRect();

    const sCenterX = sRect.left + sRect.width / 2 - svgRect.left;
    const sCenterY = sRect.top + sRect.height / 2 - svgRect.top;
    const eCenterX = eRect.left + eRect.width / 2 - svgRect.left;
    const eCenterY = eRect.top + eRect.height / 2 - svgRect.top;

    const sTopY = sRect.top - svgRect.top;
    const sBottomY = sRect.bottom - svgRect.top;
    const eTopY = eRect.top - svgRect.top;
    const eBottomY = eRect.bottom - svgRect.top;

    const sLeftX = sRect.left - svgRect.left;
    const sRightX = sRect.right - svgRect.left;
    const eLeftX = eRect.left - svgRect.left;
    const eRightX = eRect.right - svgRect.left;

    const sameRow = startTalent.row === endTalent.row;
    const sameCol = startTalent.col === endTalent.col;
    const goingRight = endTalent.col > startTalent.col;
    const goingDown = endTalent.row > startTalent.row;

    let d;

    if (sameCol) {
      const startX = sCenterX;
      const startY = goingDown ? sBottomY : sTopY;
      const tipX = eCenterX;
      const tipY = goingDown ? (eTopY + ARROW_OVERLAY) : (eBottomY - ARROW_OVERLAY);
      d = `M ${startX} ${startY} L ${tipX} ${tipY}`;
    } else if (sameRow) {
      const y = sCenterY;
      const startX = goingRight ? sRightX : sLeftX;
      const tipX = goingRight ? (eLeftX + ARROW_OVERLAY) : (eRightX - ARROW_OVERLAY);
      const tipY = eCenterY;
      d = `M ${startX} ${y} L ${tipX} ${tipY}`;
    } else {
      const occupied = buildOccupiedMap(treeKey, [startTalent.id, endTalent.id]);
      const start = { row: startTalent.row, col: startTalent.col };
      const end = { row: endTalent.row, col: endTalent.col };

      const canHV = isHorizThenVertClear(start, end, occupied);
      const canVH = isVertThenHorizClear(start, end, occupied);

      if (canVH && !canHV) {
        const startX = sCenterX;
        const startY = goingDown ? sBottomY : sTopY;

        const midX = sCenterX;
        const midY = eCenterY;

        const tipX = goingRight ? (eLeftX + ARROW_OVERLAY) : (eRightX - ARROW_OVERLAY);
        const tipY = eCenterY;

        d = `M ${startX} ${startY} L ${midX} ${midY} L ${tipX} ${tipY}`;
      } else {
        const startX = goingRight ? sRightX : sLeftX;
        const startY = sCenterY;

        const midX = eCenterX;
        const midY = sCenterY;

        const tipX = eCenterX;
        const tipY = goingDown ? (eTopY + ARROW_OVERLAY) : (eBottomY - ARROW_OVERLAY);

        d = `M ${startX} ${startY} L ${midX} ${midY} L ${tipX} ${tipY}`;
      }
    }

    const glow = document.createElementNS(SVG_NS, "path");
    glow.setAttribute("d", d);
    glow.setAttribute("class", "talent-arrow-glow");
    glow.id = `arrow-glow-from-${startTalent.id}-to-${endTalent.id}`;
    svg.appendChild(glow);

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("class", "talent-arrow-path");
    path.id = `arrow-from-${startTalent.id}-to-${endTalent.id}`;
    path.setAttribute("marker-end", `url(#talent-arrow-head-${treeKey}-inactive)`);
    svg.appendChild(path);
  }

  // -------------------- Spend / validation --------------------
  function validateTreeState(treeKey) {
    const activeRows = new Set();
    talentData[treeKey].talents.forEach(t => {
      if ((state.trees[treeKey].talents[t.id] || 0) > 0) activeRows.add(t.row);
    });

    for (const row of activeRows) {
      if (row <= 0) continue;
      const required = row * 5;
      let supporting = 0;
      talentData[treeKey].talents.forEach(t => {
        if (t.row < row) supporting += (state.trees[treeKey].talents[t.id] || 0);
      });
      if (supporting < required) return false;
    }

    for (const t of talentData[treeKey].talents) {
      const spent = state.trees[treeKey].talents[t.id] || 0;
      if (spent > 0 && t.prereq) {
        const prereqInfo = talentData[treeKey].talents.find(p => p.id === t.prereq);
        if (!prereqInfo) continue;
        const prereqSpent = state.trees[treeKey].talents[t.prereq] || 0;
        if (prereqSpent < prereqInfo.maxPoints) return false;
      }
    }

    return true;
  }

  function isTalentAvailable(treeKey, talentId) {
    const t = talentData[treeKey].talents.find(x => x.id === talentId);
    if (!t) return false;

    const requiredPoints = t.row * 5;
    if (state.trees[treeKey].points < requiredPoints) return false;

    if (t.prereq) {
      const prereq = talentData[treeKey].talents.find(x => x.id === t.prereq);
      if (!prereq) return false;
      if ((state.trees[treeKey].talents[t.prereq] || 0) < prereq.maxPoints) return false;
    }
    return true;
  }

  function handleTalentClick(treeKey, talentId, isRightClick, evt) {
    const t = talentData[treeKey].talents.find(x => x.id === talentId);
    if (!t) return;
    const current = state.trees[treeKey].talents[talentId] || 0;

    if (evt && typeof evt.pageX === "number" && typeof evt.pageY === "number") {
      lastMouseX = evt.pageX;
      lastMouseY = evt.pageY;
    }

    if (isRightClick) {
      if (current <= 0) return;

      state.trees[treeKey].talents[talentId] = current - 1;
      state.trees[treeKey].points -= 1;

      const ok = validateTreeState(treeKey);
      if (ok) {
        state.totalPoints -= 1;
      } else {
        state.trees[treeKey].talents[talentId] = current;
        state.trees[treeKey].points += 1;
      }
    } else {
      if (!isTalentAvailable(treeKey, talentId)) return;
      if (current >= t.maxPoints) return;
      if (state.totalPoints >= MAX_POINTS) return;

      state.trees[treeKey].talents[talentId] = current + 1;
      state.trees[treeKey].points += 1;
      state.totalPoints += 1;
    }

    updateAllUI();

    if (evt && evt.currentTarget) {
      showTooltip(evt, treeKey, talentId);
    }
  }

  // -------------------- UI updates --------------------
  function updateAllUI() {
    if (pointsSpentEl) pointsSpentEl.textContent = state.totalPoints;

    Object.keys(talentData).forEach(treeKey => {
      const treePointsEl = safeGetEl(`${treeKey}-points`);
      if (treePointsEl) treePointsEl.textContent = state.trees[treeKey].points;

      talentData[treeKey].talents.forEach(talent => {
        const el = document.getElementById(talent.id);
        if (!el) return;

        const pts = state.trees[treeKey].talents[talent.id] || 0;
        const pointsEl = el.querySelector(".talent-points");
        if (pointsEl) {
          pointsEl.textContent = `${pts}/${talent.maxPoints}`;
          pointsEl.classList.toggle("maxed-points", pts === talent.maxPoints);
        }

        el.classList.toggle("maxed", pts === talent.maxPoints);
        el.classList.toggle("available", isTalentAvailable(treeKey, talent.id));

        if (talent.prereq) {
          const available = isTalentAvailable(treeKey, talent.id);

          const arrowPath = document.getElementById(`arrow-from-${talent.prereq}-to-${talent.id}`);
          if (arrowPath) {
            arrowPath.classList.toggle("available", available);
            const baseId = `talent-arrow-head-${treeKey}`;
            arrowPath.setAttribute(
              "marker-end",
              available ? `url(#${baseId}-active)` : `url(#${baseId}-inactive)`
            );
          }

          const glowPath = document.getElementById(`arrow-glow-from-${talent.prereq}-to-${talent.id}`);
          if (glowPath) {
            glowPath.classList.toggle("available", available);
          }
        }
      });
    });
  }

  // -------------------- Tooltip --------------------
  function showTooltip(e, treeKey, talentId) {
    if (!tooltip) return;
    const talentInfo = talentData[treeKey].talents.find(t => t.id === talentId);
    if (!talentInfo) return;

    if (e && typeof e.pageX === "number" && typeof e.pageY === "number") {
      lastMouseX = e.pageX;
      lastMouseY = e.pageY;
    }

    const currentPoints = state.trees[treeKey].talents[talentId] || 0;

    const detailsText = (talentInfo.details || []).map(d => `<div>${d}</div>`).join("");
    const subDetailsText = (talentInfo.subDetails || []).map(d => `<div>${d}</div>`).join("");

    let detailsRowHTML = "";
    if (talentInfo.details || talentInfo.subDetails) {
      detailsRowHTML = `
        <div class="tooltip-details-row has-details">
          <div class="tooltip-details-left">${subDetailsText}</div>
          <div class="tooltip-details-right">${detailsText}</div>
        </div>
      `;
    }

    const dividerHTML = (talentInfo.details || talentInfo.subDetails) ? `<hr class="tooltip-divider">` : "";

    let descriptionHTML = "";
    if (typeof talentInfo.description === "function") {
      if (currentPoints > 0) {
        descriptionHTML += `<div class="talent-description">${talentInfo.description(currentPoints)}</div>`;
      }
      if (currentPoints < talentInfo.maxPoints) {
        if (currentPoints > 0) descriptionHTML += `<div class="next-rank-label">Next rank:</div>`;
        descriptionHTML += `<div class="next-rank-description">${talentInfo.description(currentPoints + 1)}</div>`;
      }
    } else if (typeof talentInfo.description === "string") {
      descriptionHTML += `<div class="talent-description">${talentInfo.description}</div>`;
    }

    let requirementText = "";
    const available = isTalentAvailable(treeKey, talentId);
    if (!available && currentPoints < talentInfo.maxPoints) {
      const req = [];
      if (talentInfo.row > 0) req.push(`Requires ${talentInfo.row * 5} points in ${talentData[treeKey].name}`);
      if (talentInfo.prereq) {
        const prereqInfo = talentData[treeKey].talents.find(t => t.id === talentInfo.prereq);
        if (prereqInfo) req.push(`Requires ${prereqInfo.maxPoints} points in ${prereqInfo.name}`);
      }
      if (req.length) requirementText = `<div class="tooltip-req-points">${req.join("<br>")}</div>`;
    }

    const learnText = (available && currentPoints < talentInfo.maxPoints)
      ? `<div class="tooltip-learn">Click to learn</div>`
      : "";

    tooltip.innerHTML = `
      <h3>${talentInfo.name}</h3>
      <div class="tooltip-type">Talent</div>
      ${detailsRowHTML}
      <div class="tooltip-req">Requires ${CLASS_NAME}</div>
      ${dividerHTML}
      ${descriptionHTML}
      ${requirementText}
      ${learnText}
    `;

    if (talentInfo.subSpell && typeof window.renderSubSpell === "function") {
      tooltip.innerHTML += window.renderSubSpell(talentInfo.subSpell);
    }

    tooltip.style.visibility = "visible";
    moveTooltip(e);
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.style.visibility = "hidden";
  }

 function moveTooltip(e) {
  if (!tooltip) return;

  if (e && typeof e.pageX === "number" && typeof e.pageY === "number") {
    lastMouseX = e.pageX;
    lastMouseY = e.pageY;
  }

  const offset = 15;

  // tooltip dimensions (works once tooltip has content)
  const w = tooltip.offsetWidth || 300;
  const h = tooltip.offsetHeight || 150;

  // desired: TOP-RIGHT of cursor
  let left = lastMouseX + offset;
  let top  = lastMouseY - h - offset;

  // clamp to viewport (account for scroll)
  const minLeft = window.scrollX + 8;
  const minTop  = window.scrollY + 8;
  const maxLeft = window.scrollX + window.innerWidth  - w - 8;
  const maxTop  = window.scrollY + window.innerHeight - h - 8;

  left = Math.max(minLeft, Math.min(left, maxLeft));
  top  = Math.max(minTop,  Math.min(top,  maxTop));

  tooltip.style.left = left + "px";
  tooltip.style.top  = top  + "px";
}

  // -------------------- Boot --------------------
  function boot() {
    assertGlobals();

    pointsSpentEl = safeGetEl("points-spent");
    resetButton = safeGetEl("reset-button");
    tooltip = safeGetEl("tooltip");
 // ✅ INSERT THIS BLOCK RIGHT HERE
  const toggleEmptyBtn = document.getElementById("toggle-empty-slots");
  const LS_KEY = "wow_hide_empty_slots_v1";

  function applyPlaceholderSetting(hidden) {
    document.body.classList.toggle("placeholders-hidden", hidden);
    if (toggleEmptyBtn) {
      toggleEmptyBtn.textContent = hidden ? "Show Slots" : "Hide Slots";
    }
  }

  if (toggleEmptyBtn) {
    applyPlaceholderSetting(localStorage.getItem(LS_KEY) === "1");

    toggleEmptyBtn.addEventListener("click", () => {
      const hidden = !document.body.classList.contains("placeholders-hidden");
      applyPlaceholderSetting(hidden);
      localStorage.setItem(LS_KEY, hidden ? "1" : "0");
    });
  }
  // ✅ END INSERT
    initState();

    if (resetButton) {
      resetButton.addEventListener("click", () => {
        state.totalPoints = 0;
        Object.keys(state.trees).forEach(treeKey => {
          state.trees[treeKey].points = 0;
          Object.keys(state.trees[treeKey].talents).forEach(id => state.trees[treeKey].talents[id] = 0);
        });
        updateAllUI();
      });
    }

    initializeCalculator();

    // Rebuild arrows on resize (prevents drift)
    let raf = null;
    window.addEventListener("resize", () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        rebuildAllArrows();
        updateAllUI();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", boot);
})();