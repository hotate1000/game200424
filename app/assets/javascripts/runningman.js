// $(function(){

//   // window.alert("OKを押した後、キャラクタが着地し、パワーを溜めます！\nその後 ↑ で開始してください！画面外にキャラクタが出ないようにしてください！")
  

//   var canvas = document.getElementById("running-myCanvas");
//   // HTMLのタグをHTMLタグのキャンバスに反映する。画面の準備。
//   var ctx = canvas.getContext("2d");
//   // 変数にデータを代入するキャンバス描画するために必要な処理。二次元の画面。画面の準備。
//     // canvas.width = window.innerWidth;
//     // canvas.height = window.innerHeight;

//   // キャンバスの幅と高さ。画面の準備。
//   // var size = 15;
//   // document.body.appendChild(canvas);
//   // 上で作ったHTMLのボディに(document)にappendChildを追加する。画面の準備。



//   var perm = [];
//   // 山道の凸凹を作る。山の描写。

//   while (perm.length < 255) {
//   // permの最大値が255。255になるまで繰り返す。山の描写。
//     while (perm.includes(val = Math.floor(Math.random() * 255)));
//     // Math.floor整数（小数点繰上げ）をとる。Math.random()0〜1の値をランダムに出力する。
//     // 255かけることによって、0〜255の整数が入る。繰り返し。山の描写。
//     perm.push(val);
//     // 0〜255の整数が入っていたら処理が実行される。
//     // whileの条件。配列にvalの値を入れる。山の描写。
//   }
  

//   var lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
//   // 関数を変数に入れている。線形分離。ベクトルa、bに分断し、tをかけることで？
//   // 山の斜面を凸凹を表している。山の描写。
//   // (1 - Math.cos(t * Math.PI))/ 2 線形分離の調整を行っている。
//   // これは 1 - cos(t * π)を行っている。πの整数倍となるので、cosは 1 か -1 となる。それを割2。
//   // ⭐️ここをいじれば山の斜面を変更することが出来る。山の斜面。


//   var noise = x => {
//     // ノイズを言う関数を指定する。山の描写。
//     x = x * 0.01 % 255;
//     // ⭐️⭐️⭐️山がの数を変更する。
//     // 配列permの要素数は255。c.widthは255以上の値となっている。よって、配列のindexとしては
//     // 不適な値が入る。
//     // 上記を解決するために255で割った余りを配列のindexに指定する.
//     // 0.01倍することによってギザギザ（山の斜面）を拡大する。ズームアップ。山の描写。
//     return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
//     // ノイズ関数に線形分離の値を入れる。Math.floor整数（小数点繰上げ）。
//     // 適当に決定しても良い。山の描写。
//   }


//   var player = new function() {
//   // プレイヤーを定義する。関数の宣言。プレイヤーの定義。
//     this.x = canvas.width / 2;
//     // キャンバスの中央。
//     this.y = 0;
//     // 一番上。
//     this.ySpeed = 0;
//     // キャラクターが落ちてくるスピード。
//     this.rot = 0;
//     // 回転角度。
//     this.rSpeed = 0;
//     // 回転スピードを設定する。プレーヤーの角度。
//     this.img = new Image();
//     // イメージ変数の作成。
//     this.img.src = "/assets/moto2.png";

    
//     // ⭐️⭐️⭐️イメージの読み込み。画像ファイルから。
//     this.draw = function() {
//       // draw描画するための関数。
//       var p1 = canvas.height - noise(t + this.x) * 0.4;
//       // ⭐️⭐️⭐️山の高さの調整。
//       // キャラクターを山の斜面を走らせる。山に使用したノイズを流用することによって
//       // 山の上を走っているように見せれる。
//       // ⭐️noise(t + this.x)this.xを足している。プレイヤーの高さを反映している。
//       var p2 = canvas.height - noise(t + 5 + this.x) * 0.4;
//       var grounded = 0
//       // 地面設置のグラフを設置。プレイヤーの角度を編集する。
//       // if(p1 - size > this.y) {
//       if(p1 - 25 > this.y) {
//       // ⭐️p1は山の斜面の境界の位置を示している。
//       // キャラクターのy座標が山の斜面に一致するかどうか条件分岐している。
//         this.ySpeed = this.ySpeed + 0.1;
//         // ⭐️スピードを調整している。落ちてくるスピード。
//       } else {
//         // 山の斜面に当たると反応する。
//         //this.y = p1 - size;
//         this.ySpeed = this.ySpeed - (this.y - (p1 - 25));
//         // ⭐️⭐️⭐️振動を与える。
//         // バウンドするようになる。上下の運動が反応する。
//         // ⭐️y方向のスピードがy座標の位置によってかわる。バウンドするようになる。
//         // ⭐️0地点に当たって時におこる処理。
//         this.y = p1 - 23.8;
//         // ⭐️キャラクターにバウンドを与える。
//         // 山の斜面に触れると、this.yとp1が固定される。山ジグザグ式なので、
//         // これがないとどんどん落ちいく。
//         // -20によりプレイヤーの高さを調整する。
//         // this.ySpeed = 0;
//         // ⭐️山の斜面に当たるとySpeedが0になる。これ以上落ちなくなる。 
//         // ⭐️自動でバウンドするようになる。
//         grounded = 1;
//         // ⭐️地面にふれると1を代入させる？
//         // 地面に触れていることがわかる。
//       }


//       this.y = this.y + this.ySpeed;
//       // ｙスピードの分だけ速度を上げて（下げて）いく。キャラクターが降下するようになる。

//       if(!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5) {
//       // x方向のマイナスにスピードアップ。90°以上に傾いた時。
//       // ⭐️⭐️⭐️ゲームオーバー関係。
//         playing = false;
//       // ゲームオーバーの条件。下記に記載。
//         this.rSpeed = 30;
//       // ⭐️回転スピード地面に接着している時。
//         k.ArrowUp = 10;

//         this.x -= speed * 18;
//       // 回転スピードを早くする。
//       }

//       var angle = Math.atan2((p2 - 25) - this.y, (this.x + 5) - this.x);
//       // ⭐️変数を宣言。プレイヤーの角度を変更する。
//       // Math.atan2()関数、Math.atan2(y,x)に対して点(0,0)から点(x,y)までの半直線と、
//       // 正のx軸の間の平面上での角度(ラジアン単位)を返す。
//       // キャラクターのx,y座標をもとにアングルを設定している。
//       // this.rot = angle;
//       // this.y += this.ySpeed;



//       // if(grounded && Math.abs(this.rot) > Math.PI * 0.5) {
//       if(grounded && playing) {
//         // 地面にふれたら処理が行われる。
//         this.rot = 0;
//         // this.rot = this.rot - (this.rot - angle) * 0.5;
//         // ⭐️キャラクタの角度を変更する？初めの位置と地面に触れた時の位置。
//         this.rSpeed = this.rSpeed - (angle -this.rot);
//       }
//       this.rSpeed = this.rSpeed + (k.ArrowLeft - k.ArrowRight) * 0.5;
//       // ⭐️⭐️⭐️キーの回転スピード。
//       this.rot = this.rot - this.rSpeed * 0.015;
//       // ⭐️⭐️⭐️プレイヤーの回転スピード。

//       if(this.rot > Math.PI) this.rot = -Math.PI;
//       if(this.rot < -Math.PI) this.rot = Math.PI;
//       // 回転関係の設定？よく分からない？


//       ctx.save();
//       // 画面を保存する。再描状態を保存する。restore()とセット。
//       ctx.translate(this.x,this.y);
//       // ⭐️ctx.translate画面を移動させる。画面の調整。
//       ctx.rotate(this.rot);
//       // キャラのx,y座標を元にキャンバスを回転させる。
//       // save()内あるのでキャラの画像のみ回転する。今回は
//       ctx.drawImage(this.img, -25, -25, 50, 50);
//       // ctx.drawImage画像を描画するために使用する。
//       // ⭐️tx.drawImage(取込む画像, 横の位置, 高さの位置, プレイヤーの画像横幅, プレイヤーの画像縦幅)
//       ctx.restore();
//       // 画面を保存する。再描状態を保存する。save()とセット。
//     }
//   }


  

//   var t = 0;
//   // ループするために記載。アニメーションの起動。ループするたびにtの値が増加する。下のt。

//   var speed = 0;
//   // スピードの宣言。という配列の作成。

//   var playing = true;
//   // playingを定義する。play出来るか出来ないかを設定。ゲームオーバ関係。
//   // falsになると出来ないように


//   var k = {ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0};
//   // ⭐️矢印キー用のキーの宣言。初めの値
//   // {ArrowUp: 上矢印, ArrowDown: 下矢印, ArrowLeft: 左矢印, ArrowRight: 右矢印};
//   // 値を入れてビューを設定することで、配列が完成する。

  
//   // var



//   function loop() {
//   // アニメーションを繰り返して利用するためloop関数を使用する。
//   // パラパラ漫画のイメージ。画面の準備。繰り返し。
//     // speed = speed - (speed - (k.ArrowUp - k.ArrowDown)) * 0.1;
//     // speed = ((k.ArrowUp) / (k.ArrowUp)) * 0.1;
//     if(speed > 0) {
//       t = t + speed * 7;

//       } else {
//         speed = speed + k.ArrowUp ;
//         t = t + speed * 7;
//       // t = t + 10;
//     // k.ArrowUp = 100;
//     // ⭐️キーを押すことによって、スピードを変更することが出来る。画面の描写。
//       }
//     // t = t +2
//     // ループするために記載。アニメーションの移動。ループするたびにtの値が増加する。下のt。
//     // noiseの値も変わるのでアニメーションしているように見える。
//     // ⭐️画面のループ回数を変更する。
//     // * speedによって、コマンドによって速度をあげる。画面移動の。
//     // *にすることにより、コマンドを使用することが出来る。
//     // ctx.fillStyle = "rgba(0,0,0,1)";
//     // ctx.fillStyle = "red";
//     // ctx.fillRect(0, 0, canvas.width, canvas.height);
//     // ⭐️⭐️⭐️背景赤色。
//     // バック画面。fillStyle塗り潰し。画面の描写。
//     var img = new Image();
//     // img.src = '/assets/ajpeg';
//     img.src = "/assets/haimen.jpg";
    
//     // 画像読み込み終了してから描画
//     img.onload = function(){
//         ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
//         // drawImage(image,720,480);
//     }




//     // ⭐️四角形を描写するもの、fillRect( 左上X座標, 左上Y座標, 四角形の幅, 四角形の高さ)
//     // 山の描写。
    
//     ctx.fillStyle = "rgb(250, 180, 100)";
//     // 山の色。山の描写。
//     ctx.beginPath();
//     // beginPath()、線を描画するために使用。山の斜面。山の描写。
//     ctx.moveTo(0, canvas.height);
//     // context.moveTo(x,y)新しいサブパスの開始点を座標指定する。
//     // サブパスとは、パスを構成する線の一本のこと。
//     // 今回はy=0は左上隅。c.heightは左下隅。
//     // for loopにてどんどん次の点を決めていく。山の描写。


//     for (var i = 0; i < canvas.width; i++) {
//     // 山の斜面をどんどん右から左に移動させるため。
//     // 細かい点を分割したもの連続表示。山の描写。
//       ctx.lineTo(i, canvas.height - noise(t + i) * 0.4);
//       // ⭐️⭐️⭐️山の高さを描写。ここ以外にも編集する必要がある。
//       // lineTo線を引く関数。lineTo(始点, 終点)を表示させる。山の斜面。
//       // c.height - を追加することによって山の高さを編集する。
//       // ⭐️0.25倍することによって山の高さを編集する。
//       // この山のギザギザはlineToの後に行う。
//       // noise(t + i) tをたすことによって、画面が動いているようになる。
//       // iは連続表示？消すと横線になる。山の点を保存表現？
//     }


//     ctx.lineTo(canvas.width, canvas.height);
//     // ループが終わるとlineTo線を引く関数で、右端を指定。終点。山の描写。
//     ctx.fill();
//     // ctx.fillの間でlineTo山の線引きをループさせ塗りつぶす。山の斜面。
//     player.draw();
//     // プレイヤーの読み込み。プレイヤーの表示。
//     requestAnimationFrame(loop);
//   // ブラウザにアニメーションを行たいことを知らせ、指定した関数を呼び出して次の再描画の前にアニメーションを更新することを要求する。
//   // 短い時間で画面を更新する。画面の描写。画面の繰り返し。
//   }


//   onkeydown = d => k[d.key] = 1;
//   // onkeydownキーを押す時。キーを配列にして入れる？
//   onkeyup = d => k[d.key] = 0;
//   // onkeyupキーを離した時、キーを配列に入れる？押したキーの名前？
//   // ⭐️押しているか押していないか判断する記述。

//   loop();
//   // ループの開始。画面の繰り返し。
// });

