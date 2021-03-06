import Bullet from "./Bullet";

export default class Tower extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, config.x, config.y, config.key);
		this.scene = config.scene;
		this.scene.add.existing(this);
	}


	checkForEnemies(group) {
		let towerRange = 100;
		group.children.entries.map(enemy => {
			if (!this.disabled) {
				let posY = this.y - enemy.y;
				let posX = this.x - enemy.x;
				if (
					posY < towerRange &&
					posY > -towerRange &&
					posX < towerRange &&
					posX > -towerRange
				) {
					this.shoot(this, enemy, group);
				}
			}
		});
	}

	shoot(tower, enemy, enemyGroup) {
		tower.disabled = true;

		let bullet = new Bullet({
			scene: this.scene,
			x: tower.x,
			y: tower.y - 12,
			key: "bullet"
		}).setScale(1.2);
		let tween = this.scene.tweens.add({
			targets: bullet,
			x: enemy.x,
			y: enemy.y,
			duration: 150,
			ease: "Linear",
			// easeParams: [1.5, 0.5],
			onComplete: function () {
				enemy.life--;
				enemy.setTint(0xFF0000)
				setTimeout(() => {
					enemy.clearTint()
				}, 80);
				setTimeout(() => {
					bullet.destroy();
					if (enemy.life === 0) {
						enemyGroup.remove(enemy, true, false);
						this.parent.scene.player.gold += 15;
						this.parent.scene.children.list
						this.parent.scene.children.list[5].text = this.parent.scene.player.gold;
					}
				}, 10);
			}
		});

		setTimeout(() => {
			tower.disabled = false;
		}, 1000);
	}
}