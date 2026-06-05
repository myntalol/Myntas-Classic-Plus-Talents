const CLASS_NAME = "Warlock";

const talentData = {
    'affliction': {
        name: 'Affliction',
        talents: [
            { id: 'suppression', name: 'Suppression', maxPoints: 5, row: 0, col: 1, icon: 'spell_shadow_unsummonbuilding.jpg', description: (p) => `Reduces the chance for enemies to resist your Affliction spells by ${p * 1}% and reduces the mana cost of your Affliction spells by ${p * 1}%.` },
{ id: 'improved-corruption', name: 'Improved Corruption', maxPoints: 5, row: 0, col: 2, icon: 'spell_shadow_abominationexplosion.jpg', description: (p) => `Reduces the casting time of your Corruption spell by ${(p * 0.4).toFixed(1)} sec. In addition, increases the damage done by Corruption by ${p * 1}%` },
            { id: 'improved-drain-soul', name: 'Improved Drain Soul', maxPoints: 2, row: 1, col: 0, icon: 'spell_shadow_haunting.jpg', description: (p) => `Restores ${p * 5}% of your maximum mana when a target is killed while you drain its soul. In addition, Drain Soul has a chance every time it deals damage to generate an additional Soul Shard.` },
            { id: 'improved-curse-of-weakness', name: 'Improved Curse of Weakness', maxPoints: 2, row: 5, col: 2, icon: 'spell_shadow_curseofmannoroth.jpg', description: (p) => `
Increases the effect of your Curse of Weakness by ${p * 10}% and increases the energy, rage or focus costs of the target's abilities by ${p * 5}% while active.` },
	{ id: 'improved-life-tap', name: 'Improved Life Tap', maxPoints: 2, row: 1, col: 1, icon: 'spell_shadow_burningspirit.jpg', description: (p) => `Increases the Mana gained from your Life Tap spell by ${p * 10}%.` },
	{ id: 'improved-drains', name: 'Improved Drains', maxPoints: 3, row: 4, col: 3, icon: 'spell_shadow_lifedrain02.jpg', description: (p) => `Increases the amount drained by your Drain Life and Drain Soul spells by an additional ${p * 1}% for each of your Shadow effects on the target, up to a maximum of ${p * 5}% additional effect.` },
	{ id: 'face-of-terror', name: 'Face of Terror', maxPoints: 2, row: 2, col: 0, icon: 'ability_warlock_darkarts.jpg', description: (p) => `Reduces the cast time of your Howl of Terror spell by ${p * 0.5} sec. In addition, your Fear spell reduces the target's movement speed by ${p * 10}% whenever the effect ends. Lasts 5 sec.` },
            { id: 'fel-concentration', name: 'Fel Concentration', maxPoints: 5, row: 1, col: 3, icon: 'spell_shadow_fingerofdeath.jpg', description: (p) => `Gives you a ${p * 14}% chance to avoid interruption caused by damage while channeling Drain Life, Drain Mana, or Drain Soul.` },
            { id: 'amplify-curse', name: 'Amplify Curse', maxPoints: 1, row: 2, col: 2, icon: 'spell_shadow_contagion.jpg', description: () => `Reduces the global cooldown of your Curses by 0.5 sec.` },
	{ id: 'siphon-life', name: 'Siphon Life', maxPoints: 1, row: 2, col: 1, icon: 'spell_shadow_requiem.jpg', details: ['30 yd range','10 sec cooldown'], subDetails: ['8% of base mana','Instant'], description: () => `Transfers 15 health from the target to the caster every 3 sec. Lasts 30 sec.
<hr>
While in Metamorphosis, this ability reduces the target's damage done to you by 3%.` },
            { id: 'grim-reach', name: 'Grim Reach', maxPoints: 2, row: 3, col: 0, icon: 'spell_shadow_callofbone.jpg', description: (p) => `Increases the range of your Affliction spells by ${p * 10}% and causes your summoned demon to deal ${p * 1}% increased damage for every Affliction effect you have on the target.` },
            { id: 'nightfall', name: 'Nightfall', maxPoints: 2, row: 2, col: 3, icon: 'spell_shadow_twilight.jpg', description: (p) => `Your Corruption and Drain Life spells have a ${p * 2}% chance to cause you to enter into a Shadow Trance after damaging an enemy, which reduces the cast time of your next Shadow Bolt spell by 100%. Lasts 10 sec.` },
	{ id: 'fel-infusion', name: 'Fel Infusion', maxPoints: 1, row: 4, col: 1, prereq: 'siphon-life', icon: 'inv_ability_warlock_soulrot.jpg', details: ['30 yd range','5 min cooldown'], subDetails: ['11% of base mana','Instant'], description: (p) => `Infuse a friendly unit with fel magic, increasing their spell damage by 10% but causing them to lose 2% of their current health every second for 30 sec.` },
            { id: 'shadow-embrace', name: 'Shadow Embrace', maxPoints: 5, row: 3, col: 3, icon: 'spell_shadow_shadowembrace.jpg', description: (p) => `Shadow Bolt and Unstable Affliction increase your Shadow periodic damage dealt to the target by ${p * 1}%, and reduce periodic healing done to the target by ${p * 2}%. Lasts 10 sec. Stacks up to 3 times.` },
	{ id: 'dark-pact', name: 'Dark Pact', maxPoints: 1, row: 4, col: 0, icon: 'spell_shadow_darkritual.jpg', subDetails: ['15 yd range', 'Instant'], description: () => `Drains a portion of your pet's mana, returning 100% to you.` },  
        { id: 'curse-of-exhaustion', name: 'Curse of Exhaustion', maxPoints: 1, row: 4, col: 2, prereq: 'amplify-curse', icon: 'spell_shadow_grimward.jpg', details: ['30 yd range'], subDetails: ['8% of base mana','Instant'], description: () => `Reduces the target's movement speed by 15% for 12 sec. Only one Curse per Warlock can be active on any one target.` },
	{ id: 'demonic-rabies', name: 'Demonic Rabies', maxPoints: 1, row: 1, col: 2, prereq: 'improved-corruption', icon: 'spell_shadow_unstableaffliction_2.jpg', description: (p) => `You and your summoned demon's melee hits have a 30% chance to spread your Corruption spell to another nearby enemy at half duration.` },
	{ id: 'deaths-embrace', name: 'Death\'s Embrace', maxPoints: 3, row: 5, col: 0, icon: 'spell_shadow_deathsembrace.jpg', description: (p) => `Increases the amount drained by your Drain Life by ${p * 5}% while your health is at or below 20% health, and increases the damage done by your Shadow spells by ${p * 5}% when your target is at or below 20% health.` },
         { id: 'shadow-mastery', name: 'Shadow Mastery', maxPoints: 5, row: 5, col: 1, icon: 'spell_shadow_shadetruesight.jpg', description: (p) => `Increases the damage dealt or life drained by your Shadow spells by ${p * 2}%.` },
            { id: 'unstable-affliction', name: 'Unstable Affliction', maxPoints: 1, row: 6, prereq: 'shadow-mastery', col: 1, isUltimate: true, icon: 'spell_shadow_unstableaffliction_3.jpg', details: ['30 yd range'], subDetails: ['17% of base mana','1.5 sec cast'], description: () => `Dark energy slowly destroys the target, causing Shadow damage over 15 sec. If this effect is dispelled it immediately deals additional damage and Silences the dispeller for 3 sec.
<hr>
Only one Unstable Affliction or Immolate per Warlock can be active on any one target.` },
        ]
    },
    'demonology': {
        name: 'Demonology',
        talents: [
            { id: 'demonic-resilience', name: 'Demonic Resilience', maxPoints: 3, row: 0, col: 1, icon: 'inv12_ability_demonhunter_felfirefists.jpg', description: (p) => `Reduces the chance you'll be critically hit by spells by ${p * 1}% and reduces all spell damage your summoned demon takes by ${p * 5}%.` },
            { id: 'fel-fortitude', name: 'Fel Fortitude', maxPoints: 5, row: 0, col: 2, icon: 'spell_shadow_metamorphosis.jpg', description: (p) => `Increases the Stamina of you and your summoned demon by ${p * 2}%, but increases the damage you take from Holy spells and effects by ${p * 1}%.` },
		{ id: 'fel-synergy', name: 'Fel Synergy', maxPoints: 3, row: 0, col: 3, icon: 'spell_shadow_felmending.jpg', description: (p) => `Your direct damage spells have a ${p * 20}% chance to heal your summoned demon for ${p * 10}% of the damage done.` },
            { id: 'improved-health-funnel', name: 'Improved Health Funnel', maxPoints: 2, row: 1, col: 0, icon: 'spell_shadow_lifedrain.jpg', description: (p) => `Increases the amount of Health transferred by your Health Funnel spell by ${p * 10}% and reduces the health cost by ${p * 10}%.` },
            { id: 'dance-of-the-wicked', name: 'Dance of the Wicked', maxPoints: 5, row: 1, col: 1, icon: 'ability_warlock_eradication.jpg', description: (p) => `You and your summoned demon gain dodge chance equal to ${p * 10}% of your spell critical strike chance each time you critically strike with a spell. Lasts 10 sec.` },
            { id: 'fel-intellect', name: 'Fel Intellect', maxPoints: 5, row: 1, col: 2, icon: 'ability_warlock_impoweredimp.jpg', description: (p) => `Increases the Intellect of you and your summoned demon by ${p * 2}% but reduces your total Spirit by ${p}%.` },
            { id: 'demonic-empowerment', name: 'Demonic Empowerment', maxPoints: 3, row: 2, col: 3, icon: 'ability_warlock_randomizesuccubusincubus.jpg', description: (p) => `Increases the effectiveness of your summoned demon's abilities by ${p * 10}%.` },
            { id: 'fel-domination', name: 'Fel Domination', maxPoints: 1, row: 2, col: 1, icon: 'spell_nature_removecurse.jpg', subDetails: ['Instant'], details: ['3 min cooldown'], description: (p) => `Your next Demon Summoning spell has its casting time reduced by 5 sec and its Mana cost reduced by 50%.` },
            { id: 'doomsayer', name: 'Doomsayer', maxPoints: 5, row: 5, col: 1, icon: 'warlock_summon_doomguard.jpg', description: (p) => `Reduces the duration of your Curse of Doom spell by ${p * 6} sec and gives it a ${p * 20}% chance to summon a Lesser Doomguard if it doesn't kill a target when it detonates.` },
{ id: 'summon-felguard', name: 'Summon Felguard', maxPoints: 1, row: 5, col: 2, prereq: 'unholy-power', icon: 'spell_shadow_summonfelguard.jpg', subDetails: ['80% of base mana','10 sec cast','Reagents: Soul Shard'], description: (p) => `Summons a Felguard under the command of the Warlock.` },
	{ id: 'master-demonologist', name: 'Master Demonologist', maxPoints: 5, row: 4, col: 0, icon: 'spell_shadow_shadowpact.jpg', description: (p) => `Grants both the Warlock and the summoned demon an effect as long as that demon is active.
<br><br>
Imp - Reduces threat caused by ${p * 3}%.
<br><br>
Voidwalker - Reduces physical damage taken by ${p * 1}%.
<br><br>
Succubus/Incubus - Reduces the chance your spells will be dispelled by ${p * 2}%.
<br><br>
Felhunter - Reduces the duration of all Silence effects by ${p * 2}%.
<br><br>
Felguard - Increases all resistances by ${p * .1} per level.` },
	{ id: 'demonic-tactics', name: 'Demonic Tactics', maxPoints: 3, row: 4, col: 1, icon: 'spell_shadow_demonictactics.jpg', description: (p) => `Increases the melee and spell critical strike chance of you and your summoned demon by ${p * 2}%. This effect increases by an additional 3% versus Demons and Humanoids.` },
            { id: 'master-summoner', name: 'Master Summoner', maxPoints: 1, row: 2, col: 2, prereq: 'fel-domination', icon: 'spell_shadow_impphaseshift.jpg', description: (p) => `Reduces the casting time of your Demon Summoning spells by 4 sec and reduces their Mana cost by 40%.` },
            { id: 'unholy-power', name: 'Unholy Power', maxPoints: 3, row: 3, col: 2, icon: 'spell_shadow_shadowworddominate.jpg', description: (p) => `Increases the damage done by your summoned demon by ${p * 5}% for 15 sec whenever you land a spell critical strike.` },
	{ id: 'mana-feed', name: 'Mana Feed', maxPoints: 2, row: 5, col: 0, icon: 'spell_warlock_soulburn_haunt.jpg', description: (p) => `Your summoned demon gains ${p * 30}% of the mana you gain when casting Drain Mana or Life Tap.` },
            { id: 'demonic-bargain', name: 'Demonic Bargain', maxPoints: 5, row: 2, col: 0, icon: 'ability_demonhunter_sigilofinquisition.jpg', description: (p) => `Increases your threat generation by ${p * 10}% and Defense skill by ${p * 2} but reduces your damage done with spells and effects by ${p * 4}%.` },
            { id: 'improved-demonstones', name: 'Improved Demonstones', maxPoints: 1, row: 4, col: 3, icon: 'inv_112_warlock_bloodstone.jpg', description: (p) => `Firestone increases your threat generation by 5%.<br><br>Spellstone increases your Spirit by 5%.` },
            { id: 'endless-corruption', name: 'Endless Corruption', maxPoints: 1, row: 3, col: 1, prereq: 'metamorphosis', icon: 'spell_warlock_darkregeneration.jpg', description: (p) => `Your Shadow Bolt and Shadow Cleave spells restore up to 6 sec to the duration of your Corruption on the target.` },
	{ id: 'metamorphosis', name: 'Metamorphosis', maxPoints: 1, row: 3, col: 0, isUltimate: true, prereq: 'demonic-bargain', icon: 'spell_shadow_demonform.jpg', description: (p) => `Your Demonic Sacrifice spell transforms you into a demon, increasing Armor by 300%, the mana gained from Life Tap by 100% and granting new abilities:<br><br>
<img class="inline-mini-icon"
       src="images/icons/ability_warlock_coil2.jpg"
       alt="">
  <span class="text-white">Shadow Cleave</span><br>
Strike up to 3 targets in front of you, dealing Shadow damage. 6 sec cooldown.
<br><br>
<img class="inline-mini-icon"
       src="images/icons/ability_warlock_improvedsoulleech.jpg"
       alt="">
  <span class="text-white">Menace</span><br>
Taunts the target to attack you, but has no effect if the target is already attacking you. 10 sec cooldown.
<br><br>
<img class="inline-mini-icon"
       src="images/icons/ability_demonhunter_vengefulretreat.jpg"
       alt="">
  <span class="text-white">Demonic Grace</span><br>
Surge with fel energy, increasing your Dodge chance by 20% for 6 sec. 20 sec cooldown.
<hr>
This effect is cancelled if any demon is summoned.` },
            { id: 'soul-link', name: 'Soul Link', maxPoints: 1, row: 6, col: 1, prereq: 'doomsayer', isUltimate: true, icon: 'ability_warlock_soullink.jpg', details: ['100 yd range'], subDetails: ['25% of base mana','Instant'], description: (p) => `When active, both the demon and master deal 3% more damage and 20% of all damage taken by the caster is split to their summoned demon. This damage cannot be prevented. Lasts as long as the demon is active and controlled.` },
        ]
    },
    'destruction': {
        name: 'Destruction',
        talents: [
            { id: 'empowered-shadows', name: 'Empowered Shadows', maxPoints: 5, row: 0, col: 1, icon: 'spell_shadow_shadowbolt.jpg', description: (p) => `Your Shadow Bolt and Shadow Cleave critical strikes increase Shadow spell damage taken by the target by ${p * 3}% until 6 non-periodic damage sources are applied.<hr>This effect lasts a maximum of 12 sec.` },
            { id: 'cataclysm', name: 'Cataclysm', maxPoints: 5, row: 0, col: 2, icon: 'spell_fire_windsofwoe.jpg', description: (p) => `Increases the periodic damage done by your Immolate spell by ${p * 2}%, and your Conflagrate spell has a ${p * 4}% chance to daze the target for 3 sec.` },
	{ id: 'nether-ward', name: 'Nether Ward', maxPoints: 1, row: 2, col: 1, prereq: 'nether-protection', icon: 'spell_fire_felfireward.jpg', description: (p) => `Transforms your Shadow Ward into Nether Ward, which can absorb Shadow, Fire and Arcane damage.` },
            { id: 'bane', name: 'Bane', maxPoints: 5, row: 1, col: 2, icon: 'spell_shadow_deathpact.jpg', description: (p) => `Reduces the cast time of your Immolate and Incinerate spells by ${p * 0.1} sec.` },
	{ id: 'improved-searing-pain', name: 'Improved Searing Pain', maxPoints: 2, row: 1, col: 3, icon: 'spell_fire_soulburn.jpg', description: (p) => `Increases the critical strike chance of Searing Pain by ${p * 30}% on targets at or below 40% total Health.` },
            { id: 'aftermath', name: 'Aftermath', maxPoints: 5, row: 1, col: 0, icon: 'spell_fire_fire.jpg', description: (p) => `Gives your Destruction spells a ${p * 2}% chance to daze the target for 5 sec.` },
            { id: 'fiendish-firebolt', name: 'Fiendish Firebolt', maxPoints: 2, row: 1, col: 0, icon: 'spell_fire_firebolt.jpg', description: (p) => `Reduces the casting time of your Imp's Firebolt by ${p * 0.5} sec. In addition, your Imp's Firebolt has a 5% chance to reduce the cooldown of Shadowburn by ${p * 1} sec.` },
            { id: 'backlash', name: 'Backlash', maxPoints: 2, row: 2, col: 0, icon: 'ability_racial_demonbane.jpg', description: (p) => `Gives you a ${p * 15}% chance when taking direct damage to reduce the cast time of your next Searing Pain by 100%. Lasts 10 sec.` },
            { id: 'devastation', name: 'Devastation', maxPoints: 5, row: 2, col: 2, icon: 'spell_fire_flameshock.jpg', description: (p) => `Increases the critical strike damage bonus of your Destruction spells by ${p * 10}%.` },
            { id: 'shadowburn', name: 'Shadowburn', maxPoints: 1, row: 3, col: 0, icon: 'spell_shadow_scourgebuild.jpg', details: ['20 yd range','15 sec cooldown'], subDetails: ['15% of base mana','Instant','Reagents: Soul Shard'], description: () => `Blasts the target for Shadow damage, gaining 25% critical strike chance on enemies at or below 50% Health. Generates a Soul Shard if the target dies within 5 sec.
<hr>
While in Metamorphosis, this ability ignores all resistances.` },
            { id: 'intensity', name: 'Intensity', maxPoints: 2, row: 4, col: 0, icon: 'spell_fire_lavaspawn.jpg', description: (p) => `Reduces the pushback suffered from damaging attacks while casting or channeling any Destruction spell by ${p * 35}%.` },
	{ id: 'nether-protection', name: 'Nether Protection', maxPoints: 3, row: 1, col: 1, icon: 'spell_shadow_netherprotection.jpg', description: (p) => `After taking spell damage, you and your summoned demon have a ${p * 10}% chance to reduce all damage from that spell school by 5% for 8 sec. Stacks up to 5 times.` },
            { id: 'destructive-reach', name: 'Destructive Reach', maxPoints: 2, row: 3, col: 1, icon: 'spell_shadow_corpseexplode.jpg', description: (p) => `Increases the range of your Destruction spells by ${p * 10}% and reduces the threat caused by Destruction spells by ${p * 10}%.` },
            { id: 'shadow-and-flame', name: 'Shadow and Flame', maxPoints: 3, row: 4, col: 2, prereq: 'devastation', icon: 'inv_shadowflame_nova.jpg', description: (p) => `Shadowbolt critical strikes increase your Fire damage by 5% for ${p * 5} sec.
<br>
<br>
Incinerate critical strikes increase your Shadow damage by 5% for ${p * 5} sec.` },
	{ id: 'hellguard', name: 'Hellguard', maxPoints: 1, row: 3, col: 3, icon: 'ability_warlock_baneofhavoc.jpg', details: ['1 min cooldown'], subDetails: ['18% of base mana','Instant'], description: (p) => `Invoke 3 burning skulls that slowly rotate around you. While active, your Physical damage taken is reduced by 2% per skull and enemies who come in contact with a skull take Fire damage. Lasts 20 sec.
<hr>
While this effect is active, spells that require Soul Shards consume one skull instead.` },
            { id: 'emberstorm', name: 'Emberstorm', maxPoints: 1, row: 5, col: 2, prereq: 'shadow-and-flame', icon: 'spell_fire_selfdestruct.jpg', description: (p) => `Reduces the cooldown of your Soul Fire spell to 5 seconds while both effects of Shadow and Flame are active.` },
 	{ id: 'infernum', name: 'Infernum', maxPoints: 3, row: 4, col: 3, icon: 'spell_fire_ragnaros_molteninferno.jpg', description: (p) => `Each time Hellfire deals damage to you, the cooldown of Inferno is reduced by ${p * 2} sec. In addition, Inferno can be used in any location, but the demon summoned will only obey you for 20 sec.` },
            { id: 'pyroclasm', name: 'Pyroclasm', maxPoints: 2, row: 5, col: 0, prereq: 'intensity', icon: 'spell_fire_volcano.jpg', description: (p) => `Increases the damage of Inferno, Rain of Fire, Hellfire and Hellflame Edict by ${p * 10}%. In addition, Rain of Fire has a ${p * 5}% chance to stun enemies for 3 sec.` },
	{ id: 'decimation', name: 'Decimation', maxPoints: 5, row: 4, col: 1, icon: 'ability_warlock_fireandbrimstone.jpg', description: (p) => `Whenever your Shadow Bolt or Searing Pain spell hits a target that is at or above 65% health, the cast time of your next Soul Fire is reduced by ${p * 12}% for 10 sec.` },

            { id: 'conflagrate', name: 'Conflagrate', maxPoints: 1, row: 6, col: 1, isUltimate: true, prereq: 'decimation', icon: 'spell_fire_fireball.jpg', details: ['30 yd range','10 sec cooldown'], subDetails: ['9% of base mana','Instant'], description: () => `Ignites a target that is burning from a periodic Fire effect, dealing Fire damage.
<hr>
If the target is affected by your Immolate, Conflagrate consumes it to increase your spell haste by 10%. Lasts 10 sec.` },
        ]
    }
};
