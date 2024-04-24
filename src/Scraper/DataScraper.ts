import { getPlayerDetails } from '../Helpers/Requests';
import * as cheerio from 'cheerio';
import * as scraperFuncs from './DataScraperFunctions';
import * as fs from 'fs';
import { convertToCSV } from '../Helpers/Utils';

interface LatestPlayerData {
    dateOfLatestMatch: string;
    myScoreGameOne: number;
    myScoreGameTwo: number;
    myScoreGameThree: number;
    myScoreGameFour: number;
    myScoreGameFive: number;
    opponentsScoreGameOne: number;
    opponentsScoreGameTwo: number;
    opponentsScoreGameThree: number;
    opponentsScoreGameFour: number;
    opponentsScoreGameFive: number;
    levelBeforeLatestMatch: number;
    currentLevel: number;
    gamesWon: number;
    gamesLost: number;

}

export async function collectData(): Promise<LatestPlayerData> {
    //get body from response.data getPlayerDetails()
    const body = await getPlayerDetails();
    const $ = cheerio.load(body);
    
    //create object to store data of type LatestPlayerData
    const latestData = {
        dateOfLatestMatch: scraperFuncs.getDateOfLatestMatch($),
        myScoreGameOne: scraperFuncs.getMyGameScores($)[0],
        myScoreGameTwo: scraperFuncs.getMyGameScores($)[1],
        myScoreGameThree: scraperFuncs.getMyGameScores($)[2],
        myScoreGameFour: scraperFuncs.getMyGameScores($)[3],
        myScoreGameFive: scraperFuncs.getMyGameScores($)[4],
        opponentsScoreGameOne: scraperFuncs.getOpponentGameScores($)[0],
        opponentsScoreGameTwo: scraperFuncs.getOpponentGameScores($)[1],
        opponentsScoreGameThree: scraperFuncs.getOpponentGameScores($)[2],
        opponentsScoreGameFour: scraperFuncs.getOpponentGameScores($)[3],
        opponentsScoreGameFive: scraperFuncs.getOpponentGameScores($)[4],
        levelBeforeLatestMatch: scraperFuncs.getLevelBeforeLatestMatch($),
        currentLevel: scraperFuncs.getCurrentLevel($),
        gamesWon: scraperFuncs.gamesWonAndLost(scraperFuncs.getMyGameScores($), scraperFuncs.getOpponentGameScores($))[0],
        gamesLost: scraperFuncs.gamesWonAndLost(scraperFuncs.getMyGameScores($), scraperFuncs.getOpponentGameScores($))[1]
    }
    return latestData;
}

export async function dataToJson() {
    const dataJson = JSON.stringify(await collectData());
    try {
        fs.writeFileSync("latestMatch.json", dataJson, {
            flag: "w"
        })

        console.log("JSON file has been saved.")
    }
    catch (err) {
        console.log(`Unable to create JSONfile: ${err}`)
    }
}

export async function dataToCsv() {
    //grab latest match object
    const data = await collectData()
    //convert object to array
    const dataArr = [data];
    const csvData = convertToCSV(dataArr);

    // Write CSV string to a file
    fs.writeFile('data.csv', csvData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing CSV file:', err);
        } else {
            console.log('CSV file has been saved.');
        }
    });

}