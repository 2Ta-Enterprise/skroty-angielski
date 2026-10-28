const kategorieSkrótów = {
"29_10_tworcy_i_ich_dziela" : {
        "tancerz baletowy/tancerka baletowa" : "ballet dancer",
        "tancerz/tancerka breakdance" : "breakdancer",
        "kamerzysta/kamerzystka" : "camera operator",
        "kompozytor/kompozytorka" : "composer",
        "dyrygent/dyrygentka" : "conductor",
        "projektant/projektantka" : "designer",
        "reżyser/reżyserka" : "director",
        "ilustrator/ilustratorka" : "illustrator",
        "powieściopisarz/powieściopisarka" : "novelist",
        "śpiewak operowy/śpiewaczka operowa" : "opera singer",
        "dramaturg" : "playwright",
        "poeta/poetka" : "poet",
        "rzeźbiarz/rzeźbiarka" : "sculptor",
        "zabawny" : "amusing",
        "wspaniały" : "brilliant",
        "pomysłowy" : "clever",
        "rozczarowujący" : "disappointing",
        "nudny" : "dull",
        "łatwy do przeczytania" : "easy-to-read",
        "fascynujący" : "fascinating",
        "pomysłowy" : "imaginative",
        "pouczający" : "informative",
        "inspirujący" : "inspiring",
        "nowoczesny" : "modern",
        "przewidywalny" : "predictable",
        "zachwycający" : "thrilling",
        "poruszający" : "touching",
        "tradycyjny" : "traditional",
        "brutalny" : "violent",
},
        "29_10_uczestnictwo_w_kulturze" : {
               "publiczność" : "audience",
                "przesłuchanie (do roli)" : "audition",
                "autograf" : "autograph",
                "ceremonia/uroczystość wręczenia nagród" : "awards ceremony",
                "oparty na" : "based on",
                "być nominowanym do czegoś" : "be up for sth",
                "zanudzić kogoś na śmierć" : "bore sb to death",
                "być wydanym/opublikowanym" : "come out",
                "wymyślić coś" : "come up with sth",
                "krytyk/krytyczka" : "critic",
                "przeprowadzać badania do czegoś" : "do research for sth",
                "dać świetny występ" : "give a great show",
                "nauczyć się czegoś na pamięć" : "learn sth by heart",
                "premiera" : "opening night",
                "entuzjastyczna recenzja" : "rave review",
                "krytykować" : "run down",
                "wyprzedać" : "sell out",
                "być" : "show up",
                "zastępować (kogoś)" : "stand in for",
                "wyróżniać się" : "stand out",
                "miejsce (np. przedstawienia, koncertu)" : "venue",
                "widz" : "viewer",
                "wygrać nagrodę" : "win an award", 
        },
        "29_10_tradycje_i_zwyczaje" : {
                "telewizja śniadaniowa" : "breakfast TV",
                "nadawać" : "broadcast",
                "telewizja kablowa" : "cable TV",
                "talk show" : "chat show",
                "dubbingować/podkładać głos" : "dub",
                "odcinek" : "episode",
                "teleturniej" : "game show",
                "gospodarz/gospodyni programu telewizyjnego" : "host",
                "prezenter/prezenterka wiadomości" : "news presenter",
                "reality show" : "reality TV show",
                "opera mydlana/telenowela" : "soap opera",
                "napisy (w filmie)" : "subtitles",
                "napisy końcowe" : "the credits",
        },
        "20_10_media" : {
                "wiadomość z ostatniej chwili" : "breaking news",
"ogłoszenia drobne" : "classified ads",
"rubryka/felieton" : "column",
"felietonista/felietonistka" : "columnist",
"pierwsza strona gazety" : "cover/front page",
"codzienny" : "daily",
"nagłówek prasowy" : "headline",
"wiadomości lokalne" : "local news",
"czasopismo" : "magazine",
"tabloid/brukowiec" : "tabloid",
"tygodnik" : "weekly",
"podpis pod zdjęciem" : "caption",
"telewizja śniadaniowa" : "breakfast TV",
"nadawać" : "broadcast",
"telewizja kablowa" : "cable TV",
"talk show" : "chat show",
"dubbingować/podkładać głos" : "dub",
"odcinek" : "episode",
"teleturniej" : "game show",
"gospodarz/gospodyni programu telewizyjnego" : "host",
"prezenter/prezenterka wiadomości" : "news presenter",
"reality show" : "reality TV show",
"opera mydlana/telenowela" : "soap opera",
"napisy (w filmie)" : "subtitles",
"napisy końcowe" : "the credits",
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
