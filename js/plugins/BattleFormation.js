//
//  阵型 ver1.04
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['BattleFormation'] = 1.04;
/*:
 * @plugindesc ver1.04/增加阵型系统。
 * @author Yana（译者：沧海孤云）
 *
 * @param
 * @param 【基本设定】
 *
 * @param BasicFormationText
 * @desc 基本阵型の名称です。
 * @default 基本阵型
 *
 * @param BasicFormationHelp
 * @desc 基本阵型に表示するヘルプです。
 * @default 最基本阵型。特点是没特点。
 *
 * @param
 * @param 【菜单设定】
 *
 * @param AddMenuBattleFormation
 * @desc メニューに阵型の項目を追加するかの设定です。
 * @default true
 *
 * @param MenuBattleFormationTitle
 * @desc メニューに表示する阵型の名称です。
 * @default 阵型
 *
 * @param BattleFormationInfoX
 * @desc 阵型を表示するウィンドウのX座標です。evalで評価されます。
 * cw:commandW sw:statusW gw:goldW h:height w:width
 * @default 0
 *
 * @param BattleFormationInfoY
 * @desc 阵型を表示するウィンドウのY座標です。evalで評価されます。
 * cw:commandW sw:statusW gw:goldW h:height w:width
 * @default Graphics.boxHeight - (gw.height + h)
 *
 * @param
 * @param 【场景设定】
 *
 * @param FormationListWidth
 * @desc 阵型场景时列表部分长度。
 * @default 320
 *
 * @param LevelSymbol
 * @desc レベルを示すシンボルです。
 * 2文字以上でx:1のようなテキスト、数値でゲージ表示になります。
 * @default ★
 *
 * @param LevelColor
 * @desc レベルを示すシンボルの色です。
 * Window.pngの右下のカラーのインデックスで指定してください。
 * @default 6
 *
 * @param ExpGaugeColor1
 * @desc 经验值ゲージの色1です。rgba(r,g,b,a)で指定してください。
 * r,g,bは0～255の数値、aは0～1.0の数値です。
 * @default rgba(128,128,255,1.0)
 *
 * @param ExpGaugeColor2
 * @desc 经验值ゲージの色2です。rgba(r,g,b,a)で指定してください。
 * r,g,bは0～255の数値、aは0～1.0の数値です。
 * @default rgba(0,0,255,1.0)
 *
 * @param ShowParamWindow
 * @desc 阵型の詳細を表示するためのウィンドウを使用するかの设定です。
 * @default true
 *
 * @param ParamColor
 * @desc 詳細ウィンドウに表示する特徴の色设定です。
 * 順番に基本色、システム色、上昇色、下降色です。
 * @default 6,4,24,2
 *
 * @param AddSkillText
 * @desc 詳細ウィンドウに表示するクラスで習得する技能の項目名です。
 * @default 添加技能:
 *
 * @param ParamText1
 * @desc 詳細ウィンドウに表示する特徴の表示名です。
 * 1は有效度と状态免疫です。
 * @default  有效度,弱化有效度,状态免疫
 *
 * @param ParamText2
 * @desc 詳細ウィンドウに表示する特徴の表示名です。
 * 2は追加能力値です。
 * @default 命中率,回避率,暴击率,暴击回避,魔法回避,魔法反射率,反击率,再生
 *
 * @param ParamText3
 * @desc 詳細ウィンドウに表示する特徴の表示名です。
 * 3は特殊能力値です。
 * @default 被攻击率,防御效果,恢复效果,药理知识,消耗率,TP补充率,受物理伤害,受魔法伤害,受地形伤害,经验值获得率
 *
 * @param ParamText4
 * @desc 詳細ウィンドウに表示する特徴の表示名です。
 * 4は攻击タブです。
 * @default 攻击属性赋予:,攻击时状态赋予:,攻击速度,攻击回数
 *
 * @param ParamText5
 * @desc 詳細ウィンドウに表示する特徴の表示名です。
 * 5は技能タブです。
 * @default 添加技能类型:,封印技能类型:,添加技能:,封印技能:
 *
 * @param ParamText6
 * @desc 詳細ウィンドウに表示する特徴の表示名です。
 * 6は装备タブです。
 * @default 装备武器类型:,装备护甲类型:,固定装备:,封印装备:,二刀流
 *
 * @param ParamText7
 * @desc 詳細ウィンドウに表示する特徴の表示名です。
 * 7はその他タブです。
 * @default 增加行动次数,自动战斗,防御,掩护,保留TP,消失效果,遇敌减半,不遇敌,取消偷袭,先制率提高,双倍金钱,双倍掉落物品
 *
 * @param DefeatText
 * @desc 消失效果で使用するサブテキストです。基本使用しません。
 * @default 正常,Boss,瞬间消失,不消失
 *
 * @param ParamWindowWidth
 * @desc 阵型の詳細を表示するためのウィンドウの长度です。
 * @default 220
 *
 * @param BasicWinExp
 * @desc 勝利时に加算される阵型经验值の基本値です。
 * @default 1
 *
 * @param MasterText
 * @desc 阵型をマスターした时にNext欄に表示されるテキストです。
 * @default 精通!
 *
 * @param LevelUpText
 * @desc 阵型のレベルが上がった时に表示されるテキストです。
 * @default _name熟练度上升！
 *
 * @param MasterFormText
 * @desc 阵型のレベルが最高値に達した时に表示されるテキストです。
 * @default _name精通！
 *
 * @param ActiveHelpText
 * @desc ステータスがアクティブなときに表示される操作ヘルプです。
 * @default 決定:变换阵型　←,取消:回到列表

 *
 * @param DeactiveHelpText
 * @desc ステータスが非アクティブなときに表示される操作ヘルプです。
 * @default 決定:变换阵型　→:阵型的详细确认,变换阵型
 *
 * @param
 * @param 【位置设定】
 *
 * @param HomePosition1
 * @desc メンバーが1人の时のアクターの位置ポジションです。
 * x,yで記述してください。
 * @default 700,267
 *
 * @param HomePosition2
 * @desc メンバーが2人の时のアクターの位置ポジションです。
 * x,y x,yで記述してください。
 * @default 640,242 700,292
 *
 * @param HomePosition3
 * @desc メンバーが3人の时のアクターの位置ポジションです。
 * x,y x,y x,yで記述してください。
 * @default 640,217 670,267 700,317
 *
 * @param HomePosition4
 * @desc メンバーが4人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,yで記述してください。
 * @default 640,192 660,242 680,292 700,342
 *
 * @param HomePosition5
 * @desc メンバーが5人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,yで記述してください。
 * @default 620,167 640,207 660,247 680,287 700,327 
 *
 * @param HomePosition6
 * @desc メンバーが6人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 620,167 640,207 660,247 680,287 700,327 720,367
 *
 * @param HomePosition7
 * @desc メンバーが7人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 610,177 630,207 650,237 670,267 690,297 710,327 730,357
 *
 * @param HomePosition8
 * @desc メンバーが8人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 600,162 620,192 640,222 660,252 680,282 700,312 720,342 740,372
 *
 * @param HomePosition9
 * @desc メンバーが9人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 590,167 610,192 630,217 650,242 670,267 690,292 710,317 730,342 750,367
 *
 * @param HomePosition10
 * @desc メンバーが10人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375
 *
 * @param HomePosition11
 * @desc メンバーが11人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399
 *
 * @param HomePosition12
 * @desc メンバーが12人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399
 *
 * @param HomePosition13
 * @desc メンバーが13人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399
 *
 * @param HomePosition14
 * @desc メンバーが14人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399
 *
 * @param HomePosition15
 * @desc メンバーが15人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399
 *
 * @param HomePosition16
 * @desc メンバーが16人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399 780,399
 *
 * @param HomePosition17
 * @desc メンバーが17人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399 780,399 780,399
 *
 * @param HomePosition18
 * @desc メンバーが18人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399
 *
 * @param HomePosition19
 * @desc メンバーが19人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399
 *
 * @param HomePosition20
 * @desc メンバーが20人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399
 *
 * @param HomePosition21
 * @desc メンバーが21人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399
 *
 * @param HomePosition22
 * @desc メンバーが22人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399
 *
 * @param HomePosition23
 * @desc メンバーが23人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399
 *
 * @param HomePosition24
 * @desc メンバーが24人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 580,159 600,183 620,207 640,231 660,255 680,279 700,303 720,327 740,351 760,375 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399 780,399
 * @param HomePosition25
 * @desc メンバーが25人の时のアクターの位置ポジションです。
 * x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,y x,yで記述してください。
 * @default 857,260 951,260 1045,260 1139,260 1233,260 857,354 951,354 1045,354 1139,354 1233,354 857,448 951,448 1045,448 1139,448 1233,448 857,547 951,547 1045,547 1139,547 1233,547 857,636 951,636 1045,636 1139,636 1233,636
 * @help ------------------------------------------------------
 * プラグインコマンド
 * ------------------------------------------------------
 * このプラグインには、以下のプラグインコマンドがあります。
 *
 * 阵型 场景呼び出し
 * BattleFormation callScene
 * ・阵型场景を呼び出します。
 *
 * 阵型 设定 アイテムID
 * BattleFormation Set アイテムID
 * ・阵型をアイテムIDに设定します。
 *
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * ―――基本的なこと―――
 * 阵型とは、アクターの位置を特定の位置に设定して、場所によってアクターの能力を強化する機能です。
 * この際一人でも战斗不能者がいると、阵型崩壊となり阵型效果は无效になります。
 * いずれかの战斗メンバーの特徴オブジェクトのメモに
 * <阵型无效>
 * <InvalidFormation>
 * のいずれかが記述されている場合、阵型效果は无效となります。
 * また、上記いずれかの要因で阵型が状态免疫された状態で战斗が終了すると、阵型经验值は入手できません。
 *
 * ―――阵型を作る―――
 * ・阵型の基本设定
 * アイテムのメモ欄で设定します。
 * 设定したアイテムを入手することで、その阵型が使用可能になります。
 *
 * 以下の设定がある場合、そのアイテムは阵型アイテムとして扱われます。
 * アイテムのメモに
 * <阵型设定>
 * 一人目のX座標,Y座標,使用するクラスID[,配置条件]
 * 二人目のX座標,Y座標,使用するクラスID[,配置条件]
 * 三人目のX座標,Y座標,使用するクラスID[,配置条件]
 * ・・・
 * </阵型设定>
 * と記述します。
 *
 * 一人目までなら一人阵型、二人目までなら二人、三人目までなら三人阵型・・・となります。
 * クラスIDはこの位置に配置されたアクターの能力や特徴にそのクラスで设定したものが追加される设定です。
 * 配置条件の記述は任意です。この部分がevalで判定され、全員がtrueの場合は阵型が有效になります。
 * 省略した場合は、常にtrueとして扱われます。
 *
 * また、アイテム名はそのまま阵型の名前として、アイテムの説明は阵型の説明として使用されます。
 *
 * ・阵型经验值の设定
 * 同じように、アイテムのメモに
 * <阵型经验值设定:Lv2までの必要値,Lv3までの必要値,Lv4までの必要値…>
 * <FormationExpSetting:Lv2までの必要値,Lv3までの必要値,Lv4までの必要値…>
 * と記述することで、阵型にレベルを设定することができます。
 *
 * レベルの最大値は设定した個数+1となります。
 * 阵型の经验值は战斗に勝利することで蓄積されていきます。
 * 阵型のレベルは、以下で解説するクラスの设定でのレベルによるステータスの補正や、習得技能で使用されます。
 *
 * ―――阵型の中身を设定する―――
 * 阵型の各ポジションによる補正はクラスを使用して行います。
 * クラスに设定した特徴やステータス値、更に習得する技能がそのポジションにいるアクターに追加されます。
 * この際、このクラスのレベルの値は、阵型レベルが使用されます。
 *
 * このクラスに设定した名前は、阵型场景で各ポジションの特徴などを確認するウィンドウに表示されます。
 *
 * 以下のいずれかを記述をすることで、クラスの詳細を確認するウィンドウにテキストを追加することができます。
 *
 * <阵型效果テキスト追加:前:表示したいテキスト>
 * <阵型效果テキスト追加:後:表示したいテキスト>
 * <AddFormationEffectText:F:表示したいテキスト>
 * <AddFormationEffectText:L:表示したいテキスト>
 *
 * この際、前やFを指定した場合はほかの效果よりも前に、
 * 後やLを指定した場合は他の效果より後にテキストが追加されます。
 * また、
 * <阵型效果テキスト追加:前:Lv2:表示したいテキスト>
 * のように、前後の指定の後にLv○:を追加することで、そのレベル以上で追加されるテキストとなります。
 *
 * それに加えて、阵型で设定されたクラスの習得技能のメモに
 * <阵型非表示>
 * <HideFormation>
 * のいずれかの記述があると、その技能は詳細ウィンドウに表示されなくなります。
 *
 * ―――阵型经验值について―――
 * 阵型经验值は基本的には勝利することで1ポイント追加されます。
 * このポイントは、エネミーのメモに
 * <阵型经验值:x>
 * <BattleFormationExp:x>
 * のいずれかを記述することで、そのエネミーを倒した際に追加でxポイントの阵型经验值を加算します。
 *
 * また、アクターやクラス等特徴を持ったオブジェクトのメモ欄に
 * <阵型经验值倍率:x>
 * <BattleFormationExpRate:x>
 * のいずれかを記述すると、最終的に得られる阵型经验值がx倍になります。
 * これらは全てのアクターで個別に反映され、重複して乗算されていくので、设定には注意してください。
 * (アクター5人がそれぞれ2倍の设定を持っていると、最終的に32倍になる)
 *
 * ―――列表の表示について―――
 * 阵型列表で表示される经验值の表記は、アイテムのメモを使ってカスタマイズできます。
 * アイテムのメモに
 * <レベルシンボル:x>
 * <LevelSymbol:x>
 * のいずれかを記述すると、その阵型の经验值のシンボルをxに指定します。
 * この时、xに2文字以上を指定すると、x:1のような数値表示に、
 * xに数値を指定すると、それを目盛りの幅として、||||||||のようなゲージ表示になります。
 *
 * 同じようにアイテムのメモに
 * <シンボルカラー:x>
 * <SymbolColor:x>
 * と記述すると、そのシンボルやゲージ、テキストの色をxに设定します。
 * xはWindow.pngの右下に並んでいるカラーのインデックスで指定してください。
 *
 * 更に、
 * <经验值ゲージカラー1:rgba(r,g,b,a)>
 * <ExpGaugeColor1:rgba(r,g,b,a)>
 * のいずれかを記述することで、经验值カラーの左側をrgbaのカラーに、
 *
 * <经验值ゲージカラー2:rgba(r,g,b,a)>
 * <ExpGaugeColor2:rgba(r,g,b,a)>
 * のいずれかを記述することで、经验值カラーの右側をrgbaのカラーに変更します。
 * r,g,bはそれぞれ、赤、緑、青で0～255の数値を、aは透明度で0～1.0の数値を指定してください。
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.04:
 * 入手インフォメーションの機能追加に合わせて、一部の処理を修正。
 * ver1.03:
 * 詳細ウィンドウに表示する項目名を设定できるように変更。
 * 经验值のレイアウトに関する设定を追加。
 * ver1.02:
 * 阵型で设定したクラスのパラメータが正常に反映されていないバグを修正。
 * メニュー画面の現在の阵型を表示するウィンドウの座標を设定する項目を追加。
 * ver1.01:
 * 阵型の種類が増えた时、ウィンドウが画面外にはみ出すバグを修正。
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('BattleFormation');
    var basicFormationText = parameters['BasicFormationText'] || '基本阵型';
    var basicFormationHelp = parameters['BasicFormationHelp'] || '';
    var addMenuBattleFormation = parameters['AddMenuBattleFormation'] === 'true';
    var battleFormationInfoX = parameters['BattleFormationInfoX'];
    var battleFormationInfoY = parameters['BattleFormationInfoY'];
    var formationListWidth = Number(parameters['FormationListWidth']) || 320;
    var showParamWindow = parameters['ShowParamWindow'] === 'true';
    var paramWindowWidth = Number(parameters['ParamWindowWidth']) || 220;
    var menuBattleFormationTitle = parameters['MenuBattleFormationTitle'];
    var basicWinExp = parseInt(parameters['BasicWinExp'],10);
    var masterText = parameters['MasterText'];
    var levelUpText = parameters['LevelUpText'];
    var masterFormText = parameters['MasterFormText'];
    var activeHelpText = parameters['ActiveHelpText'];
    var deactiveHelpText = parameters['DeactiveHelpText'];
    var addSkillText = parameters['AddSkillText'];
    var levelSymbol = parameters['LevelSymbol'];
    var levelColor = Number(parameters['LevelColor']);
    var defeatText = parameters['DefeatText'].split(',');
    var paramColor = parameters['ParamColor'].split(',');
    var expGaugeColor1 = parameters['ExpGaugeColor1'] || 'rgba(128,128,255,1.0)';
    var expGaugeColor2 = parameters['ExpGaugeColor2'] || 'rgba(0,0,255,1.0)';
    var basicFormations = [];
    var paramVocab = [];
    
    for (var i=1;i<=25;i++) {
        var key = 'HomePosition' + i;
        basicFormations[i-1] = parameters[key].split(' ');
    }

    for (var i=1;i<=7;i++) {
        var key = 'ParamText' + i;
        paramVocab[i-1] = parameters[key].split(',');
    }

    ////////////////////////////////////////////////////////////////////////////////////
    
    DataManager.formationStatus = function(item) {
        if (!item) return this.basicFormation();
        if (item._formationStatus) return item._formationStatus;
        item._formationStatus = [];
        var texts = item.note.split('\n');
        for (var i=0,max=texts.length;i<max;i++) {
            var text = texts[i];
            if (text.match(/^<阵型设定>/)) {
                for (var j=i;j<max;j++) {
                    var stext = texts[j];
                    if (stext.match(/<\/阵型设定>/)) {
                        i = j;
                        break;
                    }
                    if (stext.match(/(\d+),(\d+),(\d+),?(.+)?/)) {
                        var obj = {
                            x:parseInt(RegExp.$1,10),
                            y:parseInt(RegExp.$2,10),
                            classId:parseInt(RegExp.$3,10),
                            cond:RegExp.$4
                        };
                        item._formationStatus.push(obj);
                    }
                }
            }
        }
        return item._formationStatus;
    };

    DataManager.bfExps = function(item) {
        if (!item) return [];
        var ary = [];
        if (item && item.meta['阵型经验值设定'] || item.meta['FormationExpSetting']) {
            if (item.meta['阵型经验值设定']) {
                ary = item.meta['阵型经验值设定'].split(',').map(function (n) {
                    return parseInt(n, 10)
                });
            } else if (item.meta['FormationExpSetting']) {
                ary = item.meta['FormationExpSetting'].split(',').map(function(n){
                    return parseInt(n,10)
                });
            }
        }
        return ary;
    };

    DataManager.basicFormation = function() {
        var size = $gameParty.battleMembers().length;
        var homes = basicFormations[size-1];
        var ary = [];
        for (var i=0;i<size;i++) {
            var home = homes[i].split(',').map(function(n){ return parseInt(n,10) });
            ary.push({x:home[0],y:home[1],classId:0});
        }
        return ary;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __BManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        __BManager_startBattle.call(this);
    };

    var __BManager_startInput = BattleManager.startInput;
    BattleManager.startInput = function() {
        __BManager_startInput.call(this);
        $gameParty.checkBattleFormation();
    };

    var __BManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        var lv = $gameParty.currentBfLevel();
        $gameParty.increaseFormationExp();
        this._upBfLevel = $gameParty.currentBfLevel() - lv;
        __BManager_processVictory.call(this);
    };

    var __BManager_displayRewards = BattleManager.displayRewards;
    BattleManager.displayRewards = function() {
        __BManager_displayRewards.call(this);
        if (this._upBfLevel) this.displayBfLevel();
    };

    BattleManager.displayBfLevel = function() {
        var item = $gameParty.battleFormation();
        var text = '';
        if ($gameParty.isMaxBfLevel(item.id)) {
            text = masterFormText.replace(/_name/,item.name);
        } else {
            text = levelUpText.replace(/_name/,item.name);
        }
        $gameMessage.add('\\.' + text);
    };


    ////////////////////////////////////////////////////////////////////////////////////

    var __GInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        __GInterpreter_pluginCommand.call(this, command, args);
        if (command === '阵型' || command === 'BattleFormation') {
            switch (args[0]) {
                case '场景呼び出し':
                case 'callScene':
                    this.callSceneBattleFormation();
                    break;
                case '设定':
                case 'Set':
                    var id = parseInt(args[1],10);
                    var item = $dataItems[id];
                    $gameParty.setBattleFormation(item);
            }
        }
    };

    Game_Interpreter.prototype.callSceneBattleFormation = function() {
        SceneManager.push(Scene_BattleFormation);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GActor_paramPlus = Game_Actor.prototype.paramPlus;
    Game_Actor.prototype.paramPlus = function(paramId) {
        var value = __GActor_paramPlus.call(this, paramId);
        if ($gameParty.formationEnable() && this._bfClass) {
            var cl = $dataClasses[this._bfClass];
            if (cl.params[paramId][$gameParty.currentBfLevel()] > 1) {
                value += cl.params[paramId][$gameParty.currentBfLevel()];
            }
        }
        return value;
    };

    var __GActor_traitObjects = Game_Actor.prototype.traitObjects;
    Game_Actor.prototype.traitObjects = function() {
        var result = __GActor_traitObjects.call(this);
        if ($gameParty.formationEnable() && this._bfClass) {
            var cl = $dataClasses[this._bfClass];
            result.push(cl);
        }
        return result;
    };

    var __GActor_skills = Game_Actor.prototype.skills;
    Game_Actor.prototype.skills = function() {
        var result = __GActor_skills.call(this);
        return result.concat(this.bfClassSkills());
    };

    Game_Actor.prototype.bfClassSkills = function() {
        var result = [];
        if ($gameParty.formationEnable() && this._bfClass) {
            var cl = $dataClasses[this._bfClass];
            for (var i=0,max=cl.learnings.length;i<max;i++) {
                var l = cl.learnings[i];
                if ($gameParty.currentBfLevel() >= l.level) {
                    result.push($dataSkills[l.skillId]);
                }
            }
        }
        return result;
    };

    Game_Actor.prototype.checkFormationEnable = function(cond, id) {
        if (this.isDead()) return false;
        if (this.traitObjects().some(function(t){
            return (t.meta['阵型无效'] || t.meta['InvalidFormation']) })) return false;
        var pf = $gameParty.battleFormation();
        if (pf && id === pf.id) cond = this._bfCond;
        if (!cond) return true;
        var a = $gameActors.actor(this.actorId());
        var v = $gameVariables._data;
        return eval(cond);
    };

    if (Imported['yPassiveSkill']) {
        var __GActor_enableSkills = Game_Actor.prototype.enableSkills;
        Game_Actor.prototype.enableSkills = function() {
            var skills = __GActor_enableSkills.call(this);
            return skills.concat(this.bfClassSkills());
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.refreshBattleFormation = function() {
        var formation = this.battleFormation();
        this.setBattleFormation(formation);
        this.checkBattleFormation();
    };

    Game_Party.prototype.battleFormation = function() {
        if (!this._battleFormation) this._battleFormation = [];
        var id = this._battleFormation[this.battleMembers().length];
        return $dataItems[id];
    };

    Game_Party.prototype.setBattleFormation = function(formation) {
        if (!this._battleFormation) this._battleFormation = [];
        var members = this.battleMembers();
        var size = members.length;
        var id = 0;
        var data = DataManager.formationStatus(formation);
        if (formation) id = formation.id;
        if (id) size = data.length;
        this._battleFormation[size] = id;
        if (size === members.length) {
            for (var i = 0; i < size; i++) {
                var member = members[i];
                var d = data[i];
                member._bfHome = [d.x, d.y];
                member._bfClass = d.classId;
                member._bfCond = d.cond;
            }
        }
    };

    Game_Party.prototype.checkBattleFormation = function() {
        this._formationEnable = this.isEnableBattleFormation();
    };

    Game_Party.prototype.isEnableBattleFormation = function(id) {
        var members = this.battleMembers();
        var status = DataManager.formationStatus($dataItems[id]);
        for (var i=0,max=members.length;i<max;i++) {
            var member = members[i];
            if (!member.checkFormationEnable(status[i].cond, id)) {
                return false;
            }
        }
        return true;
    };

    Game_Party.prototype.formationEnable = function() {
        return this.inBattle() && this._formationEnable;
    };

    Game_Party.prototype.bfLevel = function(id) {
        if (!this._bfExps) return 1;
        if (!this._bfExps[id]) return 1;
        return this.levelForBfExp(id);
    };

    Game_Party.prototype.currentBfLevel = function() {
        var item = this.battleFormation();
        if (!item) return 1;
        return this.bfLevel(item.id);
    };

    Game_Party.prototype.levelForBfExp = function(id) {
        var item = $dataItems[id];
        var exps = DataManager.bfExps(item);
        var exp = this._bfExps[item.id];
        var value = 0;
        for (var i=0,max=exps.length;i<max;i++) {
            value += exps[i];
            if (exp < value) return i+1;
        }
        return i+1;
    };

    Game_Party.prototype.bfExpForLevel = function(id, level) {
        var item = $dataItems[id];
        var exps = DataManager.bfExps(item);
        var value = 0;
        var max = Math.min(level-1, exps.length);
        for (var i=0;i<max;i++) value += exps[i];
        return value;
    };

    Game_Party.prototype.increaseFormationExp = function() {
        if (!this.battleFormation()) return;
        var id = this.battleFormation().id;
        var count = this.winExp();
        var bfExp = this.bfExp(id);
        this._bfExps[id] = bfExp + count;
    };

    Game_Party.prototype.bfExp = function(id) {
        if (!this._bfExps) this._bfExps = {};
        if (!this._bfExps[id]) this._bfExps[id] = 0;
        return this._bfExps[id];
    };

    Game_Party.prototype.isMaxBfLevel = function(id) {
        var item = $dataItems[id];
        var exps = DataManager.bfExps(item);
        var maxLevel = exps.length + 1;
        return this.bfLevel(id) >= maxLevel;
    };

    Game_Party.prototype.winExp = function() {
        if (!this.isEnableBattleFormation(this.battleFormation().id)) return 0;
        var value = basicWinExp;
        $gameTroop.members().forEach(function(e){
            if (e.enemy().meta['阵型经验值']) value += parseInt(e.enemy().meta['阵型经验值'],10);
            if (e.enemy().meta['BattleFormationExp']) value += parseInt(e.enemy().meta['BattleFormationExp'],10);
        }.bind(this));
        $gameParty.battleMembers().forEach(function(m){
            m.traitObjects().forEach(function(t){
                if (t.meta['阵型经验值倍率'] !== undefined) value *= Number(t.meta['阵型经验值倍率']);
                if (t.meta['BattleFormationExpRate'] !== undefined) value *= Number(t.meta['BattleFormationExpRate']);
            }.bind(this));
        }.bind(this));
        return value;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////

    var __SActor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        __SActor_setActorHome.call(this, index);
        if (!this._actor._bfHome) $gameParty.setBattleFormation(null);
        var home = this._actor._bfHome;
        this.setHome(home[0], home[1] + 80);
        if (this._actor._home) {
            this._actor._home = this._actor._bfHome;
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_BFFormationList() {
        this.initialize.apply(this, arguments);
    }

    Window_BFFormationList.prototype = Object.create(Window_Command.prototype);
    Window_BFFormationList.prototype.constructor = Window_BFFormationList;

    Window_BFFormationList.prototype.initialize = function(y) {
        if ($gameParty.battleFormation() === undefined) $gameParty.setBattleFormation(null);
        //this._oy = y;
        Window_Command.prototype.initialize.call(this, 0, y);
        this.openness = 0;
        //var yy = (Graphics.boxHeight - this._oy) / 2 - (this.windowHeight() / 2) + this._oy;
        //this.y = yy;
        this.selectExt($gameParty.battleFormation());
    };

    Window_BFFormationList.prototype.windowWidth = function() {
        return formationListWidth;
    };
    
    Window_BFFormationList.prototype.makeCommandList = function() {
        this.addCommand(basicFormationText,'set',true);
        var items = $gameParty.items();
        for (var i=0,max=items.length;i<max;i++) {
            var item = items[i];
            if (item.meta['阵型设定']) {
                var data = DataManager.formationStatus(item);
                if (data.length === $gameParty.battleMembers().length) {
                    this.addCommand(item.name,'set',true,item);
                }
            }
        }
    };

    Window_BFFormationList.prototype.lineHeight = function() {
        return 48;
    };

    Window_BFFormationList.prototype.offsetHeight = function() {
        return 0;
    };

    Window_BFFormationList.prototype.maxPageItems = function() {
        var hw = this._helpWindow ? this._helpWindow.height : 108;
        var max = ((Graphics.boxHeight - hw) - this.standardPadding() * 2) / this.lineHeight();
        return Math.floor(max);
    };

    Window_BFFormationList.prototype.refresh = function() {
        this.clearCommandList();
        this.makeCommandList();
        var l = Math.min(this._list.length,this.maxPageRows());
        var mh = this.lineHeight() * this.maxPageItems() + this.standardPadding() * 2;
        this.height = Math.min(l * this.lineHeight() + this.standardPadding() * 2 + this.offsetHeight(),mh);
        this._upArrowSprite.y += this.offsetHeight();
        this.createContents();
        Window_Selectable.prototype.refresh.call(this);
    };

    Window_BFFormationList.prototype.drawItem = function(index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        var item = this._list[index].ext;
        var exps = DataManager.bfExps(item);
        var enable = !(item && !$gameParty.isEnableBattleFormation(item.id));
        this.contents.fontSize = 24;
        this.resetTextColor();
        if (exps.length > 0) rect.y -= 8;
        if (this._list[index].ext === $gameParty.battleFormation()) this.changeTextColor('rgba(128,255,128,1.0)');
        this.changePaintOpacity(enable);
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
        if (!enable) {
            this.changeTextColor(this.textColor(2));
            this.drawText('×', rect.x, rect.y, rect.width, 'right');
        }
        if (exps.length > 0) {
            this.resetTextColor();
            this.contents.fontSize = 16;
            var id = item.id;
            var exp = $gameParty.bfExp(id);
            var lv = $gameParty.bfLevel(id);
            var next = $gameParty.bfExpForLevel(id, lv + 1);
            var crt = $gameParty.bfExpForLevel(id, lv);
            var max = exps.length + 1;
            var rate = next - crt > 0 ? Math.min((exp - crt) / (next - crt),1.0) : 1.0;
            this.drawFormationLevel(rect,lv,max,item);
            var gc1 = item.meta['经验值ゲージカラー1'] || item.meta['ExpGaugeColor1'] || expGaugeColor1;
            var gc2 = item.meta['经验值ゲージカラー2'] || item.meta['ExpGaugeColor2'] || expGaugeColor2;
            this.drawGauge(rect.x + 172, rect.y + 8, rect.width - 168, rate, gc1,gc2);
            if ($gameParty.isMaxBfLevel(id)) {
                this.drawText(masterText,rect.x + 172, rect.y + 22, rect.width - 168, 'center');
            } else {
                this.changeTextColor('rgba(180,180,255,1.0)');
                this.drawText('升级',rect.x + 172, rect.y + 22, rect.width - 168);
                this.resetTextColor();
                this.drawText((exp-crt)+'/'+(next-crt),rect.x + 172, rect.y + 22, rect.width - 168, 'right');
            }
        }
    };

    Window_BFFormationList.prototype.drawFormationLevel = function(rect, lv, max, item) {
        var symbol = item.meta['LevelSymbol'] || item.meta['レベルシンボル'] || levelSymbol;
        var color = Number(item.meta['SymbolColor'] || item.meta['シンボルカラー'] || levelColor);
        color = this.textColor(color);
        if (isNaN(symbol)) {
            if (symbol.length > 1) {
                this.changeTextColor(color);
                this.drawText(symbol + ':' + lv, rect.x, rect.y + 22, rect.width - 120);
            } else {
                if (symbol) {
                    this.changeTextColor(color);
                    var text = '';
                    for (var i = 0; i < lv; i++) text += symbol;
                    this.drawText(text, rect.x, rect.y + 22, rect.width - 120);
                    var tw = this.textWidth(text);
                    this.changeTextColor('rgba(128,128,128,0.5)');
                    text = '';
                    for (var i = 0; i < max - lv; i++) text += symbol;
                    this.drawText(text, rect.x + tw, rect.y + 22, rect.width - 120);
                }
            }
        } else {
            var w = Number(symbol);
            for (var i = 0; i < lv; i++) this.contents.fillRect(rect.x + (w + 1) * i, rect.y + 38, w, 16, color);
            for (var i = lv; i < max; i++) this.contents.fillRect(rect.x + (w + 1) * i, rect.y + 38, w, 16, 'rgba(0,0,0,0.5)');
        }
        this.resetTextColor();
    };

    Window_BFFormationList.prototype.formation = function() {
        return DataManager.formationStatus(this.currentExt());
    };

    Window_BFFormationList.prototype.updateHelp = function() {
        var item = this.currentExt();
        if (item) {
            this.setHelpWindowItem(item);
        } else {
            this._helpWindow.setText(basicFormationHelp);
        }
    };


    Window_BFFormationList.prototype.cursorRight = function(wrap) {
        if (this.currentExt()) {
            SoundManager.playOk();
            this.callHandler('right');
        } else {
            SoundManager.playBuzzer();
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////


    function Window_BFStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_BFStatus.prototype = Object.create(Window_Selectable.prototype);
    Window_BFStatus.prototype.constructor = Window_BFStatus;

    Window_BFStatus.prototype.initialize = function(x,y) {
        this._frameCount = 0;
        this._lockIndex = -1;
        var w = Graphics.boxWidth - x;
        var h = Graphics.boxHeight - y + 4;
        Window_Selectable.prototype.initialize.call(this, x, y, w, h);
        this._actorSprites = [];
        var members = $gameParty.battleMembers();
        for (var i=0,max=members.length;i<max;i++) {
            var actor = members[i];
            var bitmap = ImageManager.loadSvActor(actor._battlerName);
            var sprite = new Sprite(bitmap);
            sprite.setFrame(0,0,64,64);
            sprite._actor = actor;
            sprite.ox = 0;
            sprite.oy = 0;
            this.addChild(sprite);
            this._actorSprites.push(sprite);
        }
        this.opacity = 0;
        //this.openness = 0;
    };

    Window_BFStatus.prototype.standardFontSize = function() {
        return 20;
    };

    Window_BFStatus.prototype.standardPadding = function() {
        return 8;
    };

    Window_BFStatus.prototype.maxItems = function() {
        return $gameParty.battleMembers().length;
    };

    Window_BFStatus.prototype.itemRect = function(index) {
        var fr = this._commandWindow.formation()[index];
        var xx = fr.x - 420;
        var yy = fr.y - 48;
        return { x:xx, y:yy, width:64, height:64 };
    };

    Window_BFStatus.prototype.refresh = function() {
        Window_Selectable.prototype.refresh.call(this);
        var text = this.active ? activeHelpText : deactiveHelpText;
        this.resetTextColor();
        this.drawTextEx(text, 0, this.contentsHeight() - 28, this.contentsWidth(),'right');
    };

    Window_BFStatus.prototype.drawItem  = function(index) {
        if (this._commandWindow) {
            this.resetTextColor();
            var rect = this.itemRect(index);
            var item = this._commandWindow.currentExt();
            if (index === this._lockIndex) {
                var color = 'rgba(180,180,180,0.5)';
                this.contents.fillRect(rect.x,rect.y,rect.width,rect.height,color);
            }
            if (this.isFixed(index)) {
                var color = 'rgba(255,128,128,0.5)';
                this.contents.fillRect(rect.x,rect.y,rect.width,rect.height,color);
            }
            var actor = this._actorSprites[index]._actor;
            var status = DataManager.formationStatus(item);
            if (item && !actor.checkFormationEnable(status[index].cond)){
                this.changeTextColor(this.textColor(2));
                this.drawText('×',rect.x + 64, rect.y + 32);
                this._actorSprites[index].ox = 6;
                this._actorSprites[index].oy = 2;
            } else {
                this._actorSprites[index].ox = 0;
                this._actorSprites[index].oy = 0;
            }
            this._actorSprites[index].x = rect.x + 8;
            this._actorSprites[index].y = rect.y + 8;
            this.drawText(index+1,rect.x + 64, rect.y);
        }
    };

    Window_BFStatus.prototype.setCommandWindow = function(window) {
        this._commandWindow = window;
        this.refresh();
    };

    Window_BFStatus.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (this._frameCount % 12 === 0) this.updateSprite();
        this._frameCount++;
    };

    Window_BFStatus.prototype.updateSprite = function() {
        for (var i=0,max=this._actorSprites.length;i<max;i++) {
            var sprite = this._actorSprites[i];
            var frame = Math.floor(this._frameCount / 12) % 3;
            var sw = sprite.bitmap.width / 9;
            var sh = sprite.bitmap.height / 6;
            var ox = sprite.ox;
            var oy = sprite.oy;
            if (sprite._actor.isDead()) { ox = 6; oy = 5; }
            sprite.setFrame(sw * frame + ox * sw, oy * sh, sw, sh);
        }
    };

    Window_BFStatus.prototype.isLock = function() {
        return this._lockIndex >= 0;
    };

    Window_BFStatus.prototype.setLock = function() {
        this._lockIndex = this._index;
        this.refresh();
    };

    Window_BFStatus.prototype.clearLock = function() {
        this._lockIndex = -1;
        this.refresh();
    };

    Window_BFStatus.prototype.changeActorFormation = function() {
        if (!this.isLock()) return;
        $gameParty.swapOrder(this._index, this._lockIndex);
        var ary = [];
        var members = $gameParty.battleMembers();
        for (var i=0,max=members.length;i<max;i++) {
            for (var j=0,jmax=this._actorSprites.length;j<jmax;j++) {
                if (this._actorSprites[j]._actor === members[i]) {
                    ary.push(this._actorSprites[j]);
                    break;
                }
            }
        }
        this._actorSprites = ary;
    };

    Window_BFStatus.prototype.cursorLeft = function(wrap) {
        SoundManager.playCancel();
        this.callHandler('cancel');
    };

    Window_BFStatus.prototype.isCurrentItemEnabled = function() {
        return !this.isFixed(this._index);
    };

    Window_BFStatus.prototype.isFixed = function(index) {
        if (Imported['SceneFormation']) {
            var actor = $gameParty.battleMembers()[index];
            if (actor._fixed === undefined) actor._fixed = actor.initFixed();
            if (actor._fixed) return true;
        }
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_BFParameter() {
        this.initialize.apply(this, arguments);
    }

    Window_BFParameter.prototype = Object.create(Window_Base.prototype);
    Window_BFParameter.prototype.constructor = Window_BFParameter;

    Window_BFParameter.prototype.initialize = function() {
        Window_Selectable.prototype.initialize.call(this, 0,0,144,50);
        this.openness = 0;
    };

    Window_BFParameter.prototype.standardPadding = function() {
        return 6;
    };

    Window_BFParameter.prototype.standardFontSize = function() {
        return 16;
    };

    Window_BFParameter.prototype.setStatusWindow = function(window) {
        this._statusWindow = window;
    };

    Window_BFParameter.prototype.setCommandWindow = function(window) {
        this._commandWindow = window;
    };

    Window_BFParameter.prototype.lineHeight = function() {
        return 24;
    };

    Window_BFParameter.prototype.refresh = function() {
        if (showParamWindow && this._commandWindow && this._statusWindow) {
            var item = this._commandWindow.currentExt();
            var status = DataManager.formationStatus(item);
            var index = this._statusWindow._index;
            var c = $dataClasses[status[index].classId];
            var color = paramColor;
            var id = item.id;
            var ary = [];
            var ary2 = [];
            var texts = c.note.split(',');
            var level = $gameParty.bfLevel(id);
            for (var i=0,max=texts.length;i<max;i++) {
                var text = texts[i];
                if (text.match(/<(?:阵型效果テキスト追加|AddFormationEffectText):([前後FL]):?(?:Lv(\d+))?:(.+)>/)) {
                    if (!RegExp.$2 || Number(RegExp.$2) <= level) {
                        if (['前', 'F'].contains(RegExp.$1)) {
                            ary.push(RegExp.$3);
                        } else {
                            ary2.push(RegExp.$3);
                        }
                    }
                }
            }
            for (var i=0,max=c.learnings.length;i<max;i++) {
                var l = c.learnings[i];
                var s = $dataSkills[l.skillId];
                if (s && l.level <= level && !(l.note.includes('<阵型非表示>') || l.note.includes('<HideFormation>'))) {
                    var text = '\\C['+color[1]+']' + addSkillText + '\\C['+color[0]+']' + s.name;
                    ary.push(text);
                }

            }
            for (var i=0;i<8;i++) {
                var value = c.params[i][$gameParty.bfLevel(id)];
                if (value > 1) {
                    ary.push([i,value]);
                }
            }
            for (var i=0,max=c.traits.length;i<max;i++) {
                var trait = c.traits[i];
                if (!(trait.code === 23 && trait.dataId === 10) && !(trait.code === 55 && trait.dataId === 0)) {
                    ary.push(trait);
                }
            }
            ary = ary.concat(ary2);
            var size = 18;
            this.height = (ary.length * (size + 2)) + this.lineHeight() + this.standardPadding() * 2 + 8;
            this.width = Math.max(this.textWidth(c.name) + 18, paramWindowWidth);
            if (ary.length > 0) this.height += 4;
            this.createContents();
            this.contents.fontSize = 20;
            this.drawText(c.name,0,1,this.contentsWidth(),'center');
            if (ary.length > 0) this.contents.fillRect(4,25,this.contentsWidth()-8,2,'rgba(255,255,255,0.5)');
            this.contents.fontSize = size;
            var n = 0;
            for (var i=0,max=ary.length;i<max;i++) {
                if (typeof ary[i] === 'string') {
                    this.drawTextEx(ary[i], 4, (size+2) * n + 30);
                    n++;
                } else if (ary[i][1]) {
                    var text = '\\C['+color[1]+']' + TextManager.param(ary[i][0]) + '\\C['+color[2]+']+' + ary[i][1];
                    this.drawTextEx(text, 4, (size+2) * n + 30);
                    n++;
                } else {
                    var trait = ary[i];
                    if (this.drawTraits(trait,4, (size+2) * n + 30)) n++;
                }
            }
            this.height = (n * (size + 2)) + this.lineHeight() + this.standardPadding() * 2 + 8;
        }
    };

    Window_BFParameter.prototype.drawTraits = function(trait, x, y) {
        var vocab = paramVocab;
        var color = paramColor;
        var text = '';
        var dataId = trait.dataId;
        var value = trait.value;
        var sys = '\\C['+color[1]+']';
        var cl = '\\C['+color[0]+']';
        var ud = value > 1.0 ? '\\C['+color[2]+']' : '\\C['+color[3]+']';
        var sym = value > 0 ? '+' : '';
        switch (trait.code) {
            case 11:
                if (vocab[0][0]) {
                    var ele = $dataSystem.elements[dataId];
                    ud = value < 1.0 ? '\\C['+color[2]+']' : '\\C['+color[3]+']';
                    text = cl + ele + sys + vocab[0][0] + ud + 'x' + Math.floor(value * 100) + '%';
                }
                break;
            case 12:
                if (vocab[0][1]) {
                    var param = TextManager.param(dataId);
                    ud = value < 1.0 ? '\\C['+color[2]+']' : '\\C['+color[3]+']';
                    text = cl + param + sys + vocab[0][1] + ud + 'x' + Math.floor(value * 100) + '%';
                }
                break;
            case 13:
                if (vocab[0][0]) {
                    var state = $dataStates[dataId].name;
                    ud = value < 1.0 ? '\\C['+color[2]+']' : '\\C['+color[3]+']';
                    text = cl + state + sys + vocab[0][0] + ud + 'x' + Math.floor(value * 100) + '%';
                }
                break;
            case 14:
                if (vocab[0][2]) {
                    var state = $dataStates[dataId].name;
                    text = cl + state + sys + vocab[0][2];
                }
                break;
            case 21:
                var param = TextManager.param(dataId);
                text = sys + param + ud + 'x' + Math.floor(value * 100) + '%';
                break;
            case 22:
                var xparam = vocab[1][dataId];
                if (xparam) {
                    //if (dataId === 0 && xparam) xparam = TextManager.param(8);
                    //if (dataId === 1 && xparam) xparam = TextManager.param(9);
                    if (dataId === 7 && xparam) xparam = TextManager.hpA + xparam;
                    if (dataId === 8 && xparam) xparam = TextManager.mpA + vocab[1][7];
                    if (dataId === 9 && xparam) xparam = TextManager.tpA + vocab[1][7];
                    ud = value > 0 ? '\\C['+color[2]+']' : '\\C['+color[3]+']';
                    text = sys + xparam + ud + sym + Math.floor(value * 100) + '%';
                }
                break;
            case 23:
                var sparam = vocab[2][dataId];
                if (sparam) {
                    if (dataId === 0) ud = cl;
                    if (dataId === 4) { sparam = TextManager.mpA + sparam; ud = value < 1.0 ? '\\C['+color[2]+']' : '\\C['+color[3]+']'; }
                    if (dataId === 5) TextManager.tpA + sparam;
                    if (dataId === 6 || dataId === 7 || dataId === 8) ud = value < 1.0 ? '\\C['+color[2]+']' : '\\C['+color[3]+']';
                    text = sys + sparam + ud + 'x' + Math.floor(value * 100) + '%';
                }
                break;
            case 31:
                if (vocab[3][0]) {
                    var ele = $dataSystem.elements[dataId];
                    text = sys + vocab[3][0] + cl + ele;
                }
                break;
            case 32:
                if (vocab[3][1]) {
                    var state = $dataStates[dataId].name;
                    text = sys + vocab[3][1] + cl + state;
                }
                break;
            case 33:
                if (vocab[3][2]) {
                    text = sys + vocab[3][2] + ud + sym + value;
                }
                break;
            case 34:
                if (vocab[3][3]) {
                    text = sys + vocab[3][3] + cl + '+' + value + '回';
                }
                break;
            case 41:
            case 42:
                var stype = $dataSystem.skillTypes[dataId];
                var v = trait.code === 41 ? vocab[4][0] : vocab[4][1];
                if (v) text = sys + v + cl + stype;
                break;
            case 43:
            case 44:
                var skill = $dataSkills[dataId];
                var v = trait.code === 43 ? vocab[4][2] : vocab[4][3];
                if (v) text = sys + v + cl + skill.name;
                break;
            case 51:
            case 52:
                var type = trait.code === 51 ? $dataSystem.weaponTypes[dataId] : $dataSystem.armorTypes[dataId];
                var v = trait.code === 51 ? vocab[5][0] : vocab[5][1];
                if (v) text = sys + v + cl + type;
                break;
            case 53:
            case 54:
                var etype = $dataSystem.equipTypes[dataId];
                var v = trait.code === 53 ? vocab[5][2] : vocab[5][3];
                if (v) text = sys + v + cl + etype;
                break;
            case 55:
                if (vocab[5][4]) text = sys + vocab[5][4];
                break;
            case 61:
                if (vocab[6][0]) {
                    ud = value > 0 ? '\\C['+color[2]+']' : '\\C['+color[3]+']';
                    text = sys + vocab[6][0] + ud + sym + (value * 100) + '%';
                }
                break;
            case 62:
                if (vocab[6][1+dataId]) {
                    if (dataId === 2) text = TextManager.tpA + text;
                    text = sys + vocab[6][1 + dataId];
                }
                break;
            case 63:
                if (vocab[6][5]) text = sys + vocab[6][5] + defeatText[dataId];
                break;
            case 64:
                if (vocab[6][6+dataId]) text = sys + vocab[6][6+dataId];
                break;
        }

        if(text) this.drawTextEx(text, x, y);
        return !!text;
    };

    Window_BFParameter.prototype.updatePosition = function() {
        if (this._statusWindow && this._statusWindow.active) {
            var index = this._statusWindow._index;
            var rect = this._statusWindow.itemRect(index);
            this.x = rect.x - this.width + this._statusWindow.x;
            if (this._statusWindow.x > this.x){
                this.x = rect.x + this._statusWindow.x + 80;
            }
            var y = rect.y - this.height / 2 + this._statusWindow.y + (rect.height / 2);
            y = y.clamp(this._statusWindow.y,Graphics.boxHeight - this.height);
            this.y = y;
            if (index !== this._index) {
                this.refresh();
                this._index = index;
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Window_BFInfo() {
        this.initialize.apply(this, arguments);
    }

    Window_BFInfo.prototype = Object.create(Window_Base.prototype);
    Window_BFInfo.prototype.constructor = Window_BFInfo;

    Window_BFInfo.prototype.initialize = function(x,y,w,h) {
        Window_Base.prototype.initialize.call(this, x,y,w,h);
        this.refresh();
    };

    Window_BFInfo.prototype.standardPadding = function() {
        return 6;
    };

    Window_BFInfo.prototype.refresh = function() {
        var text = $gameParty.battleFormation() ? $gameParty.battleFormation().name : basicFormationText;
        this.contents.fontSize = 22;
        this.changeTextColor(this.textColor(4));
        this.drawText(menuBattleFormationTitle,8,0,this.contentsWidth()-16,'center');
        this.contents.fillRect(4,32,this.contentsWidth()-8,2,'rgba(255,255,255,0.5)');
        this.changeTextColor(this.normalColor());
        this.drawText(text,8,32,this.contentsWidth()-16,'center');
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __WMCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        __WMCommand_addOriginalCommands.call(this);
        if (addMenuBattleFormation){
            this.addCommand(menuBattleFormationTitle, 'battleFormation', true);
        }
    };

    var __SMenu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        __SMenu_create.call(this);
        this.createFormationInfoWindow();
    };

    Scene_Menu.prototype.createFormationInfoWindow = function() {
        var cw = this._commandWindow;
        var sw = this._statusWindow;
        var gw = this._goldWindow;
        var v = $gameVariables._data;
        var s = $gameSwitches._data;
        var h = this._goldWindow.height + 8;
        var w = this._goldWindow.width;
        var x = eval(battleFormationInfoX) || 0;
        var y = eval(battleFormationInfoY) || 0;
        this._fInfoWindow = new Window_BFInfo(x,y,w,h);
        this.addWindow(this._fInfoWindow);
    };

    var __SMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        __SMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('battleFormation',   this.commandBattleFormation.bind(this));
    };

    Scene_Menu.prototype.commandBattleFormation = function() {
        SceneManager.push(Scene_BattleFormation);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Scene_BattleFormation() {
        this.initialize.apply(this, arguments);
    }

    Scene_BattleFormation.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_BattleFormation.prototype.constructor = Scene_BattleFormation;

    Scene_BattleFormation.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_BattleFormation.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createBackSprite();
        this.createWindowLayer();
        this.createHelpWindow();
        this.createCommandWindow();
        this.createStatusWindow();
        this.createParameterWindow();
    };

    Scene_BattleFormation.prototype.createBackSprite = function() {
        var back1 = new Sprite(ImageManager.loadBattleback1($gameMap._battleback1Name));
        back1.move(-92,-58);
        var back2 = new Sprite(ImageManager.loadBattleback2($gameMap._battleback2Name));
        back2.move(-92,-58);
        this.addChild(back1);
        this.addChild(back2);
    };

    Scene_BattleFormation.prototype.update = function() {
        if (!this.isBusy()) {
            this._commandWindow.open();
        }
        Scene_MenuBase.prototype.update.call(this);
        if (this._preIndex !== this._commandWindow.index()) {
            this._statusWindow.refresh();
            this._preIndex = this._commandWindow.index();
        }
        if (showParamWindow && this._statusWindow.active) this._paramWindow.open();
        this._paramWindow.updatePosition();
    };

    Scene_BattleFormation.prototype.isBusy = function() {
        return this._commandWindow.isClosing() || Scene_MenuBase.prototype.isBusy.call(this);
    };

    Scene_BattleFormation.prototype.terminate = function() {
        Scene_MenuBase.prototype.terminate.call(this);
    };

    Scene_BattleFormation.prototype.createCommandWindow = function() {
        var y = this._helpWindow.y + this._helpWindow.height;
        this._commandWindow = new Window_BFFormationList(y);
        this._commandWindow.setHandler('cancel', this.popScene.bind(this));
        this._commandWindow.setHandler('set', this.setFormation.bind(this));
        this._commandWindow.setHandler('right', this.commandStatus.bind(this));
        this.addWindow(this._commandWindow);
        this._commandWindow.setHelpWindow(this._helpWindow);
    };

    Scene_BattleFormation.prototype.createStatusWindow = function() {
        var x = this._commandWindow.x + this._commandWindow.width;
        var y = this._helpWindow.y + this._helpWindow.height;
        this._statusWindow = new Window_BFStatus(x,y);
        this._statusWindow.setHandler('cancel', this.onCancelStatus.bind(this));
        this._statusWindow.setHandler('ok', this.onOkStatus.bind(this));
        this._statusWindow.setCommandWindow(this._commandWindow);
        this.addWindow(this._statusWindow);
    };

    Scene_BattleFormation.prototype.createParameterWindow = function() {
        this._paramWindow = new Window_BFParameter();
        this._paramWindow.setStatusWindow(this._statusWindow);
        this._paramWindow.setCommandWindow(this._commandWindow);
        this.addChild(this._paramWindow);
    };
    
    Scene_BattleFormation.prototype.setFormation = function() {
        $gameParty.setBattleFormation(this._commandWindow.currentExt());
        this._commandWindow.refresh();
        this._commandWindow.activate();
    };

    Scene_BattleFormation.prototype.commandStatus = function() {
        this._commandWindow.deactivate();
        this._statusWindow.activate();
        this._statusWindow.select(0);
        this._statusWindow.refresh();
        this._paramWindow.refresh();
    };

    Scene_BattleFormation.prototype.onCancelStatus = function() {
        this._paramWindow.close();
        this._statusWindow.clearLock();
        this._statusWindow.deselect();
        this._statusWindow.deactivate();
        this._statusWindow.refresh();
        this._commandWindow.activate();
    };

    Scene_BattleFormation.prototype.onOkStatus = function() {
        if (!this._statusWindow.isLock()) {
            this._statusWindow.setLock();
            this._statusWindow.activate();
            this._statusWindow.refresh();
        } else {
            this._statusWindow.changeActorFormation();
            $gameParty.setBattleFormation(this._commandWindow.currentExt());
            this._statusWindow.clearLock();
            this._statusWindow.activate();
            this._commandWindow.refresh();
            this._statusWindow.refresh();
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SBattle_initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function() {
        $gameParty.refreshBattleFormation();
        __SBattle_initialize.call(this);
    };

    Scene_Battle.prototype.resetActorPosition = function() {
        this._spriteset._actorSprites.forEach(function(actor){
            actor.startMove(0,0);
        }.bind(this));
    };

    if (Imported['SceneFormation']) {

        var __SBattle_onMemberOk = Scene_Battle.prototype.onMemberOk;
        Scene_Battle.prototype.onMemberOk = function() {
            __SBattle_onMemberOk.call(this);
            if (this._scopeIndex === null){
                $gameParty.refreshBattleFormation();
                this.resetActorPosition();
            }
        };

        var __SBattle_onStandOk = Scene_Battle.prototype.onStandOk;
        Scene_Battle.prototype.onStandOk = function() {
            __SBattle_onStandOk.call(this);
            if (this._scopeIndex === null){
                $gameParty.refreshBattleFormation();
                this.resetActorPosition();
            }
        };

        var __SBattle_onRelease = Scene_Battle.prototype.onRelease;
        Scene_Battle.prototype.onRelease = function() {
            __SBattle_onRelease.call(this);
            $gameParty.refreshBattleFormation();
            this.resetActorPosition();
        };

        var __SBattle_onAdd = Scene_Battle.prototype.onAdd;
        Scene_Battle.prototype.onAdd = function() {
            __SBattle_onAdd.call(this);
            $gameParty.refreshBattleFormation();
            this.resetActorPosition();
        };
    }

    ////////////////////////////////////////////////////////////////////////////////////
}());