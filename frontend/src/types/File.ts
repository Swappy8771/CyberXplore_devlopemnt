export interface FileItem {
  id: string;
  filename: string;
  status: 'pending' | 'scanned';
  result: 'clean' | 'infected' | null;
  uploadedAt: string;
  scannedAt: string | null;
  path?: string;
}
