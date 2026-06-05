const CLASS_NAME = "Druid";

const talentData = {
    'balance': {
        name: 'Balance',
        talents: [
            { id: 'improved-wrath', name: 'Improved Wrath', maxPoints: 5, row: 0, col: 0, icon: 'spell_nature_abolishmagic.jpg', description: (p) => `Reduces the cast time of your Wrath spell by ${(p * 0.1).toFixed(1)} sec and its mana cost by ${p * 20}%.` },
            { id: 'wild-mushroom', name: 'Wild Mushroom', maxPoints: 1, row: 0, col: 1, icon: 'spell_druid_wildmushroom_bloom.jpg', details: ['30 yd range','30 sec cooldown'], subDetails: ['8% of base mana','Instant cast'], description: (p) => `Grow a magical mushroom at the target's location. After 6 sec, the mushroom detonates, causing enemies within 10 yds to suffer instant Nature damage and additional Nature damage over 10 sec.
<hr>
Usable in any Shapeshift form.` },
            { id: 'improved-wild-mushroom', name: 'Improved Wild Mushroom', maxPoints: 2, row: 0, col: 2, prereq: 'wild-mushroom', icon: 'spell_druid_wildmushroom_frenzy.jpg', description: (p) => `Your Wild Mushroom detonation creates a Fungal Growth in an 8 yard radius, slowing all enemy targets by ${p * 15}%. Lasts 15 sec.` },
	{ id: 'natures-cycle', name: 'Nature\'s Cycle', maxPoints: 5, row: 1, col: 0, icon: 'ability_demonhunter_chaoticimprint_nature.jpg', description: (p) => `Increases the damage done by your periodic spells and Bleed effects by ${p * 2}%. In addition, the time required for your Wild Mushroom to detonate is reduced by ${p * 10}%.` },
        { id: 'improved-moonfire', name: 'Improved Moonfire', maxPoints: 5, row: 1, col: 1, icon: 'spell_nature_starfall.jpg', description: (p) => `Increases the damage of your Moonfire spell by ${p * 4}% and causes Moonfire to increase Arcane damage taken by the target by ${p * 1}%.` },
            { id: 'majesty', name: 'Majesty', maxPoints: 3, row: 1, col: 2, icon: 'inv_staff_01.jpg', description: (p) => `Increases your critical strike chance with all attacks and spells by ${p * 2}% in all forms. This effect increases by an additional 2% versus Beasts.` },
 	 { id: 'balance-of-power', name: 'Balance of Power', maxPoints: 2, row: 1, col: 3, icon: 'ability_druid_balanceofpower.jpg', description: (p) => `Increases your chance to hit with all spells and attacks by ${p * 2}% while above 50% total Health.<br><br>Increases your chance to resist harmful spells by ${p * 3}% while below 50% total Health.` },
		{ id: 'hostile-environment', name: 'Hostile Environment', maxPoints: 3, row: 2, col: 0, icon: 'achievement_zone_felwood.jpg', description: (p) => `Damage from your Insect Swarm, Thorns, Entangling Roots, and Treants is increased by ${p * 10}%. In addition, attacks done to you while your Barkskin is active have a ${p * 15}% chance to daze the target for 3 sec.` },
            { id: 'insect-swarm', name: 'Insect Swarm', maxPoints: 1, row: 2, col: 2, icon: 'spell_nature_insectswarm.jpg', details: ['30 yd range'], subDetails: ['4% of base mana','Instant'], description: () => `The enemy is swarmed by insects, reducing their chance to hit with melee and ranged attacks by 2% and causing Nature damage over 18 sec.
<hr>
Usable in any Shapeshift form.` },
            { id: 'natures-reach', name: 'Nature\'s Reach', maxPoints: 2, row: 2, col: 3, icon: 'spell_nature_naturetouchgrow.jpg', description: (p) => `Increases the range and damage of your Wrath, Moonfire, Starfire, and Hurricane spells by ${p * 10}%.` },
	{ id: 'lunar-guidance', name: 'Lunar Guidance', maxPoints: 1, row: 3, col: 0, icon: 'ability_druid_lunarguidance.jpg', description: (p) => `Your Moonfire critical strikes increase the damage done by Moonfire by 10%. Stacks up to 3 times. Lasts 3 sec.<br><br>Moonfire in usable in any Shapeshift form and Moonfire (Cat) awards 1 combo point.`},
	{ id: 'dreamstate', name: 'Dreamstate', maxPoints: 3, row: 4, col: 0, icon: 'ability_druid_dreamstate.jpg', description: (p) => { const values = [5, 10, 15]; return `Increases your spell damage and healing by ${p * 10}% of your total Spirit.
<br>
<br>
In addition, your Moonfire and Starfire critical strikes grant you ${values[p - 1]}% of your mana regeneration while casting. Lasts 15 sec.`;}},
            { id: 'vengeance', name: 'Vengeance', maxPoints: 2, row: 3, col: 1, prereq: 'improved-moonfire', icon: 'spell_nature_purge.jpg', description: (p) => `Increases the critical strike damage bonus of your Arcane and Nature spells by ${p * 40}%.` },
            { id: 'improved-starfire', name: 'Improved Starfire', maxPoints: 3, row: 3, col: 2, icon: 'spell_arcane_starfire.jpg', description: (p) => `Starfire extends the duration of your Moonfire on the target by ${p * 2} sec and has a ${p * 5}% chance to stun the target for 3 sec.` },
            { id: 'natures-splendor', name: 'Nature\'s Splendor', maxPoints: 1, row: 4, col: 1, icon: 'spell_nature_naturesblessing.jpg', description: () => `Wild Mushroom gains an additional charge. In addition, your spell criticals with direct damage Nature spells increase your spell casting speed by 30% for 6 sec.` },
            { id: 'tempest', name: 'Tempest', maxPoints: 3, row: 4, col: 2, icon: 'spell_druid_astralstorm.jpg', description: (p) => { const values = [25, 50, 75]; return `Reduces the cooldown of your Hurricane ability by ${values[p - 1]}% and increases its damage by ${p * 50}%.`;}},
            { id: 'eclipse', name: 'Eclipse', maxPoints: 3, row: 5, col: 1, icon: 'ability_druid_eclipse.jpg', description: (p) => `Starfire increases the critical strike chance of your next 2 Wraths by ${p * 10}%.
<br>
<br>
Wrath reduces the cast time of your next Starfire by ${p * 0.5} sec.
<hr>
Both effects stack up to 4 times.` },
	{ id: 'typhoon', name: 'Typhoon', maxPoints: 1, row: 5, col: 2, prereq: 'tempest', icon: 'ability_druid_typhoon.jpg', details: ['20 yd range','25 sec cooldown'], subDetails: ['15% of base mana','Instant'], description: () => `Summon a violent Typhoon that does Nature damage when in contact with hostile targets, knocking them back and dazing them for 6 sec.
` },
	{ id: 'frenetic-beasts', name: 'Frenetic Beasts', maxPoints: 2, row: 5, col: 0, icon: 'ability_druid_owlkinfrenzy.jpg', description: (p) => `Taking damage while Shapeshifted has a ${p * 5}% chance to cause you to gain an effect for 10 sec.
<br>
<br>
Moonkin - Damage dealt increased by ${p * 10}%.
<br>
Bear - Damage taken reduced by ${p * 10}%.
<br>
Cat - Movement speed increased by ${p * 10}%.
<hr>
This effect can occur once every 30 sec per form.` },
            { id: 'moonkin-form', name: 'Moonkin Form', maxPoints: 1, row: 6, col: 1, isUltimate: true, icon: 'spell_nature_forceofnature.jpg', subDetails: ['35% of base mana','Instant'], description: (p) => `Transforms the Druid into Moonkin Form.  While in this form your armor contribution from items is increased by 400%, your periodic damage spells can critically strike and all party members within 30 yards have their spell critical strike chance increased by 3%. The Moonkin can only cast Balance and Remove Curse spells while shapeshifted.
<hr>
The act of shapeshifting frees the caster of Polymorph and Movement Impairing effects.` },
		{ id: 'force-of-nature', name: 'Force of Nature', maxPoints: 1, row: 4, col: 3, prereq: 'natures-reach', icon: 'ability_druid_forceofnature.jpg', details: ['30 yd range','5 min cooldown'], subDetails: ['12% of base mana','Instant cast'], description: (p) => `Summons 3 Treants at the target location to attack enemies for 30 sec. Each treant leaves a seed when they die that restores 10% mana and health to you or an ally that steps over it.
<hr>
Usable in any Shapeshift form.` },
        ]
    },
    'feral-combat': {
        name: 'Feral Combat',
        talents: [
	 { id: 'heart-of-the-wild', name: 'Heart of the Wild', maxPoints: 3, row: 0, col: 0, icon: 'spell_holy_blessingofagility.jpg', description: (p) => `Grants you an effect based on your current form:<br><br>Bear - Increases your total Stamina by ${p * 2}%.<br><br>Cat - Increases your total Strength by ${p * 2}%.<br><br>Moonkin - Increases your total Intellect by ${p * 2}%.` },
            { id: 'ferocity', name: 'Ferocity', maxPoints: 5, row: 0, col: 1, icon: 'ability_hunter_pet_hyena.jpg', description: (p) => `Reduces the cost of your Maul, Swipe, Claw and Rake abilities by ${p * 1} Rage or Energy.` },
            { id: 'primal-aggression', name: 'Primal Aggression', maxPoints: 5, row: 0, col: 2, icon: 'spell_druid_wildcharge.jpg', description: (p) => `Increases the Attack Power reduction of your Demoralizing Roar by ${p * 8}%.<br><br>Increases the damage done by your Ferocious Bite by ${p * 2}%.<br><br>Increases the critical strike chance of your Wrath by ${p * 1}%.` },
		{ id: 'kindred-spirits', name: 'Kindred Spirits', maxPoints: 2, row: 1, col: 0, icon: 'ability_druid_mastershapeshifter.jpg', description: (p) => `Increases your armor contributions from items by  ${p * 5}% and reduces the chance enemies have to detect you while Prowling.` },
           { id: 'symbiotic-relationship', name: 'Symbiotic Relationship', maxPoints: 2, row: 2, col: 0, icon: 'spell_nature_insect_swarm2.jpg', description: (p) => `Insect Swarm deals ${p * 10}% increased damage to enemies infected with Rabies and heals the Druid for ${p * 100}% of the damage it deals.` },
            { id: 'feral-swiftness', name: 'Feral Swiftness', maxPoints: 2, row: 0, col: 3, icon: 'spell_beastmaster_wolf.jpg', description: (p) => `Increases your movement speed by ${p * 10}% in Cat Form and increases your chance to dodge while Shapeshifted by ${p * 2}%.` },
            { id: 'feral-charge', name: 'Feral Charge', maxPoints: 1, row: 1, col: 1, icon: 'ability_hunter_pet_bear.jpg', details: ['8-25 yd range','25 sec cooldown'], subDetails: ['10 Energy or 5 Rage','Instant'], description: () => `Feral Charge (Bear) - Causes you to charge an enemy, immobilizing and interrupting any spell being cast for 3 sec.
<br>
<br>
Feral Charge (Cat) - Causes you to leap behind an enemy, dazing them for 3 sec and reducing the Energy cost of your next ability by 50%.` },
            { id: 'feeding-frenzy', name: 'Feeding Frenzy', maxPoints: 2, row: 3, col: 3, prereq: 'beastial-fury', icon: 'inv_skinning_80_bloodsoakedbone.jpg', description: (p) => `Ferocious Bite has a ${p * 50}% chance to refresh the duration of your Rip on targets at or below 25% health.
<br>
<br>
Maul has a ${p * 15}% chance to apply Rip while in Bear Form as if it had been applied with 1 combo point.` },
	{ id: 'stampede', name: 'Stampede', maxPoints: 1, row: 1, col: 2, prereq: 'feral-charge', icon: 'spell_druid_feralchargecat.jpg', description: () => `
Feral Charge (Bear) increases your attack speed by 10% for 10 sec.
<br>
<br>
Feral Charge (Cat) causes your next Ravage to not require stealth or have a positioning requirement for 10 sec.` },
	{ id: 'nurturing-instinct', name: 'Nurturing Instinct', maxPoints: 2, row: 1, col: 3, icon: 'ability_druid_healinginstincts.jpg', description: (p) => `Increases your healing spells by up to ${p * 50}% of your Agility, and increases healing received by ${p * 10}% while in Cat and Moonkin Forms.` },
            { id: 'agitation', name: 'Agitation', maxPoints: 5, row: 3, col: 1, icon: 'spell_druid_bristlingfur.jpg', description: (p) => `Shred costs ${p * 6} less Energy and has a ${p * 6}% chance to reset the cooldown of Mangle (Cat).
<br>
<br>
Lacerate costs ${p} less Rage and has a ${p * 6}% chance to reset the cooldown of Mangle (Bear).` },
            { id: 'predatory-instincts', name: 'Predatory Instincts', maxPoints: 1, row: 4, col: 1, icon: 'ability_hunter_pet_cat.jpg', description: (p) => `Increases your Attack Power in Cat Form and Bear Form by 150% of your level. In addition, you generate 3 Rage or 5 Energy when you dodge in Bear Form or Cat Form. ` },
            { id: 'bloody-claws', name: 'Bloody Claws', maxPoints: 2, row: 3, col: 2, prereq: 'rabies', icon: 'ability_ghoulfrenzy.jpg', description: (p) => `Targets infected by Rabies deal ${p * 2}% less damage to you. In addition, your Mangle while in Bear Form heals you for ${p * 2}% of your total Health when used on targets infected with Rabies.` },
            { id: 'beastial-fury', name: 'Beastial Fury', maxPoints: 2, row: 2, col: 3, icon: 'ability_racial_cannibalize.jpg', description: (p) => `Gives you a ${p * 50}% chance to gain an additional 5 Rage anytime you get a critical strike while in Bear Form and your critical strikes from Cat Form abilities that add combo points have a 50% chance to add an additional combo point.` },
            { id: 'survival-instincts', name: 'Survival Instincts', maxPoints: 1, row: 4, col: 2, icon: 'ability_druid_tigersroar.jpg', details: ['3 min cooldown'], subDetails: ['Instant'], description: (p) => `The Druid bristles their fur and shrugs off the pain, causing 40% of incoming damage to be distributed over 15 seconds.
<hr>
Usable in any Shapeshift form.` },
	 { id: 'brutal-swipes', name: 'Brutal Swipes', maxPoints: 2, row: 4, col: 3, icon: 'inv_ability_druidoftheclawdruid_ravage.jpg', description: (p) => `Your Swipe ability deals ${p * 5}% increased damage and has a ${p * 20}% chance to spread Rabies and Rake's bleed effect to all enemies struck.` },
	{ id: 'king-of-the-jungle', name: 'King of the Jungle', maxPoints: 3, row: 5, col: 0, prereq: 'leader-of-the-pack', icon: 'ability_druid_kingofthejungle.jpg', description: (p) => `Your Tiger's Fury ability in Cat Form instantly provides ${p * 10} Energy. In addition, while Tiger's Fury is on cooldown your finishing moves in Cat Form grant ${p * 1} Energy per combo point.` },
            { id: 'rabies', name: 'Rabies', maxPoints: 3, row: 2, col: 1, icon: 'ability_creature_disease_04.jpg', description: (p) => `Your critical strikes in Bear Form or Cat Form infect the target, slowing their movement speed by ${p * 5}% and increasing their damage taken from Nature spells and effects by ${p * 1}% for 20 sec.` },
		{ id: 'ursine-savagery', name: 'Ursine Savagery', maxPoints: 3, row: 5, col: 2, prereq: 'leader-of-the-pack', icon: 'spell_druid_malfurionstenacity.jpg', description: (p) => `Your basic attacks in Bear Form have a chance equal to your chance to hit to cause a Fury Swipe, dealing ${p * 20}% weapon damage.` },
            { id: 'leader-of-the-pack', name: 'Leader of the Pack', maxPoints: 1, row: 5, col: 1, icon: 'spell_nature_unyeildingstamina.jpg', description: () => `While in Cat Form or Bear Form, increases ranged and melee critical chance of all party members within 40 yards by 3%. In addition, your melee critical strikes restore 2% of your maximum mana.` },
	{ id: 'mangle', name: 'Mangle', maxPoints: 1, row: 6, col: 1, prereq: 'leader-of-the-pack', isUltimate: true, icon: 'ability_druid_mangle2.jpg', details: ['Melee range','6 sec cooldown'], subDetails: ['45 Energy or 20 Rage','Instant'], description: () => `Mangle the target, inflicting damage and causing the target to take 30% additional damage from Shred and Bleed effects for 1 min.
<hr>
Usable in Cat Form or Bear Form.` },
        ]
    },
    'restoration': {
        name: 'Restoration',
        talents: [
            { id: 'wild-touched', name: 'Wild Touched', maxPoints: 2, row: 0, col: 1, icon: 'spell_nature_regeneration.jpg', description: (p) => `Increases your total Spirit by ${p * 3}% and the effects of your Mark of the Wild and Gift of the Wild spells by ${p * 20}%.` },
	{ id: 'furor', name: 'Furor', maxPoints: 5, row: 0, col: 2, icon: 'spell_holy_blessingofstamina.jpg', description: (p) => `Shapeshifting costs ${p * 2}% less mana. In addition, you gain ${p * 2} Rage when you shapeshift into Bear Form and keep up to ${p * 20} Energy when you shapeshift into Cat Form.` },
            { id: 'improved-healing-touch', name: 'Improved Healing Touch', maxPoints: 5, row: 1, col: 0, icon: 'spell_nature_healingtouch.jpg', description: (p) => `Reduces the cast time of Healing Touch by ${p * 0.1} sec and its mana cost by ${p * 3}%.` },
            { id: 'natures-focus', name: 'Nature\'s Focus', maxPoints: 3, row: 0, col: 3, icon: 'spell_nature_healingwavegreater.jpg', description: (p) => `Reduces the pushback suffered from damaging attacks and spells while casting Healing Touch, Wrath, Entangling Roots, Regrowth and Tranquility by ${p * 25}%.` },
            { id: 'flourishing', name: 'Flourishing', maxPoints: 3, row: 3, col: 2, icon: 'spell_nature_rejuvenation.jpg', description: (p) => `Increases the healing done by your Lifebloom by ${p * 5}% and the critical effect chance of your Regrowth by ${p * 10}%.` },
            { id: 'intensity', name: 'Intensity', maxPoints: 3, row: 1, col: 2, icon: 'spell_frost_windwalkon.jpg', description: (p) => `Allows ${p * 10}% of your Mana regeneration to continue while casting and causes your Enrage ability to instantly generate ${p * 2} Rage.` },
            { id: 'omen-of-clarity', name: 'Omen of Clarity', maxPoints: 1, row: 2, col: 2, prereq: 'intensity', icon: 'spell_nature_crystalball.jpg', description: (p) => `Your auto attacks and abilities have a chance of causing you to enter a Clearcasting state.  This state reduces the Mana, Rage or Energy cost of your next ability by 100%.  Lasts 15 min.` },
            { id: 'verdant-life', name: 'Verdant Life', maxPoints: 2, row: 2, col: 3, icon: 'inv_misc_herb_fellotus.jpg', description: (p) => `Increases the healing done by your Rejuvenation by ${p * 5}% and whenever your Rejuvenation heals a full health target, its duration is increased by ${p * 1} sec, up to a maximum total increase of ${p * 2} sec per cast.` },
            { id: 'tranquil-spirit', name: 'Tranquil Spirit', maxPoints: 5, row: 2, col: 1, icon: 'spell_holy_elunesgrace.jpg', description: (p) => `Increases your total Spirit by ${p * 2}% and reduces the threat generated by your spells by ${p * 3}%` },
            { id: 'gift-of-life', name: 'Gift of Life', maxPoints: 5, row: 4, col: 2, icon: 'spell_lifegivingseed.jpg', description: (p) => `When you critically heal or damage a target with any non-periodic Nature spell, you plant a magical seed in them for ${p * 6}% of the amount. The seed blooms the next time the target takes damage, dealing Nature damage to an enemy or healing an ally. Lasts 15 sec.` },
	{ id: 'pollination', name: 'Pollination', maxPoints: 3, row: 4, col: 3, icon: 'inv_collections_armor_flowerbracelet_b_01.jpg', description: (p) => `Each time your Regrowth's periodic effect heals a target, it has a ${p * 10}% chance to heal a nearby injured party or raid member within 15 yds for the same amount.` },
 	{ id: 'friend-of-the-forest', name: 'Friend of the Forest', maxPoints: 3, row: 5, col: 2, icon: 'inv_ability_keeperofthegrovedruid_dreamsurge_fiendly.jpg', description: (p) => `Your healing spells have a chance to attract a sapling to assist you. The sapling reduces the mana cost of your spells by ${p * 2}% and occasionally hastens one of your active heal-over-time effects by ${p * 10}%. Lasts 20 sec.` },
	{ id: 'improved-tranquility', name: 'Improved Tranquility', maxPoints: 2, row: 3, col: 3, icon: 'spell_nature_tranquility.jpg', description: (p) => `Reduces the mana cost and cooldown of Tranquility by ${p * 25}%. In addition, Tranquility restores ${p * 1} sec to any of your active heal-over-time effects on targets it heals.` },
            { id: 'natures-swiftness', name: 'Nature\'s Swiftness', maxPoints: 1, row: 3, col: 0, prereq: 'improved-healing-touch', icon: 'spell_nature_ravenform.jpg', details: ['3 minute cooldown'], subDetails: ['Instant'], description: (p) => `
When activated, your next Nature spell becomes an instant cast spell and ignores healing reduction or damage reduction effects.` },
 	{ id: 'fury-of-the-forest', name: 'Fury of the Forest', maxPoints: 3, row: 5, col: 0, icon: 'ability_druid_replenish.jpg', description: (p) => `When you deal damage with Wrath you have a ${p * 5}% chance to make your next Starfire or Healing Touch within 6 sec become instant cast and generate no threat.` },
            { id: 'overgrowth', name: 'Overgrowth', maxPoints: 1, row: 4, col: 1, isUltimate: true, prereq: 'tranquil-spirit', icon: 'spell_druid_rampantgrowth.jpg', details: ['40 yd range', '15 sec cooldown'], subDetails: ['10% of base mana', 'Instant cast'], description: () => `Consumes a Rejuvenation, Regrowth or Wild Growth effect on a friendly target to instantly heal them and summon flora at their location, healing the 3 most injured party or raid members within 8 yards over 8 sec.` },
	{ id: 'natures-chosen', name: 'Nature\'s Chosen', maxPoints: 1, row: 4, col: 0, icon: 'ability_hunter_onewithnature.jpg', description: (p) => `Increases all attributes by 5% while outdoors.<br><br>Whenever you fall below 40% health, you are blessed by the forest, gaining a free Rejuvenation one rank higher than you have trained.` },
	{ id: 'lifebloom', name: 'Lifebloom', maxPoints: 1, row: 5, col: 1, prereq: 'overgrowth', icon: 'inv_misc_herb_felblossom.jpg', details: ['40 yd range'], subDetails: ['14% of base mana','Instant'], description: (p) => `Heals the target over 7 sec.  When Lifebloom completes its duration or is dispelled, the target instantly heals for an additional amount and the Druid regains half the cost of the spell. This effect can stack up to 3 times on the same target.` },
	{ id: 'revitalizing-spores', name: 'Revitalizing Spores', maxPoints: 2, row: 1, col: 1, icon: 'inv_seed_magicalspores.jpg', description: (p) => `Your Wild Mushroom detonations heal the closest ally within 10 yds for an amount equal to ${p * 100}% of your total Spirit and grants a random side effect:<br><br>
<img class="inline-mini-icon"
       src="images/icons/inv_misc_herb_starflower.jpg"
       alt="">
  <span class="text-white">Sporerush</span><br>
Casting speed increased by 10% for 6 sec.
<br><br>
<img class="inline-mini-icon"
       src="images/icons/inv_viridescent_spores_green.jpg"
       alt="">
  <span class="text-white">Verdant Focus</span><br>
All weapon skills increased by 6 for 10 sec.<br><br>
<img class="inline-mini-icon"
       src="images/icons/inv_12_profession_herbalism_blacklotus_lightbloom.jpg"
       alt="">
  <span class="text-white">Daydream</span><br>
Restores 2% total Mana, 8 Energy, 2 Rage or 4 Prowess.<hr>Afterwards, the target becomes lethargic, reducing their movement speed by 10% for 8 sec.
` },
	{ id: 'wild-growth', name: 'Wild Growth', maxPoints: 1, row: 6, col: 1, icon: 'ability_druid_flourish.jpg', details: ['40 yd range','10 sec cooldown'], subDetails: ['30% of base mana','1.5 sec cast'], description: (p) => `Heals up to 5 allies within 30 yards of the target over 7 sec, prioritizing the most injured first. The healing is applied quickly at first, and slows down as the spell reaches its full duration.`},
        ]
    }
};
