var driverinfo_api = "https://ergast.com/api/f1/current/driverStandings.json";
var raceinfo_api = "https://ergast.com/api/f1/current.json";

$.ajax({
  type: "GET",
  url: driverinfo_api,
  dataType: "json",
  cache: false,
  success: function(data) {

    //Add data for Championship Table
    var source = $("#current-standing-row").html();
    var current_standings_template = Handlebars.compile(source);
    var driver_standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    var standings_html = current_standings_template({'driver_standings': driver_standings});
    $('#current-standings-data').append(standings_html);



    //Add Driver Names as Headings for Predictor Table
    var sourceDriver = $("#driver-name-heading").html();
    var driverNameTemplate = Handlebars.compile(sourceDriver);
    var driverName = driverNameTemplate({'driver_codes': driver_standings});

    $('#predictor-heading').append(driverName);



  }
});



$.ajax({
    type: "GET",
    url: raceinfo_api,
    dataType: "json",
    cache: false,
    success: function(data) {

        // Add RaceNames
        var source_race_name = $("#race-name").html();
        var race_info_template = Handlebars.compile(source_race_name);
        var race_names = data.MRData.RaceTable.Races;
        var race= race_info_template({'race_names': race_names });
        $('#upcoming-races').append(race);
    }
});






