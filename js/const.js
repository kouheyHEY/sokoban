/* 全シーン共通変数 START */
// 画面サイズ
const D_WIDTH = 672;
const D_HEIGHT = 672;

// マップファイルのディレクトリ
const DIR_MAPFILE = "./assets/maps";
const DIR_MAPFILE_PUBLIC = DIR_MAPFILE + "/public";
/* 全シーン共通変数 END */

/* ゲームシーン変数 START */
// 標準のフィールドサイズ
const FIELD_SIZE_ROW = 7;
const FIELD_SIZE_COL = 7;

// フィールドサイズの種類（フィールドの広さを決める変数の値）
const FIELD_TYPE_NORMAL = 1;
const FIELD_TYPE_WIDE = 2;

// フィールドに表示する画像の設定用配列
const FIELD_BG_IMG = [
    "field_grass_1",
    "field_grass_2",
];
const FIELD_SPRITE_IMG = [
    "",
    "slime_front_normal_1",
    "box_wood",
    "hole_grass_1",
    "block_Rock",
    "goal_houseRamen"
];

// プレイヤーのスプライト（正面、右、左、後ろの順番）
const PLAYER_IMG = [
    [
        "slime_front_normal_1",
        "slime_front_normal_2",
        "slime_front_normal_3"
    ],
    [
        "slime_right_normal_1",
        "slime_right_normal_2",
        "slime_right_normal_3"],
    [
        "slime_left_normal_1",
        "slime_left_normal_2",
        "slime_left_normal_3"],
    [
        "slime_back_normal_1",
        "slime_back_normal_2",
        "slime_back_normal_3"]
];
const PLAYER_IMG_FRONT = 0;
const PLAYER_IMG_RIGHT = 1;
const PLAYER_IMG_LEFT = 2;
const PLAYER_IMG_BACK = 3;
const PLAYER_IMG_ANM_NUM = 3;

// 各ユニットのタイプ
const TYPE_BLANK = "0";
const TYPE_PLAYER = "1";
const TYPE_BOX = "2";
const TYPE_HOLE = "3";
const TYPE_ROCK = "4";
const TYPE_RAMEN = "5";

// ユニットのサイズ
const UNIT_SIZE = 96;

// プレイヤーの移動速度
const PLAYER_SPEED = 180;

// オブジェクトの移動方向配列の添え字
const IDX_DIR_X = 0;
const IDX_DIR_Y = 1;

/* 全シーン共通変数 END */