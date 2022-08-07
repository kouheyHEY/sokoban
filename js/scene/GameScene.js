class GameScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        super({ key: 'GameScene' });

        // フィールドを管理するオブジェクト
        this.fieldManager = new FieldManager(FIELD_TYPE_NORMAL);
        this.player = null;
    }

    preload() {

        // マップファイルの読込
        this.load.json("map", DIR_MAPFILE_PUBLIC + "/map_test.json");
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

        // フィールドの読込結果を変数に代入
        let mapJson = this.cache.json.get("map");

        // フィールド上の各スプライトをスプライト管理用リストに追加
        for (let row = 0; row < this.fieldManager.fieldSizeRow; row++) {
            for (let col = 0; col < this.fieldManager.fieldSizeCol; col++) {

                // スプライトの種類が空白以外の場合
                if (mapJson.fieldData2d[row][col] != TYPE_BLANK) {
                    this.fieldManager.fieldUnitList.push(
                        {
                            "sprite":
                                this.physics.add.sprite(
                                    UNIT_SIZE / 2 + UNIT_SIZE * col,
                                    UNIT_SIZE / 2 + UNIT_SIZE * row,
                                    FIELD_SPRITE_IMG[mapJson.fieldData2d[row][col]]
                                ),
                            "row": row,
                            "col": col,
                            "type": mapJson.fieldData2d[row][col]
                        }
                    );
                }
            }
        }

        // フィールドを描画

        let change = this.add.text(150, 130, 'Change Scene!').setFontSize(20).setFontFamily("Arial").setOrigin(0.5).setInteractive();

        change.on('pointerdown', function (pointer) {
            this.scene.start('TitleScene');
        }, this);
    }
};