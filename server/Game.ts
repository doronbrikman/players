export module GameModule {
    enum EventEnum {
        StaringPlayer = 1,
        SubPlayer = 2,
        PlayerSubbed = 3,
        YellowCard = 4,
        SecondYellowCard = 5,
        RedCard = 6,
        Goal = 7,
        Assist = 8,
        OwnGoal = 9,
        PenaltyGoal = 10,
        PenaltyMiss = 11,
        PenaltyFault = 12,
        PenaltyOnHim = 13
    }

    export class WobiScoreConsts {
        public static playedLessThenSixty: number = 1;
        public static playedMoreThenSixty: number = 2;
        public static goalByKeeper: number = 7;
        public static goalByDefender: number = 6;
        public static goalByMidfilder: number = 5;
        public static goalByStriker: number = 4;
        public static doubleGoal: number = 1;
        public static tripleGoal: number = 2;
        public static quadraGoal: number = 3;
        public static pentaGoal: number = 4;
        public static assistScore: number = 3;
        public static keeperNoGoal: number = 4;
        public static defenderNoGoal: number = 4;
        public static penaltyMaker: number = -4;
        public static penaltyOnPlayer: number = 2;
        public static penaltyKeeperStop: number = 4;
        public static penaltyMiss: number = -4;
        public static ownGoalConceded: number = -5;
        public static yellowCardConceded: number = -1;
        public static secondYellowCardConceded: number = -2;
        public static redCardConceded: number = -3;
        public static goalConcededNegative: number = -1;
    }

    enum RoleEnum {
        GoalKeeper = 1,
        Defender = 2,
        Midfielder = 3,
        Striker = 4
    }

    export class Team {
        public teamName: string;
        public teamId: number;
        constructor(name: string, id: number) {
            this.teamName = name;
            this.teamId = id;
        }
    }

    export class GameEvent {
        public gameMinute: number;
        public playerId: number;
        public playerName: string;
        public playerRole: RoleEnum;
        public playerTeam: Team;
        public currentGameEvent: EventEnum;

        constructor(minute: number, pId: number, name: string, event: EventEnum, playerRole?: RoleEnum, playerTeam?: Team) {
            this.gameMinute = minute;
            this.playerId = pId;
            this.playerName = name;
            this.currentGameEvent = event;
            this.playerRole = playerRole;
            this.playerTeam = playerTeam;
        }
    }

    export class Game {
        public gameId: number;
        public homeTeam: Team;
        public awayTeam: Team;
        public homeScore: number;
        public awayScore: number;
        public gameEvents: GameEvent[];

        constructor(id: number, home: Team, away: Team, homeScor: number, awayScor: number, events: GameEvent[]) {
            this.homeTeam = home;
            this.awayTeam = away;
            this.homeScore = homeScor;
            this.awayScore = awayScor;
            this.gameEvents = events;
            this.gameId = id;
        }
    }

    export class Player {
        public playerId: number;
        public playerName: string;
        public playerRole: RoleEnum;
        public playerTeam: Team;
        public playerScore: number;
        public playerMinuteStarted: number;
        public playerGoals: number;
        public redCardIndication: boolean;
        public playerMinuteEnd: number;

        constructor(id: number, name: string, staringMinute: number, team: Team, role: RoleEnum) {
            this.playerId = id;
            this.playerName = name;
            this.playerMinuteStarted = staringMinute;
            this.playerMinuteEnd = 0;
            this.playerScore = 0;
            this.playerGoals = 0;
            this.playerTeam = team;
            this.playerRole = role;
        }
    }
    export class Dictionary<T> {
        [index: number]: T;
    }

    export class Goal {
        public goalMinute: number;
        public goalTeamConceded: Team;
        public goalTeamMadeGoal: Team;
        constructor(minute: number, conceded: Team, made: Team) {
            this.goalMinute = minute;
            this.goalTeamConceded = conceded;
            this.goalTeamMadeGoal = made;
        }
    }

    export class GameHub {
        public playerDic;
        
        constructor() {
            this.playerDic = {};
        }

        public createDummyGame(): string {
            var homeTeam = new Team("Maccabi Haifa", 1005);
            var awayTeam = new Team("Hapoel Haifa", 2170);
            var eventList: GameEvent[] = new Array<GameEvent>();
            eventList.push(new GameEvent(0, 155349, "Stojkovic Vladimir", EventEnum.StaringPlayer, RoleEnum.GoalKeeper, homeTeam));
            eventList.push(new GameEvent(0, 145822, "Paz Cruz Abrahan", EventEnum.StaringPlayer, RoleEnum.Defender, homeTeam));
            eventList.push(new GameEvent(0, 164695, "Kamara Mohamed", EventEnum.StaringPlayer, RoleEnum.Midfielder, homeTeam));
            eventList.push(new GameEvent(0, 33401, "Gabai Elad", EventEnum.StaringPlayer, RoleEnum.Defender, homeTeam));
            eventList.push(new GameEvent(0, 22596, "Ezra Hen", EventEnum.StaringPlayer, RoleEnum.Midfielder, homeTeam));
            eventList.push(new GameEvent(0, 33841, "Shechter Etay", EventEnum.StaringPlayer, RoleEnum.Striker, homeTeam));
            eventList.push(new GameEvent(0, 2177, "Dgani Orel", EventEnum.StaringPlayer, RoleEnum.Defender, homeTeam));
            eventList.push(new GameEvent(0, 54078, "Tawatha Taleb", EventEnum.StaringPlayer, RoleEnum.Defender, homeTeam));
            eventList.push(new GameEvent(0, 111, "Benayoun Yossi", EventEnum.StaringPlayer, RoleEnum.Midfielder, homeTeam));
            eventList.push(new GameEvent(0, 31335, "Atar Eliran", EventEnum.StaringPlayer, RoleEnum.Striker, homeTeam));
            eventList.push(new GameEvent(0, 19305, "Yadin Avihai", EventEnum.StaringPlayer, RoleEnum.Midfielder, homeTeam));
            eventList.push(new GameEvent(0, 155469, "Kovar Premysl", EventEnum.StaringPlayer, RoleEnum.GoalKeeper, awayTeam));
            eventList.push(new GameEvent(0, 145810, "Kijanskas Tadas", EventEnum.StaringPlayer, RoleEnum.Defender, awayTeam));
            eventList.push(new GameEvent(0, 21442, "Ostaynd Or", EventEnum.StaringPlayer, RoleEnum.Midfielder, awayTeam));
            eventList.push(new GameEvent(0, 65488, "SHUKRANI Roei", EventEnum.StaringPlayer, RoleEnum.Midfielder, awayTeam));
            eventList.push(new GameEvent(0, 155468, "Ricketts Tosiant Antony", EventEnum.StaringPlayer, RoleEnum.Striker, awayTeam));
            eventList.push(new GameEvent(0, 2650, "AL LALA Ma'aran", EventEnum.StaringPlayer, RoleEnum.Striker, awayTeam));
            eventList.push(new GameEvent(0, 154664, "Salihi Hamdi", EventEnum.StaringPlayer, RoleEnum.Striker, awayTeam));
            eventList.push(new GameEvent(0, 13265, "MAGRASHVILI Haim", EventEnum.StaringPlayer, RoleEnum.Defender, awayTeam));
            eventList.push(new GameEvent(0, 72877, "FISHLER Ofek", EventEnum.StaringPlayer, RoleEnum.Defender, awayTeam));
            eventList.push(new GameEvent(0, 50674, "Sardal Liran", EventEnum.StaringPlayer, RoleEnum.Midfielder, awayTeam));
            eventList.push(new GameEvent(0, 104960, "Steven Cohen", EventEnum.StaringPlayer, RoleEnum.Midfielder, awayTeam));
            eventList.push(new GameEvent(27, 145810, "Kijanskas Tadas", EventEnum.YellowCard));
            eventList.push(new GameEvent(45, 54078, "Tawatha Taleb", EventEnum.Goal));
            eventList.push(new GameEvent(65, 104960, "Steven Cohen", EventEnum.YellowCard));
            eventList.push(new GameEvent(69, 104960, "Steven Cohen", EventEnum.PlayerSubbed));
            eventList.push(new GameEvent(69, 73908, "Golan Idan", EventEnum.SubPlayer, RoleEnum.Midfielder, awayTeam));
            eventList.push(new GameEvent(77, 33841, "Shechter Etay", EventEnum.PlayerSubbed));
            eventList.push(new GameEvent(77, 11700, "AMASHA Wiam", EventEnum.SubPlayer, RoleEnum.Striker, homeTeam));
            eventList.push(new GameEvent(79, 21442, "Ostaynd Or", EventEnum.PlayerSubbed));
            eventList.push(new GameEvent(79, 64200, "BITON Oren", EventEnum.SubPlayer, RoleEnum.Midfielder, awayTeam));
            eventList.push(new GameEvent(82, 22596, "Ezra Hen", EventEnum.PlayerSubbed));
            eventList.push(new GameEvent(82, 709, "Vered Idan", EventEnum.SubPlayer, RoleEnum.Striker, homeTeam));
            eventList.push(new GameEvent(86, 111, "BENAYOUN Yossi", EventEnum.PlayerSubbed));
            eventList.push(new GameEvent(86, 156191, "Marcos Madera Miguel", EventEnum.SubPlayer, RoleEnum.Midfielder, homeTeam));
            eventList.push(new GameEvent(88, 50674, "Sardal Liran", EventEnum.PlayerSubbed));
            eventList.push(new GameEvent(88, 145809, "Korac Zarko", EventEnum.SubPlayer, RoleEnum.Striker, awayTeam));
            eventList.push(new GameEvent(89, 709, "Vered Idan", EventEnum.Goal));

            var game = new Game(388240, homeTeam, awayTeam, 2, 0, eventList);
            
            this.calculateGame(game);
            
            return this.playerDic;
        }

        public calculateGames(games: Array<Game>): void {
            games.forEach(singleGame => {
                this.calculateGame(singleGame);
            });
        }

        private getOtherTeam(game: Game, team: Team): Team {
            if (game.awayTeam === team) {
                return game.homeTeam;
            } else {
                return game.awayTeam;
            }
        }

        private calculateGame(game: Game): void {
            var playingPlayers: number[] = new Array();
            var homeGoalKeeper: Player;
            var awayGoalKeeper: Player;
            var goals: Goal[] = new Array();

            game.gameEvents.forEach(singleEvent => {
                if ((singleEvent.currentGameEvent === EventEnum.StaringPlayer) ||
                    (singleEvent.currentGameEvent === EventEnum.SubPlayer)) {
                    this.startingPlayer(singleEvent);
                    if (this.playerDic[singleEvent.playerId].playerRole === RoleEnum.GoalKeeper) {
                        if (this.playerDic[singleEvent.playerId].playerTeam === game.homeTeam) {
                            homeGoalKeeper = this.playerDic[singleEvent.playerId];
                        }
                        if (this.playerDic[singleEvent.playerId].playerTeam === game.awayTeam) {
                            awayGoalKeeper = this.playerDic[singleEvent.playerId];
                        }
                    }
                    playingPlayers.push(singleEvent.playerId);
                }
                if (singleEvent.currentGameEvent === EventEnum.PlayerSubbed) {
                    this.playerSubbed(singleEvent);
                }
                if (singleEvent.currentGameEvent === EventEnum.YellowCard) {
                    this.scoreChange(singleEvent, WobiScoreConsts.yellowCardConceded);
                }
                if (singleEvent.currentGameEvent === EventEnum.SecondYellowCard) {
                    this.scoreChange(singleEvent, WobiScoreConsts.secondYellowCardConceded);
                    this.redCardConceded(singleEvent);
                }
                if (singleEvent.currentGameEvent === EventEnum.RedCard) {
                    this.scoreChange(singleEvent, WobiScoreConsts.redCardConceded);
                    this.redCardConceded(singleEvent);
                }
                if (singleEvent.currentGameEvent === EventEnum.Goal) {
                    this.playerGoalScore(singleEvent);
                    goals.push(new Goal(singleEvent.gameMinute,
                        this.getOtherTeam(game, this.playerDic[singleEvent.playerId].playerTeam),
                        this.playerDic[singleEvent.playerId].playerTeam));
                }
                if (singleEvent.currentGameEvent === EventEnum.Assist) {
                    this.scoreChange(singleEvent, WobiScoreConsts.assistScore);
                }
                if (singleEvent.currentGameEvent === EventEnum.OwnGoal) {
                    this.scoreChange(singleEvent, WobiScoreConsts.ownGoalConceded);
                    goals.push(new Goal(singleEvent.gameMinute,
                        this.getOtherTeam(game, this.playerDic[singleEvent.playerId].playerTeam),
                        this.playerDic[singleEvent.playerId].playerTeam));
                }
                if (singleEvent.currentGameEvent === EventEnum.PenaltyGoal) {
                    this.playerGoalScore(singleEvent);
                    goals.push(new Goal(singleEvent.gameMinute,
                        this.getOtherTeam(game, this.playerDic[singleEvent.playerId].playerTeam),
                        this.playerDic[singleEvent.playerId].playerTeam));
                }
                if (singleEvent.currentGameEvent === EventEnum.PenaltyMiss) {
                    this.scoreChange(singleEvent, WobiScoreConsts.penaltyMiss);
                    this.keeperGoalSave(singleEvent, awayGoalKeeper, homeGoalKeeper, game);
                }
                if (singleEvent.currentGameEvent === EventEnum.PenaltyFault) {
                    this.scoreChange(singleEvent, WobiScoreConsts.penaltyMaker);
                }
                if (singleEvent.currentGameEvent === EventEnum.PenaltyOnHim) {
                    this.scoreChange(singleEvent, WobiScoreConsts.penaltyOnPlayer);
                }
            });

            playingPlayers.forEach(singlePlayer => {
                this.playingTimeCalc(this.playerDic[singlePlayer]);

                if ((this.playerDic[singlePlayer].playerRole === RoleEnum.Defender) ||
                    (this.playerDic[singlePlayer].playerRole === RoleEnum.GoalKeeper)) {
                    if (!this.playerDic[singlePlayer].redCardIndication) {
                        if (this.playerDic[singlePlayer].playerTeam === game.awayTeam) {
                            this.concedeGoalCalculation(this.playerDic[singlePlayer], game.homeScore);
                        }
                        if (this.playerDic[singlePlayer].playerTeam === game.homeTeam) {
                            this.concedeGoalCalculation(this.playerDic[singlePlayer], game.awayScore);
                        }
                    } else {
                        if (game.homeScore > 0) {
                            if (this.playerDic[singlePlayer].playerTeam === game.awayTeam) {
                                this.redCardGoalCalculation(this.playerDic[singlePlayer], goals, game.awayScore);

                            }
                            if (this.playerDic[singlePlayer].playerTeam === game.homeTeam) {
                                this.redCardGoalCalculation(this.playerDic[singlePlayer], goals, game.homeScore);
                            }
                        }
                    }
                }
            });
        }

        private redCardConceded(singleEvent: GameEvent) {
            this.playerDic[singleEvent.playerId].redCardIndication = true;
            this.playerDic[singleEvent.playerId].playerMinuteEnd = singleEvent.gameMinute;
        }

        private keeperGoalSave(singleEvent: GameEvent, awayGoalKeeper: Player, homeGoalKeeper: Player, game: Game): void {
            if (this.playerDic[singleEvent.playerId].playerTeam === game.homeTeam) {
                this.playerDic[awayGoalKeeper.playerId].playerScore += WobiScoreConsts.penaltyKeeperStop;
            }
            if (this.playerDic[singleEvent.playerId].playerTeam === game.awayTeam) {
                this.playerDic[homeGoalKeeper.playerId].playerScore += WobiScoreConsts.penaltyKeeperStop;
            }
        }

        private redCardGoalCalculation(singlePlayer: Player, goals: Goal[], score: number): void {
            goals.forEach(goal => {
                if (goal.goalTeamConceded === singlePlayer.playerTeam) {
                    if (goal.goalMinute > singlePlayer.playerMinuteEnd) {
                        if (singlePlayer.playerRole === RoleEnum.GoalKeeper) {
                            singlePlayer.playerScore += WobiScoreConsts.keeperNoGoal;
                            return;
                        }

                        if (singlePlayer.playerRole === RoleEnum.Defender) {
                            singlePlayer.playerScore += WobiScoreConsts.defenderNoGoal;
                            return;
                        }
                    } else {

                        if (score > 1) {
                            singlePlayer.playerScore += WobiScoreConsts.goalConcededNegative * score;
                        }
                        return;
                    }
                }

            });
        }

        private concedeGoalCalculation(singlePlayer: Player, score: number): void {
            if (singlePlayer.playerRole === RoleEnum.GoalKeeper && score === 0) {
                singlePlayer.playerScore += WobiScoreConsts.keeperNoGoal;
            }

            if (singlePlayer.playerRole === RoleEnum.Defender && score === 0) {
                singlePlayer.playerScore += WobiScoreConsts.defenderNoGoal;
            }

            if (score > 1) {
                singlePlayer.playerScore += WobiScoreConsts.goalConcededNegative * score;
            }
        }

        private playingTimeCalc(singlePlayer: Player): void {
            if (singlePlayer.playerMinuteEnd === 0) {
                singlePlayer.playerMinuteEnd = 90;
            }

            if (singlePlayer.playerMinuteEnd - singlePlayer.playerMinuteStarted >= 60) {
                singlePlayer.playerScore += WobiScoreConsts.playedMoreThenSixty;
            } else {
                singlePlayer.playerScore += WobiScoreConsts.playedLessThenSixty;
            }
        }

        private startingPlayer(playerEvent: GameEvent): void {
            if (!this.playerDic[playerEvent.playerId]) {
                this.playerDic[playerEvent.playerId] = new Player(playerEvent.playerId,
                    playerEvent.playerName, playerEvent.gameMinute, playerEvent.playerTeam, playerEvent.playerRole);
            } else {
                this.playerDic[playerEvent.playerId].playerMinuteStarted = playerEvent.gameMinute;
                this.playerDic[playerEvent.playerId].redCardIndication = false;
                this.playerDic[playerEvent.playerId].playerGoals = 0;
                this.playerDic[playerEvent.playerId].playerMinuteEnd = 0;
            }
        }

        private playerGoalScore(playerEvent: GameEvent): void {
            switch (this.playerDic[playerEvent.playerId].playerGoals) {
                case 1:
                    this.playerDic[playerEvent.playerId].playerScore +=
                    this.playerGoalValueReturn(this.playerDic[playerEvent.playerId].playerRole);
                case 2:
                    this.playerDic[playerEvent.playerId].playerScore +=
                    this.playerGoalValueReturn(this.playerDic[playerEvent.playerId].playerRole) + WobiScoreConsts.doubleGoal;
                case 3:
                    this.playerDic[playerEvent.playerId].playerScore +=
                    this.playerGoalValueReturn(this.playerDic[playerEvent.playerId].playerRole) + WobiScoreConsts.tripleGoal;
                case 4:
                    this.playerDic[playerEvent.playerId].playerScore +=
                    this.playerGoalValueReturn(this.playerDic[playerEvent.playerId].playerRole) + WobiScoreConsts.quadraGoal;
                case 5:
                    this.playerDic[playerEvent.playerId].playerScore +=
                    this.playerGoalValueReturn(this.playerDic[playerEvent.playerId].playerRole) + WobiScoreConsts.pentaGoal;
                default:
                    this.playerDic[playerEvent.playerId].playerScore +=
                    this.playerGoalValueReturn(this.playerDic[playerEvent.playerId].playerRole);
            }

            this.playerDic[playerEvent.playerId].playerGoals += 1;
        }

        private playerGoalValueReturn(type: RoleEnum): number {
            switch (type) {
                case RoleEnum.GoalKeeper:
                    return WobiScoreConsts.goalByKeeper;
                case RoleEnum.Defender:
                    return WobiScoreConsts.goalByDefender;
                case RoleEnum.Midfielder:
                    return WobiScoreConsts.goalByMidfilder;
                case RoleEnum.Striker:
                    return WobiScoreConsts.goalByStriker;
                default:
                    return 0;
            }
        }

        private playerSubbed(playerEvent: GameEvent): void {
            this.playerDic[playerEvent.playerId].playerMinuteEnd = playerEvent.gameMinute;
        }

        private scoreChange(playerEvent: GameEvent, score: number): void {
            this.playerDic[playerEvent.playerId].playerScore += score;
        }
    }
}