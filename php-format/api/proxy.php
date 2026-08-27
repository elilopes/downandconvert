<?php
// php-format/api/proxy.php
// This script acts as a proxy to fetch media files from third-party URLs
// and return them to the client-side FFmpeg.wasm without CORS restrictions.

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Range');
    exit(0);
}

$url = $_GET['url'] ?? '';

if (empty($url)) {
    http_response_code(400);
    die('No URL provided');
}

// Ensure the URL is valid
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    die('Invalid URL');
}

// Fetch headers to send correct content type and size
$headers = get_headers($url, 1);
$contentType = $headers['Content-Type'] ?? 'application/octet-stream';
if (is_array($contentType)) {
    $contentType = end($contentType);
}

header('Access-Control-Allow-Origin: *');
header("Content-Type: $contentType");

// Pass through Range headers if the browser requests a specific chunk (important for video streaming)
$requestHeaders = [];
if (isset($_SERVER['HTTP_RANGE'])) {
    $requestHeaders[] = 'Range: ' . $_SERVER['HTTP_RANGE'];
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, false); // Stream directly to output
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $requestHeaders);
// Disable SSL verification for maximum compatibility on shared hosting (use with caution)
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

// Execute and stream
curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(500);
    echo "Proxy Error: " . curl_error($ch);
}

curl_close($ch);
?>
