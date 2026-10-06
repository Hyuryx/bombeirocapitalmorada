$cssFile = Join-Path $PSScriptRoot "css\style.css"
$css = [System.IO.File]::ReadAllText($cssFile, [System.Text.Encoding]::UTF8)

# 1. Remover o "OVERRIDE ALL TO RED AND FIX PADDING" porque ele forca tudo para vermelho.
# O override e:
# .green-card, .yellow-card, .blue-card, .orange-card, .purple-card, .cyan-card, .rgb-card, .card-evoluir, .card-evoluir.merito { ... }
# Vamos usar Regex para matar esse override tosco.

$css = $css -replace '(?s)/\* OVERRIDE ALL TO RED AND FIX PADDING \*/.*?\.card, \.info-card \{\r?\n    padding: 10px !important;\r?\n    height: fit-content !important;\r?\n\}', '.card, .info-card { padding: 10px !important; height: fit-content !important; }'

# Mas pera, eu preciso restaurar as cores certas do evoluir e afins, senao os cards vao perder a cor.
# Na verdade eu tenho o bloco ESTILO EVOLUIR UNIVERSAL. Vamos corrigir o background desse bloco.
# Trocar background: rgba(17, 20, 29, 0.85) !important;
# por background: rgba(239, 68, 68, 0.06) !important; (fundo vermelho bem transparente do evoluir)

$css = $css.Replace("background: rgba(17, 20, 29, 0.85) !important;", "background: rgba(239, 68, 68, 0.06) !important;")

# Agora precisamos adicionar o CSS para .card-evoluir.merito
# para que ele brilhe amarelo em vez de vermelho.

$meritoCss = @"

/* Evoluir Merito e Yellow Cards - Amarelo */
.card-evoluir.merito,
.yellow-card,
.card.merito,
.info-card.merito {
    border-top-color: #f59e0b !important;
    background-color: rgba(245, 158, 11, 0.06) !important;
    animation: yellowNeonPulse 3.2s ease-in-out infinite !important;
}

.card-evoluir.merito:hover,
.yellow-card:hover,
.card.merito:hover,
.info-card.merito:hover {
    border-color: rgba(245, 158, 11, 0.8) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.4) !important;
}

/* Base Evoluir Hover para todos */
.card-evoluir:hover {
    border-color: rgba(239, 68, 68, 0.8) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(239, 68, 68, 0.4) !important;
}
"@

$css = $css + $meritoCss

[System.IO.File]::WriteAllText($cssFile, $css, [System.Text.Encoding]::UTF8)

Write-Host "Done"
