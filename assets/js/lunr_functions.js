let pagesIndex, searchIndex;
const MAX_SUMMARY_LENGTH = 100;
const SENTENCE_BOUNDARY_REGEX = /\b\.\s/gm;
const WORD_REGEX = /\b(\w*)[\W|\s|\b]?/gm;
//
// const fakeJSON = $.getJSON('../../library_lunr.json');
// let fakeJSON =  fetch("../../library_lunr.json")
//     .then(response => {
//         return response.json();
//     })
//     .then(data => console.log(data));
const fakeJSON = [
    {
        "question": "¿Cuáles son los pasos para desvincular mi anterior dispositivo de Yape?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/temas-urgentes.html#cuales-son-los-pasos-para-desvincular-mi-anterior-dispositivo-yape",
        "tags": "celular,robo,robaron,cambiaste,cambie,cambiare"
    },
    {
        "question": "¿Cuáles son los pasos para desbloquear mi cuenta Yape?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/temas-urgentes.html#cuales-son-los-pasos-para-desbloquear-mi-cuenta-yape",
        "tags": "desbloquear,desbloquear mi yape,sacar dinero"
    },
    {
        "question": "¿Cómo puedo retirar mi dinero de los cajeros automáticos del BCP?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/retirar-dinero-de-yape.html#como-puedo-retirar-dinero-de-los-cajeros-automaticos",
        "tags": "retirar,cajero automatico,sacar dinero"
    },
    {
        "question": "¿Puedo retirar mi dinero de las ventanillas en agencias del BCP?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/retirar-dinero-de-yape.html#como-puedo-retirar-dinero-de-los-cajeros-del-banco-o-agencias-del-BCP",
        "tags": "retirar,agencias,ventanillas del banco"
    },
    {
        "question": "¿Cómo puedo retirar mi dinero de los agentes BCP?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/retirar-dinero-de-yape.html#como-puedo-retirar-diner-de-los-agentes-bcp",
        "tags": "retirar,agentes BCP"
    },
    {
        "question": "¿Cuáles son los pasos para recuperar mi contraseña?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/temas-urgentes.html#cuales-son-los-pasos-para-recuperar-mi-contrasenha",
        "tags": "recuperar,contraseña,me olvide mi contraseña,perdi mi contraseña,cambiar de contraseña,ayuda con mi contraseña"
    },
    {
        "question": "Realice una transferencia a través de mi Yape y no llego al Banco destino, ¿Dónde puedo reclamar?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/temas-urgentes.html#realice-una-transferencia-a-traves-de-mi-yape-y-no-llego-al-banco-destino",
        "tags": "problema,transferencia,error en transferencia,problema en transferencia,ayuda con transferencia,no llega la transferencia"
    },
    {
        "question": "¿Dónde puedo realizar consultas cuando existen fallas en la app de Yape?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/temas-urgentes.html#donde-puedo-realizar-consultas-cuando-existen-fallas-en-la-app-de-yape",
        "tags": "consulta sobre fallas,problemas con yape,reclamos,ayuda soporte,ayuda con mi yape"
    },
    {
        "question": "¿Cuáles son los límites transaccionales?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/enviar-y-recibir-yapeos.html#cuales-son-los-limites-transaccionales",
        "tags": "limite de transaccion,limites transaccionales,cuanto es lo maximo que puedo enviar,cuanto es el limite de envio"
    },
    {
        "question": "¿Cómo realizo una transferencia por QR?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/enviar-y-recibir-yapeos.html#como-realizo-una-transferencia-por-QR",
        "tags": "transferencia QR,como se envia por QR,como envio por QR,como pago por QR,envio por QR"
    },
    {
        "question": "¿Cómo puedo ver mi número de cuenta y mi saldo?",
        "href": "https://www.yape.com.bo/centro_de_ayuda/sobre-tu-cuenta-yape.html#como-puedo-ver-mi-numero-de-cuenta-y-mi-saldo",
        "tags": "numero de cuenta,mi saldo,saldo,cuenta,cual es mi numero de cuenta,donde esta mi saldo"
    }
];

async function initSearchIndex() {
    try {
        pagesIndex = fakeJSON;
        searchIndex = lunr(function () {
            this.field("questions");
            this.field("tags");
            this.ref("href");
            pagesIndex.forEach((page) => this.add(page));
        });
    } catch (e) {
        console.log(e);
    }
}

function searchBoxFocused() {
    document.querySelector(".search-container").classList.add("focused");
    document
        .getElementById("search")
        .addEventListener("focusout", () => searchBoxFocusOut());
}

function searchBoxFocusOut() {
    document.querySelector(".search-container").classList.remove("focused");
}

function handleSearchQuery(event) {
    event.preventDefault();
    const query = document.getElementById("search").value.trim().toLowerCase();
    if (!query) {
        displayErrorMessage("Please enter a search term");
        return;
    }
    const results = searchSite(query);
    if (!results.length) {
        displayErrorMessage("Your search returned no results");
        return;
    }
    renderSearchResults(query, results);
}

function displayErrorMessage(message) {
    document.querySelector(".search-error-message").innerHTML = message;
    document.querySelector(".search-container").classList.remove("focused");
    document.querySelector(".search-error").classList.remove("hide-element");
    document.querySelector(".search-error").classList.add("fade");
}

function removeAnimation() {
    this.classList.remove("fade");
    this.classList.add("hide-element");
    document.querySelector(".search-container").classList.add("focused");
}

function searchSite(query) {
    const originalQuery = query;
    query = getLunrSearchQuery(query);
    let results = getSearchResults(query);
    return results.length
        ? results
        : query !== originalQuery
            ? getSearchResults(originalQuery)
            : [];
}

function getSearchResults(query) {
    return searchIndex.search(query).flatMap((hit) => {
        if (hit.ref == "undefined") return [];
        let pageMatch = pagesIndex.filter((page) => page.href === hit.ref)[0];
        pageMatch.score = hit.score;
        return [pageMatch];
    });
}

function getLunrSearchQuery(query) {
    const searchTerms = query.split(" ");
    if (searchTerms.length === 1) {
        return query;
    }
    query = "";
    for (const term of searchTerms) {
        query += `+${term} `;
    }
    return query.trim();
}

function renderSearchResults(query, results) {
    clearSearchResults();
    updateSearchResults(query, results);
    showSearchResults();
    scrollToTop();
}

function clearSearchResults() {
    const results = document.querySelector(".search-results ul");
    while (results.firstChild) results.removeChild(results.firstChild);
}

function updateSearchResults(query, results) {
    document.getElementById("query").innerHTML = query;
    document.querySelector(".search-results ul").innerHTML = results
        .map(
            (hit) => `
    <li class="search-result-item" data-score="${hit.score.toFixed(2)}">
      <a href="${hit.href}" class="search-result-page-title">${hit.question}</a>
      <p>${createSearchResultBlurb(query, hit.question)}</p>
    </li>
    `
        )
        .join("");
    const searchResultListItems = document.querySelectorAll(".search-results ul li");
    document.getElementById("results-count").innerHTML = searchResultListItems.length;
    document.getElementById("results-count-text").innerHTML = searchResultListItems.length > 1 ? "results" : "result";
    searchResultListItems.forEach(
        (li) => (li.firstElementChild.style.color = getColorForSearchResult(li.dataset.score))
    );
}

function createSearchResultBlurb(query, pageContent) {
    const searchQueryRegex = new RegExp(createQueryStringRegex(query), "gmi");
    const searchQueryHits = Array.from(
        pageContent.matchAll(searchQueryRegex),
        (m) => m.index
    );
    const sentenceBoundaries = Array.from(
        pageContent.matchAll(SENTENCE_BOUNDARY_REGEX),
        (m) => m.index
    );
    let searchResultText = "";
    let lastEndOfSentence = 0;
    for (const hitLocation of searchQueryHits) {
        if (hitLocation > lastEndOfSentence) {
            for (let i = 0; i < sentenceBoundaries.length; i++) {
                if (sentenceBoundaries[i] > hitLocation) {
                    const startOfSentence = i > 0 ? sentenceBoundaries[i - 1] + 1 : 0;
                    const endOfSentence = sentenceBoundaries[i];
                    lastEndOfSentence = endOfSentence;
                    parsedSentence = pageContent.slice(startOfSentence, endOfSentence).trim();
                    searchResultText += `${parsedSentence} ... `;
                    break;
                }
            }
        }
        const searchResultWords = tokenize(searchResultText);
        const pageBreakers = searchResultWords.filter((word) => word.length > 50);
        if (pageBreakers.length > 0) {
            searchResultText = fixPageBreakers(searchResultText, pageBreakers);
        }
        if (searchResultWords.length >= MAX_SUMMARY_LENGTH) break;
    }
    return ellipsize(searchResultText, MAX_SUMMARY_LENGTH).replace(
        searchQueryRegex,
        "<strong>$&</strong>"
    );
}

function createQueryStringRegex(query) {
    const searchTerms = query.split(" ");
    if (searchTerms.length == 1) {
        return query;
    }
    query = "";
    for (const term of searchTerms) {
        query += `${term}|`;
    }
    query = query.slice(0, -1);
    return `(${query})`;
}

function tokenize(input) {
    const wordMatches = Array.from(input.matchAll(WORD_REGEX), (m) => m);
    return wordMatches.map((m) => ({
        word: m[0],
        start: m.index,
        end: m.index + m[0].length,
        length: m[0].length,
    }));
}

function fixPageBreakers(input, largeWords) {
    largeWords.forEach((word) => {
        const chunked = chunkify(word.word, 20);
        input = input.replace(word.word, chunked);
    });
    return input;
}

function chunkify(input, chunkSize) {
    let output = "";
    let totalChunks = (input.length / chunkSize) | 0;
    let lastChunkIsUneven = input.length % chunkSize > 0;
    if (lastChunkIsUneven) {
        totalChunks += 1;
    }
    for (let i = 0; i < totalChunks; i++) {
        let start = i * chunkSize;
        let end = start + chunkSize;
        if (lastChunkIsUneven && i === totalChunks - 1) {
            end = input.length;
        }
        output += input.slice(start, end) + " ";
    }
    return output;
}

function ellipsize(input, maxLength) {
    const words = tokenize(input);
    if (words.length <= maxLength) {
        return input;
    }
    return input.slice(0, words[maxLength].end) + "...";
}

function showSearchResults() {
    document.querySelector(".primary").classList.add("hide-element");
    document.querySelector(".search-results").classList.remove("hide-element");
    document.getElementById("site-search").classList.add("expanded");
    document.getElementById("clear-search-results-sidebar").classList.remove("hide-element");
}

function scrollToTop() {
    const toTopInterval = setInterval(function () {
        const supportedScrollTop = document.body.scrollTop > 0 ? document.body : document.documentElement;
        if (supportedScrollTop.scrollTop > 0) {
            supportedScrollTop.scrollTop = supportedScrollTop.scrollTop - 50;
        }
        if (supportedScrollTop.scrollTop < 1) {
            clearInterval(toTopInterval);
        }
    }, 10);
}

function getColorForSearchResult(score) {
    const warmColorHue = 171;
    const coolColorHue = 212;
    return adjustHue(warmColorHue, coolColorHue, score);
}

function adjustHue(hue1, hue2, score) {
    if (score > 3) return `hsl(${hue1}, 100%, 50%)`;
    const hueAdjust = (parseFloat(score) / 3) * (hue1 - hue2);
    const newHue = hue2 + Math.floor(hueAdjust);
    return `hsl(${newHue}, 100%, 50%)`;
}

function handleClearSearchButtonClicked() {
    hideSearchResults();
    clearSearchResults();
    document.getElementById("search").value = "";
}

function hideSearchResults() {
    document.getElementById("clear-search-results-sidebar").classList.add("hide-element");
    document.getElementById("site-search").classList.remove("expanded");
    document.querySelector(".search-results").classList.add("hide-element");
    document.querySelector(".primary").classList.remove("hide-element");
}

initSearchIndex();
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("search-form") != null) {
        const searchInput = document.getElementById("search");
        searchInput.addEventListener("focus", () => searchBoxFocused());
        searchInput.addEventListener("keydown", (event) => {
            if (event.keyCode == 13) handleSearchQuery(event);
        });
        document
            .querySelector(".search-error")
            .addEventListener("animationend", removeAnimation);
        document
            .querySelector(".fa-search")
            .addEventListener("click", (event) => handleSearchQuery(event));
    }
    document
        .querySelectorAll(".clear-search-results")
        .forEach((button) =>
            button.addEventListener("click", () => handleClearSearchButtonClicked())
        );
});

if (!String.prototype.matchAll) {
    String.prototype.matchAll = function (regex) {
        "use strict";
        function ensureFlag(flags, flag) {
            return flags.includes(flag) ? flags : flags + flag;
        }
        function* matchAll(str, regex) {
            const localCopy = new RegExp(regex, ensureFlag(regex.flags, "g"));
            let match;
            while ((match = localCopy.exec(str))) {
                match.index = localCopy.lastIndex - match[0].length;
                yield match;
            }
        }
        return matchAll(this, regex);
    };
}
