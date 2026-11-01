# Tải ảnh/nhạc từ link online về thư mục images\ rồi sửa link trong html/css/js.
# Chạy:  powershell -ExecutionPolicy Bypass -File .\tai-anh.ps1
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)
$ext = 'png|jpe?g|webp|gif|svg|mp3|m4a|ogg|mp4'
$pat = "https?://[^""'\s)\\<>]+?\.($ext)(?=[?""'\s)\\<>]|$)"

$files = @((Join-Path $root 'index.html'))
$files += Get-ChildItem (Join-Path $root 'css'), (Join-Path $root 'js') -File | Sort-Object FullName | ForEach-Object { $_.FullName }

$texts = @{}
foreach ($f in $files) { $texts[$f] = [IO.File]::ReadAllText($f, $utf8) }

$urls = New-Object System.Collections.Generic.SortedSet[string]
foreach ($t in $texts.Values) {
  foreach ($m in [regex]::Matches($t, $pat, 'IgnoreCase')) { [void]$urls.Add($m.Value) }
}
Write-Host "Tim thay $($urls.Count) file"

New-Item -ItemType Directory -Force -Path (Join-Path $root 'images') | Out-Null
$map = @{}
$i = 0
foreach ($u in $urls) {
  $i++
  $e = ([regex]::Match($u, "\.($ext)$", 'IgnoreCase')).Groups[1].Value.ToLower()
  $name = ('{0:000}.{1}' -f $i, $e)
  $path = Join-Path $root "images\$name"
  try {
    if (-not (Test-Path $path)) {
      Invoke-WebRequest -Uri $u -OutFile $path -UserAgent 'Mozilla/5.0' -TimeoutSec 60 -UseBasicParsing
    }
    $map[$u] = $name
    Write-Host "OK   $name"
  } catch { Write-Host "LOI  $u" }
}

foreach ($f in $files) {
  $t = $texts[$f]
  $prefix = if ((Split-Path (Split-Path $f) -Leaf) -eq 'css') { '../images/' } else { 'images/' }
  foreach ($u in $map.Keys) { $t = $t.Replace($u, $prefix + $map[$u]) }
  [IO.File]::WriteAllText($f, $t, $utf8)
}
Write-Host 'Xong. Anh tai loi van giu link goc.'
