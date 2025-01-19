import { useData } from "./Provider";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as pdfjsLib from "pdfjs-dist";
import { Stores } from "./Stores";
import { Catering } from "./Catering";

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64.split(",")[1]);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function App() {
  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const {
    pdfError,
    setPdfError,
    analyzeState,
    pdfFile,
    setPdfFile,
    setJsonData,
  } = useData();

  // handle file onChange event
  const allowedFiles = ["application/pdf"];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError("Not a valid pdf: Please select only PDF");
        setPdfFile("");
      }
    } else {
      console.log("please select a PDF");
    }
  };

  //console.log(pdfFile);
  const pdfBytes = pdfFile && base64ToArrayBuffer(pdfFile);
  //console.log(pdfBytes);
  const loadingTask = pdfFile && pdfjsLib.getDocument({ data: pdfBytes });
  pdfFile &&
    loadingTask.promise
      .then(async (pdf) => {
        const numPages = pdf.numPages;
        const jsonResult = { pages: [] };
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          // Extract text items
          const textItems = textContent.items.map((item) => item.str);
          jsonResult.pages.push({ page: i, text: textItems });
        }
        setJsonData(JSON.stringify(jsonResult, null, 2));
        //console.log(JSON.stringify(jsonResult, null, 2));
      })
      .catch((error) => {
        console.error("Error: " + error);
      });

  return (
    <>
      <div className="container">
        {/* Upload PDF */}

        <form>
          <label>
            <h5>Upload PDF</h5>
          </label>
          <br></br>

          <input
            type="file"
            className="form-control"
            onChange={handleFile}
          ></input>

          {analyzeState === "reports" && <Stores />}

          {analyzeState === "catering" && <Catering />}

          {/* we will display error message in case user select some file
        other than pdf */}
          {pdfError && <span className="text-danger">{pdfError}</span>}
        </form>

        {/* View PDF */}
        <h5>View PDF</h5>
        <div className="viewer">
          {/* render this if we have a pdf file */}
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          )}

          {/* render this if we have pdfFile state null   */}
          {!pdfFile && <>No file is selected yet</>}
        </div>
      </div>
    </>
  );
}

export default App;
