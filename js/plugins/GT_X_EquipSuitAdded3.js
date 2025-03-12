//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitAdded3
// GT_X_EquipSuitAdded3.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitAdded3 = true;

var GT = GT || {};
GT.ESAdded3 = GT.ESAdded3 || {};
GT.ESAdded3.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        装备 - 套装系统 - 套装数扩展3
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
 * @param Suit List 301-325
 * @text ----套装列表301-325----
 * @default
 *
 * @param Suit 301
 * @text 套装301
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 302
 * @text 套装302
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 303
 * @text 套装303
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 304
 * @text 套装304
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 305
 * @text 套装305
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 306
 * @text 套装306
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 307
 * @text 套装307
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 308
 * @text 套装308
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 309
 * @text 套装309
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 310
 * @text 套装310
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 311
 * @text 套装311
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 312
 * @text 套装312
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 313
 * @text 套装313
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 314
 * @text 套装314
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 315
 * @text 套装315
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 316
 * @text 套装316
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 317
 * @text 套装317
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 318
 * @text 套装318
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 319
 * @text 套装319
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 320
 * @text 套装320
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 321
 * @text 套装321
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 322
 * @text 套装322
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 323
 * @text 套装323
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 324
 * @text 套装324
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 325
 * @text 套装325
 * @parent Suit List 301-325
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 326-350
 * @text ----套装列表326-350----
 * @default
 *
 * @param Suit 326
 * @text 套装326
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 327
 * @text 套装327
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 328
 * @text 套装328
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 329
 * @text 套装329
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 330
 * @text 套装330
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 331
 * @text 套装331
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 332
 * @text 套装332
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 333
 * @text 套装333
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 334
 * @text 套装334
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 335
 * @text 套装335
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 336
 * @text 套装336
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 337
 * @text 套装337
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 338
 * @text 套装338
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 339
 * @text 套装339
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 340
 * @text 套装340
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 341
 * @text 套装341
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 342
 * @text 套装342
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 343
 * @text 套装343
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 344
 * @text 套装344
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 345
 * @text 套装345
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 346
 * @text 套装346
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 347
 * @text 套装347
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 348
 * @text 套装348
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 349
 * @text 套装349
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 350
 * @text 套装350
 * @parent Suit List 326-350
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 351-375
 * @text ----套装列表351-375----
 * @default
 *
 * @param Suit 351
 * @text 套装351
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 352
 * @text 套装352
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 353
 * @text 套装353
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 354
 * @text 套装354
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 355
 * @text 套装355
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 356
 * @text 套装356
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 357
 * @text 套装357
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 358
 * @text 套装358
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 359
 * @text 套装359
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 360
 * @text 套装360
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 361
 * @text 套装361
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 362
 * @text 套装362
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 363
 * @text 套装363
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 364
 * @text 套装364
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 365
 * @text 套装365
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 366
 * @text 套装366
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 367
 * @text 套装367
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 368
 * @text 套装368
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 369
 * @text 套装369
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 370
 * @text 套装370
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 371
 * @text 套装371
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 372
 * @text 套装372
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 373
 * @text 套装373
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 374
 * @text 套装374
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 375
 * @text 套装375
 * @parent Suit List 351-375
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 376-400
 * @text ----套装列表376-400----
 * @default
 *
 * @param Suit 376
 * @text 套装376
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 377
 * @text 套装377
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 378
 * @text 套装378
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 379
 * @text 套装379
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 380
 * @text 套装380
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 381
 * @text 套装381
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 382
 * @text 套装382
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 383
 * @text 套装383
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 384
 * @text 套装384
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 385
 * @text 套装385
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 386
 * @text 套装386
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 387
 * @text 套装387
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 388
 * @text 套装388
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 389
 * @text 套装389
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 390
 * @text 套装390
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 391
 * @text 套装391
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 392
 * @text 套装392
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 393
 * @text 套装393
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 394
 * @text 套装394
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 395
 * @text 套装395
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 396
 * @text 套装396
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 397
 * @text 套装397
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 398
 * @text 套装398
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 399
 * @text 套装399
 * @parent Suit List 376-400
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 400
 * @text 套装400
 * @parent Suit List 376-400
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

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitAdded3');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData3 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

GT.ESAdded3.DataManager_equipSuitDatabaseCreate = DataManager.equipSuitDatabaseCreate;
DataManager.equipSuitDatabaseCreate = function() {
	GT.ESAdded3.DataManager_equipSuitDatabaseCreate.call(this);
    $dataEquipSuits = $dataEquipSuits || [null];
    for (var i = 301; i <= 400; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData3['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData3 = {};
};

//=============================================================================
// End of File
//=============================================================================
} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitAdded3，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore
	