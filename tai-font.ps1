# Tai font tu statics.pancake.vn ve thu muc fonts\ roi sua link trong index.html va css\08-style.css.
# Chay (khong can cai gi them):  powershell -ExecutionPolicy Bypass -File .\tai-font.ps1
# Font nao tai loi thi giu nguyen link cu cho font do. Chay lai nhieu lan van an toan.
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)
$cssPath = Join-Path $root 'css\08-style.css'
$htmlPath = Join-Path $root 'index.html'
$css = [IO.File]::ReadAllText($cssPath, $utf8)
$html = [IO.File]::ReadAllText($htmlPath, $utf8)
$urlPat = 'https://statics\.pancake\.vn/web-media/[^"''\)\s<>]+'

# url -> ten ho font (de dat ten file de doc)
$names = @{}
foreach ($m in [regex]::Matches($css, 'font-family:\s*"([^"]+)";\s*src:\s*url\("(https://statics\.pancake\.vn[^"]+)"\)')) {
  $fam = $m.Groups[1].Value -replace '\.(ttf|otf)$', '' -replace '\s*\(\d+\)', ''
  $names[$m.Groups[2].Value] = ($fam.ToLower() -replace '[^a-z0-9]+', '-').Trim('-')
}

$urls = New-Object System.Collections.Generic.SortedSet[string]
foreach ($t in @($css, $html)) {
  foreach ($m in [regex]::Matches($t, $urlPat)) { [void]$urls.Add($m.Value) }
}
Write-Host "Tim thay $($urls.Count) font can tai"

$fontDir = Join-Path $root 'fonts'
New-Item -ItemType Directory -Force -Path $fontDir | Out-Null
$failed = 0
$i = 0
foreach ($u in $urls) {
  $i++
  $base = if ($names.ContainsKey($u)) { $names[$u] } else { "font-$i" }
  $tmp = Join-Path $fontDir "$base.tmp"
  try {
    Invoke-WebRequest -Uri $u -OutFile $tmp -UserAgent 'Mozilla/5.0' -TimeoutSec 60 -UseBasicParsing
  } catch {
    Write-Host "LOI  $base -> giu link cu"
    $failed++
    if (Test-Path $tmp) { Remove-Item $tmp -Force }
    continue
  }

  # nhan dang .otf (dau file 'OTTO') hay .ttf
  $b = [IO.File]::ReadAllBytes($tmp)
  $isOtf = ($b.Length -ge 4 -and $b[0] -eq 79 -and $b[1] -eq 84 -and $b[2] -eq 84 -and $b[3] -eq 79)
  $ext = if ($isOtf) { 'otf' } else { 'ttf' }
  $fmt = if ($isOtf) { 'opentype' } else { 'truetype' }
  $name = "$base.$ext"
  Move-Item -Path $tmp -Destination (Join-Path $fontDir $name) -Force

  $esc = [regex]::Escape($u)
  $css = [regex]::Replace($css, ('url\("' + $esc + '"\)\s*format\("[a-z0-9]+"\)'), ('url("../fonts/' + $name + '") format("' + $fmt + '")'))
  $html = [regex]::Replace($html, ('type="font/[a-z0-9]+"(\s+crossorigin\s+href=")' + $esc + '"'), ('type="font/' + $ext + '"${1}fonts/' + $name + '"'))
  Write-Host ("OK   {0}  ({1:N0} KB)" -f $name, ($b.Length / 1KB))
}

# neu khong con link pancake nao thi bo cac dong preconnect/dns-prefetch toi pancake
if (-not [regex]::IsMatch($css, $urlPat) -and -not [regex]::IsMatch($html, $urlPat)) {
  $html = [regex]::Replace($html, '\s*<link rel="(?:preconnect|dns-prefetch)" href="https://[a-z.]*pancake\.vn/?"[^>]*>', '')
}

[IO.File]::WriteAllText($cssPath, $css, $utf8)
[IO.File]::WriteAllText($htmlPath, $html, $utf8)
if ($failed -gt 0) { Write-Host "Xong. Co $failed font loi, giu link cu." } else { Write-Host 'Xong. Mo thiep bang trinh duyet de kiem tra lai.' }
