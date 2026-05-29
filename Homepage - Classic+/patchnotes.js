// patchnotes.js
// Auto-load WoWHead/Zamimg icon art for patch notes inline icons.
// Usage in HTML:
//   <img class="inline-icon" data-wowicon="ability_warrior_charge.jpg" alt="Charge icon">
// You may omit ".jpg" and it will be added automatically.
//
// Safe to include on every class page; it only updates <img data-wowicon> elements.

(() => {
  "use strict";

  // Choose icon size: "small", "medium", or "large"
  const ICON_SIZE = "small";
  const BASE = "images/icons/";

  function toIconSrc(icon) {
    if (!icon) return "";
    // If already a full URL, keep it.
    if (icon.startsWith("http://") || icon.startsWith("https://")) return icon;
    // Allow "ability_warrior_charge" without extension
    const file = icon.endsWith(".jpg") ? icon : `${icon}.jpg`;
    return BASE + file;
  }

  function hydratePatchNoteIcons(root = document) {
    root.querySelectorAll("img[data-wowicon]").forEach((img) => {
      const icon = img.getAttribute("data-wowicon") || "";
      const src = toIconSrc(icon);
      if (!src) return;

      // Avoid re-setting if already correct
      if (img.getAttribute("src") !== src) img.setAttribute("src", src);

      // Nice defaults if not set in HTML
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
      if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    hydratePatchNoteIcons();
  });

  // Optional: expose for manual use if patch notes HTML is injected later
  window.hydratePatchNoteIcons = hydratePatchNoteIcons;
})();
