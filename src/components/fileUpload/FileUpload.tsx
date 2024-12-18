import { Button } from '@components/Button';
import { useState } from 'react';
import * as React from 'react';
import { UploadInfo } from 'types/utils';

type FileUploadProps = {
  onUpload: (info: UploadInfo) => void;
};

const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Upload file to the server
  const uploadFile = async () => {
    if (!file) {
      setUploadStatus('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const fileInfo = await response.json();
        setUploadStatus('OK');

        if (onUpload) {
          onUpload(fileInfo);
        }
      } else {
        setUploadStatus('FAILED');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('An error occurred while uploading.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <input type='file' onChange={handleFileChange} style={{ flexGrow: 1 }} />
      {uploadStatus && <p>{uploadStatus}</p>}
      <Button
        size='sm'
        variant='primary'
        aria-label='Upload file'
        onClick={uploadFile}
        disabled={!file}
      >
        Upload
      </Button>
    </div>
  );
};

export default FileUpload;
