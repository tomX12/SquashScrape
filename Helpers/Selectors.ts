type WebElements = {
    [key: string]: string;
};

export const webElements: WebElements = {
    CurrentLevel: "div[class='headline_player_level']",
    MonthOfLatestMatch: "div[class='center_div shadow rounded_corners no_overflow no_overflow dashboard_block_width']:nth-child(1) div.match_result_month",
    DayOfLatestMatch: "div[class='center_div shadow rounded_corners no_overflow no_overflow dashboard_block_width']:nth-child(1) div.match_result_day",
    YearOfLatestMatch: "div[class='center_div shadow rounded_corners no_overflow no_overflow dashboard_block_width']:nth-child(1) div.match_result_year",
    LevelBeforeLatestMatch: "div[class='center_div shadow rounded_corners no_overflow no_overflow dashboard_block_width']:nth-child(1) div[class=match_result_player_info ]:nth-child(1) div[class='level_value']",
    MatchResult: "div[class='center_div shadow rounded_corners no_overflow no_overflow dashboard_block_width']:nth-child(1) div.match_result_details_row > div[class*='match_result_games_score']",
    GameScoreLines: "div[class='center_div shadow rounded_corners no_overflow no_overflow dashboard_block_width']:nth-child(1) div[class*='match_result_points_scores'] > span",
}