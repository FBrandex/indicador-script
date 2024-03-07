(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Função para extrair as query strings e formatá-las
        function getFormattedQueryStrings() {
            const params = new URLSearchParams(window.location.search);
            let queryStringParts = [];
            params.forEach((value, key) => {
                queryStringParts.push(`${key}=${value}`);
            });
            return queryStringParts.join('&');
        }

        // Capturando as query strings formatadas
        const formattedQueryStrings = getFormattedQueryStrings();
        const encodedQueryStrings = encodeURIComponent(formattedQueryStrings);

        // Função para adicionar query strings aos links
        function updateLinkHref(link, isHotmart) {
            const originalHref = link.getAttribute('href');
            const separator = originalHref.includes('?') ? '&' : '?';
            const newHref = isHotmart ?
                originalHref + separator + 'xcod=' + encodedQueryStrings :
                originalHref + separator + formattedQueryStrings;
            link.setAttribute('href', newHref);
        }

        // Função para adicionar campos aos formulários
        function addInputsToForm(form, isHotmart) {
            if (isHotmart) {
                if (!form.querySelector('input[name="xcod"]')) {
                    const xcodInput = document.createElement('input');
                    xcodInput.type = 'hidden';
                    xcodInput.name = 'xcod';
                    xcodInput.value = encodedQueryStrings;
                    form.appendChild(xcodInput);
                }
            } else {
                new URLSearchParams(formattedQueryStrings).forEach((value, key) => {
                    if (!form.querySelector(`input[name="${key}"]`)) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = value;
                        form.appendChild(input);
                    }
                });
            }
        }

        // Atualizar links e formulários
        document.querySelectorAll('a').forEach(link => {
            const isHotmartLink = link.href.includes('pay.hotmart.com');
            updateLinkHref(link, isHotmartLink);
        });

        document.querySelectorAll('form').forEach(form => {
            const isHotmartForm = form.action.includes('pay.hotmart.com');
            addInputsToForm(form, isHotmartForm);
        });
    });
})();
