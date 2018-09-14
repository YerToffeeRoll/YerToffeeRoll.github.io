$(document).ready(function() {

        var feed1 = "https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/2650225";
        var feed2 = "https://scholar.hw.ac.uk/interview/rs/allotment/data";
        var feed4 = "";
        var feed3 = "https://docs.google.com/spreadsheets/d/1UNStI1glGxMkBFxDplyycZs2ZTM01R-QAiaTZY2Pb94/gviz/tq?tqx=out:html&tq=select%20A%2C%20B%20%2C%20C%2C%20D%2C%20E%2C%20F%2C%20H%20WHERE%20B%20%3D%20%27Course3%27%0A&gid=1443893815";

        var weather = $('.weather_feed');
        var allotment = $('.allotment_feed');
        var coursedata = $('.chart_feed');

        weather.attr('display', 'none');
        allotment.attr('display', 'none');
        coursedata.attr('display', 'none');




        $.ajax(feed1, {
            accepts: {
                xml: "application/rss+xml"
            },
            dataType: "xml",
            success: function (data) {


                $(data).find("item").each(function () { // or "item" or whatever suits your feed
                    var el = $(this);
                    var feed = $('.weather_feed div.weather_data');
                    feed.append("<li>------------------------</li>");
                    feed.append("<a href='\" + el.find(\"link\").text() + \"' ><h2>" + el.find("title").text() + "</h2></a>");
                    feed.append("<p>" + el.find("description").text() + "</p>");
                });
                weather.attr('display', 'block');

            },
            error: function (data) {
                alert("No weather feed");
            }
        });


        $('button#allotment').on('click', function () {



            $.ajax(feed2, {
                accepts: {
                    json: "application/json"
                },
                dataType: "json",
                success: function (data) {

                    var allotment_feed = $('.allotment_feed div.allotment_data');
                    $.each(data, function (idx, obj) {
                        allotment_feed.append("<h2>" + idx + "</h2>");
                        $.each(obj, function (idx1, obj1) {
                            allotment_feed.append("<p>" + obj1.name + " " + obj1.variety + "</p>");
                        });
                    });
                    weather.attr('display', 'none');
                    allotment.attr('display', 'block');
                    coursedata.attr('display', 'none');
                },
                error: function (data) {
                    alert("No allotment feed");
                }
            });
        });


        $('button#students').on('click', function () {


        // Load the Visualization API and the corechart package.
        google.charts.load('current', {packages: ['corechart', 'table']});
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawSheetName);


        function drawSheetName() {
            var queryString = encodeURIComponent("SELECT C, E, F, H WHERE B = 'Course3'");
            var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1UNStI1glGxMkBFxDplyycZs2ZTM01R-QAiaTZY2Pb94/gviz/tq?sheet=coursedata&headers=1&tq=' + queryString);
            query.send(handleSampleDataQueryResponse);
        }

        function handleSampleDataQueryResponse(response) {
            if (response.isError()) {
                alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            var data = response.getDataTable();
            var table = new google.visualization.Table(document.getElementById('table_div'));
            table.draw(data, {showRowNumber: true});
            weather.attr('display', 'none');
            allotment.attr('display', 'none');
            coursedata.attr('display', 'block');
        }

        });

    });