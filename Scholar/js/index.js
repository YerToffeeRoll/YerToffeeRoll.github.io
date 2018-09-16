/*!
  * index.js
  * Sam Killen
  * Load data sources on page via ajax and google charts library. Then hide data and show via button selected data.
  */

$(document).ready(function() {

        var feed1 = "https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/2650225";
        var feed2 = "https://scholar.hw.ac.uk/interview/rs/allotment/data";
        var feed3 = "https://docs.google.com/spreadsheets/d/1UNStI1glGxMkBFxDplyycZs2ZTM01R-QAiaTZY2Pb94/gviz/tq?tqx=out:html&tq=select%20A%2C%20B%20%2C%20C%2C%20D%2C%20E%2C%20F%2C%20H%20WHERE%20B%20%3D%20%27Course3%27%0A&gid=1443893815";
  
		
		   $.ajax(feed1, {
            accepts: {
                xml: "application/rss+xml"
            },
            dataType: "xml",
            success: function (data) {
				 var feed = $('div#weather');
                 feed.append("<h2>Weather Data</h2>");
                $(data).find("item").each(function () { // or "item" or whatever suits your feed
                    var el = $(this);
                   
                    feed.append("<hr>");
                    feed.append("<a href='" + el.find("link").text() + "' ><h2>" + el.find("title").text() + "</h2></a>");
                    feed.append("<p>" + el.find("description").text() + "</p>");
                });
            },
            error: function (data) {
                alert("No weather feed");
            }
        });
		
		 $.ajax(feed2, {
                accepts: {
                    json: "application/json"
                },
                dataType: "json",
                success: function (data) {

                    var allotment_feed = $('div#allotment');
                    $.each(data, function (idx, obj) {
                        allotment_feed.append("<h2>" + idx + "</h2>");
                        $.each(obj, function (idx1, obj1) {
                            allotment_feed.append("<p>" + obj1.name + " " + obj1.variety + "</p>");
                        });
                    });
             
                },
                error: function (data) {
                    alert("No allotment feed");
                }
            });
			
			
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
            var table = new google.visualization.Table(document.getElementById('student'));
            table.draw(data, {showRowNumber: true, width: '100%', height:'550px'});
           
        }
		
		//clear feed and show weather
		$(".feed").hide();
		$(".feed#weather").show();

		$('button').on('click',function() {
			//clear feed and show selected data
		   $(".feed").hide();
			var clickid = this.id;
			$('.feed#'+clickid).show();

		});
	

    });