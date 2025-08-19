import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { languageApi } from './services/api';
import { Parallax } from 'react-parallax';

function App() {
  const [terms, setTerms] = useState({ swedish: '', english: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Fetch terms from API
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await languageApi.getLanguageById(1);
        if (response.success && response.data) {
          setTerms({
            swedish: response.data.swedish || '',
            english: response.data.english || ''
          });
        } else {
          setError(response.message || 'Failed to load terms');
        }
      } catch (err) {
        setError(err.message || 'Failed to connect to the API');
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const getCurrentTerms = () => {
    if (selectedLanguage === 'Svenska') {
      return terms.swedish || 'PUT TERMS HERE (Swedish)';
    } else {
      return terms.english || 'PUT TERMS HERE (English)';
    }
  };

  const processHtmlContent = (html) => {
    if (!html) return '';
    let processedHtml = html.replace(/<a\s+([^>]*)>/gi, (match, attrs) => {
      let cleanAttrs = attrs.trim();
      const hasTarget = /target\s*=\s*["']([^"']*)["']/i.test(cleanAttrs);
      const hasRel = /rel\s*=\s*["']([^"']*)["']/i.test(cleanAttrs);

      if (!hasTarget) {
        cleanAttrs += ' target="_blank"';
      } else {
        cleanAttrs = cleanAttrs.replace(/target\s*=\s*["']["']/i, 'target="_blank"');
      }

      if (!hasRel) {
        cleanAttrs += ' rel="noopener noreferrer"';
      } else {
        cleanAttrs = cleanAttrs.replace(/rel\s*=\s*["']([^"']*)["']/i, (relMatch, relValue) => {
          const relValues = relValue.split(/\s+/).filter(Boolean);
          if (!relValues.includes('noopener')) relValues.push('noopener');
          if (!relValues.includes('noreferrer')) relValues.push('noreferrer');
          return `rel="${relValues.join(' ')}"`;
        });
      }

      return `<a ${cleanAttrs}>`;
    });

    return processedHtml;
  };

  const createMarkup = (htmlContent) => {
    return { __html: processHtmlContent(htmlContent) };
  };

  return (
    <div className="min-h-screen text-gray-100">
      <Header onLanguageChange={handleLanguageChange} />

      <Parallax
        bgImage="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"
        strength={200}
        bgImageStyle={{ objectFit: 'fixed' }}
      >
        <main className="px-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center py-20">
            <h1 className="text-3xl font-bold mb-8">Terms</h1>

            <button 
              className="bg-green-600 hover:bg-green-800 text-white font-medium py-4 px-10 mb-10 rounded-full transition-colors"
              onClick={() => window.history.back()}
            >
              Close and Go Back
            </button>

            <div className="terms-card text-center bg-white rounded-3xl shadow-md p-10 max-w-3xl w-full mb-8 min-h-[300px]">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
              ) : (
                <div 
                  className="prose max-w-none text-gray-600 [&_a]:text-blue-600 [&_a]:font-semibold [&_a:hover]:text-blue-800"
                  dangerouslySetInnerHTML={createMarkup(getCurrentTerms())}
                />
              )}
            </div>
            
            <button 
              className="bg-green-600 hover:bg-green-800 text-white font-medium py-4 px-10 mb-10 rounded-full transition-colors"
              onClick={() => window.history.back()}
            >
              Close and Go Back
            </button>
          </div>
        </main>
      </Parallax>
    </div>
  );
}

export default App;
