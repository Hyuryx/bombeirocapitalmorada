$cssFile = Join-Path $PSScriptRoot "css\style.css"
$css = [System.IO.File]::ReadAllText($cssFile, [System.Text.Encoding]::UTF8)

# Remover a sessao ESTILO EVOLUIR UNIVERSAL atual
$css = $css -replace '(?s)/\* ==========================================================================\r?\n   ESTILO EVOLUIR UNIVERSAL.*?(?=\/\* Evoluir Merito e Yellow Cards - Amarelo \*\/)', ''

# Agora vamos inserir o novo CSS mestre, garantindo que TUDO seja RED por padrao
# inclusive os .card-evoluir.
$masterCss = @"
/* ==========================================================================
   ESTILO EVOLUIR UNIVERSAL (RED DEFAULT PARA TODOS OS CARDS)
   ========================================================================== */

/* Todos os cards (incluindo card-evoluir) por padrao sao VERMELHOS translucidos */
.card,
.info-card,
.card-evoluir {
    background: rgba(239, 68, 68, 0.06) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-top: 4px solid #ef4444 !important;
    border-radius: 12px !important;
    backdrop-filter: blur(12px) !important;
    animation: redNeonPulse 3s ease-in-out infinite !important;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
}

.card:hover,
.info-card:hover,
.card-evoluir:hover {
    transform: translateY(-4px) !important;
    border-color: rgba(239, 68, 68, 0.8) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(239, 68, 68, 0.4) !important;
}

/* Cards coloridos especificos overrides */
.card.green-card, .info-card.green-card {
    border-top-color: #10b981 !important;
    background: rgba(16, 185, 129, 0.07) !important;
    animation: greenNeonPulse 3.1s ease-in-out infinite !important;
}
.card.green-card:hover, .info-card.green-card:hover {
    border-color: rgba(16, 185, 129, 0.8) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(16, 185, 129, 0.4) !important;
}

.card.blue-card, .info-card.blue-card {
    border-top-color: #3b82f6 !important;
    background: rgba(59, 130, 246, 0.07) !important;
    animation: blueNeonPulse 2.9s ease-in-out infinite !important;
}
.card.blue-card:hover, .info-card.blue-card:hover {
    border-color: rgba(59, 130, 246, 0.8) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(59, 130, 246, 0.4) !important;
}

.card.orange-card, .info-card.orange-card {
    border-top-color: #f97316 !important;
    background: rgba(249, 115, 22, 0.07) !important;
    animation: orangeNeonPulse 2.8s ease-in-out infinite !important;
}
.card.orange-card:hover, .info-card.orange-card:hover {
    border-color: rgba(249, 115, 22, 0.8) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(249, 115, 22, 0.4) !important;
}

.card.purple-card, .info-card.purple-card {
    border-top-color: #8b5cf6 !important;
    background: rgba(139, 92, 246, 0.07) !important;
    animation: purpleNeonPulse 3.3s ease-in-out infinite !important;
}
.card.purple-card:hover, .info-card.purple-card:hover {
    border-color: rgba(139, 92, 246, 0.8) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(139, 92, 246, 0.4) !important;
}

.card.cyan-card, .info-card.cyan-card {
    border-top-color: #0ea5e9 !important;
    background: rgba(14, 165, 233, 0.07) !important;
    animation: cyanNeonPulse 3s ease-in-out infinite !important;
}
.card.cyan-card:hover, .info-card.cyan-card:hover {
    border-color: rgba(14, 165, 233, 0.8) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(14, 165, 233, 0.4) !important;
}

"@

# Localizar onde inserir
$idx = $css.IndexOf("/* Evoluir Merito e Yellow Cards - Amarelo */")
if ($idx -ge 0) {
    $css = $css.Substring(0, $idx) + $masterCss + $css.Substring($idx)
} else {
    $css = $css + "`n" + $masterCss
}

[System.IO.File]::WriteAllText($cssFile, $css, [System.Text.Encoding]::UTF8)
Write-Host "Done"
