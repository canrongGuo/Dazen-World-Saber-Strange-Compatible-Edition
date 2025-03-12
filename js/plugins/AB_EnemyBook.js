// =============================================================================
// AB_EnemyBook.js
// Version: 1.36
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================



/*:ja
 * @plugindesc v1.36 Displays detailed statuses of enemies.
 * Includes element rates, state rates etc.
 * @author ヱビ
 * 
 * @param ShowCommandInBattle
 * @text Show "Enemy Info" Command
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to show the "Enemy Info" command in the battle scenes?
 * You can change this in pluguin command. 0: show, 1:hide
 * @default 1
 * 
 * @param ShowAllBookCommandInBattle
 * @text Show "Enemybook" Command
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to show the "Enemybook" command in the battle scenes?
 * You can change this in pluguin command. 0: show, 1:hide
 * @default 1
 * 
 * @param ResisterTiming
 * @type select
 * @option never
 * @value 0
 * @option when the battle start
 * @value 1
 * @option when the battle end
 * @value 2
 * @desc This is the timing when the enemies resister to the enemy book.
 * 0:never, 1:when the battle start, 2:when the battle end
 * @default 2
 * 
 * @param ShowCurrentStatus
 * @text Show Current Status In The "Enemybook"
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to display "current status" like current HP in "Enemybook" and "Enemy Info"?
 * You can change this in pluguin command. 0: ON, 1:OFF
 * @default 0
 * 
 * @param HideUnknownStatusInSkill
 * @text Hide Unknown's Status On "Check Skill"
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to hide status on "Check Skill" if the enemy is unknown? 0:OFF、1:ON
 * @default 0
 * 
 * @param ShowGeneralStatusInSkill
 * @text Show General Status In "Check Skill"
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to display general status in "Check Skill" ? (general status <--> current status)
 * @default 0
 * 
 * @param HideItemUntilGet
 * @text Hide Item Until Get
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to hide items until get? 0:OFF、1:ON
 * @default 0
 * 
 * @param ShortCutButtonName
 * @text Shortcut Button Name
 * @type string
 * @desc Display "Enemy Info" when this key triggerd.
 * @default shift
 * 
 * @param BackgroundImage
 * @text Background Image
 * @type file
 * @dir img/parallaxes
 * @desc This is the Background image.
 * 
 * @param BackgroundImageOpacity
 * @text Background Image Opacity
 * @type number
 * @desc This is the Background image opacity.(0~255)
 * @default 120
 * 
 * @param SpreadBackgroundImage
 * @text Spread Background Image
 * @type boolean
 * @desc Do you wish to spread "Check Skill" window width to cover the all width?
 * @default false
 * 
 * @param EnemyOffsetY
 * @text Enemy Photo Offset Y
 * @type number
 * @min -9999
 * @desc This is the pixel number how much move to down from defaut position. If Minus number, move to up.
 * @default 0
 * 
 * 
 * @param ---Terms and Icons---
 * @default 
 * 
 * @param EnemyBookCommandName
 * @text "Enemy Info" Command Name
 * @desc This is the command name show the battle enemies status in the battle scene.
 * @default Enemy Info
 * 
 * @param EnemyBookAllCommandName
 * @text "Enemybook" Command Name
 * @desc This is the command name show the all enemies status in the battle scene.
 * @default Enemybook
 * 
 * @param Achievement
 * @desc This is the "Achivement" name write in the enemybook. The rate of enemies number registers in the book.
 * @default Achievement
 * 
 * @param UnknownEnemy
 * @text Unknown Enemy Name
 * @desc This is the index name of enemies that isn't resisterd in the book.
 * @default ??????
 * 
 * @param UnknownData
 * @text Data Name Of Unknown Enemy
 * @desc This is the content of unknown enemies' status.
 * @default ???
 * 
 * @param HitRateName
 * @text Hit Rate Name
 * @type string
 * @desc This is the name of Hit Rate.
 * @default Hit Rate
 * 
 * @param EvadeRateName
 * @text Evade Rate Name
 * @type string
 * @desc This is the name of Evade Rate.
 * @default Evade Rate
 * 
 * @param WeakElementName
 * @text Weak Element Name
 * @desc This is the name of weak element.
 * @default Weak Element
 * 
 * @param ResistElementName
 * @text Resist Element Name
 * @desc This is the name of resist element.
 * @default Resist Element
 * 
 * @param WeakStateName
 * @text Weak State Name
 * @desc This is the name of weak states.
 * @default Weak State
 * 
 * @param ResistStateName
 * @text Resist State Name
 * @desc This is the name of resister states. (includes invalid states).
 * @default Resist State
 * 
 * @param NoEffectStateName
 * @text Invalid States Name
 * @desc This is the name of invalid states.
 * @default Invalid State
 * 
 * @param DefeatNumberName
 * @text Defeat Number Name
 * @desc This is the name of defeat number.
 * @default Defeat
 * 
 * @param UnknownDropItemIcon
 * @text Unknown Drop Item Icon
 * @type number
 * @min 0
 * @desc This is the icon number of drop items unknown enemies have.
 * default：16
 * @default 16
 * 
 * @param AddEnemySkillMessage
 * @text Succeed Message to Resister Enemy Skill
 * @desc This is the message when players succeed in resister to the Enemybook. 
 * %1......Enemy Name
 * @default Resisterd %1 In the Enemybook!
 * 
 * @param FailToAddEnemySkillMessage
 * @text Unreasonable Message to Resister Enemy Skill
 * @desc This is the message when players use check skill for the enemy 
 * that can't be resisterd to the Enemybook. %1......Enemy Name
 * @default %1 Can't be resisterd to the Enemybook!

 * @param MissToAddEnemySkillMessage
 * @text Miss Message To Resister Enemy Skill
 * @desc This is the message when the "Resister Skill" was missed. %1......Enemy Name
 * @default Missed to resister %1 in the Enemybook!
 * 
 * @param FailToCheckEnemySkillMessage
 * @text Miss Massage To "Check Skill"
 * @desc This is the message when the "Check Skill" was missed.
 * %1......Enemy Name
 * @default Missed to Check %1's States!
 * 
 * @param ---Display Item---
 * @default 
 * 
 * @param DispNo
 * @text Display No
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display index number of enemy in Enemybook? 1:show, 0:hide
 * @default 1
 * 
 * @param DispLv
 * @text Display Level
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display level of enemy in Enemybook? 1: show, 0: hide
 * @default 1
 * 
 * @param DispDefeatNumber
 * @text Display Defeat Number
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display defeat number in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispHP
 * @text Display HP
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display HP in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispMP
 * @text Display MP
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display MP in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispTP
 * @text Display TP
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display TP in the Enemybook? 0: show, 1: hide
 * @default 0
 * 
 * @param DispATK
 * @text Display ATK
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display ATK in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispDEF
 * @text Display DEF
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display DEF in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispMAT
 * @text Display MAT
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display MAT in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispMDF
 * @text Display MDF
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display MDF in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispAGI
 * @text Display AGI
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display AGI in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispLUK
 * @text Display LUK
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display LUK in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispHitRate
 * @text Display Hit Rate
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Hit Rate in the Enemybook? 0: show, 1: hide
 * @default 0
 * 
 * @param DispEvadeRate
 * @text Display Evade Rate
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Evade Rate in the Enemybook? 0: show, 1: hide
 * @default 0
 * 
 * @param DispSkillNumber
 * @text Display Skills Number
 * @type number
 * @desc How many skills Do you wish to display?
 * @default 0
 * 
 * @param DispDropItems
 * @text Display Drop Items
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Drop Items in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispWeakElement
 * @text Display Weak Element
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Weak Element in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispResistElement
 * @text Display Resist Element
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Resist Element in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispWeakState
 * @text Display Weak State
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Weak State in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispResistState
 * @text Display Resist State
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Resist State in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispNoEffectState
 * @text Display Invalid State
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Invalid State in the Enemybook? 0: show, 1: hide
 * @default 0
 * 
 * @param DispDescribe
 * @text Display Describe
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Describe in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DescribeLineNumber
 * @text Describe Line Number
 * @type number
 * @desc How many the lines of describe?
 * （0～6)
 * @default 2
 * 
 * @param ---Icon of Elements---
 * @default 
 * 
 * @param UseElementIconInPluginParameter
 * @text Use Element Icon In Plugin Parameter
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to use the under parameter for element icon? (not icon tag in the element name)
 * 0:OFF、1:ON
 * @default 1
 * 
 * @param ElementIcons
 * @text Element Icons
 * @desc This is the Element Icons. Please type icon numbers split with space.
 * @default 76 64 65 66 67 68 69 70 71
 * 
 * @help
 * ============================================================================
 * Summary
 * ============================================================================
 * 
 * This plugin based on the "EnemyBook.js" made by Mr.Yoji Ojima.
 * 
 * 
 * 
 * This plugin allows
 * 
 * 1. Open the Enemybook Scene
 * 2. Displays more statuses that are not included in the "EnemyBook.js"
 * 3. Add command "Enemy Info" and "Enemybook" in the battle scene
 * 4. Create "Check Skill" and "Resister Skill"
 * 
 * You can display these statuses.
 * 
 * ・Enemy Name
 * ・Enemy Sprite
 * ★Enemy's Index Number
 * ★Enemy's Level
 * ★Defeat Number
 * ・HP, MP, ATK, DEF, MAT, MDF, AGI, LUK
 * ★Skills - v1.30
 * ・Drop Items
 * ★Weak Elements, Resister Elements
 * ★Weak States, Resister States
 * ・Description
 * ★Achievement of Enemybook
 * (★ sindicate new items.)
 * 
 * 
 * ============================================================================
 * 5 Ways For Players To Use
 * ============================================================================
 * 
 * 1. Enemybook
 * Display      : All Enemies Resisterd in The Enemybook
 * Player Action: Uses Item, Talks to people,
 *                "Enemybook" command in the Battle Scene
 * 
 * 2. Enemy Info in the Battle Scene
 * Display      : Battle Members List. Current Status Like Current HP.
 * Player Action: "Enemy Info" command in the Battle Scene
 * Settings     : Plugin Parameter 'Show Current Status In The "Enemy Info"' ON
 * 
 * 3. General Info of Battle Enemies
 * Display      : Battle Members List. General Status (not current status).
 * Player Action: "Enemy Info" command in the Battle Scene
 * Settings     : Plugin Parameter 'Show Current Status In The "Enemy Info"' OFF
 * 
 * 4. Check Skill
 * Display      : The target enemy's Current Status
 * Player Action: Use "Check Skill" For Enemy
 * 
 * 5. Check Skill (General Data) - v1.24
 * Display      : The target enemy's General Status
 * Player Action: Use "Check Skill" For Enemy
 * Settings     : Plugin Parameter 'Show General Status In "Check Skill"' ON
 * 
 * ============================================================================
 * How To Use
 * ============================================================================
 * 
 * Just set this plugin to Plugin Manager and
 * call Plugin Command "EnemyBook open"!
 * 
 * Enemies that have name is registerd when player encount on the battle.
 * (For the enemy you don't want to resister but has name, need setting.)
 * 
 * But by default, there are too many items to display and lack to space.
 * Please remove some items by set on Plugin Parameter.
 * 
 * ============================================================================
 * Other functions
 * ============================================================================
 * 
 * 〇2Ways to Display Element Icon
 * 
 * 1. Type Tag in the Element Name 
 *   example：\i[64]Fire
 * 
 * 2. Use Plugin Parameter - v1.04
 *   Please "Use Element Icon In Plugin Parameter" Plugin Parameter set to ON
 *   and type icon numbers split with space in "Element Icons".
 *   example：76 64 65 66 67 68 69 70 71
 * 
 * 〇Unknown Enemy "???"
 * 
 * If player open the Enemybook when the enemy isn't resistered yet,
 * Enemybook displays "???" on name and status.
 * You can change "???" word by setting Plugin Parameter.
 * 
 * 〇Current Status Setting And Enemy Info Command
 * 
 * When you use "Enemy Info" command, it displays general data by default.
 * When you set Plugin Parameter Show Current Status In The "Enemy Info" ON,
 * It displays Current Data.
 * Not only Current HP, But also ATK and Element Rate change.
 * You can change setting in game playing by Plugin Command.
 * 
 * ○Current States And Check Skill - v1.24
 * 
 * When you use "Check Skill", it displays current enemy's data by default.
 * you can change to display General Status by setting
 * Plugin Parameter  Show General Status In "Check Skill" ON.
 * 
 * 
 * 
 * 〇Resister Timing
 * 
 * You can set resister timing by setting Plugin Parameter "Resister Timing".
 * 
 * 0: Never
 * 1: When the battle start
 * 2: When the battle end
 * 
 * 〇Display Item "???" that player don't get yet  - v1.22
 * You can Display Item Name "???" that player don't get yet by
 * Plugin Parameter "Hide Item Until Get".
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * 
 * 〇EnemyBook.js Commands
 * 
 * EnemyBook open 
 *   Open the Enemybook Scene.
 * EnemyBook add 3
 *   Register Enemy id 3.
 * EnemyBook remove 4
 *   Remove Enemy id 4 from the Enemybook.
 * EnemyBook complete
 *   Register all enemies.
 * EnemyBook clear
 *   Remove all enemies from the Enemybook.
 * 
 * 〇Oter plugin Command
 * 
 * EnemyBook showInBattle
 *   Show "Enemy Info" command in battle.
 * EnemyBook hideInBattle
 *   Hide "Enemy Info" command in battle.
 * EnemyBook showCurrentStatus
 *   Show Current Status when player uses "Enemy Info" Command.
 * EnemyBook showGeneralStatus
 *   Show General Status when player uses "Enemy Info" Command.
 * 
 * 〇v1.06
 * 
 * EnemyBook getAchievement per 12
 *   Substitute enemybook achievement(%) for variable id 12.
 * EnemyBook getAchievement num 14
 *   Substitute enemybook achievement(number) for variable id 14.
 * EnemyBook isRegistered 5 96
 *   Set Switch id 96 whether enemy id 5 is Resisterd or not.
 * EnemyBook getDefeatNumber 3 24
 *   Substitute Defeat Number of Enemy id 3 to variable 24.
 * 
 * 〇v1.16
 * EnemyBook openEnemy 16
 *   Open the enemy 16 page.
 * 
 * 〇v1.17
 * EnemyBook showAllInBattle
 *   Show "Enemybook" Command in the battle.
 * EnemyBook hideAllInBattle
 *   Hide "Enemybook" Command in the battle.
 * 
 * 〇v1.20
 * EnemyBook clearDefeatNumber
 *   Clear the defeat number of all Enemies.
 * 
 * 〇v1.22
 * EnemyBook clearEnemyDrop
 *   Clear the enemy drop of all Enemies.
 * 
 * ============================================================================
 * Enemy Note Tag
 * ============================================================================
 * 
 * 〇EnemyBook.js note Tag
 * 
 *  - By 1.27 version updating, describe line number increased.
 * Please set Plugin Parameter "Describe Line Number" the line number
 * you want to display. Max number is infinity.
 * 
 * <desc1:burabura>
 *   This is the description line 1.
 * <desc2:buraburaburabura>
 *   This is the description line 2.
 * <desc3:buraburabura>
 *   This is the description line 3.
 * 
 * 
 * <book:no>
 *   When you type this tag to enemy note, the enemy is not be able to
 *   registerd.
 * 
 * 〇Other tags
 * 
 * <bookLevel:3>
 *   Display the enemy level 3 to Enemybook.
 *   If you write nothing, level will not be displayed.
 * 
 * <bookCanCheck> - v1.04
 *   Player can see status by "Check Skill" if the enemy has <book:no> tag.
 * 
 * ============================================================================
 * Skill Note Tag
 * ============================================================================
 * 
 * <addToEnemyBook>
 *   This skill become to "Register Skill".
 *   This skill resister target to the Enemybook.
 *   If the enemy can be resisterd, Succeed Message will be displayed.
 *   If not, Missed Message will displayed.
 * 
 * <checkEnemyStatus>
 *   This skill become to "Check Skill".
 *   This skill displays target's status.
 *   If the enemy can be resisterd, status will be displayed.
 *   If not, Missed Message will displayed.
 * 
 *   〇v1.21
 *   You can displey unknown enemy's status "???" When you set
 *   Plugin Parameter 'Hide Unknown's Status On "Check Skill"' ON,
 * 
 * You can set message of these 2 skills by setting Plugin Parameters.
 * 
 * ============================================================================
 * State Note Tag
 * ============================================================================
 * 
 * <book:no>
 *   You can hide state in the Enemybook.
 * 
 * ============================================================================
 * Update Log
 * ============================================================================
 * 
 * Version 1.36
 *   Fixed the bug that if you used the plugin command "EnemyBook openEnemy"
 *   in Battle Scene, start the Battle from turn 0.
 *   Change to be able to use variables  in "openEnemy" command by using
 *   "v[id]" argument.
 * 
 * Version 1.35
 *   Fixed the bug when plugin parameter "Display Hit Rate" turn on.
 *   Fixed the bug that "Display Skills Number" is counted double.
 *   Add new parameter "Evade Rate".
 * 
 * Version 1.34
 *   Change to be able to change Enemy Photo Offset Y.
 * 
 * Version 1.33
 *   Change to be able to change background image opacity by setting plugin
 *   parameter.
 * 
 * Version 1.32
 *   Change to be able to display background image by setting plugin parameter.
 * 
 * Version 1.30
 *   Translate this help to English.
 * 
 * ============================================================================
 * Term of Use
 * ============================================================================
 * 
 * ・Credit - Unnecessary
 * ・Use in any game engine - not allowed
 *    You can use this plugin in RPGMakerMV only.
 *    
 * ・Commercial use - OK
 * ・Non-commercial use - OK
 * ・Edits for your project needs - OK
 * ・Redistribution - OK
 * 
 * This plugin is edited based in RPGMaker material.
 * Please see the RPGMaker Term of Use.
 *     https://tkool.jp/support/index.html
 */

/*:
 * @plugindesc v1.36 是战斗中能查看的怪物图鉴。也可以确认属性、状态的抗性。
 * @author ヱビ
 * 
 * @param ShowCommandInBattle
 * @text 战斗中显示「怪物信息」
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定战斗中是否显示敌人信息的命令。
 * 也可以使用插件命令进行更改。0:隐藏、1:显示
 * @default 1
 * 
 * @param ShowAllBookCommandInBattle
 * @text 战斗中显示「图鉴」
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定战斗中是否显示图鉴的命令。
 * 也可以使用插件命令进行更改。0:隐藏、1:显示
 * @default 1
 * 
 * @param ResisterTiming
 * @text 注册时机
 * @type select
 * @option 未注册
 * @value 0
 * @option 战斗开始时
 * @value 1
 * @option 战斗结束时
 * @value 2
 * @desc 是注册图鉴的时机。
 * 0:未注册、1:战斗开始时、2:战斗结束时
 * @default 2
 * 
 * @param ShowCurrentStatus
 * @text 在「图鉴」中显示当前状态
 * @type select
 * @option 打开
 * @value 1
 * @option 关闭
 * @value 0
 * @desc 打开后，通过「图鉴」「怪物信息」可以看到怪物的当前信息(现在HP等)。
 * 也可以使用插件命令进行更改。0:OFF、1:ON
 * @default 0
 * 
 * @param HideUnknownStatusInSkill
 * @text 通过「检查」隐藏未注册的怪物的状态
 * @type select
 * @option 打开
 * @value 1
 * @option 关闭
 * @value 0
 * @desc 打开后，即使在技能上看到怪物的信息时，没有注册的怪物会显示「？？？」。0:OFF、1:ON
 * @default 0
 * 
 * @param ShowGeneralStatusInSkill
 * @text 在「检查」显示一般状态
 * @type select
 * @option 打开
 * @value 1
 * @option 关闭
 * @value 0
 * @desc 打开后，以技能查看怪物的信息时，也会显示一般数据，而不是当前HP。0:OFF、1:ON
 * @default 0
 * 
 * @param HideItemUntilGet
 * @text 掉落物品隐藏
 * @type select
 * @option 打开
 * @value 1
 * @option 关闭
 * @value 0
 * @desc 获取掉落物品之前一直隐藏。0:OFF、1:ON
 * @default 0
 * 
 * @param ShortCutButtonName
 * @text 快捷按钮的名称
 * @type string
 * @desc 允许在战斗中用这个快捷键查看敌人的信息。
 * @default shift
 * 
 * @param BackgroundImage
 * @text 背景图像
 * @type file
 * @dir img/parallaxes
 * @desc 用图片代替窗口。
 * 
 * @param SpreadBackgroundImage
 * @text 展开背景图像
 * @type boolean
 * @desc 打开后，检查技能时窗口会扩展到整个画面。
 * @default false
 * 
 * @param BackgroundImageOpacity
 * @text 背景图像不透明度
 * @type number
 * @desc 背景图像的不透明度。（0~255）
 * @default 120
 * 
 * @param EnemyOffsetY
 * @text 怪物图像偏移y
 * @type number
 * @min -9999
 * @desc 怪物的图像向下偏移此处指定的像素数。负向上偏移。
 * @default 0
 * 
 * 
 * 
 * @param ---用語、アイコン---
 * @text ---用语，图标---
 * @default 
 * 
 * @param EnemyBookCommandName
 * @text 「怪物信息」的名称
 * @desc 这是查看战斗中怪物信息的命令的名称。
 * @default 怪物信息
 * 
 * @param EnemyBookAllCommandName
 * @text 「图鉴」的名称
 * @desc 这是战斗中打开图鉴的命令的名称。
 * @default 图鉴
 * 
 * @param Achievement
 * @text 达成率的名称
 * @desc 达成率的名称。
 * @default 达成率
 * 
 * @param UnknownEnemy
 * @text 未注册怪物的编号名称
 * @desc 未注册的怪物的编号名。
 * @default ？？？？？？
 * 
 * @param UnknownData
 * @text 未注册敌人的数据名称
 * @desc 这是还没有注册在图鉴上的怪物的各数据的内容。
 * @default ？？？
 * 
 * @param HitRateName
 * @text 命中率名称
 * @type string
 * @desc 在图鉴上怎么显示命中率？
 * @default 命中率
 * 
 * @param EvadeRateName
 * @text 回避率名称
 * @type string
 * @desc 在图鉴上怎么显示回避率？
 * @default 回避率
 * 
 * 
 * @param WeakElementName
 * @text 弱化属性的名称
 * @desc 容易生效的属性的名称。
 * @default 弱化属性
 * 
 * @param ResistElementName
 * @text 抗性属性的名称
 * @desc 难以生效的属性的名称。
 * @default 抗性属性
 * 
 * @param WeakStateName
 * @text 弱化状态的名称
 * @desc 容易生效的状态的名称。
 * @default 弱化状态
 * 
 * @param ResistStateName
 * @text 抗性状态的名称
 * @desc 是难以生效的状态的名称。也包括无效状态。
 * @default 抗性状态
 * 
 * @param NoEffectStateName
 * @text 无效状态的名称
 * @desc 无效状态的名称。
 * @default 无效状态
 * 
 * @param DefeatNumberName
 * @text 击败怪物的数量的名称
 * @desc 击败怪物的数量的名称。
 * @default 击败数
 * 
 * @param UnknownDropItemIcon
 * @text 未注册的怪物物品掉落图标
 * @type number
 * @min 0
 * @desc 未知怪物掉落的物品图标的编号。
 * 默认：16
 * @default 16
 * 
 * @param AddEnemySkillMessage
 * @text 图鉴注册技能成功消息
 * @desc 这是通过技能将怪物成功注册到图鉴上时的信息。
 * %1将被怪物的名称替换。
 * @default 已在图鉴中注册%1！
 * 
 * @param FailToAddEnemySkillMessage
 * @text 图鉴添加怪物技能失败消息 
 * @desc 这是技能上怪物是图鉴上没有记载的怪物信息。
 * %1将被怪物的名称替换。
 * @default %1不能记录在图鉴上！

 * @param MissToAddEnemySkillMessage
 * @text 图鉴注册技能失败信息
 * @desc 这是在图鉴上注册怪物失败时的信息。
 * %1将被怪物的名称替换。
 * @default 在图鉴中注册%1失败！
 * 
 * @param FailToCheckEnemySkillMessage
 * @text 检查技能失败消息
 * @desc 这是在技能上看怪物信息失败时的信息。
 * %1将被怪物的名称替换。
 * @default 不知道%1的信息！
 * 
 * @param ---表示項目---
 * @text ---显示项目---
 * @default 
 * 
 * @param DispNo
 * @text 编号显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示编号。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispLv
 * @text 等级显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示等级。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispDefeatNumber
 * @text 击败数显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示击败怪物的数量。
 * 0:隐藏、1:显示
 * @default 1
 * 
 * @param DispHP
 * @text HP显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示HP，0:隐藏、1:显示
 * @default 1
 * 
 * @param DispMP
 * @text MP显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示MP。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispTP
 * @text TP显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示TP。0:隐藏、1:显示
 * @default 0
 * 
 * @param DispATK
 * @text 攻击力显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示攻击力。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispDEF
 * @text 防御力显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示防御力。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispMAT
 * @text 魔法攻击表示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示魔法攻击。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispMDF
 * @text 魔法防御显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示魔法防御。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispAGI
 * @text 敏捷性显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示敏捷性。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispLUK
 * @text 幸运显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示幸运。0:隐藏、1:显示
 * @default 1
 * 
 * 
 * @param DispHitRate
 * @text 命中率显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示命中率。0:隐藏、1:显示
 * @default 0
 * 
 * @param DispEvadeRate
 * @text 回避率显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示回避率。0:隐藏、1:显示
 * @default 0
 * 
 * @param DispSkillNumber
 * @text 技能显示数
 * @type number
 * @desc 决定技能的显示数量。
 * @default 0
 * 
 * @param DispDropItems
 * @text 掉落物品显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴中显示掉落物品。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispWeakElement
 * @text 弱化属性显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示弱化的属性。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispResistElement
 * @text 抗性属性显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示抗性的属性。0:隐藏、1:显示
 * @default 1
 * 
 * @param DispWeakState
 * @text 弱化状态显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示弱化的状态。
 * 0:隐藏、1:显示
 * @default 1
 * 
 * @param DispResistState
 * @text 抗性状态显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示抗性的状态。 (包括无效)
 * 0:隐藏、1:显示
 * @default 1
 * 
 * @param DispNoEffectState
 * @text 无效状态显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示无效的状态。
 * 0:隐藏、1:显示
 * @default 0
 * 
 * @param DispDescribe
 * @text 说明显示
 * @type select
 * @option 显示
 * @value 1
 * @option 隐藏
 * @value 0
 * @desc 决定是否在图鉴上显示怪物的说明。
 * 0:隐藏、1:显示
 * @default 1
 * 
 * @param DescribeLineNumber
 * @text 说明的行数
 * @type number
 * @desc 在图鉴上显示多少行怪物的说明？
 * （0～6行）
 * @default 2
 * 
 * @param ---属性アイコン---
 * @text ---属性图标---
 * @default 
 * 
 * @param UseElementIconInPluginParameter
 * @type select
 * @option 是
 * @value 1
 * @option 否
 * @value 0
 * @desc 是否要使用下面的参数而不是属性中的图标？
 * 0:OFF、1:ON
 * @default 1
 * 
 * @param ElementIcons
 * @text 元素图标
 * @desc 属性的图标。从1号开始按顺序用半角空格分隔排列。
 * @default 76 64 65 66 67 68 69 70 71
 * 
 * @help
 * ============================================================================
 * 概要
 * ============================================================================
 * 
 * RPGツクールデフォルトでついてくる、Yoji Ojima 的「EnemyBook.js」的修改插件，
 * の改変プラグイン
 * 
 * 〇介绍
 * 
 * ・打开怪物图鉴
 * ・也可以看到不是EnemyBook.js的项目
 * ・可以添加战斗中可以看到图鉴的命令
 * ・可以建立查看怪物信息的检查技能
 * 
 * 〇可以显示的内容（★是EnemyBook.js中没有的项目）
 * 
 * ・敵の名前
 * ・敵のイラスト
 * ★敵の番号
 * ★レベル（メモ欄で設定）
 * ★その敵を倒した数
 * ・HP、MP、攻撃力、防御力、魔法力、魔法防御、敏捷性、運
 * ★スキル -v1.30
 * ・ドロップアイテム
 * ★効きやすい属性、効きにくい属性
 * ★効きやすいステート、効きにくい（無効含む）ステート、効かないステート
 * ・説明文（メモ欄で設定、2行）
 * ★図鑑の達成率
 * 
 * ============================================================================
 * 4种显示方法
 * ============================================================================
 * 
 * １．图鉴
 * 表示：図鑑に登録されているすべての敵のリスト
 * 操作：アイテムを使ったり、人に話しかけたり、戦闘中に「図鑑」コマンド
 * 
 * ２．战斗中怪物的状态一览
 * 表示：バトル中の敵のリスト。HPゲージなど、現在のステータス
 * 操作：戦闘中に「敵の情報」コマンド。
 * 設定：「「図鑑」で現在のステータスを表示」がONになっているとき
 * 
 * ３．战斗中怪物的图鉴信息
 * 表示：バトル中の敵のリスト。現在のステータスではなく、図鑑の情報
 * 操作：戦闘中に「敵の情報」コマンド。
 * 設定：「「図鑑」で現在のステータスを表示」がOFFになっているとき
 * 
 * ４．检查
 * 表示：チェックした敵の現在のステータス
 * 操作：チェックスキルを敵に対して使用
 * 
 * ５．检查(一般数据) - v1.24
 * 表示：チェックした敵の一般データ
 * 操作：チェックスキルを敵に対して使用。
 * 設定：「「チェック」で一般的なステータスを表示」がＯＮになっているとき。
 * 
 * ============================================================================
 * 总之导入方法
 * ============================================================================
 * 
 * 在插件管理器中加载此插件，
 * 然后在显示图鉴的事件中添加插件命令「EnemyBook open」！
 * 
 * 数据库的怪物如果名称不为空白，就会注册到图鉴中。
 * （即使有名字也不想注册图鉴的怪物需要设置）
 * 
 * 但是，就这样显示的项目太多，无法完全显示完，
 * 所以用插件参数删除要显示的项目吧。
 * 
 * ============================================================================
 * 其他
 * ============================================================================
 * 
 * 〇属性的显示方法，有2种
 * 
 * 1.属性の名前の中にアイコンを入れる
 *   例：\i[64]炎
 * 
 * 2.プラグインパラメータを使う - v1.04
 *   UseElementIconInPluginParameterをONにし、
 *   ElementIconsに属性アイコンの番号を半角スペースで区切って並べてください。
 *   例：76 64 65 66 67 68 69 70 71
 * 
 * 〇未确认的怪物「？？？」
 * 
 * まだ図鑑に登録されていない敵との戦闘中に図鑑を開くと、データが「？？？」と
 * 表示されます。「？？？」の部分はプラグインパラメータの「未登録の敵の索引名」
 * で設定できます。 
 * 
 * 〇查看当前信息的设定，怪物的信息命令
 * 
 * デフォルトでは敵の情報コマンドでは、一般的な敵のデータが出るようになっていま
 * す。
 * プラグインパラメータ「「図鑑」で現在のステータスを表示」 を ON にすると、
 * 戦闘中に敵の情報を開いたとき、現在の敵キャラのパラメータが表示されます。
 * 現在HPだけでなく、攻撃力や属性有効度の変化も表示されます。
 * 現在の情報を見る設定は、プラグインコマンドで変更できます。
 * 
 * 〇查看当前信息的设置检查技能 - v1.24
 * 
 * デフォルトではチェックスキルでは現在の敵のデータが出るようになっています。
 * プラグインパラメータ「「チェック」で一般的なステータスを表示」をＯＮにすると、
 * スキルでチェックしたときも、一般的な敵のデータを表示するようにできます。
 * 
 * 〇注册图鉴的时机
 * 
 * プラグインパラメータ「登録タイミング」で、図鑑に登録されるタイミングを設定でき
 * ます。
 * 
 * 0: 登録されない
 * 1: 戦闘開始時
 * 2: 戦闘終了時
 * 
 * 〇ゲットしていないアイテムを？？？にする - v1.22
 * プラグインパラメータ「手に入れるまでドロップアイテムを隠す」をONにすると、
 * ゲットしていないアイテムを？？？と表示します。
 * 
 * ============================================================================
 * 插件命令
 * ============================================================================
 * 
 * 〇与EnemyBook.js相同的命令
 * 
 * EnemyBook open 
 *   打开图鉴界面。
 * EnemyBook add 3
 *   将3号怪物添加到图鉴中。
 * EnemyBook remove 4
 *   从图鉴中删除4号怪物。
 * EnemyBook complete
 *   图鉴全收集。
 * EnemyBook clear
 *   清除图鉴。
 * 
 * 〇其他插件命令
 * 
 * EnemyBook showInBattle
 *   在战斗中打开「怪物信息」。
 * EnemyBook hideInBattle
 *   防止在战斗中打开「怪物信息」。
 * EnemyBook showCurrentStatus
 *   在战斗中打开「怪物信息」，可以看到当前怪物的参数。
 * EnemyBook showGeneralStatus
 *   在战斗中打开「怪物信息」，可以看到当前怪物的一般信息。
 * 
 * 〇v1.06
 * 
 * EnemyBook getAchievement per 12
 *   将图鉴的达成率（％）代入变量12号。
 * EnemyBook getAchievement num 14
 *   将图鉴的注册数代入变量14号。
 * EnemyBook isRegistered 5 96
 *   将5号怪物是否登录到图鉴中，代入开关96号。
 * EnemyBook getDefeatNumber 3 24
 *   将击败的3号怪物数量代入变量24中。
 * 
 * 〇v1.16
 * EnemyBook openEnemy 16
 *   打开ID16怪物的界面。
 * 
 * 〇v1.17
 * EnemyBook showAllInBattle
 *   在战斗中打开「图鉴」。
 * EnemyBook hideAllInBattle
 *   防止在战斗中打开「图鉴」。
 * 
 * 〇v1.20
 * EnemyBook clearDefeatNumber
 *   重置击败的数量。
 * 
 * 〇v1.22
 * EnemyBook clearEnemyDrop
 *   重置敌人的物品掉落信息。
 * 
 * ============================================================================
 * 怪物的备注栏
 * ============================================================================
 * 
 * 〇与EnemyBook.js相同的标签
 * 
 *  - 与v1.27相比，可显示的行增加了。
 * 为了计算窗口的高度，在插件参数「说明的行数」中，单击、
 * 请设置要显示的行数。 最多可以显示几行。
 * 
 * <desc1:なんとか>
 *   说明第1行。
 * <desc2:かんとか>
 *   说明第2行。
 * <desc3:ブラブラ>
 *   说明第3行。
 * <desc4:ああああ>
 *   说明第4行。
 * <desc5:いいいい>
 *   说明第5行。
 * <desc6:うううう>
 *   说明第6行。
 * 
 * 
 * <book:no>
 *   设置了这个的怪物不在图鉴上。
 * 
 * 〇其他标签
 * 
 * <bookLevel:3>
 *   在图鉴上记载作为强度标准的水平。
 *   如果什么都不写，就什么都不显示。
 * 
 * <bookCanCheck>
 *   在版本1.04中添加的。
 *   即使是写了<book:no>的敌人，只要加上这个标签，
 *  就可以通过<checkEnemyStatus>的技能进行检查。
 * 
 * ============================================================================
 * 技能备注栏
 * ============================================================================
 * 
 * <addToEnemyBook>
 *   将目标注册到图鉴中。
 *   目标是图鉴上记载的怪物的情况下，
 *   会显示成功信息，否则会显示失败信息。
 * 
 * <checkEnemyStatus>
 *   查看目标信息。
 *   目标是图鉴上记载的怪物时显示图鉴，
 *   否则会显示失败信息。
 *   此技能显示目标当前参数(例如当前HP)。
 *   〇v1.21
 *  插件参数HideUnknownStatusInSkill中的「？？？」也可以显示。
 * 
 * 这两种技能的消息可以通过插件参数设置。
 * 
 * ============================================================================
 * 状态备注栏
 * ============================================================================
 * 
 * <book:no>
 *   可以避免在图鉴中显示此状态。
 * 
 * ============================================================================
 * 更新历史
 * ============================================================================
 * 
 * Version 1.36
 *   戦闘中に「EnemyBook openEnemy」で図鑑を開いたときも戦闘用のウィンドウが開
 *   くようにしました。
 *   プラグインコマンド「EnemyBook openEnemy」で、
 *   v[id]の形で、その変数のIDの敵キャラのページを開けるようになりました。
 * 
 * Version 1.35
 *   「命中率表示」をONにして図鑑を開いたとき、エラーが出て止まる不具合と、
 *   「スキル表示数」が2倍計算されていた不具合を修正しました。
 *   「回避率表示」を追加しました。
 * 
 * Version 1.34
 *   敵キャラのY軸の位置を設定できるようにしました。
 * 
 * Version 1.33
 *   プラグインパラメータで背景画像の不透明度を設定できるようにしました。
 * 
 * Version 1.32
 *   プラグインパラメータで背景画像を指定できるようにしました。
 * 
 * Version 1.31
 *   未登録の敵キャラの画像が表示されていた問題を修正しました。
 * 
 * Version 1.30
 *   英訳しました。
 *   敵の情報コマンド使用後にチェックスキルを使用した時、チェックした後戦闘が
 *   進行しなくなる不具合を直しました。
 *   プラグインパラメータ「スキル表示数」でスキルを表示できるようにしました。
 *   
 * 
 * Version 1.29
 *   図鑑一覧で左キーで上に、右キーで下に表示個数分移動するようにしました。
 * 
 * Version 1.28
 *   戦闘中、ショートカットキーを登録すると敵の情報を呼び出せるようにしまし
 *   た。（このアイデアをくださった方、そのときに実現できず申し訳ありません。）
 * 
 * Version 1.27
 *   プラグインパラメータを日本語にしました。
 *   ドロップアイテムの個数によってその下の情報の表示位置が異なる問題を修正しま
 *   した。
 *   敵キャラの説明の行数を増やせるようにしました。
 * 
 * Version 1.26
 *   TPと命中率を表示した時、ウィンドウサイズが反映されない不具合を修正しまし
 *   た。
 * 
 * Version 1.25
 *   TPと命中率を表示できるようにしました。
 * 
 * Version 1.24
 *   HideUnknownStatusInSkillをＯＮにしていても、図鑑に登録されていない敵をスキ
 *   ルでチェックした時に属性とステートは表示されていましたが、？？？と表示する
 *   ように修正しました。
 *   スキルでチェックした時も、現在のパラメータではなく一般的なパラメータを表示
 *   できるプラグインパラメータShowGeneralStatusInSkillを追加しました。
 * 
 * Version 1.23
 *   未登録のモンスターをチェックしようとするとエラーが発生してしまう不具合を修
 *   正しました。
 * 
 * Version 1.22
 *   ドロップしていないアイテムを？？？と表示する機能を追加しました。
 *   ドロップアイテムを入手したかどうかをリセットするプラグインコマンドを追加し
 *   ました。
 * 
 * Version 1.21
 *   スキルで図鑑に登録するとき、スキルの成功率を参照するようにしました。
 *   スキルで図鑑を見るときも、初めて会った敵は？？？と表示されるように設定でき
 *   るようにしました。
 * 
 * Version 1.20
 *   倒した数をリセットするプラグインコマンドを追加しました。
 * 
 * Version 1.19
 *   YEPのプラグインを使わずに図鑑を開いたとき、変数Importedが見つからないとい
 *   うエラーが出る不具合を直しました。
 * 
 * Version 1.18
 *   戦闘中に「図鑑」コマンドで開いたとき、まだ図鑑に登録されておらず、索引名が
 *   ？？？？？になるはずの敵キャラの名前が表示されてしまっていた不具合を直しま
 *   した。
 * 
 * Version 1.17
 *   ヘルプを見やすくしました。
 *   戦闘中に図鑑のすべての敵キャラの情報を見られるコマンド「図鑑」を追加しまし
 *   た。そのため、プラグインパラメータ２つとプラグインコマンド２つを追加しまし
 *   た。
 *   戦闘中にアイテムなどで図鑑を開いたとき、戦闘中の敵ではなく、図鑑全体を開く
 *   ようにしました。そのとき、シーンを挿入するのではなくバトルシーン上のウィン
 *   ドウを使うようにしました。これにより戦闘中に図鑑を開いてもターンがリセット
 *   されるバグを回避できます。
 * 
 * Version 1.16
 *   プラグインコマンドで、指定したIDの敵キャラの画面を開けるようにしました。
 * 
 * Version 1.15
 *   YEP_X_AnimatedSVEnemiesを入れていないときエラーが発生してプレイが中断され
 *   てしまう不具合を直しました。
 * 
 * Version 1.14
 *   YEP_X_AnimatedSVEnemiesを入れてもアニメーションしていなかった不具合を直し
 *   ました。残っていたコンソールログを削除しました。
 * 
 * Version 1.13
 *   YEP_X_AnimatedSVEnemiesを使っている場合、アニメーションするようにしまし
 *   た。また、YEP_X_AnimatedSVEnemiesを使っている場合でも、1回目でも表示される
 *   ようにしました。
 * 
 * Version 1.12
 *   図鑑を開いたとき、1回目だけ敵キャラのスプライトがはみ出してしまう不具合を
 *   修正しました。
 * 
 * Version 1.11
 *   図鑑を開いたとき、1回目は敵キャラのスプライトが表示されず、2回目にカーソル
 *   を合わせたときに初めて表示される不具合を修正しました。
 *   （YEP_X_AnimatedSVEnemiesを使っている場合、SVエネミーを表示するためにこの
 *   　不具合は修正していません）
 * 
 * Version 1.10
 *   ツクールのデータベースの用語で、HPやMPに「体力」などの日本語を使ったとき、
 *   文字が重なってしまうバグを修正しました。
 * 
 * Version 1.09
 *   プラグインパラメータShowCurrentStatusの設定が反映されないバグを修正しまし
 *   た。
 * 
 * Version 1.08
 *   YEP_X_AnimatedSVEnemies.jsを使っているとき、アクターが表示されるようにしま
 *   した。
 * 
 * Version 1.07
 *   プラグインパラメータDispLvでレベルを表示するかどうか選べるようにし、倒した
 *   数をレベルの次に表示するようにしました。
 * 
 * Version 1.06
 *   プラグインコマンドを4種追加しました。図鑑の達成率、登録数、敵キャラが登録さ
 *   れているかどうか、敵キャラを何体倒したかの4種を取得できます。
 * 
 * Version 1.05
 *   図鑑に敵を倒した数を表示できるようにしました。
 * 
 * Version 1.04
 *   属性の中にアイコンを書けない時のため、プラグインパラメータで属性のアイコン
 *   を設定できるようにしました。
 *   <book:no>が設定されている敵キャラでも、<bookCanCheck>が設定されていれば
 *   スキルでならチェックできるようにしました。
 * 
 * Version 1.03
 *   モンスターの番号を表示できるようにしました。
 *   達成率を表示するようにしました。
 *   無効化ステートの項目をONにしているとき、耐性ステートには無効化ステートは
 *   表示されないようにしました。
 *  
 * Version 1.02
 *   無効ステートの項目を追加しました。
 *   耐性の項目が奇数のとき、図鑑説明がかぶってしまう不具合を修正しました。
 * 
 * Version 1.01
 *   表示項目によって余白を削り、ウィンドウの高さを小さくするようにしました。
 *   高さを計算するために、説明を表示するかどうかを設定するプラグインパラメータ
 *   DispDescribe を追加しました。
 *   また、対象の情報を見るスキルを使ったとき、敵を選択するウィンドウを
 *   非表示にするようにしました。
 * 
 * Version 1.00
 *   初版
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・MIT许可。
 * ・无需信用标记
 * ・可用于营利目的
 * ・可以更改
 *     但是，请保留源代码标头的许可证表示。
 * ・也可以只重新分发素材
 * ・成人游戏，也可以在残酷游戏中使用
 *     请参阅 Maker 的官方使用条款。
 *     https://tkool.jp/support/index.html
 */
var Star = Star;
Star.EliteEnemy = Star.EliteEnemy || {};
Star.EliteEnemy.AtlasShowOrHide = true;
Star.EliteEnemy.Atlas = false;
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
(function() {
	var parameters = PluginManager.parameters('AB_EnemyBook');
	var EnemyBookCommandName = (parameters['EnemyBookCommandName'] || "敵の情報");
	var ShowCommandInBattle = (parameters['ShowCommandInBattle'] == 1) ? true : false;
	var EnemyBookAllCommandName = (parameters['EnemyBookAllCommandName'] || "図鑑");
	var ShowAllBookCommandInBattle = (parameters['ShowAllBookCommandInBattle'] == 1) ? true : false;
	var ResisterTiming = Number(parameters['ResisterTiming']);
	var Achievement = String(parameters['Achievement'] || "");
	var UnknownEnemy = String(parameters['UnknownEnemy'] || "");
	var UnknownData = String(parameters['UnknownData'] || "");
	var HideUnknownStatusInSkill = (parameters['HideUnknownStatusInSkill'] == 1) ? true : false;
	var HideItemUntilGet = (parameters['HideItemUntilGet'] == 1) ? true : false;

	// v1.32
	var BackgroundImage = String(parameters['BackgroundImage']);
	var BackgroundImageOpacity = Number(parameters['BackgroundImageOpacity']);
	var SpreadBackgroundImage = eval(parameters['SpreadBackgroundImage']);


	var EnemyOffsetY = Number(parameters['EnemyOffsetY']);

	// v1.28
	var ShortCutButtonName = String(parameters['ShortCutButtonName']);


	var ShowCommandInBattle = (parameters['ShowCommandInBattle'] == 1) ? true : false;
	var ShowGeneralStatusInSkill = (parameters['ShowGeneralStatusInSkill'] == 1) ? true : false;
	var AddEnemySkillMessage = String(parameters['AddEnemySkillMessage'] || "");
	var FailToAddEnemySkillMessage = String(parameters['FailToAddEnemySkillMessage'] || "");
	var MissToAddEnemySkillMessage = String(parameters['MissToAddEnemySkillMessage'] || "");
	var FailToCheckEnemySkillMessage = String(parameters['FailToCheckEnemySkillMessage'] || "");
	var DispNo = (parameters['DispNo'] == 1) ? true : false;
	var DispLv = (parameters['DispLv'] == 1) ? true : false;
	var ShowCurrentStatus = (parameters['ShowCurrentStatus'] == 1) ? true : false;
	var DispDescribe = (parameters['DispDescribe'] == 1) ? true : false;

	var DescribeLineNumber = Number(parameters['DescribeLineNumber']);

	var UseElementIconInPluginParameter = (parameters['UseElementIconInPluginParameter'] == 1) ? true : false;
	
	var DispDefeatNumber = Number(parameters['DispDefeatNumber']) == 1 ? true : false;
	var dispParameters = [];
	dispParameters[0] = (parameters['DispHP'] == 1) ? true : false;
	dispParameters[1] = (parameters['DispMP'] == 1) ? true : false;
	dispParameters[2] = (parameters['DispATK'] == 1) ? true : false;
	dispParameters[3] = (parameters['DispDEF'] == 1) ? true : false;
	dispParameters[4] = (parameters['DispMAT'] == 1) ? true : false;
	dispParameters[5] = (parameters['DispMDF'] == 1) ? true : false;
	dispParameters[6] = (parameters['DispAGI'] == 1) ? true : false;
	dispParameters[7] = (parameters['DispLUK'] == 1) ? true : false;
	var dispTP = (parameters['DispTP'] == 1) ? true : false;
	var dispHitRate = (parameters['DispHitRate'] == 1) ? true : false;
	var DispEvadeRate = (parameters['DispEvadeRate'] == 1) ? true : false;


	var DispSkillNumber = Number(parameters['DispSkillNumber'] || "命中率");

	var DescribeLineNumber = Number(parameters['DescribeLineNumber']);

	var DispDropItems = (parameters['DispDropItems'] == 1) ? true : false;
	var dispRates = [];
	dispRates[1] = (parameters['DispResistElement'] == 1) ? true : false;
	var ResistElementName = String(parameters['ResistElementName'] || "耐性属性");
	dispRates[0] = (parameters['DispWeakElement'] == 1) ? true : false;
	var WeakElementName = String(parameters['WeakElementName'] || "弱点属性");
	dispRates[3] = (parameters['DispResistState'] == 1) ? true : false;
	var ResistStateName = String(parameters['ResistStateName'] || "耐性ステート");
	dispRates[2] = (parameters['DispWeakState'] == 1) ? true : false;
	var WeakStateName = String(parameters['WeakStateName'] || "弱点ステート");
	dispRates[4] = (parameters['DispNoEffectState'] == 1) ? true : false;
	var NoEffectStateName = String(parameters['NoEffectStateName'] || "無効ステート");
	var UnknownDropItemIcon = Number(parameters['UnknownDropItemIcon']);
	if (UnknownDropItemIcon === Number.NaN) UnknownDropItemIcon = 0;
	var DefeatNumberName = String(parameters['DefeatNumberName'] || "倒した数");
	var ElementIcons = (parameters['ElementIcons']).split(" ");
	var a = [0];
	ElementIcons = a.concat(ElementIcons);

	if (typeof(Imported) === "undefined") Imported = {};
	var HitRateName = String(parameters['HitRateName'] || "命中率");
	var EvadeRateName = String(parameters['EvadeRateName'] || "回避率");


//=============================================================================
// Game_System
//=============================================================================

	var Window_EnemyBookStatus_Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		Window_EnemyBookStatus_Game_Map_setup.call(this,mapId);
		$gameSystem._recordEnemyMap = $gameSystem._recordEnemyMap || [];
		this.encounterList().forEach(function(encounter) {
			$dataTroops[encounter.troopId].members.forEach(function(member) {
				$gameSystem._recordEnemyMap[member.enemyId] = $gameSystem._recordEnemyMap[member.enemyId] || [];
				if (!$gameSystem._recordEnemyMap[member.enemyId].contains($dataMap.displayName)) {
					$gameSystem._recordEnemyMap[member.enemyId].push($dataMap.displayName);
				};
			});
		});
	};

	Window_EnemyBookStatus_BattleManager_setup = BattleManager.setup;
	BattleManager.setup = function(troopId, canEscape, canLose) {
		Window_EnemyBookStatus_BattleManager_setup.call(this, troopId, canEscape, canLose);
		$gameSystem._recordEnemyMap = $gameSystem._recordEnemyMap || [];
		$dataTroops[troopId].members.forEach(function(member) {
			$gameSystem._recordEnemyMap[member.enemyId] = $gameSystem._recordEnemyMap[member.enemyId] || [];
			if (!$gameSystem._recordEnemyMap[member.enemyId].contains($dataMap.displayName)) {
				$gameSystem._recordEnemyMap[member.enemyId].push($dataMap.displayName);
			};
		});
	};

	var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'EnemyBook') {
			switch(args[0]) {
			case 'open':
				// v1.17
				if ($gameParty.inBattle()) {
					SceneManager._scene.allBattleEnemyBook();
				} else {
					SceneManager.push(Scene_EnemyBook);
				}
				break;
			case 'add':
				$gameSystem.addToEnemyBook(Number(args[1]));
				break;
			case 'remove':
				$gameSystem.removeFromEnemyBook(Number(args[1]));
				break;
			case 'complete':
				$gameSystem.completeEnemyBook();
				break;
			case 'clear':
				$gameSystem.clearEnemyBook();
				break;
			case 'showInBattle':
				$gameSystem.setShowBattleEnemyBook(true);
				break;
			case 'hideInBattle':
				$gameSystem.setShowBattleEnemyBook(false);
				break;
			case 'showCurrentStatus':
				$gameSystem.setShowCurrentEnemysStatus(true);
				break;
			case 'showGeneralStatus':
				$gameSystem.setShowCurrentEnemysStatus(false);
				break;
			case 'getAchievement':
				$gameSystem.getAchievement(args[1], Number(args[2]));
				break;
			case 'isRegistered':
				$gameSystem.isRegistered(Number(args[1]), Number(args[2]));
				break;
			case 'getDefeatNumber':
				$gameSystem.getDefeatNumber(Number(args[1]), Number(args[2]));
				break;
			// v1.16
			case 'openEnemy':
				var v = $gameVariables._data;
				$gameTemp.ABEnemyBookId = Number(eval(args[1]));
				if ($gameParty.inBattle()) {
					SceneManager._scene.allBattleEnemyBook();
				} else {
					SceneManager.push(Scene_EnemyBook);
				}
				break;
			//v1.17
			case 'showAllInBattle':
				$gameSystem.setShowBattleAllEnemyBook(true);
				break;
			case 'hideAllInBattle':
				$gameSystem.setShowBattleAllEnemyBook(false);
				break;
			case 'clearDefeatNumber':
				$gameSystem.clearDefeatNumber();
				break;
			// 1.22
			case 'clearEnemyDrop':
				$gameSystem.clearEnemyDropGot();
				break;
			}
		}
	};
	
	var Game_System_prototype_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		Game_System_prototype_initialize.call(this);
		this.initEnemyBookSettings();
	};

	Game_System.prototype.initEnemyBookSettings = function() {
		this._showBattleEnemyBook = ShowCommandInBattle;
		this._showAllBookCommandInBattle = ShowAllBookCommandInBattle;
		this._showCurrentEnemyStatus = ShowCurrentStatus;
	};

	Game_System.prototype.setShowBattleEnemyBook = function(value) {
		this._showBattleEnemyBook = value;
	};
	Game_System.prototype.isShowBattleEnemyBook = function() {
		if (this._showBattleEnemyBook === undefined) this.initEnemyBookSettings();
		return this._showBattleEnemyBook;
	};

	Game_System.prototype.setShowBattleAllEnemyBook = function(value) {
		this._showAllBookCommandInBattle = value;
	};
	Game_System.prototype.isShowBattleAllEnemyBook = function() {
		if (this._showAllBookCommandInBattle === undefined) this.initEnemyBookSettings();
		return this._showAllBookCommandInBattle;
	};

	Game_System.prototype.setShowCurrentEnemysStatus = function(value) {
		this._showCurrentEnemyStatus = value;
	};
	Game_System.prototype.isShowCurrentEnemysStatus = function() {
		if (this._showCurrentEnemyStatus === undefined) this.initEnemyBookSettings();
		return this._showCurrentEnemyStatus;
	};

	Game_System.prototype.clearEnemyBook = function() {
		this._enemyBookFlags = [];
	};

	Game_System.prototype.addToEnemyBook = function(enemyId) {
		if (!this._enemyBookFlags) {
			this.clearEnemyBook();
		}
		this._enemyBookFlags[enemyId] = true;
	};

	
	Game_System.prototype.removeFromEnemyBook = function(enemyId) {
		if (this._enemyBookFlags) {
			this._enemyBookFlags[enemyId] = false;
		}
	};

	Game_System.prototype.completeEnemyBook = function() {
		this.clearEnemyBook();
		for (var i = 1; i < $dataEnemies.length; i++) {
			this._enemyBookFlags[i] = true;
		}
	};
	
	
	Game_System.prototype.isInEnemyBook = function(enemy) {
		if (this._enemyBookFlags && enemy) {
				return !!this._enemyBookFlags[enemy.id];
		} else {
			return false;
		}
	};

	Game_System.prototype.clearDefeatNumber = function() {
		this._defeatNumbers = [];
	};

	Game_System.prototype.incrementDefeatNumber = function(id) {
		if (!this._defeatNumbers) {
			this.clearDefeatNumber();
		}
		if (!this._defeatNumbers[id]) {
			this._defeatNumbers[id] = 0;
		}
		this._defeatNumbers[id]++;
	};

	Game_System.prototype.defeatNumber = function(id) {
		if (!this._defeatNumbers) {
			this.clearDefeatNumber();
		}
		if (!this._defeatNumbers[id]) {
			this._defeatNumbers[id] = 0;
		}
		return this._defeatNumbers[id];
	};

	Game_System.prototype.getRegisterNumber = function() {
		var a=0;
		for (var i=1; i<$dataEnemies.length; i++) {
			var enemy = $dataEnemies[i];
			if (enemy.name && enemy.meta.book !== 'no') {
				if (this.isInEnemyBook(enemy)) a++;
			}
		}
		return a;
	};

	Game_System.prototype.getRegisterPercent = function() {
		var a=0;
		var b=0;
		for (var i=1; i<$dataEnemies.length; i++) {
			var enemy = $dataEnemies[i];
			if (enemy.name && enemy.meta.book !== 'no') {
				if (this.isInEnemyBook(enemy)) a++;
				b++;
			}
		}
		return Math.floor(a*100/b);
	};

	Game_System.prototype.getAchievement = function(type, vId) {
		if (type == 'per' || type == 'percent') {
			var num = this.getRegisterPercent();
			$gameVariables.setValue(vId, num);
		} else if (type == 'num' || type == 'number') {
			var num = this.getRegisterNumber();
			$gameVariables.setValue(vId, num);
		}
	};

	Game_System.prototype.isRegistered = function(eId, sId) {
		var enemy = $dataEnemies[eId];
		if (this.isInEnemyBook(enemy)) {
			$gameSwitches.setValue(sId, true);
		} else {
			$gameSwitches.setValue(sId, false);
		}
	};

	Game_System.prototype.getDefeatNumber = function(eId, vId) {
		var num = this.defeatNumber(eId);
		$gameVariables.setValue(vId, num);
	};

	Game_System.prototype.clearEnemyDropGot = function() {
		this._enemyDropGot = [];
	};

	Game_System.prototype.setEnemyDropGot = function(eId, iId, value) {
		if (!this._enemyDropGot) {
			this._enemyDropGot = [];
		}
		if (!this._enemyDropGot[eId]) {
			this._enemyDropGot[eId] = [];
		}
		this._enemyDropGot[eId][iId] = value;
	};

	Game_System.prototype.getEnemyDropGot = function(eId, iId) {
		if (!HideItemUntilGet) return true;
		if (!this._enemyDropGot) {
			this._enemyDropGot = [];
			return false;
		}
		if (!this._enemyDropGot[eId]) {
			return false;
		}
		if (!this._enemyDropGot[eId][iId]) {
			return false;
		}
		return true;
	};


//=============================================================================
// 戦闘開始時に登録
//=============================================================================
	if (ResisterTiming === 1) {
		var _Game_Troop_setup = Game_Troop.prototype.setup;
		Game_Troop.prototype.setup = function(troopId) {
			_Game_Troop_setup.call(this, troopId);
			this.members().forEach(function(enemy) {
				if (enemy.isAppeared()) {
					$gameSystem.addToEnemyBook(enemy.enemyId());
				}
			}, this);
		};
		
		var _Game_Enemy_appear = Game_Enemy.prototype.appear;
		Game_Enemy.prototype.appear = function() {
			_Game_Enemy_appear.call(this);
			$gameSystem.addToEnemyBook(this._enemyId);
		};
		
		var _Game_Enemy_transform = Game_Enemy.prototype.transform;
			Game_Enemy.prototype.transform = function(enemyId) {
			_Game_Enemy_transform.call(this, enemyId);
			$gameSystem.addToEnemyBook(enemyId);
		};
//=============================================================================
// 戦闘終了時に登録
//=============================================================================
	} else if (ResisterTiming === 2) {
		
		var _Game_Troop_setup = Game_Troop.prototype.setup;
		Game_Troop.prototype.setup = function(troopId) {
			_Game_Troop_setup.call(this, troopId);
			this._appearedMembers = [];
			this.members().forEach(function(enemy) {
				if (enemy.isAppeared()) {
					this._appearedMembers.push(enemy.enemyId());
				}
			}, this);
		};
		
		var _Game_Enemy_appear = Game_Enemy.prototype.appear;
		Game_Enemy.prototype.appear = function() {
			_Game_Enemy_appear.call(this);
			this.friendsUnit()._appearedMembers.push(this._enemyId);
		};
		
		var _Game_Enemy_transform = Game_Enemy.prototype.transform;
			Game_Enemy.prototype.transform = function(enemyId) {
			_Game_Enemy_transform.call(this, enemyId);
			this.friendsUnit()._appearedMembers.push(this._enemyId);
		};

		var Game_Troop_prototype_onBattleEnd = 
			(Game_Troop.prototype.onBattleEnd || Game_Unit.prototype.onBattleEnd);
		Game_Troop.prototype.onBattleEnd = function() {
			Game_Troop_prototype_onBattleEnd.call(this);
			for (var i=0,l=this._appearedMembers.length; i<l; i++) {
				$gameSystem.addToEnemyBook(this._appearedMembers[i]);
			}
		};
	}

//=============================================================================
// Window_PartyCommand
//=============================================================================

	var Window_PartyCommand_prototype_makeCommandList = 
		Window_PartyCommand.prototype.makeCommandList;
	Window_PartyCommand.prototype.makeCommandList = function() {
		Window_PartyCommand_prototype_makeCommandList.call(this);
		this.addEnemyBookCommand();
		this.addAllEnemyBookCommand();
	}

	Window_PartyCommand.prototype.addEnemyBookCommand = function() {
		if (!$gameSystem.isShowBattleEnemyBook()) return;
		var index = this.findSymbol('escape');
		var obj = {name:EnemyBookCommandName, symbol:'enemybook', enabled:true};
		//this.addCommandAt(index, EnemyBookCommandName, 'enemybook', true);
		this._list.splice(index, 0, obj);
		
	};
	// v1.17
	Window_PartyCommand.prototype.addAllEnemyBookCommand = function() {
		if (!$gameSystem.isShowBattleAllEnemyBook()) return;
		var index = this.findSymbol('escape');
		var obj = {name:EnemyBookAllCommandName, symbol:'allenemybook', enabled:true};
		this._list.splice(index, 0, obj);
	};


//=============================================================================
// Scene_Battle
//=============================================================================
	var Scene_Battle_prototype_createAllWindows = 
		Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		Scene_Battle_prototype_createAllWindows.call(this);
		this.createEnemyBookWindows();
	};

	Scene_Battle.prototype.createEnemyBookWindows = function() {
		this._enemyBookIndexWindow = new Window_EnemyBookIndex(0, 0);
		this._enemyBookIndexWindow.setHandler('cancel', this.endBattleEnemyBook.bind(this));
		this._enemyBookIndexWindow.deselect();

		var wx = this._enemyBookIndexWindow.width;
		var ww = Graphics.boxWidth - wx;
		var wh = Scene_EnemyBook.prototype.calcStatusWindowHeight();
		this._enemyBookStatusWindow = new Window_EnemyBookStatus(wx, 0, ww, wh);

		this._enemyBookIndexWindow.hide();
		this._enemyBookStatusWindow.hide();


		this.addWindow(this._enemyBookIndexWindow);
		this.addWindow(this._enemyBookStatusWindow);

		this._enemyBookIndexWindow.setStatusWindow(this._enemyBookStatusWindow);
	};
	
	var Scene_Battle_prototype_isAnyInputWindowActive = 
		Scene_Battle.prototype.isAnyInputWindowActive;
	Scene_Battle.prototype.isAnyInputWindowActive = function() {
		if (Scene_Battle_prototype_isAnyInputWindowActive.call(this)) return true;
		return this._enemyBookIndexWindow.active;
	};

	var Scene_Battle_prototype_createPartyCommandWindow = 
		Scene_Battle.prototype.createPartyCommandWindow;
	Scene_Battle.prototype.createPartyCommandWindow = function() {
		Scene_Battle_prototype_createPartyCommandWindow.call(this);
		var win = this._partyCommandWindow;
		win.setHandler('enemybook', this.battleEnemyBookByCommand.bind(this));
		win.setHandler('allenemybook', this.allBattleEnemyBook.bind(this));
	};

	Scene_Battle.prototype.battleEnemyBook = function() {
		// v1.17
		
		this._enemyBookStatusWindow.isAllEnemies = false;
		this._enemyBookIndexWindow.isAllEnemies = false;
		this._enemyBookStatusWindow.setup();
		this._enemyBookIndexWindow.setup();
	};
	Scene_Battle.prototype.battleEnemyBookByCommand = function() {
		// v1.17
		AB_EnemyBook.backWindow = 'party_command';
		this.battleEnemyBook();
	};
// v1.17
	Scene_Battle.prototype.allBattleEnemyBook = function() {
		AB_EnemyBook.backWindow = 'allEnemies';
		this._enemyBookStatusWindow.isAllEnemies = true;
		this._enemyBookIndexWindow.isAllEnemies = true;
		this._enemyBookStatusWindow.setup();
		this._enemyBookIndexWindow.setup();
	};

	// v1.17deselectをcloseの後に移動
	// これが呼ばれた後に
	// Window_EnemyBookIndex.processCancelが呼ばれる？
	Scene_Battle.prototype.endBattleEnemyBook = function() {
		this._enemyBookIndexWindow.close();
		this._enemyBookStatusWindow.close();
		this._enemyBookIndexWindow.deselect();
		
		// v1.28
		if (AB_EnemyBook.backWindow == 'actor_command') {
			this._actorCommandWindow.activate();
			//this._skillWindow.activate();
		}
		if (AB_EnemyBook.backWindow == 'party_command') {
			this._partyCommandWindow.activate();
			//this._skillWindow.activate();
		}
		if (AB_EnemyBook.backWindow == 'skill') {
			this._actorCommandWindow.deactivate();
			this._skillWindow.activate();
		}
		if (AB_EnemyBook.backWindow == 'item') {
			this._actorCommandWindow.deactivate();
			this._itemWindow.activate();
		}
		//this.startPartyCommandSelection();
	};

//=============================================================================
// Scene_EnemyBook
//=============================================================================

	Scene_EnemyBook = function() {
		this.initialize.apply(this, arguments);
	}
	Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;
	
	Scene_EnemyBook.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_EnemyBook.prototype.create = function() {
		// 屏蔽精英怪刷新
		if(Star.EliteEnemy.Morpho_EliteEnemy_Switch == false){
			Star.EliteEnemy.Morpho_EliteEnemy_Switch = true;
			Star.EliteEnemy.Atlas = true;
		};
        // 切换掉落恢复
	    Star.EliteEnemy.AtlasShowOrHide = true;
		Scene_MenuBase.prototype.create.call(this);
		this._percentWindow = new Window_EnemyBookPercent(0, 0);
		var wy = this._percentWindow.height;
		this._indexWindow = new Window_EnemyBookIndex(0, wy);
		this._indexWindow.setHandler('ok', this.onRangeOk.bind(this));
		this._indexWindow.setHandler('cancel', this.onOff.bind(this));
		// this._indexWindow.setHandler('cancel', this.popScene.bind(this));
		var wx = this._indexWindow.width;
		var ww = Graphics.boxWidth - wx;
        // 高度拉满
		var wh = Graphics.boxHeight;
		// var wh = this.calcStatusWindowHeight();
		this._statusWindow = new Window_EnemyBookStatus(wx, 0, ww, wh);
		this._statusWindow2 = new Window_EnemyBookStatus2(wx, 0, ww, wh);
		this._statusWindow3 = new Window_EnemyBookItemList(wx, 0, ww, wh);
        this._statusWindow3.setHandler('ok',  this.onEqListCancel.bind(this));
        this._statusWindow3.setHandler('cancel',  this.onEqListCancel.bind(this));
		this._helpWindow = new Sprite_ItemHelp(RJO.HE.ItemDescWidth);
		Star_helpWindow = this._helpWindow;
		this.addChild(this._helpWindow);
		this.addWindow(this._percentWindow);
		this.addWindow(this._indexWindow);
		this.addWindow(this._statusWindow);
		this.addWindow(this._statusWindow2);
		this.addWindow(this._statusWindow3);
   	    this._statusWindow3.close();
		// Xv1.16 （セットアップって自動で呼ばれたような？）
		this._indexWindow.isAllEnemies = true;
		this._statusWindow.isAllEnemies = true;
		this._statusWindow2.isAllEnemies = true;
		this._indexWindow.setup();
		this._indexWindow.setStatusWindow(this._statusWindow2);
		this._indexWindow.setStatusWindow(this._statusWindow);
        this._statusWindow2.hide();
		this._indexWindow.setPercentWindow(this._percentWindow);
        this.createConfirmWindow();
	};
	
	Scene_EnemyBook.prototype.onRangeOk = function() {
		var enemy = this._indexWindow._list[this._indexWindow.index()];
		if($gameSystem.isInEnemyBook(enemy.enemy())){
		  this._statusWindow3.refresh()
          this._indexWindow.deactivate();
    	  SoundManager.playOk();
    	  this._statusWindow3.open();
    	  this._statusWindow3.activate();
    	  this._statusWindow3.select(0);
		} else {
		  this._indexWindow.activate();
	  	  if($ && $.toaster) $.toaster({ message : '未解锁'});
		}
		/* if(Star.EliteEnemy.AtlasShowOrHide){
            this.startConfirmWindow("是否切换为掉落显示");
            // this._statusWindow.hide();
		    // this._indexWindow.setStatusWindow(this._statusWindow2);
            // this._statusWindow2.show();
			// Star.EliteEnemy.AtlasShowOrHide = false;
		}else{
            this.startConfirmWindow("是否切换回完整图鉴");
            // this._statusWindow2.hide();
		    // this._indexWindow.setStatusWindow(this._statusWindow);
            // this._statusWindow.show();
			// Star.EliteEnemy.AtlasShowOrHide = true;
		} */
	};
	Scene_EnemyBook.prototype.onEqListCancel = function() {
        this._statusWindow3.deactivate();
   	    this._statusWindow3.refresh();
   	    this._statusWindow3.close();
        this._indexWindow.activate();
    	this._statusWindow3.select(-1);
	};

	Scene_EnemyBook.prototype.onOff = function() {
		// 恢复精英怪刷新
		if(Star.EliteEnemy.Atlas){
			Star.EliteEnemy.Morpho_EliteEnemy_Switch = false;
			Star.EliteEnemy.Atlas = false;
		}
		this.popScene(this);
	};
	
    Scene_EnemyBook.prototype.createConfirmWindow = function() {
        this._confirmWindow = new Window_SaveConfirm();
        var win = this._confirmWindow;
        win.setHandler('confirm', this.onConfirmOk.bind(this));
        win.setHandler('cancel',  this.onConfirmCancel.bind(this));
        this.addWindow(this._confirmWindow);
    };
	Scene_EnemyBook.prototype.startConfirmWindow = function(text) {
    	SoundManager.playOk();
    	this._confirmWindow.setData(text);
    	this._confirmWindow.open();
    	this._confirmWindow.activate();
    	this._confirmWindow.select(0);
	};

	Scene_EnemyBook.prototype.onConfirmOk = function() {
    	this._confirmWindow.deactivate();
    	this._confirmWindow.close();
        if(Star.EliteEnemy.AtlasShowOrHide){
			// 掉落显示
            this._statusWindow.hide();
		    this._indexWindow.setStatusWindow(this._statusWindow2);
            this._statusWindow2.show();
			Star.EliteEnemy.AtlasShowOrHide = false;
		}else{
            this._statusWindow2.hide();
		    this._indexWindow.setStatusWindow(this._statusWindow);
            this._statusWindow.show();
			Star.EliteEnemy.AtlasShowOrHide = true;
		}
        this._indexWindow.activate();
	};

	Scene_EnemyBook.prototype.onConfirmCancel = function() {
        this._confirmWindow.deactivate();
   	    this._confirmWindow.close();
        this._indexWindow.activate();
	};
	
	Scene_EnemyBook.prototype.calcStatusWindowHeight = function() {
		var lineHeight = Window_Base.prototype.lineHeight();
		var textPadding = Window_Base.prototype.textPadding();
		var standardPadding = Window_Base.prototype.standardPadding();
		var paramHeight = Scene_EnemyBook.prototype.calcParameterHeight();
		var height = paramHeight + standardPadding * 2;
		var linePlus = 0;
		for (var i = 0; i < 5; i++) {
			if (dispRates[i]) {
				linePlus += 0.5;
			}
		}

		linePlus = Math.ceil(linePlus) * 2;

		if (DispDescribe) {
			linePlus += DescribeLineNumber;
		}
		height += linePlus * lineHeight + textPadding * Math.ceil(linePlus / 2);
		return height;
	};

	Scene_EnemyBook.prototype.calcParameterHeight = function() {
		var lineHeight = Window_Base.prototype.lineHeight();
		var textPadding = Window_Base.prototype.textPadding();
		var standardPadding = Window_Base.prototype.standardPadding();
		var height = 0;
		var linePlus = 0;
		for (var i = 0; i < 8; i++) {
			if (dispParameters[i]) {
				linePlus++;
			}
		}
		// v1.30
		linePlus += DispSkillNumber;
		
		if (DispDefeatNumber) linePlus++;
		if (DispLv) linePlus++;
		if (dispTP) linePlus++;
		if (dispHitRate) linePlus++;
		if (DispEvadeRate) linePlus++;
		linePlus = Math.max(linePlus, DispDropItems ? 9 : 6);
		height = lineHeight * linePlus + textPadding * 2;

		return height;
	};


function Window_EnemyBookItemList() {
    this.initialize.apply(this, arguments);
}

Window_EnemyBookItemList.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBookItemList.prototype.constructor = Window_EnemyBookItemList;

Window_EnemyBookItemList.prototype.initialize = function(x, y, width, height) {
	// y -= this.lineHeight();
	// height += this.lineHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._stypeId = 0;
	this.Oldindex = -1;
    this._data = [];
};

Window_EnemyBookItemList.prototype.setStypeId = function(stypeId) {
    if (this._stypeId !== stypeId) {
        this._stypeId = stypeId;
        this.refresh();
        this.resetScroll();
    }
};

Window_EnemyBookItemList.prototype.maxCols = function() {
    return 1;
};

Window_EnemyBookItemList.prototype.spacing = function() {
    return 48;
};

Window_EnemyBookItemList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_EnemyBookItemList.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_EnemyBookItemList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

// Window_EnemyBookItemList.prototype.includes = function(item) {
    // return item && item.stypeId === this._stypeId;
// };

Window_EnemyBookItemList.prototype.isEnabled = function(item) {
    return true;
};

Window_EnemyBookItemList.prototype.makeItemList = function() {
    this._data = [];
	var enemy = SceneManager._scene._indexWindow._list[SceneManager._scene._indexWindow.index()];
	var dataEnemy = enemy.enemy();
	var Star_Quality = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
	for (var i = 0, l = dataEnemy.dropItems.length; i < l; i++) {
		var di = dataEnemy.dropItems[i];
		if (di.kind > 0) {
			let zhuanshu = "";
			if (!$dataEnemies.some(function(enemy) {
				if (!enemy || enemy == dataEnemy) return false; return enemy.dropItems.some(function(dropItem) {if (!dropItem) return false; return (dropItem.kind == di.kind && dropItem.dataId == di.dataId)})})) {
				zhuanshu += "【专属掉落】";
			};
			const DropText = (Math.round((1 /  di.denominator) * enemy.dropItemRate() * 10000) / 100).clamp(0,100);
		    if (di.kind == 1) { //道具
				let item = JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId)));
				item.name = item.name + "   " + (DropText >= 100 ? "【必定掉落】" : DropText + "%") + zhuanshu;
				Star_Quality[$dataItems[di.dataId].meta.quality].push(item);
				Star_Quality[$dataItems[di.dataId].meta.quality][Star_Quality[$dataItems[di.dataId].meta.quality].length-1].isAItem = true;
			}else if (di.kind == 2) { //武器
		    	let Weapon = JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId)));
				Weapon.name = Weapon.name + "   " + (DropText >= 100 ? "【必定掉落】" : DropText + "%") + zhuanshu;
				/* var CiZui = [];
				for(var x = 0;x<Weapon.DXRPSAffixChoices.length;x++){
					for(var y = 0;y<Weapon.DXRPSAffixChoices[x].lineChoices.length;y++){
						CiZui = CiZui.concat(DreamX.parseNumberRanges(Weapon.DXRPSAffixChoices[x].lineChoices[y].line));
					}
				};
				var CiZuiNum = 0;
				// CiZui.forEach(function(num){
					// CiZui[CiZuiNum] = $dataWeapons[num].name;
					// CiZuiNum++
				// });
				var RomStr = Star.PetSystem.NumHqc(CiZui);
				if(RomStr.toString() != ""/*  && Weapon.meta.quality < 3 *//*){
				  Weapon.descParams.push(["<随机词缀>", 16, "rgba(128,255,128,1)", true]);
				  // Weapon.descParams.push([RomStr.toString(), 16, "rgba(128,255,128,1)", true]);
				}; */
			    Star_Quality[$dataWeapons[di.dataId].meta.quality].push(Weapon);
			}else if (di.kind == 3) { //防具
		    	let Armor = JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId)));
				Armor.name = Armor.name + "   " + (DropText >= 100 ? "【必定掉落】" : DropText + "%") + zhuanshu;
				/* var CiZui = [];
				for(var x = 0;x<Armor.DXRPSAffixChoices.length;x++){
					for(var y = 0;y<Armor.DXRPSAffixChoices[x].lineChoices.length;y++){
						CiZui = CiZui.concat(DreamX.parseNumberRanges(Armor.DXRPSAffixChoices[x].lineChoices[y].line));
					}
				};
				// var CiZuiNum = 0;
				// CiZui.forEach(function(num){
					// CiZui[CiZuiNum] = $dataArmors[num].name;
					// CiZuiNum++
				// });
				var RomStr = Star.PetSystem.NumHqc(CiZui);
				if(RomStr.toString() != ""/*  && Armor.meta.quality < 3 *//*){
				  Armor.descParams.push(["<随机词缀>", 16, "rgba(128,255,128,1)", true]);
				  // Armor.descParams.push([RomStr.toString(), 16, "rgba(128,255,128,1)", true]);
				}; */
				Star_Quality[$dataArmors[di.dataId].meta.quality].push(Armor);
			};
		}
	};
	for(var a = 12; a > 0;a--){
		for (var i = 0, l = Star_Quality[a].length; i < l; i++) {
			// 去除品质查看限制
			// if(Star_Quality[a][i].isAItem || Number(Star_Quality[a][i].meta.quality) > 3){
			this._data.push(Star_Quality[a][i])
			// }
		}
	};
};

Window_EnemyBookItemList.prototype.selectSort = function (arr) {
	for(var x=0;x<arr.length-1;x++) {
		for(var y=x+1;y<arr.length;y++) {
			if(arr[x].stypeId>arr[y].stypeId) {
				var temp = arr[x];
				arr[x] = arr[y];
				arr[y] = temp;
			}
		}
	}
}
	
Window_EnemyBookItemList.prototype.selectLast = function() {
    this.select(0);
};

Window_EnemyBookItemList.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (skill) {
        var costWidth = this.costWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
        // this.drawSkillCost(skill, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

Window_EnemyBookItemList.prototype.costWidth = function() {
    return this.textWidth('000');
};

/*
Window_EnemyBookItemList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
        this.changeTextColor(this.tpCostColor());
        this.drawText(this._actor.skillTpCost(skill), x, y, width, 'right');
    } else if (this._actor.skillMpCost(skill) > 0) {
        this.changeTextColor(this.mpCostColor());
        this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
    }
};
*/

Window_EnemyBookItemList.prototype.updateHelp = function() {
	this.Oldindex = this.index();
	SceneManager._scene._helpWindow.setItem(this._data[this.index()]);
	let HEw = SceneManager._scene._helpWindow;
	let rect = this.itemRect(this.index());
	var sx = this.x+rect.x+rect.width-4;
    var sy = this.y+rect.y+rect.height-4;
    if (sx+HEw.width>Graphics.boxWidth) sx=Graphics.boxWidth-HEw.width;
    if (sy+HEw.height>Graphics.boxHeight) sy=Graphics.boxHeight-HEw.height-4;
    HEw.x=sx;HEw.y=sy;
    HEw.hide();
    HEw.visible=true;
	// SceneManager._scene._helpWindow.updatePos(this.x,this.y,rect);
    this.setHelpWindowItem(this.item());
};

var Window_EnemyBookItemList_prototype_update = Window_EnemyBookItemList.prototype.update;
Window_EnemyBookItemList.prototype.update = function() {
	Window_EnemyBookItemList_prototype_update.call(this);
	if(this.Oldindex !== this.index()) this.updateHelp();
};

Window_EnemyBookItemList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};


//=============================================================================
// Window_EnemyBookPercent
//=============================================================================

	Window_EnemyBookPercent = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyBookPercent.prototype = Object.create(Window_Base.prototype);
	Window_EnemyBookPercent.prototype.constructor = Window_EnemyBookPercent;

	Window_EnemyBookPercent.prototype.initialize = function(x, y, width, height) {
		var width = Math.floor(Graphics.boxWidth / 3);
		var height = this.fittingHeight(1);
		y = 80;
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.max = 0;
		this.achievement = 0;
	};

	Window_EnemyBookPercent.prototype.setup = function() {
		this.show();
		this.open();
	};

	Window_EnemyBookPercent.prototype.setAchievement = function(max, achievement) {
		this.max = max;
		this.achievement = achievement;
		this.refresh();
	}

	Window_EnemyBookPercent.prototype.refresh = function() {
		if (this.max === 0) return;
		var w1 = this.contentsWidth()/2;
		this.drawText(Achievement, 0, 0, w1);
		this.drawText(Math.floor(this.achievement / this.max * 100) + "%", w1, 0, w1, 'right');
	}

//=============================================================================
// Window_EnemyBookIndex
//=============================================================================
	Window_EnemyBookIndex = function() {
		this.initialize.apply(this, arguments);
	}
	Window_EnemyBookIndex.prototype = Object.create(Window_Selectable.prototype);
	Window_EnemyBookIndex.prototype.constructor = Window_EnemyBookIndex;

	Window_EnemyBookIndex.lastIndex  = 0;

	Window_EnemyBookIndex.prototype.initialize = function(x, y) {
		// 目录封顶
		y = 0;
		// y = 80;
		var width = Math.floor(Graphics.boxWidth / 3);
		var height = Graphics.boxHeight - y;
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);
		//this.refresh();
		// v1.17
		this.isAllEnemies = false;
		this.enemy = null;
	}

	Window_EnemyBookIndex.prototype.setup = function() {
		this.refresh();
				// v1.17
		// setupがいつ呼ばれるかによっては図鑑を開いたときでも
		// 初期カーソルが0になってしまう恐れ
		if (!this.isAllEnemies) {
			this.select(0);
		// ver1.16
		} else if ($gameTemp.ABEnemyBookId){
			var no = 0;
			var id = $gameTemp.ABEnemyBookId;
			$gameTemp.ABEnemyBookId = null;
			this._list.some(function(enemy, i){
				if (id === enemy.enemyId()) {
					no = i;
					return true;
				}
				return false;
			});
			this.select(no);
		} else {
			this.select(Window_EnemyBookIndex.lastIndex);
		}
		this.show();
		this.activate();
		this.open();
	};

	Window_EnemyBookIndex.prototype.setupWhenCheck = function() {
		this.refresh();
		// 1.30
		this._statusWindow.isCheck = true;
		AB_EnemyBook.backWindow = 'check';
				// v1.17
		// setupWhenCheckがいつ呼ばれるかによっては図鑑を開いたときでも
		// 初期カーソルが0になってしまう恐れ
		// ただsetupWhenCheckはチェックスキルのときだけ使われるので平気だった
		if (!this.isAllEnemies) {
			this.select(0);
		} else {
			this.select(Window_EnemyBookIndex.lastIndex);
		}
		this.openness = 255;
		this.hide();
		this.activate();
	};

	Window_EnemyBookIndex.prototype.maxCols = function() {
		return 1;
	};

	Window_EnemyBookIndex.prototype.maxItems = function() {
		return this._list ? this._list.length : 0;
	};

	Window_EnemyBookIndex.prototype.setPercentWindow = function(percentWindow) {
		this._percentWindow = percentWindow;
		this.updatePercent();
	};

	Window_EnemyBookIndex.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
		this.updateStatus();
	};

	Window_EnemyBookIndex.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		this.updateStatus();
	};

	Window_EnemyBookIndex.prototype.updatePercent = function() {
		if (this._percentWindow && this._list) {
			var a = $gameSystem.getRegisterNumber();
			this._percentWindow.setAchievement(this._list.length, a);
		}
	}

	Window_EnemyBookIndex.prototype.updateStatus = function() {
		if (this._statusWindow && this._list) {
			var enemy = this._list[this.index()];
			this._statusWindow.setEnemy(enemy);
		}
	};

	Window_EnemyBookIndex.prototype.refresh = function() {
		this._list = [];
		if (this.enemy) {
			this._list.push(this.enemy);
				// v1.17
		} else if (!this.isAllEnemies && $gameSystem.isShowCurrentEnemysStatus()) {
			var enemies = $gameTroop.aliveMembers();
			for (var i=0,l=enemies.length; i<l; i++) {
				if (enemies[i].enemy().meta.book !== 'no') {
					this._list.push(enemies[i]);
				}
			}
				// v1.17
		} else if (!this.isAllEnemies) {
			var enemyIds = [];
			var enemies = $gameTroop.aliveMembers();
			for (var i=0,l=enemies.length; i<l; i++) {
				var id = enemies[i].enemyId();
				var flag = enemyIds.some(function(id2) {
					return id === id2;
				});
				if (enemies[i].enemy().meta.book !== 'no' && !flag) {
					enemyIds.push(id);
					var gameEnemy = new Game_Enemy(id,0,0);
					this._list.push(gameEnemy);
				}
			}
		} else {
			for (var i = 1; i < $dataEnemies.length; i++) {
				var enemy = $dataEnemies[i];
				if (enemy.name && enemy.meta.book !== 'no') {
					var gameEnemy = new Game_Enemy(i,0,0);
					this._list.push(gameEnemy);
				}
			}
		}
		this.createContents();
		this.drawAllItems();
	};

	Window_EnemyBookIndex.prototype.drawItem = function(index) {
		var enemy = this._list[index];
		var rect = this.itemRectForText(index);
		var name;
		// ここは、名前を？にするか判定しているだけなので変えない
		// v1.18　（↑は間違ってた）
		if (!this.isAllEnemies || $gameSystem.isInEnemyBook(enemy.enemy())) {
			name = enemy.name();
		} else {
			name = UnknownEnemy;
		}
				// v1.17
		if (this.isAllEnemies && DispNo) {
			this.drawText(index+1, rect.x, rect.y, 40);
			this.drawText(name, rect.x + 40, rect.y, rect.width - 40);
		} else {
			this.drawText(name, rect.x, rect.y, rect.width);
		}
	};
/* ツクールMV rpg_windows.jsより
Window_Selectable.processCancelでハンドラが呼ばれている。
Window_Selectable.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};
*/
// TODO: 戦闘中に図鑑（全体）を開いた後、チェックスキルを使うと何も表示されない
	Window_EnemyBookIndex.prototype.processCancel = function() {
		// v1.17
		if (this.isAllEnemies) {
			Window_EnemyBookIndex.lastIndex = this.index();
		}
		this.enemy = null;
		this._statusWindow.isCheck = false;
		// v1.17 後ろに移動
		Window_Selectable.prototype.processCancel.call(this);
	};

	// v1.29 
	Window_EnemyBookIndex.prototype.cursorRight = function(wrap) {
    var index = this.index();
		var maxItems = this.maxItems();
		var maxPageRows = this.maxPageRows();
		index = Math.min(index+maxPageRows, maxItems-1);
		this.select(index);
	};
	Window_EnemyBookIndex.prototype.cursorLeft = function(wrap) {
    var index = this.index();
		var maxPageRows = this.maxPageRows();
		index = Math.max(index-maxPageRows, 0);
		this.select(index);
	};



//=============================================================================
// Window_EnemyBookStatus
//=============================================================================

	Window_EnemyBookStatus = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyBookStatus.prototype = Object.create(Window_Base.prototype);
	Window_EnemyBookStatus.prototype.constructor = Window_EnemyBookStatus;

	Window_EnemyBookStatus.prototype.initialize = function(x, y, width, height) {
		// 图鉴封顶
		y = 0;
		// y = 80;
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this._defaultX = x;
		this._windowWidth = width;
		this._enemy = null;
		this._enemySprite = new Sprite();
		this._enemySprite.anchor.x = 0.5;
		this._enemySprite.anchor.y = 0.5;
		this._enemySprite.x = width / 4;
		this._enemySprite.y = width / 4 + this.lineHeight() + EnemyOffsetY;
		this.addChildToBack(this._enemySprite);
		/* ver 1.31*/
		if (this._backgroundSprite == undefined) {
				if (BackgroundImage) {
					this._backgroundSprite = new Sprite();
			    this._backgroundSprite.bitmap = ImageManager.loadParallax(BackgroundImage);
					this._backgroundSprite.opacity = BackgroundImageOpacity;
			    this.addChildToBack(this._backgroundSprite);
					
					var bsw = SpreadBackgroundImage ? Graphics.boxWidth : width;
					this._backgroundSprite.setFrame(0, 0, bsw, Graphics.boxWidth);
					
				}
		}
		this.isCheck = false;
		this.refresh();
		// v1.17
		this.isAllEnemies = false;
		// this._cw = 0;
		this._spriteFrameCountAB = 0;
	};

	Window_EnemyBookStatus.prototype.setup = function() {
		this.x = this._defaultX;
		this.setupbacksprite();
		this.show();
		this.open();
	};

	Window_EnemyBookStatus.prototype.setupWhenCheck = function() {
		this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
		this.width = this.windowWidth();
		this.setupbacksprite();
		this.refresh();
		this.show();
		this.open();
	};

	Window_EnemyBookStatus.prototype.setEnemy = function(enemy) {
		if (this._enemy !== enemy) {
			this._enemy = enemy;
			this.refresh();
		}
	};

// refresh に移動
// Version 1.11で復活

	Window_EnemyBookStatus.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		// ver 1.11
		if (this._enemySprite.bitmap) {
			var dataEnemy = this._enemy.enemy();
			// version 1.15
			var bitmap = this._enemySprite.bitmap;
			// ver 1.13
			if (Imported.YEP_X_AnimatedSVEnemies) {
				if (this._spriteFrameCountAB % 12 === 0) {
					if (dataEnemy.sideviewBattler[0]) {
						var ary = [0,1,2,1];
						var motionIndex = 0; // 待機モーション
						var pattern = ary[Math.floor(this._spriteFrameCountAB / 12) % 4];
						var cw = bitmap.width / 9;
						var ch = bitmap.height / 6;
						var cx = Math.floor(motionIndex / 6) * 3 + pattern;
						var cy = motionIndex % 6;
						this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
						// YEP_X_AnimatedSVEnemiesにはここに Sprite_Enemy.adjustMainBitmapSettingsがある。
						// これはBitmapを新しく作っている。（？）
						// サイドビューバトラーの高さと幅を指定していた場合調整される。
						// this._enemySprite.bitmap = new Bitmap(cw, ch);
					// サイドビューバトラーじゃない場合
					} else {
						// 1回目に表示されるようになったけどはみ出す
						this._enemySprite.setFrame(0,0,bitmap.width, bitmap.height);
						// undefined
						// console.log(this._enemySprite.spriteScaleX);
					}
				}
			}
			//ver 1.12
			if (Imported.YEP_X_AnimatedSVEnemies && dataEnemy.sideviewBattler[0]) {
				var bitmapWidth = bitmap.width / 9;
			} else {
				var bitmapWidth = bitmap.width;
			}
			var contentsWidth = this.contents.width;
			var scale = 1;
			//
			//console.log(this._enemySprite.bitmap.width);
			//console.log(contentsWidth);
			if (bitmapWidth > contentsWidth / 2) {
				scale = contentsWidth / bitmapWidth / 2;
				//console.log("bitmapWidth(+"bitmapWidth"+) > contentsWidth / 2");
			}
/*
			// ver 1.30
			scale=this.contents.width / this._enemySprite.width;
			this._enemySprite.anchor.x = 0.5;
			this._enemySprite.anchor.y = 0.5;
			this._enemySprite.x = this.contents.width/2;
			this._enemySprite.y = this.contents.height/2;
*/
			this._enemySprite.scale.x = scale;
			this._enemySprite.scale.y = scale;
			this._spriteFrameCountAB++;
		}
	};

	Window_EnemyBookStatus.prototype.refresh = function() {
		var x = 0, y = 0, width = this.contentsWidth(); height = this.height;
		if (SpreadBackgroundImage && AB_EnemyBook.backWindow == 'check') {
			x = Graphics.boxWidth/2 - this._windowWidth / 2;
			width = this._windowWidth;
		}
		
		this._enemySprite.x = x+ width / 4;
		this._enemySprite.y = width / 4 + this.lineHeight() + EnemyOffsetY;

		this.drawAllContents(x,y,width,height);

	};

	Window_EnemyBookStatus.prototype.drawAllContents = function(x, y, width, height) {
		var enemy = this._enemy;
		var column1x = x;
		var column2x = width ? x+width / 2 + this.standardPadding()/2 : this.contentsWidth() / 2 + this.standardPadding() / 2;
		var columnWidth = width ? width / 2 - this.standardPadding() : this.contentsWidth() / 2 - this.standardPadding();
		var x = x || 0;
		var y = y || 0;
		var w = columnWidth / 2 - this.standardPadding();
		//var mY = 0;
		var lineHeight = this.lineHeight();


		this.contents.clear();


		var isHideStatus = this.isHideStatus(enemy);
		var isCurrentStatus = this.isCurrentStatus(enemy);

				// v1.17
		if (!enemy|| (this.isAllEnemies && !$gameSystem.isInEnemyBook(enemy.enemy()))) {
			this._enemySprite.bitmap = null;
			return;
		}

		var dataEnemy = enemy.enemy();

		var name = enemy.battlerName();
		var hue = enemy.battlerHue();

		var bitmap;
		
		this._enemySprite.scale.x = 1;
		this._enemySprite.scale.y = 1;
		if ($gameSystem.isSideView()) {
			// YEP_X_AnimatedSVEnemiesへの対応（v1.08）
			if (Imported.YEP_X_AnimatedSVEnemies && dataEnemy.sideviewBattler[0]) {
				name = Yanfly.Util.getRandomElement(dataEnemy.sideviewBattler);
				bitmap = ImageManager.loadSvActor(name);
				var motionIndex = 0;
				var pattern = 1;
				var cw = bitmap.width / 9;
				var ch = bitmap.height / 6;
				var cx = Math.floor(motionIndex / 6) * 3 + pattern;
				var cy = motionIndex % 6;
				this._enemySprite.bitmap = bitmap;
				this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);

			} else {
				bitmap = ImageManager.loadSvEnemy(name, hue);
				var cw = bitmap.width;
				var ch = bitmap.height;
				var cx = 0;
				var cy = 0;
				this._enemySprite.bitmap = bitmap;
				// Ver1.11 たぶんこれが原因で1回目に表示されないので、
				// YEP_X_AnimatedSVEnemiesを使っていないときは
				// 処理をしない
				if (Imported.YEP_X_AnimatedSVEnemies) {
					this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
				}
			}
			
		} else {
			bitmap = ImageManager.loadEnemy(name, hue);
			var cw = bitmap.width;
			var ch = bitmap.height;
			var cx = 0;
			var cy = 0;
			this._enemySprite.bitmap = bitmap;
			if (Imported.YEP_X_AnimatedSVEnemies) {
				this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
			}
		}
		// Version 1.11
		// version 1.13で削除
		// this._cw = cw;

		// ver 1.12
/*
		var bitmapWidth = this._cw;
		var contentsWidth = this.contents.width;
		var scale = 1;
		if (bitmapWidth > contentsWidth / 2) {
			scale = contentsWidth / bitmapWidth / 2;
		}
		this._enemySprite.scale.x = scale;
		this._enemySprite.scale.y = scale;
		
*/
		this.resetTextColor();
		this.drawText(enemy.name(), x, y, columnWidth);

		let y11 = y + 64;

		this.drawText("出没于：", x, y11, columnWidth);

		$gameSystem._recordEnemyMap = $gameSystem._recordEnemyMap || [];
		$gameSystem._recordEnemyMap[enemy.enemyId()] = $gameSystem._recordEnemyMap[enemy.enemyId()] || [];
		if (!$gameSystem._recordEnemyMap[enemy.enemyId()]) {
			$gameSystem._recordEnemyMap[enemy.enemyId()] = [];
		}
		if ($gameSystem._recordEnemyMap[enemy.enemyId()].length<=0) {
			y11 += this.contents.fontSize;
			this.drawText("没有记录过任何区域", x, y11, columnWidth);
		} else {
			for (let index = 0; index < $gameSystem._recordEnemyMap[enemy.enemyId()].length; index++) {
				const mapName = $gameSystem._recordEnemyMap[enemy.enemyId()][index];
				if (mapName) {
					y11 += this.contents.fontSize;
					this.drawText(mapName, x, y11, columnWidth);
				}
			}
		};
		

		for(var a = 0;a<enemy.notetags().length;a++){
          if (enemy.notetags()[a].match(/<ENEMYRACE:[ ](\d+)>/i) && enemy.notetags()[a].match(/<ENEMYRACE:[ ](\d+)>/i)[1]) {//正则判断
            if(Star && Star.EnemyRace && Star.EnemyRace.EnemyRaceName) this.drawText("种族: " + Star.EnemyRace.EnemyRaceName[Number(enemy.notetags()[a].match(/<ENEMYRACE:[ ](\d+)>/i)[1]) - 1], x, y + lineHeight, columnWidth);
          }
        }
		

		x = column2x;

		if (dataEnemy.meta.bookLevel && DispLv) {
			this.resetTextColor();
			this.drawText(TextManager.levelA + " " + dataEnemy.meta.bookLevel, x, y);
		}


		if (DispLv) y += lineHeight;
		if (DispDefeatNumber) {
			this.resetTextColor();
			this.drawText(DefeatNumberName, x, y, w);
			this.drawText($gameSystem.defeatNumber(enemy.enemyId()), x + w, y, w , 'right');
			y += lineHeight;
		}

		if (y != 0) y += this.textPadding();

		for (var i = 0; i < 8; i++) {
			// v1.25 drawTP
			if (i == 2 && dispTP && isCurrentStatus) {
				if (!isHideStatus) {
					this.drawActorTp(enemy, x, y, 220);
				}	else {
					this.changeTextColor(this.systemColor());
					this.drawText(TextManager.tpA, x, y, 60);
					this.resetTextColor();
					this.drawText(UnknownData, x + w, y, w, 'right');
				}
				y += lineHeight;
			} else if (i == 2 && dispTP){
				this.changeTextColor(this.systemColor());
				this.drawText(TextManager.tpA, x, y, w);
				this.resetTextColor();
				if (!isUnknownEnemy) {
					this.drawText(/*enemy.xparam(0)*/ enemy.tp, x + w, y, w, 'right');
				} else {
					this.drawText(UnknownData, x + w, y, w, 'right');
				}
				y += lineHeight;
			
			}
			if (dispParameters[i]) {
				// v1.17
				if (i == 0 && !this.isAllEnemies && isCurrentStatus) {
					if (!isHideStatus) {
						this.drawActorHp(enemy, x, y, 220);
					}	else {
						this.changeTextColor(this.systemColor());
						this.drawText(TextManager.hpA, x, y, 60);
						this.resetTextColor();
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				// v1.17
				} else if (i == 1 && !this.isAllEnemies && (isCurrentStatus)) {
					if (!isHideStatus) {
						this.drawActorMp(enemy, x, y, 220);
					}	else {
						this.changeTextColor(this.systemColor());
						this.drawText(TextManager.mpA, x, y, 60);
						this.resetTextColor();
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				} else {
				    // 显示怪物各项普通属性
					this.changeTextColor(this.systemColor());
					this.drawText(TextManager.param(i), x, y, w);
					this.resetTextColor();
					if (!isHideStatus) {
					    this.drawText(enemy.param(i), x + w, y, w, 'right');
					} else {
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				}
				y += lineHeight;
			}
		}
		// 怪物命中率
		if (dispHitRate) {
			this.changeTextColor(this.systemColor());
			this.drawText(HitRateName, x, y, w);
			this.resetTextColor();
			if (!isHideStatus) {
				this.drawText((Math.floor(enemy.xparam(0)*100)) + "%", x + w, y, w, 'right');
			} else {
				this.drawText(UnknownData, x + w, y, w, 'right');
			}
			y += lineHeight;
			
		}
		Star.X = enemy
		// 怪物闪避率
		if (DispEvadeRate) {
			this.changeTextColor(this.systemColor());
			this.drawText(EvadeRateName, x, y, w);
			this.resetTextColor();
			if (!isHideStatus) {
				this.drawText((Math.floor(enemy.xparam(1)*100)) + "%", x + w, y, w, 'right');
			} else {
				this.drawText(UnknownData, x + w, y, w, 'right');
			}
			y += lineHeight;
			
		}
		// 怪物暴击率-暴击闪避率-魔法闪避率
		if (dispHitRate && DispEvadeRate) {
			this.changeTextColor(this.systemColor());
			this.drawText("暴击率", x, y, w);
			this.resetTextColor();
			if (!isHideStatus) {
				this.drawText((Math.floor(enemy.xparam(2)*100)) + "%", x + w, y, w, 'right');
			} else {
				this.drawText(UnknownData, x + w, y, w, 'right');
			}
			y += lineHeight;
			this.changeTextColor(this.systemColor());
			this.drawText("暴击闪避率", x, y, w);
			this.resetTextColor();
			if (!isHideStatus) {
				this.drawText((Math.floor(enemy.xparam(3)*100)) + "%", x + w, y, w, 'right');
			} else {
				this.drawText(UnknownData, x + w, y, w, 'right');
			}
			y += lineHeight;
			this.changeTextColor(this.systemColor());
			this.drawText("魔法闪避率", x, y, w);
			this.resetTextColor();
			if (!isHideStatus) {
				this.drawText((Math.floor(enemy.xparam(4)*100)) + "%", x + w, y, w, 'right');
			} else {
				this.drawText(UnknownData, x + w, y, w, 'right');
			}
			y += lineHeight;
			this.changeTextColor(this.systemColor());
			this.drawText("魔法反射率", x, y, w);
			this.resetTextColor();
			if (!isHideStatus) {
				this.drawText((Math.floor(enemy.xparam(5)*100)) + "%", x + w, y, w, 'right');
			} else {
				this.drawText(UnknownData, x + w, y, w, 'right');
			};
			y += lineHeight;
			this.changeTextColor(this.systemColor());
			this.drawText("反击率", x, y, w);
			this.resetTextColor();
			if (!isHideStatus) {
				this.drawText((Math.floor(enemy.xparam(6)*100)) + "%", x + w, y, w, 'right');
			} else {
				this.drawText(UnknownData, x + w, y, w, 'right');
			};
			y += lineHeight;
			
		};
		var ShowEnemyNote = false
		for(var i = 0;i < enemy.notetags().length;i++){
		    if(enemy.notetags()[i] == "<EnemyNote>" || ShowEnemyNote){
		        ShowEnemyNote = true;
		        if(enemy.notetags()[i] == "</EnemyNote>"){
		            ShowEnemyNote = false;
		        }else if(enemy.notetags()[i] != "<EnemyNote>"){
		            for(var a = 0;a <= Math.ceil(enemy.notetags()[i].length/15);a++){
		                this.drawText(enemy.notetags()[i].slice(a*15, (a+1)*15), x, y, columnWidth);
		                y += lineHeight;
		            }
		        }
		    }
		    
		}
		// v1.30
		/*var Star_SkillQuality = [[],[],[],[],[],[],[],[],[],[],[]];
		for (var i=0; i<DispSkillNumber; i++) {
			var action = dataEnemy.actions[i];
			if (action) {
					Star_SkillQuality[$dataSkills[action.skillId].meta.quality || 0].push(JSON.parse(JSON.stringify($dataSkills[action.skillId])));
			}
		};
		var Star_SkillQualityA = [[],[],[],[],[],[],[],[],[],[],[]];
		for (var i=0; i<DispSkillNumber; i++) {
			var action = dataEnemy.actions[i];
			if (action) {
					Star_SkillQualityA[$dataSkills[action.skillId].meta.quality || 0].push(JSON.parse(JSON.stringify($dataSkills[action.skillId])));
			}
		};
		var j = DispSkillNumber;
		for (var a=0; a<=10; a++) {
			for (var i = 0;i < Star_SkillQuality[a].length; i++) {
				if (!isHideStatus) {
					    // 双行显示6字分离
					    // if(Math.floor(Star_SkillQuality[a][i].name.length/5)>0 && (Star_SkillQuality[a][i].name.slice(0,6) != Star_SkillQualityA[a][i].name)){
							// if(Star_SkillQuality[a][i].name.length != 6) Star_SkillQuality[a][i].name = Star_SkillQuality[a][i].name.slice(0,6);
							// this.drawItemName(Star_SkillQuality[a][i], x, y, columnWidth);
							// y += lineHeight;
				        	// j--;
							// Star_SkillQualityA[a][i].iconIndex=0;
							// if(Star_SkillQualityA[a][i].name.length > 6) Star_SkillQualityA[a][i].name = Star_SkillQualityA[a][i].name.slice(6,12);
							// this.drawItemName(Star_SkillQualityA[a][i], x, y, columnWidth);
					    // }else{
					    	this.drawItemName(Star_SkillQuality[a][i], x, y, columnWidth);
					    // }
					
					// 双行显示
					// if(j == (DispSkillNumber - 5)){
						 // x += x/2;
						 // y -= lineHeight * 6
					// };
					y += lineHeight;
					j--;
					if(j==0) break;
				} else {
					this.drawText(UnknownData, x, y, columnWidth);
					y += lineHeight;
				}
			}
		}*/
		var maxY = y;
	
/*
		if (DispDefeatNumber) {
			this.resetTextColor();
			this.changeTextColor(this.systemColor());
			this.drawText(DefeatNumberName, x, y, w);
			this.resetTextColor();
			this.drawText($gameSystem.defeatNumber(enemy.enemyId()), x + w, y, w , 'right');
			y += lineHeight;
		}
*/
		//mY = y;

		x = column1x;
		y = lineHeight * 6 + this.textPadding();
        // 屏蔽属性显示的掉落显示
		if (!DispDropItems) {
			for (var i = 0, l = dataEnemy.dropItems.length; i < l; i++) {
				var di = dataEnemy.dropItems[i];
				if (di.kind > 0) {
					if (!isHideStatus && $gameSystem.getEnemyDropGot(enemy._enemyId, i)) {
						var item = enemy.itemObject(di.kind, di.dataId);
						this.drawItemName(item, x, y, columnWidth);
					} else {
						this.drawIcon(16, x, y);
						this.drawText(UnknownData, x + 32, y);
					}
					y += lineHeight;
				}
			}
		}
		x = column1x;
		if (maxY > y) y = maxY;
		y += this.standardPadding();
		//y = Scene_EnemyBook.prototype.calcParameterHeight();
		//y = (mY > y) ? mY : y;
		//var j = 0;
		//y = Scene_EnemyBook.prototype.calcParameterHeight();
		y = lineHeight * 7 + this.textPadding();

		for (var i = 0; i < 2; i++) {
			if (dispRates[i]) {
				switch(i) {
				case 0:
					this.drawWeakElement(x, y, columnWidth);
					break;
				case 1:
					this.drawResistElement(x, y, columnWidth);
					break;
				case 2:
					this.drawWeakStates(x, y, columnWidth);
					break;
				case 3:
					this.drawResistStates(x, y, columnWidth);
					break;
				case 4:
					this.drawNoEffectStates(x, y, columnWidth);
					break;
				}
				//j++;
				//if (j % 2 == 1) {
				//	x = column2x;
				//} else {
				//	x = column1x;
					y += lineHeight * 2 + this.textPadding();
				//}
			}
		}
		var Star_SkillQuality = [[],[],[],[],[],[],[],[],[],[],[]];
		for (var i=0; i<DispSkillNumber; i++) {
			var action = dataEnemy.actions[i];
			if (action) {

					let text = "";
					let conditionParam1 = action.conditionParam1;
					let conditionParam2 = action.conditionParam2;
					let conditionType = action.conditionType;
					let rating = action.rating;

					switch (conditionType) {
						case 0:
							text += "正常状态";
							break;
						case 1:
							text += "回合:" + conditionParam1;
							const text1 = (conditionParam2 > 0) ? ("~" +  "回合:" + conditionParam2 + "* N") : "";
							text += text1;
							break;
						case 2:
								text += "HP比例:" + conditionParam1 * 100 + "%" + "~" + conditionParam2 * 100 + "%";
								break;
						case 3:
								text += "MP比例:" + conditionParam1 * 100 + "%" + "~" + conditionParam2 * 100 + "%";
								break;
						case 4:
								text += "状态: " + $dataStates[conditionParam1].name;
								break;
						case 5:
								text += "玩家队伍最高等级达到:" + conditionParam1;
								break;
						case 6:
								text += "开关: " + $dataSystem.switches[conditionParam1] + "  开启";
								break;
					};
					text += "  使用概率:" + rating;
					const skill = JSON.parse(JSON.stringify($dataSkills[action.skillId]));
					skill.name += "   " + text;
					Star_SkillQuality[$dataSkills[action.skillId].meta.quality || 0].push(skill);
			}
		};
		var Star_SkillQualityA = [[],[],[],[],[],[],[],[],[],[],[]];
		for (var i=0; i<DispSkillNumber; i++) {
			var action = dataEnemy.actions[i];
			if (action) {
					Star_SkillQualityA[$dataSkills[action.skillId].meta.quality || 0].push(JSON.parse(JSON.stringify($dataSkills[action.skillId])));
			}
		};
		var j = DispSkillNumber;
		for (var a=0; a<=10; a++) {
			for (var i = 0;i < Star_SkillQuality[a].length; i++) {
				if (!isHideStatus) {
					    // 双行显示6字分离
					    // if(Math.floor(Star_SkillQuality[a][i].name.length/5)>0 && (Star_SkillQuality[a][i].name.slice(0,6) != Star_SkillQualityA[a][i].name)){
							// if(Star_SkillQuality[a][i].name.length != 6) Star_SkillQuality[a][i].name = Star_SkillQuality[a][i].name.slice(0,6);
							// this.drawItemName(Star_SkillQuality[a][i], x, y, columnWidth);
							// y += lineHeight;
				        	// j--;
							// Star_SkillQualityA[a][i].iconIndex=0;
							// if(Star_SkillQualityA[a][i].name.length > 6) Star_SkillQualityA[a][i].name = Star_SkillQualityA[a][i].name.slice(6,12);
							// this.drawItemName(Star_SkillQualityA[a][i], x, y, columnWidth);
					    // }else{
					    	this.drawItemName(Star_SkillQuality[a][i], x, y, columnWidth);
					    // }
					
					// 双行显示
					// if(j == (DispSkillNumber - 5)){
						 // x += x/2;
						 // y -= lineHeight * 6
					// };
					y += lineHeight;
					j--;
					if(j==0) break;
				} else {
					this.drawText(UnknownData, x, y, columnWidth);
					y += lineHeight;
				}
			}
		}
		//if (x == column2x) 
		//	y += lineHeight * 2 + this.textPadding();
		x = column1x;
		
		if (!isHideStatus && DispDescribe) {
			for (var i = 1; i <= DescribeLineNumber; i++) {
				this.drawTextEx(dataEnemy.meta["desc"+i], x, y + lineHeight * (i-1));
			}
		}
	};

	Window_EnemyBookStatus.prototype.findElementIcon = function(elementId) {
		if (UseElementIconInPluginParameter) {
			return ElementIcons[elementId];
		} else {
			var elementName = $dataSystem.elements[elementId];
			if (elementName.match(/\i\[(\d+)\]/i)) {
				return RegExp.$1;
			}
		}
		return 0;
	};

	Window_EnemyBookStatus.prototype.drawResistElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate < 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push({"icon":icon,"rate":rate});
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i].icon, x, y);
				this.changeTextColor(this.normalColor());
				const fontSize = this.contents.fontSize;
				this.contents.fontSize = dx / 2;
				this.drawText((100 - icons[i].rate * 100) + "%", x, y, dx, dx, 'centre');
				this.contents.fontSize = fontSize;
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawWeakElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate > 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push({"icon":icon,"rate":rate});
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i].icon, x, y);
				this.changeTextColor(this.normalColor());
				const fontSize = this.contents.fontSize;
				this.contents.fontSize = dx / 2;
				this.drawText((icons[i].rate * 100 - 100) + "%", x, y, dx, dx, 'centre');
				this.contents.fontSize = fontSize;
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawResistStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate < 1 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				if (dispRates[4] && (rate <= 0 || enemy.isStateResist(i))) continue;
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawWeakStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if (rate > 1 && $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.isHideStatus = function(enemy) {
		if (!enemy) return true;
		return !($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill));
	};

	Window_EnemyBookStatus.prototype.isCurrentStatus = function(enemy) {
		if (!enemy) return false;
		return !this.isAllEnemies && ($gameSystem.isShowCurrentEnemysStatus() || this.isCheck) && !ShowGeneralStatusInSkill;
	};

	Window_EnemyBookStatus.prototype.drawNoEffectStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate <= 0 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(NoEffectStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};


//=============================================================================
// Window_EnemyBookStatus2
//=============================================================================

	Window_EnemyBookStatus2 = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyBookStatus2.prototype = Object.create(Window_Base.prototype);
	Window_EnemyBookStatus2.prototype.constructor = Window_EnemyBookStatus2;

	Window_EnemyBookStatus2.prototype.initialize = function(x, y, width, height) {
		// 图鉴封顶
		y = 0;
		// y = 80;
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this._defaultX = x;
		this._windowWidth = width;
		this._enemy = null;
		this._enemySprite = new Sprite();
		this._enemySprite.anchor.x = 0.5;
		this._enemySprite.anchor.y = 0.5;
		this._enemySprite.x = width / 4;
		this._enemySprite.y = width / 4 + this.lineHeight() + EnemyOffsetY;
		this.addChildToBack(this._enemySprite);
		/* ver 1.31*/
		if (this._backgroundSprite == undefined) {
				if (BackgroundImage) {
					this._backgroundSprite = new Sprite();
			    this._backgroundSprite.bitmap = ImageManager.loadParallax(BackgroundImage);
					this._backgroundSprite.opacity = BackgroundImageOpacity;
			    this.addChildToBack(this._backgroundSprite);
					
					var bsw = SpreadBackgroundImage ? Graphics.boxWidth : width;
					this._backgroundSprite.setFrame(0, 0, bsw, Graphics.boxWidth);
					
				}
		}
		this.isCheck = false;
		this.refresh();
		// v1.17
		this.isAllEnemies = false;
		// this._cw = 0;
		this._spriteFrameCountAB = 0;
	};

	Window_EnemyBookStatus2.prototype.setup = function() {
		this.x = this._defaultX;
		this.setupbacksprite();
		this.show();
		this.open();
	};

	Window_EnemyBookStatus2.prototype.setupWhenCheck = function() {
		this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
		this.width = this.windowWidth();
		this.setupbacksprite();
		this.refresh();
		this.show();
		this.open();
	};

	Window_EnemyBookStatus2.prototype.setEnemy = function(enemy) {
		if (this._enemy !== enemy) {
			this._enemy = enemy;
			this.refresh();
		}
	};

// refresh に移動
// Version 1.11で復活

	Window_EnemyBookStatus2.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		// ver 1.11
		if (this._enemySprite.bitmap) {
			var dataEnemy = this._enemy.enemy();
			// version 1.15
			var bitmap = this._enemySprite.bitmap;
			// ver 1.13
			if (Imported.YEP_X_AnimatedSVEnemies) {
				if (this._spriteFrameCountAB % 12 === 0) {
					if (dataEnemy.sideviewBattler[0]) {
						var ary = [0,1,2,1];
						var motionIndex = 0; // 待機モーション
						var pattern = ary[Math.floor(this._spriteFrameCountAB / 12) % 4];
						var cw = bitmap.width / 9;
						var ch = bitmap.height / 6;
						var cx = Math.floor(motionIndex / 6) * 3 + pattern;
						var cy = motionIndex % 6;
						this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
						// YEP_X_AnimatedSVEnemiesにはここに Sprite_Enemy.adjustMainBitmapSettingsがある。
						// これはBitmapを新しく作っている。（？）
						// サイドビューバトラーの高さと幅を指定していた場合調整される。
						// this._enemySprite.bitmap = new Bitmap(cw, ch);
					// サイドビューバトラーじゃない場合
					} else {
						// 1回目に表示されるようになったけどはみ出す
						this._enemySprite.setFrame(0,0,bitmap.width, bitmap.height);
						// undefined
						// console.log(this._enemySprite.spriteScaleX);
					}
				}
			}
			//ver 1.12
			if (Imported.YEP_X_AnimatedSVEnemies && dataEnemy.sideviewBattler[0]) {
				var bitmapWidth = bitmap.width / 9;
			} else {
				var bitmapWidth = bitmap.width;
			}
			var contentsWidth = this.contents.width;
			var scale = 1;
			//
			//console.log(this._enemySprite.bitmap.width);
			//console.log(contentsWidth);
			if (bitmapWidth > contentsWidth / 2) {
				scale = contentsWidth / bitmapWidth / 2;
				//console.log("bitmapWidth(+"bitmapWidth"+) > contentsWidth / 2");
			}
/*
			// ver 1.30
			scale=this.contents.width / this._enemySprite.width;
			this._enemySprite.anchor.x = 0.5;
			this._enemySprite.anchor.y = 0.5;
			this._enemySprite.x = this.contents.width/2;
			this._enemySprite.y = this.contents.height/2;
*/
			this._enemySprite.scale.x = scale;
			this._enemySprite.scale.y = scale;
			this._spriteFrameCountAB++;
		}
	};

	Window_EnemyBookStatus2.prototype.refresh = function() {
		var x = 0, y = 0, width = this.contentsWidth(); height = this.height;
		if (SpreadBackgroundImage && AB_EnemyBook.backWindow == 'check') {
			x = Graphics.boxWidth/2 - this._windowWidth / 2;
			width = this._windowWidth;
		}
		
		this._enemySprite.x = x+ width / 4;
		this._enemySprite.y = width / 4 + this.lineHeight() + EnemyOffsetY;

		this.drawAllContents(x,y,width,height);

	};

	

	Window_EnemyBookStatus2.prototype.drawAllContents = function(x, y, width, height) {
		var enemy = this._enemy;
		var column1x = x;
		var column2x = width ? x+width / 2 + this.standardPadding()/2 : this.contentsWidth() / 2 + this.standardPadding() / 2;
		var columnWidth = width ? width / 2 - this.standardPadding() : this.contentsWidth() / 2 - this.standardPadding();
		var x = x || 0;
		var y = y || 0;
		var w = columnWidth / 2 - this.standardPadding();
		//var mY = 0;
		var lineHeight = this.lineHeight();


		this.contents.clear();


		var isHideStatus = this.isHideStatus(enemy);
		var isCurrentStatus = this.isCurrentStatus(enemy);

				// v1.17
		if (!enemy|| (this.isAllEnemies && !$gameSystem.isInEnemyBook(enemy.enemy()))) {
			this._enemySprite.bitmap = null;
			return;
		}

		var dataEnemy = enemy.enemy();

		var name = enemy.battlerName() + "/掉落";
		this.resetTextColor();
		this.drawText(enemy.name(), x, y, columnWidth);

		x = column2x;

		if (y != 0) y += this.textPadding();

		var maxY = y;
	

		x = column1x;
		y = lineHeight + this.textPadding();
		if (DispDropItems) {
			var Star_Quality = [[],[],[],[],[],[],[],[],[],[],[],[]];
			for (var i = 0, l = dataEnemy.dropItems.length; i < l; i++) {
				var di = dataEnemy.dropItems[i];
				if (di.kind > 0) {
				    if (di.kind == 1) { //道具
				    	Star_Quality[$dataItems[di.dataId].meta.quality].push(JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId))));
						Star_Quality[$dataItems[di.dataId].meta.quality][Star_Quality[$dataItems[di.dataId].meta.quality].length-1].isAItem = true;
			    	}else if (di.kind == 2) { //武器
			    		Star_Quality[$dataWeapons[di.dataId].meta.quality].push(JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId))))
			    	}else if (di.kind == 3) { //防具
			    		Star_Quality[$dataArmors[di.dataId].meta.quality].push(JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId))))
			    	};
				}
			};
			var ForI = 0;
	    	for(var a = 8; a > 0;a--){
			    for (var i = 0, l = Star_Quality[a].length; i < l; i++) {
					if (!isHideStatus) {
						if(Star_Quality[a][i].isAItem || Number(Star_Quality[a][i].meta.quality) > 3){
					    	this.drawItemName(Star_Quality[a][i], x, y, columnWidth);
				    	    y += lineHeight;
					        ForI++;
                            if(ForI == Graphics.boxHeight/lineHeight - 2){
                                x = column2x;
				            	y = this.textPadding();
                            }else if(ForI == Graphics.boxHeight/lineHeight*2 - 4){
                                x = column2x*2;
				            	y = this.textPadding();
                            }
						}
					} else {
						this.drawIcon(16, x, y);
						this.drawText(UnknownData, x + 32, y);
					}
				}
			}
			this.drawText("精良及以下等级的装备不显示", column2x, this.textPadding() + Graphics.boxHeight - lineHeight*2);
			/*
			var Star_Quality = [[],[],[],[],[],[],[],[],[]];
			for (var i = 0, l = dataEnemy.dropItems.length; i < l; i++) {
				var di = dataEnemy.dropItems[i];
				if (di.kind > 0) {
				    if (di.kind == 1) { //道具
				    	Star_Quality[$dataItems[di.dataId].meta.quality].push(JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId))))
			    	}else if (di.kind == 2) { //武器
			    		Star_Quality[$dataWeapons[di.dataId].meta.quality].push(JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId))))
			    	}else if (di.kind == 3) { //防具
			    		Star_Quality[$dataArmors[di.dataId].meta.quality].push(JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId))))
			    	};
				}
			};
			var Star_QualityA = [[],[],[],[],[],[],[],[],[]];
			for (var i = 0, l = dataEnemy.dropItems.length; i < l; i++) {
				var di = dataEnemy.dropItems[i];
				if (di.kind > 0) {
				    if (di.kind == 1) { //道具
				    	Star_QualityA[$dataItems[di.dataId].meta.quality].push(JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId))))
			    	}else if (di.kind == 2) { //武器
			    		Star_QualityA[$dataWeapons[di.dataId].meta.quality].push(JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId))))
			    	}else if (di.kind == 3) { //防具
			    		Star_QualityA[$dataArmors[di.dataId].meta.quality].push(JSON.parse(JSON.stringify(enemy.itemObject(di.kind, di.dataId))))
			    	};
				}
			};
			var ForI = 0,F1=true,F2=true,F3=true;
	    	for(var a = 8; a > 0;a--){
			    for (var i = 0, l = Star_Quality[a].length; i < l; i++) {
					if (!isHideStatus) {
					    if(Math.floor(Star_Quality[a][i].name.length/7)>0 && (Star_Quality[a][i].name.slice(0,8) != Star_QualityA[a][i].name)){
							if(Star_Quality[a][i].name.length != 8) Star_Quality[a][i].name = Star_Quality[a][i].name.slice(0,8);
							this.drawItemName(Star_Quality[a][i], x, y, columnWidth);
							y += lineHeight;
				            ForI++;
							Star_QualityA[a][i].iconIndex=0;
							if(Star_QualityA[a][i].name.length > 8) Star_QualityA[a][i].name = Star_QualityA[a][i].name.slice(8,16);
							this.drawItemName(Star_QualityA[a][i], x, y, columnWidth);
					    }else{
					    	this.drawItemName(Star_Quality[a][i], x, y, columnWidth);
					    }
					} else {
						this.drawIcon(16, x, y);
						this.drawText(UnknownData, x + 32, y);
					}
					y += lineHeight;
					ForI++;
                    if((ForI == (Graphics.boxHeight/lineHeight - 3) || (ForI == (Graphics.boxHeight/lineHeight - 2))) && !!F1){
                        x = column2x/3*2;
				    	y = this.textPadding();
						F1 = !F1;
                    }else if((ForI == (Graphics.boxHeight/lineHeight*2 - 3) || (ForI == (Graphics.boxHeight/lineHeight*2 - 2))) && !!F2){
                        x = column2x/3*4;
				    	y = this.textPadding();
						F2 = !F2;
                    }
				}
			}*/
		}
/*
		x = column1x;
		if (maxY > y) y = maxY;
		y += this.standardPadding();
		//y = Scene_EnemyBook.prototype.calcParameterHeight();
		//y = (mY > y) ? mY : y;
		var j = 0;
		y = Scene_EnemyBook.prototype.calcParameterHeight();

		for (var i = 0; i < 5; i++) {
			if (dispRates[i]) {
				switch(i) {
				case 0:
					this.drawWeakElement(x, y, columnWidth);
					break;
				case 1:
					this.drawResistElement(x, y, columnWidth);
					break;
				case 2:
					this.drawWeakStates(x, y, columnWidth);
					break;
				case 3:
					this.drawResistStates(x, y, columnWidth);
					break;
				case 4:
					this.drawNoEffectStates(x, y, columnWidth);
					break;
				}
				j++;
				if (j % 2 == 1) {
					x = column2x;
				} else {
					x = column1x;
					y += lineHeight * 2 + this.textPadding();
				}
			}
		}
		if (x == column2x) 
			y += lineHeight * 2 + this.textPadding();
		x = column1x;
		
		if (!isHideStatus && DispDescribe) {
			for (var i = 1; i <= DescribeLineNumber; i++) {
				this.drawTextEx(dataEnemy.meta["desc"+i], x, y + lineHeight * (i-1));
			}
		}*/
	};

	Window_EnemyBookStatus2.prototype.findElementIcon = function(elementId) {
		if (UseElementIconInPluginParameter) {
			return ElementIcons[elementId];
		} else {
			var elementName = $dataSystem.elements[elementId];
			if (elementName.match(/\i\[(\d+)\]/i)) {
				return RegExp.$1;
			}
		}
		return 0;
	};

	//绘制抵抗属性
	Window_EnemyBookStatus2.prototype.drawResistElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate < 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push(icon);
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus2.prototype.drawWeakElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate > 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push(icon);
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus2.prototype.drawResistStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate < 1 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				if (dispRates[4] && (rate <= 0 || enemy.isStateResist(i))) continue;
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus2.prototype.drawWeakStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if (rate > 1 && $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus2.prototype.isHideStatus = function(enemy) {
		if (!enemy) return true;
		return !($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill));
	};

	Window_EnemyBookStatus2.prototype.isCurrentStatus = function(enemy) {
		if (!enemy) return false;
		return !this.isAllEnemies && ($gameSystem.isShowCurrentEnemysStatus() || this.isCheck) && !ShowGeneralStatusInSkill;
	};

	Window_EnemyBookStatus2.prototype.drawNoEffectStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate <= 0 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(NoEffectStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};



//=============================================================================
// Game_Action
//=============================================================================

	var Game_Action_prototype_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		Game_Action_prototype_apply.call(this, target);
		this.applyEnemyBookEffect(target);
	};

	Game_Action.prototype.applyEnemyBookEffect = function(target) {
		if (target.isEnemy()) {
			if (this._item.object().meta.addToEnemyBook) {
				this.addToEnemyBook(target);
			}
			if (this._item.object().meta.checkEnemyStatus) {
				this.checkEnemyStatus(target);
			}
		}
	};

	Game_Action.prototype.addToEnemyBook = function(target) {
		var result = target.result();
		this.makeSuccess(target);
		if (result.isHit()) {
			if (target.enemy().meta.book !== "no") {
				$gameSystem.addToEnemyBook(target.enemyId());
				var message = AddEnemySkillMessage.replace("%1", target.name());
				if (message) {
					BattleManager._logWindow.push('addText', message);
				}
			} else {
				var message = FailToAddEnemySkillMessage.replace("%1", target.name());
				if (message) {
					BattleManager._logWindow.push('addText', message);
				}
			}
		} else {
			var message = MissToAddEnemySkillMessage.replace("%1", target.name());
			if (message) {
				BattleManager._logWindow.push('addText', message);
			}
		}
	};

	Game_Action.prototype.checkEnemyStatus = function(target) {
		this.makeSuccess(target);
		if (!(target.enemy().meta.book == "no" && !target.enemy().meta.bookCanCheck)) {
			var indexWindow = SceneManager._scene._enemyBookIndexWindow;
			var statusWindow = SceneManager._scene._enemyBookStatusWindow;
			if (ShowGeneralStatusInSkill) {
				var id = target.enemyId();
				indexWindow.enemy = new Game_Enemy(id, 0, 0);
			} else {
				indexWindow.enemy = target;
			}
			statusWindow.isCheck = true;
			// v1.17
			indexWindow.isAllEnemies = false;
			statusWindow.isAllEnemies = false;

			indexWindow.setupWhenCheck();
			statusWindow.setupWhenCheck();
		} else {
			var message = FailToCheckEnemySkillMessage.replace("%1", target.name());
			if (message) {
				BattleManager._logWindow.push('addText', message);
			}
		}
	};


//=============================================================================
// Game_Enemy
//=============================================================================

	var _Game_Enemy_die = Game_Enemy.prototype.die;
	Game_Enemy.prototype.die = function() {
		_Game_Enemy_die.call(this);
		$gameSystem.incrementDefeatNumber(this.enemyId());
	};

	var new_Game_Enemy_dropItemRate = Game_Enemy.prototype.dropItemRate;
    Game_Enemy.prototype.dropItemRate = function() {
        let rate = 1;
        $gameParty.battleMembers().some(function (actor) {
            actor.iteratePassiveSkill('passiveIRUP', function (metaData) {
                rate += Number(metaData) * 0.01 * rate;
            });
        });
        return new_Game_Enemy_dropItemRate.call(this) * rate;
    };

	var _Game_Enemy_prototype_makeDropItems = Game_Enemy.prototype.makeDropItems;
	Game_Enemy.prototype.makeDropItems = function() {
		var r = _Game_Enemy_prototype_makeDropItems.call(this);
		for (var i=0, l=r.length; i<l; i++) {
			var DI = this.enemy().dropItems;
			for (var j=0, jl=DI.length; j<jl; j++) {
				if (r[i].id === DI[j].dataId) {
					switch (DI[j].kind) {
					case 1:
						if (DataManager.isItem(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					case 2:
						if (DataManager.isWeapon(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					case 3:
						if (DataManager.isArmor(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					}
				}
			}
		}
		return r;
	}
	// MOG替换 加到后面
 	XdRsData.hangUp._Game_Enemy_prototype_makeDropItems = Game_Enemy.prototype.makeDropItems;
    Game_Enemy.prototype.makeDropItems = function() {
		console.log(this.dropItemRate());
		
	  var r = XdRsData.hangUp._Game_Enemy_prototype_makeDropItems.call(this);
	  console.log(r);
	  if($gameParty.isDropShield() && r.length > 0){
		for(var i = 0;i < r.length;i++){
			if((DataManager.isWeapon(r[i]) || DataManager.isArmor(r[i])) && (r[i].meta.quality == '1' || r[i].meta.quality == '2' || r[i].meta.quality == '3')){
				r.remove(r[i]);
				i--;
				if(r.length == 0) break;
			}
		}
	  }
	return r;
	}


// 
//=============================================================================
// v1.28 ショートカットキー
//=============================================================================
// 参考プラグイン：Torigoya_OneButtonSkill.js
// http://torigoya.hatenadiary.jp/
// プラグイン制作者：ru_shalm様


		var AB_EnemyBook = {
			name: 'AB_EnemyBook',
			backWindow :null
		};
//-----------------------------------


    AB_EnemyBook.onCommand = function () {
		// v1.28
				SceneManager._scene.battleEnemyBook();
    };

// Window_ActorCommand-----------------------------------

    Window_ActorCommand.prototype.processAB_EnemyBook = function () {
        if (!$gameParty.inBattle()) return;
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
				AB_EnemyBook.backWindow = 'actor_command';
        this.callHandler('ab_enemybook');
    };
    
    var _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function () {
        _Scene_Battle_createActorCommandWindow.apply(this);
        this._actorCommandWindow.setHandler('ab_enemybook', AB_EnemyBook.onCommand.bind(this));
    };

		var _Window_ActorCommand_processHandling = Window_ActorCommand.prototype.processHandling;
    Window_ActorCommand.prototype.processHandling = function () {
        _Window_ActorCommand_processHandling.apply(this);
        if (this.isOpenAndActive()) {
            if (Input.isTriggered(ShortCutButtonName)) {
                this.processAB_EnemyBook();
            }
        }
    };


// Window_BattleSkill-----------------------------------

    Window_BattleSkill.prototype.processAB_EnemyBook = function () {
        if (!$gameParty.inBattle()) return;
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
				AB_EnemyBook.backWindow = 'skill';
        this.callHandler('ab_enemybook');
    };
    
    var _Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
    Scene_Battle.prototype.createSkillWindow = function () {
        _Scene_Battle_createSkillWindow.apply(this);
        this._skillWindow.setHandler('ab_enemybook', AB_EnemyBook.onCommand.bind(this));
    };

		var _Window_BattleSkill_processHandling = Window_BattleSkill.prototype.processHandling;
    Window_BattleSkill.prototype.processHandling = function () {
        _Window_BattleSkill_processHandling.apply(this);
        if (this.isOpenAndActive()) {
            if (Input.isTriggered(ShortCutButtonName)) {
                this.processAB_EnemyBook();
            }
        }
    };
// Window_BattleItem-----------------------------------

    Window_BattleItem.prototype.processAB_EnemyBook = function () {
        if (!$gameParty.inBattle()) return;
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
				AB_EnemyBook.backWindow = 'item';
        this.callHandler('ab_enemybook');
    };
    
    var _Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
    Scene_Battle.prototype.createItemWindow = function () {
        _Scene_Battle_createItemWindow.apply(this);
        this._itemWindow.setHandler('ab_enemybook', AB_EnemyBook.onCommand.bind(this));
    };

		var _Window_BattleItem_processHandling = Window_BattleItem.prototype.processHandling;
    Window_BattleItem.prototype.processHandling = function () {
        _Window_BattleItem_processHandling.apply(this);
        if (this.isOpenAndActive()) {
            if (Input.isTriggered(ShortCutButtonName)) {
                this.processAB_EnemyBook();
								console.log("itemshift");
            }
        }
    };
// Window_PartyCommand-----------------------------------

    Window_PartyCommand.prototype.processAB_EnemyBook = function () {
        if (!$gameParty.inBattle()) return;
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
				AB_EnemyBook.backWindow = 'party_command';
        this.callHandler('ab_enemybook');
    };
    
    var _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function () {
        _Scene_Battle_createPartyCommandWindow.apply(this);
        this._partyCommandWindow.setHandler('ab_enemybook', AB_EnemyBook.onCommand.bind(this));
    };

		var _Window_PartyCommand_processHandling = Window_PartyCommand.prototype.processHandling;
    Window_PartyCommand.prototype.processHandling = function () {
        _Window_PartyCommand_processHandling.apply(this);
        if (this.isOpenAndActive()) {
            if (Input.isTriggered(ShortCutButtonName)) {
                this.processAB_EnemyBook();
            }
        }
    };

/**-----*/

Window_EnemyBookStatus.prototype.updateBackOpacity = function() {
		if (!BackgroundImage) {
			Window_Base.prototype.updateBackOpacity.call(this);
			return;
		} 
    this.backOpacity = 0;
		this.opacity = 0;
};
Window_EnemyBookStatus.prototype.windowWidth = function() {
		return this._windowWidth;
};
Window_EnemyBookStatus.prototype.setupbacksprite = function() {
		if (SpreadBackgroundImage) {
			if (AB_EnemyBook.backWindow == 'check') {
				//this._backgroundSprite.x = -(Graphics.boxWidth - this.width)/2;
				this.x = 0;
				this.width = Graphics.boxWidth;
				this.height = Graphics.boxHeight/* + this.standardPadding() * 2*/;
				if (BackgroundImage && BackgroundImage && this._backgroundSprite != null) {
					this._backgroundSprite.setFrame(0, 0, this.width, this.height);
		    }
				this.createContents();
				this.refresh();
				return;
			}
		
			this.x = this._defaultX;
			this.width = this._windowWidth;
			this.height = Scene_EnemyBook.prototype.calcStatusWindowHeight();
			if (BackgroundImage && BackgroundImage && this._backgroundSprite != null) {
				this._backgroundSprite.x = 0;
				this._backgroundSprite.setFrame(0, 0, this.width, this.height);
			}
	    this.createContents();
			this.refresh();
		}
};


Window_EnemyBookStatus2.prototype.updateBackOpacity = function() {
		if (!BackgroundImage) {
			Window_Base.prototype.updateBackOpacity.call(this);
			return;
		} 
    this.backOpacity = 0;
		this.opacity = 0;
};
Window_EnemyBookStatus2.prototype.windowWidth = function() {
		return this._windowWidth;
};
Window_EnemyBookStatus2.prototype.setupbacksprite = function() {
		if (SpreadBackgroundImage) {
			if (AB_EnemyBook.backWindow == 'check') {
				//this._backgroundSprite.x = -(Graphics.boxWidth - this.width)/2;
				this.x = 0;
				this.width = Graphics.boxWidth;
				this.height = Graphics.boxHeight/* + this.standardPadding() * 2*/;
				if (BackgroundImage && BackgroundImage && this._backgroundSprite != null) {
					this._backgroundSprite.setFrame(0, 0, this.width, this.height);
		    }
				this.createContents();
				this.refresh();
				return;
			}
		
			this.x = this._defaultX;
			this.width = this._windowWidth;
			this.height = Scene_EnemyBook.prototype.calcStatusWindowHeight();
			if (BackgroundImage && BackgroundImage && this._backgroundSprite != null) {
				this._backgroundSprite.x = 0;
				this._backgroundSprite.setFrame(0, 0, this.width, this.height);
			}
	    this.createContents();
			this.refresh();
		}
};

Window_EnemyBookIndex.prototype.updateBackOpacity = function() {
		if (!BackgroundImage) {
			Window_Base.prototype.updateBackOpacity.call(this);
			return;
		} 
		if (this._backgroundSprite == undefined && BackgroundImage) {
		    this.backOpacity = 0;
				this.opacity = 0;
				this._backgroundSprite = new Sprite();
		    this._backgroundSprite.bitmap = ImageManager.loadParallax(BackgroundImage);
				this._backgroundSprite.opacity = BackgroundImageOpacity;
		    this.addChildToBack(this._backgroundSprite);
				
		}
};
Window_EnemyBookPercent.prototype.updateBackOpacity = function() {
/**/
		if (!BackgroundImage) {
			Window_Base.prototype.updateBackOpacity.call(this);
			return;
		} 
		if (this._backgroundSprite == undefined && BackgroundImage) {
		    this.backOpacity = 0;
				this.opacity = 0;
				this._backgroundSprite = new Sprite();
		    this._backgroundSprite.bitmap = ImageManager.loadParallax(BackgroundImage);
				this._backgroundSprite.opacity = BackgroundImageOpacity;
		    this.addChildToBack(this._backgroundSprite);
		}
};


/**-----*/

})();