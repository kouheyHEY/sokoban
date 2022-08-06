
class TitleScene extends Phaser.Scene {

    // コンストラクタ
    constructor() {
        super({ key: 'TitleScene' });
    }

    // 画面生成時の実行関数
    create() {

        let sceneName = this.add.text(150, 70, 'TitleScene').setFontSize(30).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        let change = this.add.text(150, 130, 'Change Scene!').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        change.on('pointerdown', function (pointer) {
            this.scene.start('GameScene');
        }, this);
    }
};