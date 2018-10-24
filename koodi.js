//Miikka Niemeläinen ja Teemu Rossi, 2018, All rights reserved


//Alustetaan muuttuja i, jolla saadaan yksilöllinen id jokaiselle todo listan objektille
var i = 0;

//funktio, jolla lisätään esineitä todo listalle
function lisääTehtävä() {
  //tarkistetaan että on annettu jotain sisältöä tehtävään


  //haetaan lisättävän tehtävän nimi tekstikentästä
  //samalla tarkistellaan että on annettu jokin tehtävä
  var lomake = document.forms["myForm"]["todoNimi"].value;
  var kuvaus = document.forms["myForm"]["todoKuvaus"].value;
  if (lomake== ""){
    alert("Anna jokin tehtävä!");

  }
  else {
  //haetaan HTML tägi, johon tehtävä lisätään
  var lisäys = document.getElementById("kesken");


  //lisätään objekti sivulle checkboxin kera, jolla tehtävä saadaan poistettua kun se on valmis
  lisäys.innerHTML += `<li>
                          <div class="card-body">
                            <h5 class="card-title">` + lomake + `</h5>
                            <p class="card-text">` + kuvaus + `</p>
                            <button class="btn btn-primary btn-sm" id="objekti" onclick="poista(this)">Done</button>
                          </div>
                        </li>
                        `
  
  //Tyhjennetään tekstikenttä
  document.forms["myForm"]["todoNimi"].value = "";
  document.forms["myForm"]["todoKuvaus"].value = "";
}

}


//tällä funktiolla saadaan valmiit tehtävät piiloon ja takaisin näkyviin
function nakyvyys(){
  var x = document.getElementById("valmiit");
  var y = document.getElementById("poistanappi");
  if(x.style.display == "none"){
    x.style.display = "block";
    y.innerHTML = "Piilota valmiit"
  }else{
    x.style.display = "none";
    y.innerHTML = "Näytä valmiit"

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
  task.childNodes[5].style.display = "none";

}
