document.addEventListener("DOMContentLoaded", function () {
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId);

        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener("click", () => {
                nav.classList.toggle("show");
                toggle.classList.toggle("bx-x");
                bodypd.classList.toggle("body-pd");
                headerpd.classList.toggle("body-pd");
            });
        }
    };

    showNavbar("header-toggle", "nav-bar", "body-pd", "header");

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll(".nav_link");

    function colorLink() {
        if (linkColor) {
            linkColor.forEach((l) => l.classList.remove("active"));
            this.classList.add("active");
        }
    }

    linkColor.forEach((l) => l.addEventListener("click", colorLink));

    /*===== CARREGAR PÁGINAS DINAMICAMENTE =====*/
    const contentContainer = document.querySelector(".height-100.bg-light"); // Div onde o conteúdo será carregado

    function loadPage(url) {
        fetch(url)
            .then((response) => response.text())
            .then((html) => {
                contentContainer.innerHTML = html;
            })
            .catch((error) => console.error("Erro ao carregar a página:", error));
    }

    linkColor.forEach((link) => {
        link.addEventListener("click", function (e) {
            const pageUrl = this.getAttribute("href"); // Obtém o link

            // Se for logout (index.html), faz um redirecionamento normal
            if (pageUrl.includes("index.html")) {
                window.location.href = pageUrl; // Redireciona normalmente para index.html
                return;
            }

            e.preventDefault(); // Evita recarregar a página para os outros links
            loadPage(pageUrl); // Carrega a página dentro do container
        });
    });

    // Carregar uma página padrão ao iniciar, MAS APENAS SE NÃO ESTIVERMOS NO INDEX
    if (!window.location.href.includes("index.html")) {
        loadPage("trajetos.html");
    }
});
