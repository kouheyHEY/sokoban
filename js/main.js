

// Phaser3の設定データ
const config = {
    type: Phaser.AUTO,

    // 画面の幅
    width: D_WIDTH,

    // 画面の高さ
    height: D_HEIGHT,

    // アンチエイリアス
    antialias: false,

    // シーン設定
    scene: [
        TitleScene,
        GameScene
    ],

    fps: {
        target: 30,
        forceSetTimeOut: true
    },

    physics: {
        default: "arcade",
        arcade: {
            // スプライトに緑の枠を表示
            debug: true,
            // 重力の方向と強さ
            gravity: {
            }
        }
    },
}

// ゲームの開始
const phaser = new Phaser.Game(config);

function preload() {
    console.log("preload!!");
}

function create() {
    console.log("create!!");
}

function update() {
    console.log("update!!");
}