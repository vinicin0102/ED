/**
 * =====================================================
 * 🚀 SCRIPT PRINCIPAL DO FUNIL MOUNJATINA
 * =====================================================
 * 
 * Este script gerencia:
 * - Timing do CTA (botão de compra)
 * - Links dinâmicos
 * - Embed de vídeo
 * - Funcionalidades gerais
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // OBTER CONFIGURAÇÃO (config.js > localStorage)
    // ============================================
    let finalConfig;

    // Prioridade: getFunnelConfig() do config.js > localStorage > defaults
    if (typeof getFunnelConfig === 'function') {
        finalConfig = getFunnelConfig();
    } else {
        // Fallback para localStorage
        const localConfig = JSON.parse(localStorage.getItem('funnelConfig') || '{}');
        const defaultConfig = {
            ctaMin: 2,
            ctaSec: 44,
            linkMain: 'https://pay.kiwify.com.br/SEU-LINK',
            linkUpsell: 'obrigado.html',
            linkDownsell: 'obrigado.html',
            linkWhatsapp: '#'
        };
        finalConfig = { ...defaultConfig, ...localConfig };
    }

    console.log('%c📊 Configurações Carregadas:', 'color: #8b5cf6; font-weight: bold;', finalConfig);

    // ============================================
    // 1. VÍDEO E HEADLINE (Páginas com vídeo)
    // ============================================
    const videoWrapper = document.querySelector('.video-wrapper');
    const headlineEl = document.querySelector('.hero h1');

    if (finalConfig.vslEmbed && finalConfig.vslEmbed.trim() !== '' && videoWrapper) {
        // Substitui o placeholder pelo embed real
        videoWrapper.innerHTML = finalConfig.vslEmbed;
    }

    if (finalConfig.vslHeadline && finalConfig.vslHeadline.trim() !== '' && headlineEl) {
        headlineEl.innerHTML = finalConfig.vslHeadline;
    }

    // ============================================
    // 2. DELAY DO BOTÃO CTA (Controlado pelo config)
    // ============================================
    const ctaContainer = document.getElementById('cta-container');
    const socialProofSection = document.getElementById('social-proof-section');

    if (ctaContainer && ctaContainer.classList.contains('hidden-pitch')) {
        const min = parseInt(finalConfig.ctaMin) || 2;
        const sec = parseInt(finalConfig.ctaSec) || 44;
        const delayMs = ((min * 60) + sec) * 1000;

        console.log(`%c⏱️ Delay CTA e Provas Sociais: ${delayMs}ms (${min}m ${sec}s)`, 'color: #16a34a; font-weight: bold;');

        // Garantir que o CTA está escondido
        ctaContainer.style.display = 'none';
        ctaContainer.style.opacity = '0';

        // Garantir que as Provas Sociais estão escondidas, se existirem
        if (socialProofSection) {
            socialProofSection.style.display = 'none';
            socialProofSection.style.opacity = '0';
        }

        setTimeout(() => {
            // Revelar CTA
            ctaContainer.style.display = 'block';
            ctaContainer.classList.remove('hidden-pitch');

            // Revelar Provas Sociais
            if (socialProofSection) {
                socialProofSection.style.display = 'block'; // Or 'flex' or whatever the default is, usually block for section
                socialProofSection.classList.remove('hidden-pitch');
            }

            // Animar entrada
            setTimeout(() => {
                ctaContainer.style.opacity = '1';
                ctaContainer.style.transition = 'opacity 0.5s ease-out';

                if (socialProofSection) {
                    socialProofSection.style.opacity = '1';
                    socialProofSection.style.transition = 'opacity 0.5s ease-out';
                }
            }, 50);

            // Scroll suave para o CTA
            ctaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, delayMs);
    }

    // ============================================
    // 3. ATUALIZAÇÃO DE LINKS
    // ============================================

    // Botão Principal
    const btnMain = document.querySelector('.cta-button');
    if (btnMain && finalConfig.linkMain && finalConfig.linkMain !== 'https://pay.kiwify.com.br/SEU-LINK-PRINCIPAL') {
        btnMain.href = finalConfig.linkMain;
    }

    // Botão por ID
    const btnMainById = document.getElementById('btn-main');
    if (btnMainById && finalConfig.linkMain && finalConfig.linkMain !== 'https://pay.kiwify.com.br/SEU-LINK-PRINCIPAL') {
        btnMainById.href = finalConfig.linkMain;
    }

    // Botão Upsell (Sim)
    const btnYes = document.querySelector('.btn-yes');
    if (btnYes) {
        if (window.location.pathname.includes('upsell') && finalConfig.linkUpsell) {
            btnYes.href = finalConfig.linkUpsell;
        }
        if (window.location.pathname.includes('downsell') && finalConfig.linkDownsell) {
            btnYes.href = finalConfig.linkDownsell;
        }
    }

    // Link WhatsApp
    const btnWhatsapp = document.getElementById('btn-whatsapp');
    if (btnWhatsapp && finalConfig.linkWhatsapp) {
        btnWhatsapp.href = finalConfig.linkWhatsapp;
    }

    // ============================================
    // 4. DATA DINÂMICA
    // ============================================
    const dateElement = document.getElementById('dynamic-date-vsl');
    if (dateElement) {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        dateElement.innerText = new Date().toLocaleDateString('pt-BR', options);
    }

    // ============================================
    // 5. FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(other => {
                    if (other !== item) other.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });

    // ============================================
    // 6. DETECÇÃO DE MOBILE (para ajustes)
    // ============================================
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 768;

    if (isMobile) {
        document.body.classList.add('is-mobile');
        console.log('%c📱 Modo Mobile Detectado', 'color: #f59e0b; font-weight: bold;');
    }

    // ============================================
    // 7. ANIMAÇÃO SUAVE DE FADE-IN
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-element {
            animation: fadeIn 0.6s ease-out forwards;
        }
    `;
    document.head.appendChild(style);

});
