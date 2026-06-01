(() => {
  "use strict";

  const STORAGE_PREFIX = "wow_runes_v1_";

  // Large icons for rune slots/options
  const ZAM_ICON_BASE = "images/icons/";
  // Small icons for the wildcard mini-strip
  const ZAM_ICON_BASE_SMALL = "images/icons/";

  // Wildcard config (Rogue Slot 4)
  const WILDCARD_CLASS = "rogue";
  const WILDCARD_SLOT_INDEX = 3;          // slot 4 (0-based)
  const WILDCARD_RUNE_ID = "rogue_wildcard";
  const BORROW_FROM_SLOTS = [0, 1, 2, 4]; // slots 1,2,3,5

  function iconUrl(icon) {
    if (!icon) return "";
    if (icon.startsWith("http://") || icon.startsWith("https://")) return icon;
    const filename = icon.endsWith(".jpg") ? icon : `${icon}.jpg`;
    return ZAM_ICON_BASE + filename;
  }

  function iconUrlSmall(icon) {
    if (!icon) return "";
    if (icon.startsWith("http://") || icon.startsWith("https://")) return icon;
    const filename = icon.endsWith(".jpg") ? icon : `${icon}.jpg`;
    return ZAM_ICON_BASE_SMALL + filename;
  }

  // --- Wild reference helpers ---
  function isWildRef(value) {
    return typeof value === "string" && value.startsWith("wild:");
  }

  function parseWildRef(value) {
    const parts = String(value).split(":");
    if (parts.length !== 3) return null;
    const sourceSlot = Number(parts[1]);
    const runeId = parts[2];
    if (!Number.isFinite(sourceSlot) || sourceSlot < 0 || sourceSlot > 4) return null;
    if (!runeId) return null;
    return { sourceSlot, runeId };
  }

  function buildWildRef(sourceSlot, runeId) {
    return `wild:${sourceSlot}:${runeId}`;
  }

  function findRuneById(runePools, slotIndex, runeId) {
    const pool = runePools[slotIndex] || [];
    return pool.find(r => r.id === runeId) || null;
  }

  // Data (kept exactly as you wrote it)
// ============================
// RUNE SLOT DEFINITIONS
// Slot 1 = RUNE_SLOT_1
// Slot 2 = RUNE_SLOT_2
// Slot 3 = RUNE_SLOT_3
// Slot 4 = RUNE_SLOT_4
// Slot 5 = RUNE_SLOT_5
// ============================

const RUNE_SLOT_1 = 0;
const RUNE_SLOT_2 = 1;
const RUNE_SLOT_3 = 2;
const RUNE_SLOT_4 = 3;
const RUNE_SLOT_5 = 4;

const RUNE_DATA = {
  warrior: [
    /* =========================
       WARRIOR — FEAT SLOT 1
       ========================= */
    [
      { id: "w1", name: "Liquid Courage", icon: "inv_holiday_beerfest_darkiron.jpg", description: "Restores 1% of your total health every 3 seconds while inebriated. Stacks up to 3 times.<br><br>At max stacks, Thunder Clap and Whirlwind strike an additional target." },
      { id: "w2", name: "Not On My Watch", icon: "warrior_talent_icon_blitz.jpg", description: "Your Intervene removes movement impairing effects, can be used in any Stance and reduces the ally's damage taken by 20% for 6 sec.<br><br>If you have Spell Reflect active when using Intervene, the ally gains its effect for 6 sec." },
	{ id: "w7", name: "Artful Butchery", icon: "inv12_ability_warrior_fury", description: "While dual wielding weapons of the same type, the damage done by your offhand weapon increases by 5%.<br><br>While dual wielding weapons of different types, your skill with both increases by 1 for every 20 levels you have attained." },
	{ id: "w18", name: "Brothers in Arms", icon: "ability_warrior_stalwartprotector.jpg", description: "Critically striking an enemy while within 20 yds of another friendly Warrior, Paladin or Shaman inspires you, causing you to deal 5% increased damage with your next 3 abilities. Lasts 10 sec.<hr>This effect can occur once every 30 sec." },
    ],

    /* =========================
       WARRIOR — FEAT SLOT 2
       ========================= */
    [
      { id: "w4", name: "Suicidal Tendencies", icon: "ability_warrior_rampage.jpg", description: "While there are more enemies than allies within 15 yards of you, your damage done and damage taken are increased by 5%." },
 {
  id: "w5",
  name: "Barbaric Throw",
  icon: "inv_axe_1h_garrison_a_01.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Barbaric Throw</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Barbaric Throw",
    icon: "inv_axe_1h_garrison_a_01.jpg",

    // left column (white)
    left: ["5 Rage","Instant","Requires Berserker Stance"],

    // right column (white)
    right: ["5-30 yd range", "30 sec cooldown"],

    // yellow body text
    body: `
     Throw a hatchet at your target, dealing physical damage,  increased by 20% for every active Enrage effect on you. <hr> Successfully striking the target with a melee attack within 3 sec reduces the cooldown of this ability by 50%.
`
  }
},
{ id: "w6", name: "Bloody Business", icon: "ability_warrior_bloodnova.jpg", description: "Your Overpower critical strikes increase your Rend ability's Bleed effect on the target by 5%. Stacks up to 3 times.<br><br>At 3 stacks, the target will instantly take an additional 10% weapon damage whenever you reapply Rend." },
{ id: "w17", name: "Seige Warfare", icon: "inv_crossbow_2h_dragonquest_b_01.jpg", description: "Your next  ranged weapon attack cannot miss, critically strikes and applies one stack of Sunder Armor.<hr>This effect can occur once every 30 sec." },
{ id: "w20", name: "Battering Ram", icon: "inv_1115_warrior_headbutt.jpg", description: "Your Shield Slam deals 100% increased damage to targets that aren't facing you." },
    ],

    /* =========================
       WARRIOR — FEAT SLOT 3
       ========================= */
    [
{ id: "w30", name: "Hero's Armory", icon: "inv_12_profession_blacksmithing_weaponsmithing.jpg", description: "The first slot in your Backpack becomes a <span class='text-white'>Reserve Weapon</span> slot, where you can insert a two-handed melee weapon. You gain the base stats of that weapon as if it were equipped." },
{ id: "w9", name: "Savage Temperment", icon: "ability_warrior_focusedrage", description: "Bloodrage now counts as an Enrage effect.<br><br>Whenever you Execute a target while Bloodrage is active, its duration is extended by 1-2 sec." },
{ id: "w3", name: "Valor Calls", icon: "achievement_guildperk_everyones-a-hero.jpg", description: "Last Stand no longer increases maximum health but instead increases damage dealt by 20%." },
{ id: "w18", name: "Front Line Medicine", icon: "inv_misc_bandage_08.jpg", description: "Increases the effectiveness of your self-healing abilities by 10%. In addition, increases the health gained from bandages, potions, trinket and food effects by 50%." },
{ id: "w69", name: "Legion of Boom", icon: "inv_11_arenaboss_conductionslam.jpg", description: "Your Thunder Clap ability gains increased critical strike chance equal to your hit chance and refreshes the duration of armor reduction effects on targets struck." },
],

    /* =========================
       WARRIOR — FEAT SLOT 4
       ========================= */
    [
 {
  id: "w10",
  name: "Intensify Rage",
  icon: "inv12_apextalent_warrior_rampagingberserker.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Intensify Rage</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Intensify Rage",
    icon: "inv12_apextalent_warrior_rampagingberserker.jpg",

    // left column (white)
    left: ["Instant"],

    // right column (white)
    right: ["3 min cooldown"],

    // yellow body text
    body: `
     Consumes all active enrage effects on you, removing movement impairing effects and gaining increased size and damage per enrage consumed for 20 sec.<hr>You cannot benefit from other enrage effects for the duration.
`
  }
},
{
  id: "w31",
  name: "Weapon in Waiting",
  icon: "inv_1115_warrior_crushingblow.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Primed Strike</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Primed Strike",
    icon: "inv_1115_warrior_crushingblow.jpg",

    // left column (white)
    left: ["15 Rage","Instant","Requires Battle Stance"],

    // right column (white)
    right: ["Melee Range", "30 sec cooldown"],

    // yellow body text
    body: `
     Instantly equip your <span class='text-white'>Reserve Weapon</span> and strike the enemy, dealing 70% weapon damage and triggering its Chance On Hit or Use effect, if it has one.<br><br>Re-equips your previous weapon after 3 sec.<hr>Requires the Hero's Armory feat.
`
  }
},
{ id: "w11", name: "Into The Fray", icon: "inv_1115_warrior_fasterreflexes.jpg", description: "You inspire yourself and the closest party member within 15 yds whenever you Charge, granting 20% movement speed, attack speed, and spell casting speed for 3 sec. <hr> This effect can occur once every 30 sec." },
{ id: "w12", name: "Thrill of the Kill", icon: "achievement_bg_killxenemies_generalsroom.jpg", description: "Standing ontop of a corpse increases your attack speed by 1% for 6 sec. Stacks up to 5 times." },
{ id: "w16", name: "Duelist", icon: "petbattle_attack.jpg", description: "Your Overpower causes your next Revenge to stun the target for 3 sec.<br><br>Your Revenge causes your next Overpower to strike an additional nearby target." },
],

    /* =========================
       WARRIOR — FEAT SLOT 5
       ========================= */
    [
{ id: "w13", name: "Giant's Resolve", icon: "inv_misc_seagiant.jpg", description: "Reduces your movement speed by 15% but causes your attacks to generate 1-3 additional Rage. You are immune to slow effects. Size increased slightly." },
 {
  id: "w14",
  name: "Defense Into Offense",
  icon: "spell_warrior_gladiatorstance.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Gladiator Stance</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Gladiator Stance",
    icon: "achievement_featsofstrength_gladiator_08.jpg",

    // left column (white)
    left: ["Instant"],

    // right column (white)
    right: [""],

    // yellow body text
    body: `
     An aggressive stance that converts 50% of your Defense into Attack Power, reduces threat generation by 30% and allows the use of all abilities that are restricted to other stances while wearing a shield.
`
  }
},
{ id: "w15", name: "Reckless Abandon", icon: "inv_sword_148.jpg", description: "Your Mocking Blow ability can be used in Berkserker Stance, deals 150% weapon damage with both weapons and causes the target to take 20% increased damage from your attacks for the duration." },
{ id: "w16", name: "Fearmonger", icon: "ability_fomor_boss_shout.jpg", description: "Your next Shout ability costs no Rage and reduces the cooldown of your Intimidating Shout by 5%.<hr>This effect can occur once every 30 sec." },
],
  ],

  mage: [
    /* MAGE — FEAT SLOT 1 */ [
{ id: "w1", name: "Fracturing Mind", icon: "spell_arcane_mindmastery.jpg", description: "Experience gains increased by 15%.<br><br>Your spells become unstable. Each spell cast has a 2% to Polymorph you for 3 sec, summon an Unstable Elemental, teleport you to a random location within 5 yds, or alter your damage dealt by a positive or negative amount for 20 sec." },
{ id: "w2", name: "Living Flame", icon: "spell_fire_masterofelements.jpg", description: "Successful Fireball and Balefire Bolts generate a stack of Heat. Lasts 30 sec.<br><br>Upon reaching 10 stacks, you conjure a Living Flame towards your target that deals Fire damage to nearby enemies over 8 sec.<hr>Heat stacks are lost if you become stunned, feared, or incapacitated." },
{ id: "w3", name: "Chromatic Spellslinger", icon: "spell_arcane_arcanepotency_nightborne.jpg", description: "Casting three spells from different schools of magic within 6 sec increases your base stats by 5% for 30 sec." },
{ id: "w4", name: "Winter's Messenger", icon: "spell_mage_iceflows.jpg", description: "Your Blizzard spell is no longer channeled and has a 30 sec cooldown but now slowly follows the lowest health enemy within its radius." },
{
  id: "w5",
  name: "Rune of Time",
  icon: "ability_bossfelmagnaron_rune.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Rune of Time</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Rune of Time",
    icon: "ability_bossfelmagnaron_rune.jpg",

    // left column (white)
    left: ["22% of base mana","Instant"],

    // right column (white)
    right: ["30 yd range","1 min cooldown"],

    // yellow body text
    body: `
     Conjure a time-shifted rune at the target location. All creatures within its radius have their total threat reduced by 10% and their spell haste increased by 10%. Lasts 10 sec.

`
  }
},
],
    /* MAGE — FEAT SLOT 2 */ [
{ id: "w6", name: "Rule-Bending", icon: "inv_inscription_minorglyph13.jpg", description: "Gain 3 additional talent points. These points do not count towards point requirements for accessing higher tiers of talents." },
{
  id: "w7",
  name: "Mystic Orb",
  icon: "inv_ability_voidweaverpriest_entropicrift.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Mystic Orb</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Mystic Orb",
    icon: "inv_ability_voidweaverpriest_entropicrift.jpg",

    // left column (white)
    left: ["11% of base mana","Instant"],

    // right column (white)
    right: ["40 yd range","45 sec cooldown"],

    // yellow body text
    body: `
     Project an orb forward for 12 sec. The magic is determined by your active Armor spell:<br><br>Molten - Deals Fire damage to the closest enemy every sec. Afterwards, the orb burns and disorients all nearby enemies for 3 sec.<br><br>Ice - Deals Frost damage and applies a Chill to all nearby enemies, which reduces movement speed and Frost resistance by 30% for 4 sec.<br><br>Mage - Grants nearby allies an absorption shield every 2 sec. The shield accumulates additional value if allies remain near the orb.
`
  }
},
{ id: "w8", name: "Cryotherapy", icon: "spell_frost_manarecharge.jpg", description: "Your Cone of Cold no longer deals damage but instead numbs the pain of up to 5 friendly targets within its radius, removing 1 Bleed and Disease effect from each and healing them for an amount equal to 40% of your spell damage." },
{ id: "w16", name: "Time Runs Out", icon: "inv_crystalline_powder_orange.jpg", description: "Whenever one of your Temporal Beacons expires, your longest active cooldown is reduced by 3 sec and you restore 5% of your missing mana." },
],
    /* MAGE — FEAT SLOT 3 */ [
{
  id: "w15",
  name: "Invisibility",
  icon: "ability_mage_invisibility.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Invisibility</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Invisibility",
    icon: "ability_mage_invisibility.jpg",

    // left column (white)
    left: ["5% of base mana","Instant"],

    // right column (white)
    right: ["6 min cooldown"],

    // yellow body text
    body: `
     Fades the caster to invisibility over 3 sec, reducing threat each second. The effect is cancelled if you perform or receive any actions. While invisible, you can only see other invisible targets and those whom can see invisible. Lasts 20 sec.

`
  }
},
{ id: "w9", name: "Timeweaver", icon: "inv_12_profession_tailoring_spellthread_purple.jpg", description: "Your Mystic Beam can be cast on friendly targets to heal them and Rewind Time restores up to 10 sec to the duration of Temporal Beacon when cast on a target affected by it." },
{ id: "w17", name: "Trial by Fire", icon: "inv_summerfest_firespirit.jpg", description: "Your Fire damage spells have a 5% chance to cause your next Fire Blast to cost no mana and spread any Fire damage over time effects to nearby enemy targets within 12 yards.<hr>While this feat is active, your Frost and Arcane spells deal 40% less damage." },
{ id: "w18", name: "Winter's Embrace", icon: "spell_ice_lament.jpg", description: "Your Frost Nova spell gains an additional charge. In addition, you gain an absorb shield equal to 100% of your Intellect every 30 sec.<hr>While this feat is active, your Fire and Arcane spells deal 40% less damage." },
{ id: "w22", name: "Elemental Fusion", icon: "inv_10_elementalcombinedfoozles_primordial.jpg", description: "Your Convergence spell gives you a 100% chance to avoid interruption caused by damage and lasts an additional 5 sec." },
],
    /* MAGE — FEAT SLOT 4 */ [
{ id: "w21", name: "Recurrence", icon: "inv_112_raiddimensius_reversegravity.jpg", description: "Arcane Explosion has a 40% chance to cause a smaller, delayed secondary explosion at the same location at 30% effectiveness." },
{ id: "w32", name: "Studious Warcaster", icon: "inv_misc_paperbundle02a.jpg", description: "Your spells have 3% increased chance to hit and cannot partially resist when striking targets affected by your Detect Magic spell." },
{
  id: "w50",
  name: "Thief of Magic",
  icon: "spell_arcane_arcane02.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Spellsteal</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Spellsteal",
    icon: "spell_arcane_arcane02.jpg",

    // left column (white)
    left: ["22% of base mana","Instant"],

    // right column (white)
    right: ["30 yd range"],

    // yellow body text
    body: `
Steals a beneficial magic effect from the target.  This effect lasts a maximum of 2 min.
`
  }
},
{ id: "w23", name: "Steam Elemental", icon: "spell_frost_summonwaterelemental_2.jpg", description: "Maintaining both effects of Hot and Cold at their maximum for at least 30 seconds causes your next Presence of Mind spell to summon a Steam Elemental.<br><br>The Steam Elemental assists you in combat for 5 sec, increased by 5 sec for every talent point placed into Thermal Fluctuation." },
{ id: "w24", name: "Empowered Blink", icon: "ability_socererking_arcaneacceleration.jpg", description: "Reduces the mana cost of your Blink spell by 50%. In addition, your spell haste is increased by 3% for every enemy you Blink through. Stacks up to 5 times. Lasts 10 sec." },
],
    /* MAGE — FEAT SLOT 5 */ [
{ id: "w25", name: "Rematerialize", icon: "inv_112_arcane_buff.jpg", description: "Your Disintegrate spell heals all party members within 20 yds of the target for 200% of the damage it deals, but its damage is dealt over 30 sec." },
{ id: "w26", name: "Temporal Interloper", icon:"ability_titankeeper_residualcorruption.jpg", description: "Casting Rewind Time on an alternate version of yourself breaks reality, summoning 3 additional versions of you. Whether these beings are friendly or hostile is uncertain. Lasts 30 sec." },
{ id: "w27", name: "Cauterize", icon:"spell_fire_rune.jpg", description: "Fatal damage instead brings you to 30% health. However, you will burn for 4% of your maximum health every 1 sec for the next 6 sec.<hr>This effect can occur once every 6 min." },
{ id: "w29", name: "Icicles", icon:"artifactability_frostmage_blackicicles.jpg", description: "Taking damage while Frost Armor is active has a 5% chance to generate an Icicle above you.<br><br>Upon collecting 3, your next offensive spell triggers them to fire at your current target, dealing Frost damage. Icicles melt after 30 sec." },
{ id: "w28", name: "One Step Behind", icon:"spell_azerite_essence13.jpg", description: "After casting Blink, it is replaced with Reflection for 10 sec. Casting Reflection teleports you back to where you last Blinked." },
],
  ],

  rogue: [
    /* ROGUE — FEAT SLOT 1 */ [
{ id: "w1", name: "Blade Runner", icon:"ability_rogue_focusedattacks.jpg", description: "You move 20% faster while in Stealth and your Sprint ability makes you immune to Daze effects for the duration." },
{
  id: "w2",
  name: "Sneaky Sniper",
  icon: "ships_ability_armorpiercingammo.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Between The Eyes</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Between The Eyes",
    icon: "ships_ability_armorpiercingammo.jpg",

    // left column (white)
    left: ["35 Energy","Instant","Requires Ranged Weapon"],

    // right column (white)
    right: ["20 yd range","20 sec cooldown"],

    // yellow body text
    body: `
     A Ranged Weapon finishing move that stuns the target for 1 sec per combo point:<br><br>
1 point: 80% damage<br>2 points: 90% damage<br>3 points: 100% damage<br>4 points: 110% damage<br>5 points: 120% damage<br><br>Cooldown shared with Kidney Shot.<hr>Requires a gun in your inventory.
`
  }
},
{ id: "w3", name: "Poison Gas", icon:"inv_engineering_gunpowdercharge.jpg", description: "Your Distract and Smoke Bomb abilities leave behind toxic gas for 10 sec. Enemies within the area suffer damage equal to your highest rank of Instant Poison every 2 seconds." },
{ id: "w28", name: "Derisive Tactics", icon:"ability_rogue_murderspree.jpg", description: "Your Expose Armor and Rupture abilities generate significantly increased threat. In addition, your Slice and Dice ability increases your Parry chance by 2% per Combo Point. " },
{ id: "w31", name: "Wounded Animal", icon:"ability_demonhunter_bloodlet.jpg", description: "While above 40 Energy, your Bleed effects have a 10% chance to deal double damage but drain 2 Energy." },
],
    /* ROGUE — FEAT SLOT 2 */ [
{ id: "w6", name: "What Doesn't Kill You...", icon:"ability_rogue_sturdyrecuperate.jpg", description: "Taking damage while below 50% total Health has a 10% chance to grant you Adrenaline Rush for 3 sec. This chance is increased to 100% while below 20% total Health.<hr>Requires the Adrenaline Rush talent." },
{ id: "w7", name: "Azerothian Scoundrel", icon:"ability_rogue_nightblade.jpg", description: "Every 4 sec in combat, your Sinister Strike gains 2% increased damage and critical strike chance. Lose 1 stack each second while out of combat. Stacks up to 5 times." },
{ id: "w9", name: "Criminal Background", icon:"inv_misc_token_pvp02.jpg", description: "Your first Backstab, Ambush or Garrote ability refunds its Energy cost and increases your attack speed by 10% for 6 sec.<hr>This effect can occur once every 30 sec." },
{ id: "w10", name: "Masochism", icon:"inv_lightforgedmatrixability_felheartofargus.jpg", description: "Dealing damage with Rupture has a 10% chance to enable your next Garrote to be usable outside of Stealth, but you suffer its effects as well." },
],
    /* ROGUE — FEAT SLOT 3 */ [
{ id: "w26", name: "On The Run", icon:"rogue_burstofspeed.jpg", description: "You can bandage while moving and without removing Stealth. In addition, you gain 15 Energy whenever you enter Stealth or Vanish." },
{
  id: "w12",
  name: "Goblin Super Serum",
  icon: "inv_11_0_raid_gruesomesyringe_yellow.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Goblin Super Serum</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Goblin Super Serum",
    icon: "inv_11_0_raid_gruesomesyringe_yellow.jpg",

    // left column (white)
    left: ["10% of total health","Instant"],

    // right column (white)
    right: ["1 sec cooldown"],

    // yellow body text
    body: `
     Inject yourself with a suspicous serum that increases your maximum health by 5% but reduces your damage done and damage taken by 4%. Stacks up to 5 times. Lasts 1 min.<hr>Each subsequent dose inoculates you, reducing health lost during injections by 1%.
`
  }
},
{ id: "w17", name: "Gnawing Poisons", icon:"ability_creature_poison_01.jpg", description: "Your damaging finishing moves deal additional Nature damage based on your Deadly Poison doses on the target." },
{ id: "w30", name: "Brains Over Brawn", icon:"inv_misc_organ_03.jpg", description: "Increases your Parry chance by 0.06% and your Energy regeneration rate by 0.08% for every point of Intellect." },
{ id: "w18", name: "Stalking Death", icon:"ability_rogue_deadliness.jpg", description: "For 6 seconds after exiting Stealth you can use Garrote, Ambush, Cheap Shot, Premeditation, Pickpocket and Disarm Trap.<hr>This effect can occur once every 60 sec." },
],
    /* ROGUE — FEAT SLOT 4 */ [
{ id: "w16", name: "Cowl of Carnage", icon:"inv_helm_armor_banditmask_c_01.jpg", description: "Your helmet slot takes on the appearance of a red hood.<br><br>Riposte, Ghostly Strike and Shiv deal 20% increased damage to targets afflicted by atleast two of your Bleed effects." },
{ id: "w14", name: "Veil of Solitude", icon:"inv_misc_bandana_01.jpg", description: "Your helmet slot takes on the appearance of a dark bandana.<br><br>Shadowstep may be used on corpses and grants Ghosting for 10 sec.<hr>Ghosting increases your chance to Dodge by 10% and allows you to Backstab enemies facing you." },
{ id: "w4", name: "Eyepatch of Piracy", icon:"inv_helm_armor_pirateeyepatch_b_01_blackpirate.jpg", description: "Your helmet slot takes on the appearance of an eyepatch.<br><br>Your Between The Eyes ability gains 5 yds of range, your Broadside ability ignores armor, and your Quick Draw ability has its cooldown reduced by 5 sec." },
{ id: "w15", name: "Mask of Antagonism", icon:"ability_rogue_disguise.jpg", description: "Your helmet slot takes on the appearance of a white mask.<br><br>Feint no longer lowers your threat but instead taunts the target to attack you." },
{ id: "rogue_wildcard", name: "Wildcard", icon: "inv_misc_hearthstonecard_epic.jpg", description: "Allows you to select a non-active feat from any other slot and use it in this slot.", isWildcard: true
    },
],
    /* ROGUE — FEAT SLOT 5 */ [
{
  id: "w25",
  name: "Plunderbuss",
  icon: "inv_legendary_gun.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Quick Draw</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Quick Draw",
    icon: "inv_legendary_gun.jpg",

    // left column (white)
    left: ["20 Energy","Instant"],

    // right column (white)
    right: ["20 yd range","8 sec cooldown"],

    // yellow body text
    body: `
Draw a concealed pistol and shoot your target, dealing Fire damage. Awards 1 Combo Point.<hr>Requires a gun in your inventory.
`
  }
},
{ id: "w11", name: "Bleeding Scars", icon:"ability_rogue_deathmark.jpg", description: "Your Hemorrhage ability also causes the target to bleed, dealing 20% of the initial damage over 15 sec." },
{
  id: "w15",
  name: "Explosive Rat",
  icon: "inv_111_rat_white.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Explosive Rat</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Explosive Rat",
    icon: "inv_111_rat_white.jpg",

    // left column (white)
    left: ["40 Energy","Instant"],

    // right column (white)
    right: ["30 yd range","45 sec cooldown"],

    // yellow body text
    body: `
     Place an rat strapped with dynamite on the ground, which proceeds to pursue the furthest enemy you are in combat with for up to 10 sec.<br><br>If the rat reaches its target, it explodes, dealing Fire damage to all enemies within 10 yds and resetting the cooldown of this ability.
`
  }
},
{ id: "w27", name: "Cloak of Shadows", icon:"spell_shadow_nethercloak.jpg", description: "Whenever you fall below 30% maximum health you are cleansed of all harmful spell effects.<hr>This effect can occur once every 90 sec." },
{ id: "w13", name: "Counterfeit Actuator", icon:"inv_12_profession_engineering_manufacturedparts_battery_purple.jpg", description: "Parrying an attack causes your longest trinket cooldown to recover 1 sec faster.<br><br>Activating a trinket causes your next Feint within 6 sec to cost no Energy and incur no cooldown.<hr>This effect can occur once every 10 sec." },
],
  ],

  priest: [
    /* PRIEST — FEAT SLOT 1 */ [
{
  id: "w3",
  name: "Power Word: Sacrifice",
  icon: "priest_spell_leapoffaith_b.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Power Word: Sacrifice</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Power Word: Sacrifice",
    icon: "priest_spell_leapoffaith_b.jpg",

    // left column (white)
    left: ["10% of base mana","Instant"],

    // right column (white)
    right: ["30 yd range","1 min cooldown"],

    // yellow body text
    body: `
     Exchange places with a friendly target, removing the Weakened Soul effect from both of you and swapping total threat for 6 sec.
`
  }
},
{
  id: "w2",
  name: "Holy Word: Sanctify",
  icon: "spell_priest_chakra.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Holy Word: Sanctify</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Holy Word: Sanctify",
    icon: "spell_priest_chakra.jpg",

    // left column (white)
    left: ["5% of base mana","Instant"],

    // right column (white)
    right: ["2 min cooldown"],

    // yellow body text
    body: `
     Increases the enemy target's Holy damage taken or the friendly target's healing done by 10% for 15 sec.
`
  }
},
{
  id: "w1",
  name: "Shadow Word: Sorrow",
  icon: "spell_misc_emotionsad.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Shadow Word: Sorrow</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Shadow Word: Sorrow",
    icon: "spell_misc_emotionsad.jpg",

    // left column (white)
    left: ["16% of base mana","Instant"],

    // right column (white)
    right: ["20 yd range","30 sec cooldown"],

    // yellow body text
    body: `
     Shroud a location in darkness for 10 sec. Enemies within the area cannot dash, blink, teleport or leap and take rapidly increasing Shadow damage every sec.`}
},
],
    /* PRIEST — FEAT SLOT 2 */ [
{
  id: "w4",
  name: "Shadow Mending",
  icon: "spell_priest_shadow-mend.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Your <span class="text-white">Flash Heal</span> spell transforms into:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Shadow Word: Mend",
    icon: "spell_priest_shadow-mend.jpg",

    // left column (white)
    left: ["10% of base mana","1 sec cast"],

    // right column (white)
    right: ["40 yd range"],

    // yellow body text
    body: `
     Heals a target but causes them to suffer 30% of the healing as Shadow damage over 6 sec.<hr>This spell ignores healing reduction effects but cannot critically hit.
`
  }
},
{ id: "w15", name: "The Dark Descent", icon:"spell_nzinsanity_shortsighted.jpg", description: "You are afflicted with Insanity every second while in combat, causing various effects:<hr>5 - Mind Blast dazes the target for 3 sec.<br><br>10 - Mind Flay can be cast while moving.<br><br>15 - Fade removes slow effects.<br><br>20 - A shadowy figure aids you for 10 sec.<br><br>25 - Mind Flay damage increased by 15%.<br><br>50 - Your mind collapses. Maximum Health reduced by 5% every sec.<hr>Requires Shadowform. Stacks reset after losing your memory, exiting Shadowform or dying." },
{ id: "w24", name: "Devotion", icon:"spell_priest_pathofdevout.jpg", description: "Increases your movement speed by 10% when running towards a target party or raid member that is below 20% total health." },
{ id: "w10", name: "Penitent Fire", icon:"ability_mage_firestarter.jpg", description: "Your third Penance bolt refreshes the duration of your Holy Fire's periodic effect on enemies or reduces your Weakened Soul effect on allies by 2 sec." },
{ id: "w7", name: "Guardian Angel", icon:"spell_holy_guardianspirit.jpg", description: "Whenever you fall below 30% health, a spirit descends to watch over you, increasing your healing received by 40%. Lasts 10 sec.<hr>This effect can occur once every 90 sec." },
],
    /* PRIEST — FEAT SLOT 3 */ [
{ id: "w6", name: "Shared Trauma", icon:"inv12_ability_priest_madness_scream.jpg", description: "30% of all damage you deal while enemies are affected by your Psychic Scream remains in their subconscious. When Psychic Scream ends, each target affected takes Shadow damage equal to the stored amount." },
{
  id: "w19",
  name: "Empowered Shadows",
  icon: "warlock_curse_shadow.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Your Shadowfiend lasts 5 sec longer and learns the <span class="text-white">Shadowcrawl</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Shadowcrawl",
    icon: "warlock_curse_shadow.jpg",

    // left column (white)
    left: ["Instant","Requires Shadowfiend"],

    // right column (white)
    right: ["30 yd range","10 sec cooldown"],

    // yellow body text
    body: `
     Teleport to an enemy target, dealing Shadow damage and disarming them for 3 sec.
`
  }
},
{ id: "w26", name: "Arbiter", icon:"ability_priest_holybolts01.jpg", description: "Your Smite and Holy Nova spells always critically strike targets below 20% total health." },
{ id: "w8", name: "Cup Runneth Over", icon:"inv_offhand_pvealliance_d_01.jpg", description: "You or a party  member can click your Lightwell to overload it, unleashing a halo that burns all enemies for Holy damage and heals all allies within 40 yards, but this expends 5 charges." },
{ id: "w5", name: "Clarity of Purpose", icon:"ability_priest_angelicbulwark.jpg", description: "While you are out of combat, Power Word: Shield costs no mana and increases the target's movement speed by 20% for 3 sec." },
],
    /* PRIEST — FEAT SLOT 4 */ [
{ id: "w20", name: "Twisted Faith", icon:"spell_shadow_mindtwisting.jpg", description: "Increases the Holy damage done by your Chastise spell by 10% if the target is afflicted by your Shadow Word: Pain." },
{ id: "w21", name: "Amnesia", icon:"spell_shadow_brainwash.jpg", description: "Your Silence spell can be cast on yourself to alleviate your mind. Instead of being silenced, it resets the cooldown of your longest Shadow Word spell and all stacks of Insanity." },
{ id: "w16", name: "Purging Light", icon:"inv_ability_holyfire_debuff.jpg", description: "Each detonation of your Absolution spell reduces the cast time of your next Holy Fire or Penance by 10%. Stacks up to 5 times. Lasts 10 sec." },
{ id: "w17", name: "Shared Fate", icon:"ability_pvp_innerrenewal.jpg", description: "Your Binding Heal spell creates a shared absorption shield on you and the target equal to 30% of the amount healed. Lasts 10 sec." },
{ id: "w18", name: "Serendipity", icon:"spell_holy_serendipity.jpg", description: "Healing with Flash Heal reduces the cast time of your next Lesser Heal, Heal or Greater Heal by 20% for 30 sec. Stacks up to 3 times." },
],
    /* PRIEST — FEAT SLOT 5 */ [
{
  id: "w22",
  name: "Hymn of Horror",
  icon: "spell_shadow_coneofsilence.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Hymn of Horror</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Hymn of Horror",
    icon: "spell_shadow_coneofsilence.jpg",

    // left column (white)
    left: ["10% of base mana","Channeled (8 sec cast)"],

    // right column (white)
    right: ["40 yd range","5 min cooldown"],

    // yellow body text
    body: `
     Your shrieks conjure malignant spirits every 1 sec for 8 sec that pursue your enemies and deal Shadow damage that heals the Priest.<hr>The Priest must channel to maintain the spell.
`
  }
},
{
  id: "w9",
  name: "Hymn of Hope",
  icon: "spell_holy_divinehymn.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Hymn of Hope</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Hymn of Hope",
    icon: "spell_holy_divinehymn.jpg",

    // left column (white)
    left: ["10% of base mana","Channeled (8 sec cast)"],

    // right column (white)
    right: ["30 yd range","8 min cooldown"],

    // yellow body text
    body: `
     Your singing restores 3% mana to 3 nearby friendly party or raid targets every 2 sec for 8 sec, and allows their Mana to regenerate at a 50% rate while casting for 8 sec.<hr>The Priest must channel to maintain the spell.
`
  }
},
{
  id: "w12",
  name: "Hymn of Humility",
  icon: "spell_holy_impholyconcentration.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Hymn of Humility</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Hymn of Humility",
    icon: "spell_holy_impholyconcentration.jpg",

    // left column (white)
    left: ["10% of base mana","Channeled (8 sec cast)"],

    // right column (white)
    right: ["30 yd range","6 min cooldown"],

    // yellow body text
    body: `
    Your chanting numbs the pain, reducing the damage taken by you and your party members by 30% and providing immunity to silence and interrupt effects for 8 sec.<hr>The Priest must channel to maintain the spell.
`
  }
},
],
  ],

  warlock: [
    /* WARLOCK — FEAT SLOT 1 */ [
{ id: "w1", name: "Soul Power", icon:"inv_misc_supersoulash.jpg", description: "Consuming a Soul Shard increases your movement speed, Spirit and experience gains by 1% for 2 min. Stacks up to 10 times." },
{ id: "w2", name: "Draining Proficiency", icon:"ability_warlock_soulsiphon.jpg", description: "Your Drain Soul spell has a 15% chance per tick to refresh the duration of your Unstable Affliction on targets at or below 20% total health." },
{ id: "w3", name: "Hellfire Attunement", icon:"ability_demonhunter_fierybrand.jpg", description: "While burning from any periodic Fire effect your movement speed and spell critical strike chance are increased by 10%. " },
{ id: "w12", name: "Shadow Lash", icon:"ability_demonhunter_soulcleave2.jpg", description: "While in Metamorphosis, your melee attacks make your next Shadow Bolt spell instant cast but reduce its range by 20 yds. Lasts 30 sec." },
],

    /* WARLOCK — FEAT SLOT 2 */ [
{
  id: "w4",
  name: "Infernal Shroud",
  icon: "ability_warlock_moltencore.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Infernal Shroud</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Infernal Shroud",
    icon: "ability_warlock_moltencore.jpg",

    // left column (white)
    left: ["5% of base mana","Channeled (8 sec cast)"],

    // right column (white)
    right: ["10 min cooldown"],

    // yellow body text
    body: `
    Wrap yourself in hellfire, preventing all damage for 8 sec. When the channel ends, you take 60% of the damage prevented over 8 sec.
`
  }
},
{ id: "w5", name: "Zoonotic Fel", icon:"ability_warlock_chaosbolt.jpg", description: "Your summoned demon's critical strikes have a chance to spread a demonic virus to a nearby friendly target's pet, increasing its damage dealt and damage taken by 10%. Lasts 15 sec." },
{ id: "w13", name: "Delicious Souls", icon:"spell_shadow_soulleech_1.jpg", description: "You receive 30% more healing from using a Healthstone and using one grants you 10% spell haste for 10 sec." },
{ id: "w16", name: "Don't Look", icon:"spell_nzinsanity_dontlook.jpg", description: "Reduces the cast time of your Eye of Kilrogg spell by 60% and causes it to explode when dismissed or killed, unleashing Death Coils on up to 5 enemies facing it within 15 yds." },

],
    /* WARLOCK — FEAT SLOT 3 */ [
{
  id: "w6",
  name: "Nether Warp",
  icon: "inv_magemount_fel.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Nether Warp</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Nether Warp",
    icon: "inv_magemount_fel.jpg",

    // left column (white)
    left: ["16% of base mana","Instant"],

    // right column (white)
    right: ["30 yd range","30 sec cooldown"],

    // yellow body text
    body: `
    Create a sigil of fel magic at the target location that takes 3 seconds to power up. Afterwards, the sigil teleports the first enemy to step on it to your location.<hr>Ineffective on enemies higher than level 61 or which are marked as boss enemies.
`
  }
},
{ id: "w17", name: "Souls of the Damned", icon:"ability_demonhunter_shatteredsouls.jpg", description: "Anytime a party or raid member uses one of your Healthstones, you gain an absorption shield equal to 5% of their maximum Health for 10 sec." },
{ id: "w9", name: "Nether Portal", icon:"inv_netherportal.jpg", description: "Consuming Soul Shards has a 10% chance to open a portal to the Twisting Nether, summoning a Fel Sapper who chases and explodes on the creature with the most damage-over-time effects on it within 30 yds.<hr>This effect can occur once every 20 sec." },
{ id: "w14", name: "Smoldering Skin", icon:"ability_xavius_blackeningsoul.jpg", description: "Every second channeling Hellfire reduces the damage you take from the effect by 3% and increases the damage done by 3%.<hr>This effect resets on each new channel." },
{
  id: "w23",
  name: "Haunt",
  icon: "ability_warlock_haunt.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Haunt</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Haunt",
    icon: "ability_warlock_haunt.jpg",

    // left column (white)
    left: ["10% of base mana","Instant"],

    // right column (white)
    right: ["30 yd range","20 sec cooldown"],

    // yellow body text
    body: `
    Conjure a ghost to follow an enemy, increasing all periodic Shadow damage you deal to that target by 20% for 20 sec. When the Haunt ends, you are healed for 100% of the additional damage done by this effect.
`
  }
},
],
    /* WARLOCK — FEAT SLOT 4 */ [
{ id: "w10", name: "Ravenous Tyrant", icon:"spell_warlock_demonwrath.jpg", description: "Your Shadow Cleave spell spreads your Siphon Life from your primary target to all other enemies struck." },
{
  id: "w11",
  name: "Chaos Barrage",
  icon: "spell_argus_withering_fire.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Chaos Barrage</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Chaos Barrage",
    icon: "spell_argus_withering_fire.jpg",

    // left column (white)
    left: ["20% of base mana","Channeled (3 sec cast)"],

    // right column (white)
    right: ["40 yd range","45 sec cooldown"],

    // yellow body text
    body: `
	Unleashes 6 bolts of chaos magic at enemies every 1 sec, prioritizing burning enemies. These bolts deal Fire damage and reduce the magical resistances of targets hit by an amount equal to your level for 10 sec.<hr>Chaos Barrage pierces through absorption effects.
`
  }
},
{ id: "w15", name: "Sacrifical Lamb",
 icon:"inv_sword_2h_artifactsoulrend_d_05.jpg",
  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Sacrifical Lamb</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Sacrifical Lamb",
    icon: "inv_sword_2h_artifactsoulrend_d_05.jpg",

    // left column (white)
    left: ["10% of base mana","Instant"],

    // right column (white)
    right: ["30 yd range","2 min cooldown"],

    // yellow body text
    body: `
	Corrupts your pet or the pet of a party or raid member, causing it to grow in size and deal additional Shadow damage with each attack for 15 sec. When this effect ends, the pet explodes, dealing massive Shadow damage to itself and all enemies within 10 yds.
`
  }
},
{ id: "w18", name: "Searing Shadows", icon:"ability_warlock_backdraft.jpg", description: "Your Conflagrate spell consumes your Corruption on the target to increase the critical strike chance of your Shadow spells by 5%. Lasts 10 sec." },
],
    /* WARLOCK — FEAT SLOT 5 */ [
{ id: "w20", name: "Siphon Power", icon:"spell_warlock_soulburn.jpg", description: "When you use Life Tap your spell damage and healing are increased by an amount equal to 20% of your Spirit for 10 sec." },
{ id: "w21", name: "Cremation", icon:"ability_warlock_cremation.jpg", description: "Your critical strikes with Incinerate and Soul Fire deal 30% increased damage but cause you to burn for 6% of your current health over 6 sec." },
{
  id: "w22",
  name: "Grimoire of Service",
  icon: "inv_10_inscription2_book3_color2.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Grimoire of Service</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Grimoire of Service",
    icon: "inv_10_inscription2_book3_color2.jpg",

    // left column (white)
    left: ["14% of base mana","Instant","Requires Summoned Demon"],

    // right column (white)
    right: ["3 min cooldown"],

    // yellow body text
    body: `
	Instantly summon a second, random demon to fight with you for 10 sec, increased by 2 sec for each talent point allotted into Master Demonologist.`
  }
},
{
  id: "w7",
  name: "Shadow Bargain",
  icon: "inv_ability_hellcallerwarlock_wither.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Shadow Bargain</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Shadow Bargain",
    icon: "inv_ability_hellcallerwarlock_wither.jpg",

    // left column (white)
    left: ["5% of base mana","Instant"],

    // right column (white)
    right: ["30 yd range"],

    // yellow body text
    body: `
	Make a bargain with a party or raid target, reducing their Stamina by 6% and increasing your Intellect by 6%. Whenever you land a killing blow, the target gains 10% of their missing health and mana. If either of you dies, the other is Horrified for 3 sec. Lasts 30 min.<hr>This effect can only be on one target at a time.
`
  }
},
{ id: "w24", name: "Tiny Box of Horrors", icon:"inv_legion_cache_nightmare.jpg", description: "Whenever you cast Drain Soul, your Infernal Repository also casts Drain Soul on the target, granting it a chance to generate and store additional Soul Shards whenever it damages an enemy." },
],
  ],

  druid: [
    /* DRUID — FEAT SLOT 1 */ [
{
  id: "w1",
  name: "Stranglevines",
  icon: "inv_misc_herb_nightmarevine_stem.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Transforms your <span class="text-white">Entangling Roots</span> spell into:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Stranglevines",
    icon: "inv_misc_herb_nightmarevine_stem.jpg",

    // left column (white)
    left: ["10% of base mana","1.5 sec cast"],

    // right column (white)
    right: ["40 yd range","30 sec cooldown"],

    // yellow body text
    body: `
	Causes vines to sprout at the target location, dealing Nature damage to targets within the area every second and slowing their movement speed by 20%. Lasts 10 sec.<hr>Usable in any Shapeshift form.
`
  }
},
{ id: "w2", name: "Spirits of the Land", icon: "ability_mount_raptor.jpg", description: "Experience gains and damage dealt to Beasts and Dragonkin increased by 5%. Whenever you slay one of those creatures, there is a 25% chance their spirit is purified and remains to aid you in combat for up to 30 seconds." },
{ id: "w4", name: "Unyielding Cycle", icon: "ability_druid_overgrowth.jpg", description: "Rip, Moonfire, and Rejuvenation can stack up to 2 times." },
{ id: "w19", name: "Paw Patrol", icon: "inv_misc_bearpaw_red.jpg", description: "Increases your Parry chance by 5%.<br><br>Ursine Savagery can now trigger from and deals additional damage equal to your Parry chance as if you were in Humanoid Form.<hr>Requires the Ursine Savagery talent." },
{ id: "w30", name: "Symbiosis", icon: "spell_druid_symbiosis.jpg", description: "Wild Growth temporarily binds your life with the lowest health target healed, causing your healing on you or the ally to heal the other for 30% of the amount. Lasts 8 sec." },
],
    /* DRUID — FEAT SLOT 2 */ [
{
  id: "w3",
  name: "Treemendus",
  icon: "ability_druid_manatree.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Your <span class="text-white">Rebirth</span> spell transforms into:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Tree of Rebirth",
    icon: "ability_druid_manatree.jpg",

    // left column (white)
    left: ["40% of base mana", "Instant"],

    // right column (white)
    right: ["30 yd range", "3 min cooldown"],

    // yellow body text
    body: `
      Summon a tree that heals the most injured nearby ally every 5 sec.<br><br>
      When an ally dies, the tree casts Rebirth on them and then withers away, putting this spell on a 30 min cooldown instead.
    `
  }
},
{
  id: "w11",
  name: "Delicious Prey",
  icon: "ability_druid_primaltenacity.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Gnash and Gnaw</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Gnash and Gnaw",
    icon: "ability_druid_primaltenacity.jpg",

    // left column (white)
    left: ["15 Rage","Channeled","Requires Bear Form"],

    // right column (white)
    right: ["Melee Range","8 sec cooldown"],

    // yellow body text
    body: `
Clamp your jaws down on the target, dealing physical damage every 1 sec for 2 sec. Causes a moderate amount of threat.
    `
  }
},
{ id: "w13", name: "Savage Feline", icon: "ability_druid_predatoryinstincts.jpg", description: "Striking a target with Mangle (Cat) or Shred has a 15% chance to reduce the cooldown of Tiger's Fury by 10 sec." },
{ id: "w5", name: "Deviate Dance", icon: "ability_hunter_aspectoftheviper.jpg", description: "Activating Serpent Form increases the movement and melee attack speed of all Shapeshifted Druids and Hunter pets in your party or raid by 30% for 30 sec.<br><br>Afterwards, those affected become Exhausted and cannot benefit from this effect for 10 min.<hr>Requires the Curse of the Fanglords feat." },
{
  id: "w16",
  name: "Solar Ray",
  icon: "paladin_icon_speedoflight.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Solar Ray</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Solar Ray",
    icon: "paladin_icon_speedoflight.jpg",

    // left column (white)
    left: ["15% of base mana","1 sec cast"],

    // right column (white)
    right: ["30 yd range","1 min cooldown"],

    // yellow body text
    body: `
	Unleash a beam of sunlight, dealing Holy damage to all enemies in a line and increasing their damage taken from your Starfire spell by 20% for 10 sec.<br><br>Any Wild Mushrooms caught in the light instantly detonate.
`
  }
},
],
    /* DRUID — FEAT SLOT 3 */ [
{ id: "w7", name: "Terror Roar", icon: "spell_druid_stamedingroar.jpg", description: "Gain a stack of Ferocity every 6 sec while Shapeshifted. At 10 stacks, your next Demoralizing Roar causes your current target to tremble in fear and drop their weapon for 10 sec." },
{ id: "w6", name: "Brambleskin", icon: "spell_nature_thorns_nightmare.jpg", description: "Casting Thorns on yourself causes it to last an hour, become undispellable and trigger from your basic attacks, but your damage taken from Fire spells and effects is increased by 5%." },
{ id: "w8", name: "Master Shapeshifter", icon: "spell_druid_incarnation.jpg", description: "Shapeshifting costs 10% less mana and reduces the cooldown of a spell by 5%:<br><br>Bear Form - Barkskin.<br><br>Cat Form - Rebirth.<br><br>Moonkin Form - Innervate.<br><br>Serpent Form - Nature's Swiftness.<hr>Each effect can occur once every 10 sec." },
{
  id: "w14",
  name: "Solar Beam",
  icon: "ability_vehicle_sonicshockwave.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Solar Beam</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Solar Beam",
    icon: "ability_vehicle_sonicshockwave.jpg",

    // left column (white)
    left: ["18% of base mana","Instant"],

    // right column (white)
    right: ["40 yd range","1 min cooldown"],

    // yellow body text
    body: `
	You summon a beam of light over an enemy target's location, interrupting them and silencing all enemies within the radius while it is active. Lasts 15 sec.
`
  }
},
{ id: "w22", name: "Preservation", icon: "inv_ability_monk_renewingmists_active.jpg", description: "Tranquility extends the duration of your active heal-over-time effects by up to 3 sec.<br><br>Targets under the effects of your Tranquility take 10% reduced damage while below 30% total Health." },
],
    /* DRUID — FEAT SLOT 4 */ [
{ id: "w9", name: "Bear Necessities", icon: "inv_misc_bearcubbrown.jpg", description: "Being idle in Bear Form for at least 10 seconds causes you to enter Hibernation.<br><br>While under the effects of Hibernation, your abilities cool down 30% faster.<hr>This effect is cancelled upon taking any action or entering combat." },
{ id: "w20", name: "Flesh-Eating Locusts", icon: "ability_hunter_pet_silithid.jpg", description: "Insect Swarm always critically strikes bleeding enemies.<br><br>Whenever a target under the effects of your Insect Swarm dies, the swarm multiplies and seeks out up to 2 additional nearby enemies at 50% duration." },
{ id: "w12", name: "Ferocious Beasts", icon: "spell_druid_displacement.jpg", description: "Your melee critical strikes cause you, other Shapeshifted druids and the pets of Hunters in your party within 40 yds to enter a Frenzy, increasing attack speed by 5%. Lasts 10 sec." },
{ id: "w17", name: "Soothing Sun", icon: "achievement_zone_valeofeternalblossoms.jpg", description: "Friendly targets that come into contact with your Solar Ray or Solar Beam spells are healed and receive 10% increasing healing from your Nature spells and effects for 10 sec." },
{ id: "w22", name: "Dream Walking", icon: "achievement_meta_emeralddream.jpg", description: "Your healing spells have a 2% chance to create a Dream Essence within 40 yds. Collecting an essence increases your total Spirit, spell damage and healing done by 1% for 1 min. Stacks up to 20 times." },
],
    /* DRUID — FEAT SLOT 5 */ [
{ id: "w10", name: "Titanic Predator", icon: "spell_druid_bearhug.jpg", description: "Increases all healing received while under the effects of Survival Instincts by 30%.<br><br>Entering combat after being under the effects of <span class='text-white'>Hibernation</span> causes you to Enrage, increasing your physical damage dealt by 10% for 30 sec.<hr>Requires the Bear Necessities feat." },
{ id: "w21", name: "Green Thumb", icon: "ability_druid_empoweredtouch.jpg", description: "Your Healing Touch provides 10% increased healing and has a 50% chance to refresh the duration of your Lifebloom." },
{ id: "w15", name: "Jack of all Trees", icon: "inv_ability_druid_convokethespirits.jpg", description: "Increases your damage and healing done by 30% if you have at least 15 points in the Restoration, Feral, and Balance talent trees simultaneously." },
{ id: "w18", name: "Decomposition", icon: "inv_misc_herb_astralglory.jpg", description: "Corpses within 20 yds of you to have a 2% chance to spawn a Wild Mushroom whenever you cast a Nature spell. This chance increases to 100% on the corpses of your Treants.<hr>Requires the Wild Mushroom talent." },
{
  id: "w19",
  name: "Curse of the Fanglords",
  icon: "spell_nature_guardianward.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Serpent Form</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Serpent Form",
    icon: "spell_nature_guardianward.jpg",

    // left column (white)
    left: ["35% of base mana","Instant"],

    // right column (white)
    right: ["3 min cooldown"],

    // yellow body text
    body: `
	Shapeshift into an unstable Serpent Form, increasing Nature damage dealt by 30% but losing control of your actions as you attack enemies with serpent abilities for 15 sec.<br><br>The act of shapeshifting frees the caster of movement impairing effects.
`
  }
},
],
  ],

  hunter: [
    /* HUNTER — FEAT SLOT 1 */ [
{ id: "w2", name: "Wildbound", icon: "inv_nature_missile.jpg", description: "Every 50 yards of movement causes your next Steady Shot to become instant cast and deal additional Nature damage equal to 200% of your total Spirit." },
{ id: "w3", name: "Unbreakable Bond", icon: "ability_hunter_beastmastery.jpg", description: "Mend Pet and Beastial Wrath increase your pet's happiness slightly.<br><br>Intimidation reduces your pet's damage taken by 10% for 10 sec.<br><br>Territorial Defense removes a slow effect from you and your pet." },
{ id: "w14", name: "Snare Master", icon: "inv_fishing_nethooks01.jpg", description: "Your Wing Clip ability generates 10 Prowess and immobilizes the target for 5 seconds but has a 20 second cooldown." },
{
  id: "w27",
  name: "Ecdysis",
  icon: "ability_hunter_cobrastrikes.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Transforms your <span class="text-white">Viper Sting</span> ability into:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Viper Strike",
    icon: "ability_hunter_cobrastrikes.jpg",

    // left column (white)
    left: ["30 Prowess","Instant"],

    // right column (white)
    right: ["Melee Range","15 sec cooldown"],

    // yellow body text
    body: `
	A vicious strike that deals Physical damage and consumes your Sting to increase the target's Energy, Rage, Focus or Mana costs by 10% for 10 sec.
`
  }
},
],
    /* HUNTER — FEAT SLOT 2 */ [
{ id: "w4", name: "Ranger's Finesse", icon: "misc_legionfall_hunter.jpg", description: "Your movement speed is increased by 30% for 3 sec after using Disengage.<br><br>Your Feign Death ability reduces your damage taken by 75% for 3 sec." },
{
  id: "w5",
  name: "Air Power",
  icon: "inv_111_hunter_ability_airsuperiority.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Eye in the Sky</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Eye in the Sky",
    icon: "inv_111_hunter_ability_airsuperiority.jpg",

    // left column (white)
    left: ["20 Prowess","Instant"],

    // right column (white)
    right: ["30 yd range","30 sec cooldown"],

    // yellow body text
    body: `
	Blow a whistle and summon a eagle to circle the target area, attacking a different target every 2 seconds for 10 sec.<hr>Targets hit by the hawk are considered marked for 10 sec.
`
  }
},
{ id: "w6", name: "Tactical Retreat", icon: "ability_hunter_pet_assist.jpg", description: "Whenever your pet falls below 20% total Health, it flees into the shadows, becoming untargetable and healing for 30% of its missing health over 6 sec.<hr>This effect can occur once every 6 min." },
{ id: "w7", name: "Lone Wolf", icon: "ability_mount_whitedirewolf", description: "You deal 25% increased damage with all attacks while you do not have an active pet." },
{ id: "w15", name: "In and Out", icon: "ability_hunter_displacement.jpg", description: "Raptor Strike increases the damage of your next 3 Shot abilities by 5%. Lasts 15 sec.<br><br>Steady Shot increases the damage of your next 3 Strike or Bite abilities by 5%. Lasts 15 sec." },
],
    /* HUNTER — FEAT SLOT 3 */ [
{
  id: "w9",
  name: "Blood and Honey",
  icon: "inv_ability_honey_missile.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Preyseeker</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Preyseeker",
    icon: "inv_ability_honey_missile.jpg",

    // left column (white)
    left: ["10 Prowess","Instant"],

    // right column (white)
    right: ["35 yd range","10 min cooldown"],

    // yellow body text
    body: `
	Fire a salvo of ammunition coated in a delicious scent. After 1 minute, a wild bear becomes attracted to the target and pursues them for up to 30 sec.
`
  }
},
{ id: "w8", name: "Shoot To Kill", icon: "ability_pvp_initiation.jpg", description: "Your Kill Shot ability deals 3% increased damage per bleed effect on the target and can be used once regardless of the target's Health while under the effects of Rapid Killing." },
{ id: "w17", name: "Snake Charmer", icon: "achievement_dungeon_aspixandadderis.jpg", description: "Your Snake Trap now also releases a vicious Boa Constrictor that lasts up to 30 seconds." },
],
    /* HUNTER — FEAT SLOT 4 */ [
{ id: "w10", name: "Scatter the Weak", icon: "inv__hydrasbite.jpg", description: "Your Scatter Shot ability hits up to 2 additional nearby targets and lowers the Stamina of each target hit by 20% for 10 sec." },
{ id: "w11", name: "Nimble Fighter", icon: "ability_hunter_disarmingshot.jpg", description: "Your Raptor Strike ability grants you 10% Parry chance for 6 sec.<br><br>Your Mongoose Bite ability grants you 10% Dodge chance for 6 sec.<br><br>While both of these effects are active, your movement speed is increased by 30%." },
{ id: "w12", name: "Scavenger's Reign", icon: "ability_hunter_longshots.jpg", description: "Whenever you kill an enemy, there is a 15% chance you find materials based off your current professions and a portion of ammunition you expended retrievable from the corpse." },
{
  id: "w13",
  name: "Natural Remedy",
  icon: "inv_misc_herb_arrowbloom.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Transforms your <span class="text-white">Volley</span> ability into:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Salving Shot",
    icon: "inv_misc_herb_arrowbloom.jpg",

    // left column (white)
    left: ["Instant","Requires Ranged Weapon"],

    // right column (white)
    right: ["35 yd range","1 min cooldown"],

    // yellow body text
    body: `
	Shoot healing barbs at up to 3 friendly targets in front of you, removing 1 Disease, Poison or Bleed effect from each and healing them for 15% of their total Health over 3 sec.
`
  }
},
{ id: "w28", name: "Aspect Mastery", icon: "ability_hunter_aspectmastery.jpg", description: "Having 5 talent points placed into Avian Aggression, Ambidextrous Primate and Beastial Tenacity causes your Aspect of the Wild to give the effects of Aspect of the Hawk, Monkey and Beast simultaneously.<br><br>Your base stats are increased by 5%." },
],
    /* HUNTER — FEAT SLOT 5 */ [
{
  id: "w21",
  name: "Focus Fire",
  icon: "inv12_ability_hunter_takedown.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Focus Fire</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Focus Fire",
    icon: "inv12_ability_hunter_takedown.jpg",

    // left column (white)
    left: ["Instant"],

    // right column (white)
    right: ["30 sec cooldown"],

    // yellow body text
    body: `
	Consumes your pet's Frenzy effect, restoring 2 Focus to your pet and increasing your ranged attack speed by 1% for each stack consumed. Lasts 10 sec.
`
  }
},
{ id: "w25", name: "Many Birds, One Spear", icon: "inv_ammo_arrow_06.jpg", description: "Your Wild Spear ability deals 20% damage to any enemies it passes through.<br><br>Wild Spear now benefits and can trigger effects from the talents: Stalker's Ambition, Pack Tactics, Piercing Shots and Lethal Arsenal." },
{ id: "w11", name: "Zirene's Guide to Bushcraft", icon: "inv_10_specialization_professionbook_herbalism_color1.jpg", description: "Enemies standing within the radius of your Flare are considered tracked.<br><br>Channeling a bandage is no longer cancelled when taking damage.<br><br>Campfires now count as a rest area while you are within 5 yds of them." },
{ id: "w26", name: "Scent of Fear", icon: "spell_druid_bearhug.jpg", description: "You deal 5% increased damage to Feared, Horrified or Dazed targets.<br><br>Whenever an enemy within 40 yards falls below 40% health, the cooldown of your Rapid Killing is reduced by 10 sec." },
],
  ],

  shaman: [
    /* SHAMAN — FEAT SLOT 1 */ [
{ id: "w1", name: "Totemic Encirclement", icon: "ability_shaman_tranquilmindtotem.jpg", description: "When you cast a totem spell, you also place unempowered totems for any elements that are not currently active.  These totems have 5 health and produce no other effects.<br><br>Your Totems refund 20% of their mana cost whenever they are destroyed." },
{
  id: "w2",
  name: "Overload",
  icon: "inv_ability_stormcallershaman_tempest.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Overload</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Overload",
    icon: "inv_ability_stormcallershaman_tempest.jpg",

    // left column (white)
    left: ["15% of base mana","Instant"],

    // right column (white)
    right: ["20 yd range","20 sec cooldown"],

    // yellow body text
    body: `
	Consumes all Lightning Shield orb charges to pulse electricity around you, dealing Nature damage to all enemies within 20 yards every 3 seconds for 15 sec.<hr>You cannot generate new Shield orb charges while Overload is active.
`
  }
},

{ id: "w3", name: "Shatter", icon: "ability_earthen_pillar.jpg", description: "While you are at maximum charges of Earth Shield, your Earth Shock spell consumes one orb charge to pull a spike from beneath the earth onto the target, dealing Nature damage." },
{ id: "w9", name: "Storm Sentinel", icon: "inv_mace_2h_draenorguard_b_01_alliance.jpg", description: "While under the effects of Elemental Mastery, your Thunderstorm always critically strikes.<br><br>While under the effects of Shamanistic Rage, Stormstrike always strikes one additional time." },
{ id: "w7", name: "Acid Rains", icon: "spell_nature_acid_01.jpg", description: "Your Healing Rains spell deals Nature damage to enemies within its radius every second and increases their damage taken from Nature and Frost spells and effects by 3%." },
{
  id: "w27",
  name: "Tidal Blessing",
  icon: "inv12_ability_shaman_whirlpool.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Wellspring</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Wellspring",
    icon: "inv12_ability_shaman_whirlpool.jpg",

    // left column (white)
    left: ["15% of base mana","Instant"],

    // right column (white)
    right: ["40 yd range","1 min cooldown"],

    // yellow body text
    body: `
	Invoke a blessing on a friendly target that lasts 1 min. Upon overhealing the target for 50% of their total Health, they gain a powerful absorption shield and healing over 10 sec.
`
  }
},
],
    /* SHAMAN — FEAT SLOT 2 */ [
{ id: "w4", name: "Ascension", icon: "ability_bastion_monk.jpg", description: "While in combat, your base stats ebb and flow by 1% every 4 sec, rising to a maximum of 5% and then decreasing back down to 1%.<br><br>Casting Reincarnation causes you to Ascend, gaining 10% spell haste and causing your Chain spells to be instant and bounce to an additional target. Lasts 30 sec." },
{
  id: "w5",
  name: "Hex",
  icon: "spell_shaman_hex.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Hex</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Hex",
    icon: "spell_shaman_hex.jpg",

    // left column (white)
    left: ["5% of base mana","1 sec cast"],

    // right column (white)
    right: ["30 yd range","1 min cooldown"],

    // yellow body text
    body: `
	Transforms the enemy into a frog. While hexed, the target cannot attack or cast spells. Damage caused may interrupt the effect. Lasts 1 min. Only one target can be hexed at a time.<hr>Only usable on Humanoids and Beasts.
`
  }
},
{ id: "w6", name: "Totems of Wrath", icon: "spell_fire_totemofwrath.jpg", description: "Your active Fire Totem increases all party member's spell critical strike chance by 2%.<br><br>Your active Air Totem increases all party member's chance to hit with spells by 2%.<hr>This effect does not stack with other Shamans." },
{
  id: "w19",
  name: "Astral Diffusion",
  icon: "inv_magic_swirl_color3.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Astral Diffusion</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Astral Diffusion",
    icon: "inv_magic_swirl_color3.jpg",

    // left column (white)
    left: ["20% of base mana","Instant","Reagents: Lesser Moonstone"],

    // right column (white)
    right: ["10 min cooldown"],

    // yellow body text
    body: `
	Reverses 60% of all spell damage you have taken during the past 6 seconds and transfers all currently active harmful magical effects on you back to their original casters if possible.
`
  }
},
{ id: "w26", name: "Fire in the Sky", icon: "inv_12_profession_thematicfoozles_moteofwildmadic_red.jpg", description: "Consuming Maelstrom increases the damage done by your Flametongue Weapon effect by 6% per stack. Lasts 10 sec." },
],
    /* SHAMAN — FEAT SLOT 3 */ [
{ id: "w11", name: "Stay Frosty", icon: "spell_hunter_icetrap.jpg", description: "Your Frost Shock spell now Chills the target and has 30% chance to root already Chilled targets in place for 3 sec." },
{ id: "w12", name: "Rising Flames", icon: "ability_evoker_volcanism.jpg", description: "Every third Lava Burst or Lava Lash ignites your active Fire Totem, causing it to spew magma at a nearby target, dealing Fire damage." },
{ id: "w13", name: "Guardian Breeze", icon: "inv_misc_volatileair.jpg", description: "Your Wind Shock spell reduces your spell damage taken by 5% against the most recent spell school used by the target. Lasts 20 sec." },
{ id: "w20", name: "Seismic Rift", icon: "spell_shaman_earthquake.jpg", description: "Your Earth Shock spell may be cast on your active Earth Totem to cause an aftershock at its location, dealing Nature damage to all enemies within 15 yds." },
{ id: "w8", name: "Gift of the Water Spirit", icon: "spell_nature_giftofthewaterspirit.jpg", description: "Your Chain Heal and Chain Lightning spells increase the duration of your next Healing Rains by 2 sec.<hr>This cannot cause Healing Rains to last longer than 20 sec." },
],
    /* SHAMAN — FEAT SLOT 4 */ [
{ id: "w10", name: "Furious Winds", icon: "ability_skyreach_four_wind.jpg", description: "While under the effects of Windfury Totem or Windfury Weapon, your Cyclone Slash summons a tornado, dealing Nature damage to nearby enemies over 6 sec." },
{ id: "w24", name: "Fire Storm", icon: "spell_shaman_stormearthfire.jpg", description: "While under the effects of Flametongue Totem or Flametongue Weapon, the duration of your Flame Shock increases by 6 sec." },
{ id: "w14", name: "Icy Hot", icon: "spell_frost_icefloes.jpg", description: "While your weapon or shield is imbued with Frostbrand Weapon, your Lava Lash ignores the target's Fire resistance and always causes maximum pushback on targets casting spells." },
{ id: "w28", name: "Rain Stick", icon: "inv_rod_titanium.jpg", description: "Whenever your Earthliving effect triggers, the cooldown of your Healing Rains or Riptide spell is reduced by 1 second, whichever is longer." },
{ id: "w26", name: "Force Conduit", icon: "ability_evoker_earthensky.jpg", description: "While your weapon or shield is imbued with Rockbiter Weapon, parrying grants you a stack of Maelstrom." },
],
    /* SHAMAN — FEAT SLOT 5 */ [
{ id: "w25", name: "Chaos of the Natural World", icon: "inv_10_enchanting2_elementalswirl_color1.jpg", description: "Reduces your damage taken while casting spells by 10%. In addition, you gain the effects of another random <span class='text-white'>Disciple</span> feat in this slot every 30 seconds.<hr>No feat can be chosen twice in a row." },
{
  id: "w15",
  name: "Disciple of Earth",
  icon: "shaman_pvp_rockshield.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Stoneguard</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Stoneguard",
    icon: "shaman_pvp_rockshield.jpg",

    // left column (white)
    left: ["5% of base mana","Instant","Requires Earth Totem"],

    // right column (white)
    right: ["2 min cooldown"],

    // yellow body text
    body: `
	Consumes your active Earth Totem to half the damage you take from the next 3 attacks that exceed 20% of your total health. Lasts 30 sec.<hr>You cannot place another Earth Totem for 30 seconds after using this spell.
`
  }
},
{
  id: "w16",
  name: "Disciple of Flame",
  icon: "spell_shaman_lavasurge.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Molten Blast</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Molten Blast",
    icon: "spell_shaman_lavasurge.jpg",

    // left column (white)
    left: ["5% of base mana","Instant","Requires Fire Totem"],

    // right column (white)
    right: ["30 yd range","2 min cooldown"],

    // yellow body text
    body: `
	Consumes your active Fire Totem to blast up to 10 enemies in front of you for Fire damage and applying Flame Shock to them for 6 sec.<hr>You cannot place another Fire Totem for 30 seconds after using this spell.
`
  }
},
{
  id: "w17",
  name: "Disciple of Water",
  icon: "ability_shawaterelemental_swirl.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Torrential Wave</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Torrential Wave",
    icon: "ability_shawaterelemental_swirl.jpg",

    // left column (white)
    left: ["5% of base mana","Instant","Requires Water Totem"],

    // right column (white)
    right: ["20 yd range","2 min cooldown"],

    // yellow body text
    body: `
	Consumes your active Water Totem to usher a surge of water forward, healing friendly targets and damaging enemiy targets for Nature damage in a line in front of you.<hr>You cannot place another Water Totem for 30 seconds after using this spell.
`
  }
},
{
  id: "w18",
  name: "Disciple of Air",
  icon: "achievement_raidprimalist_windelemental.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Zephyr</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Zephyr",
    icon: "achievement_raidprimalist_windelemental.jpg",

    // left column (white)
    left: ["5% of base mana","Instant","Requires Air Totem"],

    // right column (white)
    right: ["20 yd range","2 min cooldown"],

    // yellow body text
    body: `
	Consumes your active Air Totem to increase your movement speed by 20% and reflect ranged attacks mage against you back onto random nearby enemies. Lasts 8 sec.<hr>You cannot place another Air Totem for 30 seconds after using this spell.
`
  }
},
],
  ],

  paladin: [
    /* PALADIN — FEAT SLOT 1 */ [
{ id: "w2", name: "Highly Favored", icon: "spell_priest_angelicbulwark.jpg", description: "The Holy Guardian summoned by your Celestial Aid spell can now cast a variety of Holy Paladin and Holy Priest spells and lasts until killed or dismissed." },
{ id: "w23", name: "Contempt for the Weak", icon: "inv_plate_raidpaladint2_d_01_helm.jpg", description: "Your basic attacks increase the damage of your next Exorcism or Divine Verdict by 2%. Lasts 10 sec. Stacks up to 10 times." },
{
  id: "w40",
  name: "Heaven's Judgement",
  icon: "ability_racial_orbitalstrike.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Dawnbreaker</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Dawnbreaker",
    icon: "ability_racial_orbitalstrike.jpg",

    // left column (white)
    left: ["20% of base mana","Instant"],

    // right column (white)
    right: ["40 yd range","45 sec cooldown"],

    // yellow body text
    body: `Creates a pillar of light at the target location that instantly deals Holy damage to enemies within its radius. After a delay, the light moves toward the Paladin, damaging any enemies that cross its path. Lasts 10 sec.`
  }
},
{ id: "w12", name: "Sacrament", icon: "ability_priest_spiritoftheredeemer.jpg", description: "Your healing spells bless targets with spiritual power, giving their direct damage spells a 20% chance to unleash a bolt of light at their target, dealing Holy damage. Lasts 30 sec." },
{
  id: "w50",
  name: "Firmament",
  icon: "ability_skyreach_empowered.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Firmament</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Firmament",
    icon: "ability_skyreach_empowered.jpg",

    // left column (white)
    left: ["9% of base mana","Instant"],

    // right column (white)
    right: ["40 yd range","1 min cooldown"],

    // yellow body text
    body: `Invoke the heavens, healing the 10 lowest health targets, ally or enemy, within range.<br><br>All targets healed by this spell are enlightened, becoming cleansed of and highly resistant to immobilization effects for 6 sec.`
  }
},
{
  id: "w21",
  name: "Seal of the Damned",
  icon: "spell_holy_sealofrighteousness.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Seal of the Damned</span> spell:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Seal of the Damned",
    icon: "spell_holy_sealofrighteousness.jpg",

    // left column (white)
    left: ["3% of total health","Instant"],

    // right column (white)
    right: [""],

    // yellow body text
    body: `Fills you with dark energy for 30 sec, causing your melee attacks to deal additional Shadow damage, but you lose health equal to 10% of the damage inflicted.<br><br>Unleashing this Seal's energy instantly steals a portion of the target's Health and gives it to the Paladin.<hr>While this feat is active, the Paladin is Baned, losing the ability to cast other Seals.`
  }
},
],
    /* PALADIN — FEAT SLOT 2 */ [
{ id: "w32", name: "Fire and Brimstone", icon: "ability_paladin_bladeofjustice.jpg", description: "Whenever the target of your Blessing of Sacrifice or Veneration takes damage, there is a 30% your weapon sets itself ablaze with righteous fire, causing your next 2 melee swings to deal additional Fire damage.<hr>This effect can occur once every 10 sec." },
{ id: "w4", name: "Guardian of Light", icon: "ability_paladin_gaurdedbythelight.jpg", description: "Your Consecration is 15% larger and reduces enemy movement speed by 20%.<br><br>Undead and Demons that die within your Consecration heal you for 5% of your missing Health and provide 50% additional experience." },
{ id: "w6", name: "Purge First, Ask Questions Later", icon: "inv_ability_heraldofthesunpaladin_dawnlight.jpg", description: "Your next Holy Shock, Avenger's Shield or Severance spell incurs no cooldown.<hr>This effect can occur once every 30 sec." },
{ id: "w20", name: "Good Samaritan", icon: "ability_paladin_selflesshealer.jpg", description: "Whenever you receive a critical heal, you bless party members within 30 yds, increasing the critical effect chance of the next healing spell they each receive by 5%. Lasts 10 sec." },
{ id: "w13", name: "Apostasy", icon: "spell_deathknight_subversion.jpg", description: "Your presence weakens the spirit, reducing the movement speed, attack speed and casting speed of all enemies within 10 yds by 10%.<hr>While this feat is active, the Paladin is Baned, reducing their total Spirit by 50%." },
],
    /* PALADIN — FEAT SLOT 3 */ [
{ id: "w5", name: "Lawbringer", icon: "ability_paladin_lawbringer.jpg", description: "Whenever you Block you have a 10% chance of refreshing the cooldown of Denounce and reducing its Mana cost by 100% for 6 sec." },
{ id: "w8", name: "Cauterizing Light", icon: "inv_12_profession_thematicfoozles_moteofpurelight_gold.jpg", description: "Your Holy Shock spell gains an additional charge.<br><br>While your Avenging Wrath is on cooldown, your Divine Favor cools down 25% faster." },
{ id: "w7", name: "Adapting Light", icon: "spell_paladin_lightofdawn.jpg", description: "While Holy Shield is active, your Severance and Glory spells cost no mana and have their cooldowns reduced by 50%." },
{ id: "w11", name: "Seals of Truth", icon: "ability_paladin_empoweredsealstruth.jpg", description: "While you have an active Seal effect, your melee attacks have a 10% chance to Censure the target, dealing Holy damage based on the target's missing health." },
{ id: "w19", name: "Oathbreaker", icon: "ability_revendreth_deathknight.jpg", description: "Your Exorcism, Holy Wrath, Consecration and Hammer of Wrath spells deal Shadow damage instead of Holy.<hr>While this feat is active, the Paladin is Baned, causing crimson shadows to envelope their body and that of their steed." },
],
    /* PALADIN — FEAT SLOT 4 */ [
{ id: "w9", name: "Verses of Virtue", icon: "inv_inscription_armorscroll02.jpg", description: "You recieve up to 5% increased healing and your healing spells gain up to 5% increased effectiveness based on the target's proximity to you." },
{ id: "w10", name: "Verses of Valiance", icon: "inv_inscription_scroll_kings.jpg", description: "Avenger's Shield can hit up to 2 additional targets and reduces the cast time of Holy Wrath by 20% per enemy struck. Lasts 10 sec." },
{ id: "w41", name: "Verses of Vengeance", icon: "inv_inscription_weaponscroll03.jpg", description: "You have a 10% chance to gain Holy Power whenever you take damage.<br><br>Holy Power increases the damage or healing or your next 3 Holy spells by 5%. Lasts 10 sec." },
{ id: "w11", name: "Hammer of Injustice", icon: "ability_paladin_empoweredsealsjustice.jpg", description: "Your Hammer of Justice spell gains 10 yds of range and causes the first beneficial spell cast on the target to be redirected to the Paladin instead." },
{ id: "w23", name: "The Dark Knight", icon: "spell_deathknight_festering_strike.jpg", description: "While this feat is active, the Paladin gains an effect for every <span class='text-white'>Baned Feat</span>:<br><br>1 - Your Crusader Strike deals 50% increased damage to targets affected by your Righteous Vengeance and Unveil Sin.<br><br>2 - Turn Undead causes the target to fight for you instead of flee.<br><br>3 - Exorcism interrupts spellcasting for 3 sec.<br><br>4 - Increases your Shadow damage done by 20% on enemies below 50% total Health." },
],
    /* PALADIN — FEAT SLOT 5 */ [
{ id: "w1", name: "Lance A Lot", icon: "inv_lightforgedmatrixability_lightsjudgment.jpg", description: "Each cast of Holy Shock during Divine Verdict summons an additional spear of light." },
{ id: "w16", name: "Iconography", icon: "spell_holy_rune.jpg", description: "Your healing spells have a 5% chance to summon a holy symbol on the ground nearby.<br><br>Stepping on a symbol grants the friendly target an absorption shield equal to 20% of your bonus healing. Up to 3 symbols may be active at once. Lasts 30 sec." },
{ id: "w39", name: "Light's Protector", icon: "ability_paladin_touchedbylight.jpg", description: "Each stack of Worthy reduces the mana cost of your Cleanse and Celestial Aid spells by 20%." },
{ id: "w51", name: "Barricade of Faith", icon: "ability_paladin_barrieroffaith.jpg", description: "Righteous Shield protects you from the next spell to strike you, reducing its damage by 20%. Lasts 3 sec.<br><br>While holding a shield, you have a 10% chance to block incoming spells, reducing their damage by 10%." },
{
  id: "w22",
  name: "Divine Vision",
  icon: "spell_holy_spiritualguidence.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Gain the <span class="text-white">Ordained Sight</span> ability:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Ordained Sight",
    icon: "spell_holy_spiritualguidence.jpg",

    // left column (white)
    left: ["5% of base mana","Instant"],

    // right column (white)
    right: ["2 min cooldown"],

    // yellow body text
    body: `While active, all enemies appear Undead to you and your attacks, abilities and spells treat them as such for the next 20 sec.`
  }
},
{
  id: "w18",
  name: "Dark Justiciar",
  icon: "ability_bossdarkvindicator_auraofoppression.jpg",

  // ✅ Main rune description (supports HTML: <br>, <hr>, spans)
  description: `Transforms your <span class="text-white">Lay on Hands</span> spell into:`,

  // ✅ Optional “mini ability tooltip” block (uses renderSubSpell from tooltip_extras.js)
  subSpell: {
    name: "Unveil Sin",
    icon: "ability_deathknight_asphixiate.jpg",

    // left column (white)
    left: ["5% of base mana","Instant"],

    // right column (white)
    right: ['20 yd range',"10 sec cooldown"],

    // yellow body text
    body: `Unleash spiteful magic on your target, dealing Shadow damage and causing them to suffer additional Shadow damage over 16 sec.<hr>While this feat is active, the Paladin is Baned, reducing their total Health by 10%.`
  }
},
],
  ],
};

  // ---------------------------
  // Class key detection
  // ---------------------------
  function getClassKey() {
    const body = document.body;
    const classMap = [
      "warrior-page", "mage-page", "rogue-page", "shaman-page", "hunter-page",
      "paladin-page", "druid-page", "warlock-page", "priest-page"
    ];
    const found = classMap.find(c => body.classList.contains(c));
    return found ? found.replace("-page", "") : null;
  }

  function loadState(classKey) {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + classKey);
      if (!raw) return Array(5).fill(null);
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length === 5 ? parsed : Array(5).fill(null);
    } catch {
      return Array(5).fill(null);
    }
  }

  function saveState(classKey, state) {
    localStorage.setItem(STORAGE_PREFIX + classKey, JSON.stringify(state));
  }

  // --- Rune tooltip (supports HTML in description + details/subDetails + subSpell) ---
  let tooltipEl = null;

  function ensureRuneTooltipEl() {
    if (tooltipEl) return tooltipEl;
    tooltipEl = document.createElement("div");
    tooltipEl.className = "rune-tooltip";
    tooltipEl.style.visibility = "hidden";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.zIndex = "9999";
    tooltipEl.style.pointerEvents = "none";
    document.body.appendChild(tooltipEl);
    return tooltipEl;
  }

  function buildDetailsRow(details = [], subDetails = []) {
    const left = (details || []).filter(Boolean).join("<br>");
    const right = (subDetails || []).filter(Boolean).join("<br>");
    if (!left && !right) return "";
    return `
      <div class="tooltip-details-row">
        <div class="tooltip-details-left text-white">${left}</div>
        <div class="tooltip-details-right text-white">${right}</div>
      </div>
    `;
  }

  function showRuneTooltip(x, y, rune) {
    const el = ensureRuneTooltipEl();
    if (!rune || typeof rune !== "object") return;

    const title = rune.name || "Feat";
    const desc = rune.description || "";
    const detailsRowHTML = buildDetailsRow(rune.details, rune.subDetails);

    el.innerHTML = `
      <div style="font-weight:700; margin-bottom:6px;">${title}</div>
      ${detailsRowHTML}
      ${desc ? `<hr class="tooltip-divider"><div class="talent-description">${desc}</div>` : ""}
    `;

    // Optional: reuse talent-style subSpell renderer if present.
    // Also strip the leading <hr> from renderSubSpell so you don't get an extra underline above the subSpell block.
    if (rune.subSpell && typeof window.renderSubSpell === "function") {
      let subHtml = window.renderSubSpell(rune.subSpell);
      subHtml = subHtml.replace(/^\s*<hr[^>]*>\s*/i, "");
      el.innerHTML += subHtml;
    }

const offset = 14;

// Measure after innerHTML is set
const w = el.offsetWidth || 260;
const h = el.offsetHeight || 140;

// TOP-RIGHT of cursor
let left = x + offset;
let top  = y - h - offset;

// Clamp to viewport (accounts for scroll)
const minLeft = window.scrollX + 8;
const minTop  = window.scrollY + 8;
const maxLeft = window.scrollX + window.innerWidth  - w - 8;
const maxTop  = window.scrollY + window.innerHeight - h - 8;

left = Math.max(minLeft, Math.min(left, maxLeft));
top  = Math.max(minTop,  Math.min(top,  maxTop));

el.style.left = `${left}px`;
el.style.top  = `${top}px`;
el.style.visibility = "visible";
  }

  function hideRuneTooltip() {
    if (tooltipEl) tooltipEl.style.visibility = "hidden";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const classKey = getClassKey();
    if (!classKey) return;

    const slotsWrap = document.getElementById("rune-slots");
    const picker = document.getElementById("rune-picker");
    const optionsWrap = document.getElementById("rune-options");
    const pickerTitle = document.getElementById("rune-picker-title");
    const closeBtn = document.getElementById("rune-picker-close");
    const borrowStrip = document.getElementById("rune-borrow-strip"); // optional

    if (!slotsWrap || !picker || !optionsWrap || !pickerTitle || !closeBtn) return;

    const runePools = RUNE_DATA[classKey] || [[], [], [], [], []];
    const state = loadState(classKey);

    // Critical: prevents click-outside logic after DOM is rebuilt (fixes wildcard closing issue)
    picker.addEventListener("click", (ev) => ev.stopPropagation());
    slotsWrap.addEventListener("click", (ev) => ev.stopPropagation());

    function wildcardActive(slotIndex) {
      // wildcard mode persists if wildcard rune selected OR slot holds a wild ref
      return state[slotIndex] === WILDCARD_RUNE_ID || isWildRef(state[slotIndex]);
    }

    function resolveSelectedRune(slotIndex) {
      const selectedId = state[slotIndex];
      const pool = runePools[slotIndex] || [];

      if (isWildRef(selectedId)) {
        const ref = parseWildRef(selectedId);
        if (!ref) return null;
        return findRuneById(runePools, ref.sourceSlot, ref.runeId);
      }

      return pool.find(o => o.id === selectedId) || null;
    }

    function getActiveRuneIdsExcluding(slotIndex) {
      const active = new Set();

      for (let s = 0; s < 5; s++) {
        if (s === slotIndex) continue;

        const v = state[s];
        if (!v) continue;

        if (isWildRef(v)) {
          const ref = parseWildRef(v);
          if (ref) active.add(ref.runeId);
        } else {
          active.add(v);
        }
      }

      return active;
    }

function runeIdFromStateValue(v) {
  if (!v) return null;
  if (v === WILDCARD_RUNE_ID) return null; // wildcard mode, not a real rune
  if (isWildRef(v)) {
    const ref = parseWildRef(v);
    return ref ? ref.runeId : null;
  }
  return v; // normal rune id
}

// If another slot selects the rune currently borrowed by wildcard slot 4, clear slot 4.
function clearWildcardIfDuplicated(changedSlotIndex) {
  if (classKey !== WILDCARD_CLASS) return false;

  const w = WILDCARD_SLOT_INDEX; // slot 4
  if (changedSlotIndex === w) return false; // ignore selections made in slot 4 itself

  const wildcardBorrowedId = runeIdFromStateValue(state[w]);
  if (!wildcardBorrowedId) return false; // nothing borrowed, nothing to enforce

  const chosenId = runeIdFromStateValue(state[changedSlotIndex]);
  if (!chosenId) return false;

  if (chosenId === wildcardBorrowedId) {
    state[w] = null;               // ✅ remove wildcard rune/borrowed rune from slot 4
    saveState(classKey, state);
    return true;
  }
  return false;
}

    function renderSlots() {
      const buttons = slotsWrap.querySelectorAll(".rune-slot");
      buttons.forEach(btn => {
        const idx = Number(btn.dataset.slot);
        const selected = resolveSelectedRune(idx);

        if (!selected) {
          btn.classList.add("is-empty");
          btn.style.backgroundImage = "none";
        } else {
          btn.classList.remove("is-empty");
          btn.style.backgroundImage = `url("${iconUrl(selected.icon)}")`;
        }
      });
    }

    function renderBorrowStrip(slotIndex) {
      if (!borrowStrip) return;

      const shouldShow =
        classKey === WILDCARD_CLASS &&
        slotIndex === WILDCARD_SLOT_INDEX &&
        wildcardActive(slotIndex);

      if (!shouldShow) {
        borrowStrip.hidden = true;
        borrowStrip.innerHTML = "";
        return;
      }

      // Build candidates from slots 1,2,3,5
      const candidates = [];
      BORROW_FROM_SLOTS.forEach((s) => {
        (runePools[s] || []).forEach((r) => candidates.push({ ...r, _sourceSlot: s }));
      });

      // Exclude runes already active in other slots (prevents duplicates)
      const activeIds = getActiveRuneIdsExcluding(slotIndex);
      const filtered = candidates.filter((r) => !activeIds.has(r.id));

      // Current borrowed selection for highlight (optional)
      let currentBorrowedId = null;
      if (isWildRef(state[slotIndex])) {
        const ref = parseWildRef(state[slotIndex]);
        currentBorrowedId = ref ? ref.runeId : null;
      }

      borrowStrip.hidden = false;
      borrowStrip.innerHTML = "";

      if (filtered.length === 0) {
        borrowStrip.innerHTML = `<div style="color:#bbb; font-size:0.9em;">No eligible runes — other slots already have them active.</div>`;
        return;
      }

      filtered.forEach((r) => {
        const chip = document.createElement("div");
        chip.className = "rune-borrow-chip";
        chip.style.backgroundImage = `url("${iconUrlSmall(r.icon)}")`;

        if (currentBorrowedId && r.id === currentBorrowedId) {
          chip.style.boxShadow = "0 0 10px rgba(255,215,0,0.18), inset 0 0 10px rgba(0,0,0,0.55)";
          chip.style.borderColor = "rgba(255,215,0,0.55)";
        }

        chip.addEventListener("click", (ev) => {
          ev.stopPropagation();
          state[slotIndex] = buildWildRef(r._sourceSlot, r.id);
          saveState(classKey, state);
          renderSlots();
          openPicker(slotIndex);
        });

        chip.addEventListener("mousemove", (e) => {
          showRuneTooltip(e.pageX, e.pageY, {
            ...r,
            description: `${r.description || ""}<br><br><span class="text-white">Selected from Slot ${r._sourceSlot + 1}</span>`
          });
        });
        chip.addEventListener("mouseleave", hideRuneTooltip);

        borrowStrip.appendChild(chip);
      });
    }

    function openPicker(slotIndex) {
      renderBorrowStrip(slotIndex);

      const pool = runePools[slotIndex] || [];
      pickerTitle.textContent = `Choose Feat (Slot ${slotIndex + 1})`;
      optionsWrap.innerHTML = "";

      if (pool.length === 0) {
        optionsWrap.innerHTML = `<div style="color:#bbb;">No feats configured for this slot yet.</div>`;
        picker.hidden = false;
        return;
      }

      pool.forEach((opt) => {
        const div = document.createElement("div");
        div.className = "rune-option";
        div.style.backgroundImage = `url("${iconUrl(opt.icon)}")`;

        // Highlight wildcard option while wildcard mode is active
        if (
          classKey === WILDCARD_CLASS &&
          slotIndex === WILDCARD_SLOT_INDEX &&
          opt.isWildcard &&
          wildcardActive(slotIndex)
        ) {
          div.classList.add("is-selected");
        } else if (state[slotIndex] === opt.id) {
          div.classList.add("is-selected");
        }

        div.addEventListener("click", (ev) => {
          ev.stopPropagation();

          // Wildcard rune activates the mini strip immediately
          if (classKey === WILDCARD_CLASS && slotIndex === WILDCARD_SLOT_INDEX && opt.isWildcard) {
            state[slotIndex] = WILDCARD_RUNE_ID;
            saveState(classKey, state);
            renderSlots();
            openPicker(slotIndex);
            return;
          }

          // Normal selection
        state[slotIndex] = opt.id;
saveState(classKey, state);

// ✅ If they just picked the rune that wildcard slot 4 was borrowing, clear slot 4
const cleared = clearWildcardIfDuplicated(slotIndex);

renderSlots();

// If slot 4 got cleared, we already saved in clearWildcardIfDuplicated()
openPicker(slotIndex);
        });

        div.addEventListener("mousemove", (e) => showRuneTooltip(e.pageX, e.pageY, opt));
        div.addEventListener("mouseleave", hideRuneTooltip);

        optionsWrap.appendChild(div);
      });

      // Clear slot
      const clear = document.createElement("button");
      clear.type = "button";
      clear.className = "rune-clear";
      clear.textContent = "Clear Slot";
      clear.addEventListener("click", (ev) => {
        ev.stopPropagation();
        state[slotIndex] = null;
        saveState(classKey, state);
        renderSlots();
        openPicker(slotIndex);
      });
      optionsWrap.appendChild(clear);

      picker.hidden = false;
    }

    function closePicker() {
      picker.hidden = true;
      hideRuneTooltip();
      if (borrowStrip) {
        borrowStrip.hidden = true;
        borrowStrip.innerHTML = "";
      }
    }

    // Click a slot to open its picker
    slotsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".rune-slot");
      if (!btn) return;
      openPicker(Number(btn.dataset.slot));
    });

    // Hover tooltip for selected rune slots
    slotsWrap.addEventListener("mousemove", (e) => {
      const btn = e.target.closest(".rune-slot");
      if (!btn) return;

      const idx = Number(btn.dataset.slot);
      const selected = resolveSelectedRune(idx);

      if (!selected) {
        showRuneTooltip(e.pageX, e.pageY, {
          name: `Feat Slot ${idx + 1}`,
          description: "Empty — click to choose a feat."
        });
        return;
      }

      showRuneTooltip(e.pageX, e.pageY, selected);
    });

    slotsWrap.addEventListener("mouseleave", hideRuneTooltip);

    closeBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      closePicker();
    });

    // Close picker if clicking outside the rune section
    document.addEventListener("click", (e) => {
      if (picker.hidden) return;
      const within = e.target.closest(".rune-section");
      if (!within) closePicker();
    });

    renderSlots();
  });
})();
