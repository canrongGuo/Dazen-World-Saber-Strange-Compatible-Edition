/*:
 * @plugindesc Reversi v1.01.(The AI part belong to https://github.com/yshan/yshan.github.io/tree/master/othello)
 * @author Kong Jing
 *
 * @param VariableId
 * @desc the variableId to save result
 * 1 is win, 2 is lose
 * @default 1
 *
 * @param CancelText
 * @desc the name display. if none, will no command to give up.
 * @default 放弃
 *
 * @param Level
 * @desc 1~6
 * @default 3
 *
 * @param Size
 * @desc the size of the chessboard
 * @default 800
 *
 * @param Sound
 * @desc Se
 * @default
 *
 * @param UI
 * @desc the picture of paper
 * @default
 *
 * @help
 * 参数说明：
 * VariableId参数是，下棋结束后会修改的游戏变量，1为胜利，2为失败。
 * CancelText参数，放弃显示的文字
 * Level参数，难易度，最低1，最高4。
 * Size * Size是棋盘的像素大小，棋子像素宽高均是Size除8
 * 图片均可自行替换，但不要改名字（改名字也可以，修改相应代码orz）
 * Sound游戏下子音效，UI设置给左右两侧增加纸条背景。
 *
 * 使用方法：
 * 插件命令
 * Reversi Level
 * 如Reversi 1
 *
 * 
 */

// Imported
var Imported = Imported || {};
Imported.KJ_Reversi = true;

// Parameter Variables
var KJ = KJ || {};
KJ.Reversi = KJ.Reversi || {};

KJ.Reversi.Parameters = PluginManager.parameters('KJ_Reversi');
KJ.Reversi.Param = KJ.Reversi.Param || {};

KJ.Reversi.Param.VariableId = parseInt(KJ.Reversi.Parameters['VariableId']);
KJ.Reversi.Param.CancelText = String(KJ.Reversi.Parameters['CancelText']);
KJ.Reversi.Param.Level = parseInt(KJ.Reversi.Parameters['Level']) || 1;
KJ.Reversi.Param.Size = parseInt(KJ.Reversi.Parameters['Size']) || 750;
KJ.Reversi.Param.Sound = String(KJ.Reversi.Parameters['Sound']);
KJ.Reversi.Param.UI = String(KJ.Reversi.Parameters['UI']);
// Interpreter
KJ.Reversi.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	KJ.Reversi.Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === 'Reversi') {
		KJ.Reversi.Param.Level = parseInt(args[0]) || 1;
		SceneManager.push(Scene_Reversi);
	}
};

ImageManager.loadReversi = function(filename, hue) {
	return this.loadBitmap('img/Reversi/', filename, hue, true);
};
function Scene_Reversi() {
    this.initialize.apply(this, arguments);
}
Scene_Reversi.prototype = Object.create(Scene_Base.prototype);
Scene_Reversi.prototype.constructor = Scene_Reversi;
Scene_Reversi.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	this._scale = Graphics.boxHeight * 0.9 / KJ.Reversi.Param.Size;
	this._black = ImageManager.loadReversi('black');
	this._white = ImageManager.loadReversi('white');
	this._selectable = ImageManager.loadReversi('selectable');
	this._delta = KJ.Reversi.Param.Size / 8 * this._scale; 
	this._startX = Graphics.boxWidth * 0.5 - 8 / 2 * this._delta;
	this._startY = 0 * this._delta;
	this._current = -1;
	this._result = false;
	this._judge = true;
	this._animationTime = 15;
	this._sound = {"name":KJ.Reversi.Param.Sound,"pan":0,"pitch":100,"volume":90};
	this.initGame();
	this.initAi();
};
Scene_Reversi.prototype.initGame = function() {
	this._player = Math.floor(Math.random() * 2);
	this._turn = 0;
	this._step = 0;
	this._loadingTime = 20;
	this._blackNumber = 2;
	this._whiteNumber = 2;
	this.chessBoard = [];
	for(var i = 0; i < 8; i++){
		this.chessBoard.push([]);
		for(var j = 0; j < 8; j++){
			this.chessBoard[i].push(-1);
		}
	}
	this._animation = [];
};
Scene_Reversi.prototype.initAi = function(){
	this.Brain = new Reversi_Brain();
	this.Board = new Reversi_Board();
	switch(KJ.Reversi.Param.Level){
		case 1:this.Brain.setLevel(1, 4);break;
		case 2:this.Brain.setLevel(2, 8);break;
		case 3:this.Brain.setLevel(4, 10);break;
		default:this.Brain.setLevel(6, 12);break;
	}
	this.Board.reset();
};
Scene_Reversi.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createBackgroud();
	this.createChessboard();
    this.createWindowLayer();
	this.createCommandWindow();
	this.createMessageWindow();
};
Scene_Reversi.prototype.createBackgroud = function(){
	if(KJ.Reversi.Param.UI){
		var height = Graphics.boxHeight * 0.5;
		var width = (Graphics.boxWidth - Graphics.boxHeight * 0.9) / 2;
		for(var i = 1; i < 3; i++){
			this['_MessageSprite' + i] = new Sprite(ImageManager.loadReversi(KJ.Reversi.Param.UI));
			this['_MessageSprite' + i].y = height;
			this.adjustSprite(this['_MessageSprite' + i]);
			this.addChild(this['_MessageSprite' + i]);
		}
		this._MessageSprite1.x = width / 2;
		this._MessageSprite2.x = Graphics.boxWidth - width / 2;
	}
	this._backgroundSprite = new Sprite(ImageManager.loadReversi('chessboard'));
	this._backgroundSprite.x = Graphics.boxWidth * 0.5;
	this._backgroundSprite.y = Graphics.boxHeight * 0.45;
	this.adjustSprite(this._backgroundSprite);
	this.addChild(this._backgroundSprite);
};
Scene_Reversi.prototype.createChessboard = function() {
	var number, x, y;
	for(var i = 0; i < 8; i++)
		for(var j = 0; j < 8; j++){
			number = i + j * 8;
			x = this._startX + (i + 0.5) * this._delta;
			y = this._startY + (j + 0.5) * this._delta;
			this['_chess' + number] = new Sprite(null);
			this['_chess' + number].x = x;
			this['_chess' + number].y = y;
			this.adjustSprite(this['_chess' + number]);
			this.addChild(this['_chess' + number]);
		}
	this._lastchessSprite = new Sprite(ImageManager.loadReversi('last'));
	this._lastchessSprite.x = this._startX + (8 / 2) * this._delta;
	this._lastchessSprite.y = this._startY + (8 / 2) * this._delta;
	this._lastchessSprite.opacity = 0;
	this.adjustSprite(this._lastchessSprite);
	this.addChild(this._lastchessSprite);
	this.chessBoard[3][3] = 1;
	this.chessBoard[4][4] = 1;
	this.chessBoard[3][4] = 2;
	this.chessBoard[4][3] = 2;
	this.drawChess(3, 3);
	this.drawChess(3, 4);
	this.drawChess(4, 3);
	this.drawChess(4, 4);
	this.updateSelectable(this._turn);
};
Scene_Reversi.prototype.adjustSprite = function(sprite) {
	sprite.scale.x = this._scale;
	sprite.scale.y = this._scale;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};
Scene_Reversi.prototype.createMessageWindow = function() {
	this._messageWindow = new Window_Base(0, Graphics.boxHeight * 0.30, Graphics.boxWidth, Graphics.boxHeight * 0.40);
	this._messageWindow.setBackgroundType(2);
	this.addWindow(this._messageWindow);
	var height = Graphics.boxHeight * 0.5;
	var width = (Graphics.boxWidth - Graphics.boxHeight * 0.9) / 2;
    this._messageWindow1 = new Window_Base(0, Graphics.boxHeight * 0.25, width, height);
	this._messageWindow2 = new Window_Base(Graphics.boxWidth - width, Graphics.boxHeight * 0.25, width, height);
	this._messageWindow1.setBackgroundType(2);
	this._messageWindow2.setBackgroundType(2);
    this.addWindow(this._messageWindow1);
	this.addWindow(this._messageWindow2);
};
Scene_Reversi.prototype.createCommandWindow = function() {
	var width = 150;
	var x = (Graphics.boxWidth - width) * 0.5;
	var y = Graphics.boxHeight * 0.9;
	this._commandWindow = new Window_CancelCommand(x, y);
	this._commandWindow.setBackgroundType(2);
	this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};
Scene_Reversi.prototype.start = function() {
    this._active = true;
	this.showInformation();
	this.updateInformation();
};
Scene_Reversi.prototype.update = function(){
	Scene_Base.prototype.update.call(this);
	var content;
	if(this._loadingTime > 0){
		this._loadingTime--;
	}
	else if(this._judge){
		this.updateInformation();
		this.updateControl();
		if(this._result){
			//show result;
			if((this._blackNumber > this._whiteNumber && this._player === 0) || (this._blackNumber < this._whiteNumber && this._player === 1)){
				$gameVariables.setValue(KJ.Reversi.Param.VariableId, 1);
				content = '赢了';
				this.updateContent('恭喜胜利');
			}
			else{
				$gameVariables.setValue(KJ.Reversi.Param.VariableId, 2);
				content = '输了';
				this.updateContent('继续努力');
			}
			this._commandWindow.redrawItem(0, content);
			this._judge = false;
		}
		else this.updateChess();
	} 
	else if(this._waitTime > 0){
		var number;
		this._waitTime--;
		if(this._waitTime >= this._animationTime){
			for(var i = 0; i < this._animation.length; i++){
				number = this._animation[i];
				this['_chess' + number].opacity = (this._waitTime / this._animationTime - 1) * 255;
				if(this['_chess' + number].opacity <= 0)
					this['_chess' + number].bitmap = this._turn ? this._white : this._black;
			}
		}
		else for(var i = 0; i < this._animation.length; i++){
			number = this._animation[i];
			this['_chess' + number].opacity = (1 - this._waitTime / this._animationTime) * 255;
		}
		if(this._waitTime === 0){
			if(this.updateSelectable(1 - this._turn))
				this._turn = 1 - this._turn;
			else if(this.updateSelectable(this._turn)){
				this.Board.skipPutChess();
				this._turn = this._turn;
			}
			else {
				this._result = true;
			}
			this._judge = true;
		}
			
	}
};
Scene_Reversi.prototype.updateContent = function(content){
	var padding = this._messageWindow.padding;
	var height = this._messageWindow.height;
	var width = this._messageWindow.width;
	this._messageWindow.contents.fontSize = 50;
	this._messageWindow.setBackgroundType(1);
	this._messageWindow.contents.clearRect(0, 0, width, height);
	this._messageWindow.drawText(content, 0, height/3, width - padding*2, 'center');
};
Scene_Reversi.prototype.updateInformation = function(){
	var padding = this._messageWindow1.padding;
	var height = this._messageWindow1.height;
	var width = this._messageWindow1.width;
	this._messageWindow1.contents.clearRect(0, 0, width, height);
	this._messageWindow1.drawText('回合：'+this._step, 0, 0, width - padding*2, 'center');
	this._messageWindow1.contents.blt(this._black, 0, 0, 100, 100, width/2 - 70, height/3-20, 50, 50);
	this._messageWindow1.drawText('    ：'+this._blackNumber, 0, height/3, width - padding*2, 'center');
	this._messageWindow1.contents.blt(this._white, 0, 0, 100, 100, width/2 - 70, height/3*2-20, 50, 50);
	this._messageWindow1.drawText('    ：'+this._whiteNumber, 0, height/3*2, width - padding*2, 'center');
};
Scene_Reversi.prototype.showInformation = function(){
	var padding = this._messageWindow2.padding;
	var height = this._messageWindow2.height;
	var width = this._messageWindow2.width;
	var bitmap1 = (this._player === 0)? this._white:this._black;
	var bitmap2 = (this._player === 1)? this._white:this._black;
	this._messageWindow2.contents.clearRect(0, 0, width, height);
	this._messageWindow2.drawText('敌方', 0, 0, width - padding*2, 'center');
	this._messageWindow2.contents.blt(bitmap1, 0, 0, 100, 100, width/2-40, height/4-25, 50, 50);
	this._messageWindow2.drawText('我方', 0, height/2, width - padding*2, 'center');
	this._messageWindow2.contents.blt(bitmap2, 0, 0, 100, 100, width/2-40, height/4*3-25, 50, 50);
};
Scene_Reversi.prototype.updateControl = function(){
	if(TouchInput.isTriggered()){
		var i = Math.floor((TouchInput.x - this._startX) / this._delta);
		var j = Math.floor((TouchInput.y - this._startY) / this._delta);
		if(i  >= 0 && i  < 8 && j >= 0 && j < 8)
			this._current = i + j * 8;
	}
};
Scene_Reversi.prototype.updateChess = function() {
	if(this._turn === this._player){
		var i = this._current % 8;
		var j = Math.floor(this._current / 8);
		if(i >= 0 && i < 8 && j >=0 && j <8)
			if(this.chessBoard[i][j] === 0)
				this.putChess(i, j);
	}
	else {
		//for AI
		var step = this.Brain.findBestStep(this.Board);
		var x = step[0];
		var y = step[1];
		this.putChess(x-1, y-1);
	}
};
Scene_Reversi.prototype.changeChess = function(){
	var chess = 1 - this._turn + 1;
	var aimx, aimy, xx, yy;
	var add = KJ.Reversi.Change.length - 1;
	this._animation = [];
	for(var x = 0; x < add; x++){
		var m = KJ.Reversi.Change[x][0];
		var n = KJ.Reversi.Change[x][1];
		this._animation.push(m-1+(n-1)*8);
		this.chessBoard[m-1][n-1] = chess;
	};
	// for(var x = - 1; x < 2; x++){
		// for(var y = - 1; y < 2; y++){
			// if(!(x === 0 && y === 0)){
				// aimx = i + x; aimy = j + y;
				// xx = i + x; yy = j + y;
				// while(aimx < 8 && aimx >= 0 && aimy < 8 && aimy >=0){
					// if(this.chessBoard[aimx][aimy] <= 0)
						// break;
					// else if(this.chessBoard[aimx][aimy] === chess){
						// while(xx != aimx || yy != aimy){
							// this.chessBoard[xx][yy] = chess;
							// this._animation.push(xx + yy * 8);
							// add++;
							// xx += x;
							// yy += y;
						// }
						// break;
					// }
					// else{
						// aimx += x;
						// aimy += y;
					// }
				// }
			// }
		// }
	// }
	if(this._turn === 0){
		this._blackNumber += add + 1;
		this._whiteNumber -= add;
	}
	else{
		this._whiteNumber += add + 1;
		this._blackNumber -= add;
	}
	var i = KJ.Reversi.Change[add][0] - 1;
	var j = KJ.Reversi.Change[add][1] - 1;
	this.chessBoard[i][j] = chess;
	this.drawChess(i, j);
	this._lastchessSprite.opacity = 255;
	this._lastchessSprite.x = this._startX + (i + 0.5) * this._delta;
	this._lastchessSprite.y = this._startY + (j + 0.5) * this._delta;
};
Scene_Reversi.prototype.putChess = function(i, j){
	this.Board.putChess(i+1, j+1);
	this.changeChess(i, j);
	this._step++;
	this._judge = false;
	this._waitTime = 2 * this._animationTime;
	AudioManager.playSe(this._sound);
};
Scene_Reversi.prototype.updateSelectable = function(k){
    var number;
    var count = 0;
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			number = i + j * 8;
			if(this.chessBoard[i][j] <= 0){
				this.chessBoard[i][j] = this.judgePlace(i, j, k);
				if(this.chessBoard[i][j] === 0){
					this['_chess' + number].bitmap = this._selectable;
					count++;
				}
				else this['_chess' + number].bitmap = null;
			}
		}
	}
    return count;
};

Scene_Reversi.prototype.judgePlace = function(i, j, k){
    var chess = 1 - k + 1;
    var aimx, aimy;
	for(var x = - 1; x < 2; x++){
		for(var y = - 1; y < 2; y++){
			if(!(x === 0 && y === 0)){
				aimx = i + x; aimy = j + y;
				while(aimx < 8 && aimx >= 0 && aimy < 8 && aimy >=0){
					if(this.chessBoard[aimx][aimy] <= 0)
						break;
					else if(this.chessBoard[aimx][aimy] === chess){
						if(aimx != i + x || aimy != j + y)
						    return 0;
						else break;
					}
					else{
						aimx += x;
						aimy += y;
					}
				}
			}
		}
	}
	return -1;
};
Scene_Reversi.prototype.drawChess = function(i, j) {
	var number = i + j * 8;
	if(this.chessBoard[i][j] === 1){
		this['_chess' + number].bitmap = this._white;
	}
	else if(this.chessBoard[i][j] === 2){
		this['_chess' + number].bitmap = this._black;
	}
};


function Window_CancelCommand() {
	this.initialize.apply(this, arguments);
}
Window_CancelCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_CancelCommand.prototype.constructor = Window_CancelCommand;
Window_CancelCommand.prototype.initialize = function (x, y) {
	Window_HorzCommand.prototype.initialize.call(this, x, y);
};
Window_CancelCommand.prototype.maxCols = function () {
	return 1;
};
Window_CancelCommand.prototype.makeCommandList = function () {
	this.addCommand(KJ.Reversi.Param.CancelText, 'cancel');
};
Window_CancelCommand.prototype.windowWidth = function() {
    return 150;
};
Window_CancelCommand.prototype.redrawItem = function(index, name) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
	this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    this.drawText(name, rect.x, rect.y, rect.width, align);
	this.activate();
};
KJ.Reversi.INFINITE = 999999;
KJ.Reversi.MIN_NODES = 10000;
KJ.Reversi.MIN_TICK = 1000;
KJ.Reversi.EVAL_SCORES =[500 ,-150 ,30 ,10 ,10 ,30 ,-150 ,500 ,
				 -150,-250 ,0  ,0  ,0  ,0  ,-250 ,-150,
				 30  ,0    ,1  ,2  ,2  ,1  ,0    ,30  ,
				 10  ,0    ,2  ,16 ,16 ,2  ,0    ,10  ,
				 10  ,0    ,2  ,16 ,16 ,2  ,0    ,10  ,
				 30  ,0    ,1  ,2  ,2  ,1  ,0    ,30  ,
				 -150,-250 ,0  ,0  ,0  ,0  ,-250 ,-150,
				 500 ,-150 ,30 ,10 ,10 ,30 ,-150 ,500 ];
KJ.Reversi.BONUS_SCORE = 30;
KJ.Reversi.LIBERTY_SCORE = 8;
function Reversi_Brain(){
	var nodeCount = 0;
	var defaultdepth = 6;
	var maxdepth;
	var finaldepth = 18;
	
	var heuristic = function(board,player){
		++nodeCount; //update counter
		var	c1=0,c2=0;
		var s1=0,s2=0;
		var data = board._getData();
		for(var x=1;x<=KJ.Reversi.BS;++x){
			for(var y=1;y<=KJ.Reversi.BS;++y){
				var i = (x-1)+(y-1)*KJ.Reversi.BS;
				var chess = data[i];
				if(chess == 0){
					continue;
				}
				var liberty = 0;
				for(var dx=-1;dx<=1;++dx){
					for(var dy=-1;dy<=1;++dy){
						var tx = x+dx;
						var ty = y+dy;
						var t = (tx-1)+(ty-1)*KJ.Reversi.BS;
						if(tx>=1 && tx<=KJ.Reversi.BS && ty>=1 && ty<=KJ.Reversi.BS && data[t]==0){
							++liberty;
						}
					}
				}
				if(chess == player){
					++c1;
					s1 += KJ.Reversi.EVAL_SCORES[i];
					s1 -= liberty*KJ.Reversi.LIBERTY_SCORE;
				}
				else{
					++c2;
					s2 += KJ.Reversi.EVAL_SCORES[i];
					s2 -= liberty*KJ.Reversi.LIBERTY_SCORE;
				}
			}
		}
		
		if(c1 == 0) return -KJ.Reversi.INFINITE;
		if(c2 == 0) return KJ.Reversi.INFINITE;
		if(c1+c2 == KJ.Reversi.BS*KJ.Reversi.BS){
			if(c1>c2) return KJ.Reversi.INFINITE;
			else if(c2>c1) return -KJ.Reversi.INFINITE;
		}
		
		//corner check
		var checkCorner = function(arr){
			var corner = arr[0];
			var cornerChess = data[corner];
			if(cornerChess!=0){
				//calc the adjust chess score
				for(var i=1;i<=3;++i){
					var chess = data[arr[i]];
					if(chess == 0){
						continue;
					}
					else if(chess == player){
						s1 -= KJ.Reversi.EVAL_SCORES[arr[i]];
					}
					else{
						s2 -= KJ.Reversi.EVAL_SCORES[arr[i]];
					}
				}
				//calc the bonus: x direction
				var tmp = corner;
				for(var i=0;i<KJ.Reversi.BS-2;++i){
					tmp += arr[4];
					if(data[tmp]!=cornerChess){
						break;
					}
					if(player == cornerChess){
						s1 += KJ.Reversi.BONUS_SCORE;
					}
					else{
						s2 += KJ.Reversi.BONUS_SCORE;
					}
				}
				//calc the bonus: y direction
				tmp = corner;
				for(var i=0;i<KJ.Reversi.BS-2;++i){
					tmp += (arr[5]*KJ.Reversi.BS);
					if(data[tmp]!=cornerChess){
						break;
					}
					if(player == cornerChess){
						s1 += KJ.Reversi.BONUS_SCORE;
					}
					else{
						s2 += KJ.Reversi.BONUS_SCORE;
					}
				}
			}
		};
		checkCorner([0,1,8,9,1,1]);
		checkCorner([7,6,14,15,-1,1]);
		checkCorner([56,48,49,57,1,-1]);
		checkCorner([63,54,55,62,-1,-1]);
		
		//console.debug("c1:"+c1+",c2:"+c2+",s1:"+s1+",s2:"+s2);
		return (s1-s2);
	};
	var exactscore = function(board,player){
		++nodeCount;
		var bw = board.getChessCount();
		var score = 0;
		if(bw[0]>bw[1]){
			score = KJ.Reversi.INFINITE;
		}
		else if(bw[0]<bw[1]){
			score = -KJ.Reversi.INFINITE;
		}
		if(player ==  KJ.Reversi.WHITE){
			score = -score;
		}
		return score;
	}
	
	var getHeuristicValue = function(board,player,step){
		board.putChess(step[0],step[1]);
		var score = heuristic(board,player);
		board.undo();
		return score;
	}
	
	var hsearch = function(board, player, depth,alpha,beta){
		if(depth == 0){
			return {'score':heuristic(board,player),'step':[]};
		}
		var max = (board.getPlayer() == player);
		var score = max?(-KJ.Reversi.INFINITE-1):(KJ.Reversi.INFINITE+1);
		var steps = board.getPutableList();
		var bestStep = [0,0];
		if(steps.length>0){
			//sort the steps for better cut
			var heuristics ={};
			for(var i=0;i<steps.length;++i){
				var step = steps[i];
				heuristics[step]=getHeuristicValue(board,player,step);
			}
			steps.sort(function(a,b){
				return max?(heuristics[b]-heuristics[a]):(heuristics[a]-heuristics[b]);
			});
			
			if(depth == 1){
				var step = steps[0];
				score = heuristics[step];
				bestStep[0] = step[0];
				bestStep[1] = step[1];
			}
			else{
				for(var i=0;i<steps.length;++i){
					var step = steps[i];
					board.putChess(step[0],step[1]);
					var ret = hsearch(board, player,depth-1,alpha,beta);
					board.undo();
					if(depth == maxdepth){ //only output the first level
						console.debug("eval step:"+step+",score:"+ret.score+",depth:"+depth);
					}
					if(max){
						if(ret.score>score) {
							score = ret.score;
							bestStep[0] = step[0];
							bestStep[1] = step[1];
						}
						alpha = (alpha>score?alpha:score);
						if(alpha>=beta){ //beta cutoff
							break;
						}
					}
					else{
						if(ret.score<score) {
							score = ret.score;
							bestStep[0] = step[0];
							bestStep[1] = step[1];
						}
						beta = (beta<score?beta:score);
						if(alpha>=beta){ //alpha cutoff
							break;
						}
					}
				}
			}
		}
		else{
			if(!board.isGameOver()){
				board.skipPutChess();
				var ret = hsearch(board, player,depth,alpha,beta);
				score = ret.score;
				bestStep = [];
				board.undo();
			}
			else{
				score = exactscore(board,player);
				bestStep = [];
			}
		}
		return {'score':score,'step':bestStep};
	}
	
	var esearch = function(board, player, depth,alpha,beta){
		if(depth == 0){
			return {'score':exactscore(board,player),'step':[]};
		}
		var max = (board.getPlayer() == player);
		var score = max?(-KJ.Reversi.INFINITE-1):(KJ.Reversi.INFINITE+1);
		var steps = board.getPutableList();
		var bestStep = [0,0];
		if(steps.length>0){
			for(var i=0;i<steps.length;++i){
				var step = steps[i];
				board.putChess(step[0],step[1]);
				var ret = esearch(board, player,depth-1,alpha,beta);
				board.undo();
				if(depth == maxdepth){ //only output the first level
					console.debug("eval step:"+step+",score:"+ret.score+",depth:"+depth);
				}
				if(max){
					if(ret.score>score) {
						score = ret.score;
						bestStep[0] = step[0];
						bestStep[1] = step[1];
					}
					alpha = (alpha>score?alpha:score);
					if(alpha>=beta){ //beta cutoff
						break;
					}
				}
				else{
					if(ret.score<score) {
						score = ret.score;
						bestStep[0] = step[0];
						bestStep[1] = step[1];
					}
					beta = (beta<score?beta:score);
					if(alpha>=beta){ //alpha cutoff
						break;
					}
				}
			}
		}
		else{
			if(!board.isGameOver()){
				board.skipPutChess();
				var ret = esearch(board, player,depth,alpha,beta);
				score = ret.score;
				bestStep = [];
				board.undo();
			}
			else{
				score = exactscore(board,player);
				bestStep = [];
			}
		}
		return {'score':score,'step':bestStep};
	}

	this.setLevel= function(sd,fd){
		defaultdepth=sd;
		finaldepth=fd;
	}
	
	this.findBestStep = function(board){
		var steps = board.getPutableList();
		var cc = board.getChessCount();
		var player = board.getPlayer();
		var chessCount = cc[0]+cc[1];
		if(steps.length<=0){
			return [];
		}
		//if chess count is less than (KJ.Reversi.BS-2)^2 , take the random strategy
		if(chessCount<=((KJ.Reversi.BS-4)*(KJ.Reversi.BS-4))){ //random select
			console.debug("random strategy");
			var radSteps = [];
			for(var i=0;i<steps.length;++i){
				var step = steps[i];
				if(step[0]>=3 && step[0]<=(KJ.Reversi.BS-2) && step[1]>=3 && step[1]<=(KJ.Reversi.BS-2)){
					radSteps.push(step);
				}
			}
			if(radSteps.length>0){
				var ri = Math.floor((Math.random()*radSteps.length));
				return radSteps[ri];
			}
		}
		if(chessCount>=KJ.Reversi.BS*KJ.Reversi.BS-finaldepth){ //exact search
			console.debug("exact strategy");
			maxdepth = KJ.Reversi.BS*KJ.Reversi.BS - chessCount;
			console.debug("try depth:"+maxdepth);
			nodeCount = 0;
			var tick = (new Date()).getTime();
			result = esearch(board,player,maxdepth,-KJ.Reversi.INFINITE,KJ.Reversi.INFINITE);
			tick = (new Date()).getTime()-tick;
			console.debug("best step:"+result.step+",eval nodeCount:"+nodeCount+",cost:"+tick+" ms");
			if(result.score!=(-KJ.Reversi.INFINITE)){
				return result.step;
			}
		}
		//heuristic search
		maxdepth = defaultdepth;
		var result;
		nodeCount = 0;
		var tick = (new Date()).getTime();
		result = hsearch(board,player,maxdepth,-KJ.Reversi.INFINITE,KJ.Reversi.INFINITE);
		tick = (new Date()).getTime()-tick;
		console.debug("best step:"+result.step+",eval nodeCount:"+nodeCount+",cost:"+tick+" ms");
		return result.step;
	}
};
KJ.Reversi.BS = 8; //BLORD SIZE
KJ.Reversi.CENTER = KJ.Reversi.BS/2;
KJ.Reversi.BLACK = 2;
KJ.Reversi.WHITE = 1;
function Reversi_pos(x,y){
	return (x-1)+(y-1)*KJ.Reversi.BS;
}
function Reversi_Board(){
	var data = new Array(KJ.Reversi.BS*KJ.Reversi.BS);
	var currentPlayer = KJ.Reversi.BLACK;
	var history = [];
	var trogglePlayer = function(){
		currentPlayer = ((currentPlayer==KJ.Reversi.BLACK)?KJ.Reversi.WHITE:KJ.Reversi.BLACK);
	};
	this.reset = function(){
		for(var i=0;i<KJ.Reversi.BS*KJ.Reversi.BS;++i){
			data[i] = 0;
		}
		data[Reversi_pos(KJ.Reversi.CENTER,KJ.Reversi.CENTER)] = data[Reversi_pos(KJ.Reversi.CENTER+1,KJ.Reversi.CENTER+1)] = KJ.Reversi.WHITE;
		data[Reversi_pos(KJ.Reversi.CENTER,KJ.Reversi.CENTER+1)] = data[Reversi_pos(KJ.Reversi.CENTER+1,KJ.Reversi.CENTER)] = KJ.Reversi.BLACK;
		currentPlayer = KJ.Reversi.BLACK;
		history = [];
	};
	this.isGameOver = function(){
		var result = false;
		if(!this.canPutAnyChess()){
			trogglePlayer();
			if(!this.canPutAnyChess()){
				result = true;
			}
			trogglePlayer();
		}
		return result;
	}
	
	this.getChess = function(x,y){
		return data[Reversi_pos(x,y)];
	};
	
	this.getPlayer = function(){
		return currentPlayer;
	}
	
	this.getChessCount = function(player){
		var b=0,w=0;
		for(var i=0;i<KJ.Reversi.BS*KJ.Reversi.BS;++i){
			if(data[i]==KJ.Reversi.BLACK){
				++b;
			}
			else if(data[i]==KJ.Reversi.WHITE){
				++w;
			}
		}
		
		if(player == KJ.Reversi.BLACK){
			return b;
		}
		else if(player == KJ.Reversi.WHITE){
			return w;
		}
		else{
			return [b,w];
		}
	}
	
	var check = function(x,y,dx,dy,reverse,cb){
		var found = false;
		var c = 0;
		while(true){
			x += dx;
			y += dy;
			if( x<1 || x>KJ.Reversi.BS || y<1 || y>KJ.Reversi.BS){
				break;
			}					
			var chess = data[Reversi_pos(x,y)];
			if(chess==0){
				break;
			}
			else if(chess==currentPlayer){
				found = true;
				break;
			}
			else{
				++c;
			}
		}
		if(c>0 && found){
			if(reverse){
				for(;c>0;--c){
					x -= dx;
					y -= dy;
					data[Reversi_pos(x,y)] = currentPlayer;
					cb(x,y);
				}
			}
			return true;
		}
		return false;
	};
	
	this.canPutChess = function(x,y){
		if(data[Reversi_pos(x,y)]==0){
			if(check(x,y,1,1) || check(x,y,1,0) || check(x,y,1,-1) || check(x,y,0,1) || check(x,y,0,-1)
				|| check(x,y,-1,1) || check(x,y,-1,0) || check(x,y,-1,-1)){
				return true;
			}
		}
		return false;
	};
	
	this.getPutableList = function(){
		var result = [];
		for(var x=1;x<=KJ.Reversi.BS;++x){
			for(var y=1;y<=KJ.Reversi.BS;++y){
				if(this.canPutChess(x,y)){
					result.push([x,y]);
				}
			}
		}
		return result;
	}
	
	this.canPutAnyChess = function(){
		for(var x=1;x<=KJ.Reversi.BS;++x){
			for(var y=1;y<=KJ.Reversi.BS;++y){
				if(this.canPutChess(x,y)){
					return true;
				}
			}
		}
		return false;
	}
	
	this.putChess = function(x,y){
		if(data[Reversi_pos(x,y)]==0){
			var changed = [];
			var saveChanged = function(tx,ty){
				changed.push([tx,ty]);
			};
			check(x,y,1,1,true,saveChanged);
			check(x,y,1,0,true,saveChanged);
			check(x,y,1,-1,true,saveChanged);
			check(x,y,0,1,true,saveChanged);
			check(x,y,0,-1,true,saveChanged);
			check(x,y,-1,-1,true,saveChanged);
			check(x,y,-1,0,true,saveChanged);
			check(x,y,-1,1,true,saveChanged);
			
			if(changed.length>0){
				data[Reversi_pos(x,y)] = currentPlayer;
				changed.push([x,y]);
				history.push(changed);
				KJ.Reversi.Change = changed;
				trogglePlayer();
				return true;
			}
		}
		return false;
	};
	this.skipPutChess = function(){
		if(!this.canPutAnyChess()){
			history.push([]);
			trogglePlayer();
			return true;
		}
		return false;
	}
	this.undo = function(){
		if(history.length>0){
			var flipped = (history.length%2==0?KJ.Reversi.BLACK:KJ.Reversi.WHITE);
			var step = history.pop();
			if(step!=null && step.length>0){
				for(var i=0;i<step.length-1;++i){ //flip
					var chess = step[i];
					data[Reversi_pos(chess[0],chess[1])] = flipped;
				}
				var chess = step[step.length-1];
				data[Reversi_pos(chess[0],chess[1])] = 0;
			}
			trogglePlayer();
			return true;
		}
		return false;
	};
	
	this._getData = function(){
		return data;
	}
	this.reset();
};