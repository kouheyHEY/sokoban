class GameScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        super({ key: 'GameScene' });

        // フィールドを管理するオブジェクト
        this.fieldManager = new FieldManager(FIELD_TYPE_NORMAL);
    }

    // 画面生成時の実行関数
    create() {

        // フィールドの背景の描画
        for (let row = 0; row < this.fieldManager.fieldSizeRow; row++) {
            for (let col = 0; col < this.fieldManager.fieldSizeCol; col++) {
                this.add.image(
                    UNIT_SIZE / 2 + UNIT_SIZE * col,
                    UNIT_SIZE / 2 + UNIT_SIZE * row,
                    FIELD_BG_IMG[this.fieldManager.fieldGroundTypeList2d[row][col]]
                );
            }
        }

        let change = this.add.text(150, 130, 'Change Scene!').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        change.on('pointerdown', function (pointer) {
            this.scene.start('TitleScene');
        }, this);
    }
};