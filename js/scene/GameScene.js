
class GameScene extends Phaser.Scene {

    // コンストラクタ
    constructor() {
        super({ key: 'GameScene' });
    }

    // 画面生成時の実行関数
    create() {

        let sceneName = this.add.text(150, 70, 'GameScene').setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        let change = this.add.text(150, 130, 'Change Scene!').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        change.on('pointerdown', function (pointer) {
            this.scene.start('TitleScene');
        }, this);
    }
};