/// <reference path="../typings/tsd.d.ts" />

import {GameModule as game} from "./Game";
import {StatsModule as stats} from "./Stats";

let players;

var a = new game.GameHub();
players = a.createDummyGame();

var top = new stats.TopEleven();

var topPlayers = top.getTopEleven(players);

console.log(topPlayers);