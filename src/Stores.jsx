import { useEffect } from "react";
import { useData } from "./Provider";



export const Stores = () => {
    const { jsonData } = useData();
    //const [westOrders, setWestOrders] = useState();
    //const [eastOrders, setEastOrders] = useState()
    //const [eastHamptOrders, setEastHampOrders] = useState();
    //const [villageOrders, setVillageOrders] = useState();
    //const [bridgeHamptOrders, setBridgeHamptOrders] = useState();
    //const [southHamptOrders, setSouthHamptOrders] = useState();
    //const [greenWOrders, setGreenWOrders] = useState();     

    useEffect(() => {
        //const parsedObject = JSON.parse(jsonData);
        //setWestOrders(parsedObject.pages.filter((page) => page.text.includes("Pick report for: Citarella West, LLC")));
        //setEastOrders(parsedObject.pages.filter((page) => page.text.includes("Pick report for: Citarella East, LLC")));
        //setEastHampOrders(parsedObject.pages.filter((page) => page.text.includes("Pick report for: East Hampton Enterprises, LLC")));
        //setVillageOrders(parsedObject.pages.filter((page) => page.text.includes("Pick report for: Village Enterprises, LLC")));
        //setBridgeHamptOrders(parsedObject.pages.filter((page) => page.text.includes("Pick report for: Bridgehampton Enterprises, LLC")));
        //setSouthHamptOrders(parsedObject.pages.filter((page) => page.text.includes("Pick report for: Southampton Enterprises, LLC")));
        //setGreenWOrders(parsedObject.pages.filter((page) => page.text.includes("Pick report for: Greenwich CT Enteprises, LLC")));
    }, [jsonData])
    
    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Store</th>
        <th>Missing</th>
        <th>Report Valid</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>West Side</td>
        <td>N/A</td>
        <td>✅</td>
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>East Side</td>
        <td>N/A</td>
        <td>✅</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Village</td>
        <td>N/A</td>
        <td>✅</td>
      </tr>

            {/* row 4 */}
            <tr>
        <th>4</th>
        <td>Bridge Hampton</td>
        <td>N/A</td>
        <td>✅</td>
      </tr>

            {/* row 5 */}
            <tr>
        <th>5</th>
        <td>East Hampton</td>
        <td>N/A</td>
        <td>✅</td>
      </tr>

            {/* row 6 */}
            <tr>
        <th>6</th>
        <td>South Hampton</td>
        <td>N/A</td>
        <td>✅</td>
      </tr>

            {/* row 7 */}
            <tr>
        <th>7</th>
        <td>Greenwich</td>
        <td>N/A</td>
        <td>✅</td>
      </tr>
    </tbody>
  </table>
</div>
    )
}