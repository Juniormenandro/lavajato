# Efeito Matriz no PowerShell (Rápido)
Add-Type -AssemblyName System.Windows.Forms

$width = [System.Console]::WindowWidth
$height = [System.Console]::WindowHeight
$random = New-Object System.Random

Clear-Host

# Array para controlar as "colunas" de caracteres
$columns = @()

for ($i = 0; $i -lt $width; $i++) {
    $columns += $random.Next(0, $height)
}

while ($true) {
    for ($i = 0; $i -lt $width; $i++) {
        # Define se a "coluna" deve mostrar um caractere ou espaço
        if ($random.Next(0, 10) -lt 3) {
            # Gera um caractere aleatório visível
            $char = [char]($random.Next(33, 126))
            [System.Console]::SetCursorPosition($i, $columns[$i])
            Write-Host $char -ForegroundColor Blue -NoNewline
        }

        # Move a "coluna" para baixo
        $columns[$i] = ($columns[$i] + 1) % $height
    }

    # Diminua o valor para acelerar o efeito
    Start-Sleep -Milliseconds 50
}
