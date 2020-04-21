var availableBoats;
var ongoingTripsTable;
var startTripAvailableBoatsTable;
var pricingSchemeMainTable;
$(document).ready(function() {
    //Available Boats list table
    availableBoats = $("#availableBoats").DataTable({
        ajax: {
            url: 'api/available',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'boatNumber' },
            { data: 'numOfSeats' },
            { data: 'type' },
            { data: 'basePrice' },
            { data: 'customPrice' },
            { data: 'status' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><button class="btn btn-danger delete" rowid="' + data.id + '">Delete</button>';
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    //To render the right action buttons based on the the boat details:
                    if (data.type == "Electric boat" && data.status != "Charging") {
                        return '<td><button class="btn btn-warning maintenance" rowid="' + data.id + '">Maintenance</button>' +
                            '<td><button class="btn btn-success charging" rowid="' + data.id + '">Charging</button>';
                    }

                    if (data.status == "Available") {
                        return '<td><button class="btn btn-warning maintenance" rowid="' + data.id + '">Maintenance</button>';
                    } else {
                        return '<td>Check later</td>'
                    }
                }
            }
        ]
    });


    //To move a boat to maintenance
    $("#availableBoats").on("click", "button.maintenance", function() {
        let rowId = $(this).attr("rowid");
        changeStatusToMaintenance(rowId);

        function changeStatusToMaintenance(id) {
            $.get("api/available", function(listBoats) {
                for (i = 0; i < listBoats.length; i++) {
                    let boat = listBoats[i];
                    if (boat.id == id) {
                        console.log("id matched");

                        //Mark this boat under maintenance:
                        let boatToMaintenance = {
                            id: boat.id,
                            boatNumber: boat.boatNumber,
                            numOfSeats: boat.numOfSeats,
                            basePrice: boat.basePrice,
                            customPrice: boat.customPrice,
                            type: boat.type,
                            status: "In Maintenance"
                        }
                        let boatToMaintenanceJson = JSON.stringify(boatToMaintenance);
                        console.log("boat stringified: " + boatToMaintenanceJson);
                        $.ajax({
                            url: "api/available/updatestatus/" + id,
                            type: "PUT",
                            contentType: "application/json",
                            data: boatToMaintenanceJson,
                            success: function() {
                                alert("Status changed");
                                availableBoats.ajax.reload();
                                getBoats();
                            },
                            error: function() {
                                alert("ERROR: status not changed")
                            }
                        });

                    }
                }
            });
        }
        //Get list of boats
        function getBoats() {
            $.get("api/available", function(availableBoats) {
                console.log(availableBoats);
            });
        }
    });

    //To move a boat to charging
    $("#availableBoats").on("click", "button.charging", function() {
        let rowId = $(this).attr("rowid");
        changeStatusToCharging(rowId);

        function changeStatusToCharging(id) {
            $.get("api/available", function(listBoats) {
                for (i = 0; i < listBoats.length; i++) {
                    let boat = listBoats[i];
                    if (boat.id == id) {
                        console.log("id matched");

                        //Mark this boat in charging:
                        let boatToCharging = {
                            id: boat.id,
                            boatNumber: boat.boatNumber,
                            numOfSeats: boat.numOfSeats,
                            basePrice: boat.basePrice,
                            customPrice: boat.customPrice,
                            type: boat.type,
                            status: "Charging"
                        }
                        let boatToChargingJson = JSON.stringify(boatToCharging);
                        console.log("boat stringified: " + boatToChargingJson);
                        $.ajax({
                            url: "api/available/updatestatus/" + id,
                            type: "PUT",
                            contentType: "application/json",
                            data: boatToChargingJson,
                            success: function() {
                                alert("Status changed");
                                availableBoats.ajax.reload();
                                getBoats();
                            },
                            error: function() {
                                alert("ERROR: status not changed")
                            }
                        });
                    }
                }
            });
        }
        //Get list of boats
        function getBoats() {
            $.get("api/available", function(availableBoats) {
                console.log(availableBoats);
            });
        }
    });

    //To delete a boat from available boats
    $("#availableBoats").on("click", "button.delete", function() {
        let rowId = $(this).attr("rowid");
        deleteBoat(rowId);

        function deleteBoat(rowid) {
            $.ajax({
                url: "api/available/" + rowid,
                type: "DELETE",
                success: function() {
                    alert("Deleted");
                    availableBoats.ajax.reload();
                },
                error: function() {
                    alert("ERROR");
                }

            });
        }
    });


    //Pricing scheme list table
    pricingSchemeMainTable = $("#pricingSchemeMainTable").DataTable({
        ajax: {
            url: "api/pricing",
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'boatType' },
            { data: 'basePrice' },
            { data: 'customPricing' },
            { data: 'startCustomPricing' },
            { data: 'endCustomPricing' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><button class="btn btn-danger delete" rowid="' + data.id + '">Delete</button>';
                }
            }
        ]

    });

    //To delete a pricing scheme row
    $("#pricingSchemeMainTable").on("click", "button.delete", function() {
        let rowId = $(this).attr("rowid");
        deletePricingRow(rowId);

        function deletePricingRow(rowid) {
            $.ajax({
                url: "api/pricing/" + rowid,
                type: "DELETE",
                success: function() {
                    alert("Deleted");
                    pricingSchemeMainTable.ajax.reload();
                },
                error: function() {
                    alert("ERROR");
                }

            });
        }
    });

    //To list available boats for a new trip:
    function startTripAvailableBoats(numOfGuests) {
        startTripAvailableBoatsTable = $("#startTripAvailableBoatsTable").DataTable({
            ajax: {
                url: 'api/available/newtrip/' + numOfGuests,
                dataSrc: ''
            },
            columns: [
                { data: 'id' },
                { data: 'boatNumber' },
                { data: 'numOfSeats' },
                { data: 'type' },
                { data: 'basePrice' },
                { data: 'customPrice' },
                { data: 'status' },
                {
                    data: null,
                    render: function(data, type, row) {
                        return '<td><button class="btn btn-outline-info select" boatNum="' + data.boatNumber + '">Select</button>';
                    }
                }
            ]
        });




    }
    //To list ongoing trips:
    ongoingTripsTable = $("#ongoingTripsTable").DataTable({
        ajax: {
            url: 'api/trips',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'boatNumber' },
            { data: 'tripDate' },
            { data: 'tripStart' },
            { data: 'tripEnd' },
            { data: 'duration' },
            { data: 'totalPrice' },
            { data: 'status' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><button class="btn btn-info guestDetails" rowid="' + data.id + '"  guestName="' + data.guestName + '"  idType="' + data.guestIDType + '" idNumber="' + data.guestIDNumber + '"  telNumber="' + data.guestTelNum + '"  data-toggle="modal" data-target="#guestDetailsOngoingTripsModal">Details</button>';
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><button class="btn btn-warning endTrip" rowid="' + data.id + '" boatNum="' + data.boatNumber + '">End</button>';
                }
            }
        ]
    });

    //To get guest details in modal:
    $("#ongoingTripsTable").on("click", "button.guestDetails", function() {
        let rowid = $(this).attr("rowid");
        let guestNameAttr = $(this).attr("guestName");
        let idTypeAttr = $(this).attr("idType");
        let idNumberAttr = $(this).attr("idNumber");
        let telNumberAttr = $(this).attr("telNumber");

        $("#tripIDmodalTitle").text(rowid);
        $("#guestNameSpan").text(guestNameAttr);
        $("#iDTypeSpan").text(idTypeAttr);
        $("#iDNumberSpan").text(idNumberAttr);
        $("#telephoneNumberSpan").text(telNumberAttr);

    });

    //To select a boat and start a new trip:
    $("#startTripAvailableBoatsTable").on("click", "button.select", function() {
        let boatNum = $(this).attr("boatNum");

        //Shows modal to collect guest information:
        $("#startTripGuestDetailsModal").modal("show");

        //To add new trip with the information collected
        $("#startTripBtn").click(function() {

            var nowTime = new Date(Date.now());
            var nowDate = new Date(Date.now());
            console.log(nowTime.toLocaleTimeString());
            console.log(nowDate.toLocaleDateString());

            let newTrip = {
                boatNumber: boatNum,
                tripDate: nowDate.toLocaleDateString(),
                tripStart: nowTime.toLocaleTimeString(),
                tripEnd: "Pending",
                duraion: "Pending",
                // totalPrice: "",
                guestName: $("#guestNameInput").val(),
                guestIDType: $("#guestIDTypeSelect option:selected").text(),
                guestIDNumber: $("#guestIDNmberInput").val(),
                guestTelNum: $("#guestTelNumberInput").val(),
                status: "Ongoing"
            }

            var jsonObject = JSON.stringify(newTrip);

            $.ajax({
                url: "api/trips",
                type: "POST",
                contentType: "application/json",
                data: jsonObject,
                success: function() {
                    alert("Trip added");
                    ongoingTripsTable.ajax.reload();
                    getOngoingTrips();
                },
                error: function() {
                    alert("ERROR");
                }
            });
        });


    });

    //Get list of ongoing trips:
    function getOngoingTrips() {
        $.get("api/trips", function(tripsList) {
            console.log(tripsList);
        });
    }

    //To end an ongoing trip:
    $("#ongoingTripsTable").on('click', 'button.endTrip', function() {
        let tripId = $(this).attr("rowid");
        let tripBoatNumber = $(this).attr("boatNum");
        endTrip(tripId, tripBoatNumber);

        function endTrip(id, boatNum) {

            var nowTime = new Date(Date.now());
            console.log(nowTime.toLocaleTimeString());

            $.get("api/trips", function(ongoingTrips) {
                for (i = 0; i < ongoingTrips.length; i++) {
                    let trip = ongoingTrips[i];
                    if (id == trip.id) {
                        console.log("id matched in if statement");

                        //Calculate duration:


                        //Calculate cost:


                        //Post updated trip data to end the trip
                        let endTrip = {
                            boatNumber: trip.boatNumber,
                            tripDate: trip.tripDate,
                            tripStart: trip.tripStart,
                            tripEnd: nowTime.toLocaleTimeString(),
                            duraion: timeDifference,
                            totalPrice: totalCost,
                            guestName: trip.guestName,
                            guestIDType: trip.guestIDType,
                            guestIDNumber: trip.guestIDNumber,
                            guestTelNum: trip.guestTelNum,
                            status: "Completed"
                        }

                        var jsonObject = JSON.stringify(endTrip);
                        console.log(jsonObject);

                        $.ajax({
                            url: "api/trips/" + id,
                            type: "PUT",
                            contentType: "application/json",
                            data: jsonObject,
                            success: function() {
                                alert("Trip completed");
                                ongoingTripsTable.ajax.reload();
                                getOngoingTrips();
                            },
                            error: function() {
                                alert("ERROR");
                            }
                        });


                    }
                }
            });

        }
    });


    //To add new boat to the DB button action:
    $("#addBoatSaveBtn").click(addBoat);

    //Save pricing Scheme window toggler
    $("#SPMODALriverRaftsRB").click(function() {
        $("#boatsCustomPricingContainer").collapse("hide");
    });
    $("#SPMODALrowingBoatsRB").click(function() {
        $("#boatsCustomPricingContainer").collapse("show");
    });
    $("#SPMODALelectricBoatsRB").click(function() {
        $("#boatsCustomPricingContainer").collapse("show");
    });

    //To save new pricing scheme
    $("#boatsPricingFormSaveBtn").click(function() {
        console.log("button clicked");

        if ($("#SPMODALrowingBoatsRB").is(":checked")) {
            saveBoatPricing("ROWING");
        } else if ($("#SPMODALelectricBoatsRB").is(":checked")) {
            saveBoatPricing("ELECTRIC");
        } else if ($("#SPMODALriverRaftsRB").is(":checked")) {
            saveBoatPricing("RAFT");
        } else {
            alert("Please select boat type first");
        }

    });

    //Start Trip, Show available boats:
    $("#showAvailableBoatsBtn").click(function() {
        let numOfGuests = $("#numberOfPersonsInput").val();
        startTripAvailableBoats(numOfGuests);
    });

    //To reset the pricing form:
    $("#boatsPricingFormResetBtn").click(function() {
        console.log("button reset clicked");
        $("#boatsBasePriceInput").val(''),
            $("#boatsPricingTimeInputFrom").val(''),
            $("#boatsPricingTimeInputTo").val(''),
            $("#boatsCustomPriceInput").val('')
    });

    //To reload tables
    $("#SPMODALlistPrices").click(function() {
        pricingSchemeMainTable.ajax.reload();
    });

    $("#boatsPricingFormSaveBtn").click(function() {
        pricingSchemeMainTable.ajax.reload();
    });

    $("#MBMODALlistBoatsBtn").click(function() {
        availableBoats.ajax.reload();
    });

    $("#addBoatSaveBtn").click(function() {
        availableBoats.ajax.reload();
    });

});


//Add new boat to the database
function addBoat() {

    let newBoat = {
        boatNumber: $("#boatNumberInput").val(),
        type: $("#boatTypeSelect option:selected").text(),
        numOfSeats: $("#numberOfSeatsInput").val(),
        basePrice: $("#basePriceNewBoatInput").val(),
        customPrice: $("#customPriceNewBoatInput").val(),
        status: "Available"
    }

    console.log(newBoat);

    let jsonObject = JSON.stringify(newBoat);

    console.log(jsonObject);

    $.ajax({
        url: "api/available",
        type: "POST",
        contentType: "application/json",
        data: jsonObject,
        success: function() {
            alert("added");
            getAvailableBoats();
            availableBoats.ajax.reload();
            $("#boatNumberInput").val(''),
                $("#boatTypeSelect").text(),
                $("#numberOfSeatsInput").val(''),
                $("#basePriceNewBoatInput").val(''),
                $("#customPriceNewBoatInput").val()

        },
        error: function() {
            alert("ERROR")
        }
    });

    //Get list of available rowing boats
    function getAvailableBoats() {
        $.get("api/available", function(availableBoats) {
            console.log(availableBoats);
        });
    }
}


//Add boat pricing
function saveBoatPricing(boatTypeFromBtn) {

    switch (boatTypeFromBtn) {
        case "ROWING":
        case "ELECTRIC":
            let boatsPricing = {
                basePrice: $("#boatsBasePriceInput").val(),
                startCustomPricing: $("#boatsPricingTimeInputFrom").val(),
                endCustomPricing: $("#boatsPricingTimeInputTo").val(),
                customPricing: $("#boatsCustomPriceInput").val(),
                boatType: boatTypeFromBtn
            }

            let boatsPricingJson = JSON.stringify(boatsPricing);
            postPricing(boatsPricingJson)

            function postPricing(boatTypeJson) {
                $.ajax({
                    url: "api/pricing",
                    type: "POST",
                    contentType: "application/json",
                    data: boatTypeJson,
                    success: function() {
                        alert("Pricing scheme added!");
                        getPricingSchemesList();
                        pricingSchemeMainTable.ajax.reload();
                        $("#boatsBasePriceInput").val(''),
                            $("#boatsPricingTimeInputFrom").val(''),
                            $("#boatsPricingTimeInputTo").val(''),
                            $("#boatsCustomPriceInput").val('')
                    },
                    error: function() {
                        alert("ERROR");
                    }
                });
            }
            break;

        case "RAFT":
            let raftPricing = {
                basePrice: $("#boatsBasePriceInput").val(),
                boatType: boatTypeFromBtn
            }

            let raftPricingJson = JSON.stringify(raftPricing);
            postPricing(raftPricingJson)

            function postPricing(boatTypeJson) {
                $.ajax({
                    url: "api/pricing",
                    type: "POST",
                    contentType: "application/json",
                    data: boatTypeJson,
                    success: function() {
                        alert("Pricing scheme added!");
                        pricingSchemeMainTable.ajax.reload();
                        getPricingSchemesList();
                        $("#boatsBasePriceInput").val('')
                    },
                    error: function() {
                        alert("ERROR");
                    }
                });
            }
            break;
    }

    //Get list of added pricing schemes
    function getPricingSchemesList() {
        $.get("api/pricing", function(pricingSchemes) {
            console.log(pricingSchemes);
        });

    }


}






//To reset the reservation form fields when Next is clicked:
// $("#nextBtnReservationModal")
//     .off()
//     .on("click", () => {
//         $("#tripDateReservationPickerInput").val('');
//         $("#tripTimeReservationInput").val('');
//         $("#tripDurationReservationInput").val('');
//         $("#numOfPersonsReservationInput").val('');
//         $("#guestNameReservationInput").val('');
//         $("#guestTelNumberReservationInput").val('');
//         $("#addReservationGuestDetailsDiv").collapse('hide');
//     });







//Toggle showing containers depending on the buttons:

//  1. Start trip: Show List of available boats container Available Boats button is clicked:
// $("#showAvailableBoatsBtn").click(() => {
//     $(".toHide").hide();
//     $("#startTripListOfAvailableBoatsContainer").show();
// });

// //  2. Show Trips log: Show list of trips when the List Trips button is clicked:
// $("#listOngoingTripsBtn").click(() => {
//     $(".toHide").hide();
//     $("#listOfOngoingTripsContainer").show();
// });



// return '<button class="btn btn-success start" rowid="' + data.id + '" boatNum="' + data.boatNumber + '">Start</button>' +
//     '<button class="btn btn-danger cancel" rowid="' + data.id + '" boatNum="' + data.boatNumber + '">Cancel</button>';





// {
//     data: null,
//     render: function (data, type, row) {
//         if (data.type === "Raft") {
//             return '<td><button class="btn btn-outline-info select" boatId="' + data.id + '" boatNum="' + data.boatNumber + '">Select</button>';
//         } else {
//             return '<td><button class="btn btn-outline-info select" boatId="' + data.id + '" boatNum="' + data.boatNumber + '">Select</button>';
//         }
//     }
// }


//Render Available Boats list table (To customize table by search term):
// $("#MBMODALlistAllBoatsBtn").click(renderAvailableBoats("api/available"));
// $("#MBMODALlistAvailableBoatsBtn").click(renderAvailableBoats("api/available/boatstatus/Available"));
// $("#MBMODALlistRentedBoatsBtn").click(renderAvailableBoats("api/available/boatstatus/Rented"));
// $("#MBMODALlistReservedBoatsBtn").click(renderAvailableBoats("api/available/boatstatus/Reserved"));
// $("#MBMODALlistMaintenanceBoatsBtn").click(renderAvailableBoats("api/available/boatstatus/Maintenance"));
// $("#MBMODALlistChargingBoatsBtn").click(renderAvailableBoats("api/available/boatstatus/Charging"));
// function renderAvailableBoats(customUrl) {



// {
//     data: null,
//     render: function(data, type, row) {
//         if (data.status === "Ongoing") {
//             return '<td><button class="btn btn-warning start" rowid="' + data.id + '" boatNum="' + data.boatNumber + '">Start</button>';
//         } else {
//             return '<td><button class="btn btn-warning start" disabled>Started</button>'
//         }
//     }
// }


//Get the number of reserved rafts. If 4 or more, then ok, else, give an error
// $.get("api/reservations/count/Raft", (numOfResRafts) => {
//     if (numOfResRafts >= 4) {
//    


// $("#startRaftTripBtn")
//     .off()
//     .on("click", () => {
// let listOfRaftsToTrip = [];

// $.each($("#input[name='raftReserved']:checked"), () => {
//     listOfRaftsToTrip.push($(this).val());
// });
// alert("selected rafts are: " + listOfRaftsToTrip.join(", "));



//>>>>>> then make the ajax call to change the status of the trip to ongoing
// });