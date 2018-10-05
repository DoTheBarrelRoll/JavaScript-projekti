//Miikka Niemeläinen ja Teemu Rossi, 2018, All rights reserved


//Alustetaan muuttuja i, jolla saadaan yksilöllinen id jokaiselle todo listan objektille
var i = 0;

//funktio, jolla lisätään esineitä todo listalle
function lisääTehtävä() {
  //haetaan lisättävän tehtävän nimi tekstikentästä
  var lomake = document.forms["myForm"]["todoNimi"].value;
  //haetaan HTML tägi, johon tehtävä lisätään
  var lisäys = document.getElementById("teksti");
  //Luodaan jokaiselle tehtävälle yksilöllinen id, jotta siihen voi myöhemmin viitata
  var tunnus = "objekti";
  var kirjain = i.toString();
  var kokotunnus = tunnus.concat(kirjain);

  //lisätään objekti sivulle checkboxin kera, jolla tehtävä saadaan poistettua kun se on valmis
  lisäys.innerHTML += "<input  type = \"checkbox\" id=\"objekti\" onclick=\"poista()\">" + "\t" + lomake + "<br>";
  //vaihdetaan tehtävälle id, joka luotiin aiemmin
  document.getElementById("objekti").id = kokotunnus;
  //korotetaan i muuttujaa yhdellä, jotta seuraavan tehtävän id ei ole sama
  i++;

}

//Tällä funktiolla poistetaan valmiit tehtävät todo listasta
function poista() {
  //TODO tee funktio :D
}
