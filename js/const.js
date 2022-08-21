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
    "slime",
    "hole_grass_1",
    "box_wood",
    "block_Rock",
    "goal_houseRamen",
    "hole_grass_3"
];

// プレイヤーのスプライト（正面、右、左、後ろの順番）
const PLAYER_IMG_FRONT = 0;
const PLAYER_IMG_RIGHT = 1;
const PLAYER_IMG_LEFT = 2;
const PLAYER_IMG_BACK = 3;
const PLAYER_IMG_ANM_NUM = 4;

const PLAYER_IMG_KEY_FRONT = "front";
const PLAYER_IMG_KEY_RIGHT = "right";
const PLAYER_IMG_KEY_LEFT = "left";
const PLAYER_IMG_KEY_BACK = "back";

// 各ユニットのタイプ
const TYPE_BLANK = "0";
const TYPE_PLAYER = "1";
const TYPE_HOLE = "2";
const TYPE_BOX = "3";
const TYPE_ROCK = "4";
const TYPE_RAMEN = "5";
const TYPE_HOLE_FILL = "6";

const TYPE_MOVABLE_AREA = 100;

// 移動可能オブジェクト
const TYPE_MOVABLE_LIST = [
    TYPE_PLAYER,
    TYPE_BOX
];

// 通過可能オブジェクト
const TYPE_PASSABLE_LIST = [
    TYPE_BLANK,
    TYPE_HOLE_FILL
];

// ユニットのサイズ
const UNIT_SIZE = 96;

// スプライトの移動速度
const SPRITE_SPEED = 180;

// プレイヤーのアニメーションループフレーム速度
const PLAYER_ANIM_FRAME = 8;

// オブジェクトの移動方向配列の添え字
const IDX_DIR_X = 0;
const IDX_DIR_Y = 1;

// 移動可能エリアの透明度
const MOVABLE_AREA_ALPHA = 0.7;

/* 全シーン共通変数 END */