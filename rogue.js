const CLASS_NAME = "Rogue";

const talentData = {
    'assassination': {
        name: 'Assassination',
        talents: [
            { id: 'improved-technique', name: 'Improved Technique', maxPoints: 3, row: 0, col: 0, icon: 'ability_rogue_eviscerate.jpg', description: (p) => `Increases the damage done by Eviscerate and Mutilate by ${p * 5}%.` },
            { id: 'remorseless-attacks', name: 'Remorseless Attacks', maxPoints: 2, row: 0, col: 1, icon: 'ability_fiegndead.jpg', description: (p) => `When an enemy you have damaged within the last 5 sec dies, the critical strike chance of your next ability within 15 sec is increased by ${p * 10}% and your Slice and Dice ability is refreshed to its original duration.
<hr>
This effect only triggers from enemies that yield experience or honor.` },
            { id: 'malice', name: 'Malice', maxPoints: 5, row: 0, col: 2, icon: 'sha_ability_rogue_bloodyeye.jpg', description: (p) => `Increases your critical strike chance by ${p}%.  This effect increases by an additional 2% versus Humanoids and Giants.` },
            { id: 'deviousness', name: 'Deviousness', maxPoints: 3, row: 1, col: 0, icon: 'ability_rogue_deviouspoisons.jpg', description: (p) => `Your finishing moves have a ${p * 20}% chance to add a Combo Point on poisoned targets.` },
	{ id: 'murder', name: 'Murder', maxPoints: 3, row: 1, col: 1, icon: 'ability_rogue_slaughterfromtheshadows.jpg', description: (p) => `When you Backstab enemies below ${p * 10}% health, you restore 10 Energy. This effect is doubled versus Humanoids and Giants.` },
        { id: 'lethality', name: 'Lethality', maxPoints: 5, row: 2, col: 2, prereq: 'malice', icon: 'ability_criticalstrike.jpg', description: (p) => `Increases the critical strike damage bonus of all Combo Point-generating abilities that do not require stealth by ${p * 4}%.` },
 	{ id: 'self-tested-toxins', name: 'Self-Tested Toxins', maxPoints: 2, row: 2, col: 0, icon: 'inv_alchemy_90_modifiedreagent_green.jpg', description: (p) => `Reduces the duration of all Poison effects applied to you by ${p * 25}% and gives your poisons an additional ${p * 10}% chance to resist dispel effects.` },
            { id: 'improved-poisons', name: 'Improved Poisons', maxPoints: 5, row: 3, col: 2, icon: 'ability_poisons.jpg', description: (p) => `Increases the chance to apply Deadly Poison to your target by ${p * 2}% and the frequency of applying Instant Poison to your target by ${p * 4}%.` },
	{ id: 'master-poisoner', name: 'Master Poisoner', maxPoints: 1, row: 4, col: 3, prereq: 'improved-poisons', icon: 'ability_rogue_deadlybrew.jpg', description: (p) => `Your damaging poisons now gain increased damage from your Attack Power and spell damage. In addition, when you inflict any other poison on a target, you also inflict Deadly Poison.` },
	{ id: 'superior-mixture', name: 'Superior Mixture', maxPoints: 1, row: 3, col: 1, icon: 'ability_rogue_crimsonvial.jpg', description: (p) => `Any potion you imbibe also provides you with the benefits of a Healing Potion of similar level or potency and restores 10 Energy.` },
	{ id: 'gutted-fish', name: 'Gutted Fish', maxPoints: 3, row: 1, col: 3, icon: 'ability_rogue_surpriseattack.jpg', description: (p) => `Your ranged attacks and abilities cause the target to bleed for damage equal to ${p * 5}%  of your Attack Power over 10 sec.
<hr>
Periodic damage from this effect always critically strikes moving targets.` },
	{ id: 'quickening', name: 'Quickening', maxPoints: 2, row: 0, col: 3, icon: 'ability_rogue_quickrecovery.jpg', description: (p) => { const healingValues = [5, 10]; return `Healing effects on you are increased by ${healingValues[p - 1]}% while below 60% total Health.<br><br>Receiving a critical heal reduces the cooldown of your Evasion by ${p} sec.<hr>This effect can occur once every 6 sec.`;}},
            { id: 'cold-blood', name: 'Cold Blood', maxPoints: 1, row: 4, col: 1, icon: 'spell_ice_lament.jpg', details: ['3 min cooldown'], subDetails: ['Instant'], description: () => `When activated, generates 25 Energy and increases the critical strike chance of your next non-periodic offensive ability by 100%.` },
	{ id: 'venomous-wounds', name: 'Venomous Wounds', maxPoints: 5, row: 5, col: 2, icon: 'ability_rogue_venomouswounds.jpg', description: (p) => `Each time your Rupture or Garrote deals damage to a poisoned enemy, you have a ${p * 6}% chance to deal additional Nature damage and regain 10 Energy.` },
            { id: 'weak-prey', name: 'Weak Prey', maxPoints: 1, row: 4, col: 2, icon: 'ability_rogue_kidneyshot.jpg', description: (p) => `You deal 3% increased damage to stunned targets.<br><br>While affected by your Kidney Shot ability, the target receives an additional 3% damage from all sources.` },
            { id: 'seal-fate', name: 'Seal Fate', maxPoints: 2, row: 5, col: 1, icon: 'ability_rogue_stayofexecution.jpg', description: (p) => `Your critical strikes from abilities that add Combo Points have a ${p * 40}% chance to add an additional Combo Point.` },
            { id: 'extreme-training', name: 'Extreme Training', maxPoints: 1, row: 6, col: 0, prereq: 'poisonous-ricochet', icon: 'achievement_general_raidrepresentation.jpg', description: () => `Increases your maximum Energy by 10 and reduces all Nature and Physical damage taken by 5%.` },
	{ id: 'smoke-bomb', name: 'Smoke Bomb', maxPoints: 1, row: 2, col: 1, icon: 'ability_rogue_smoke.jpg', subDetails: ['0.5 sec cast','Reagents: <br> Flash Powder'], details: ['20 yd range', '2 min cooldown'], description: () => `Creates a cloud of smoke in a 10 yd radius for 10 sec. All creatures within the cloud except you have their chance to hit reduced by 20%, modified by Stealth detection.
<hr>
Ineffective on enemies higher than level 61 or which are marked as boss enemies.` },
	{ id: 'poisonous-ricochet', name: 'Poisonous Ricochet', maxPoints: 2, row: 4, col: 0, icon: 'ability_rogue_poisonedknife.jpg', description: (p) => `Your Shuriken Toss ability bounces to ${p * 2} additional targets and has a ${p * 25}% chance to apply the poison from your off-hand weapon to each target hit.` },
	{ id: 'mutilate', name: 'Mutilate', maxPoints: 1, row: 6, col: 3, isUltimate: true,
    prereq: 'master-poisoner', icon: 'ability_rogue_shadowstrikes.jpg', subDetails: ['55 Energy','Instant'], details: ['Melee Range'], description: () => `Instantly attacks with both weapons for additional damage. Damage is increased by 20% against Poisoned targets. Awards 2 Combo Points.` },
        ]
    },
    'combat': {
        name: 'Combat',
        talents: [
            { id: 'improved-gouge', name: 'Improved Gouge', maxPoints: 2, row: 0, col: 0, icon: 'ability_gouge.jpg', description: (p) => `Increases the effect duration of your Gouge ability by ${p} sec and reduces its Energy cost by ${p * 15}.` },
            { id: 'efficient-killing', name: 'Efficient Killing', maxPoints: 2, row: 0, col: 1, icon: 'spell_shadow_ritualofsacrifice.jpg', description: (p) => `Reduces the Energy cost of Sinister Strike and Garrote by ${p === 1 ? '3' : '5'}.` },
            { id: 'lightning-reflexes', name: 'Lightning Reflexes', maxPoints: 5, row: 2, col: 2, icon: 'ability_rogue_ghostpirate.jpg', description: (p) => `Increases your Dodge chance by ${p}% and reduces the cooldown of your Evasion ability by ${p * 12} sec.` },
            { id: 'aggression', name: 'Aggression', maxPoints: 2, row: 1, col: 3, icon: 'ability_backstab.jpg', description: (p) => `Increases the damage of your Riposte, Sinister Strike, Backstab, and Eviscerate abilities by ${p * 5}%.` },
            { id: 'flick-of-the-wrist', name: 'Flick of the Wrist', maxPoints: 5, row: 1, col: 1, icon: 'ability_bastion_rogue.jpg', description: (p) => `Increases your Parry chance and attack speed by ${p}%.` },
            { id: 'trickster', name: 'Trickster', maxPoints: 5, row: 1, col: 2, icon: 'rogue_shadowfocus.jpg', description: (p) => `Increases your chance to hit with weapons, poison attacks and trinket effects by ${p * 1}%.` },
            { id: 'endurance', name: 'Endurance', maxPoints: 5, row: 0, col: 2, icon: 'spell_shadow_shadowward.jpg', description: (p) => `Reduces the cooldown of your Sprint ability by ${p * 12} sec and increases your total Stamina by ${p * 1}%.` },
            { id: 'riposte', name: 'Riposte', maxPoints: 1, row: 2, col: 1, prereq: 'flick-of-the-wrist', icon: 'ability_warrior_challange.jpg', details: ['Melee Range', '6 sec cooldown'], subDetails: ['10 Energy', 'Instant'], description: () => `A strike that becomes active after parrying an attack. Deals 150% weapon damage and increases the damage of your next finishing move by 35%. Awards 1 Combo Point.` },
            { id: 'rapidity', name: 'Rapidity', maxPoints: 2, row: 1, col: 0, icon: 'ability_rogue_sprint.jpg', description: (p) => `Gives a ${p * 50}% chance to remove all movement impairing effects when you activate your Sprint ability. In addition, increases the duration of your Slice and Dice ability by ${p * 1} sec.` },
            { id: 'improved-kick', name: 'Improved Kick', maxPoints: 2, row: 2, col: 3, icon: 'ability_kick.jpg', description: (p) => `Your Kick ability also silences the target for ${p * 1} sec.` },
 	{ id: 'axe-specialization', name: 'Axe Specialization', maxPoints: 3, row: 3, col: 0, icon: 'inv_axe_1h_garrison_a_03.jpg', description: (p) => `Allows you to use One-Handed Axes and increases your skill with Maces, Swords, Fist Weapons, Axes, and Daggers by ${p * 2}.` },
            { id: 'tools-of-torture', name: 'Tools of Torture', maxPoints: 1, row: 4, col: 0, prereq: 'axe-specialization', icon: 'inv_10_specialization_leatherworking_harvesting_color2.jpg', description: (p) => `Your equipped weapon has a 5% chance to:
<br>
<br>
Dagger / Axe -  Critically strike.
<br>
Mace / Fist Weapon -  Daze the target for 3 sec.
<br>
Sword / Glaive - Gain an extra attack.
<hr>
Switching weapons during combat places this effect on a 30 sec cooldown.` },
		{ id: 'serpents-cunning', name: 'Serpent\'s Cunning', maxPoints: 3, row: 4, col: 1, icon: 'ability_rogue_preyontheweak.jpg', description: (p) => `Your off-hand weapon deals ${p * 10}% increased damage to poisoned or bleeding enemies. In addition, enemies that are both poisoned and bleeding have a ${p * 2}% reduced chance to critically strike you.` },
		{ id: 'gushing-wounds', name: 'Gushing Wounds', maxPoints: 1, row: 4, col: 2, icon: 'ability_revendreth_rogue.jpg', description: (p) => `Your melee critical strikes increase the effectiveness of Bleeds on the target by 30%. Lasts 30 sec.` },
		{ id: 'unseen-blade', name: 'Unseen Blade', maxPoints: 1, row: 4, col: 3, prereq: 'improved-kick', icon: 'inv_knife_1h_etherealtool_b_01.jpg', description: (p) => `You store a hidden dagger in your boot. Kicking a target deals 50% off-hand weapon damage and applies Occult Poision, causing them to take 3% increased Nature and Shadow damage for 30 sec.` },
            { id: 'perfectly-balanced-defense', name: 'Perfectly Balanced Defense', maxPoints: 2, row: 3, col: 2, icon: 'garrison_greenarmorupgrade.jpg', description: (p) => `Increases the Armor value of cloth and leather items by ${p * 25}%. In addition, allows you to equip one piece of mail armor for each piece of cloth armor worn.` },
            { id: 'blade-flurry', name: 'Blade Flurry', maxPoints: 1, row: 3, col: 1, icon: 'ability_warrior_punishingblow.jpg', subDetails: ['25 Energy','Instant'], details: ['2 min cooldown'], description: () => `Increases your attack speed by 20% and causes your attacks to strike an additional nearby opponent. Lasts 15 sec.` },
		{ id: 'unfair-advantage', name: 'Unfair Advantage', maxPoints: 5, row: 5, col: 1, icon: 'ability_rogue_unfairadvantage.jpg', description: (p) => `Whenever you dodge or parry an attack, you strike back for ${p * 20}% of your off-hand weapon's damage and increase your Parry chance by ${p * 9}% for 6 sec.<hr>This effect can occur once every 10 sec.` },
		{ id: 'honor-among-thieves', name: 'Honor Among Thieves', maxPoints: 3, row: 5, col: 2, icon: 'ability_rogue_honoramongstthieves.jpg', description: (p) => `Whenever a party member critically strikes your current target, there is a ${p * 5}% chance you generate 5 Energy and Riposte becomes active for 6 sec.` },
            { id: 'adrenaline-rush', name: 'Adrenaline Rush', maxPoints: 1, row: 6, col: 1, isUltimate: true, icon: 'spell_shadow_shadowworddominate.jpg', details: ['5 min cooldown'], subDetails: ['Instant'], description: () => `Increases your Energy regeneration rate by 100% and reduces your damage taken by 30% for 15 sec.` },
        ]
    },
    'subtlety': {
        name: 'Subtlety',
        talents: [
            { id: 'relentless-strikes', name: 'Relentless Strikes', maxPoints: 5, row: 0, col: 0, icon: 'ability_warrior_decisivestrike.jpg', description: (p) => `Your finishing moves have a ${p * 4}% chance per Combo Point to restore 25 energy.` },
	{ id: 'master-of-deception', name: 'Master of Deception', maxPoints: 5, row: 0, col: 2, icon: 'spell_shadow_charm.jpg', description: (p) => `Reduces the chance enemies have to detect you while in Stealth. In addition, your first ability after leaving Stealth deals an additional ${p * 2}% damage.` },
            { id: 'opportunity', name: 'Opportunity', maxPoints: 3, row: 0, col: 1, icon: 'ability_rogue_wrongfullyaccused.jpg', description: (p) => `Increases the damage dealt with your Backstab and Ambush by ${p * 5}%.` },
            { id: 'elusive-target', name: 'Elusive Target', maxPoints: 2, row: 3, col: 2, icon: 'ability_rogue_thiefsbargain.jpg', description: (p) => `Reduces your damage taken from area of effect attacks by ${p * 15}%. In addition, your Feint ability no longer costs Energy and its threat reduction is increased by ${p * 20}%.` },
            { id: 'shadowstep', name: 'Shadowstep', maxPoints: 1, row: 1, col: 2, prereq: 'master-of-deception', icon: 'ability_rogue_shadowstep.jpg', subDetails: ['20 Energy','Instant',"Requires Stealth"], details: ['20 yd range', '1 min cooldown'], description: () => `Step through the shadows, reappearing behind your target. For the next 6 sec, your Stealthed movement speed is increased by 30%.` },
            { id: 'initiative', name: 'Initiative', maxPoints: 3, row: 1, col: 0, icon: 'spell_shadow_fumble.jpg', description: (p) => `Gives you a ${p * 25}% chance to add an additional Combo Point to your target when using Ghostly Strike, Riposte, Ambush, Garrote, or Cheap Shot.` },
             { id: 'serrated-blades', name: 'Serrated Blades', maxPoints: 3, row: 4, col: 2, icon: 'inv_sword_17.jpg', description: (p) => `Causes your attacks to ignore up to ${p * 3}% of your target's Armor and increases the damage dealt by your Rupture ability by ${p * 10}%.` },
		{ id: 'ghostly-strike', name: 'Ghostly Strike', maxPoints: 1, row: 5, col: 2, icon: 'spell_shadow_curse.jpg', subDetails: ['40 Energy','Instant'], details: ['Melee Range', '20 sec cooldown'], description: () => `A strike that deals 115% weapon damage and grants you Ghosting for 10 sec. Awards 1 Combo Point.<hr>Ghosting increases your chance to Dodge by 10% and allows you to Backstab enemies facing you.` },
            { id: 'improved-ambush', name: 'Improved Ambush', maxPoints: 3, row: 2, col: 2, icon: 'ability_rogue_ambush.jpg', description: (p) => `Ambush has a ${p * 20}% increased critical strike chance. In addition, your Backstab has a ${p * 5}% chance to make your next Ambush within 10 sec not require Stealth.` },
 	{ id: 'waylay', name: 'Waylay', maxPoints: 1, row: 3, col: 3, prereq: 'improved-ambush', icon: 'ability_rogue_waylay.jpg', description: (p) => `Your Ambush unbalances the target, reducing their movement speed by 30% for 12 sec. In addition, if the target attempts to charge, dash, blink, or leap they have a 10% chance to fall down instead.
<hr>
Waylay can occur once every 45 sec.` },
            { id: 'overkill', name: 'Overkill', maxPoints: 2, row: 5, col: 0, icon: 'ability_hunter_rapidkilling.jpg', description: (p) => `While stealthed, and for 20 seconds after breaking Stealth, you regenerate ${p * 15}% additional Energy.` },
            { id: 'soothing-darkness', name: 'Soothing Darkness', maxPoints: 2, row: 5, col: 3, icon: 'rogue_shadow_reflection.jpg', description: (p) => `Reduces the cooldown of your Stealth ability by ${p * 2} sec and causes your Smoke Bomb ability to grant you Ghosting while you are within its radius.<hr>Ghosting increases your chance to Dodge by 10% and allows you to Backstab enemies facing you.` },
            { id: 'preparation', name: 'Preparation', maxPoints: 1, row: 4, col: 1, icon: 'ability_rogue_preparation.jpg', details: ['5 min cooldown'], subDetails: ['Instant'], description: () => `When activated, this ability immediately finishes the cooldown on your Evasion, Sprint, Cold Blood and Vanish abilities.` },
            { id: 'dirty-deeds', name: 'Dirty Deeds', maxPoints: 2, row: 6, col: 2, prereq: 'premeditation',  icon: 'ability_rogue_dirtydeeds.jpg', description: (p) => `Reduces the Energy cost of your Cheap Shot and Garrote  by ${p * 5} and your Backstab deals ${p * 5}% more damage to targets above 70% total Health.` },
            { id: 'hemorrhage', name: 'Hemorrhage', maxPoints: 1, row: 2, col: 1, icon: 'spell_shadow_lifedrain.jpg', subDetails: ['30 Energy','Instant'], details: ['Melee Range'], description: () => `An instant attack that deals 110% weapon damage and causes the target to hemorrhage, increasing all Physical damage dealt to the target. Lasts 15 charges or 15 sec. Awards 1 Combo Point.` },
		{ id: 'setup', name: 'Setup', maxPoints: 2, row: 2, col: 0, icon:'ability_ironmaidens_darkhunt.jpg', description: (p) => { const values = [50, 100]; return `Gives you a ${values[p - 1]}% chance to add a Combo Point to your target after dodging their attack or fully resisting one of their spells.<hr>This effect can occur once per sec.`;}},
            { id: 'blackjack', name: 'Blackjack', maxPoints: 2, row: 3, col: 1, icon: 'ability_rogue_blackjack.jpg', description: (p) => `Gives you a ${p * 50}% chance to return to Stealth after using your Sap ability. In addition, after your Sap wears off, the target's base stats are reduced by ${p * 5}% for 8 sec.` },
            { id: 'deadliness', name: 'Deadliness', maxPoints: 5, row: 1, col: 1, icon: 'ability_demonhunter_brandofthehunt.jpg', description: (p) => `Reduces the Energy cost of your Backstab and Ambush abilities by ${p * 4} and increases all damage done to enemies who aren't targeting you by ${p * 1}%.` },
	{ id: 'dead-of-night', name: 'Dead of Night', maxPoints: 3, row: 3, col: 0, icon: 'spell_shadow_twilight.jpg', description: (p) => `Allows Shadowstep to be usable outside of Stealth and reduces its cooldown by ${p * 10} sec.` },
            { id: 'premeditation', name: 'Premeditation', maxPoints: 1, row: 6, col: 1, isUltimate: true, prereq: 'preparation', icon: 'spell_shadow_possession.jpg', details: ['30 sec cooldown'], subDetails: ['30 yd range', 'Instant',"Requires Stealth"], description: () => `Adds 2 Combo Points to your target. You must add to or use those points within 20 sec or they are lost.` },
	        ]
    }
};
