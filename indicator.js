document.addEventListener('DOMContentLoaded', function() {
    // Função para adicionar o parâmetro 'indicador' à URL
    function addIndicatorParameter(url) {
        var variable = new URLSearchParams(window.location.search).get('mapKey');
        var indicator = new URLSearchParams(window.location.search).get(variable);
        if (!indicator) return url;

        var newUrl = new URL(url, window.location.origin);
        newUrl.searchParams.set(variable, indicator);
        return newUrl.href;
    }

    // Função para tratar o clique
    function handleLinkClick(event) {
        var target = event.target;

        // Encontrar o elemento <a> ou <button> mais próximo
        while (target && target.nodeName !== 'A' && target.nodeName !== 'BUTTON') {
            target = target.parentNode;
        }

        if (target) {
            var destinationUrl = target.nodeName === 'A' ? target.href : target.getAttribute('data-href');
            if (destinationUrl) {
                event.preventDefault();
                window.location.href = addIndicatorParameter(destinationUrl);
            }
        }
    }

    // Adiciona o event listener a todos os links e botões
    document.querySelectorAll('a, button').forEach(function(element) {
        element.addEventListener('click', handleLinkClick);
    });
});
