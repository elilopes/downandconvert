<?php
// php-format/api/extract.php
// This is a serverless PHP endpoint to handle media extraction without a VPS.
// It proxies the request to a third-party service to avoid CORS issues on the client side
// and bypasses the need for youtube-dl or ffmpeg on the shared hosting server.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

$url = $input['url'] ?? $_GET['url'] ?? '';
$mode = $input['mode'] ?? $_GET['mode'] ?? 'video';
$quality = $input['quality'] ?? $_GET['quality'] ?? '1080';

if (empty($url)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No URL provided']);
    exit;
}

// Example using a public proxy API (like Cobalt API) for extraction
// This avoids needing yt-dlp or node.js on the server
$apiUrl = 'https://co.wuk.sh/api/json';

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'Content-Type: application/json',
    'User-Agent: PHP-Serverless-Downloader/1.0'
]);

$payload = [
    'url' => $url,
    'vQuality' => str_replace('p', '', $quality === 'highest' ? '1080' : ($quality === 'lowest' ? '240' : $quality)),
    'isAudioOnly' => $mode === 'audio'
];

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => "cURL error: $error"]);
    exit;
}

$decoded = json_decode($response, true);

if ($decoded && isset($decoded['url'])) {
    echo json_encode([
        'success' => true,
        'title' => 'Extracted Media',
        'url' => $decoded['url'], // The direct URL from the API
        'thumbnail' => $decoded['thumbnail'] ?? '',
        'duration' => 0
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to extract media', 'details' => $decoded]);
}
?>
