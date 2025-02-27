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
    const [westOrders, setWestOrders] = useState(new Set());
    const [eastOrders, setEastOrders] = useState(new Set());
    const [villageOrders, setVillageOrders] = useState(new Set());
    const [eastHamptOrders, setEastHampOrders] = useState(new Set());
    const [bridgeHamptOrders, setBridgeHamptOrders] = useState(new Set());
    const [southHamptOrders, setSouthHamptOrders] = useState(new Set());
    const [greenWOrders, setGreenWOrders] = useState(new Set());


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

  

  useEffect(() => {
    if (jsonData) {
    const parsedObject = JSON.parse(jsonData);

    const EXCLUDED_EXACT_VALUES = new Set([
      "", " ", "1.00", "SKU", "Comment", "COE", "Subcategory", "EA",
      "CUT FRUIT", "CUT VEGETABLES", "HERBS", "JUICE", "LEAFY GREENS", "SALADS"
  ]);
  
  const EXCLUDED_PATTERNS = [
      /\b2024\b/, /\bUOM\b/, /\bReport\b/, /\bDate\b/, /\bItem\b/,
      /\bPick\b/, /\bPage\b/, /\bQty\b/, /Ä/, /\b150\b/, /\b015\b/
  ];


  const shouldInclude = (item) => 
    !EXCLUDED_EXACT_VALUES.has(item) && 
    !EXCLUDED_PATTERNS.some(pattern => pattern.test(item));



    const westOrders = parsedObject.pages
    .filter(page => page.text.includes("Pick report for: Citarella West, LLC"))
    .flatMap(page => page.text)
    .filter(shouldInclude);
    setWestOrders((prevSet) => new Set([...prevSet, ...westOrders]));


    const eastOrders = parsedObject.pages
    .filter((page) => page.text.includes("Pick report for: Citarella East, LLC"))
    .flatMap((items) => items.text)
    .filter(shouldInclude);
    setEastOrders((prevSet) => new Set([...prevSet, ...eastOrders])); 

    const villageOrders = parsedObject
    .pages.filter((page) => page.text.includes("Pick report for: Village Enterprises, LLC"))
    .flatMap((items) => items.text)
    .filter(shouldInclude);
    setVillageOrders((prevSet) => new Set([...prevSet, ...villageOrders])); 

    const bridgeHamptOrders = parsedObject
    .pages.filter((page) => page.text.includes("Pick report for: Bridgehampton Enterprises, LLC"))
    .flatMap((items) => items.text)
    .filter(shouldInclude);
    setBridgeHamptOrders((prevSet) => new Set([...prevSet, ...bridgeHamptOrders]));

    const eastHamptOrders= parsedObject
    .pages.filter((page) => page.text.includes("Pick report for: East Hampton Enterprises, LLC"))
    .flatMap((items) => items.text)
    .filter(shouldInclude);
    setEastHampOrders((prevSet) => new Set([...prevSet, ...eastHamptOrders])); 


    const southHamptOrders = parsedObject
    .pages.filter((page) => page.text.includes("Pick report for: Southampton Enterprises, LLC"))
    .flatMap((items) => items.text)
    setSouthHamptOrders((prevSet) => new Set([...prevSet, ...southHamptOrders])); 


    const greenWOrders = parsedObject
    .pages.filter((page) => page.text.includes("Pick report for: Greenwich CT Enteprises, LLC"))
    .flatMap((items) => items.text)
    .filter(shouldInclude);
    setGreenWOrders((prevSet) => new Set([...prevSet, ...greenWOrders])); 

      console.log(eastOrders)
    
    }
  }, [jsonData]); 

     

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
            setPDFData,
            westOrders,
            eastOrders,
            villageOrders,
            bridgeHamptOrders,
            eastHamptOrders,
            southHamptOrders,
            greenWOrders

        }}
        >
            {children}
        </PdfContext.Provider>
    )

  }

  export const useData = () => useContext(PdfContext);