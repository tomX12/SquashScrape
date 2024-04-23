import { dataToCsv } from "../src/Scraper/DataScraper";
import * as fs from 'fs'

beforeEach(async () => {
    //if latestMatch.json exists delete it
    if (fs.existsSync("latestMatch.csv")) {
        fs.unlinkSync("latestMatch.csv");
    }
    await dataToCsv()
})

test('adds csv file successfully',  () => {
    // Check if the file exists
    const fileExists = fs.existsSync("latestMatch.csv");
    // Assert that the file exists
    expect(fileExists).toBe(true);
})

test('should have the correct field names and value types', () => {
    const jsonData = JSON.parse(fs.readFileSync('latestMatch.csv', 'utf-8'));

    expect(jsonData).toHaveProperty('dateOfLatestMatch');
    expect(jsonData).toHaveProperty('myScoreGameOne');
    expect(jsonData).toHaveProperty('myScoreGameTwo');
    expect(jsonData).toHaveProperty('myScoreGameThree');
    expect(jsonData).toHaveProperty('myScoreGameFour');
    expect(jsonData).toHaveProperty('myScoreGameFive');
    expect(jsonData).toHaveProperty('opponentsScoreGameOne');
    expect(jsonData).toHaveProperty('opponentsScoreGameTwo');
    expect(jsonData).toHaveProperty('opponentsScoreGameThree');
    expect(jsonData).toHaveProperty('opponentsScoreGameFour');
    expect(jsonData).toHaveProperty('opponentsScoreGameFive');
    expect(jsonData).toHaveProperty('levelBeforeLatestMatch');
    expect(jsonData).toHaveProperty('currentLevel');
    expect(jsonData).toHaveProperty('gamesWon');
    expect(jsonData).toHaveProperty('gamesLost');

    expect(typeof jsonData.dateOfLatestMatch).toBe('string');
    expect(typeof jsonData.myScoreGameOne).toBe('number');
    expect(typeof jsonData.myScoreGameTwo).toBe('number');
    expect(typeof jsonData.myScoreGameThree).toBe('number');
    expect(typeof jsonData.myScoreGameFour).toBe('number');
    expect(typeof jsonData.myScoreGameFive).toBe('number');
    expect(typeof jsonData.opponentsScoreGameOne).toBe('number');
    expect(typeof jsonData.opponentsScoreGameTwo).toBe('number');
    expect(typeof jsonData.opponentsScoreGameThree).toBe('number');
    expect(typeof jsonData.opponentsScoreGameFour).toBe('number');
    expect(typeof jsonData.opponentsScoreGameFive).toBe('number');
    expect(typeof jsonData.levelBeforeLatestMatch).toBe('number');
    expect(typeof jsonData.currentLevel).toBe('number');
    expect(typeof jsonData.gamesWon).toBe('number');
    expect(typeof jsonData.gamesLost).toBe('number');
});
