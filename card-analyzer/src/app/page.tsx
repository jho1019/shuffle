"use client";

import { useState } from 'react';
import CardInput from '@/components/CardInput';
import CardResult from '@/components/CardResult';

export default function Home() {
  const [cardData, setCardData] = useState<any>(null);
  const [cardImages, setCardImages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleAnalyze = async (cert: string) => {
    setIsLoading(true);
    setError(null);
    setCardData(null);
    setCardImages([]);

    try {
      // Call both APIs in parallel
      const [detailsResponse, imagesResponse] = await Promise.all([
        fetch(`/api/analyze?cert=${encodeURIComponent(cert)}`),
        fetch(`/api/images?cert=${encodeURIComponent(cert)}`)
      ]);

      const detailsData = await detailsResponse.json();
      console.log('Details API Response:', detailsData);

      if (!detailsResponse.ok) {
        setError(detailsData.error || 'Failed to fetch card data');
        console.error('API Error:', detailsData);
        return;
      }

      // Check if the response indicates an invalid request
      if (detailsData.IsValidRequest === false) {
        setError(detailsData.ServerMessage || 'Invalid certification number or authentication failed');
        console.error('Invalid Request:', detailsData);
        return;
      }

      // Check if no data was found
      if (detailsData.ServerMessage && detailsData.ServerMessage.includes('No data found')) {
        setError('No card found with this certification number');
        return;
      }

      // If we got here, we should have valid data
      setCardData(detailsData);

      // Handle images response (don't fail if images aren't available)
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        console.log('Images API Response:', imagesData);
        if (Array.isArray(imagesData) && imagesData.length > 0) {
          setCardImages(imagesData);
        }
      } else {
        console.warn('Images API failed, but continuing with card details');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Network Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>



      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Card Analyzer
          </h1>
          <p className="text-gray-400">Verify PSA certified trading cards instantly</p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <CardInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Results */}
        <CardResult data={cardData} error={error} images={cardImages} />

        {/* Info Section */}
        {!cardData && !error && (
          <div className="mt-16 text-center text-gray-500">
            <p className="text-sm">Enter a PSA certification number to get started</p>
            <p className="text-xs mt-2">Example: 12345678</p>
          </div>
        )}
      </div>
    </div>
  );
}
