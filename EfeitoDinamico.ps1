# Efeito Dinâmico e Suave no Terminal PowerShell
Add-Type -AssemblyName System.Windows.Forms

$width = [System.Console]::WindowWidth
$height = [System.Console]::WindowHeight
$random = New-Object System.Random

Clear-Host

while ($true) {
    # Gera uma matriz de caracteres aleatórios em posições diferentes
    for ($i = 0; $i -lt 10; $i++) { # Controla a densidade (ajuste o número 10 para mais/menos caracteres)
        $x = $random.Next(0, $width)       # Posição X aleatória
        $y = $random.Next(0, $height)      # Posição Y aleatória
        $char = [char]($random.Next(33, 126)) # Gera um caractere aleatório visível

        # Exibe o caractere na posição aleatória
        [System.Console]::SetCursorPosition($x, $y)
        Write-Host $char -ForegroundColor Green -NoNewline

        # Adiciona um pequeno intervalo entre os caracteres
        Start-Sleep -Milliseconds 100

        # Apaga o caractere para dar o efeito de fade-out
        [System.Console]::SetCursorPosition($x, $y)
        Write-Host " " -NoNewline
    }

    # Pequeno intervalo geral para suavizar a execução
    Start-Sleep -Milliseconds 50
}
