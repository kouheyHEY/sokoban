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

    /**
     * フィールド上の指定の位置にあるスプライトを返す
     * @param {int} _row 検索する位置の行 
     * @param {int} _col 検索する位置の列
     * @returns 指定の位置のスプライト（なければnull）
     */
    getSpriteOfPoint(_row, _col) {
        let fieldUnit = null;

        for (let unitListTmp of this.fieldGroundTypeList2d) {
            for (let unitTmp of unitListTmp) {
                if (unitTmp.row == _row && unitTmp.col == _col) {
                    fieldUnit = unitTmp;
                }
            }
        }

        return fieldUnit;
    }

    movePlayer() {
        if (this.playerMoveDir[IDX_DIR_X] != 0) {
            this.player.sprite.setVelocityX(PLAYER_SPEED * this.playerMoveDir[IDX_DIR_X]);
        } else if (this.playerMoveDir[IDX_DIR_Y] != 0) {
            this.player.sprite.setVelocityY(PLAYER_SPEED * this.playerMoveDir[IDX_DIR_Y]);
        }

        if (
            Math.abs(this.player.sprite.x - (this.player.col * UNIT_SIZE + UNIT_SIZE / 2)) >= UNIT_SIZE ||
            Math.abs(this.player.sprite.y - (this.player.row * UNIT_SIZE + UNIT_SIZE / 2)) >= UNIT_SIZE
        ) {
            this.player.col += this.playerMoveDir[IDX_DIR_X];
            this.player.row += this.playerMoveDir[IDX_DIR_Y];
            this.player.sprite.x = this.player.col * UNIT_SIZE + UNIT_SIZE / 2;
            this.player.sprite.y = this.player.row * UNIT_SIZE + UNIT_SIZE / 2;

            this.player.sprite.setVelocityX(0);
            this.player.sprite.setVelocityY(0);
            this.playerMoveDir = [];

            return false;
        } else {
            return true;
        }
    }

    adjustPlayerPos() {
        this.player.sprite.x = this.player.col * UNIT_SIZE + UNIT_SIZE / 2;
        this.player.sprite.y = this.player.row * UNIT_SIZE + UNIT_SIZE / 2;
    }
}