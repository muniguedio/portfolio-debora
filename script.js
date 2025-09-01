document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os botões de alternar e os cards de preço
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const pricingCards = document.querySelectorAll('.pricing-card');
    const freeTrialForm = document.getElementById('freeTrialForm');
    const formMessage = document.getElementById('formMessage');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    /**
     * Atualiza os preços e o texto de faturamento dos cards com base no período selecionado.
     * @param {string} period - O período a ser exibido ('monthly' para mensal, 'annually' para anual).
     */
    function updatePricing(period) {
        pricingCards.forEach(card => {
            const priceValueSpan = card.querySelector('.price-value');
            // Nota: o texto "Faturado mensalmente/anualmente" foi removido do HTML para simplificar o design.
            // Se precisar reintroduzi-lo, adicione um elemento com a classe 'billed' e descomente a linha abaixo.
            // const billedText = card.querySelector('.billed'); 
            
            const monthlyPrice = card.dataset.monthlyPrice;
            const annuallyPrice = card.dataset.annuallyPrice;

            // Define o texto do preço com base no período
            priceValueSpan.textContent = `$${(period === 'monthly') ? monthlyPrice : annuallyPrice}`;
            
            // Se o texto de faturamento for necessário, descomente e ajuste:
            // if (billedText) {
            //     billedText.textContent = (period === 'monthly') ? 'Faturado mensalmente' : 'Faturado anualmente';
            // }
        });
    }

    // Adiciona um ouvinte de evento de clique a cada botão de alternar
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const period = button.dataset.period; // Obtém o período do atributo data-period do botão

            // Remove a classe 'active' de todos os botões e suas classes de estilo de estado
            toggleButtons.forEach(btn => {
                btn.classList.remove('active');
                // Adicione/remova classes Tailwind aqui se necessário, caso as use.
                // Como estamos em HTML/CSS puro, as classes ativas são apenas 'active'.
            });
            
            // Adiciona a classe 'active' no botão clicado para destacá-lo
            button.classList.add('active');

            // Atualiza os preços dos cards
            updatePricing(period);
        });
    });

    // Define o preço inicial para "Mensal" quando a página é carregada pela primeira vez
    updatePricing('monthly');

      // Adiciona um ouvinte de evento para o envio do formulário
    freeTrialForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário (recarregamento da página)

        // Limpa mensagens anteriores
        formMessage.textContent = '';
        formMessage.classList.remove('success', 'error');
        formMessage.style.display = 'none'; // Esconde a mensagem por padrão

        // Coleta os dados do formulário
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            objective: document.getElementById('objective').value,
            experience: document.querySelector('input[name="experience"]:checked')?.value || '' // Pega o valor do radio selecionado
        };

        // Simulação de envio para um serviço externo (Substitua por sua lógica real)
        try {
            // Aqui você faria uma requisição real para o seu backend ou serviço de formulário
            // Exemplo de como seria uma requisição fetch (requer um servidor para funcionar):
            /*
            const response = await fetch('/api/submit-form', { // Substitua pelo seu endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                formMessage.textContent = 'Obrigado! Seu teste grátis foi ativado. Entraremos em contato em breve!';
                formMessage.classList.add('success');
                freeTrialForm.reset(); // Limpa o formulário após o sucesso
            } else {
                const errorData = await response.json();
                formMessage.textContent = `Erro ao enviar: ${errorData.message || 'Tente novamente.'}`;
                formMessage.classList.add('error');
            }
            */

            // --- SIMULAÇÃO DE SUCESSO (APENAS PARA DEMONSTRAÇÃO NO FRONTEND) ---
            // Em um ambiente de produção, você removeria esta parte e usaria o fetch real.
            console.log('Dados do formulário (simulação):', formData);
            formMessage.textContent = 'Obrigado! Seu teste grátis foi ativado. Entraremos em contato em breve!';
            formMessage.classList.add('success');
            freeTrialForm.reset(); // Limpa o formulário após o sucesso
            // --- FIM DA SIMULAÇÃO ---


        } catch (error) {
            console.error('Erro no envio do formulário:', error);
            formMessage.textContent = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
            formMessage.classList.add('error');
        } finally {
            formMessage.style.display = 'block'; // Mostra a mensagem
        }
    });
     accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentNode; // O item pai do acordeão
            const accordionContent = header.nextElementSibling; // O conteúdo da resposta
            
            // Verifica se o item já está expandido
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Recolhe todos os outros itens do acordeão
            document.querySelectorAll('.accordion-item').forEach(item => {
                const otherHeader = item.querySelector('.accordion-header');
                const otherContent = item.querySelector('.accordion-content');

                if (otherHeader !== header && otherHeader.getAttribute('aria-expanded') === 'true') {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherContent.classList.remove('expanded');
                    // Reset max-height para permitir a transição suave para 0
                    otherContent.style.maxHeight = '0';
                    otherContent.style.paddingTop = '0';
                    otherContent.style.paddingBottom = '0';
                }
            });

            // Alterna o estado do item clicado
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                accordionContent.classList.remove('expanded');
                accordionContent.style.maxHeight = '0';
                accordionContent.style.paddingTop = '0';
                accordionContent.style.paddingBottom = '0';
            } else {
                header.setAttribute('aria-expanded', 'true');
                accordionContent.classList.add('expanded');
                // Define a altura máxima para a transição (um valor grande o suficiente)
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                accordionContent.style.paddingTop = '0.5rem'; // Padding superior quando aberto
                accordionContent.style.paddingBottom = '1.5rem'; // Padding inferior quando aberto
            }
        });
    });
});
