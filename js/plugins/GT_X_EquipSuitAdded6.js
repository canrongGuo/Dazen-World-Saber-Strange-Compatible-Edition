//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitAdded6
// GT_X_EquipSuitAdded6.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitAdded6 = true;

var GT = GT || {};
GT.ESAdded6 = GT.ESAdded6 || {};
GT.ESAdded6.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        装备 - 套装系统 - 套装数扩展6
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
 * @param Suit List 601-625
 * @text ----套装列表601-625----
 * @default
 *
 * @param Suit 601
 * @text 套装601
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 602
 * @text 套装602
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 603
 * @text 套装603
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 604
 * @text 套装604
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 605
 * @text 套装605
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 606
 * @text 套装606
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 607
 * @text 套装607
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 608
 * @text 套装608
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 609
 * @text 套装609
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 610
 * @text 套装610
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 611
 * @text 套装611
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 612
 * @text 套装612
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 613
 * @text 套装613
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 614
 * @text 套装614
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 615
 * @text 套装615
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 616
 * @text 套装616
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 617
 * @text 套装617
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 618
 * @text 套装618
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 619
 * @text 套装619
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 620
 * @text 套装620
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 621
 * @text 套装621
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 622
 * @text 套装622
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 623
 * @text 套装623
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 624
 * @text 套装624
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 625
 * @text 套装625
 * @parent Suit List 601-625
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 626-650
 * @text ----套装列表626-650----
 * @default
 *
 * @param Suit 626
 * @text 套装626
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 627
 * @text 套装627
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 628
 * @text 套装628
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 629
 * @text 套装629
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 630
 * @text 套装630
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 631
 * @text 套装631
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 632
 * @text 套装632
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 633
 * @text 套装633
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 634
 * @text 套装634
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 635
 * @text 套装635
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 636
 * @text 套装636
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 637
 * @text 套装637
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 638
 * @text 套装638
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 639
 * @text 套装639
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 640
 * @text 套装640
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 641
 * @text 套装641
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 642
 * @text 套装642
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 643
 * @text 套装643
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 644
 * @text 套装644
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 645
 * @text 套装645
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 646
 * @text 套装646
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 647
 * @text 套装647
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 648
 * @text 套装648
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 649
 * @text 套装649
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 650
 * @text 套装650
 * @parent Suit List 626-650
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 651-675
 * @text ----套装列表651-675----
 * @default
 *
 * @param Suit 651
 * @text 套装651
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 652
 * @text 套装652
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 653
 * @text 套装653
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 654
 * @text 套装654
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 655
 * @text 套装655
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 656
 * @text 套装656
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 657
 * @text 套装657
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 658
 * @text 套装658
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 659
 * @text 套装659
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 660
 * @text 套装660
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 661
 * @text 套装661
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 662
 * @text 套装662
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 663
 * @text 套装663
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 664
 * @text 套装664
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 665
 * @text 套装665
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 666
 * @text 套装666
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 667
 * @text 套装667
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 668
 * @text 套装668
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 669
 * @text 套装669
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 670
 * @text 套装670
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 671
 * @text 套装671
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 672
 * @text 套装672
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 673
 * @text 套装673
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 674
 * @text 套装674
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 675
 * @text 套装675
 * @parent Suit List 651-675
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 676-700
 * @text ----套装列表676-700----
 * @default
 *
 * @param Suit 676
 * @text 套装676
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 677
 * @text 套装677
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 678
 * @text 套装678
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 679
 * @text 套装679
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 680
 * @text 套装680
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 681
 * @text 套装681
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 682
 * @text 套装682
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 683
 * @text 套装683
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 684
 * @text 套装684
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 685
 * @text 套装685
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 686
 * @text 套装686
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 687
 * @text 套装687
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 688
 * @text 套装688
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 689
 * @text 套装689
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 690
 * @text 套装690
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 691
 * @text 套装691
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 692
 * @text 套装692
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 693
 * @text 套装693
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 694
 * @text 套装694
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 695
 * @text 套装695
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 696
 * @text 套装696
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 697
 * @text 套装697
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 698
 * @text 套装698
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 699
 * @text 套装699
 * @parent Suit List 676-700
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 700
 * @text 套装700
 * @parent Suit List 676-700
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

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitAdded6');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData6 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

GT.ESAdded6.DataManager_equipSuitDatabaseCreate = DataManager.equipSuitDatabaseCreate;
DataManager.equipSuitDatabaseCreate = function() {
	GT.ESAdded6.DataManager_equipSuitDatabaseCreate.call(this);
    $dataEquipSuits = $dataEquipSuits || [null];
    for (var i = 601; i <= 700; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData6['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData6 = {};
};

//=============================================================================
// End of File
//=============================================================================
} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitAdded6，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore
	