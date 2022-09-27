document.querySelector('#button-menu-open').onclick=()=>{
    document.querySelector('aside').classList.add('open')
}

document.querySelector('#button-menu-close').onclick=()=>{
    document.querySelector('aside').classList.remove('open')
}

var texto
var selectedLang = localStorage.getItem("userLanguage")
if (!selectedLang) {
    selectedLang = navigator.language.toLocaleLowerCase()
}

fetch("/texto.json").then((res) => {
    res.json().then((json) => {
        texto = json
        if (selectedLang) {
            if (!texto.find(x => x.lang == selectedLang)) {
                selectedLang = "en-us"
            }
            toggleLanguage(selectedLang)
        }
    })
})

function toggleLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        try {
            let key = el.getAttribute("data-i18n")
            let txt = texto.find((x)=> x.lang == selectedLang)
            el.innerHTML = txt.text[key]
        } catch {}

    })
}

document.querySelectorAll('#button-language').forEach(button => {
    button.onclick=(el)=>{
    selectedLang = el.srcElement.getAttribute("data-lang")
    toggleLanguage(selectedLang)
    localStorage.setItem("userLanguage", selectedLang)
}
})
