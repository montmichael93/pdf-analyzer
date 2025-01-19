import {
    createContext,
    useContext,
    useState,
  } from "react";
import { useEffect } from "react";


  const PdfContext = createContext();

  export const PdfDataProvider = ({children}) => {    
    const [analyzeState, setAnalyzeState] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfError, setPdfError] = useState("");
    const [jsonData, setJsonData] = useState(null);
    const [pdfData, setPDFData] = useState(null);

    useEffect(() => {
      if (jsonData) {
        const parsedObject = JSON.parse(jsonData);
        if (parsedObject.pages[0].text[0] === "Consolidation Report") {
            setAnalyzeState("reports")
        } else if (parsedObject.pages[0].text[0] === "2- Catering Summary by Location") {
            setAnalyzeState("catering")
        }
      } else {
        console.error('jsonData is null or undefined');
      }
    }, [jsonData])

    return (
        <PdfContext.Provider
        value={{
            analyzeState,
            setAnalyzeState,
            pdfFile,
            setPdfFile,
            pdfError,
            setPdfError,
            jsonData,
            setJsonData,
            pdfData,
            setPDFData
        }}
        >
            {children}
        </PdfContext.Provider>
    )

  }

  export const useData = () => useContext(PdfContext);