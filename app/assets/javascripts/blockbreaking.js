// $(function(){

//   // window.alert("OKを押した後、キャラクタが着地し、パワーを溜めます！\nその後 ↑ で開始してください！画面外にキャラクタが出ないようにしてください！")
  
//   var canvas = document.getElementById("block-myCanvas");
//   // キャンバスを取得するためにコード。事前準備。
//   var ctx = canvas.getContext("2d");
//   // キャンバスの2D描画コンテキストは実際にCanvasに描画するために使用。2Dを宣言する。
//   // 線や四角や塗り潰し等が出来る。事前準備。

//   var x = canvas.width / 2;
//   // 枠の横幅を定義する。
//   // ⭐️ボールの初期位置？
//   var y = canvas.height - 30;
//   // 枠の縦幅を定義する。
//   // ボールの初期位置？

//   var dx = 6;
//   var dy = -6;
//   // 微小な変化を表現。アニメーション用。
//   // デルタx,yで表現。
//   // ⭐️玉の移動スピード。

//   var ballRadius = 10;
//   // ⭐️簡単な衝突実験を行う。ボールの半径を定義する。

//   var paddleHeight = 10;
//   var paddleWidth = 500;
//   var paddleX = (canvas.width - paddleWidth)/2;
//   // ⭐️⭐️⭐️ボールがぶつかるパドルの定義。

//   var rightPressed = false;
//   // ⭐️パドルの右移動。
//   // 最初は制御ボタンは押されていないため、どちらにおいてもデフォルトの値はfalseとする。
//   var leftPressed = false;
//   // ⭐️パドルの左移動。
//   var upPressed = false;
//   // ⭐️ボールの速度UP
//   var downPressed = false;
//   // ⭐️ポールと止める。
//   var score = 0;
//   // ⭐️スコアーの宣言。
//   var lives = 1;
//   // ⭐️プレイヤーにライスを与える。


//   var brickRowCount = 2;
//   // ⭐️ブロック崩しを行う箱の縦列を設定。
//   var brickColumnCount = 6;
//   // ⭐️ブロック崩しを行う箱の横列を設定。
//   var brickWidth = 100;
//   // ⭐️ブロックの横幅を設定。
//   var brickHeight = 25;
//   // ⭐️ブロックの縦幅を設定。
//   var brickPadding = 10;
//   // ⭐️ブロック間のパッディングを設定。
//   var brickOffsetTop = 30;
//   // ⭐️ブロック間のオフセットトップを設定。
//   var brickOffsetLeft = 30;
//   // ⭐️ブロック間のオフセットの左側を設定。

//   var bricks = [];
//   // ⭐️bricksの配列を宣言する。ブロックで破壊するブロック。
//   // ブロックのための、2次元配列を操作する入れ子の流＾ぷを使った数列のコードを
//   // 書き上げること。しかし、その前に幅と高さ、行と配列などといった情報を定義する
//   // いくつかの変数が必要となる、
//   for(var c = 0; c < brickColumnCount; c++) {
//   // ブリックス関数を宣言したが、それが二重配列になっていなかった。
//   // 定義するために二重配列を定義する。
//   // ⭐️一つの二次元配列で全てのブロックを記載する。
//     bricks[c] = [];
//     // brick[c]も配列の中に入っている。
//     for(var r = 0; r < brickRowCount; r++) {
//     // その中を連想配列が入っている。
//       bricks[c][r] = {x: 0, y: 0, status:1};
//       // 衝突フラグを立てるためにstatusを定義している。
//     }
//   }


//   function collisionDetection(){
//     // ブロックの衝突関数を定義する。

//     for(var c = 0; c < brickColumnCount; c++) {
//     // ブリックス関数を宣言したが、それが二重配列になっていなかった。
//     // 定義するために二重配列を定義する。
//     // ⭐️一つの二次元配列で全てのブロックを記載する。
//     // ブロックで壊す箱と定義文は似ている。
//       for(var r = 0; r < brickRowCount; r++) {
//       // その中を連想配列が入っている。
//         var b = bricks[c][r];

//         if(b.status == 1) {
//           // ⭐️衝突したstatusを0にする。
//           if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
//           // もしボールの中央がブロックの1つの座標の内部だったらボールの向きを変更する。
//           // ⭐️ボールの一がブロックのx座標。ただ横幅を考慮した範囲内。ｙ座標を縦幅を考慮した範囲に
//             // dy = -dy;

//             dx = dx / Math.abs(dx) * (Math.floor(Math.random() * 15 )+3);
//             dy = -(dy / Math.abs(dy) * (Math.floor(Math.random() * 15 )+3));
//             // dy=-(dy * ((Math.floor(Math.random(dy) * 15)+3)));
//             // dx=(((dx / Math.abs(dx))* 3) * (Math.floor(Math.random() * 15)));
//             // dx=(Math.floor(Math.random(dy) * 15)+3);
//             // ⭐️⭐️⭐️⭐️⭐️y方向を反転させる。

//             b.status = 0;
//             score++;
//             // ぶつかるとscoreを1加算する。


//             if(score == brickRowCount * brickColumnCount) {
//             // ⭐️スコアーがブロックの縦※横と同じ数になった時、以下の処理を行う。
//               alert("終わり！");
//               document.location.reload();
//               // 画面をリロードする。
//             }
//           }
//         }
//       }
//     }
//   }

//   function drawScore() {
//   // ⭐️スコアを描写する。
//     ctx.font = "16px Arial";
//     // スコアのフォントを設定する。
//     ctx.fillStyle = "#0095DD";
//     // スコアの色を設定する。
//     ctx.fillText("Score:" + score, 8, 20);
//     // 画面に表示される文字を指定する。
//   }

//   function drawLives() {
//   // ⭐️ライフを描写する。
//     ctx.font = "16px Arial";
//     // スコアのフォントを設定する。
//     ctx.fillStyle = "#0095DD";
//     // スコアの色を設定する。
//     ctx.fillText("Score:" + lives, canvas.width - 65, 20);
//     // 画面に表示される文字を指定する。
//   }

//   function drawBall(){
//   // ⭐️ボールを描画する関数の作成。
//     ctx.beginPath();
//     // パスを開く。事前準備。
//     ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
//     // ちょうど中央にくるように位置を調整する。円。
//     // arc(x, y, ボールの半径, 0, Math.PI * 2)
//     ctx.fillStyle = "white";
//     // 塗り潰しの色を設定。
//     ctx.fill();
//     // 塗り潰しの実行。
//     ctx.closePath();
//     // パスを閉じる。
//   }


//   function drawPaddle(){
//   // ⭐️ボールを弾くパドルを関数を作成。
//     ctx.beginPath();
//     // パスを開く。事前準備。
//     ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
//     // ctx.arc(paddleX, canvas.height - paddleHeight, 50, 0, Math.PI, true);
//     // ctx.rect(paddleX, canvas.height - paddleHeight, Math.PI * paddleWidth * paddleWidth /2);
//       // ctx.(240, 160, 20, 0, Math.PI * 2, false);
//     // ⭐️⭐️⭐️⭐️(paddleX, パドルの高さ位置, パドルの幅, パドルの高さ)描写される。弾かれるものとは別。
//     // 大きさを決める。
//     ctx.fillStyle = "red";
//     // 塗り潰しの色を設定。
//     ctx.fill();
//     // 塗り潰しの実行。
//     ctx.closePath();
//     // パスを閉じる。
//   }

//   function drawBricks() {
//   // ⭐ブロック描画搬送？を定義する。
//     for(var c = 0; c < brickColumnCount; c++){
//     // 二重forにて対応する？列に対しての定義文?ブロックの横関係。
//       for(var r = 0; r < brickRowCount; r++){
//       // ブロックの縦幅関係。

//         if(bricks[c][r].status == 1) {
//           // sutatusが1の時はまだ衝突フラグがある時ということのなので
//           var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//           var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//           // ⭐️それぞれの大きさ、列と幅を考慮して計算する。
//           bricks[c][r].x = brickX;
//           bricks[c][r].y = brickY;
//           // ⭐️ブロック形を表現している。枠のようなもの？絵で書かれているものとは違う。
//           // 0にするとブロックは弾かれない。


//           ctx.beginPath();
//           // パスを開く。
//           ctx.rect(brickX, brickY, brickWidth, brickHeight);
//           // ⭐️ブロックを描画する部分を記載する。
//           // 全て上の方で定義しているものを流用している。
//           ctx.fillStyle = "red";
//           // 塗り潰しの色を設定。
//           ctx.fill();
//           // 塗り潰しの実行。
//           ctx.closePath();
//           // パスを閉じる。
//         }   
//       }
//     }
//   }


//   function draw() {
//   // ⭐️連続したデータを過去分をせすための関数を宣言。
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // ⭐️Canvasの内容を削除するメゾット、clearRect().
//     // clearRect(0, 0, 横幅, 縦幅)。
//     // 一回消した後に新しいボールを再度描画しているため動いているように見える。
//     drawBall();
//     // 関数の呼び出し。ボールの表示。
//     drawBricks();
//     // 関数を呼び出し、
//     drawPaddle();
//     // 関数の呼び出し。ボールを弾くパドルを表示。
//     // drawScore();
//     // スコアを描画する。
//     // drawLives();
//     // ライフを表示する。
//     collisionDetection();
//     // ブロックの衝突勘案を表示する。


//     if(x + dx < 0 + ballRadius){
//       // ⭐️画面の左側を反転させる。
//       // もし、ボールの位置のxの値が0未満だったら、符号反転させた値を
//       // 設定することで、x軸方向の動きの向きを変える。
//       // ボールの跳ね返りを表す。
//       dx = -dx;
//     }
//     if(x + dx > canvas.width - ballRadius){
//       // ⭐️画面の右側を反転させるせる。
//       // xの値がcanvasより、大きくなった時、xの値を反転する。
//       // 上のものと条件分岐が同じなため、セットにすると良い。下参考。
//       // if(x + dx < 0 | x + dx > canvas.height);
//       dx = -dx;
//     }
//     if(y + dy < 0 + ballRadius){
//       // ⭐️上の壁を定義する。
//       // もし、ボールの位置のyの値が0未満だったら、符号反転させた値を
//       // 設定することで、y軸方向の動きの向きを変える。
//       // ボールの跳ね返りを表す。
//       // ⭐️- ballRadius、半径を引くことによって、これを行わないとボールが弾かれたからめり込む。
//       dy = -dy;
//     }
//     else if(y + dy > canvas.height - ballRadius){
//       // ⭐下の壁を設定する。
//       // yの値がcanvasより、大きくなった時、yの値を反転する。
//       // 上のものと条件分岐が同じなため、セットにすると良い。下参考。
//       // if(y + dy < 0 | y + dy > canvas.height);
//       // dy = -dy;

//       if(x > paddleX && x < paddleX + paddleWidth) {
//       // ⭐️⭐️⭐️⭐️⭐️ボールの位置がパドルのx座標範囲内だった場合。
//         if(y = y - paddleHeight) {
//           // dy = -dy;
//           // dy = -(3 + (Math.floor(Math.random() * 15)));
//           // dx = ((dx / Math.abs(dx) * 3) + (Math.floor(Math.random() * 15)));
//           // dy=-dy;
//           // dy=-((((dy / Math.abs(dx))* 3) * (Math.floor(Math.random() * 30)+0.1)));
//           dx = dx / Math.abs(dx) * (Math.floor(Math.random() * 15 )+3);
//           dy = -(dy / Math.abs(dy) * (Math.floor(Math.random() * 15 )+3));
//           // dx = (Math.floor(Math.random(dy) * 15)+3);
//           // y方向を-の位置にする。
//           // 板がボールを弾く。
//         }
//       }
//         else {
//           lives --;

//           if(!lives) {
//             // 失敗するたびにライフが引かれる。
//             // ⭐️ライフがなっかった時。
//             // alert("真面目にやって！");
//             document.location.reload();
//             // ⭐️⭐️画面がリロードされる。
//             // clearInterval(interval);
//             // setinterval()メゾットを繰り返す。
//           }
//           else {
//             // ⭐️ライフがある時。
//             x = canvas.width / 2;
//             y = canvas.height - 30;
//             dx = 3;
//             dy = -3;
//             paddleX = (canvas.width - paddleWidth) / 2;
//           }
//         }
//     }
    
   
//     // if (rightPressed && paddleX < canvas.width - (paddleWidth/2)) {
//     if (rightPressed && paddleX < canvas.width - paddleWidth) {
//       // 右矢印を押している時 & 右側の端までパドルが行っていない時。
//       // どちらかのキーを長く押し続けたらパドルがCanvasの緑から消えるので。
//       paddleX = paddleX + 20;
//       // ⭐️⭐️⭐️⭐️⭐️右側のキーを押されていた、パドルの座標を。
//     }
//     // else if (leftPressed && paddleX > (paddleWidth/2)) {
//     else if (leftPressed && paddleX > 0) {
//       // 左矢印を押している時 & 左側の端までパドルが行っていない時。
//       paddleX = paddleX - 20;
//       // ⭐️⭐️⭐️⭐️⭐️左側のキーを押されていた、パドルの座標を。
//     }


//     x = x + dx;
//     y = y + dy;
//     // xとyに毎フレーム描画した後に小さな値を加え、ボールが動いているように見せる。

//     requestAnimationFrame(draw);
//     // ⭐️繰り返し処理用。
//     // ⭐️固定の10秒のフレームレートではなくブラウザに制御を託している。
//     // ブラウザはルレームレートを適切に同期し図形を必要な時だけ描画する。
//     // これは古いsetlnterval()メゾットよりも効率的で滑らかなアニメーションループを生み出す。
//   }

//   document.addEventListener("keydown", keyDownHandler,false);
//   // ⭐️ddEventListenerさまざまなイベント処理を実行することが出来るメゾット。
//   // ⭐️keydown、キーを押している時に反応。
//   document.addEventListener("keyup", keyUpHandler,false);
//   // ⭐️keyup、キーを離した時に反応。
//   // document.addEventListener("mousemove", mouseMoveHandler, false);
//   // ⭐️マウスで操作する。mouseMoveHandlerは自分で定義しているので名前はなんでもいい？

  
//   function keyDownHandler(e) {
//     // ⭐️関数の作成.キーを押している時。
//     // ⭐️eは引き数。
//     if(e.key == "Right" || e.key == "ArrowRight"){
//       // 大抵のブラウザでは左右の矢印キーにそれぞれArrowLeftとArrowRightが対応している。
//       // ただし、IE/Edgeに対応するために、LeftとRightも確認する必要がある。
//       // ⭐️右を押した時。
//       rightPressed = true;
//       // rightPressedをtrueにする。
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft"){
//       // ⭐️左を押した時。
//       leftPressed = true;
//     }
//     else if(e.key == "ArrowUp"){
//       // dx = dx * 1.5;
//       // dy = dy * 1.5;
//       dx = dx / Math.abs(dx) * 10;
//       dy = dy / Math.abs(dy) * 10;
//       // ⭐️加速機能。
//     }
//     else if(e.key == "ArrowDown"){
//       dx = dx /10000;
//       dy = dy /10000;
//       // ⭐️減速機能。
//     }
//   }

//   function keyUpHandler(e) {
//     // ⭐️関数の作成.キーを話したと時。
//     // ⭐️eは引き数。
//     if(e.key == "Right" || e.key == "ArrowRight"){
//       // 大抵のブラウザでは左右の矢印キーにそれぞれArrowLeftとArrowRightが対応している。
//       // ただし、IE/Edgeに対応するために、LeftとRightも確認する必要がある。
//       // ⭐️右を押した時。
//       rightPressed = false;
//       // rightPressedをtrueにする。
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft"){
//       // ⭐️左を押した時。
//       leftPressed = false;
//     }
//     else if(e.key == "ArrowUp"){
//       dx = dx / Math.abs(dx) * 6;
//       dy = dy / Math.abs(dy) * 6;
//       // ⭐️加速機能を元に戻す。
//     }
//     else if(e.key == "ArrowDown"){
//       dx = dx / Math.abs(dx) * 6;
//       dy = dy / Math.abs(dy) * 6; 
//       // ⭐️減速機能を元に戻す。
//     }
//   }

//   function mouseMoveHandler(e) {
//   // この関数ではまずビューポイントの水平方向のマウスの位置(e.clientX)から
//   // キャンバスを左端とビューポートの左の距離(canvas.offsetLeft)を引いて
//   // relativeXの値を導出。これはキャンバスの左端とマウスカーソルの
//   // 距離をちょうど同じにする。
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//       paddleX = relativeX - paddleWidth / 3;
//     // ⭐️これでマウスで操作することが出来るようになる。数字はバーのスピード。
//     }
//   }

//   draw();
//   // ⭐️固定の10秒のフレームレートではなくブラウザに制御を託している。
//   // ブラウザはルレームレートを適切に同期し図形を必要な時だけ描画する。
//   // これは古いsetlnterval()メゾットよりも効率的で滑らかなアニメーションループを生み出す。

//   // var interval = setInterval(draw, 10);
//   // ゲームオーバーを実装する。インターバル変数を宣言する。

//   // ⭐️⭐️⭐️setInterval(draw,10)
//     // Canbasの映像を毎フレーム、定期的に更新し続けるためには
//     // 何度も実行される関数を定義する必要がある。
//     // setInterval()といったJavaScriptのタイミング関数を用いれば同じ関数を何度も実行できる。
//     // 無限に続くsetinterval()は10ミリ秒おきにずっと、あらいは自らが止めるまで続く。




    

//   // ctx.beginPath();
//   // // パスを開く。事前準備。
//   // ctx.rect(20, 40, 50, 50);
//   // // 四角の数値を決定する。
//   // ctx.fillStyle = "#FF0000";
//   // // 塗り潰しの色を設定。
//   // ctx.fill();
//   // // 塗り潰しの実行。
//   // ctx.closePath();
//   // // パスを閉じる。

//   // ctx.beginPath();
//   // // パスを開く。事前準備。
//   // ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
//   // // 丸を描く。
//   // ctx.fillStyle = "green";
//   // // 塗り潰しの色を設定。
//   // ctx.fill();
//   // // 塗り潰しの実行。
//   // ctx.closePath();
//   // // パスを閉じる。

//   // ctx.beginPath();
//   // // 四角を描写する。事前準備。
//   // ctx.rect(160, 10, 100, 40);
//   // // 四角の数値を決定する。
//   // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
//   // // 塗り潰しでは無い線を書く。
//   // ctx.stroke();
//   // // 線を描画の実行。
//   // ctx.closePath();
//   // // パスを閉じる。
// });

