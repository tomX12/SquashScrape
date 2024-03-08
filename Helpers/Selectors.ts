type WebElements = {
    [key: string]: string;
};

export const webElements: WebElements = {
    CurrentLevel: "div[class='headline_player_level']",
    MonthOfLatestMatch: "div[class='match_result_month']",
    DayOfLatestMatch: "div[class='match_result_day']",
    YearOfLatestMatch: "div[class='match_result_year']",
    LevelBeforeLatestMatch: "div[class=match_result_player_info ]:nth-child(1) div[class='level_value']",
    MatchResult: "div[class*='match_result_games_score']",
    GameScoreLines: "div[class*='match_result_points_scores'] > span",
}