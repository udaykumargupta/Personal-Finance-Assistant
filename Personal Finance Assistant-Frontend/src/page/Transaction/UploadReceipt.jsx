import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadReceipt } from '@/state/Transaction/Action';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const UploadReceipt = () => {
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
      setError('Please select an image file to upload.');
      return;
    }
    dispatch(uploadReceipt(file));
    // Navigate back to the home page after the upload starts
    navigate('/'); 
  };

  return (
    <div className="p-5 lg:p-10 flex justify-center">
      <Card className="w-full lg:w-[60%] bg-black border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Upload a Receipt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-400">
            Upload an image of a receipt to automatically create a new transaction.
          </p>
          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*" // Accept all image types
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
            {transaction.loading ? 'Processing...' : 'Upload and Process Receipt'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadReceipt;
