# master_fix.ps1
$indexFile = Join-Path $PSScriptRoot "index.html"
$styleFile = Join-Path $PSScriptRoot "css\style.css"
$ebCssFile = Join-Path $PSScriptRoot "css\electric-border.css"
$ebJsFile  = Join-Path $PSScriptRoot "js\electric-border.js"

# 1. ATUALIZAR INDEX.HTML PARA FORCAR CACHE BUST
$idxContent = [System.IO.File]::ReadAllText($indexFile, [System.Text.Encoding]::UTF8)
$idxContent = $idxContent -replace '\?v=\d+', '?v=20'
$idxContent = $idxContent -replace '"css/electric-border.css"', '"css/electric-border.css?v=20"'
$idxContent = $idxContent -replace '"js/electric-border.js"', '"js/electric-border.js?v=20"'
$idxContent = $idxContent -replace '"js/animations.js"', '"js/animations.js?v=20"'
[System.IO.File]::WriteAllText($indexFile, $idxContent, [System.Text.Encoding]::UTF8)


# 2. LIMPAR ELECTRIC-BORDER.CSS
# Ele estava forcando background preto em .eb-content e atrapalhando tudo.
$ebCss = @"
.eb-canvas-container {
    position: absolute;
    inset: -15px;
    pointer-events: none;
    z-index: 1;
}

.eb-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.eb-layers {
    position: absolute;
    inset: -15px;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
    border-radius: inherit;
}

.eb-glow-1,
.eb-glow-2 {
    position: absolute;
    inset: 0;
    opacity: 0.8;
    mix-blend-mode: screen;
}

.eb-content {
    position: relative;
    z-index: 2;
    height: 100%;
    background: transparent !important; /* DEIXAR TRANSPARENTE PRA O CSS DO CARD APARECER */
    border-radius: inherit;
    box-sizing: border-box;
}

/* O card ja vai receber o background via style.css, entao so removemos a borda nativa senao fica duplo */
.card, .info-card, .card-evoluir {
    border: none !important;
}

#view-viaturas .card > .eb-content,
#curso-evoluir .card-evoluir > .eb-content {
    display: flex;
    flex-direction: column;
    padding-bottom: 12px;
}

#view-viaturas .card .eb-content img,
#curso-evoluir .card-evoluir .eb-content img {
    margin-top: auto;
    width: 100%;
    height: auto;
    object-fit: contain;
    padding-bottom: 2px;
}
"@
[System.IO.File]::WriteAllText($ebCssFile, $ebCss, [System.Text.Encoding]::UTF8)


# 3. LIMPAR E REFAZER O STYLE.CSS PARA GARANTIR EFEITO EM TUDO
$css = [System.IO.File]::ReadAllText($styleFile, [System.Text.Encoding]::UTF8)
# Removemos a sessao anterior para recriar
$css = $css -replace '(?s)/\* ==========================================================================\r?\n   ESTILO EVOLUIR UNIVERSAL.*?(?=\/\* Evoluir Merito e Yellow Cards - Amarelo \*\/)', ''

$masterCss = @"
/* ==========================================================================
   ESTILO EVOLUIR UNIVERSAL (RED DEFAULT PARA TODOS OS CARDS)
   ========================================================================== */

/* Todos os cards (incluindo card-evoluir) por padrao sao VERMELHOS translucidos */
.card,
.info-card,
.card-evoluir {
    background: rgba(239, 68, 68, 0.06) !important;
    border-radius: 12px !important;
    backdrop-filter: blur(12px) !important;
    animation: redNeonPulse 3s ease-in-out infinite !important;
    transition: transform 0.25s ease, box-shadow 0.25s ease !important;
    /* Adicionamos uma "falsa borda topo" porque a borda real foi tirada pelo eb-content */
    box-shadow: inset 0 4px 0 0 #ef4444 !important;
}

.card:hover,
.info-card:hover,
.card-evoluir:hover {
    transform: translateY(-4px) !important;
    box-shadow: inset 0 4px 0 0 rgba(239, 68, 68, 0.8), 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(239, 68, 68, 0.4) !important;
}

/* Cards coloridos especificos overrides */
.card.green-card, .info-card.green-card, .card-evoluir.green-card {
    background: rgba(16, 185, 129, 0.07) !important;
    animation: greenNeonPulse 3.1s ease-in-out infinite !important;
    box-shadow: inset 0 4px 0 0 #10b981 !important;
}
.card.green-card:hover, .info-card.green-card:hover, .card-evoluir.green-card:hover {
    box-shadow: inset 0 4px 0 0 rgba(16, 185, 129, 0.8), 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.4) !important;
}

.card.blue-card, .info-card.blue-card, .card-evoluir.blue-card {
    background: rgba(59, 130, 246, 0.07) !important;
    animation: blueNeonPulse 2.9s ease-in-out infinite !important;
    box-shadow: inset 0 4px 0 0 #3b82f6 !important;
}
.card.blue-card:hover, .info-card.blue-card:hover, .card-evoluir.blue-card:hover {
    box-shadow: inset 0 4px 0 0 rgba(59, 130, 246, 0.8), 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(59, 130, 246, 0.4) !important;
}

.card.orange-card, .info-card.orange-card, .card-evoluir.orange-card {
    background: rgba(249, 115, 22, 0.07) !important;
    animation: orangeNeonPulse 2.8s ease-in-out infinite !important;
    box-shadow: inset 0 4px 0 0 #f97316 !important;
}
.card.orange-card:hover, .info-card.orange-card:hover, .card-evoluir.orange-card:hover {
    box-shadow: inset 0 4px 0 0 rgba(249, 115, 22, 0.8), 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(249, 115, 22, 0.4) !important;
}

.card.purple-card, .info-card.purple-card, .card-evoluir.purple-card {
    background: rgba(139, 92, 246, 0.07) !important;
    animation: purpleNeonPulse 3.3s ease-in-out infinite !important;
    box-shadow: inset 0 4px 0 0 #8b5cf6 !important;
}
.card.purple-card:hover, .info-card.purple-card:hover, .card-evoluir.purple-card:hover {
    box-shadow: inset 0 4px 0 0 rgba(139, 92, 246, 0.8), 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(139, 92, 246, 0.4) !important;
}

.card.cyan-card, .info-card.cyan-card, .card-evoluir.cyan-card {
    background: rgba(14, 165, 233, 0.07) !important;
    animation: cyanNeonPulse 3s ease-in-out infinite !important;
    box-shadow: inset 0 4px 0 0 #0ea5e9 !important;
}
.card.cyan-card:hover, .info-card.cyan-card:hover, .card-evoluir.cyan-card:hover {
    box-shadow: inset 0 4px 0 0 rgba(14, 165, 233, 0.8), 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(14, 165, 233, 0.4) !important;
}

/* Evoluir Merito e Yellow Cards - Amarelo */
.card-evoluir.merito,
.yellow-card,
.card.merito,
.info-card.merito {
    background-color: rgba(245, 158, 11, 0.06) !important;
    animation: yellowNeonPulse 3.2s ease-in-out infinite !important;
    box-shadow: inset 0 4px 0 0 #f59e0b !important;
}

.card-evoluir.merito:hover,
.yellow-card:hover,
.card.merito:hover,
.info-card.merito:hover {
    box-shadow: inset 0 4px 0 0 rgba(245, 158, 11, 0.8), 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.4) !important;
}
"@

# Localizar onde inserir
$idx = $css.IndexOf("/* Evoluir Merito e Yellow Cards - Amarelo */")
if ($idx -ge 0) {
    # Replace the old merito section too to avoid duplicates
    $endIdx = $css.IndexOf("/* Base Evoluir Hover para todos */", $idx)
    if ($endIdx -ge 0) {
        $css = $css.Substring(0, $idx) + $masterCss + $css.Substring($endIdx)
    } else {
        $css = $css.Substring(0, $idx) + $masterCss
    }
} else {
    $css = $css + "`n" + $masterCss
}

[System.IO.File]::WriteAllText($styleFile, $css, [System.Text.Encoding]::UTF8)

# 4. FIX ELECTRIC-BORDER.JS (Adicionar MutationObserver para garantir resize nas abas ocultas)
$js = [System.IO.File]::ReadAllText($ebJsFile, [System.Text.Encoding]::UTF8)
$js = $js -replace "const EXCLUDED_VIEWS = \[.*?\];", "const EXCLUDED_VIEWS = [];"

$newInit = @"
// Inicializar ElectricBorder em todas as abas
document.addEventListener('DOMContentLoaded', () => {
    function getColor(el) {
        if (el.classList.contains('green-card'))  return '#10b981';
        if (el.classList.contains('blue-card'))   return '#3b82f6';
        if (el.classList.contains('yellow-card')) return '#f59e0b';
        if (el.classList.contains('orange-card')) return '#f97316';
        if (el.classList.contains('purple-card')) return '#8b5cf6';
        if (el.classList.contains('cyan-card'))   return '#0ea5e9';
        if (el.classList.contains('merito'))      return '#f59e0b';
        return '#ef4444';
    }

    function applyElectric(el, radiusPx) {
        if (el.querySelector('.eb-content')) return;
        el.style.borderRadius = radiusPx + 'px';
        const color = getColor(el);
        const eb = new ElectricBorder(el, { color, chaos: 0.38, speed: 1.8, borderRadius: radiusPx });
        
        // Garante que o canvas ajusta o tamanho caso mude a aba
        window.addEventListener('tabChanged', () => {
            setTimeout(() => { eb.updateSize(); }, 50);
            setTimeout(() => { eb.updateSize(); }, 200);
        });
    }

    document.querySelectorAll('.card, .card-evoluir, .info-card').forEach(el => applyElectric(el, 12));
});
"@

$idx = $js.IndexOf("// Inicializar ElectricBorder em todas as abas")
if ($idx -ge 0) {
    $js = $js.Substring(0, $idx) + $newInit
} else {
    # try the old string
    $idx = $js.IndexOf("document.addEventListener('DOMContentLoaded'")
    if ($idx -ge 0) {
        $js = $js.Substring(0, $idx) + $newInit
    }
}

[System.IO.File]::WriteAllText($ebJsFile, $js, [System.Text.Encoding]::UTF8)

Write-Host "Done"
