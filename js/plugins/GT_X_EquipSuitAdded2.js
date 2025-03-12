//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitAdded2
// GT_X_EquipSuitAdded2.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitAdded2 = true;

var GT = GT || {};
GT.ESAdded2 = GT.ESAdded2 || {};
GT.ESAdded2.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        装备 - 套装系统 - 套装数扩展2
 * @author ganfly
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 * 
 * 本组插件为装备套装系统的套装数扩展，可以将套装核心的100个套装扩展
 * 到更多，必须安装GT_EquipSuitCore才能运行。
 * 本组插件参考了YEP插件
 *
 *     GT_X_EquipSuitAdded1 扩展101-200号套装。
 *     GT_X_EquipSuitAdded2 扩展201-300号套装。
 *     GT_X_EquipSuitAdded3 扩展301-400号套装。
 *     GT_X_EquipSuitAdded4 扩展401-500号套装。
 *     GT_X_EquipSuitAdded5 扩展501-600号套装。
 *     GT_X_EquipSuitAdded6 扩展601-700号套装。
 *     GT_X_EquipSuitAdded7 扩展701-800号套装。
 *     GT_X_EquipSuitAdded8 扩展801-900号套装。
 *     GT_X_EquipSuitAdded9 扩展901-1000号套装。
 *
 * ============================================================================
 * 参数对照表及公式
 * ============================================================================
 *
 *  Base代表基础值，Plus代表参数加成，Rate代表参数倍率
 * 
 *  基础参数      公式：(Base + Plus) * Rate
 *  MHP 最大生命
 *  MMP 最大魔法
 *  ATK 攻击力
 *  DEF 防御力
 *  MAT 魔法攻击力
 *  MDF 魔法防御力
 *  AGI 敏捷
 *  LUK 幸运
 *
 *  额外参数      公式：(Base + Plus) * Rate
 *  HIT 命中率
 *  EVA 闪避率
 *  CRI 暴击率
 *  CEV 暴击闪避率
 *  MEV 魔法闪避率
 *  MRF 魔法反射率
 *  CNT 反击率
 *  HRG 生命自动回复率
 *  MRG 魔法自动回复率
 *  TRG 怒气自动回复率
 * 
 *  特殊参数      公式：(Base + Plus) * Rate
 *  TGR 受到攻击几率
 *  GRD 防御效果
 *  REC 回复效果
 *  PHA 药理知识
 *  MCR 魔法消耗率
 *  TCR 怒气补充率
 *  PDR 物理伤害率
 *  MDR 魔法伤害率
 *  FDR 地形伤害率
 *  EXR 经验率
 *  
 *  战斗结算      公式：(Base + Base * Plus) * Rate
 *  EXP 经验获得量
 *  GOLD 金币获得量
 *  ITEM 物品爆率
 * 
 * ============================================================================
 * 用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 * 更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 * 
 * ============================================================================
 * 帮助结束
 * ============================================================================
 *
 * @param Suit List 201-225
 * @text ----套装列表201-225----
 * @default
 *
 * @param Suit 201
 * @text 套装201
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 202
 * @text 套装202
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 203
 * @text 套装203
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 204
 * @text 套装204
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 205
 * @text 套装205
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 206
 * @text 套装206
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 207
 * @text 套装207
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 208
 * @text 套装208
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 209
 * @text 套装209
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 210
 * @text 套装210
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 211
 * @text 套装211
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 212
 * @text 套装212
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 213
 * @text 套装213
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 214
 * @text 套装214
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 215
 * @text 套装215
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 216
 * @text 套装216
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 217
 * @text 套装217
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 218
 * @text 套装218
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 219
 * @text 套装219
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 220
 * @text 套装220
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 221
 * @text 套装221
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 222
 * @text 套装222
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 223
 * @text 套装223
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 224
 * @text 套装224
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 225
 * @text 套装225
 * @parent Suit List 201-225
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 226-250
 * @text ----套装列表226-250----
 * @default
 *
 * @param Suit 226
 * @text 套装226
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 227
 * @text 套装227
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 228
 * @text 套装228
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 229
 * @text 套装229
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 230
 * @text 套装230
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 231
 * @text 套装231
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 232
 * @text 套装232
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 233
 * @text 套装233
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 234
 * @text 套装234
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 235
 * @text 套装235
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 236
 * @text 套装236
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 237
 * @text 套装237
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 238
 * @text 套装238
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 239
 * @text 套装239
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 240
 * @text 套装240
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 241
 * @text 套装241
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 242
 * @text 套装242
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 243
 * @text 套装243
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 244
 * @text 套装244
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 245
 * @text 套装245
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 246
 * @text 套装246
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 247
 * @text 套装247
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 248
 * @text 套装248
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 249
 * @text 套装249
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 250
 * @text 套装250
 * @parent Suit List 226-250
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 251-275
 * @text ----套装列表251-275----
 * @default
 *
 * @param Suit 251
 * @text 套装251
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 252
 * @text 套装252
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 253
 * @text 套装253
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 254
 * @text 套装254
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 255
 * @text 套装255
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 256
 * @text 套装256
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 257
 * @text 套装257
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 258
 * @text 套装258
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 259
 * @text 套装259
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 260
 * @text 套装260
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 261
 * @text 套装261
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 262
 * @text 套装262
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 263
 * @text 套装263
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 264
 * @text 套装264
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 265
 * @text 套装265
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 266
 * @text 套装266
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 267
 * @text 套装267
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 268
 * @text 套装268
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 269
 * @text 套装269
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 270
 * @text 套装270
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 271
 * @text 套装271
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 272
 * @text 套装272
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 273
 * @text 套装273
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 274
 * @text 套装274
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 275
 * @text 套装275
 * @parent Suit List 251-275
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 276-300
 * @text ----套装列表276-300----
 * @default
 *
 * @param Suit 276
 * @text 套装276
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 277
 * @text 套装277
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 278
 * @text 套装278
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 279
 * @text 套装279
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 280
 * @text 套装280
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 281
 * @text 套装281
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 282
 * @text 套装282
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 283
 * @text 套装283
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 284
 * @text 套装284
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 285
 * @text 套装285
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 286
 * @text 套装286
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 287
 * @text 套装287
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 288
 * @text 套装288
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 289
 * @text 套装289
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 290
 * @text 套装290
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 291
 * @text 套装291
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 292
 * @text 套装292
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 293
 * @text 套装293
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 294
 * @text 套装294
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 295
 * @text 套装295
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 296
 * @text 套装296
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 297
 * @text 套装297
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 298
 * @text 套装298
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 299
 * @text 套装299
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 300
 * @text 套装300
 * @parent Suit List 276-300
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 */
/* ---------------------------------------------------------------------------
 * struct<Suit>
 * ---------------------------------------------------------------------------
 */
/*~struct~Suit:
 *
 * @param SuitName
 * @text 套装名称
 * @desc 套装名称，可以使用文字代码。
 * @default xx套装
 *
 * @param SuitDescription
 * @text 套装额外说明
 * @type note
 * @desc 对整个套装的额外说明，可以使用文字代码。
 * @default
 *
 * @param SuitBonuses
 * @text 套装增益效果
 * @type struct<SuitPieces>[]
 * @desc 套装的分层效果。
 * @default []
 *
 * @param SuitNote
 * @text 套装备注
 * @type note
 * @desc 套装备注，无游戏内效果，仅用于制作套装时标记用
 * 比如可以写一下套装包含的装备，方便查找
 * @default
 */
/* ---------------------------------------------------------------------------
 * struct<SuitPieces>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~SuitPieces:
 *
 * @param RequirePieces
 * @text 效果所需装备件数
 * @type number
 * @min 1
 * @desc 效果所需装备件数
 * @default 1
 *
 * @param Text
 * @text 本层效果说明
 * @type note
 * @desc 本层效果的额外说明，可以使用文字代码。
 * @default
 *
 * @param ShowText
 * @text 是否显示这层效果?
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示这层效果?
 * @default true
 *
 * @param PiecesBonuses
 * @text ----增益效果----
 *
 * @param PassiveStates
 * @text 被动状态
 * @parent PiecesBonuses
 * @type State[]
 * @desc 达到装备数要求时，自动给角色附加的状态，兼容YEP_AutoPassiveStates的状态备注条件。
 * @default []
 *
 * @param StatesResist
 * @text 状态免疫
 * @parent PiecesBonuses
 * @type State[]
 * @desc 达到装备数要求时，角色免疫的状态。
 * @default []
 *
 * @param AddSkills
 * @text 学习技能
 * @parent PiecesBonuses
 * @type Skill[]
 * @desc 达到装备数要求时，角色学习的技能。
 * @default []
 *
 * @param ParamBonuses
 * @text 基础参数增益
 * @parent PiecesBonuses
 * @type struct<ParamBonuses>[]
 * @desc 达到装备数要求时，角色的基础参数增益。
 * @default []
 *
 * @param XParamBonuses
 * @text 额外参数增益
 * @parent PiecesBonuses
 * @type struct<XParamBonuses>[]
 * @desc 达到装备数要求时，角色的额外参数增益。
 * @default []
 *
 * @param SParamBonuses
 * @text 特殊参数增益
 * @parent PiecesBonuses
 * @type struct<SParamBonuses>[]
 * @desc 达到装备数要求时，角色的特殊参数增益。
 * @default []
 *
 * @param BResultBonuses
 * @text 战斗结算增益
 * @parent PiecesBonuses
 * @type struct<BResultBonuses>[]
 * @desc 达到装备数要求时，队伍的战斗结算增益。
 * @default []
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ParamBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~ParamBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option MHP
 * @option MMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default MHP
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0，1代表加1，-1代表减1
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<XParamBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~XParamBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default HIT
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0%，1代表加1%，-1代表减1%
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<SParamBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~SParamBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default TGR
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0%，1代表加1%，-1代表减1%
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<BResultBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~BResultBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option EXP
 * @option GOLD
 * @option ITEM
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default EXP
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0%，1代表加1%，-1代表减1%
 * @default 0
 *
 */
//=============================================================================

if (Imported.GT_EquipSuitCore) {
	
//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitAdded2');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData2 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

GT.ESAdded2.DataManager_equipSuitDatabaseCreate = DataManager.equipSuitDatabaseCreate;
DataManager.equipSuitDatabaseCreate = function() {
	GT.ESAdded2.DataManager_equipSuitDatabaseCreate.call(this);
    $dataEquipSuits = $dataEquipSuits || [null];
    for (var i = 201; i <= 300; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData2['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData2 = {};
};

//=============================================================================
// End of File
//=============================================================================
} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitAdded2，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore
	