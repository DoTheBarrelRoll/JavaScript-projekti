var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
let aika = (new Date(Date.now() - tzoffset)).toISOString();
var iterator = 20;

function lataaAsemat() {
    $('#error').hide();
    $('.taulut').hide();



  $.ajax({
    url: "https://rata.digitraffic.fi/api/v1/metadata/stations",
    dataType: 'json',
    success: function(result) {
      for (var i = 0; i < result.length; i++) {
        $('.asemat').append('<option value="' + result[i].stationShortCode + '">' + result[i].stationName + '</option>');
      }

    }
  })

  $('#otsikko').html(aika);
}

function lataaJunat() {

  $('#error').hide();
  $('#taulukeho1').html('');
  $('#taulukeho2').html('');
  iterator = 20;

  var lähtöasema = $('#lähtö').val();
  var määränpää = $('#maali').val();
  var url = "https://rata.digitraffic.fi/api/v1/live-trains/station/" + lähtöasema + "/" + määränpää + "?startDate=" + aika + "&limit=1000";

  $("#otsikko").html(url);
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(result) {
      if (result.queryString != null) {
        $('#error').show();
        $('.taulut').fadeOut();
      }
      $('.taulut').fadeIn(1500);

      for (var i = 0; i < 20; i++) {

        for (var j = 0; j < result[i].timeTableRows.length; j++) {
          if (result[i].timeTableRows[j].stationShortCode == lähtöasema && result[i].timeTableRows[j].type == "DEPARTURE" && result[i].commuterLineID != "") {
            var saapumisaika = new Date(result[i].timeTableRows[j].scheduledTime);
            $('#taulukeho1').append(`
                      <tr>
                        <td>` + result[i].commuterLineID + `</td>
                        <td>` + result[i].timeTableRows[j].commercialTrack + `</td>
                        <td>` + saapumisaika.toUTCString().slice(17,22) + `</td>
                      </tr>
                      `)
          }

        }



      }

      for (var i = 0; i < result.length; i++) {
        for (var k = 0; k < result[i].timeTableRows.length; k++) {
          if (result[i].trainCategory=="Long-distance" && result[i].timeTableRows[k].stationShortCode == lähtöasema && result[i].timeTableRows[k].type == "DEPARTURE"){
            var saapumisaika = new Date(result[i].timeTableRows[k].scheduledTime);
            $('#taulukeho2').append(`
              <tr>
                <td>` + result[i].trainType + `</td>
                <td>` + result[i].timeTableRows[k].commercialTrack + `</td>
                <td>` + saapumisaika.toUTCString().slice(17,22) + `</td>
              </tr>
              `)
              iterator--;
              console.log(iterator);
          }
        }
      }
    }


    }

  )



}
