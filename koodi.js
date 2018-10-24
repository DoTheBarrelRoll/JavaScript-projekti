//Miikka Niemeläinen ja Teemu Rossi, 2018, All rights reserved


//Alustetaan muuttuja i, jolla saadaan yksilöllinen id jokaiselle todo listan objektille
var i = 0;

//funktio, jolla lisätään esineitä todo listalle
function lisääTehtävä() {
  //tarkistetaan että on annettu jotain sisältöä tehtävään


  //haetaan lisättävän tehtävän nimi tekstikentästä
  //samalla tarkistellaan että on annettu jokin tehtävä
  var lomake = document.forms["myForm"]["todoNimi"].value;
  if (lomake== ""){
    alert("Anna jokin tehtävä!");

  }
  else {
  //haetaan HTML tägi, johon tehtävä lisätään
  var lisäys = document.getElementById("kesken");
  //Luodaan jokaiselle tehtävälle yksilöllinen id, jotta siihen voi myöhemmin viitata
  var tunnus = "objekti";
  var kirjain = i.toString();
  var kokotunnus = tunnus.concat(kirjain);

  //lisätään objekti sivulle checkboxin kera, jolla tehtävä saadaan poistettua kun se on valmis
  lisäys.innerHTML += "<li class=\"list-group-item\"><button class=\"btn btn-primary btn-sm\" id=\"objekti\" onclick=\"poista(this)\">Done</button>" + "\t" + lomake + "</li><br>";
  //vaihdetaan tehtävälle id, joka luotiin aiemmin
  document.getElementById("objekti").id = kokotunnus;
  //korotetaan i muuttujaa yhdellä, jotta seuraavan tehtävän id ei ole sama
  i++;
  //Tyhjennetään tekstikenttä
  document.forms["myForm"]["todoNimi"].value = "";
}

}





//Tällä funktiolla poistetaan valmiit tehtävät todo listasta

function poista(btn) {
  var task = btn.parentNode;
  var ul = task.parentNode;
    //samalla tuodaan näkyviin näppäin
    //jolla voidaan piilottaa tehdyt tehtävät lista
  var x = document.getElementById('poistanappi').style.display = "block";

  ul.removeChild(task);
  var done = document.getElementById("valmiit");
  done.appendChild(task);
  task.style.color = "gray";
  task.style.textDecoration = "line-through";
  task.childNodes[0].style.display = "none";

}
