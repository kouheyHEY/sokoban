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
        this.movingSpriteFlg = false;
        this.isGoalFlg = false;
    }

    /**
     * 各パラメータの初期化
     */
    initParameters() {
        // フィールドを管理するオブジェクト
        this.fieldManager = new FieldManager(FIELD_TYPE_NORMAL);
        // グラフィクス管理用リスト
        this.movableAreaList = [];
        // 各フラグ
        this.drawMovableAreaFlg = false;
        this.movingPlayerFlg = false;
        this.movingSpriteFlg = false;
        this.isGoalFlg = false;


    }

    /**
     * マップを定義したJSONファイルをランダムに読み込む。
     */
    loadMap() {
        let mapId = Math.floor(Math.random() * 3);
        // マップファイルの読込
        this.load.json("map", DIR_MAPFILE_PUBLIC + "/map_test_" + mapId + ".json");
    }

    preload() {
        this.loadMap();
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
                                ).setDepth(TYPE_MOVABLE_AREA),
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
                            frameRate: PLAYER_ANIM_FRAME,
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
                            frameRate: PLAYER_ANIM_FRAME,
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
                            frameRate: PLAYER_ANIM_FRAME,
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
                            frameRate: PLAYER_ANIM_FRAME,
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
                                    ).setDepth(mapJson.fieldData2d[row][col]),
                                "row": row,
                                "col": col,
                                "type": String(mapJson.fieldData2d[row][col])
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
        // スプライトが移動中の場合
        if (this.movingPlayerFlg || this.movingSpriteFlg) {
            // プレイヤーの場合
            if (this.movingPlayerFlg) {
                this.movingPlayerFlg = this.fieldManager.moveSprite(true);
                // プレイヤー以外の場合
            } else if (this.movingSpriteFlg) {
                this.movingSpriteFlg = this.fieldManager.moveSprite(false);
            }
            // 全てが止まっている場合
            if (!this.movingPlayerFlg && !this.movingSpriteFlg) {
                // 移動可能エリアを描画する
                this.drawMovableAreaFlg = false;
            }
            // 止まっている場合
        } else {
            // スプライトの位置を常に調整する
            this.fieldManager.adjustSpritePos(true);
            this.fieldManager.adjustSpritePos(false);

        }
        // 移動可能方向を描画する
        if (!this.drawMovableAreaFlg) {
            this.drawMovableArea();
            this.drawMovableAreaFlg = true;
        }

        // ゴールした場合
        if (this.isGoalFlg) {
            // TODO: 処理を記載

            // 全てのオブジェクトを破棄
            this.fieldManager.destroyAll();
            // フラグ変数などの初期化
            this.isGoalFlg = false;
            this.drawMovableAreaFlg = false;
            this.movingPlayerFlg = false;
            this.movingSpriteFlg = false;

            // タッチされた場合、ゲームシーンに遷移する
            this.scene.start('TitleScene');
        }

    }

    /**
     * プレイヤーが移動可能なエリアに色を付ける
     */
    drawMovableArea() {
        // 移動方向に対するベクトルの配列を定義する
        let movableDirList = [[0, -1], [-1, 0], [1, 0], [0, 1]];
        // 各移動方向に対して以下の処理を繰り返す
        for (let dirList of movableDirList) {
            // 移動先の座標を定義する
            let toPoint = [
                this.fieldManager.player.col + dirList[IDX_DIR_X],
                this.fieldManager.player.row + dirList[IDX_DIR_Y],
            ];
            // 移動先の座標にあるスプライトのタイプを取得する
            let spriteTypeOfNextPoint =
                this.fieldManager.getSpriteTypeOfPoint(
                    toPoint[IDX_DIR_Y],
                    toPoint[IDX_DIR_X]
                );

            // 移動方向に通過可能なスプライトがある場合、または
            // 移動方向に移動可能なスプライトがある場合、または
            // 移動方向に取得可能なスプライトがある場合
            if (
                TYPE_PASSABLE_LIST.includes(spriteTypeOfNextPoint) ||
                TYPE_MOVABLE_LIST.includes(spriteTypeOfNextPoint) ||
                TYPE_ITEM_LIST.includes(spriteTypeOfNextPoint)
            ) {
                let movableArea = null;
                // 移動方向にあるスプライトが移動可能なスプライトの場合
                if (TYPE_MOVABLE_LIST.includes(spriteTypeOfNextPoint)) {
                    // 描画する移動可能エリアを設定する
                    movableArea = this.add.image(
                        toPoint[IDX_DIR_X] * UNIT_SIZE + UNIT_SIZE / 2,
                        toPoint[IDX_DIR_Y] * UNIT_SIZE + UNIT_SIZE / 2,
                        "square_movable_area_actionable"
                    ).setAlpha(MOVABLE_AREA_ALPHA)
                        .setInteractive()
                        .setDepth(TYPE_MOVABLE_AREA);

                    // 移動方向にあるスプライトが通過可能なスプライトの場合
                } else if (TYPE_PASSABLE_LIST.includes(spriteTypeOfNextPoint)) {
                    // 描画する移動可能エリアを設定する
                    movableArea = this.add.image(
                        toPoint[IDX_DIR_X] * UNIT_SIZE + UNIT_SIZE / 2,
                        toPoint[IDX_DIR_Y] * UNIT_SIZE + UNIT_SIZE / 2,
                        "square_movable_area"
                    ).setAlpha(MOVABLE_AREA_ALPHA)
                        .setInteractive()
                        .setDepth(TYPE_MOVABLE_AREA);

                    // 移動方向にあるスプライトが取得可能なスプライトの場合
                } else if (TYPE_ITEM_LIST.includes(spriteTypeOfNextPoint)) {
                    // 描画する移動可能エリアを設定する
                    movableArea = this.add.image(
                        toPoint[IDX_DIR_X] * UNIT_SIZE + UNIT_SIZE / 2,
                        toPoint[IDX_DIR_Y] * UNIT_SIZE + UNIT_SIZE / 2,
                        "square_movable_area"
                    ).setAlpha(MOVABLE_AREA_ALPHA)
                        .setInteractive()
                        .setDepth(TYPE_MOVABLE_AREA);
                }

                // 移動可能エリア管理用リストに追加する
                this.movableAreaList.push(movableArea);

                // 追加した移動可能エリアにクリックイベントを追加する
                movableArea.on('pointerdown', function (pointer) {

                    let toDir = [
                        Math.floor(pointer.x / UNIT_SIZE) - this.fieldManager.player.col,
                        Math.floor(pointer.y / UNIT_SIZE) - this.fieldManager.player.row
                    ];
                    if (TYPE_PASSABLE_LIST.includes(spriteTypeOfNextPoint)) {
                        // 移動中フラグを設定する
                        this.movingPlayerFlg = true;
                        // 移動方向を設定する
                        this.fieldManager.playerMoveDir = toDir;

                    } else if (TYPE_MOVABLE_LIST.includes(spriteTypeOfNextPoint)) {
                        // 移動中フラグを設定する
                        this.movingSpriteFlg = true;
                        // 移動方向を設定する
                        this.fieldManager.spriteMoveDir = toDir;
                        // 移動させるスプライトを設定する
                        this.fieldManager.setMovingSprite(
                            Math.floor(pointer.y / UNIT_SIZE),
                            Math.floor(pointer.x / UNIT_SIZE)
                        );

                    } else if (TYPE_ITEM_LIST.includes(spriteTypeOfNextPoint)) {
                        // ゴールフラグを設定する
                        this.isGoalFlg = true;
                        return;

                    }

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