# SmartHealth RSUD Dr. H. Abdul Moeloek Provinsi Lampung - Native PowerShell HTTP Server
$port = 8080
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    $port = 8081
    $prefix = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix)
    try {
        $listener.Start()
    } catch {
        $port = 8082
        $prefix = "http://localhost:$port/"
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add($prefix)
        $listener.Start()
    }
}

Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "  SmartHealth - Sistem Antrean & EMR Terpadu RSUDAM Provinsi Lampung" -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "Server Localhost aktif di: $prefix" -ForegroundColor Yellow
Write-Host "Membuka browser sistem otomatis..." -ForegroundColor Cyan

Start-Process $prefix

$currentDir = $PSScriptRoot
if (-not $currentDir) { $currentDir = (Get-Location).Path }

Write-Host "Tekan CTRL + C di jendela ini untuk menghentikan server." -ForegroundColor Gray
Write-Host "--------------------------------------------------------------------" -ForegroundColor DarkGray

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) {
            $path = "/index.html"
        }

        $cleanPath = $path.TrimStart('/').Replace('/', '\')
        $filePath = Join-Path $currentDir $cleanPath

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".htm"  { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".ts"   { "text/plain; charset=utf-8" }
                ".tsx"  { "text/plain; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".svg"  { "image/svg+xml" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".ico"  { "image/x-icon" }
                ".md"   { "text/plain; charset=utf-8" }
                Default { "application/octet-stream" }
            }

            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "[200 OK] $($request.HttpMethod) $path" -ForegroundColor Green
        } else {
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Objek Tidak Ditemukan: $path")
            $response.StatusCode = 404
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            Write-Host "[404 Not Found] $($request.HttpMethod) $path" -ForegroundColor Red
        }
        $response.OutputStream.Close()
    } catch {
        # Tangani browser connection resets
    }
}

