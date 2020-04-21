$(document).ready(function() {

    //Collect badges when Info Toggle button is clicked:
    $("#toggleInfoBarBtn")
        .off()
        .on("click", () => {

            //Total number of completed trips:
            infoGetter("api/trips/count/", "Completed", "#statsCompletedTrips");

            //Total number of ongoing trips:
            infoGetter("api/trips/count/", "Ongoing", "#statsOngoingTrips");

            //Total durations of completed trips
            infoGetter("api/trips/sumduration/", "Completed", "#statsTotalDurations");

            //Average duration per trip
            let totalDurations = $("#statsTotalDurations").text();
            let totalCompletedTrips = $("#statsCompletedTrips").text();
            let averageDuration = totalDurations / totalCompletedTrips;
            $("#statsAvgDurations").text(averageDuration);

            //Total income of completed trips
            infoGetter("api/trips/sumincome/", "Completed", "#statsTotalIncome");

            //Count Available boats:
            infoGetter("api/available/count/status/", "Available", "#statsTotalAvailable");

            //Count in-maintenance boats:
            infoGetter("api/available/count/status/", "Maintenance", "#statsTotalMaintenance");

            //Count in-charging boats:
            infoGetter("api/available/count/status/", "Charging", "#statsTotalCharging");

            //Count Rented boats:
            infoGetter("api/available/count/status/", "Rented", "#statsTotalRented");

        });

    //Populate boat numbers when Boats Specific button is clicked:
    $("#boatSpecificStatsBtn")
        .off()
        .on("click", () => {
            $("#boatStatsSelect").empty();
            $.get("api/available", (boats) => {
                for (i = 0; i < boats.length; i++) {
                    let boat = boats[i];
                    $("#boatStatsSelect").append(
                        new Option(boat.boatNumber)
                    );
                }
            });
        });

    //Updated boat specific badges based on the selected boat number
    $("#boatStatsSelect")
        .off()
        .on("change", () => {
            let selecteBoatNumber = $("#boatStatsSelect option:selected").text();
            console.log(selecteBoatNumber)

            //Get number of seats and current status:
            $.get("api/available", (boats) => {
                $.each(boats, (index, element) => {
                    if (selecteBoatNumber == element.boatNumber) {
                        console.log(element.boatNumber);
                        $("#boatStatsSeats").text(element.numOfSeats);
                        $("#boatStatsStatus").text(element.status);
                    }
                });
            });

            //Get total time of ended trips by the specified boat number
            $.get("api/trips/sumduration/num/" + selecteBoatNumber, (totalDurations) => {
                $("#boatStatsDurations").text(totalDurations);
            });

            //Get total income from the selected boat number
            $.get("api/trips/sumincome/num/" + selecteBoatNumber, (totalIncome) => {
                $("#boatStatsIncome").text(totalIncome);
            });

        });


    //Reusable function to collect custom details from the server
    function infoGetter(url, requiredInfo, spanIdentifier) {
        $.get(url + requiredInfo, (response) => {
            $(spanIdentifier).text(response);
        });
    }









});