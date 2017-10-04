
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
    success: function(data) {

        // Add RaceNames
            var race_date = data.MRData.RaceTable.Races[0].date;
            var source_race_name = $("#race-name").html();
            var race_info_template = Handlebars.compile(source_race_name);
            var race_names = data.MRData.RaceTable.Races;
            var race = race_info_template({'race_names': race_names });
                $('#upcoming-races').append(race);
    }
});



$(document).ajaxComplete(function () {

    function highlightDuplicates() {
        //console.log("dasdsa");


        // loop over all input fields in table
        $('.input-box').find('input').each(function() {

            if ($('.input-box').find('input[value="' + $(this).val() + '"]').length() > 1) {
                // highlight this

                $(this).addClass('duplicate');
                console.log("haha");
            } else {
                // otherwise remove
                $(this).removeClass('duplicate');
            }
        });
    }

    highlightDuplicates();

    $('.input-box').find('input').bind('input',function() {
        $(this).attr('value',this.value)
    });

    // bind test on any change event
    $('.input-box').find('input').on('input',highlightDuplicates);

});





