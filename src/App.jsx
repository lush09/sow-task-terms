import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { languageApi } from './services/api';

function App() {
  const [terms, setTerms] = useState({ swedish: '', english: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Fetch terms from languages/1 endpoint
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await languageApi.getLanguageById(1);
        console.log('API Response:', response);
        if (response.success && response.data) {
          console.log('Swedish terms:', response.data.swedish);
          console.log('English terms:', response.data.english);
          // Check if the link is in the content
          const hasLink = response.data.english?.includes('target="_blank"') || 
                         response.data.swedish?.includes('target="_blank"');
          console.log('Contains target="_blank" link:', hasLink);
          
          setTerms({
            swedish: response.data.swedish || '',
            english: response.data.english || ''
          });
        } else {
          setError(response.message || 'Failed to load terms');
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Failed to connect to the API');
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  // Handle language change from header
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  // Get the current terms based on selected language
  const getCurrentTerms = () => {
    if (selectedLanguage === 'Svenska') {
      return terms.swedish || 'PUT TERMS HERE (Swedish)';
    } else {
      return terms.english || 'PUT TERMS HERE (English)';
    }
  };
  
  // Function to safely process HTML content
  const processHtmlContent = (html) => {
    if (!html) return '';
    
    // Process all anchor tags to ensure proper target and rel attributes
    let processedHtml = html.replace(/<a\s+([^>]*)>/gi, (match, attrs) => {
      // Clean up the attributes string
      let cleanAttrs = attrs.trim();
      
      // Check if target attribute exists
      const hasTarget = /target\s*=\s*["']([^"']*)["']/i.test(cleanAttrs);
      const hasRel = /rel\s*=\s*["']([^"']*)["']/i.test(cleanAttrs);
      
      if (!hasTarget) {
        // No target attribute, add target="_blank"
        cleanAttrs += ' target="_blank"';
      } else {
        // Replace empty target or normalize existing target
        cleanAttrs = cleanAttrs.replace(/target\s*=\s*["']["']/i, 'target="_blank"');
      }
      
      if (!hasRel) {
        // No rel attribute, add rel="noopener noreferrer"
        cleanAttrs += ' rel="noopener noreferrer"';
      } else {
        // Ensure rel includes noopener noreferrer
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
  
  // Function to create markup for HTML content
  const createMarkup = (htmlContent) => {
    return { __html: processHtmlContent(htmlContent) };
  };

  return (
    <div className="min-h-screen">
      <Header onLanguageChange={handleLanguageChange} />
      <main className="px-4 max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-gray-100 font-bold mb-8">Terms</h1>
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
    </div>
  );
}

export default App;