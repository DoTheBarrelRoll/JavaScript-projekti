//Miikka Niemeläinen ja Teemu Rossi, 2018, All rights reserved



//funktio jolla muutetaan inputfieldin borderin väri  (jos tullut virhetilanne ei tämä jää punaiseksi kun alkaa korjaamaan virhettä eli kirjoittamaan inputtiin)
function normaalivari() {

  var reuna = document.getElementById("tekstikenttä");
  reuna.style.borderColor = "";
}

//funktio, jolla lisätään esineitä todo listalle
function lisääTehtävä() {

  //haetaan lisättävän tehtävän nimi ja kuvaus tekstikentistä
  var lomake = document.forms["myForm"]["todoNimi"].value;
  var kuvaus = document.forms["myForm"]["todoKuvaus"].value;
  //tarkistetaan että on annettu jotain sisältöä tehtävään ja jos ei, annetaan alert+highlightataan kohdan
  if (lomake== ""){
    alert("Anna jokin tehtävä!");
    var x = document.getElementById("tekstikenttä");
    x.style.borderColor = "red";
  }
  else {
  //haetaan ul tägi, johon tehtävä lisätään
  var lisäys = document.getElementById("kesken");


  //lisätään tehtävä listaan list iteminä, muotoillaan se bootstrapillä
  // ja lisätään siihen nappi, jolla se saadaan siirrettyä valmiisiin tehtääviin
  lisäys.innerHTML += `<li>
                          <div class="card-body">
                            <h5 class="card-title">` + lomake + `</h5>
                            <p class="card-text">` + kuvaus + `</p>
                            <button class="btn btn-primary btn-sm" onclick="poista(this)">Done</button>
                          </div>
                        </li>
                        `

  //Tyhjennetään tekstikentät
  document.forms["myForm"]["todoNimi"].value = "";
  document.forms["myForm"]["todoKuvaus"].value = "";
}

}


//tällä funktiolla saadaan valmiit tehtävät piiloon ja takaisin näkyviin
function nakyvyys(){
//haetaan elementit joiden sisältöä muutetaan
  var x = document.getElementById("valmiit");
  var y = document.getElementById("poistanappi");
  // if lauseen avulla tarkistetaan mikä display style on käytössä
  // ja muutetaan se vastakkaiseksi
  // samalla myös muutetaan näppäimen nimi (y variablen arvo) sen mukaan mitä näppäin sillä hetkellä tekee
  if(x.style.display == "none"){
    x.style.display = "block";
    y.innerHTML = "Piilota valmiit"
  }else{
    x.style.display = "none";
    y.innerHTML = "Näytä valmiit"

  }

}



//Tällä funktiolla siirretään valmis tehtävä toiseen tauluun

function poista(btn) {
  //Haetaan napin parentnode (li)
  var task = btn.parentNode;

  //Haetaan li:n parentnode (ul)
  var ul = task.parentNode;

    //samalla tuodaan näkyviin näppäin
    //jolla voidaan piilottaa tehdyt tehtävät lista
    //koska tämän ei tarvitse olla näkyvissä jos yhtäkään tehtävää ei ole vielä luotu
  var x = document.getElementById('poistanappi').style.display = "block";

  //poistetaan Keskeneräiset listasta tehtävä, jonka nappia painetaan
  ul.removeChild(task);

  //haetaan valmiit tehtävä lista ja tallennetaan se muuttujaan
  var done = document.getElementById("valmiit");

  //Lisätään valmiit tehtävät listaan Keskeneräiset listasta poistettu tehtävä
  done.appendChild(task);

  //Muotoillaan valmis tehtävä ja piilotetaan nappi
  task.style.color = "gray";
  task.style.textDecoration = "line-through";
  task.childNodes[5].style.display = "none";
  tallennus();
}

//tallennetaan valmiit ja keskeneräiset tehtävät localStorageen
function tallennus() {
  //haetaan keskeneräiset tehtävät ul elementistä ja lisätään ne localStorageen
  var keskeneräiset = document.getElementById("kesken").innerHTML;
  localStorage.setItem("lista1", keskeneräiset);

  //haetaan valmiit tehtävät ul elementistä ja lisätään ne localStorageen
  var valmiit = document.getElementById("valmiit").innerHTML;
  localStorage.setItem("lista2", valmiit);
}

//Tarkistetaan, onko localStoragessa tallennettuja tehtäviä
//Jos on, lisätään ne tauluihin
function lataus() {
  var keskeneräiset = document.getElementById("kesken");
  keskeneräiset.innerHTML = localStorage.getItem("lista1");
  var valmiit = document.getElementById("valmiit")
  valmiit.innerHTML = localStorage.getItem("lista2");

  //Tarkistetaan, onko valmiit taulussa tehtäviä
  //Jos on, näytetään "Piilota valmiit" nappi
  if (valmiit.children.length > 0) {
    var x = document.getElementById('poistanappi').style.display = "block";
  }
}

function poistavalmiit() {
  var varmistus = confirm("Haluatko varmasti poistaa kaikki valmiit tehtävät?");
  if (varmistus == true) {
    localStorage.setItem("lista2", "");
    lataus();
  } else {

  }

}
