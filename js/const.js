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

// 各ユニットのタイプ
const TYPE_BLANK = "0";
const TYPE_PLAYER = "1";
const TYPE_BOX = "2";
const TYPE_HOLE = "3";
const TYPE_ROCK = "4";
const TYPE_RAMEN = "5";

// ユニットのサイズ
const UNIT_SIZE = 96;
/* 全シーン共通変数 END */