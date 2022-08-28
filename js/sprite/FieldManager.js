class FieldManager {

    /**
     * コンストラクタ
     * @param {int} _fieldType フィールドの広さを決める変数
     */
    constructor(_fieldType) {
        // プレイヤーを管理するオブジェクト
        this.player = null;
        // フィールド上のスプライトを管理するリスト
        this.fieldUnitList = [];
        // フィールドの背景に使用する画像の種類のリスト
        this.fieldGroundTypeList2d = [];
        // 移動方向
        this.playerMoveDir = [];
        this.playerMoveDist = 0;
        this.spriteMoveDir = [];
        this.spriteMoveDist = 0;
        this.movingSprite = null;

        // フィールドサイズが通常の場合
        if (_fieldType == FIELD_TYPE_NORMAL) {
            this.fieldSizeRow = FIELD_SIZE_ROW;
            this.fieldSizeCol = FIELD_SIZE_COL;

            // フィールドのサイズが広い場合
        } else if (_fieldType == FIELD_TYPE_WIDE) {
            this.fieldSizeRow = FIELD_SIZE_ROW * 2;
            this.fieldSizeCol = FIELD_SIZE_COL * 2;
        }

        // フィールドの背景の設定
        for (let i = 0; i < this.fieldSizeRow; i++) {
            let fieldTypeListTmp = [];
            for (let j = 0; j < this.fieldSizeCol; j++) {

                // 表示する画像の種類をランダムに決定する
                fieldTypeListTmp[j] = Math.floor(Math.random() * 2)
            }
            this.fieldGroundTypeList2d[i] = fieldTypeListTmp;
        }
    }

    destroyAll() {
        for (let i = this.fieldUnitList.length - 1; i <= 0; i--) {
            this.fieldUnitList[i].sprite.destroy();
        }
        this.player.sprite.destroy();
    }

    /**
     * フィールド上の指定の位置にあるスプライトを返す
     * @param {int} _row 検索する位置の行 
     * @param {int} _col 検索する位置の列
     * @returns 指定の位置のスプライトの種類（なければ0）
     */
    getSpriteTypeOfPoint(_row, _col) {
        let fieldUnit = this.getSpriteByPos(_row, _col);
        if (fieldUnit == null) {
            return TYPE_BLANK;
        } else {
            return fieldUnit.type;
        }
    }

    /**
     * スプライトを移動方向に移動させる
     * @param _isPlayer プレイヤーの場合はtrue
     * @returns 動いている場合はtrue
     */
    moveSprite(_isPlayer) {
        let moveDirTmp = [];
        let moveSpriteTmp = null;
        let moveDistTmp = 0;
        if (_isPlayer) {
            moveDirTmp = this.playerMoveDir;
            moveSpriteTmp = this.player;
            moveDistTmp = this.playerMoveDist;
        } else {
            moveDirTmp = this.spriteMoveDir;
            moveSpriteTmp = this.movingSprite;
            moveDistTmp = this.spriteMoveDist;
        }
        // スプライトの移動方向に速度を設定する
        // スプライトがx方向に動く場合
        if (moveDirTmp[IDX_DIR_X] != 0) {
            // x方向に速度を設定する
            moveSpriteTmp.sprite.setVelocityX(SPRITE_SPEED * moveDirTmp[IDX_DIR_X]);
            moveDistTmp = Math.abs(
                moveSpriteTmp.sprite.x - (moveSpriteTmp.col * UNIT_SIZE + UNIT_SIZE / 2)
            );

            // スプライトがy方向に動く場合
        } else if (moveDirTmp[IDX_DIR_Y] != 0) {
            // y方向に速度を設定する
            moveSpriteTmp.sprite.setVelocityY(SPRITE_SPEED * moveDirTmp[IDX_DIR_Y]);
            moveDistTmp = Math.abs(
                moveSpriteTmp.sprite.y - (moveSpriteTmp.row * UNIT_SIZE + UNIT_SIZE / 2)
            );
        }

        // 移動した距離が一定以上の場合
        if (moveDistTmp >= UNIT_SIZE) {

            // スプライトの移動を停止する
            moveSpriteTmp.sprite.setVelocityX(0);
            moveSpriteTmp.sprite.setVelocityY(0);

            // 移動中のスプライトがBOXの場合かつ
            // 移動先に穴がある場合
            if (!_isPlayer && moveSpriteTmp.type == TYPE_BOX
                && this.getSpriteTypeOfPoint(
                    moveSpriteTmp.row + moveDirTmp[IDX_DIR_Y],
                    moveSpriteTmp.col + moveDirTmp[IDX_DIR_X]
                ) == TYPE_HOLE
            ) {
                // 移動先の穴に箱を落とす
                let hole = this.getSpriteByPos(
                    moveSpriteTmp.row + moveDirTmp[IDX_DIR_Y],
                    moveSpriteTmp.col + moveDirTmp[IDX_DIR_X]
                );
                hole.type = TYPE_HOLE_FILL;
                hole.sprite.setTexture(FIELD_SPRITE_IMG[TYPE_HOLE_FILL]);

                // 移動した箱のスプライトを削除する
                this.fieldUnitList[this.getIndexOfSprite(moveSpriteTmp.row, moveSpriteTmp.col)].sprite.destroy();
                delete this.fieldUnitList[this.getIndexOfSprite(moveSpriteTmp.row, moveSpriteTmp.col)];
                this.fieldUnitList = this.fieldUnitList.filter(Boolean);

                this.movingSprite = null;
                this.spriteMoveDist = 0;

                return false;
            }

            // スプライトの位置を調整し、座標を変更する
            moveSpriteTmp.col += moveDirTmp[IDX_DIR_X];
            moveSpriteTmp.row += moveDirTmp[IDX_DIR_Y];
            moveSpriteTmp.sprite.x = moveSpriteTmp.col * UNIT_SIZE + UNIT_SIZE / 2;
            moveSpriteTmp.sprite.y = moveSpriteTmp.row * UNIT_SIZE + UNIT_SIZE / 2;

            moveDirTmp = [];
            moveDistTmp = 0;

            return false;
        } else {
            return true;
        }
    }

    /**
     * 移動後のスプライトの位置を調整する
     * @param {boolean} _isPlayer プレイヤーかどうか
     */
    adjustSpritePos(_isPlayer) {
        if (_isPlayer) {
            this.player.sprite.x = this.player.col * UNIT_SIZE + UNIT_SIZE / 2;
            this.player.sprite.y = this.player.row * UNIT_SIZE + UNIT_SIZE / 2;
        } else if (this.movingSprite != null) {
            this.movingSprite.sprite.x = this.movingSprite.col * UNIT_SIZE + UNIT_SIZE / 2;
            this.movingSprite.sprite.y = this.movingSprite.row * UNIT_SIZE + UNIT_SIZE / 2;
        }
    }

    /**
     * 指定の位置にあるスプライトを移動中のスプライトに設定する
     * @param {int} _row 指定する行
     * @param {int} _col 指定する列
     */
    setMovingSprite(_row, _col) {
        this.movingSprite = this.getSpriteByPos(_row, _col);
        if (this.movingSprite == null) {
            this.movingSprite = this.player;
        }
    }

    /**
     * 指定の位置にスプライトがあるかどうか判定する
     * @param {int} _row 指定した行
     * @param {int} _col 指定した列
     * @returns 指定した座標のスプライト（なければnull）
     */
    getSpriteByPos(_row, _col) {
        for (let unitTmp of this.fieldUnitList) {
            if (unitTmp.row == _row && unitTmp.col == _col) {
                return unitTmp;
            }
        }
        return null;
    }

    /**
     * 指定した位置にあるスプライト、スプライト管理リスト上でのインデックスを返す
     * @param {int} _row 指定した行
     * @param {int} _col 指定した列
     * @returns スプライト管理リストでのスプライトのインデックス（鳴ければ0）
     */
    getIndexOfSprite(_row, _col) {
        let spriteIdx = 0;
        for (let unitIdx in this.fieldUnitList) {
            if (
                this.fieldUnitList[unitIdx].row == _row &&
                this.fieldUnitList[unitIdx].col == _col
            ) {
                spriteIdx = unitIdx;
            }
        }
        return spriteIdx;
    }
}