var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
let aika = (new Date(Date.now() - tzoffset)).toISOString();


function lataaAsemat() {
  $('#error').hide();
  $('.taulut').hide();
  $('#lähijunat').hide();
  $('#kaukojunat').hide();



  $.ajax({
    url: "https://rata.digitraffic.fi/api/v1/metadata/stations",
    dataType: 'json',
    success: function(result) {
      for (var i = 0; i < result.length; i++) {
        $('.asemat').append('<option value="' + result[i].stationShortCode + '">' + result[i].stationName + '</option>');
      }

    }
  })


}

function lataaJunat() {

  $('#error').hide();
  $('#taulukeho1').html('');
  $('#taulukeho2').html('');
  var iterator = 20;
  var iterator2 = 20;

  var lähtöasema = $('#lähtö').val();
  var määränpää = $('#maali').val();
  var url = "https://rata.digitraffic.fi/api/v1/live-trains/station/" + lähtöasema + "/" + määränpää + "?startDate=" + aika + "&limit=1000";

  $.ajax({
      url: url,
      dataType: 'json',
      success: function(result) {
        if (result.queryString != null) {
          $('#error').show();

        }

        $('.taulut').show();




        for (var i = 0; i < result.length; i++)
          for (var j = 0; j < result[i].timeTableRows.length; j++) {

            if (result[i].timeTableRows[j].stationShortCode == lähtöasema && result[i].timeTableRows[j].type == "DEPARTURE" && result[i].commuterLineID != "") {
              var saapumisaika = new Date(result[i].timeTableRows[j].scheduledTime);
              var peruna = `
                          <tr>
                            <td>` + result[i].commuterLineID + `</td>
                            <td>` + result[i].timeTableRows[j].commercialTrack + `</td>
                            <td>` + saapumisaika.toUTCString().slice(17, 22) + `</td>
                            <td>
                          `;

            }
            if (result[i].timeTableRows[j].stationShortCode == määränpää && result[i].timeTableRows[j].type == "ARRIVAL" && result[i].commuterLineID != "") {

              var perilläaika = new Date(result[i].timeTableRows[j].scheduledTime);
              console.log(perilläaika.toUTCString().slice(17, 22));
              $('#taulukeho1').append(peruna + perilläaika.toUTCString().slice(17, 22) + `</td>
                      </tr>
                    `);

            }

          }

      }


    }






)



}
