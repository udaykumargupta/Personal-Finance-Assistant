import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPdfStatement } from '@/state/Transaction/Action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const UploadPdf = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transaction } = useSelector((store) => store);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(''); // Clear previous errors
  };

  const handleSubmit = () => {
    if (!file) {
      setError('Please select a PDF file to upload.');
      return;
    }
    dispatch(uploadPdfStatement(file));
    // Optionally navigate away after upload starts or completes
    navigate('/'); 
  };

  return (
    <div className="p-5 lg:p-10 flex justify-center">
      <Card className="w-full lg:w-[60%] bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Upload Bank Statement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-400">
            Upload a PDF of your bank statement to automatically import transactions.
          </p>
          <div className="space-y-2">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="bg-gray-700 border-gray-600 file:text-white"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={transaction.loading} 
            className="w-full"
          >
            {transaction.loading ? 'Uploading...' : 'Upload and Process PDF'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadPdf;
