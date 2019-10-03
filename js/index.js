
var driverinfo_api = "https://ergast.com/api/f1/current/driverStandings.json";
var raceinfo_api = "https://ergast.com/api/f1/current.json";
var date = $.datepicker.formatDate("yy-mm-dd", new Date());

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

        //Input Boxes for Position Prediction
        var source_input_pos = $("#input-pos").html();
        var input_info_template = Handlebars.compile(source_input_pos);
        var input = input_info_template({'driver_codes': driver_standings});
        $(".input-box").append(input);
    }
});



$.ajax({
    type: "GET",
    url: raceinfo_api,
    dataType: "json",
    cache: false,
    success: function (data) {
        // Add RaceNames
        var race_date = data.MRData.RaceTable.Races[0].date;
        var source_race_name = $("#race-name").html();
        var race_info_template = Handlebars.compile(source_race_name);
        var race_names = data.MRData.RaceTable.Races;

        var upcomingRaces = race_names.filter(function (race) {
            return Date.parse(race.date) >= new Date();
        }).sort(function (race1, race2) {
            return race1.date >= race2.date;
        });

        var race = race_info_template({
            'race_names': upcomingRaces
        });

        $('#upcoming-races').append(race);
    }
});


// Function to Duplicate if there are any duplicate values
function highlightDuplicates() {
    // console.log("adasd");
    // loop over all input fields in table
    $('.input-box').find('.input').each(function() {
        // console.log("adasd");
        // check if there is another one with the same value
        if ($('.input-box').find('input[value="' + $(this).val() + '"]').length > 1) {

            // highlight this
            $(this).addClass('duplicate');
        } else {
            // otherwise remove
            $(this).removeClass('duplicate');
        }
    });
}





$(document).ajaxComplete(function () {

    highlightDuplicates();

    $('.input-box').find('input').bind('input',function() {
        $(this).attr('value',this.value)
    });

    // bind test on any change event
    $('.input-box').find('input').on('input',highlightDuplicates);

});





