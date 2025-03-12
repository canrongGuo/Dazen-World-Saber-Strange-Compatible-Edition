//=============================================================================
// Yanfly Engine Plugins - Battle Artificial Intelligence Core
// YEP_BattleAICore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleAICore = true;

var Yanfly = Yanfly || {};
Yanfly.CoreAI = Yanfly.CoreAI || {};
Yanfly.CoreAI.version = 1.13;

//=============================================================================
 /*:
 * @plugindesc v1.13 This plugin allows you to structure battle A.I.
 * 更多的控制模式。
 * @author Yanfly Engine Plugins
 *
 * @param Dynamic Actions
 * @type boolean
 * @on YES
 * @off NO
 * @desc 
 * 如果启用，敌人的行动是当场决定的，而不是回合开始的时候。   
 * NO - false     YES - true
 * @default true
 *
 * @param Dynamic Turn Count
 * @type boolean
 * @on YES
 * @off NO
 * @desc 确定回合计数动态是否为早或晚计数。
 * true - Current Turn（当前回合） + 1   false - Current Turn
 * @default false
 *
 * @param Element Testing
 * @type boolean
 * @on YES
 * @off NO
 * @desc 如果启用，敌人将通过设置它们以匹配第一个元素来测试它们的元素。   NO - false     YES - true
 * @default true
 *
 * @param Default AI Level
 * @type number
 * @min 0
 * @max 100
 * @desc 这是所有敌人的默认AI级别。
 * Level 0: Very Random     Level 100: Very Strict
 * @default 80
 *
 * @help
 * ============================================================================
 * Introduction 介绍
 * ============================================================================
 *
 * RMMV的默认敌人AI是有点缺乏亮点，即使你设法把它完全基于比率和开关。
 * 默认情况下，无法控制敌人选择目标的方式，默认编辑器施加的条件也不足以满足大多数检查。
 * 这个插件使您能够设置条件、行动和为敌人选择的目标的优先级列表，以便在决定如何参与战斗之前完成。
 *
 * 这些条件包含所有默认编辑器的条件以及更多条件，例如确定目标的参数值、目标上是否存在状态、目标的基本弱点（或抗性）
 * 以及在决定动作之前的更多条件。此外，你可以给敌人设定一个AI等级，使他们在和你的玩家作战时更加一致，
 * 或者按照敌人对待优先权列表的方式更加随机。
 *
 * ============================================================================
 * Parameters 参数
 * ============================================================================
 *
 * Dynamic Actions
 * 动态行为
 * 
 * 默认情况下，敌人的行动是在回合开始时确定的。虽然这种方式本身有效，但启用动态动作允许敌人在敌人出现时做出决定。
 * 这促使敌人在战斗中变得更加灵活和聪明，从而给你的玩家更多的挑战。
 *
 * Element Testing
 * 元素测试
 * 
 * 如果这是禁用的，敌人会自动知道元素的弱点，所有玩家的抗性等。如果启用，敌人需要在作出决定之前使用技能测试玩家各种元
 * 素的抗性。直到敌人了解玩家的基本速度，敌人总是愿意尝试在目标玩家身上使用技能。但是，如果技能本身不拥有一个元素，
 * 则不会注册任何信息。所有元素数据在每个敌方的战斗开始时被重置。
 *
 * Default AI Level
 * 默认人工智能级别
 * 
 * 并非所有的敌人都是聪明的。事实上，其中有些是愚蠢的或随意的。将敌人的AI水平设置为低数意味着敌人更随机，而更高的AI水平
 * 敌人更一致。
 * AI水平是如何工作的：随机数将从0到99进行检查。如果敌人的AI水平高于该数字，则检查该动作以判断条件是否满足。
 * 如果AI水平低于该数字，则该条件被自动视为假，并继续到下一个动作。每次检查一个新的动作时，运行该检查。
 * 这个随机因子只适用于<AI Priority>（<AI优先级>）列表，不适用于默认操作。
 *
 * ============================================================================
 * Enemy AI Level
 * 敌人AI级别
 * ============================================================================
 *
 * 敌人的AI水平并不决定他们有多困难。相反，他们决定严格遵循AI优先级列表。AI级别为80意味着它在进入下一个AI优先级
 * 列表之前有80%的机会遵循AI优先级列表中的优先级操作，其中还有80%的机会等等。如果AI水平较低，则机会较低，使AI更
 * 随意。
 *
 * Enemy Notetag:
 *   <AI Level: x>
 *   将敌人的AI等级设置为X。X越低，敌人就越随机。X越高，敌人就越严格地遵循其记事本中找到的AI优先级列表。
 *
 * ============================================================================
 * Enemy AI Priority 敌人优先级
 * ============================================================================
 *
 * 如果一个敌人有一个AI优先权列表，那么这个敌人会从上到下（靠上给予最高优先级的行动比底部靠下的行动更重要）寻找任何
 * 满足条件的行动。如果这个条件被满足，那么这个行动将是敌人将参与的行动。
 *
 * 要为敌人设置优先权列表，必须将标签放置在与以下格式匹配的敌人的备注栏内部：
 *
 *   <AI Priority>                      <AI Priority>
 *    condition: SKILL x, target   or    condition: skill name, target
 *    condition: SKILL x, target         condition: skill name, target
 *   </AI Priority>                     </AI Priority>
 *
 * 任何数量的条件和技能都可以放在两个<AI Priority>标签之间。你可以选择使用技能ID或技能名称。但是，如果使用技能名称，请
 * 记住它不区分大小写，并且如果数据库中的任何技能具有匹配的名称，则使用技能ID较大的技能。
 *
 * ============================================================================
 * Conditions 条件
 * ============================================================================
 *
 * 以下是你可以为敌人选择合适技能的条件列表。除了决定是否使用该技能的外，条件还可选择敌人的目标。下面的列表将告诉你如何满足条件
 * 和将选择什么目标进行战斗。
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ALWAYS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这种情况总是会得到满足的。有效目标组是范围内的所有目标。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Always: Skill 10, Lowest HP%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ELEMENT X case
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * [对应引擎中的特性-属性有效度]
 * 这允许您匹配元素X的元素比率（使用数字或元素名称代替“X”）以查看是否满足动作的条件。将正常元素比率
 * （低于110%和90%以上）的“case”替换为“Neutral”(中等)，高于100%元素比率“Weakness”（虚弱），
 * 低于100%元素比率“Resistant”（有抗性），0%元素比率“Null”（无效），低于0%元素比率的“Absorb”（吸收）。
 * 有效的目标将是具有匹配元素率的目标。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Element Fire Weakness: Fireball, Lowest HP%  //对虚弱火属性的最低HP者使用技能
 *            Element Water Resistant: Water Cancel, Highest MAT  //对水属性抗性者中最高MAT属性者使用技能
 *            Element 4 Null: Earthquake, Lowest MDF  //对4号属性无效者中最低MDF者使用技能
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * EVAL eval 
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这允许您使用任何类型的代码来检查和完成一个条件。
 * 此条件会将技能范围内的所有存活者作为有效目标。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Eval user.name() === 'Bat A': Skill 10, Highest HP% //对名字匹配‘Bat A’中的最高HP者使用技能10
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * group ALIVE MEMBERS eval
 * 某一组内的生存成员
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 将“group”替换为“party”（玩家队）或“troop”（敌队）。
 * 这用于检查玩家存活成员们或敌队存活成员们的数量，看看条件是否生效
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Party Alive Members > 2: Skill 10, Lowest HP% //当玩家队存活者大于2时对最低HP的目标使用技能10
 *            Troop Alive Members <= 4: Skill 11, Highest HP% //当敌队存活者小于等于4时对HP最高者使用技能11
 *            Troop Alive Members === $gameVariables.value(3): Skill 12, Random //当敌队数量匹配变量3的值时对随机目标使用技能12
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * group DEAD MEMBERS eval
 * 某一组内的死亡成员
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 将“group”替换为“party”（玩家队）或“troop”（敌队）。
 * 这用于检查玩家死亡成员们或敌队死亡成员们的数量，看看条件是否生效
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Party Dead Members > 2: Undead, Highest ATK //当玩家队死亡数量大于2时对最高ATK的目标使用技能
 *            Troop Dead Members <= 4: Life, Highest ATK  //当敌队死亡数量小于等于4时对最高ATK的目标使用技能
 *            Troop Dead Members === $gameVariables.value(3): Skill 12, Random //当敌队死亡数量匹配比变量3的值时对随机目标使用技能12
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * stat PARAM eval
 * 属性参数
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 将'stat'替换为'atk'、'def'、'mat'、'mdf'、'agi'、'luk'、'maxhp'、'maxmp'、'hp'、'mp'、
 * 'hp%'、'mp%'、'level'，以再次在条件检查中运行它，看看动作是否通过。
 * 它检查的组将基于技能的作用域。
 * 如果技能目标是敌对者们(玩家)，那么所有被瞄准的敌人（这里指玩家被瞄准）都会检查他们是否符合条件。
 * 同样，技能为己方(敌方)来说，如果技能是为了队友（敌队）。有效的目标将是那些通过条件检查的人。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   HP% param <= 50%: Heal, Lowest HP%  //用于对HP少于50%中的HP最少者（的队友）使用（治疗）技能
 *            MP param > 90: Mana Drain, Highest MP  //对90以上MP中最高MP者（的敌人）使用（MP汲取）技能
 *            ATK param > user.atk: Power Break, Highest ATK  //对比自己攻击力高的目标中的最高攻击者使用技能
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * type PARTY LEVEL eval
 * 队伍级别类型
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 将“type”替换为“highest”、“lowest”或“average”，用来判定各自队伍等级以作为技能针对的目标。
 * 这将参考全队的level属性。
 * 如果满足此条件，所有目标都将成为有效目标。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Highest Party Level > 10: Skill 10, Lowest MP%  //如果队伍中最高等级者大于10级，则对最低MP的目标使用技能10
 *            Lowest Party Level < 12: Skill 11, Lowest HP%   //如果队伍中最低等级者小于12级，则对最低HP的目标使用技能11
 *            Average Party Level > 15: Skill 12, Highest HP% //如果队伍中平均等级大于15级，则对最高HP的目标使用技能12
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * RANDOM x%
 * 随机几率
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这将使条件基于随机x%机会。
 * 此条件允许所有可能的目标对目标有效。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Random 50%: Skill 10, Lowest HP%  //50%几率对最低HP的目标使用技能10
 *            Random 75%: Skill 11, Highest HP% //75%几率对最高HP的目标使用技能11
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STATE === state x
 * STATE === state name
 * 状态匹配作为条件
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这将检测目标作用域是否【具有】状态X（或者如果您使用了该状态名）。
 * 如果是，则将目标添加到有效目标池中。任何不受国家影响的目标都将被忽略。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   State === State 5: DeBlind, Highest ATK  //对（技能作用域中-可选目标）状态为5中的最高ATK的目标使用技能
 *            State === Knockout: Life, Random	//对状态名称匹配字符‘Knockout’的随机目标使用技能
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STATE !== state x
 * STATE !== state name
 * 状态不匹配作为条件
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这将检测目标作用域是否【不具有】状态X（或者如果您使用了该状态名）。
 * 如果是，则将目标添加到有效目标池中。任何不受国家影响的目标都将被忽略。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   State !== State 12: Haste, Random  //对可选目标中状态不为12号的随机目标使用技能
 *            State !== Courage: Cowardice, Highest ATK  //对状态不是‘Courage’的最高ATK目标使用技能
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SWITCH X case
 * 开关作为条件
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 用你想检查的开关的ID替换“X”。用“ON”或“OFF”替换“Case'”（也可以使用“true”或“false”）。
 * 如果开关匹配的情况下，满足条件，所有技能目标成为有效的目标。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Switch 5 On: Skill 10, Lowest HP% //如果5号开关是开，对最低HP的目标使用技能10
 *            Switch 6 Off: Skill 11, Highest HP%  //如果6号开关是关，对最高HP的目标使用技能11
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TURN eval
 * 回合作为条件
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这将使得基于回合计数的条件由EVAL语句实现。
 * 此条件允许所有可能的目标成为有效有效。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Turn > 3: Skill 10, Lowest hp%  //回合大于3时对最低HP者使用技能10
 *            Turn === 4: Skill 11, Highest hp%  //回合等于4时对最高HP者使用技能11
 *            Turn <= $gameVariables.value(2): Skill 12, Random	//回合小于等于2号变量的值时，对随机目标使用技能12
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * USER stat PARAM eval
 * 使用者的属性参数作为条件
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 将'stat'替换为'atk'、'def'、'mat'、'mdf'、'agi'、'luk'、'maxhp'、'maxmp'、'hp'、'mp'、
 * 'hp%'、'mp%'、'level'，以再次在条件检查中运行它，看看动作是否通过。
 * 如果用户的PARAM与条件匹配，则完成检查。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   User HP% param <= 50%: Heal, Lowest HP%  //使用者HP小于等于50%时对最低HP目标使用技能
 *            User MP param > 90: Mana Drain, Highest MP  //使用者MP值大于90时对最高MP目标使用技能
 *            User ATK param > target.atk: Power Break, Highest ATK  //对使用者ATK大于目标ATK者中最高AKT的目标使用技能
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * VARIABLE X eval
 * 变量作为条件
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 这将调用变量x的值来参与一个EVAL比较，以查看条件是否满足。
 * 如果是，所有技能目标成为有效的目标。
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Variable 3 > 10: Skill 10, Lowest HP%  //3号变量>10时对最低HP者使用技能10
 *            Variable 5 <= 100: Skill 11, Highest HP%	//5号变量<=100时对最高HP者使用技能11
 *            Variable 2 === user.atk: Skill 12	//2号变量值等于使用者ATK时使用12号技能
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * ============================================================================
 * Multiple Conditions
 * 多重条件
 * ============================================================================
 *
 * 至于版本1.11更新，战斗智能核心现在能够支持多个条件。
 * 设置多个条件相对简单，并且仍然遵循“条件X：目标”格式。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * 若要添加多个条件，只需在每个条件之间插入a +++，如以下示例：
 *
 *     Switch 1 on +++ Switch 2 on: Fire, Lowest HP%  //开关1且开关2都打开，对最低HP者使用技能
 *     Turn > 1 +++ Variable 5 <= 100 +++ Switch 3 on: Ice, Lowest HP%  //回合>1且变量5<=100且开关3打开时，对最低HP目标使用技能
 *     Random 50% +++ Highest Party Level > 50: Thunder, Highest HP%  //50%几率且队伍中最高等级>50时，对最高HP目标使用技能
 *
 * 在上面的例子中，所有的条件都必须满足，以便选择的技能被考虑使用。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * 对于具有严格目标群体的条件，目标群体最终将成为所有严格目标群体的组合。例如：
 *
 *     STATE === Blind +++ STATE === Fear: Dark, Lowest HP%
 * 
 * 在这个例子中，敌人只会在一个受“Blind”和“Fear”影响的目标上使用“Dark”技能。如果有多个目标，
 * 那么具有最低HP百分比的目标将成为敌人投射“黑暗”的目标。
 *
 *     STATE !== Blind +++ ATK param >= 150: Darkness, Highest ATK
 *
 * 在上面的例子中，敌人将使用“Darkness”技能对付任何没有Blind，并且ATK参数至少为150的目标。
 * 如果存在多个目标，那么敌人将首先向ATK最高的目标投掷“Darkness”，然后再向ATK较低的目标投掷。
 *
 * ============================================================================
 * Targeting
 * ============================================================================
 * 
 * 目标是可选的，但可以通过对条件的小改变来完成。你要做的就是在技能之后加上 a ','，以指示你想要目标的有效目标组中的哪个目标。
 * 例如：
 *
 *             Random 50%: Fire, Highest HP%
 *
 * 要满足的条件是50%的随机机会，但是如果它被满足，所选择的目标将是目标范围团队中具有最高HP百分比的成员。
 * 当这种情况发生时，“Fire”技能将被用于那个目标。
 *
 * 如果没有指定目标，则在有效目标组中选择随机目标。否则，请参考以下列表：
 *
 * ----------------------------------------------------------------------------
 *      <<nothing>>       选择有效目标组的随机成员。
 *      First             选择有效目标组的第一个成员。
 *      not me            选择除自己外的随机目标(当只剩自己一人时无效)[炎龙修改版新增标签。]
 *      User              选择使用者本身。
 *      Highest MaxHP     选择最高MaxHP为有效目标。
 *      Highest HP        选择最高HP有效目标。
 *      Highest HP%       选择最高HP百分比有效目标。  *Note1?
 *      Highest MaxMP     选择最高MaxMP有效目标。
 *      Highest MP        选择最高MP有效目标。
 *      Highest MP%       选择最高MP百分比有效目标。  *Note1
 *      Highest MaxTP     选择最高MaxTP为有效目标。
 *      Highest TP        选择最高TP有效目标。
 *      Highest TP%       选择最高TP百分比有效目标。 *Note1
 *      Highest ATK       选择最高ATK有效目标。[物攻]
 *      Highest DEF       选择最高DEF有效目标。[物防]
 *      Highest MAT       选择最高MAT有效目标。[魔攻]
 *      Highest MDF       选择最高MDF有效目标。[魔防]
 *      Highest AGI       选择最高AGI有效目标。[敏捷]
 *      Highest LUK       选择最高LUK有效目标。[幸运]
 *      Highest Level     选择最高Level有效目标。[等级] *Note2
 *      
 *      Lowest MaxHP      选择最低MaxHP为有效目标。
 *      Lowest HP         选择最低HP有效目标。
 *      Lowest HP%        选择最低HP百分比有效目标。 *Note1
 *      Lowest MaxMP      选择最低MP有效目标。
 *      Lowest MP         选择最低MP有效目标。
 *      Lowest MP%        选择最低MP百分比有效目标。 *Note1
 *      Lowest MaxTP      选择最低MaxTP为有效目标。
 *      Lowest TP         选择最低TP有效目标。
 *      Lowest TP%        选择最低TP百分比有效目标。 *Note1
 *      Lowest ATK        选择最低ATK有效目标。[物攻]
 *      Lowest DEF        选择最低DEF有效目标。[物防]
 *      Lowest MAT        选择最低MAT有效目标。[魔攻]
 *      Lowest MDF        选择最低MDF有效目标。[魔防]
 *      Lowest AGI        选择最低AGI有效目标。[敏捷]
 *      Lowest LUK        选择最低LUK有效目标。[幸运]
 *      Lowest Level      选择最低Level有效目标。[等级]
 *
 * Note1: 这是通过将当前HP与MaxHP或当前MP与MaxMP划分来计算的。
 *
 * Note2: 如果这对敌人没有合适的敌人级别的插件安装，这将返回玩家的最高等级。
 *
 * ----------------------------------------------------------------------------
 *
 * ============================================================================
 * Special Notes
 * ============================================================================
 *
 * 如果你使用YEP_Taunt.js，敌人将不会自动在默认情况下进行嘲讽。在这个问题上，目标可以通过嘲讽效应来保护，
 * 它可以有效地关闭敌人的AI性能。然而，如果你想让一些敌人考虑对手的嘲笑效果，把这个标签放在敌人的笔记本里：
 *
 *   <AI Consider Taunt>
 *
 * This will make it that when an enemy makes a decision, it will make a right
 * decision while thinking of the taunted enemies, too. You can use this for
 * smarter enemies while keep this notetag disabled for less intelligent foes.
 * 这将使得当敌人做出决定时，它会做出正确的决定，同时也想到被嘲讽的敌人。你可以用它用于更聪明的敌人，
 * 同时维持这个NoTeTAG对不那么聪明的敌对目标有缺陷。
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.13:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.12:
 * - Added 'Dynamic Turn Count' plugin parameter for those who wish to push the
 * turn count further by 1 turn in order to adjust for Dynamic Actions. Code
 * provided by Talonos.
 *
 * Version 1.11:
 * - Adding the ability to support multiple conditions. Please Read the
 * 'Multiple Conditions' section in the help file for more details.
 *
 * Version 1.10:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.09:
 * - Added 'user' to the list of valid skill targets.
 * - Added 'USER stat PARAM eval' to valid conditions.
 *
 * Version 1.08:
 * - Neutral elemental resistance is now considered to be above 90% and under
 * 110% for a better range of activation.
 * - Optimization update.
 *
 * Version 1.07:
 * - Fixed a compatibility bug that caused certain conditions to bypass taunts.
 *
 * Version 1.06:
 * - Fixed a bug that caused 'Highest TP' and 'Lowest TP' target searches to
 * crash the game.
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.04a:
 * - Fixed a bug that would cause a crash with the None scope for skills.
 * - Switched over a function to operate in another for better optimization.
 *
 * Version 1.03:
 * - Fixed a bug that returned the wrong MP% rate.
 *
 * Version 1.02:
 * - Fixed a bug that targeted the highest parameter enemy instead of lowest.
 *
 * Version 1.01:
 * - Added 'MaxTP' and 'TP' to targets.
 * - Compatibility update with Battle Engine Core v1.19+. Turn settings are now
 * based 'AI Self Turns' if the enabled.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BattleAICore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CoreAIDynamic = String(Yanfly.Parameters['Dynamic Actions']);
Yanfly.Param.CoreAIDynamic = eval(Yanfly.Param.CoreAIDynamic);
Yanfly.Param.CoreAIDynTurnCnt = String(Yanfly.Parameters['Dynamic Turn Count']);
Yanfly.Param.CoreAIDynTurnCnt = eval(Yanfly.Param.CoreAIDynTurnCnt);
Yanfly.Param.CoreAIElementTest = String(Yanfly.Parameters['Element Testing']);
Yanfly.Param.CoreAIElementTest = eval(Yanfly.Param.CoreAIElementTest);
Yanfly.Param.CoreAIDefaultLevel = Number(Yanfly.Parameters['Default AI Level']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.CoreAI.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.CoreAI.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_BattleAICore) {
    this.processCoreAINotetags1($dataEnemies);
  	this.processCoreAINotetags2($dataSkills);
    this.processCoreAINotetags3($dataStates);
    this.processCoreAINotetags4($dataSystem);
    Yanfly._loaded_YEP_BattleAICore = true;
  }
	return true;
};

DataManager.processCoreAINotetags1 = function(group) {
  var note1 = /<(?:AI PRIORITY)>/i;
  var note2 = /<\/(?:AI PRIORITY)>/i;
  var note3 = /<(?:AI CONSIDER TAUNT|ai considers taunts)>/i;
  var note4 = /<(?:AI LEVEL):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.aiPattern = [];
    var aiPatternFlag = false;
    obj.aiConsiderTaunt = false;
    obj.aiLevel = Yanfly.Param.CoreAIDefaultLevel * 0.01;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				aiPatternFlag = true;
			} else if (line.match(note2)) {
        aiPatternFlag = false;
      } else if (aiPatternFlag) {
        obj.aiPattern.push(line);
      } else if (line.match(note3)) {
        obj.aiConsiderTaunt = true;
      } else if (line.match(note4)) {
        obj.aiLevel = parseFloat(RegExp.$1 * 0.01);
      }
		}
	}
};

DataManager.processCoreAINotetags2 = function(group) {
	if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
    if (obj.name.length <= 0) continue;
		Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
	}
};

DataManager.processCoreAINotetags3 = function(group) {
	if (Yanfly.StateIdRef) return;
  Yanfly.StateIdRef = {};
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
    if (obj.name.length <= 0) continue;
		Yanfly.StateIdRef[obj.name.toUpperCase()] = n;
	}
};

DataManager.processCoreAINotetags4 = function(group) {
	if (Yanfly.ElementIdRef) return;
  Yanfly.ElementIdRef = {};
  for (var i = 0; i < group.elements.length; ++i) {
    var obj = group.elements[i].toUpperCase();
    if (typeof obj === 'string' && obj !== '') Yanfly.ElementIdRef[obj] = i;
  }
};

//=============================================================================
// BattleManager
//=============================================================================

if (Yanfly.Param.CoreAIDynamic) {
  Yanfly.CoreAI.BattleManager_getNextSubject =
      BattleManager.getNextSubject;
  BattleManager.getNextSubject = function() {
    //this.updateAIPatterns();
    var battler = Yanfly.CoreAI.BattleManager_getNextSubject.call(this);
    if (battler && battler.isEnemy()) battler.setAIPattern();
    return battler;
  };
};

BattleManager.updateAIPatterns = function() {
    $gameTroop.updateAIPatterns()
};

Yanfly.CoreAI.BattleManager_isInputting = BattleManager.isInputting;
BattleManager.isInputting = function() {
  if ($gameTemp._tauntMode) return false;
  return Yanfly.CoreAI.BattleManager_isInputting.call(this);
};

//=============================================================================
// Game_Battler
//=============================================================================

Object.defineProperty(Game_Battler.prototype, 'level', {
    get: function() {
        return this.getLevel();
    },
    configurable: true
});

if (!Game_Battler.prototype.getLevel) {
  Game_Battler.prototype.getLevel = function() {
      return $gameTroop.highestLevel();
  };
};

Game_Battler.prototype.setAIPattern = function() {
    Game_Battler.prototype.makeActions.call(this);
};

Game_Battler.prototype.aiConsiderTaunt = function() {
  return false;
};

Game_Battler.prototype.hasSkill = function(skillId) {
    return this.skills().contains($dataSkills[skillId]);
};

Game_Battler.prototype.hasState = function(stateId) {
    return this.states().contains($dataStates[stateId]);
};

Game_Battler.prototype.notState = function(stateId) {
    return !this.isStateAffected(stateId);
};

Game_Battler.prototype.aiLevel = function() {
    return Yanfly.Param.CoreAIDefaultLevel * 0.01;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.skills = function() {
  var skills = []
  for (var i = 0; i < this.enemy().actions.length; ++i) {
    var skill = $dataSkills[this.enemy().actions[i].skillId]
    if (skill) skills.push(skill);
  }
  skills = AIManager.getPatternSkills(skills, this.enemy().aiPattern);
  return skills;
};

Yanfly.CoreAI.Game_Enemy_makeActions = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    if (this.enemy().aiPattern.length > 0) {
      this.setAIPattern();
      this.setActionState('waiting');
    } else {
      Yanfly.CoreAI.Game_Enemy_makeActions.call(this);
    }
};

Game_Enemy.prototype.aiConsiderTaunt = function() {
  if (!Imported.YEP_Taunt) return false;
  return this.enemy().aiConsiderTaunt;
};

Game_Enemy.prototype.setAIPattern = function() {
    Game_Battler.prototype.setAIPattern.call(this);
    if (this.numActions() <= 0) return;
    AIManager.setBattler(this);
    for (var i = 0; i < this.enemy().aiPattern.length; ++i) {
      if (Math.random() > this.aiLevel()) continue;
      var line = this.enemy().aiPattern[i];
      if (AIManager.isDecidedActionAI(line)) return;
    }
    Yanfly.CoreAI.Game_Enemy_makeActions.call(this);
};

Game_Enemy.prototype.aiLevel = function() {
    return this.enemy().aiLevel;
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.highestLevel = function() {
    return $gameParty.highestLevel();
};

Game_Unit.prototype.lowestLevel = function() {
    return $gameParty.lowestLevel();
};

Game_Unit.prototype.averageLevel = function() {
    return $gameParty.averageLevel();
};

Yanfly.CoreAI.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
    Yanfly.CoreAI.Game_Unit_onBattleStart.call(this);
};

Game_Unit.prototype.aiElementRateKnown = function(target, elementId) {
    return true;
};

Game_Unit.prototype.aiRegisterElementRate = function(target, elementId) {
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.lowestLevel = function() {
    return Math.min.apply(null, this.members().map(function(actor) {
        return actor.level;
    }));
};

Game_Party.prototype.averageLevel = function() {
    var level = 0;
    for (var i = 0; i < this.members().length; ++i) {
      var member = this.members()[i];
      if (member) level += member.level;
    }
    level /= this.members().length;
    return level;
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.updateAIPatterns = function() {
    for (var i = 0; i < this.aliveMembers().length; ++i) {
      var member = this.aliveMembers()[i];
      if (member) member.setAIPattern();
    }
};

Yanfly.CoreAI.Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
    Yanfly.CoreAI.Game_Troop_setup.call(this, troopId);
    this._aiKnownElementRates = {};
};

Game_Troop.prototype.aiElementRateKnown = function(target, elementId) {
    if (target.isEnemy()) return true;
    if (!Yanfly.Param.CoreAIElementTest) return true;
    var index = target.index();
    if (this._aiKnownElementRates[index] === undefined) {
      this._aiKnownElementRates[index] = [];
    }
    return this._aiKnownElementRates[index].contains(elementId);
};

Game_Troop.prototype.aiRegisterElementRate = function(target, elementId) {
    if (!Yanfly.Param.CoreAIElementTest) return;
    var index = target.index();
    if (this._aiKnownElementRates[index] === undefined) {
      this._aiKnownElementRates[index] = [];
    }
    if (!this._aiKnownElementRates[index].contains(elementId)) {
      this._aiKnownElementRates[index].push(elementId);
    }
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.CoreAI.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    Yanfly.CoreAI.Game_Action_apply.call(this, target);
    this.aiRegisterElementRate(target);
};

Game_Action.prototype.aiRegisterElementRate = function(target) {
    if (this.item().damage.elementId < 0) return;
    var elementId = this.item().damage.elementId;
    if (this.subject().isActor()) {
      $gameParty.aiRegisterElementRate(target, elementId);
    } else {
      $gameTroop.aiRegisterElementRate(target, elementId);
    }
};

//=============================================================================
// AIManager
//=============================================================================

function AIManager() {
    throw new Error('This is a static class');
}

AIManager.setBattler = function(battler) {
    this._battler = battler;
    this._action = battler.action(0);
};

AIManager.battler = function() {
    return this._battler;
};

AIManager.action = function() {
    return this._action;
};

AIManager.isDecidedActionAI = function(line) {
    if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+),[ ](.*)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = parseInt(RegExp.$2);
      this._aiTarget = String(RegExp.$3);
    } else if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = parseInt(RegExp.$2);
      this._aiTarget = 'RANDOM';
    } else if (line.match(/[ ]*(.*):[ ](.*),[ ](.*)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      this._aiTarget = String(RegExp.$3);
    } else if (line.match(/[ ]*(.*):[ ](.*)/i)) {
      this._origCondition =  String(RegExp.$1);
      var condition = String(RegExp.$1);
      this._aiSkillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      this._aiTarget = 'RANDOM';
    } else {
      return false;
    }
    if (!this.initialCheck(this._aiSkillId)) return false;
    if (!this.meetCustomAIConditions(this._aiSkillId)) return false;
    this.action().setSkill(this._aiSkillId);
    if (!this.passAllAIConditions(condition)) return false;
    return true;
};

AIManager.getPatternSkills = function(array, patterns) {
    for (var i = 0; i < patterns.length; ++i) {
      var line = patterns[i];
      if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+),[ ](.*)/i)) {
        var skillId = parseInt(RegExp.$2);
      } else if (line.match(/[ ]*(.*):[ ](?:SKILL)[ ](\d+)/i)) {
        var skillId = parseInt(RegExp.$2);
      } else if (line.match(/[ ]*(.*):[ ](.*),[ ](.*)/i)) {
        var skillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      } else if (line.match(/[ ]*(.*):[ ](.*)/i)) {
        var skillId = Yanfly.SkillIdRef[String(RegExp.$2).toUpperCase()];
      } else {
        continue;
      }
      if ($dataSkills[skillId]) array.push($dataSkills[skillId]);
    }
    return array;
};

AIManager.initialCheck = function(skillId) {
  if (!$dataSkills[skillId]) return false;
  if (!this.hasSkill(skillId)) return false;
  return this.battler().meetsSkillConditions($dataSkills[skillId]);
};

AIManager.hasSkill = function(skillId) {
    return this.battler().hasSkill(skillId);
};

AIManager.meetCustomAIConditions = function(skillId) {
  return true;
};

AIManager.getActionGroup = function() {
  var action = this.action();
  if (Imported.YEP_X_SelectionControl) action.setSelectionFilter(true);
  if (!action) return [];
  if (action.isForUser()) {
    var group = [this.battler()];
  } else if (action.isForDeadFriend()) {
    var group = action.friendsUnit().deadMembers();
  } else if (action.isForFriend()) {
    var group = action.friendsUnit().aliveMembers();
  } else if (action.isForOpponent()) {
    if (this.battler().aiConsiderTaunt()) {
      $gameTemp._tauntMode = true;
      $gameTemp._tauntAction = action;
      var group = action.opponentsUnit().tauntMembers();
      $gameTemp._tauntMode = false;
      $gameTemp._tauntAction = undefined;
    } else {
      var group = action.opponentsUnit().aliveMembers();
    }
  } else {
    var group = [];
  }
  if (this._setActionGroup !== undefined) {
    group = Yanfly.Util.getCommonElements(this._setActionGroup, group);
  }
  this._setActionGroup = group;
  return this._setActionGroup;
};

AIManager.setActionGroup = function(group) {
  this._setActionGroup = group;
};

AIManager.setProperTarget = function(group) {
    this.setActionGroup(group);
    var action = this.action();
    var randomTarget = group[Math.floor(Math.random() * group.length)];
    if (!randomTarget) return action.setTarget(0);
    if (group.length <= 0) return action.setTarget(randomTarget.index());
    var line = this._aiTarget.toUpperCase();
    if (line.match(/FIRST/i)) {
      action.setTarget(0);
    } else if (line.match(/NOT ME/i)) {
    	this.setNotUserTarget(group,action);
      } 
    else if (line.match(/USER/i)) {
      var index = group.indexOf();
      action.setTarget(action.subject().index());
    } else if (line.match(/HIGHEST[ ](.*)/i)) {
      var param = this.getParamId(String(RegExp.$1));
      if (param < 0) return action.setTarget(randomTarget.index());
      if (param === 8) return this.setHighestHpFlatTarget(group);
      if (param === 9) return this.setHighestMpFlatTarget(group);
      if (param === 10) return this.setHighestHpRateTarget(group);
      if (param === 11) return this.setHighestMpRateTarget(group);
      if (param === 12) return this.setHighestLevelTarget(group);
      if (param === 13) return this.setHighestMaxTpTarget(group);
      if (param === 14) return this.setHighestTpTarget(group);
      if (param > 15) return action.setTarget(randomTarget.index());
      this.setHighestParamTarget(group, param);
    } else if (line.match(/LOWEST[ ](.*)/i)) {
      var param = this.getParamId(String(RegExp.$1));
      if (param < 0) return action.setTarget(randomTarget.index());
      if (param === 8) return this.setLowestHpFlatTarget(group);
      if (param === 9) return this.setLowestMpFlatTarget(group);
      if (param === 10) return this.setLowestHpRateTarget(group);
      if (param === 11) return this.setLowestMpRateTarget(group);
      if (param === 12) return this.setLowestLevelTarget(group);
      if (param === 13) return this.setLowestMaxTpTarget(group);
      if (param === 14) return this.setLowestTpTarget(group);
      if (param > 15) return action.setTarget(randomTarget.index());
      this.setLowestParamTarget(group, param);
    } else {
      this.setRandomTarget(group);
    }
};

AIManager.getParamId = function(string) {
    string = string.toUpperCase()
    switch (string) {
    case 'MAXHP':
    case 'MAX HP':
      return 0;
      break;
    case 'MAXMP':
    case 'MAX MP':
    case 'MAXSP':
    case 'MAX SP':
      return 1;
      break;
    case 'ATK':
    case 'STR':
      return 2;
      break;
    case 'DEF':
      return 3;
      break;
    case 'MAT':
    case 'INT':
    case 'SPI':
      return 4;
      break;
    case 'MDF':
    case 'RES':
      return 5;
      break;
    case 'AGI':
    case 'SPD':
      return 6;
      break;
    case 'LUK':
      return 7;
      break;
    case 'HP':
      return 8;
      break;
    case 'MP':
    case 'SP':
      return 9;
      break;
    case 'HP%':
      return 10;
      break;
    case 'MP%':
    case 'SP%':
      return 11;
      break;
    case 'LEVEL':
    case 'LV':
    case 'LVL':
      return 12;
      break;
    case 'MAXTP':
      return 13;
      break;
    case 'TP':
      return 14;
      break;
    }
    return -1;
};

AIManager.setHighestHpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp / target.mhp > maintarget.hp / maintarget.mhp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestHpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp > maintarget.hp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestHpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp / target.mhp < maintarget.hp / maintarget.mhp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestHpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.hp < maintarget.hp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestMpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp / target.mmp > maintarget.mp / maintarget.mmp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestMpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp > maintarget.mp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestMpRateTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp / target.mmp < maintarget.mp / maintarget.mmp) {
        maintarget = target;
      }
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestMpFlatTarget = function(group) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.mp < maintarget.mp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestParamTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.param(id) > maintarget.param(id)) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestParamTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.param(id) < maintarget.param(id)) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestLevelTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level > maintarget.level) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestLevelTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level < maintarget.level) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestMaxTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level > maintarget.maxTp()) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestMaxTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level < maintarget.maxTp()) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setHighestTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level > maintarget.tp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setLowestTpTarget = function(group, id) {
    var maintarget = group[Math.floor(Math.random() * group.length)];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (target.level < maintarget.tp) maintarget = target;
    }
    this.action().setTarget(maintarget.index())
};

AIManager.setRandomTarget = function(group) {
    var target = group[Math.floor(Math.random() * group.length)];
    this.action().setTarget(target.index())
};

//yanLong+
AIManager.setNotUserTarget = function(group,action) {
	var len=group.length;
	var user=action.subject();
	for(var i=0;i<len;i++){
		if(group[i]==user){
			group.splice(i,1);
		}
	}
	if(group.length<1){
		group.push(user);
	}
    var target = group[Math.floor(Math.random() * group.length)];
    this.action().setTarget(target.index())
};
//yanLong-

AIManager.convertIntegerPercent = function(n) {
    n *= 0.01
    return String(n);
};

AIManager.elementRateMatch = function(target, elementId, type) {
    var rate = target.elementRate(elementId).toFixed(2);
    if (this.battler().isActor()) {
      if (!$gameParty.aiElementRateKnown(target, elementId)) return true;
    } else {
      if (!$gameTroop.aiElementRateKnown(target, elementId)) return true;
    }
    if (['NEUTRAL', 'NORMAL'].contains(type)) {
      return rate >= 0.90 && rate <= 1.10;
    } else if (['WEAK', 'WEAKNESS', 'VULNERABLE'].contains(type)) {
      return rate > 1.00;
    } else if (['RESIST', 'RESISTANT', 'STRONG'].contains(type)) {
      return rate < 1.00;
    } else if (['NULL', 'CANCEL', 'NO EFFECT'].contains(type)) {
      return rate === 0.00;
    } else if (['ABSORB', 'HEAL'].contains(type)) {
      return rate < 0.00;
    }
    return false;
};

AIManager.passAllAIConditions = function(line) {
  this._setActionGroup = undefined;
  var conditions = line.split('+++');
  if (conditions.length <= 0) return false;
  while (conditions.length > 0) {
    var condition = conditions.shift().trim();
    if (!this.passAIConditions(condition)) return false;
  }
  return true;
};

AIManager.passAIConditions = function(line) {
    // ALWAYS
    if (line.match(/ALWAYS/i)) {
      return this.conditionAlways();
    }
    // ELEMENT
    if (line.match(/ELEMENT[ ](.*)/i)) {
      return this.conditionElement();
    }
    // EVAL
    if (line.match(/EVAL[ ](.*)/i)) {
      var condition = String(RegExp.$1);
      return this.conditionEval(condition);
    }
    // GROUP ALIVE MEMBERS EVAL
    if (line.match(/(.*)[ ]ALIVE[ ]MEMBERS[ ](.*)/i)) {
      var members = String(RegExp.$1);
      var condition = String(RegExp.$2);
      return this.conditionGroupAlive(members, condition);
    }
    // GROUP DEAD MEMBERS EVAL
    if (line.match(/(.*)[ ]DEAD[ ]MEMBERS[ ](.*)/i)) {
      var members = String(RegExp.$1);
      var condition = String(RegExp.$2);
      return this.conditionGroupDead(members, condition);
    }
    // USER PARAM EVAL
    if (line.match(/USER[ ](.*)[ ]PARAM[ ](.*)/i)) {
      var paramId = this.getParamId(String(RegExp.$1));
      var condition = String(RegExp.$2);
      return this.conditionUserParamEval(paramId, condition);
    }
    // PARAM EVAL
    if (line.match(/(.*)[ ]PARAM[ ](.*)/i)) {
      var paramId = this.getParamId(String(RegExp.$1));
      var condition = String(RegExp.$2);
      return this.conditionParamEval(paramId, condition);
    }
    // PARTY LEVEL
    if (line.match(/(.*)[ ]PARTY[ ]LEVEL[ ](.*)/i)) {
      var type = String(RegExp.$1);
      var condition = String(RegExp.$2);
      return this.conditionPartyLevel(type, condition);
    }
    // RANDOM x%
    if (line.match(/RANDOM[ ](\d+)([%％])/i)) {
      return this.conditionRandom(parseFloat(RegExp.$1 * 0.01));
    }
    // STATE === X
    if (line.match(/STATE[ ]===[ ](.*)/i)) {
      return this.conditionStateHas(String(RegExp.$1));
    }
    // STATE !== X
    if (line.match(/STATE[ ]!==[ ](.*)/i)) {
      return this.conditionStateNot(String(RegExp.$1));
    }
    // SWITCH X case
    if (line.match(/SWITCH[ ](\d+)[ ](.*)/i)) {
      var switchId = parseInt(RegExp.$1);
      var value = String(RegExp.$2)
      return this.conditionSwitch(switchId, value);
    }
    // TURN EVAL
    if (line.match(/TURN[ ](.*)/i)) {
      return this.conditionTurnCount(String(RegExp.$1));
    }
    // VARIABLE X eval
    if (line.match(/VARIABLE[ ](\d+)[ ](.*)/i)) {
      var variableId = parseInt(RegExp.$1);
      var condition = String(RegExp.$2)
      return this.conditionVariable(variableId, condition);
    }
    return false;
};

AIManager.conditionAlways = function() {
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionElement = function() {
    var line = this._origCondition;
    if (line.match(/ELEMENT[ ](\d+)[ ](.*)/i)) {
      var elementId = parseInt(RegExp.$1);
      var type = String(RegExp.$2).toUpperCase();
    } else if (line.match(/ELEMENT[ ](.*)[ ](.*)/i)) {
      var elementId = Yanfly.ElementIdRef[String(RegExp.$1).toUpperCase()];
      var type = String(RegExp.$2).toUpperCase();
    } else {
      return false;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (this.elementRateMatch(target, elementId, type)) {
        validTargets.push(target);
      }
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionEval = function(condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. EVAL ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionGroupAlive = function(members, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    members = members.toUpperCase();
    if (['TROOP', 'TROOPS', 'ENEMY', 'ENEMIES'].contains(members)) {
      members = $gameTroop.aliveMembers();
    } else if (['PARTY', 'PLAYER'].contains(members)) {
      members = $gameParty.aliveMembers();
    } else {
      return false;
    }
    if (members.length <= 0) return false;
    condition = 'members.length ' + condition;
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. GROUP ALIVE ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionGroupDead = function(members, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    members = members.toUpperCase();
    if (['TROOP', 'TROOPS', 'ENEMY', 'ENEMIES'].contains(members)) {
      members = $gameTroop.deadMembers();
    } else if (['PARTY', 'PLAYER'].contains(members)) {
      members = $gameParty.deadMembers();
    } else {
      return false;
    }
    if (members.length <= 0) return false;
    condition = 'members.length ' + condition;
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. GROUP DEAD ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionPartyLevel = function(type, condition) {
    if (type.match(/HIGHEST/i)) {
      condition = '.highestLevel() ' + condition;
    } else if (type.match(/LOWEST/i)) {
      condition = '.lowestLevel() ' + condition;
    } else if (type.match(/AVERAGE/i)) {
      condition = '.averageLevel() ' + condition;
    } else {
      return false;
    }
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (action.isForFriend()) {
      condition = 'action.friendsUnit()' + condition;
    } else if (action.isForOpponent()) {
      condition = 'action.opponentsUnit()' + condition;
    }
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. PARTY LEVEL ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionUserParamEval = function(paramId, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    condition = condition.replace(/(\d+)([%％])/g, function() {
      return this.convertIntegerPercent(parseInt(arguments[1]));
    }.bind(this));
    if (paramId < 0) return false;
    if (paramId >= 0 && paramId <= 7) {
      condition = 'user.param(paramId) ' + condition;
    } else if (paramId === 8) {
      condition = 'user.hp ' + condition;
    } else if (paramId === 9) {
      condition = 'user.mp ' + condition;
    } else if (paramId === 10) {
      condition = 'user.hp / user.mhp ' + condition;
    } else if (paramId === 11) {
      condition = 'user.mp / user.mmp ' + condition;
    } else if (paramId === 12) {
      condition = 'user.level ' + condition;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      try {
        if (eval(condition)) validTargets.push(target);
      } catch (e) {
        Yanfly.Util.displayError(e, condition, 'A.I. USER PARAM ERROR')
      }
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionParamEval = function(paramId, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    condition = condition.replace(/(\d+)([%％])/g, function() {
      return this.convertIntegerPercent(parseInt(arguments[1]));
    }.bind(this));
    if (paramId < 0) return false;
    if (paramId >= 0 && paramId <= 7) {
      condition = 'target.param(paramId) ' + condition;
    } else if (paramId === 8) {
      condition = 'target.hp ' + condition;
    } else if (paramId === 9) {
      condition = 'target.mp ' + condition;
    } else if (paramId === 10) {
      condition = 'target.hp / target.mhp ' + condition;
    } else if (paramId === 11) {
      condition = 'target.mp / target.mmp ' + condition;
    } else if (paramId === 12) {
      condition = 'target.level ' + condition;
    }
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      try {
        if (eval(condition)) validTargets.push(target);
      } catch (e) {
        Yanfly.Util.displayError(e, condition, 'A.I. PARAM ERROR')
      }
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionRandom = function(rate) {
    if (Math.random() >= rate) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

AIManager.conditionStateHas = function(condition) {
    if (condition.match(/STATE[ ](\d+)/i)) {
      var stateId = parseInt(RegExp.$1);
    } else {
      var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
      if (!stateId) return false;
    }
    if (!$dataStates[stateId]) return false;
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target.hasState(stateId)) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionStateNot = function(condition) {
    if (condition.match(/STATE[ ](\d+)/i)) {
      var stateId = parseInt(RegExp.$1);
    } else {
      var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
      if (!stateId) return false;
    }
    if (!$dataStates[stateId]) return false;
    var group = this.getActionGroup();
    var validTargets = [];
    for (var i = 0; i < group.length; ++i) {
      var target = group[i];
      if (!target) continue;
      if (target.notState(stateId)) validTargets.push(target);
    }
    if (validTargets.length <= 0) return false;
    this.setProperTarget(validTargets);
    return true;
};

AIManager.conditionSwitch = function(switchId, value) {
    if (['ON', 'TRUE', 'YES'].contains(value.toUpperCase())) {
      value = true;
    } else if (['OFF', 'FALSE', 'NO'].contains(value.toUpperCase())) {
      value = false;
    } else {
      return false;
    }
    if ($gameSwitches.value(switchId) !== value) return false;
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

if (!Yanfly.Param.CoreAIDynTurnCnt) {

AIManager.conditionTurnCount = function(condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (Imported.YEP_BattleEngineCore) {
      condition = 'user.turnCount() ' + condition;
    } else {
      condition = '$gameTroop.turnCount() ' + condition;
    }
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. TURN COUNT ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

} else {
// Alternative provided by Talonos

AIManager.conditionTurnCount = function(condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (Imported.YEP_BattleEngineCore) {
      if (BattleManager._phase === "input" && BattleManager.isTurnBased()) {
        condition = '(user.turnCount() + 1) ' + condition;
      } else {
        condition = 'user.turnCount() ' + condition;
      }
    } else {
      if (BattleManager._phase === "input") {
        condition = '($gameTroop.turnCount() + 1) ' + condition;
      } else {
        condition = '$gameTroop.turnCount() ' + condition;
      }
    }
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. TURN COUNT ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

} // Yanfly.Param.CoreAIDynamic


AIManager.conditionVariable = function(variableId, condition) {
    var action = this.action();
    var item = action.item();
    var user = this.battler();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    condition = '$gameVariables.value(' + variableId + ') ' + condition;
    try {
      if (!eval(condition)) return false;
    } catch (e) {
      Yanfly.Util.displayError(e, condition, 'A.I. VARIABLE ERROR');
      return false;
    }
    var group = this.getActionGroup();
    this.setProperTarget(group);
    return true;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

Yanfly.Util.getCommonElements = function(array1, array2) {
  var elements = [];
  var length = array1.length;
  for (var i = 0; i < length; ++i) {
    var element = array1[i];
    if (array2.contains(element)) elements.push(element);
  }
  return elements;
};

//=============================================================================
// End of File
//=============================================================================
