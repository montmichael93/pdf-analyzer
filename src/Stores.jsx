import { useData } from "./Provider";
import { useEffect, useState } from "react";


export const Stores = () => {
    const { westOrders, eastOrders, villageOrders, bridgeHamptOrders, eastHamptOrders, southHamptOrders, greenWOrders  } = useData();

    const [westMissing, setWestMissing] = useState(new Set());
    const [eastMissing, setEastMissing] = useState(new Set());
    const [villageMissing, setVillageMissing] = useState(new Set());
    const [bridgeHamptMissing, setBridgeHamptMissing] = useState(new Set());
    const [eastHamptMissing, setEastHamptMissing] = useState(new Set());
    const [southHamptMissing, setSouthHamptMissing] = useState(new Set());
    const [greenWmissing, setGreenMissing] = useState(new Set());



    useEffect(() => {
      const checkStore = (store, setMissing) => {
        const mandatoryItems = new Set([
          "CRUDITE - EXTRA LARGE 40 OZ",
          "JUICE - CITARELLA LEMONADE 1/2 GALLON",
          "SALAD - GRILLED SALMON 13.6 OZ (386 gm)",
        ]);
    
        // Get the missing items
        const missingItems = [...mandatoryItems].filter(item => !store.has(item));
    
        // Update state with missing items (convert to Set to avoid duplicates)
        setMissing(new Set(missingItems));
      };
    
      checkStore(westOrders, setWestMissing);
      checkStore(eastOrders, setEastMissing);
      checkStore(villageOrders, setVillageMissing);
      checkStore(bridgeHamptOrders, setBridgeHamptMissing);
      checkStore(eastHamptOrders, setEastHamptMissing);
      checkStore(southHamptOrders, setSouthHamptMissing);
      checkStore(greenWOrders, setGreenMissing);
    }, [
      bridgeHamptOrders,
      eastHamptOrders,
      eastOrders,
      greenWOrders,
      southHamptOrders,
      villageOrders,
      westOrders,
    ]);
    

    console.log(eastMissing)

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
        {westMissing.size === 0 ? <td>N/A</td> : [...westMissing].map((item, index) => <td key={index}>{item}</td>)}

       {westMissing.size === 0 ? <td>✅</td> : <td>❌</td>}
      </tr>
      {/* row 2 */}
      <tr>
        <th>2</th>
        <td>East Side</td>
        {eastMissing.size === 0 ? <td>N/A</td>  : [...eastMissing].map((item, index) => <td key={index}>{item}</td>)}

        {eastMissing.size === 0 ? <td>✅</td> : <td>❌</td>}
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Village</td>

      {villageMissing.size === 0 ? <td>N/A</td>  : [...villageMissing].map((item, index) => <td key={index}>{item}</td>)}
      {villageMissing.size === 0 ? <td>✅</td> : <td>❌</td>}
      </tr>

            {/* row 4 */}
            <tr>
        <th>4</th>
        <td>Bridge Hampton</td>

        {bridgeHamptMissing.size === 0 ? <td>N/A</td>  : [...bridgeHamptMissing].map((item, index) => <td key={index}>{item}</td>)}
        {bridgeHamptMissing.size === 0 ? <td>✅</td> : <td>❌</td>}
      </tr>

            {/* row 5 */}
            <tr>
        <th>5</th>
        <td>East Hampton</td>

      {eastHamptMissing.size === 0 ? <td>N/A</td>  : [...eastHamptMissing].map((item, index) => <td key={index}>{item}</td>)}
      {eastHamptMissing.size === 0 ? <td>✅</td> : <td>❌</td>}
      </tr>

            {/* row 6 */}
            <tr>
        <th>6</th>
        <td>South Hampton</td>

       {southHamptMissing.size === 0 ? <td>N/A</td>  : [...southHamptMissing].map((item, index) => <td key={index}>{item}</td>)}
       {southHamptMissing.size === 0 ? <td>✅</td> : <td>❌</td>}
      </tr>

            {/* row 7 */}
            <tr>
        <th>7</th>
        <td>Greenwich</td>

      {greenWmissing.size === 0 ? <td>N/A</td>  : [...greenWmissing].map((item, index) => <td key={index}>{item}</td>)}
      {greenWmissing.size === 0 ? <td>✅</td> : <td>❌</td>}
      </tr>
    </tbody>
  </table>
</div>
    )
}