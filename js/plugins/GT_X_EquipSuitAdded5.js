//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitAdded5
// GT_X_EquipSuitAdded5.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitAdded5 = true;

var GT = GT || {};
GT.ESAdded5 = GT.ESAdded5 || {};
GT.ESAdded5.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        装备 - 套装系统 - 套装数扩展5
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
 * @param Suit List 501-525
 * @text ----套装列表501-525----
 * @default
 *
 * @param Suit 501
 * @text 套装501
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 502
 * @text 套装502
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 503
 * @text 套装503
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 504
 * @text 套装504
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 505
 * @text 套装505
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 506
 * @text 套装506
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 507
 * @text 套装507
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 508
 * @text 套装508
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 509
 * @text 套装509
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 510
 * @text 套装510
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 511
 * @text 套装511
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 512
 * @text 套装512
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 513
 * @text 套装513
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 514
 * @text 套装514
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 515
 * @text 套装515
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 516
 * @text 套装516
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 517
 * @text 套装517
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 518
 * @text 套装518
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 519
 * @text 套装519
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 520
 * @text 套装520
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 521
 * @text 套装521
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 522
 * @text 套装522
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 523
 * @text 套装523
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 524
 * @text 套装524
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 525
 * @text 套装525
 * @parent Suit List 501-525
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 526-550
 * @text ----套装列表526-550----
 * @default
 *
 * @param Suit 526
 * @text 套装526
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 527
 * @text 套装527
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 528
 * @text 套装528
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 529
 * @text 套装529
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 530
 * @text 套装530
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 531
 * @text 套装531
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 532
 * @text 套装532
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 533
 * @text 套装533
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 534
 * @text 套装534
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 535
 * @text 套装535
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 536
 * @text 套装536
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 537
 * @text 套装537
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 538
 * @text 套装538
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 539
 * @text 套装539
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 540
 * @text 套装540
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 541
 * @text 套装541
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 542
 * @text 套装542
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 543
 * @text 套装543
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 544
 * @text 套装544
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 545
 * @text 套装545
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 546
 * @text 套装546
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 547
 * @text 套装547
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 548
 * @text 套装548
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 549
 * @text 套装549
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 550
 * @text 套装550
 * @parent Suit List 526-550
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 551-575
 * @text ----套装列表551-575----
 * @default
 *
 * @param Suit 551
 * @text 套装551
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 552
 * @text 套装552
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 553
 * @text 套装553
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 554
 * @text 套装554
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 555
 * @text 套装555
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 556
 * @text 套装556
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 557
 * @text 套装557
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 558
 * @text 套装558
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 559
 * @text 套装559
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 560
 * @text 套装560
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 561
 * @text 套装561
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 562
 * @text 套装562
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 563
 * @text 套装563
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 564
 * @text 套装564
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 565
 * @text 套装565
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 566
 * @text 套装566
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 567
 * @text 套装567
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 568
 * @text 套装568
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 569
 * @text 套装569
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 570
 * @text 套装570
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 571
 * @text 套装571
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 572
 * @text 套装572
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 573
 * @text 套装573
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 574
 * @text 套装574
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 575
 * @text 套装575
 * @parent Suit List 551-575
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 576-600
 * @text ----套装列表576-600----
 * @default
 *
 * @param Suit 576
 * @text 套装576
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 577
 * @text 套装577
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 578
 * @text 套装578
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 579
 * @text 套装579
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 580
 * @text 套装580
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 581
 * @text 套装581
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 582
 * @text 套装582
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 583
 * @text 套装583
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 584
 * @text 套装584
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 585
 * @text 套装585
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 586
 * @text 套装586
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 587
 * @text 套装587
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 588
 * @text 套装588
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 589
 * @text 套装589
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 590
 * @text 套装590
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 591
 * @text 套装591
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 592
 * @text 套装592
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 593
 * @text 套装593
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 594
 * @text 套装594
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 595
 * @text 套装595
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 596
 * @text 套装596
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 597
 * @text 套装597
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 598
 * @text 套装598
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 599
 * @text 套装599
 * @parent Suit List 576-600
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 600
 * @text 套装600
 * @parent Suit List 576-600
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

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitAdded5');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData5 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

GT.ESAdded5.DataManager_equipSuitDatabaseCreate = DataManager.equipSuitDatabaseCreate;
DataManager.equipSuitDatabaseCreate = function() {
	GT.ESAdded5.DataManager_equipSuitDatabaseCreate.call(this);
    $dataEquipSuits = $dataEquipSuits || [null];
    for (var i = 501; i <= 600; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData5['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData5 = {};
};

//=============================================================================
// End of File
//=============================================================================
} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitAdded5，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore
	