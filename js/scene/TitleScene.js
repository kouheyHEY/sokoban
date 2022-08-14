class TitleScene extends Phaser.Scene {

    // コンストラクタ
    constructor() {
        super({ key: 'TitleScene' });
    }

    // 画面生成前の実行関数
    preload() {

        // 各画像の読み込み
        this.load.image("block_Rock", "./assets/img/block_Rock.png")
        this.load.image("box_wood", "./assets/img/box_wood.png")
        this.load.image("button_open_normal", "./assets/img/button_open_normal.png")
        this.load.image("button_open_pressed", "./assets/img/button_open_pressed.png")
        this.load.image("button_save_normal", "./assets/img/button_save_normal.png")
        this.load.image("button_save_pressed", "./assets/img/button_save_pressed.png")
        this.load.image("button_title_normal", "./assets/img/button_title_normal.png")
        this.load.image("button_title_pressed", "./assets/img/button_title_pressed.png")
        this.load.image("field_grass_1", "./assets/img/field_grass_1.png")
        this.load.image("field_grass_2", "./assets/img/field_grass_2.png")
        this.load.image("goal_houseRamen", "./assets/img/goal_houseRamen.png")
        this.load.image("hole_grass_1", "./assets/img/hole_grass_1.png")
        this.load.image("hole_grass_2", "./assets/img/hole_grass_2.png")
        this.load.image("hole_grass_3", "./assets/img/hole_grass_3.png")
        this.load.image("itemFrame_chosen_1", "./assets/img/itemFrame_chosen_1.png")
        this.load.image("itemFrame_chosen_2", "./assets/img/itemFrame_chosen_2.png")
        this.load.image("itemFrame_chosen_3", "./assets/img/itemFrame_chosen_3.png")
        this.load.image("itemFrame_normal", "./assets/img/itemFrame_normal.png")
        this.load.image("slime_back_normal_1", "./assets/img/slime_back_normal_1.png")
        this.load.image("slime_back_normal_2", "./assets/img/slime_back_normal_2.png")
        this.load.image("slime_back_normal_3", "./assets/img/slime_back_normal_3.png")
        this.load.image("slime_front_normal_1", "./assets/img/slime_front_normal_1.png")
        this.load.image("slime_front_normal_2", "./assets/img/slime_front_normal_2.png")
        this.load.image("slime_front_normal_3", "./assets/img/slime_front_normal_3.png")
        this.load.image("slime_left_normal_1", "./assets/img/slime_left_normal_1.png")
        this.load.image("slime_left_normal_2", "./assets/img/slime_left_normal_2.png")
        this.load.image("slime_left_normal_3", "./assets/img/slime_left_normal_3.png")
        this.load.image("slime_right_normal_1", "./assets/img/slime_right_normal_1.png")
        this.load.image("slime_right_normal_2", "./assets/img/slime_right_normal_2.png")
        this.load.image("slime_right_normal_3", "./assets/img/slime_right_normal_3.png")
        this.load.image("title_bg", "./assets/img/title_bg.png")
        this.load.image("title_create", "./assets/img/title_create.png")
        this.load.image("title_game", "./assets/img/title_game.png")
        this.load.image("title_select_cursor", "./assets/img/title_select_cursor.png")
        this.load.image("square_movable_area", "./assets/img/movableArea.png")

        // 各スプライトシートの読み込み
        this.load.spritesheet("slime", "assets/img/slime_spriteSheet.png", {
            frameWidth: UNIT_SIZE,
            frameHeight: UNIT_SIZE
        });
    }

    // 画面生成時の実行関数
    create() {

        // 背景画像の設定
        this.add.image(D_WIDTH / 2, D_HEIGHT / 2, "title_bg");

        // ゲーム開始ボタンの設定
        let button_game = this.add.image(D_WIDTH / 2, D_HEIGHT / 2 + 100, "title_game").setOrigin(0.5).setInteractive();

        // ゲーム開始ボタンの動作設定
        button_game.on('pointerdown', function (pointer) {

            // タッチされた場合、ゲームシーンに遷移する
            this.scene.start('GameScene');
        }, this);
    }
};