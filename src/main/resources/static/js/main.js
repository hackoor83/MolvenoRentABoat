var availableBoats;
var reservationsTable;
var ongoingTripsTable;
var startTripAvailableBoatsTable;
var pricingSchemeMainTable;
var reservationSuitableAvailableBoatsTable;
var applicableRaftsReservationsTable;
var raftsTripsTable;

$(document).ready(function() {

    //Global functions and actions:
    //    _____ _       _           _   ______                _   _                 
    //   / ____| |     | |         | | |  ____|              | | (_)                
    //  | |  __| | ___ | |__   __ _| | | |__ _   _ _ __   ___| |_ _  ___  _ __  ___ 
    //  | | |_ | |/ _ \| '_ \ / _` | | |  __| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
    //  | |__| | | (_) | |_) | (_| | | | |  | |_| | | | | (__| |_| | (_) | | | \__ \
    //   \_____|_|\___/|_.__/ \__,_|_| |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/


    //Generic boat status updater:
    function statusUpdater(boatId, newStatus) {
        $.get("api/available", function(listBoats) {
            for (i = 0; i < listBoats.length; i++) {
                let boat = listBoats[i];
                if (boat.id == boatId) {
                    console.log("boatId: " + boatId);
                    console.log("boat.id: " + boat.id);

                    //Mark this boat with new status:
                    let boatWithNewStatus = {
                        id: boat.id,
                        boatNumber: boat.boatNumber,
                        chargingTime: boat.chargingTime,
                        numOfSeats: boat.numOfSeats,
                        basePrice: boat.basePrice,
                        customPrice: boat.customPrice,
                        type: boat.type,
                        status: newStatus
                    }

                    let boatWithNewStatusJson = JSON.stringify(boatWithNewStatus);

                    console.log("boat stringified: " + boatWithNewStatusJson);

                    $.ajax({
                        url: "api/available/updatestatus/" + boat.id,
                        type: "PUT",
                        contentType: "application/json",
                        data: boatWithNewStatusJson,
                        success: function() {
                            availableBoats.ajax.reload();
                            $("#genericConfirmationModal").modal("show");
                            $("#genericConfirmationModalTitle").empty();
                            $("#genericConfirmationModalTitle").text("Boat Status Changed");
                            $("#genericConfirmationModalBody").empty();
                            $("#genericConfirmationModalBody").append(
                                `<p>The status of boat number:  ${boat.boatNumber}  changed to ${newStatus}.</p>`);
                            $("#customModalFooterButtons").empty();
                            getBoats();
                        },
                        error: function() {
                            alert("ERROR: status not changed");
                            $("#genericConfirmationModal").modal("show");
                            $("#genericConfirmationModalTitle").empty();
                            $("#genericConfirmationModalTitle").text("Error!");
                            $("#genericConfirmationModalBody").empty();
                            $("#genericConfirmationModalBody").append(
                                `<p>The status of boat number ${boat.boatNumber} could not be changed.</p>`);
                            $("#customModalFooterButtons").empty();
                        }
                    });
                }
            }
        });

        //Get list of boats
        function getBoats() {
            $.get("api/available", function(availableBoats) {
                console.log(availableBoats);
            });
        }
    }


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

    //To destroy datatables as needed (in order to reinitialize it with new ajax request):

    //  1. The list of suggested boats for a new trip:
    $("#startTripListOfAvailableBoatsContainerCloseBtn")
        .off()
        .on("click", () => {
            if ($.fn.DataTable.isDataTable(startTripAvailableBoatsTable)) {
                startTripAvailableBoatsTable.destroy();
            }
        });
    $("#newRowingElectricDropdownItem")
        .off()
        .on("click", () => {
            $("#startTripListOfAvailableBoatsContainer").collapse('hide');
            if ($.fn.DataTable.isDataTable(startTripAvailableBoatsTable)) {
                startTripAvailableBoatsTable.destroy();
            }
        });
    $("#newRiverRaftDropdownItem")
        .off()
        .on("click", () => {
            $("#startTripListOfAvailableBoatsContainer").collapse('hide');
            if ($.fn.DataTable.isDataTable(startTripAvailableBoatsTable)) {
                startTripAvailableBoatsTable.destroy();
            }
        });


    //  2. The list of suggested boats for a new reservation:
    $("#newReservationModalBtn")
        .off()
        .on("click", () => {
            if ($.fn.DataTable.isDataTable(reservationSuitableAvailableBoatsTable)) {
                reservationSuitableAvailableBoatsTable.destroy();
            }
        });

    $("#reservationSuitableAvailableBoatsContainerCloseBtn")
        .off()
        .on("click", () => {
            reservationSuitableAvailableBoatsTable.destroy();
        });







    //Boats Management:

    //   ____              _         __  __                                                   _   
    //  |  _ \            | |       |  \/  |                                                 | |  
    //  | |_) | ___   __ _| |_ ___  | \  / | __ _ _ __   __ _  __ _  ___ _ __ ___   ___ _ __ | |_ 
    //  |  _ < / _ \ / _` | __/ __| | |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '_ ` _ \ / _ \ '_ \| __|
    //  | |_) | (_) | (_| | |_\__ \ | |  | | (_| | | | | (_| | (_| |  __/ | | | | |  __/ | | | |_ 
    //  |____/ \___/ \__,_|\__|___/ |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_| |_| |_|\___|_| |_|\__|
    //                                                         __/ |                              
    //                                                        |___/                               


    //To add the Charging time input field for electric boats in the Add New Boat modal:
    $("#electricBoatBtnSelected").click(function() {
        $("#chargingMinutesInput").collapse("show");
    });
    $("#rowingBoatBtnSelected").click(function() {
        $("#chargingMinutesInput").collapse("hide");
    });
    $("#raftBoatBtnSelected").click(function() {
        $("#chargingMinutesInput").collapse("hide");
    });

    //To add new boat to the DB button:
    $("#addBoatSaveBtn")
        .off()
        .on("click", () => {
            if ($("#rowingBoatBtnSelected").is(":checked")) {
                addBoat("Rowing");
            } else if ($("#electricBoatBtnSelected").is(":checked")) {
                addBoat("Electric");
            } else if ($("#raftBoatBtnSelected").is(":checked")) {
                addBoat("Raft");
            } else {
                alert("Please select boat type first");
            }
        });


    //Add new boat to the database
    function addBoat(boatTypeSelected) {

        //Boat number validation check. This makes the custom boat number a unique identifier:
        let boatNumberInput = $("#boatNumberInput").val();
        $.get("api/available/" + boatNumberInput, function(response) {
            console.log(response);
            if (response == true) {
                alert("This boat number is already in use. Choose another number.");
                $("#addBoatModal").modal("show");
            } else {
                let newBoat = {
                    boatNumber: $("#boatNumberInput").val(),
                    type: boatTypeSelected,
                    chargingTime: $("#chargingMinutes").val(),
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
                        availableBoats.ajax.reload();
                        alert("added");
                        getAvailableBoats();
                        $("#boatNumberInput").val(''),
                            $("#chargingMinutes").val(''),
                            $("#numberOfSeatsInput").val(''),
                            $("#basePriceNewBoatInput").val(''),
                            $("#customPriceNewBoatInput").val()

                    },
                    error: function() {
                        alert("ERROR")
                    }
                });
            }
        });

        //Get list of available boats (to console it)
        function getAvailableBoats() {
            $.get("api/available", function(availableBoats) {
                console.log(availableBoats);
            });
        }
    }



    //List All boats: 
    availableBoats = $("#availableBoats").DataTable({
        ajax: {
            url: "api/available",
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'boatNumber' },
            { data: 'numOfSeats' },
            { data: 'type' },
            {
                data: null,
                render: function(data, type, row) {
                    if (data.type === "Electric") {
                        return `<td>${data.chargingTime}</td>`;
                    } else {
                        return '<td> N/A </td>'
                    }
                }
            },
            { data: 'basePrice' },
            { data: 'customPrice' },
            { data: 'status' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<td><button class="btn btn-warning action" rowid="' + data.id + '" status="' + data.status + '" boatType="' + data.type + '" data-toggle="modal" data-target="#actionBoatsModal">Action</button>';
                }
            }
        ]
    });

    //To open action modal when the Action button in the Boats list is clicked:
    $("#availableBoats")
        .off()
        .on("click", "button.action", function() {
            let rowId = $(this).attr("rowid");
            let boatStatus = $(this).attr("status");
            let boatType = $(this).attr("boatType");
            console.log("rowId: " + rowId);
            console.log("boatStatus: " + boatStatus);
            console.log("boatType: " + boatType);

            //To draw proper buttons depending on boat status and type:

            //  1. To add Charging button if boat is electric:
            if (boatType === "Electric") {
                $("#moveToChargingBtn").show();
            } else {
                $("#moveToChargingBtn").hide();

            }

            //  2. To show appropriate buttons based on boat status:
            switch (boatStatus) {
                case "Maintenance":
                    $(".actionBtnToggler").hide();
                    $(".actionBtnInfoToggler").hide();
                    $("#maintenanceCompletedBtn").show();
                    $("#maintenanceInfo").show();
                    break;

                case "Charging":
                    $(".actionBtnToggler").hide();
                    $(".actionBtnInfoToggler").hide();
                    $("#reserveActionModalBtn").show();
                    $("#chargingInfo").show();
                    break;

                case "Rented":
                    $(".actionBtnToggler").hide();
                    $(".actionBtnInfoToggler").hide();
                    $("#rentedInfo").show();
                    $("#navigationShortcut").show();
                    $("#listOngoingTrips").show();
                    $("#listReservations").hide();
                    break;

                case "Reserved":
                    $(".actionBtnToggler").hide();
                    $(".actionBtnInfoToggler").hide();
                    $("#reservedInfo").show();
                    $("#navigationShortcut").show();
                    $("#listOngoingTrips").hide();
                    $("#listReservations").show();
                    break;

                case "Available":
                    $("#moveToMaintenanceBtn").show();
                    $("#reserveActionModalBtn").show();
                    $("#startTripActionModalBtn").show();
                    $("#maintenanceCompletedBtn").hide();
                    $(".actionBtnInfoToggler").hide();
                    break;
            }


            //To move a boat to maintenance
            $("#moveToMaintenanceBtn")
                .off()
                .on("click", () => {
                    statusUpdater(rowId, "Maintenance");
                });

            //To checkout boat from maintenance:
            $("#maintenanceCompletedBtn")
                .off()
                .on("click", () => {
                    statusUpdater(rowId, "Available");
                });

            //To start charging an electric boat immidiately after a trip:
            $("#moveToChargingBtn")
                .off()
                .on("click", () => {
                    statusUpdater(rowId, "Charging");
                    //To stop charging boat after 10 seconds (for functionality testing purposes):
                    //  1. Get the charging time:
                    let chargingTimeFromServer;
                    $.get("api/available", (boats) => {
                        for (i = 0; i < boats.length; i++) {
                            let boat = boats[i];
                            if (rowId == boat.id) {
                                // chargingTimeFromServer = boat.chargingTime;
                                console.log("collected charging time is: " + boat.chargingTime);
                                setTimeout(() => { statusUpdater(rowId, "Available") }, (boat.chargingTime * 60000));
                                $("#genericConfirmationModal").modal("show");
                                $("#genericConfirmationModalTitle").empty();
                                $("#genericConfirmationModalTitle").text("Charging Completed!");
                                $("#genericConfirmationModalBody").empty();
                                $("#genericConfirmationModalBody").append(
                                    `<p>Boat number:  ${boat.boatNumber}  is now fully charged and became available for clients.</p>`);
                                $("#customModalFooterButtons").empty();
                            }
                        }
                    });
                });

            //To delete a boat from available boats
            $("#deleteBoatActionModalBtn")
                .off()
                .on("click", function() {

                    //Show delete confirmation modal
                    $("#genericConfirmationModal").modal("show");
                    $("#genericConfirmationModalTitle").empty();
                    $("#genericConfirmationModalTitle").text("Caution: Boat will be deleted!!");
                    $("#genericConfirmationModalBody").empty();
                    $("#genericConfirmationModalBody").append(
                        `<p>Through this operation you are PERMANANTLY DELETING this boat from the system.</p>` +
                        `<p class="lead">Are you sure you want to delete this boat?</p>`);
                    $("#customModalFooterButtons").empty();
                    $("#customModalFooterButtons").append(
                        `<button type="button" class="btn btn-danger" id="deleteBoatModalBtn" data-dismiss="modal">Permanently Delete</button>`
                    );

                    $("#deleteBoatModalBtn").click(() => {
                        deleteBoat(rowId);
                    });

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
        });




    //Reservations Management:

    //   _____                                _   _                 
    //  |  __ \                              | | (_)                
    //  | |__) |___  ___  ___ _ ____   ____ _| |_ _  ___  _ __  ___ 
    //  |  _  // _ \/ __|/ _ \ '__\ \ / / _` | __| |/ _ \| '_ \/ __|
    //  | | \ \  __/\__ \  __/ |   \ V / (_| | |_| | (_) | | | \__ \
    //  |_|  \_\___||___/\___|_|    \_/ \__,_|\__|_|\___/|_| |_|___/



    //Date and time pickers in reservation menu, to set the min date dynamically to today
    $("#newReservationModalBtn").click(function() {
        let minDateAttr = new Date();
        let dateString = minDateAttr.getFullYear() + "-" + ("0" + (minDateAttr.getMonth() + 1)).slice(-2) + "-" + ("0" + minDateAttr.getDate()).slice(-2);
        let timeSring = minDateAttr.getHours() + ":" + minDateAttr.getMinutes();
        $("#tripDateReservationPickerInput").attr("min", dateString);
        $(".myTimeInput").attr("min", timeSring);
        console.log($("#tripDateReservationPickerInput").attr("min"));
        let timeInput = $("#tripTimeReservationInput").val();
    });


    //Reservation: suitable available boats table:
    $("#nextBtnReservationModal").click(function() {
        let boatTypeReservationInput = $("#boatTypeReservationInput option:selected").text();
        let tripDateReservationPickerInput = $("#tripDateReservationPickerInput").val();
        let tripTimeReservationInput = $("#tripTimeReservationInput").val();
        let tripDurationReservationInput = $("#tripDurationReservationInput").val();
        let guestNameReservationInput = $("#guestNameReservationInput").val();
        let guestTelNumberReservationInput = $("#guestTelNumberReservationInput").val();
        let numOfPersonsReservationInput = $("#numOfPersonsReservationInput").val();
        console.log(numOfPersonsReservationInput);
        let raftTripPeriod = $("#reservationRaftTripPeriodSelect option:selected").text();
        let raftTripPriceInput = $("#raftTripPriceInput").val();

        reservationAvailableBoats("Available", boatTypeReservationInput, numOfPersonsReservationInput);

        //To draw the dataTable based on the reservation requirements
        function reservationAvailableBoats(status, type, numseats) {
            console.log(numseats);
            let urlCompletion = (status + "/" + type + "/" + numseats).toString();
            console.log(urlCompletion);
            // reservationSuitableAvailableBoatsTable.clear().draw();

            reservationSuitableAvailableBoatsTable = $("#reservationSuitableAvailableBoatsTable").DataTable({
                ajax: {
                    url: 'api/available/reservationavailable/' + urlCompletion,
                    dataSrc: ''
                },
                columns: [
                    { data: 'id' },
                    { data: 'boatNumber' },
                    { data: 'numOfSeats' },
                    { data: 'type' },
                    { data: 'basePrice' },
                    { data: 'customPrice' },
                    // { data: 'status' },
                    {
                        data: null,
                        render: function(data, type, row) {
                            return '<td><button class="btn btn-outline-info select" basePrice="' + data.basePrice + '" boatId="' + data.id + '" boatNum="' + data.boatNumber + '">Select & Confirm</button>';
                        }
                    }
                ]
            });
        }

        //To select a suggested boat for a reservation:
        $("#reservationSuitableAvailableBoatsTable")
            .off()
            .on("click", "button.select", function() {
                let boatNum = $(this).attr("boatNum");
                let boatId = $(this).attr("boatId");
                let basePrice = $(this).attr("basePrice");

                //Calculate the price:
                let calcPrice = tripDurationReservationInput * basePrice;

                let newReservation = {
                    boatType: boatTypeReservationInput,
                    boatNumber: boatNum,
                    tripDate: tripDateReservationPickerInput,
                    tripTime: tripTimeReservationInput,
                    tripDuration: tripDurationReservationInput,
                    guestName: guestNameReservationInput,
                    telNumber: guestTelNumberReservationInput,
                    calculatedPrice: calcPrice,
                    raftTripPeriod: raftTripPeriod,
                    raftTripPrice: raftTripPriceInput
                }

                var jsonObject = JSON.stringify(newReservation);

                $.ajax({
                    url: "api/reservations",
                    type: "POST",
                    contentType: "application/json",
                    data: jsonObject,
                    success: function(resId) {
                        // console.log(resId);
                        statusUpdater(boatId, "Reserved");
                        reservationSuitableAvailableBoatsTable.ajax.reload();
                        alert("Reservation added");
                        reservationsTable.ajax.reload();
                        getReservations();
                        reservationSuitableAvailableBoatsTable.destroy();
                        $("#reservationSuitableAvailableBoatsContainer").collapse('hide');
                        $("#reservationsTable").collapse('show');

                        //Show reservation confirmation modal:
                        $("#reservationConfModal").modal("show");
                        $("#reservationIdSpan").text(resId);
                        $("#reservationBoatNumberSpan").text(boatNum);
                        $("#rentalCostSpan").text(calcPrice);

                    },
                    error: function() {
                        alert("ERROR");
                    }
                });

            });

        function getReservations() {
            $.get("api/reservations", function(reservations) {
                console.log(reservations);
            });
        }
    });

    //List of Reservations table:
    reservationsTable = $("#reservationsTable").DataTable({
        ajax: {
            url: "api/reservations",
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'boatNumber' },
            { data: 'boatType' },
            { data: 'tripDate' },
            { data: 'tripTime' },
            { data: 'tripDuration' },
            { data: 'guestName' },
            { data: 'telNumber' },
            { data: 'calculatedPrice' },
            {
                data: null,
                render: function(data, row, type) {
                    return '<button class="btn btn-danger cancel" rowid="' + data.id + '" boatNum="' + data.boatNumber + '">Cancel</button>';

                }
            },

        ]
    });


    //To cancel reservation:
    $("#reservationsTable")
        .off()
        .on("click", "button.cancel", function() {
            console.log("clicked");
            let rowId = $(this).attr("rowid");
            let boatnumber = $(this).attr("boatNum");

            console.log("Delete button clicked, this is the rowIed: " + rowId);
            $.ajax({
                url: 'api/reservations/' + rowId,
                type: "DELETE",
                success: function() {
                    reservationsTable.ajax.reload();
                    alert("Reservation cancelled");
                },
                error: function() {
                    alert("ERROR");
                }
            });
        });

    //To start a trip from a reservation:
    $("#reservationsTable")
        .off()
        .on("click", "button.start", function() {
            let rowId = $(this).attr("rowid");
            let boatnumber = $(this).attr("boatNum");

            //Get boat id:
            let boatId;
            $.get("api/available", function(boats) {
                for (i = 0; i < boats.length; i++) {
                    let boat = boats[i];
                    if (boat.boatNumber == boatnumber) {
                        boatId = boat.id;
                    }
                }
            });

            //Start trip guest details collection modal:
            $("#startTripGuestDetailsModal").modal("show");

            //To add new trip with the information collected
            $("#startTripBtn")
                .off()
                .on("click", function() {

                    let newTrip = {
                        boatNumber: boatnumber,
                        tripDate: null,
                        tripStart: null,
                        tripEnd: null,
                        duraion: null,
                        totalPrice: null,
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
                            ongoingTripsTable.ajax.reload();
                            alert("Trip added");
                            statusUpdater(boatId, "Rented");
                            getOngoingTrips();
                        },
                        error: function() {
                            alert("ERROR");
                        }
                    });
                });
        });





    //Trips Management

    //   _______   _             __  __                                                   _   
    //  |__   __| (_)           |  \/  |                                                 | |  
    //     | |_ __ _ _ __  ___  | \  / | __ _ _ __   __ _  __ _  ___ _ __ ___   ___ _ __ | |_ 
    //     | | '__| | '_ \/ __| | |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '_ ` _ \ / _ \ '_ \| __|
    //     | | |  | | |_) \__ \ | |  | | (_| | | | | (_| | (_| |  __/ | | | | |  __/ | | | |_ 
    //     |_|_|  |_| .__/|___/ |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_| |_| |_|\___|_| |_|\__|
    //              | |                                    __/ |                              
    //              |_|                                   |___/                               


    //Start Trip, Show available boats:
    $("#showAvailableBoatsBtn")
        .off()
        .on("click", function() {
            let numOfGuests = $("#numberOfPersonsInput").val();
            let typeOfBoat = $("#boatTypeSelect option:selected").text();
            startTripAvailableBoats("Available", typeOfBoat, numOfGuests);
        });

    //To list available and suitable boats for the new trip:
    function startTripAvailableBoats(status, type, numseats) {
        let urlCompletion = (status + "/" + type + "/" + numseats).toString();

        startTripAvailableBoatsTable = $("#startTripAvailableBoatsTable").DataTable({
            ajax: {
                url: 'api/available/reservationavailable/' + urlCompletion,
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
                        return '<td><button class="btn btn-outline-info select" boatId="' + data.id + '" boatNum="' + data.boatNumber + '">Select</button>';
                    }
                }

            ]
        });

    }

    //To select a boat to start a new trip when the Select button is clicked:
    $("#startTripAvailableBoatsTable")
        .off()
        .on("click", "button.select", function() {
            let boatNum = $(this).attr("boatNum");
            let boatId = $(this).attr("boatId");

            //Get hourly rate of the selected boat:
            let boatBasePrice;
            $.get("api/available", function(boats) {
                for (i = 0; i < boats.length; i++) {
                    let boat = boats[i];
                    if (boat.id == boatId) {
                        boatBasePrice = boat.basePrice;
                    }
                }
            });

            //Shows modal to collect guest information:
            $("#startTripGuestDetailsModal").modal("show");

            //To start a new trip with the information collected
            $("#startTripBtn")
                .off()
                .on("click", function() {

                    let newTrip = {
                        boatNumber: boatNum,
                        pricePerHour: boatBasePrice,
                        tripDate: null,
                        tripStart: null,
                        tripEnd: null,
                        duraion: null,
                        totalPrice: null,
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
                            statusUpdater(boatId, "Rented");
                            getOngoingTrips();
                            startTripAvailableBoatsTable.destroy();
                            $("#startTripListOfAvailableBoatsContainer").collapse('hide');
                        },
                        error: function() {
                            alert("ERROR");
                        }
                    });
                });
        });


    //Get list of ongoing trips (to console it):
    function getOngoingTrips() {
        $.get("api/trips", function(tripsList) {
            console.log(tripsList);
        });
    }

    //To list ongoing trips in a table:
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
                    if (data.status === "Ongoing") {
                        return '<td><button class="btn btn-warning endTrip" rowid="' + data.id + '" boatNum="' + data.boatNumber + '">End</button>';
                    } else {
                        return '<td><button class="btn btn-warning endTrip" disabled>End</button>'
                    }
                }
            }
        ]
    });


    //To get guest details in a modal popup when the Details button in the list of Ongoing Trips is clicked:
    $("#ongoingTripsTable")
        .off()
        .on("click", "button.guestDetails", function() {
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


    //To end an ongoing trip, when the End button in the List of Ongoing trips is clicked:
    $("#ongoingTripsTable").on('click', 'button.endTrip', function() {
        let tripId = $(this).attr("rowid");
        console.log("trip id: " + tripId);
        let tripBoatNumber = $(this).attr("boatNum");
        console.log("trip boat number: " + tripBoatNumber);
        let collectedBoatID;
        console.log("collected boat id: " + collectedBoatID);
        let collectedBoatType;
        console.log("collected boat type: " + collectedBoatType);
        getBoatId(tripBoatNumber);
        endTrip(tripId);

        //To get the boat id in order to update the boat status:
        function getBoatId(tripBoatNumber) {
            $.get("api/available", function(boats) {
                console.log("boats list: " + boats);
                for (i = 0; i < boats.length; i++) {
                    let boat = boats[i];
                    if (boat.boatNumber == tripBoatNumber) {
                        collectedBoatID = boat.id;
                        collectedBoatType = boat.type;
                    }
                }
            });
        }

        function endTrip(id) {
            //Get ongoing trips
            $.get("api/trips", function(ongoingTrips) {
                for (i = 0; i < ongoingTrips.length; i++) {
                    let trip = ongoingTrips[i];
                    if (id == trip.id) {
                        console.log("id matched in if statement");

                        //Post updated trip data to end the trip
                        let endTrip = {
                            boatNumber: trip.boatNumber,
                            pricePerHour: trip.pricePerHour,
                            tripDate: trip.tripDate,
                            tripStart: trip.tripStart,
                            tripEnd: null,
                            duraion: null,
                            totalPrice: null,
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
                                ongoingTripsTable.ajax.reload();
                                alert("Trip completed");
                                //Electric boats need to get recharged immidiately after a trip:
                                if (collectedBoatType === "Electric") {
                                    statusUpdater(collectedBoatID, "Charging");
                                    availableBoats.ajax.reload();
                                } else {
                                    statusUpdater(collectedBoatID, "Available");
                                    availableBoats.ajax.reload();
                                }
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


    //Start a Rafts Trip: applicable reservations table (in the modal):
    $("#showReservedRaftsBtn")
        .off()
        .on("click", () => {


            $.get("api/reservations/count/Raft", (response) => {
                console.log(response);
            });

            showReservedRafts("Raft");

        });

    function showReservedRafts(selectedBoatType) {
        applicableRaftsReservationsTable = $("#applicableRaftsReservationsTable").DataTable({
            ajax: {
                url: "api/reservations/" + selectedBoatType,
                dataSrc: ''
            },
            columns: [
                { data: 'id' },
                { data: 'boatNumber' },
                { data: 'guestName' },
                {
                    data: null,
                    render: function(data, type, row) {
                        // return '<td><div class="custom-control custom-checkbox"><input type="checkbox" name="raftReserved" class="custom-control-input" value="' + data.boatNumber + '" checked=""></div></td>';
                        return '<td><button class="btn btn-warning add" boatnum="' + data.id + '" >Add</button></td>';
                    }
                }
            ]
        });

    }


    //To add the selected boat numbers to the raft trip
    let listOfRaftsForTrip = [];
    $("#applicableRaftsReservationsTable")
        .off()
        .on("click", "button.add", () => {
            let boatNumber = $(this).attr("boatnum");
            console.log(boatNumber);

            //Check if the boat number has been added, to avoid duplicates:
            if (listOfRaftsForTrip.includes(boatNumber)) {
                alert("you have already added this boat to the trip");
            } else {
                listOfRaftsForTrip.push(boatNumber);
                console.log(listOfRaftsForTrip);
            }
        });





    //Pricing management:

    //   _____      _      _               __  __                                                   _   
    //  |  __ \    (_)    (_)             |  \/  |                                                 | |  
    //  | |__) | __ _  ___ _ _ __   __ _  | \  / | __ _ _ __   __ _  __ _  ___ _ __ ___   ___ _ __ | |_ 
    //  |  ___/ '__| |/ __| | '_ \ / _` | | |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '_ ` _ \ / _ \ '_ \| __|
    //  | |   | |  | | (__| | | | | (_| | | |  | | (_| | | | | (_| | (_| |  __/ | | | | |  __/ | | | |_ 
    //  |_|   |_|  |_|\___|_|_| |_|\__, | |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_| |_| |_|\___|_| |_|\__|
    //                              __/ |                            __/ |                              
    //                             |___/                            |___/                               


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

    //To reset the pricing form:
    $("#boatsPricingFormResetBtn").click(function() {
        console.log("button reset clicked");
        $("#boatsBasePriceInput").val(''),
            $("#boatsPricingTimeInputFrom").val(''),
            $("#boatsPricingTimeInputTo").val(''),
            $("#boatsCustomPriceInput").val('')
    });


});