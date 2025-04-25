// carrega dinamicamente os componentes nas páginas com JavaScript: 

function loadComponent(id, path) {
    fetch(path)
        .then(res => res.text())
        .then(html => document.getElementById(id).innerHTML = html);
}