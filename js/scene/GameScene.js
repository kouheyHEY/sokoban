class GameScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        super({ key: 'GameScene' });

        // フィールドを管理するオブジェクト
        this.fieldManager = new FieldManager(FIELD_TYPE_NORMAL);
        // グラフィクス管理用リスト
        this.movableAreaList = [];
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

                        // プレイヤーの各アニメーションの設定
                        // 正面
                        this.anims.create({
                            key: PLAYER_IMG_KEY_FRONT,
                            frames: this.anims.generateFrameNumbers(
                                FIELD_SPRITE_IMG[TYPE_PLAYER],
                                {
                                    start: PLAYER_IMG_FRONT * PLAYER_IMG_ANM_NUM,
                                    end: (PLAYER_IMG_FRONT + 1) * PLAYER_IMG_ANM_NUM - 1
                                }
                            ),
                            frameRate: 10,
                            repeat: -1
                        });
                        // 右
                        this.anims.create({
                            key: PLAYER_IMG_KEY_RIGHT,
                            frames: this.anims.generateFrameNumbers(
                                FIELD_SPRITE_IMG[TYPE_PLAYER],
                                {
                                    start: PLAYER_IMG_RIGHT * PLAYER_IMG_ANM_NUM,
                                    end: (PLAYER_IMG_RIGHT + 1) * PLAYER_IMG_ANM_NUM - 1
                                }
                            ),
                            frameRate: 10,
                            repeat: -1
                        });
                        // 左
                        this.anims.create({
                            key: PLAYER_IMG_KEY_LEFT,
                            frames: this.anims.generateFrameNumbers(
                                FIELD_SPRITE_IMG[TYPE_PLAYER],
                                {
                                    start: PLAYER_IMG_LEFT * PLAYER_IMG_ANM_NUM,
                                    end: (PLAYER_IMG_LEFT + 1) * PLAYER_IMG_ANM_NUM - 1
                                }
                            ),
                            frameRate: 10,
                            repeat: -1
                        });
                        // 後ろ
                        this.anims.create({
                            key: PLAYER_IMG_KEY_BACK,
                            frames: this.anims.generateFrameNumbers(
                                FIELD_SPRITE_IMG[TYPE_PLAYER],
                                {
                                    start: PLAYER_IMG_BACK * PLAYER_IMG_ANM_NUM,
                                    end: (PLAYER_IMG_BACK + 1) * PLAYER_IMG_ANM_NUM - 1
                                }
                            ),
                            frameRate: 10,
                            repeat: -1
                        });

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

        // アニメーションを開始する
        this.fieldManager.player.sprite.anims.play(PLAYER_IMG_KEY_FRONT, true);
    }

    update() {
        // 移動中の場合
        if (this.movingPlayerFlg) {
            this.movingPlayerFlg = this.fieldManager.movePlayer();
            if (!this.movingPlayerFlg) {
                this.drawMovableAreaFlg = false;
            }
            // 止まっている場合
        } else {
            // プレイヤーの位置を常に調整する
            this.fieldManager.adjustPlayerPos();

            // アニメーションを止める
            // this.fieldManager.player.sprite.anims.stop();

        }
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
                this.fieldManager.player.col + dirList[IDX_DIR_X],
                this.fieldManager.player.row + dirList[IDX_DIR_Y],
            ];

            // 移動方向にスプライトがない場合
            if (
                this.fieldManager.getSpriteOfPoint(toPoint[IDX_DIR_Y], toPoint[IDX_DIR_X]) == null
            ) {

                // 描画する移動可能エリアを設定する
                let movableArea = this.add.image(
                    toPoint[IDX_DIR_X] * UNIT_SIZE + UNIT_SIZE / 2,
                    toPoint[IDX_DIR_Y] * UNIT_SIZE + UNIT_SIZE / 2,
                    "square_movable_area"
                ).setAlpha(MOVABLE_AREA_ALPHA).setInteractive();

                // 移動可能エリア管理用リストに追加する
                this.movableAreaList.push(movableArea);

                // 追加した移動可能エリアにクリックイベントを追加する
                movableArea.on('pointerdown', function (pointer) {

                    // 移動中フラグを設定する
                    this.movingPlayerFlg = true;

                    // 移動方向をスプライト管理オブジェクトに設定する
                    let toDir = [Math.floor(pointer.x / UNIT_SIZE) - this.fieldManager.player.col, Math.floor(pointer.y / UNIT_SIZE) - this.fieldManager.player.row];
                    this.fieldManager.playerMoveDir = toDir;

                    // 右方向への移動の場合
                    if (toDir[IDX_DIR_X] > 0) {
                        this.fieldManager.player.sprite.anims.play(PLAYER_IMG_KEY_RIGHT, true);
                        // 左方向へ移動の場合
                    } else if (toDir[IDX_DIR_X] < 0) {
                        this.fieldManager.player.sprite.anims.play(PLAYER_IMG_KEY_LEFT, true);
                        // 下方向に移動の場合
                    } else if (toDir[IDX_DIR_Y] > 0) {
                        this.fieldManager.player.sprite.anims.play(PLAYER_IMG_KEY_FRONT, true);
                        // 上方向に移動の場合
                    } else if (toDir[IDX_DIR_Y] < 0) {
                        this.fieldManager.player.sprite.anims.play(PLAYER_IMG_KEY_BACK, true);
                    }

                    // 移動可能エリア管理用リストをクリアする
                    for (let m of this.movableAreaList) {
                        m.destroy();
                    }
                    this.movableAreaList = [];
                }, this);
            }
        }
    }
};