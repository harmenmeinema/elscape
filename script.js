document.addEventListener("DOMContentLoaded", function () {
    const texts = [
        "Welkom, Els...",
        "Ik snap dat je je afvraagt wat er gebeurt.",
        "Jouw vriend is in groot gevaar, en jij zult hem moeten redden.",
        "Doe dit zo snel mogelijk, voordat hij in verkeerde handen valt.",
        "Donderdag 20 maart om stipt 8 uur wordt hij door een criminele bende opgehaald.",
        "Zorg ervoor dat je daarvoor je vriend redt en zo uit handen van de bende houdt.",
        "Een kwartier eerder wordt hij op een geheime locatie achtergelaten.",
        "Om achter deze locatie te komen, zal je eerst een code moeten vinden.",
        "Deze code moet je invoeren aan het eind van dit verhaal en leidt tot een geheime pagina.",
        "Om achter die code te komen, zul je op zoek moeten gaan.",
        "De locatie van de code kan je vinden op de volgende coördinaten: 52.3783102, 5.7892189,17.",
        "Op deze locatie zijn een aantal bankjes aanwezig.",
        "Ga op zoek naar een bankje waar een grote boom voor staat.",
        "Achterop het bankje zit een witte enveloppe vastgeplakt, waar een code in zit.",
        "Ontrafel deze code en voer hem in aan het einde van deze verhaal.",
        "Tot deze tijd kan je je vriend niet bereiken.",
        "Ik heb wel zijn telefoon en kan via WhatsApp jou bereiken.",
        "Zijn locatie staat uit, laat die van jou aan. We houden contact.",
        "Succes! Stel je vriend niet teleur.",
        "Groet, Mr. X",
        "Voer hier de 6-cijferige code in om verder te gaan:"
    ];

    let currentTextIndex = 0;
    let typingSpeed = 20;
    let textElement = document.getElementById("text");
    let inputContainer = document.getElementById("input-container");
    let codeInput = document.getElementById("codeInput");
    let nextBtn = document.getElementById("nextBtn");
    let prevBtn = document.getElementById("prevBtn");
    let skipBtn = document.getElementById("skipBtn");
    let startBtn = document.getElementById("startBtn");

    let typeSound1 = new Audio("typewriter.mp3");
    let typeSound2 = new Audio("typewriter.mp3");
    let currentSound = typeSound1;
    let isTyping = false;
    let typingTimeout;

    typeSound1.volume = 1.0;
    typeSound2.volume = 1.0;

    function playTypingSound() {
        if (currentSound.paused) {
            currentSound.currentTime = 0;
            currentSound.play().catch(() => {});
        }
    }

    function swapSound() {
        currentSound.pause();
        currentSound.currentTime = 0;
        currentSound = currentSound === typeSound1 ? typeSound2 : typeSound1;
        playTypingSound();
    }

    function typeText(index) {
        if (isTyping) return;
        isTyping = true;

        clearTimeout(typingTimeout);
        textElement.innerHTML = "";
        inputContainer.style.display = "none";

        let text = texts[index];
        let i = 0;

        playTypingSound();

        function typeLetter() {
            if (i < text.length) {
                textElement.innerHTML += text[i];
                i++;
                if (i % 10 === 0) swapSound();
                typingTimeout = setTimeout(typeLetter, typingSpeed);
            } else {
                isTyping = false;
                typeSound1.pause();
                typeSound2.pause();
                typeSound1.currentTime = 0;
                typeSound2.currentTime = 0;

                if (index === texts.length - 1) {
                    inputContainer.style.display = "block";
                    nextBtn.innerText = "SUBMIT";
                } else {
                    nextBtn.innerText = "NEXT";
                }
            }
        }

        typeLetter();
    }

    function skipToInput() {
        currentTextIndex = texts.length - 1;
        textElement.innerHTML = texts[currentTextIndex];
        inputContainer.style.display = "block";
        nextBtn.innerText = "SUBMIT";
    }

    // 🌟 Start-knop: Verbergt zichzelf en toont de andere knoppen
    startBtn.addEventListener("click", function () {
        startBtn.style.display = "none"; // Verberg startknop
        nextBtn.style.display = "inline-block"; // Toon "NEXT"
        prevBtn.style.display = "inline-block"; // Toon "TERUG"
        skipBtn.style.display = "inline-block"; // Toon "SKIP"
        typeText(currentTextIndex);
    });

    nextBtn.addEventListener("click", function () {
        if (isTyping) return;
        if (currentTextIndex < texts.length - 1) {
            currentTextIndex++;
            typeText(currentTextIndex);
        } else {
            if (codeInput.value === "140225") {  // Controleer of de code correct is
                alert("Code correct! Je wordt doorgestuurd...");
                window.location.href = "home.html"; // Stuur door naar home.html
            } else {
                alert("Foute code! Probeer opnieuw.");
            }
        }
    });
    

    prevBtn.addEventListener("click", function () {
        if (isTyping) return;
        if (currentTextIndex > 0) {
            currentTextIndex--;
            typeText(currentTextIndex);
        }
    });

    skipBtn.addEventListener("click", skipToInput);
});
