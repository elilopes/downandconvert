/**
 * ID3v2.3 Tag Writer for MP3 files
 * Injects Title, Artist, Album, Year, Genre, and APIC (Cover Art thumbnail)
 */

import { ID3Metadata } from '../types';

export function createId3Tag(metadata: ID3Metadata, coverImageData?: Uint8Array, mimeType: string = 'image/jpeg'): Uint8Array {
  const frames: Uint8Array[] = [];

  // Helper to create standard text frame (ISO-8859-1 or UTF-8 with BOM)
  const createTextFrame = (id: string, text: string) => {
    if (!text || text.trim() === '') return null;
    const encoder = new TextEncoder();
    // Use UTF-16 with BOM for full unicode support (accented characters like Portuguese)
    const utf16Chars: number[] = [0xFF, 0xFE]; // Little-endian BOM
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      utf16Chars.push(code & 0xFF, (code >> 8) & 0xFF);
    }
    
    const encodingByte = 1; // 1 = UTF-16 with BOM
    const content = new Uint8Array(1 + utf16Chars.length);
    content[0] = encodingByte;
    content.set(utf16Chars, 1);

    const frameHeader = new Uint8Array(10);
    // Frame ID (4 bytes ASCII)
    for (let i = 0; i < 4; i++) {
      frameHeader[i] = id.charCodeAt(i);
    }
    // Size (4 bytes Big Endian)
    const size = content.length;
    frameHeader[4] = (size >> 24) & 0xFF;
    frameHeader[5] = (size >> 16) & 0xFF;
    frameHeader[6] = (size >> 8) & 0xFF;
    frameHeader[7] = size & 0xFF;
    // Flags (2 bytes: 0x00, 0x00)
    frameHeader[8] = 0;
    frameHeader[9] = 0;

    const fullFrame = new Uint8Array(10 + content.length);
    fullFrame.set(frameHeader, 0);
    fullFrame.set(content, 10);
    return fullFrame;
  };

  // Add frames
  const titleFrame = createTextFrame('TIT2', metadata.title);
  if (titleFrame) frames.push(titleFrame);

  const artistFrame = createTextFrame('TPE1', metadata.artist);
  if (artistFrame) frames.push(artistFrame);

  const albumFrame = createTextFrame('TALB', metadata.album);
  if (albumFrame) frames.push(albumFrame);

  const yearFrame = createTextFrame('TYER', metadata.year);
  if (yearFrame) frames.push(yearFrame);

  const genreFrame = createTextFrame('TCON', metadata.genre);
  if (genreFrame) frames.push(genreFrame);

  // Cover image frame (APIC)
  if (coverImageData && coverImageData.length > 0) {
    const mimeBytes = new TextEncoder().encode(mimeType);
    const picType = 3; // 3 = Front cover
    const desc = new Uint8Array([0]); // empty description null terminator
    
    // Structure: [Encoding (1 byte: 0=ISO-8859-1)][MIME Type][0x00][Picture Type (1 byte)][Description][0x00][Binary Image Data]
    const contentSize = 1 + mimeBytes.length + 1 + 1 + desc.length + coverImageData.length;
    const content = new Uint8Array(contentSize);
    let offset = 0;
    content[offset++] = 0; // ISO-8859-1 for MIME
    content.set(mimeBytes, offset);
    offset += mimeBytes.length;
    content[offset++] = 0; // null byte after mime
    content[offset++] = picType;
    content.set(desc, offset);
    offset += desc.length;
    content.set(coverImageData, offset);

    const frameHeader = new Uint8Array(10);
    const id = 'APIC';
    for (let i = 0; i < 4; i++) {
      frameHeader[i] = id.charCodeAt(i);
    }
    const size = content.length;
    frameHeader[4] = (size >> 24) & 0xFF;
    frameHeader[5] = (size >> 16) & 0xFF;
    frameHeader[6] = (size >> 8) & 0xFF;
    frameHeader[7] = size & 0xFF;
    frameHeader[8] = 0;
    frameHeader[9] = 0;

    const fullFrame = new Uint8Array(10 + content.length);
    fullFrame.set(frameHeader, 0);
    fullFrame.set(content, 10);
    frames.push(fullFrame);
  }

  if (frames.length === 0) {
    return new Uint8Array(0);
  }

  // Calculate total frames size
  const totalFramesSize = frames.reduce((acc, f) => acc + f.length, 0);

  // ID3v2.3 header is 10 bytes: 'ID3', version 3.0, flags 0, 4-byte synchsafe size
  const header = new Uint8Array(10);
  header[0] = 0x49; // 'I'
  header[1] = 0x44; // 'D'
  header[2] = 0x33; // '3'
  header[3] = 3;    // version 2.3
  header[4] = 0;    // revision
  header[5] = 0;    // flags

  // Convert size to synchsafe integer (7 bits per byte)
  let s = totalFramesSize;
  header[9] = s & 0x7F;
  s >>= 7;
  header[8] = s & 0x7F;
  s >>= 7;
  header[7] = s & 0x7F;
  s >>= 7;
  header[6] = s & 0x7F;

  const result = new Uint8Array(10 + totalFramesSize);
  result.set(header, 0);
  let pos = 10;
  for (const frame of frames) {
    result.set(frame, pos);
    pos += frame.length;
  }

  return result;
}

export function attachId3ToMp3(mp3Data: Uint8Array, id3Tag: Uint8Array): Uint8Array {
  if (!id3Tag || id3Tag.length === 0) return mp3Data;
  const combined = new Uint8Array(id3Tag.length + mp3Data.length);
  combined.set(id3Tag, 0);
  combined.set(mp3Data, id3Tag.length);
  return combined;
}
