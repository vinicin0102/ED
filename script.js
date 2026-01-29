/**
 * =====================================================
 * 🚀 SCRIPT PRINCIPAL DO FUNIL DR. URO TESTOM
 * =====================================================
 * 
 * Este script gerencia:
 * - Timing do CTA (botão de compra)
 * - Vídeo (play ao clicar)
 * - Links dinâmicos
 * - Provas sociais
 * - Funcionalidades gerais
 */

document.addEventListener('DOMContentLoaded', () => {

    console.log('Versão Carregada: ' + new Date().toISOString());

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
            ctaDelayMs: 164000,
            linkMain: 'form_endereco.html',
            linkUpsell: 'obrigado.html',
            linkDownsell: 'obrigado.html',
            linkWhatsapp: '#',
            vslEmbed: ''
        };
        finalConfig = { ...defaultConfig, ...localConfig };
    }

    console.log('%c📊 Configurações Carregadas:', 'color: #8b5cf6; font-weight: bold;', finalConfig);

    // ============================================
    // 1. LÓGICA DO VÍDEO - PLAY AO CLICAR
    // ============================================
    const videoPlaceholder = document.getElementById('video-placeholder');
    const videoWrapper = document.getElementById('video-wrapper');

    if (videoPlaceholder && videoWrapper) {
        videoPlaceholder.addEventListener('click', () => {
            console.log('%c▶️ Vídeo iniciado!', 'color: #16a34a; font-weight: bold;');

            // Embed do Panda Video do config ou hardcoded
            const embedCode = finalConfig.vslEmbed || '<iframe id="panda-a1ed689a-9040-4498-86f0-49f3cc6d8f20" src="https://player-vz-41174eb7-d5d.tv.pandavideo.com.br/embed/?v=a1ed689a-9040-4498-86f0-49f3cc6d8f20" style="border:none; position:absolute; top:0; left:0; width:100%; height:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowfullscreen=true fetchpriority="high"></iframe>';

            // Remove o placeholder e insere o iframe
            videoPlaceholder.style.display = 'none';

            // Criar container para iframe se não existir
            let iframeContainer = videoWrapper.querySelector('.iframe-container');
            if (!iframeContainer) {
                iframeContainer = document.createElement('div');
                iframeContainer.className = 'iframe-container';
                iframeContainer.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%;';
                videoWrapper.appendChild(iframeContainer);
            }

            iframeContainer.innerHTML = embedCode;

            // Adiciona autoplay à URL se possível
            const iframe = iframeContainer.querySelector('iframe');
            if (iframe) {
                let src = iframe.src;
                if (!src.includes('autoplay')) {
                    src += (src.includes('?') ? '&' : '?') + 'autoplay=1';
                    iframe.src = src;
                }
            }
        });
    }

    // ============================================
    // 2. TIMING DO CTA - MOSTRAR APÓS X SEGUNDOS
    // ============================================
    const ctaContainer = document.getElementById('cta-container');
    const socialProofSection = document.getElementById('social-proof-section');
    const ctaDelay = finalConfig.ctaDelayMs || 164000; // Default: 2min 44seg

    console.log('%c⏱️ CTA aparecerá em:', 'color: #f59e0b; font-weight: bold;', (ctaDelay / 1000) + ' segundos');

    // Timer para mostrar CTA e Provas Sociais
    setTimeout(() => {
        console.log('%c🎯 Mostrando CTA e Provas Sociais!', 'color: #16a34a; font-weight: bold; font-size: 16px;');

        // Mostrar CTA
        if (ctaContainer) {
            ctaContainer.classList.remove('hidden-pitch');
            ctaContainer.classList.add('fade-in');
        }

        // Mostrar Provas Sociais
        if (socialProofSection) {
            socialProofSection.classList.remove('hidden-pitch');
            socialProofSection.classList.add('fade-in');
        }
    }, ctaDelay);

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

