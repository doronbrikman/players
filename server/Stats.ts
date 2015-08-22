import {GameModule} from "./Game";

export module StatsModule {
	export class TopEleven {
		public goalKeeper: GameModule.Player;
		public defenders: Array<GameModule.Player>;
		public midfielders: Array<GameModule.Player>;
		public strikers: Array<GameModule.Player>;

		constructor() {
			this.defenders = [];
			this.midfielders = [];
			this.strikers = [];
		}

		public getTopEleven(players: Array<GameModule.Player>): Object {
			var formations = [[3, 4, 3], [3, 5, 2], [4, 3, 3], [4, 4, 2], [4, 5, 1], [5, 3, 2], [5, 4, 1]];
			var topScore = 0;
			var returnObj = {};

			for (let formation of formations) {
				this.defenders = [];
				this.midfielders = [];
				this.strikers = [];

				for (let id in players) {
					let player = players[id];

					if (player.playerRole === 1) {
						this.topGoalKeeper(player);
					}

					if (player.playerRole === 2) {
						this.topDefenders(player, formation[0]);
					}

					if (player.playerRole === 3) {
						this.topMidfielders(player, formation[1]);
					}

					if (player.playerRole === 4) {
						this.topStrikers(player, formation[2]);
					}
				}

				var score = this.calculateScore();
				if (topScore < score) {
					topScore = score;
					returnObj = this.returnObj();
				}
			}

			return returnObj;
		}

		public calculateScore(): number {
			var totalScore = 0;

			totalScore += this.goalKeeper.playerScore;

			this.defenders.forEach((player) => {
				totalScore += player.playerScore;
			});

			this.midfielders.forEach((player) => {
				totalScore += player.playerScore;
			});

			this.strikers.forEach((player) => {
				totalScore += player.playerScore;
			});

			return totalScore;
		}

		public returnObj(): Object {
			let list = {
				'שוער': '', 'הגנה': [], 'קישור': [], 'התקפה': []
			};

			list['שוער'] = this.goalKeeper.playerName;

			this.defenders.forEach((player) => {
				list['הגנה'].push(player.playerName);
			});

			this.midfielders.forEach((player) => {
				list['קישור'].push(player.playerName);
			});

			this.strikers.forEach((player) => {
				list['התקפה'].push(player.playerName);
			});

			return list;
		}

		public topGoalKeeper(gKeeper: GameModule.Player): void {
			if (!this.goalKeeper) {
				this.goalKeeper = gKeeper;
				return;
			}

			if (gKeeper.playerScore > this.goalKeeper.playerScore) {
				// TODO: check for 2 players from a team rule
				this.goalKeeper = gKeeper;
			}
		}

		public topDefenders(defender: GameModule.Player, amount: number): void {
			if (this.defenders.length < amount) {
				this.defenders.push(defender);
				this.defenders = this.orderPlayers(this.defenders);
				return;
			}

			if (this.defenders[this.defenders.length - 1].playerScore < defender.playerScore) {
				this.defenders[this.defenders.length - 1] = defender;
				this.orderPlayers(this.defenders);
			}
		}

		public topMidfielders(midfielder: GameModule.Player, amount: number): void {
			if (this.midfielders.length < amount) {
				this.midfielders.push(midfielder);
				this.midfielders = this.orderPlayers(this.midfielders);
				return;
			}

			if (this.midfielders[this.midfielders.length - 1].playerScore < midfielder.playerScore) {
				this.midfielders[this.midfielders.length - 1] = midfielder;
				this.orderPlayers(this.midfielders);
			}
		}

		public topStrikers(striker: GameModule.Player, amount: number): void {
			if (this.strikers.length < amount) {
				this.strikers.push(striker);
				this.strikers = this.orderPlayers(this.strikers);
				return;
			}

			if (this.strikers[this.strikers.length - 1].playerScore < striker.playerScore) {
				this.strikers[this.strikers.length - 1] = striker;
				this.orderPlayers(this.strikers);
			}
		}

		public weakPlayer(player: GameModule.Player): void {
			if (this.defenders[this.defenders.length - 1].playerScore < player.playerScore) {

			}
		}

		public orderPlayers(players: Array<GameModule.Player>): Array<GameModule.Player> {
			return players.sort((a, b) => {
				if (a.playerScore > b.playerScore) {
					return -1;
				}
				if (a.playerScore < b.playerScore) {
					return 1;
				}
				return 0;
			});
		}
	}
}