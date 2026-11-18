const kategorieSkrótów = {
"19_11_stroje_sprzet" : {
      "kij (golfowy)": "golf club",
"kosz": "basket",
"kij (np. do baseballa, krykieta)": "bat",
"deska (np. snowboardowa)": "board",
"buty (np. narciarskie)": "boots",
"łuk": "bow",
"czapka, czepek": "cap",
"rękawice": "gloves",
"bramka": "goal",
"gogle": "goggles",
"kask": "helmet",
"siatka": "net",
"wiosło": "oar",
"ochraniacze (np. na kolana, łokcie)": "pads",
"krążek (hokejowy)": "puck",
"rakieta": "racket",
"siodło, siodełko roweru": "saddle",
"łyżwy, wrotki": "skates",
"dres": "tracksuit",
"buty sportowe": "trainers",
"ciężarki": "weights",
"strój piankowy do nurkowania": "wetsuit",
},
        "19_11_obiekty_sportowe" : {
"boisko do koszykówki": "basketball court",
"sala bilardowa": "pool table room",
"kręgielnia": "bowling alley",
"ring bokserski": "boxing ring",
"ścianka wspinaczkowa": "climbing wall",
"boisko": "field",
"boisko do piłki nożnej": "football pitch",
"pole golfowe": "golf course",
"sala gimnastyczna, siłownia": "gym",
"lodowisko": "ice rink",
"basen": "pool",
"plac z przeszkodami do jazdy na deskorolce": "skate park",
"stok": "slope / piste",
"stadion": "stadium",
"kort tenisowy": "tennis court",
"tor, bieżnia": "track",
        },
        "18_11_imprezy_sportowe" : {
"pokonać kogoś": "beat sb",
"pobić rekord": "break a record",
"wprowadzić do gry (np. zawodnika na boisko)": "bring on",
"kapitan": "captain",
"mistrzostwa": "championships",
"kibicować drużynie": "cheer a team on",
"trener, trenerka": "coach / trainer",
"być pierwszym/drugim na mecie": "come in first/second",
"wziąć udział w zawodach": "enter a competition",
"ostatni gwizdek": "final whistle",
"finalista": "finalist",
"bramkarz": "goalkeeper",
"złoty medalista": "gold medallist",
"eliminacje": "heat",
"Międzynarodowy Komitet Olimpijski": "International Olympic Committee",
"sędzia": "judge",
"trzymać kciuki": "keep one's fingers crossed",
"Igrzyska Olimpijskie": "Olympic Games",
"paraolimpijczyk": "Paralympic athlete",
"osoba/drużyna, która zdobyła drugie miejsce w zawodach": "runner-up",
"turniej": "tournament",
"trofeum, puchar": "trophy",
"Puchar Świata": "World Cup",
        },
        "18_11_uprawianie_sportu" : {
               "lekkoatleta/lekkoatletka": "athlete",
"kajakarz/kaj akarka": "canoeist",
"wspinacz": "climber",
"krykiecista/krykiecistka": "cricketer",
"cyklista/cyklistka": "cyclist",
"nurek": "diver",
"golfista/golfistka": "golfer",
"gimnastyk/gimnastyczka": "gymnast",
"dżokej": "jockey",
"kierowca wyścigowy": "racing driver",
"wioślarz/wioślarka": "rower",
"rugbista": "rugby player",
"żeglarz/żeglarka": "sailor",
"tenisista/tenisistka": "tennis player",
"siatkarz/siatkarka": "volleyball player",
"zapaśnik/zapaśniczka": "wrestler",
        },
          "18_11_czynnosci" : {
                  "odbijać / uderzać / rzucać piłkę" : "bounce / hit / throw a ball",
"dogonić (kogoś)": "catch up with",
"uprawiać sport": "do / play sports",
"wykonywać ćwiczenie, ćwiczyć": "do exercise",
"dać z siebie wszystko": "do your best",
"zremisować z": "draw with",
"poddać się, porzucić": "give up",
"pojechać na narty": "go skiing",
"uderzyć piłkę": "hit a ball",
"utrzymywać formę": "keep fit",
"znokautować": "knock out",
"robić postępy": "make progress",
"stracić okazję": "miss a chance",
"grać w szachy": "play chess",
"grać w drużynie": "play for a team",
"zakwalifikować się do": "qualify for",
"obronić strzał (o bramkarzu)": "save a goal",
"zdobyć bramkę/punkt": "score a goal / point",
"usunąć kogoś z boiska, wykluczyć kogoś z gry": "send sb off",
"wyjść na prowadzenie": "take the lead",
"wziąć w czymś udział": "take part in sth",
"zacząć uprawiać": "take up",
"rozpiąć (buty)": "undo (boots)",
"rozgrzewać się, robić rozgrzewkę": "warm up",
"ćwiczyć": "work out",
        },
          "18_11_poztywne_neg_sport" : {
"dokładność, precyzja": "accuracy",
"stracić przytomność": "black out",
"pewność siebie": "confidence",
"koordynacja": "coordination",
"wpaść na": "crash into",
"determinacja, wytrwałość": "determination",
"rozwój": "development",
"upaść, przewrócić się": "fall down",
"gibkość, elastyczność": "flexibility",
"koncentracja": "focus",
"doznać kontuzji, zranić się": "get injured",
"utrzymywać formę": "keep in shape",
"stracić równowagę": "lose your balance",
"obolałe mięśnie": "sore muscles",
"wytrzymałość": "stamina",
        },
};

let skroty = {};
let wagiPojec = {}; // Przechowuje wagi dla każdego słówka
let poprzedniSkrót = null;

// Aktualizacja bazy słów na podstawie zaznaczonych kategorii
function zaktualizujKategorie() {
    skroty = {};
    wagiPojec = {};
    const checkboxes = document.querySelectorAll('#kategorie-list input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        const kategoriaKey = checkbox.value;
        if (kategorieSkrótów[kategoriaKey]) {
            Object.assign(skroty, kategorieSkrótów[kategoriaKey]);
        }
    });

    // Inicjalizacja wag wartością 1
    Object.keys(skroty).forEach(key => {
        wagiPojec[key] = 1;
    });

    const iloscPojec = Object.keys(skroty).length;
    const licznikElem = document.getElementById("licznik-pojec");
    if (licznikElem) {
        licznikElem.innerText = `Dostępnych słówek: ${iloscPojec}`;
    }

    if (iloscPojec > 0) {
        losujSkrót();
    } else {
        document.getElementById("skrot").innerText = "Wybierz kategorię w ustawieniach";
        document.getElementById("odpowiedz").value = "";
        document.getElementById("wynik").style.display = "none";
        document.getElementById("pokazOdpowiedz").style.display = "none";
        document.getElementById("poprawnaOdpowiedz").style.display = "none";
    }
}

function zaznaczWszystkie(stan) {
    const checkboxes = document.querySelectorAll('#kategorie-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = stan;
    });
    zaktualizujKategorie();
}

// Algorytm losowania ważonego (częstsze losowanie trudnych słów)
function losujSkrót() {
    const skrótyKeys = Object.keys(skroty);
    if (skrótyKeys.length === 0) return;

    if (skrótyKeys.length === 1) {
        poprzedniSkrót = skrótyKeys[0];
    } else {
        let sumaWag = 0;
        skrótyKeys.forEach(key => {
            if (key !== poprzedniSkrót) {
                sumaWag += wagiPojec[key] || 1;
            }
        });

        let randomWeight = Math.random() * sumaWag;

        for (let key of skrótyKeys) {
            if (key === poprzedniSkrót) continue;
            randomWeight -= (wagiPojec[key] || 1);
            if (randomWeight <= 0) {
                poprzedniSkrót = key;
                break;
            }
        }
    }

    document.getElementById("skrot").innerText = poprzedniSkrót;
    document.getElementById("odpowiedz").value = "";
    document.getElementById("wynik").innerText = "";
    document.getElementById("wynik").style.display = "none";
    document.getElementById("pokazOdpowiedz").style.display = "none";
    document.getElementById("poprawnaOdpowiedz").style.display = "none";
}

function sprawdzOdpowiedz() {
    const odpowiedzInput = document.getElementById("odpowiedz");
    const wynik = document.getElementById("wynik");
    if (!odpowiedzInput || !wynik) return;

    const odpowiedz = odpowiedzInput.value.toLowerCase().replace(/\s+/g, ' ').trim();

    if (!poprzedniSkrót || !skroty[poprzedniSkrót]) return;

    if (odpowiedz === skroty[poprzedniSkrót].toLowerCase()) {
        wynik.innerText = "Poprawna odpowiedź!";
        wynik.style.color = "#34d399";
        wynik.style.display = "block";
        
        // Zmniejszenie wagi po poprawnej odpowiedzi
        if (wagiPojec[poprzedniSkrót] > 1) {
            wagiPojec[poprzedniSkrót] -= 1;
        }

        setTimeout(() => {
            losujSkrót();
        }, 800);
    } else {
        wynik.innerText = "Niepoprawna odpowiedź. Spróbuj jeszcze raz!";
        wynik.style.color = "#f87171";
        wynik.style.display = "block";
        document.getElementById("pokazOdpowiedz").style.display = "inline-block";
        
        // Zwiększenie wagi trudnego słowa
        wagiPojec[poprzedniSkrót] = (wagiPojec[poprzedniSkrót] || 1) + 2;
    }
}

function pokazOdpowiedz() {
    const poprawnaOdpowiedz = document.getElementById("poprawnaOdpowiedz");
    if (poprawnaOdpowiedz && poprzedniSkrót && skroty[poprzedniSkrót]) {
        poprawnaOdpowiedz.innerText = skroty[poprzedniSkrót];
        poprawnaOdpowiedz.style.display = "block";
    }
}

function losujInnySkrót() {
    losujSkrót();
}

// Obsługa bindów klawiszowych (←, ↓, →)
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        sprawdzOdpowiedz();
    } 
    else if (event.key === "ArrowDown") {
        event.preventDefault();
        pokazOdpowiedz();
    } 
    else if (event.key === "ArrowRight") {
        event.preventDefault();
        losujInnySkrót();
    }
});

// Obsługa klawisza Enter
const odpowiedzElem = document.getElementById("odpowiedz");
if (odpowiedzElem) {
    odpowiedzElem.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sprawdzOdpowiedz();
        }
    });
}

// Obsługa okna modalnego
function toggleModal(show) {
    const modal = document.getElementById('modal-categories');
    if (!modal) return;
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}

const modalElem = document.getElementById('modal-categories');
if (modalElem) {
    modalElem.addEventListener('click', function(e) {
        if (e.target === this) {
            toggleModal(false);
        }
    });
}

// Zmiana motywu wizualnego
function zmienMotyw() {
    const motywElem = document.getElementById("motyw");
    if (!motywElem) return;
    
    const wybranyMotyw = motywElem.value;
    document.body.setAttribute("data-theme", wybranyMotyw);
}

window.onload = function() {
    zaktualizujKategorie();
    zmienMotyw();
};
