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
			for (let id in players) {
				let player = players[id];

				if (player.playerRole === 1) {
					this.topGoalKeeper(player);
				}

				if (player.playerRole === 2) {
					this.topDefenders(player);
				}

				if (player.playerRole === 3) {
					this.topMidfielders(player);
				}

				if (player.playerRole === 4) {
					this.topStrikers(player);
				}
			}

			return this.returnObj();
		}

		public returnObj(): Object {
			let list = {
				'Goal Keeper': '', 'Defenders': [], 'Midfielders': [], 'Strikers': []
			};

			list['Goal Keeper'] = this.goalKeeper.playerName;

			for (let i = 0; i < 5; ++i) {
				list['Defenders'].push(this.defenders[i].playerName);
				list['Midfielders'].push(this.midfielders[i].playerName);
			}

			for (let i = 0; i < 3; ++i) {
				list['Strikers'].push(this.strikers[i].playerName);
			}

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

		public topDefenders(defender: GameModule.Player): void {
			if (this.defenders.length < 5) {
				this.defenders.push(defender);
				this.defenders = this.orderPlayers(this.defenders);
				return;
			}

			if (this.defenders[4].playerScore < defender.playerScore) {
				this.defenders[4] = defender;
				this.orderPlayers(this.defenders);
			}
		}

		public topMidfielders(midfielder: GameModule.Player): void {
			if (this.midfielders.length < 5) {
				this.midfielders.push(midfielder);
				this.midfielders = this.orderPlayers(this.midfielders);
				return;
			}

			if (this.midfielders[4].playerScore < midfielder.playerScore) {
				this.midfielders[4] = midfielder;
				this.orderPlayers(this.midfielders);
			}
		}

		public topStrikers(striker: GameModule.Player): void {
			if (this.strikers.length < 3) {
				this.strikers.push(striker);
				this.strikers = this.orderPlayers(this.strikers);
				return;
			}

			if (this.strikers[2].playerScore < striker.playerScore) {
				this.strikers[2] = striker;
				this.orderPlayers(this.strikers);
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