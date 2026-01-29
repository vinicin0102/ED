/**
 * =====================================================
 * 🚀 CONFIGURAÇÃO GLOBAL DO FUNIL DR. URO TESTOM
 * =====================================================
 * 
 * Gerado em: 28/01/2026, 23:50
 * 
 * ⚠️ ESTE ARQUIVO É A FONTE ÚNICA DE VERDADE!
 * Funciona em TODOS os dispositivos (Desktop e Mobile)
 */

// =====================================================
// ⏱️ TIMING DO CTA - 6 MINUTOS E 23 SEGUNDOS
// =====================================================
const CTA_DELAY_MINUTES = 6;
const CTA_DELAY_SECONDS = 23;
const CTA_DELAY_TOTAL_MS = 383000; // (6*60+23)*1000

// =====================================================
// 🔗 LINKS DE CHECKOUT
// =====================================================
const FUNNEL_CONFIG = {
    // ⏱️ Timing
    ctaMin: CTA_DELAY_MINUTES,
    ctaSec: CTA_DELAY_SECONDS,
    ctaDelayMs: CTA_DELAY_TOTAL_MS,

    // 📹 Vídeo
    vslEmbed: '<iframe id="panda-a1ed689a-9040-4498-86f0-49f3cc6d8f20" src="https://player-vz-41174eb7-d5d.tv.pandavideo.com.br/embed/?v=a1ed689a-9040-4498-86f0-49f3cc6d8f20" style="border:none; position:absolute; top:0; left:0; width:100%; height:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" allowfullscreen=true fetchpriority="high"></iframe>',
    vslHeadline: '',

    // 🔗 Links
    linkMain: 'form_endereco.html',
    linkUpsell: 'https://pay.kiwify.com.br/SEU-LINK-UPSELL',
    linkDownsell: 'https://pay.kiwify.com.br/SEU-LINK-DOWNSELL',
    linkWhatsapp: 'https://chat.whatsapp.com/SEU-GRUPO'
};

// Função para obter config
function getFunnelConfig() {
    return FUNNEL_CONFIG;
}

// Exportar globalmente
window.FUNNEL_CONFIG = FUNNEL_CONFIG;
window.getFunnelConfig = getFunnelConfig;
window.CTA_DELAY_MS = CTA_DELAY_TOTAL_MS;

// Log de confirmação
console.log('%c⏱️ TIMING DO CTA:', 'color: #ff003c; font-size: 14px; font-weight: bold;');
console.log('%c   → ' + CTA_DELAY_MINUTES + ' minutos e ' + CTA_DELAY_SECONDS + ' segundos (' + CTA_DELAY_TOTAL_MS + 'ms)', 'color: #16a34a; font-weight: bold;');
console.log('%c📱 Funciona em Desktop e Mobile!', 'color: #8b5cf6; font-weight: bold;');
