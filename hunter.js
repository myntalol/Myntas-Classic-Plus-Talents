const CLASS_NAME = "Hunter";
    const talentData = {
        'beast-mastery': {
            name: 'Beast Mastery',
            talents: [
                { id: 'avian-aggression', name: 'Avian Aggression', maxPoints: 5, row: 0, col: 1, icon: 'spell_nature_ravenform.jpg', description: (p) => `Aspect of the Hawk causes all normal ranged attacks to have a 10% chance of increasing ranged attack speed by ${p * 3}% for 12 sec.` },
                { id: 'natural-fortitude', name: 'Natural Fortitude', maxPoints: 2, row: 1, col: 3, icon: 'inv_misc_scales_dragongreen03.jpg', description: (p) => `Increases the Health of your pet by ${p * 5}%,<br><br>Increases your Health by ${p * 3}%.` },
                { id: 'pack-tactics', name: 'Pack Tactics', maxPoints: 3, row: 3, col: 1, icon: 'inv_ability_packleaderhunter_vicioushunt.jpg', description: (p) => `Your pet's basic attacks have a  ${p * 5}% chance to reduce the cooldown of your Rapid Killing ability by ${p} sec.` },
                { id: 'ambidextrous-primate', name: 'Ambidextrous Primate', maxPoints: 5, row: 0, col: 2, icon: 'ability_hunter_aspectofthemonkey.jpg', description: (p) => `Aspect of the Monkey increases your offhand weapon damage by ${p * 6}% and causes your Raptor Strike to strike with both weapons when dual-wielding.` },
                { id: 'rapid-care', name: 'Rapid Care', maxPoints: 1, row: 2, col: 0, prereq: 'improved-mend-pet', icon: 'achievement_guild_doctorisin.jpg', description: (p) => `Your Mend Pet spell becomes an instant cast, heal-over-time effect but has a 30 sec cooldown.` },
                { id: 'improved-revive-pet', name: 'Improved Revive Pet', maxPoints: 2, row: 1, col: 2, icon: 'ability_hunter_beastsoothe.jpg', description: (p) => `Revive Pet's casting time is reduced by ${p * 3} sec and increases the health your pet returns with by an additional ${p * 15}%.` },
                { id: 'triangulation', name: 'Triangulation', maxPoints: 3, row: 3, col: 2, icon: 'icon_7fx_nightborn_astromancer_red.jpg', description: (p) => `Your pet's attacks ignore ${p * 10}% of the target's armor while they under the effects of one of your traps. In addition, immobilizing an enemy generates ${p * 5} Prowess. Lasts 10 sec.` },
                { id: 'bestial-swiftness', name: 'Bestial Swiftness', maxPoints: 1, row: 2, col: 1, icon: 'ability_druid_dash.jpg', description: () => `Increases the outdoor movement speed and Focus regeneration of your pet by 50%.` },
		{ id: 'bloodseeker', name: 'Bloodseeker', maxPoints: 5, row: 1, col: 1, icon: 'inv_rabbit2_greyblood.jpg', description: (p) => `Whenever your pet uses a Special Attack on an enemy below 30% total Health, you gain the <span class="text-white">Bloodseeker</span> effect, increasing the damage of your next offensive ability by ${p * 2}%. Lasts 10 sec.<hr>This effect can occur once every 20 sec.` },
		{ id: 'improved-mend-pet', name: 'Improved Mend Pet', maxPoints: 2, row: 1, col: 0, icon: 'ability_hunter_mendpet.jpg', description: (p) => `Gives each tick of your Mend Pet spell a ${p * 5}% chance of cleansing 1 Curse, Disease, Magic or Poison effect and restoring ${p * 1} of your pet's Focus.` },
		{ id: 'kill-command', name: 'Kill Command', maxPoints: 1, row: 3, col: 3, prereq: 'ferocity', icon: 'ability_hunter_killcommand.jpg', details: ['40 yd range', '15 sec cooldown'], subDetails: ['5 Prowess', 'Instant'], description: (p) => `Give the command to kill, causing your pet to instantly attack for additional Physical damage. 
<hr>
Can only be used after your pet lands a critical strike.` },
                { id: 'ferocity', name: 'Ferocity', maxPoints: 5, row: 2, col: 2, icon: 'ability_hunter_ferociousinspiration.jpg', description: (p) => `Increases the critical strike chance and damage of your pet by ${p * 1}%.` },
                { id: 'intimidation', name: 'Intimidation', maxPoints: 1, row: 4, col: 0, icon: 'ability_devour.jpg', details: ['100 yd range', '45 sec cooldown'], subDetails: ['10 Pet Focus', 'Instant'], description: () => `Command your pet to intimidate the target, causing a high amount of threat and stunning them for 3 sec.<hr>Shares a cooldown with Territorial Defense.` },
		{ id: 'territorial-defense', name: 'Territorial Defense', maxPoints: 1, row: 4, col: 1, icon: 'inv_111_hunter_ability_harrierscall.jpg', details: ['30 yd range', '45 sec cooldown'], subDetails: ['10 Pet Focus', 'Instant'], description: () => `Call for aid, causing your pet to rush towards you, intercepting all melee and ranged attacks against you for 6 sec while you remain within 10 yds of each other.<hr>Shares a cooldown with Intimidation.` },
                { id: 'stalkers-ambition', name: 'Stalker\'s Ambition', maxPoints: 5, row: 4, col: 3, icon: 'ability_hunter_goforthethroat.jpg', description: (p) => `Your ranged and melee weapon attacks on marked targets have a ${p * 1}% chance to immediately activate Kill Command and increase its damage by ${p * 2}% for 10 sec.` },
	{ id: 'relentless-pursuit', name: 'Relentless Pursuit', maxPoints: 5, row: 5, col: 1, icon: 'inv_coordinatedassault.jpg', description: (p) => `Your Steady Shot and Raptor Strike critical hits restore ${p * 2} of your pet's Focus and increase the critical strike chance of their next special attack by ${p * 2}%. Lasts 10 sec.` },
                { id: 'frenzy', name: 'Frenzy', maxPoints: 2, row: 5, col: 2, icon: 'inv_misc_monsterclaw_04.jpg', description: (p) => `Gives your pet a ${p * 50}% chance to gain a 2% attack speed increase after dealing a critical strike. Lasts 10 sec. Stacks up to 10 times.` },
		{ id: 'beastial-tenacity', name: 'Beastial Tenacity', maxPoints: 5, row: 4, col: 2, icon: 'ability_mount_pinktiger.jpg', description: (p) => `Aspect of the Beast increases your Armor by ${p * 6}% and causes you to restore ${p * 1}% of your total health every 10 sec.` },
                { id: 'bestial-wrath', name: 'Bestial Wrath', maxPoints: 1, row: 6, col: 1, isUltimate: true, icon: 'ability_druid_ferociousbite.jpg', details: ['100 yd range', '3 min cooldown'], subDetails: ['10 Prowess','Instant'], description: () => `Send your pet into a rage, increasing its damage dealt by 20% for 18 sec.  While enraged, the beast's basic attacks cannot miss and it cannot be stopped unless killed.` },
		{ id: 'longevity', name: 'Longevity', maxPoints: 2, row: 6, col: 2, icon: 'ability_hunter_longevity.jpg', description: (p) => `Reduces the cooldown of your Bestial Wrath, Intimidation, Territorial Defense, Pet Special Abilities, and Bloodseeker talent by ${p * 10}%.` },
            ]
        },
        'marksmanship': {
            name: 'Marksmanship',
            talents: [
                { id: 'improved-concussive-shot', name: 'Improved Concussive Shot', maxPoints: 2, row: 0, col: 1, icon: 'spell_frost_stun.jpg', description: (p) => `The duration of Concussive Shot's daze effect is increased by ${p * 1} sec. In addition, your Arcane Shot has a ${p * 5}% chance to stun Dazed enemies for 3 sec.` },
                { id: 'natural-efficiency', name: 'Natural Efficiency', maxPoints: 5, row: 0, col: 2, icon: 'ability_demonhunter_chaosnova.jpg', description: (p) => `Increases the Prowess generated by your Shot, Bite and Strike abilities by ${p * 2}%.` },
                { id: 'marked-for-death', name: 'Marked for Death', maxPoints: 3, row: 0, col: 0, icon: 'ability_hunter_markedfordeath.jpg', description: (p) => `Increases the bonus attack power granted by your Hunter's Mark ability by ${p * 10}% and increases the damage of your next Shot ability within 20 sec after killing a target worth experience or honor by ${p * 5}%.` },
                { id: 'lethal-arsenal', name: 'Lethal Arsenal', maxPoints: 5, row: 1, col: 2, icon: 'ability_searingarrow.jpg', description: (p) => `Increases your critical strike chance with ranged weapons by ${p}%.` },
                { id: 'aimed-shot', name: 'Aimed Shot', maxPoints: 1, row: 2, col: 1, icon: 'inv_spear_07.jpg', details: ['35 yd range', '10 sec cooldown'], subDetails: ['10 Prowess', '3 sec cast'], description: (p) => `An aimed shot that deals increased damage and reduces self-healing done by the target by 50%.  Lasts 10 sec.` },
                { id: 'arcane-lethality', name: 'Arcane Lethality', maxPoints: 3, row: 2, col: 3, icon: 'ability_ironmaidens_ironshot.jpg', description: (p) => `Reduces the cooldown of your Arcane Shot by ${p * 0.5} sec and increases its damage by an amount equal to ${p * 5}% of your ranged Attack Power.` },
	{ id: 'arcane-shrapnel', name: 'Arcane Shrapnel', maxPoints: 1, row: 4, col: 3, prereq: 'arcane-lethality', icon: 'inv_112_raiddimensius_darkenedsky.jpg', description: (p) => `Multi-Shot now fires Arcane Shots instead of regular ammo, and each shot has a 30% chance to ricochet to an additional enemy within 10 yds.` },
           { id: 'hawk-eye', name: 'Hawk Eye', maxPoints: 3, row: 1, col: 3, icon: 'ability_townwatch.jpg', description: (p) => `Increases the range of your ranged weapons by ${p * 2} yards.` },
        { id: 'improved-stings', name: 'Improved Stings', maxPoints: 2, row: 1, col: 1, icon: 'ability_hunter_quickshot.jpg', description: (p) => `Your Stings gain an additional effect:<br><br>Serpent Sting - Deals instant damage equal to ${p * 5}% of its total periodic effect.<br><br>Viper Sting - Drains ${p * 5}% additional mana.<br><br>Scorpid Sting - Increases the target's poison damage taken by ${p * 5}%.` },
         { id: 'sniper-training', name: 'Sniper Training', maxPoints: 1, row: 3, col: 0, prereq: 'steady-aim', icon: 'ability_hunter_snipertraining.jpg', description: (p) => `Your Shot abilities gain 1% increased critical strike chance while you have not moved for the last 2 sec, stacking every sec up to 5 times. At 2 or more stacks, your Aimed Shot becomes instant. While moving, you will lose 1 stack per sec.` },
	{ id: 'kill-zone', name: 'Kill Zone', maxPoints: 5, row: 3, col: 2, icon: 'icon_7fx_nightborn_astromancer_blue.jpg', description: (p) => `Your Aimed Shot increases the radius and damage of your next Volley by ${p * 5}%. Stacks up to three times. Lasts 15 sec.` },
	{ id: 'incendiary-ammunition', name: 'Incendiary Ammunition', maxPoints: 3, row: 4, col: 2, icon: 'inv12_ability_hunter_fierymunitions.jpg', description: (p) => `You have a ${p * 4}% chance to shoot an additional shot when doing damage with your auto shot, dealing 60% weapon Fire damage that consumes no ammo.` },        
	{ id: 'piercing-shots', name: 'Piercing Shots', maxPoints: 3, row: 2, col: 2, icon: 'ability_hunter_piercingshots.jpg', description: (p) => `Your critical Aimed, Steady and Kill Shots cause the target to bleed for ${p * 5}% of the damage dealt over 8 sec.` },
                { id: 'scatter-shot', name: 'Scatter Shot', maxPoints: 1, row: 4, col: 0, icon: 'ability_golemstormbolt.jpg', details: ['15 yd range', '30 sec cooldown'], subDetails: ['30 Prowess', 'Instant'], description: () => `A short-range shot that disorients the target for 4 sec. Any damage caused will remove the effect. Turns off your auto-attack when used.` },
                { id: 'barrage', name: 'Barrage', maxPoints: 2, row: 5, col: 2, icon: 'ability_hunter_focusedaim.jpg', description: (p) => `Reduces the cooldown of your Volley by ${p * 15} seconds and reduces the pushback suffered from damaging attacks while channeling it by ${p * 40}%.` },
	{ id: 'steady-aim', name: 'Steady Aim', maxPoints: 2, row: 2, col: 0, icon: 'ability_hunter_zenarchery.jpg', description: (p) => `Reduces the pushback suffered from damaging attacks while casting Steady Shot by ${p * 40}%. In addition, when you have less than 50 Prowess, Steady Shot generates ${p * 1} additional Prowess.` },
                { id: 'expose-weakness', name: 'Expose Weakness', maxPoints: 5, row: 3, col: 1, icon: 'ability_rogue_findweakness.jpg', description: (p) => `Your ranged critical strikes on marked targets increase your attack power by ${p * 4}% of your current Agility for 6 sec.` },
	{ id: 'ballistics-expert', name: 'Ballistics Expert', maxPoints: 1, row: 4, col: 1, prereq: 'expose-weakness', icon: 'ability_hunter_efficiency.jpg', description: (p) => `Your equipped ranged weapon has a 5% chance to:
<br>
<br>
Gun -  Reduce the cooldown of Scatter Shot by 2 sec.
<br>
Bow -  Generate 2 additional Prowess.
<br>
Crossbow -  Critically strike.
<hr>
Switching weapons during combat places this effect on a 30 sec cooldown.` },
	{ id: 'kodo-killing-rounds', name: 'Big Game Rounds', maxPoints: 3, row: 5, col: 0, icon: 'inv_ammo_bullet_05.jpg', description: (p) => `Gain critical strike damage equal to ${p * 10}% of your critical strike chance.` },
                { id: 'kill-shot', name: 'Kill Shot', maxPoints: 1, row: 6, col: 1, isUltimate: true, prereq: 'trueshot-aura', icon: 'ability_hunter_assassinate2.jpg', details: ['35 yd range', '12 sec cooldown'], subDetails: ['10 Prowess', 'Instant'], description: () => `Attempt to finish off a wounded foe, dealing 120% ranged weapon damage.<hr>Only usable on targets at or below 20% total Health.` },
	{ id: 'trueshot-aura', name: 'Trueshot Aura', maxPoints: 1, row: 5, col: 1, icon: 'ability_trueshot.jpg', description: (p) => `Grants 5% increased ranged attack power to all party and raid members within 100 yards.` },
            ]
        },
        'survival': {
  name: 'Survival',
  talents: [
{ id: 'famed-slayer', name: 'Famed Slayer', maxPoints: 3, row: 0, col: 0, icon: 'inv_misc_head_murloc_01.jpg', description: (p) => `Increases your chance to hit and damage dealt against targets you are tracking by ${p * 1}%.` },
{ id: 'savage-strikes', name: 'Savage Strikes', maxPoints: 5, row: 0, col: 1, icon: 'ability_hunter_swiftstrike.jpg', description: (p) => `Increases the damage done by Raptor Strike by ${p * 2}% and the critical strike chance of Mongoose Bite by ${p * 1}%.` },
    { id: 'into-the-wild', name: 'Into the Wild', maxPoints: 5, row: 0, col: 2, icon:'ability_racial_returntocamp.jpg', description: (p) => `Increases your outdoor movement speed by ${p * 1}%. In addition, reduces the chance your Feign Death ability and trap spells will be resisted by ${p * 1}%.` },
    { id: 'hunters-fury', name: 'Hunter\'s Fury', maxPoints: 3, row: 1, col: 1, prereq: 'savage-strikes', icon: 'ability_mount_raptor.jpg', description: (p) => `Raptor Strike and Wild Spear have a ${p * 10}% chance to cause your pet and any active snakes to lunge at your current target, dealing Physical damage.<hr>This effect can occur once every 12 sec.` },
 	{ id: 'cull-the-herd', name: 'Cull the Herd', maxPoints: 2, row: 3, col: 1, icon: 'ability_hunter_raptorstrike.jpg', description: (p) => `Your Mongoose Bite ability gains an additional charge and deals ${p * 15}% increased damage.` },
	{ id: 'tnt', name: 'T.N.T.', maxPoints: 5, row: 3, col: 0, icon: 'inv_misc_bomb_05.jpg', description: (p) => `Increases the damage of your traps by ${p * 2}%. In addition, the damage of Explosive Trap and Immolation Trap are increased by an amount equal to 10% of your Attack Power.` },
	{ id: 'fire-fight', name: 'Fire Fight', maxPoints: 1, row: 4, col: 0, prereq: 'tnt', icon: 'inv_10_engineering2_pvpflaregun_color1.jpg', description: (p) => `Your Flare detonates after being exposed to other Fire-based ground effects caused by you or your allies, dealing Fire damage to enemies within 10 yds.` },
   { id: 'chimeric-instinct', name: 'Chimeric Instinct', maxPoints: 1, row: 5, col: 0, icon: 'ability_hunter_pet_chimera.jpg', description: (p) => `Your Mongoose Bite ability refreshes your current Sting on the target and triggers an effect:<br><br>
Serpent Sting - Restores 10% of your missing Health.
<br><br>
Viper Sting - Generates 10 additional Prowess.
<br><br>
Scorpid Sting - Attempts to Disarm the target for 10 sec. This effect can occur once every 60 sec.` },
	{ id: 'wild-spear', name: 'Wild Spear', maxPoints: 1, row: 2, col: 1, icon: 'hunter_pvp_vipersting.jpg', details: ['25 yd range', '15 sec cooldown'], subDetails: ['20 Prowess', 'Instant'], description: (p) => `Hurls a spear at your target, dealing damage equal to 60% of your Agility and causing them to bleed for additional physical damage over 15 sec.
<hr>
Wild Spear's damage is reduced by 3% for every yard it travels beyond melee range.` },
	{ id: 'potent-fangs', name: 'Potent Fangs', maxPoints: 3, row: 1, col: 2, icon: 'ability_hunter_potentvenom.jpg', description: (p) => `Increases the periodic damage done by your poison, bleed and Nature effects by ${p * 10}%.` },
    { id: 'survivalist', name: 'Survivalist', maxPoints: 3, row: 1, col: 3, icon: 'ability_hunter_huntervswild.jpg', description: (p) => `Increases you and your pet's melee and ranged Attack Power by an amount equal to ${p * 5}% of your total Stamina.` },
    { id: 'trap-master', name: 'Trap Master', maxPoints: 2, row: 4, col: 1, icon: 'ability_hunter_traplauncher.jpg', description: (p) => `Your Traps can now be launched to any location within ${p * 10} yards. Additionally, your Fire-based, Frost-based, and Nature-based traps now have separate shared cooldowns.` },
	{ id: 'snake-trap', name: 'Snake Trap', maxPoints: 1, row: 4, col: 2, prereq: 'trap-master', icon: 'ability_hunter_snaketrap.jpg', details: ['15 sec cooldown'], subDetails: ['Instant'], description: (p) => `Place a trap that releases venomous snakes to attack enemies when triggered, applying various poisons and damage-over-time effects. Lasts 15 sec.` },
    { id: 'reconnaissance', name: 'Reconnaissance', maxPoints: 2, row: 3, col: 2, icon: 'icon_7fx_nightborn_astromancer_green.jpg', description: (p) => `Reduces the arming time of your traps by ${p * 50}% and when an enemy triggers one of your traps the cooldown of your Disengage is reduced by ${p * 1} sec.` },
    { id: 'camouflage', name: 'Camouflage', maxPoints: 1, row: 4, col: 3, icon: 'ability_hunter_camouflage.jpg', description: (p) => `Being idle for at least 6 seconds grants Stealth.<br><br>You gain 10% Attack Power while Stealthed, inside bushes and for the first 10 seconds of combat.
<hr> You can eat, drink, or bandage while Camouflaged, but moving or performing other actions cancels the effect. ` },
	{ id: 'deadly-traps', name: 'Deadly Traps', maxPoints: 2, row: 2, col: 0, icon: 'inv_111_bombsuit_steamwheedle.jpg', description: (p) => `Arming a trap has a ${p * 50}% chance to cause your next 2 Raptor Strikes or Arcane Shots to not trigger a cooldown. Lasts 10 sec.` },
	{ id: 'preys-folly', name: 'Prey\'s Folly', maxPoints: 2, row: 5, col: 2, icon: 'inv_misc_herb_gromsbloodleaf.jpg', description: (p) => `Your critical strikes with melee attacks have a ${p * 50}% chance to reduce the cooldown of Wild Spear by 3 sec.
<hr>
This effect can occur once every 3 sec.` },
	{ id: 'impending-death', name: 'Impending Death', maxPoints: 5, row: 2, col: 2, icon: 'artifactability_feraldruid_openwounds.jpg', description: (p) => `Your Strike abilities deal additional Nature damage equal to ${p * 4}% of your main-hand weapon damage against Poisoned targets.` },
	{ id: 'apex-predator', name: 'Apex Predator', maxPoints: 5, row: 5, col: 1, icon: 'inv_giantsnake_green.jpg', description: (p) => `Your critical hits with Bite, Strike or Shot abilities increase your total Agility, Strength, and Stamina by 1% for ${p * 6} sec. Stacks up to 5 times.` },
    { id: 'wyverns-bane', name: 'Wyvern\'s Bane', maxPoints: 1, row: 6, col: 1, isUltimate: true, icon: 'inv_ability_poison_missile.jpg', details: ['30 sec cooldown'], subDetails: ['10 Prowess','Instant'], description: (p) => `Causes your next Shot, Strike or Bite ability to poison the target, dealing Nature damage over 8 sec. When this effect expires, the target falls into a deep sleep for 3 sec.` }
  ]
}
    };