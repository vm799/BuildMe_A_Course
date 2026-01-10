import React, { useState, useEffect } from 'react';

const AssetTester = () => {
  const [assetStatus, setAssetStatus] = useState({
    video: { exists: false, tested: false },
    pdf: { exists: false, tested: false },
    image: { exists: false, tested: false }
  });

  useEffect(() => {
    // Test asset existence
    const testAssets = async () => {
      try {
        // Test video
        const videoResponse = await fetch('/videos/test.mp4');
        setAssetStatus(prev => ({
          ...prev,
          video: { exists: videoResponse.ok, tested: true }
        }));

        // Test PDF
        const pdfResponse = await fetch('/decks/test.pdf');
        setAssetStatus(prev => ({
          ...prev,
          pdf: { exists: pdfResponse.ok, tested: true }
        }));

        // Test image
        const imageResponse = await fetch('/images/test.png');
        setAssetStatus(prev => ({
          ...prev,
          image: { exists: imageResponse.ok, tested: true }
        }));
      } catch (error) {
        console.error('Asset testing failed:', error);
      }
    };

    testAssets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🛠️ Asset Integrity Test</h1>
        
        {/* Video Test */}
        <section className="mb-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            🎬 1. MP4 Video Test
            <span className={`ml-4 px-3 py-1 rounded-full text-sm ${
              assetStatus.video.tested 
                ? (assetStatus.video.exists ? 'bg-green-500' : 'bg-red-500')
                : 'bg-yellow-500'
            }`}>
              {assetStatus.video.tested 
                ? (assetStatus.video.exists ? 'FOUND' : 'MISSING')
                : 'TESTING...'
              }
            </span>
          </h2>
          
          {assetStatus.video.exists ? (
            <div className="space-y-4">
              <video 
                controls 
                className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                preload="metadata"
              >
                <source src="/videos/test.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-green-400 text-center">✅ Video loads and plays correctly</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-red-400 mb-4">❌ test.mp4 not found in /public/videos/</div>
              <p className="text-gray-400">Place a test.mp4 file in the public/videos/ folder</p>
            </div>
          )}
        </section>

        {/* PDF Test */}
        <section className="mb-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            📄 2. PDF Document Test
            <span className={`ml-4 px-3 py-1 rounded-full text-sm ${
              assetStatus.pdf.tested 
                ? (assetStatus.pdf.exists ? 'bg-green-500' : 'bg-red-500')
                : 'bg-yellow-500'
            }`}>
              {assetStatus.pdf.tested 
                ? (assetStatus.pdf.exists ? 'FOUND' : 'MISSING')
                : 'TESTING...'
              }
            </span>
          </h2>
          
          {assetStatus.pdf.exists ? (
            <div className="space-y-4">
              <iframe 
                src="/decks/test.pdf" 
                className="w-full h-96 mx-auto rounded-lg shadow-lg border-0"
                title="PDF Test Document"
              />
              <p className="text-green-400 text-center">✅ PDF loads and displays correctly</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-red-400 mb-4">❌ test.pdf not found in /public/decks/</div>
              <p className="text-gray-400">Place a test.pdf file in the public/decks/ folder</p>
            </div>
          )}
        </section>

        {/* Image Test */}
        <section className="mb-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            🖼️ 3. PNG Image Test
            <span className={`ml-4 px-3 py-1 rounded-full text-sm ${
              assetStatus.image.tested 
                ? (assetStatus.image.exists ? 'bg-green-500' : 'bg-red-500')
                : 'bg-yellow-500'
            }`}>
              {assetStatus.image.tested 
                ? (assetStatus.image.exists ? 'FOUND' : 'MISSING')
                : 'TESTING...'
              }
            </span>
          </h2>
          
          {assetStatus.image.exists ? (
            <div className="space-y-4">
              <img 
                src="/images/test.png" 
                alt="Test Asset" 
                className="max-w-2xl mx-auto rounded-lg shadow-lg"
              />
              <p className="text-green-400 text-center">✅ Image loads and displays correctly</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-red-400 mb-4">❌ test.png not found in /public/images/</div>
              <p className="text-gray-400">Place a test.png file in the public/images/ folder</p>
            </div>
          )}
        </section>

        {/* Instructions */}
        <div className="bg-blue-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">📋 Manual Setup Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-200">
            <li>Create these test files: test.mp4, test.pdf, test.png</li>
            <li>Place them in the respective folders:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li><code className="bg-gray-700 px-2 py-1 rounded">public/videos/test.mp4</code></li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">public/decks/test.pdf</code></li>
                <li><code className="bg-gray-700 px-2 py-1 rounded">public/images/test.png</code></li>
              </ul>
            </li>
            <li>Refresh this page to re-run the tests</li>
            <li>When all show ✅ FOUND, your asset pipeline is working!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AssetTester;