//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitAdded4
// GT_X_EquipSuitAdded4.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitAdded4 = true;

var GT = GT || {};
GT.ESAdded4 = GT.ESAdded4 || {};
GT.ESAdded4.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        装备 - 套装系统 - 套装数扩展4
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
 * @param Suit List 401-425
 * @text ----套装列表401-425----
 * @default
 *
 * @param Suit 401
 * @text 套装401
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 402
 * @text 套装402
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 403
 * @text 套装403
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 404
 * @text 套装404
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 405
 * @text 套装405
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 406
 * @text 套装406
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 407
 * @text 套装407
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 408
 * @text 套装408
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 409
 * @text 套装409
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 410
 * @text 套装410
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 411
 * @text 套装411
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 412
 * @text 套装412
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 413
 * @text 套装413
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 414
 * @text 套装414
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 415
 * @text 套装415
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 416
 * @text 套装416
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 417
 * @text 套装417
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 418
 * @text 套装418
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 419
 * @text 套装419
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 420
 * @text 套装420
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 421
 * @text 套装421
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 422
 * @text 套装422
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 423
 * @text 套装423
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 424
 * @text 套装424
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 425
 * @text 套装425
 * @parent Suit List 401-425
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 426-450
 * @text ----套装列表426-450----
 * @default
 *
 * @param Suit 426
 * @text 套装426
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 427
 * @text 套装427
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 428
 * @text 套装428
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 429
 * @text 套装429
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 430
 * @text 套装430
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 431
 * @text 套装431
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 432
 * @text 套装432
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 433
 * @text 套装433
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 434
 * @text 套装434
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 435
 * @text 套装435
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 436
 * @text 套装436
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 437
 * @text 套装437
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 438
 * @text 套装438
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 439
 * @text 套装439
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 440
 * @text 套装440
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 441
 * @text 套装441
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 442
 * @text 套装442
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 443
 * @text 套装443
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 444
 * @text 套装444
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 445
 * @text 套装445
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 446
 * @text 套装446
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 447
 * @text 套装447
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 448
 * @text 套装448
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 449
 * @text 套装449
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 450
 * @text 套装450
 * @parent Suit List 426-450
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 451-475
 * @text ----套装列表451-475----
 * @default
 *
 * @param Suit 451
 * @text 套装451
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 452
 * @text 套装452
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 453
 * @text 套装453
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 454
 * @text 套装454
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 455
 * @text 套装455
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 456
 * @text 套装456
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 457
 * @text 套装457
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 458
 * @text 套装458
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 459
 * @text 套装459
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 460
 * @text 套装460
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 461
 * @text 套装461
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 462
 * @text 套装462
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 463
 * @text 套装463
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 464
 * @text 套装464
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 465
 * @text 套装465
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 466
 * @text 套装466
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 467
 * @text 套装467
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 468
 * @text 套装468
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 469
 * @text 套装469
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 470
 * @text 套装470
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 471
 * @text 套装471
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 472
 * @text 套装472
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 473
 * @text 套装473
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 474
 * @text 套装474
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 475
 * @text 套装475
 * @parent Suit List 451-475
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 476-500
 * @text ----套装列表476-500----
 * @default
 *
 * @param Suit 476
 * @text 套装476
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 477
 * @text 套装477
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 478
 * @text 套装478
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 479
 * @text 套装479
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 480
 * @text 套装480
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 481
 * @text 套装481
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 482
 * @text 套装482
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 483
 * @text 套装483
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 484
 * @text 套装484
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 485
 * @text 套装485
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 486
 * @text 套装486
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 487
 * @text 套装487
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 488
 * @text 套装488
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 489
 * @text 套装489
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 490
 * @text 套装490
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 491
 * @text 套装491
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 492
 * @text 套装492
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 493
 * @text 套装493
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 494
 * @text 套装494
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 495
 * @text 套装495
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 496
 * @text 套装496
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 497
 * @text 套装497
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 498
 * @text 套装498
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 499
 * @text 套装499
 * @parent Suit List 476-500
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 500
 * @text 套装500
 * @parent Suit List 476-500
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

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitAdded4');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData4 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

GT.ESAdded4.DataManager_equipSuitDatabaseCreate = DataManager.equipSuitDatabaseCreate;
DataManager.equipSuitDatabaseCreate = function() {
	GT.ESAdded4.DataManager_equipSuitDatabaseCreate.call(this);
    $dataEquipSuits = $dataEquipSuits || [null];
    for (var i = 401; i <= 500; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData4['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData4 = {};
};

//=============================================================================
// End of File
//=============================================================================
} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitAdded4，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore
	