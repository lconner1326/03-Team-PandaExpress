import { useEffect } from "react";

function TranslationWidget(){

    useEffect(() => {
        // Dynamically load Google Translate script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    
        // Define the global initialization function
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en' }, 
            'google_translate_element'
          );
        };
    
        // Cleanup function
        return () => {
          document.body.removeChild(script);
          delete window.googleTranslateElementInit;
        };
      }, []);
    
      return (
        <div className="translation-widget">
          <div id="google_translate_element"></div>
        </div>
      );
    };
    

export default TranslationWidget;