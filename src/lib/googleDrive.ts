/**
 * Google Drive API Client-Side Integration
 */

export interface GoogleDriveUploadResult {
  id: string;
  name: string;
  webViewLink?: string;
}

/**
 * Uploads a Blob or File directly to the authenticated user's Google Drive
 */
export async function uploadFileToGoogleDrive(
  fileBlob: Blob,
  fileName: string,
  mimeType: string,
  accessToken: string
): Promise<GoogleDriveUploadResult> {
  const metadata = {
    name: fileName,
    mimeType: mimeType || 'audio/mp3',
    description: 'Enviado através do conversor AudioMorph',
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  // Read blob as ArrayBuffer or create multipart request
  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json; charset=UTF-8' })
  );
  form.append('file', fileBlob);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message ||
        `Erro ao salvar no Google Drive (Código ${response.status}). Faça login novamente.`
    );
  }

  const data = await response.json();
  return data;
}
