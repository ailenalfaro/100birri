window.onload = function() {
    // Mueve el título 1 cm más abajo
    document.querySelector('.titulo').style.top = '30px';  

    document.getElementById("birri-joven").addEventListener("click", function() {
        mostrarPoema("img/poema1.png", "audio/poema1.mp3");
        ocultarTitulo();
    });

    document.getElementById("birri-adulto").addEventListener("click", function() {
        mostrarPoema("img/poema2.png", "audio/poema2.mp3");
        ocultarTitulo();
    });

    document.getElementById("galeria-audios").addEventListener("click", function() {
        document.getElementById("galeria-container").style.display = "block";
        document.querySelector(".container").style.display = "none";
        document.getElementById("back-icon-gal").style.display = "block"; 
        document.getElementById("audio-icon").style.display = "none";
        ocultarTitulo();
        generarListaDePistas();
    });

    function ocultarTitulo() {
        document.querySelector('.titulo').style.display = 'none';
    }

    function mostrarTitulo() {
        document.querySelector('.titulo').style.display = 'block';
    }

    function generarListaDePistas() {
        var nombresPistas = [
            "1. Prólogo",
            "2. La húmeda orilla (1946)",
            "3. Los llamados (1947)",
            "4. ",
            "5. ",
            "6. ",
            "7. ",
            "8. Condecoraciones del otoño (1948)",
            "9. ",
            "10. ",
            "11. Inmóvil dure el alba (1965)",
            "12. Dunas voladoras",
            "13. El salto cualitativo",
            "14. Quiero que dure",
            "15. El eje del mundo",
            "16. Tizar a puños el espejo",
            "17. Non tradici",
            "18. La espera",
            "19. Flash",
            "20. La linterna mágica (1982)",
            "21. Poema en forma de ficha filmográfica",
            "22. La bandera amordazada (1983)",
            "23. ",
            "24. Del libro: Búsqueda de la alegría",
            "25. El aire, sí, el aire",
            "26. Nunca quise",
            "27. Jugar la vida",
            "28. Los cinco caminos",
            "29. Quinto camino",
            "30. Poemas de nacer y de vivir (1995)",
            "31. Réquiem por los pájaros",
            "32. Truco bien jugado",
            "33. Canto a la primavera"
        ];

        var galeriaLista = document.getElementById("galeria-lista");
        galeriaLista.innerHTML = ''; 

        for (var i = 0; i < nombresPistas.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = `<span class="numero">${i + 1}. </span><span class="pista-nombre">${nombresPistas[i]}</span>`;
            
            var archivoAudio = `audio/${nombresPistas[i]}.mp3`; 

            li.onclick = (function(index, archivoAudio) {
                return function() {
                    reproducirAudio(archivoAudio);
                };
            })(i, archivoAudio);

            galeriaLista.appendChild(li);
        }
    }

    function reproducirAudio(src) {
        var audio = document.getElementById("audio");

        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }

        audio.src = src;
        audio.play();
    }

    function mostrarPoema(poemaSrc, audioSrc) {
        var poemaContainer = document.getElementById("poema-container");
        var poemaImg = document.getElementById("poema-img");
        var container = document.querySelector(".container");

        poemaImg.src = poemaSrc;
        poemaContainer.style.display = "block";
        document.getElementById("audio-icon").style.display = "block";
        document.getElementById("back-icon").style.display = "block";

        var audio = document.getElementById("audio");
        audio.src = audioSrc;
        audio.load();

        container.style.display = "none";

        resetPoemaZoom();
    }

    document.getElementById("back-icon").addEventListener("click", function() {
        var poemaContainer = document.getElementById("poema-container");
        var container = document.querySelector(".container");

        poemaContainer.style.display = "none";
        container.style.display = "flex";
        document.getElementById("audio-icon").style.display = "none";
        document.getElementById("back-icon").style.display = "none";

        var audio = document.getElementById("audio");
        audio.pause();
        audio.currentTime = 0;

        mostrarTitulo();
    });

    document.getElementById("back-icon-gal").addEventListener("click", function() {
        document.getElementById("galeria-container").style.display = "none";
        document.querySelector(".container").style.display = "flex";
        document.getElementById("back-icon-gal").style.display = "none";
        document.getElementById("audio-icon").style.display = "none";

        var audio = document.getElementById("audio");
        audio.pause();
        audio.currentTime = 0;

        mostrarTitulo();
    });

    document.getElementById("audio-icon").addEventListener("click", function() {
        var audio = document.getElementById("audio");

        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    var poemaImg = document.getElementById("poema-img");
    var scale = 1;
    var posX = 0, posY = 0;
    var isDragging = false;
    var startX, startY;

    function resetPoemaZoom() {
        scale = 1;
        posX = 0;
        posY = 0;
        poemaImg.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
    }

    // Zoom con scroll en desktop
    poemaImg.addEventListener("wheel", function(event) {
        event.preventDefault();
        var delta = event.deltaY > 0 ? -0.1 : 0.1;
        scale = Math.min(Math.max(1, scale + delta), 3);
        poemaImg.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
    });

    // Movimiento del poema con el mouse
    poemaImg.addEventListener("mousedown", function(event) {
        startX = event.clientX;
        startY = event.clientY;
        isDragging = true;
    });

    document.addEventListener("mousemove", function(event) {
        if (isDragging) {
            posX += event.clientX - startX;
            posY += event.clientY - startY;
            poemaImg.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
            startX = event.clientX;
            startY = event.clientY;
        }
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
    });

    // Movimiento táctil para celulares
    poemaImg.addEventListener("touchstart", function(event) {
        if (event.touches.length === 1) {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
            isDragging = true;
        }
    });

    poemaImg.addEventListener("touchmove", function(event) {
        if (isDragging && event.touches.length === 1) {
            posX += event.touches[0].clientX - startX;
            posY += event.touches[0].clientY - startY;
            poemaImg.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        }
    });

    poemaImg.addEventListener("touchend", function() {
        isDragging = false;
    });
};
