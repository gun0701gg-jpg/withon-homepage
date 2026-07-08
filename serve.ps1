$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 5500
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".png"  = "image/png"
  ".svg"  = "image/svg+xml"
  ".jpg"  = "image/jpeg"
  ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
  try {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $response.KeepAlive = $false
    $response.SendChunked = $true

    $path = $request.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    if ($path.EndsWith("/")) { $path = $path + "index.html" }

    $filePath = Join-Path $root ($path.TrimStart("/") -replace "/", "\")

    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath)
      $contentType = $mime[$ext]
      if (-not $contentType) { $contentType = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = $contentType
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
      $response.OutputStream.Flush()
    } else {
      $response.StatusCode = 404
      $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $response.OutputStream.Write($notFound, 0, $notFound.Length)
      $response.OutputStream.Flush()
    }
  } catch {
    Write-Host "Request error: $_"
  } finally {
    if ($response) {
      try { $response.OutputStream.Close() } catch {}
      try { $response.Close() } catch {}
    }
  }
}
