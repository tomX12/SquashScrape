import * as cheerio from 'cheerio';
import { webElements } from '../Helpers/Selectors';


//returns current level
export function getCurrentLevel($: cheerio.CheerioAPI): number {
    var myLevelText: string = $(webElements.CurrentLevel).text();
    myLevelText = removeCommas(myLevelText);
    var myLevelInt: number = parseInt(myLevelText);
    return myLevelInt;
}

//returns date of latest match in string format
export function getDateOfLatestMatch($: cheerio.CheerioAPI): string {
    var year: string = $(webElements.YearOfLatestMatch).text();
    var month: string = $(webElements.MonthOfLatestMatch).text().toUpperCase();
    var day: string = $(webElements.DayOfLatestMatch).text();
    var dateOfLatestMatch: string = year + "-" + month + "-" + day;
    return dateOfLatestMatch;
}

//returns level before latest match
export function getLevelBeforeLatestMatch($: cheerio.CheerioAPI): number {
    var levelBeforeLatestMatchText: string = $(webElements.LevelBeforeLatestMatch).text();
    levelBeforeLatestMatchText = removeCommas(levelBeforeLatestMatchText);
    levelBeforeLatestMatchText = levelBeforeLatestMatchText.split(" ")[0];
    var levelBeforeLatestMatchInt: number = parseInt(levelBeforeLatestMatchText);
    return levelBeforeLatestMatchInt;
}

//returns an array of my game scores
export function getMyGameScores($: cheerio.CheerioAPI): number[] {
    let myGameScores: number[] = [];
    var Scores = $(webElements.GameScoreLines);
    Scores.each((i, element) => {
        var scoreText: string = $(element).text().split("-")[0];
        var scoreInt: number = parseInt(scoreText);
        myGameScores.push(scoreInt);
    });
    addGamesUpToFive(myGameScores);
    return myGameScores;
}

//returns an array of opponents game scores
export function getOpponentGameScores($: cheerio.CheerioAPI): number[] {
    let opponentsGameScores: number[] = [];
    var Scores = $(webElements.GameScoreLines);
    Scores.each((i, element) => {
        var scoreText: string = $(element).text().split("-")[1];
        var scoreInt: number = parseInt(scoreText);
        opponentsGameScores.push(scoreInt);
    });
    addGamesUpToFive(opponentsGameScores);
    return opponentsGameScores;
}

//removes commas from string
export function removeCommas(string: string): string {
    return string.replace(/,/g, '');
}

//need to account for walkovers here
//adds 0-0 games up to the max 5 games played
export function addGamesUpToFive(scores: number[]): number[] {
    const numberOfGamesToAdd = 5 - scores.length;
    if (numberOfGamesToAdd < 0 || numberOfGamesToAdd > 2) {
        throw new Error("Scoring has been inputted incorrectly");
    }
    for (let i = 0; i < numberOfGamesToAdd; i++) {
        scores.push(0);
    }
    return scores;
}

//returns an array of games won and lost where [0] = games won and [1] = games lost
export function gamesWonAndLost(myScores: number[], opponentsScores: number[]): number[] {
    let gamesWonAndLost: number[] = [];
    let gamesWon: number = 0;
    let gamesLost: number = 0;
    for (let i = 0; i < myScores.length; i++) {
        if (myScores[i] >= 11 && myScores[i] > opponentsScores[i]) {
            gamesWon++;
        } else if (opponentsScores[i] >= 11 && opponentsScores[i] > myScores[i]) {
            gamesLost++;
        }
    }
    gamesWonAndLost.push(gamesWon);
    gamesWonAndLost.push(gamesLost);
    return gamesWonAndLost;
}