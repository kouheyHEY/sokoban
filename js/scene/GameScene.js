class GameScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        super({ key: 'GameScene' });

        // フィールドを管理するオブジェクト
        this.fieldManager = new FieldManager(FIELD_TYPE_NORMAL);
        // グラフィクス管理用リスト
        this.graphicsList = [];
        // 各フラグ
        this.drawMovableAreaFlg = false;
        this.movingPlayerFlg = false;
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
                if (
                    mapJson.fieldData2d[row][col] != TYPE_BLANK
                ) {
                    // スプライトの種類がプレイヤーの場合
                    if (mapJson.fieldData2d[row][col] == TYPE_PLAYER) {
                        this.fieldManager.player =
                        {
                            "sprite":
                                this.physics.add.sprite(
                                    UNIT_SIZE / 2 + UNIT_SIZE * col,
                                    UNIT_SIZE / 2 + UNIT_SIZE * row,
                                    FIELD_SPRITE_IMG[TYPE_PLAYER]
                                ),
                            "row": row,
                            "col": col
                        }
                        // スプライトの種類がプレイヤー以外の場合
                    } else {
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
        }
    }

    update() {
        // 移動可能方向を描画する
        if (!this.drawMovableAreaFlg) {
            this.drawMovableArea();
            this.drawMovableAreaFlg = true;
        }


    }

    drawMovableArea() {
        let movableDirList = [[0, -1], [-1, 0], [1, 0], [0, 1]];
        for (let dirList of movableDirList) {
            let toPoint = [
                this.fieldManager.player.col + dirList[0],
                this.fieldManager.player.row + dirList[1],
            ];

            // 移動方向にスプライトがない場合
            if (
                this.fieldManager.getSpriteOfPoint(toPoint[1], toPoint[0]) == null
            ) {

                // グラフィクスで描画する矩形を設定する
                let movableRect = new Phaser.Geom.Rectangle(
                    UNIT_SIZE * toPoint[1],
                    UNIT_SIZE * toPoint[0],
                    UNIT_SIZE,
                    UNIT_SIZE
                );
                // グラフィクス管理用リストに追加する
                this.graphicsList.push(
                    this.add.graphics()
                        .fillStyle(0x55ccff, 0.7)
                        .fillRectShape(movableRect)
                );
                // ポインターを設定する
                let pointer = this.input.activePointer;

                // 追加したグラフィクスにクリックイベントを追加する
                this.graphicsList.slice(-1)[0].setInteractive(movableRect, () => {

                    // クリックされた場合
                    if (pointer.isDown && !this.movingPlayerFlg) {
                        console.log(pointer);
                        // 移動中フラグを設定する
                        this.movingPlayerFlg = true;

                        // グラフィクス管理用リストをクリアする
                        for (let g of this.graphicsList) {
                            g.clear();
                        }
                    }
                });
            }
        }
    }
};