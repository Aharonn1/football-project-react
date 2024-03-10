class AppConfig {
     playersUrl = "http://localhost:4021/api/players/";
     topPlayerGoalsUrl = "http://localhost:4021/api/topPlayers/";
     topPlayerAssistsUrl = "http://localhost:4021/api/topPlayers/";
     tableUrl = "http://localhost:4021/api/table/";
     manchesterUrl = "http://localhost:4021/api/manchester";
     awayTeamUrl = "http://localhost:4021/api/manchester";
     homeTeamUrl = "http://localhost:4021/api/manchester";
     tableTeamWinsUrl = "http://localhost:4021/api/totalWins/";
     countriesUrl = "http://localhost:4021/api/country/";
     taskByTaskUrl = "http://localhost:4021/api/players-per-player/";
     playersImagesUrl = "http://localhost:4021/api/players/images/";
}

const appConfig = new AppConfig();

export default appConfig;
