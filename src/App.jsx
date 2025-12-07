import { useState, useEffect, useRef } from 'react'

import L, { featureGroup, latLng, polygon } from "leaflet"
import 'leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
//import parseAndSortSoils from "../server.js"


{/*
  const BasinArea = ({pondSizeAC}) => {
    // ac pond / 640 = sqMiles
    return (
      <>
      <div>
        <p>Pond Size: {pondSizeAC / 640} square miles</p>
      </div>
      </>
    )

  }

  const basinPerim = () => {
    // (ft long side * 2) + (ft short side * 2) = perimeter in ft
    return (
      <>
      <div>
        <p>Pond Size: {pondSizeAC / 640} square miles</p>
      </div>
      </>
    )
  }

  // Volume of earthwork
  const leveeCenter = () => {
    // (longSideFt + shortSideFt) * 2 * (freeboardFt + waterDepthFt) * leveeTopFt / 27
    // returns cu yds
      return (
      <>
      <div>
        <p>Pond Size: {pondSizeAC / 640} square miles</p>
      </div>
      </>
    )
  }
  

  const leveeInside = () => {
    // (freeboardFt + waterDepthFt) * slopeInside * (freeboardFt + waterDepthFt) * (longSideFt + shortSideFt) * 2 / 2 / 27
    // returns cu yds
  }

  const leveeOutside = () => {
    // (freeboardFt + waterDepthFt) * slopeOutside * (freeboardFt + waterDepthFt) * (longSideFt + shortSideFt) * 2 / 2 / 27
    // returns cu yds
  }


  const EarthworkTotVol = () => {
    // int totCuYds = leveeCenter + leveeInside + leveeOutside

    // return totCuYds
  }

  const EarthworkTotCost = () => {
    // int totCost = totVolEarthwork * earthworkCostCuYds
    //     totCost = X * $12
  }
  
  const WettedOutsideLength = () => {
    // int outsideLengthFt = basinPerim / 4;

  }

  const lessOutsideLevee = () => {
    // int totFt = (freeboardFt + waterDepthFt) * slopeOutside * 2

  }

  const lessTop = () => {
    // int totFt = leveeTop * 2

  }

  const lessInsideLevee = () => {
    // int totFt = (freeboardFt + waterDepthFt) * slopeInside * 2
  }

  const wettedInsideLevee = () => {
    // int totFt = waterDepthFt * slopeInside * 2

  }

  const netInsideLength = () => {
    // int totFt = wettedOutsideLength() - (lessOutsideLevee + lessTop + lessInsideLevee) + wettedInsideLevee
  }

  const totWettedAreaSqYds = () => {
    // int totSqYds = (netInsideLength * netInsideLength) / 9
  }

  const totWettedAreaAcres = () => {
    // int totAcres = totWettedAreaSqYds / 4840
  }


  const grossAc = () => {
    // int grossAc = totWettedAreaAcres / basinAcPond
  }


const PageTitle = () => {
  return (
    <>
      <div className="pageHeader">
        <h1>California Water Institute</h1>
      </div>
    </>
  )


}
*/}


const PageLogo = () => {
  return (
  <>
    <div>
      <img src='./src/assets/fs-logo-color-stacked.jpg' className="headerLogo"/>
    </div>
  </>
  )
}

const HeaderNavBar = () => {

  return (
    <>
    {/*       Navbar section        */}
    <div className="navBar">
            <a href="#">Home</a>{/*Home*/}
            <a href="#problem">Problem</a>{/*About the Problem*/}
            <a href="#solution">Solution</a>{/*About the Solution*/}
            <a href="#roi">ROI</a>{/*Find your ROI*/}
            <a href="#roi">Results</a>{/*Results*/}
            <a href="#who">Who are we?</a>{/*About CWI*/}
    </div>
    {/*       Navbar ended        */}

    </>
  )


}

const SoilData = ({fourCoords}) => {
  const [soilData, setSoilData] = useState(null)
  
  const fetchSoilData = async () => {
    if(!coordinates || coordinates.length < 4) {
      console.log("Coordinates not yet set")
      return;
    }
  }

}

const Map = () => {
  const [curLatLng, setCurLatLng] = useState('');
  const mapInstanceRef = useRef(null);

    useEffect(() => {

    if (mapInstanceRef.current) return;

    mapInstanceRef.current = true;

    const map = L.map('map').setView([36.773293, 240.051783], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var drawnItems = new L.featureGroup();
    map.addLayer(drawnItems);
    
    const drawControl = new L.Control.Draw({
      position: "topleft",
      edit: {
        featureGroup: drawnItems,
        remove: true
      },
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false
      }
    })
    map.addControl(drawControl)

    // implement layers (?), need to keep track of coords
    map.on("draw:created", function(e){
      var type = e.layerType;
      var layer = e.layer;
      console.log(e);
      drawnItems.addLayer(layer);

    });
    
    return(() => {
        map.remove();
        mapInstanceRef.current = null;
    });
    }, []);

  return(
    <>
        {/* <script 
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin="">            
        </script> */}
        <script 
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin="">            
        </script> 
        <div id="map"></div>
        latLng:{curLatLng}

    </>
  )
}


const Home = () => {


  // https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
  // Drawing polygon implementation

  
  // Polygon testing
  const [drawnPolygon, setDrawnPolygon] = useState(null)


  return (
    <>
      <div className="imgContainer">
        <img src="./src/assets/fresnoAg.jpg"/>
      
          <div className="imgCaption">
            <h1>California Water Institute</h1>
            <p>

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis mattis nunc. Phasellus at placerat augue. Sed ornare tellus blandit, volutpat mi a, faucibus sem. Cras dictum nulla eu convallis vestibulum. Aliquam erat volutpat. Vestibulum eu laoreet augue.
            </p>
          </div>
      </div>
    
      {/*     Image of selected navBar item                 */}
      {/*     Image of selected navBar item end             */}

      {/*     Boxes explaining each item in the navBar      */}

      <div className = "infoContainer" id ='problem'>
        <h1>Problem</h1>
        <p>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis mattis nunc. Phasellus at placerat augue. Sed ornare tellus blandit, volutpat mi a, faucibus sem. Cras dictum nulla eu convallis vestibulum. Aliquam erat volutpat. Vestibulum eu laoreet augue. Mauris ullamcorper lorem nisl, eget accumsan justo sagittis volutpat. Vestibulum aliquet tellus urna, et vestibulum erat consequat vitae. Nullam non bibendum arcu. Sed facilisis auctor lacus id tincidunt. Sed molestie efficitur luctus. Nam placerat sollicitudin volutpat. Sed tellus ligula, sagittis vel condimentum sed, convallis ut sapien.

        </p>
      </div>

      <div className = "infoContainer" id ='solution'>
        <h1>Our approach</h1>
        <p>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis mattis nunc. Phasellus at placerat augue. Sed ornare tellus blandit, volutpat mi a, faucibus sem. Cras dictum nulla eu convallis vestibulum. Aliquam erat volutpat. Vestibulum eu laoreet augue. Mauris ullamcorper lorem nisl, eget accumsan justo sagittis volutpat. Vestibulum aliquet tellus urna, et vestibulum erat consequat vitae. Nullam non bibendum arcu. Sed facilisis auctor lacus id tincidunt. Sed molestie efficitur luctus. Nam placerat sollicitudin volutpat. Sed tellus ligula, sagittis vel condimentum sed, convallis ut sapien.

        </p>
      </div>

      <div className = "infoContainer">

        <h1>Map</h1>
        <Map/>

      </div>

      <div className = "infoContainer" id ='roi'>
        <CalcROI />
      </div>


      <div className = "infoContainer" id ='who'>
        <h1>Who we are</h1>
        <p>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis mattis nunc. Phasellus at placerat augue. Sed ornare tellus blandit, volutpat mi a, faucibus sem. Cras dictum nulla eu convallis vestibulum. Aliquam erat volutpat. Vestibulum eu laoreet augue. Mauris ullamcorper lorem nisl, eget accumsan justo sagittis volutpat. Vestibulum aliquet tellus urna, et vestibulum erat consequat vitae. Nullam non bibendum arcu. Sed facilisis auctor lacus id tincidunt. Sed molestie efficitur luctus. Nam placerat sollicitudin volutpat. Sed tellus ligula, sagittis vel condimentum sed, convallis ut sapien.

        </p>
      </div>



      {/*     End of content boxes                          */}

    </>
  )
}

const PageFooter = () => {
  return (
    <>
         <div className="footContainer">
          <footer>
              <p>&copy; 2025 Nestor Garcia-Lujano</p>
          </footer>
         </div>
    </>
)
}

const CalcROI = () => {
  const [pondSizeAC, setPondSizeAC] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [slopeInside, setSlopeIn] = useState(0);
  const [slopeOutside, setSlopeOut] = useState(0);
  const [leveeTop, setLeveeTop] = useState(0);
  const [slopeAcrossPond, setSlopeAcPond] = useState(0);
  const [freeboard, setFreeboard] = useState(0);
  const [waterDepth, setWaterDepth] = useState(0);

  const [outsideLength, setOutsideLength] = useState(0);

  const [leveeCenter, setLeveeCenter] = useState(0);
  const [leveeInside, setLeveeInside] = useState(0);
  const [leveeOutside, setLeveeOutside] = useState(0);

      useEffect(() => {
      const value = (length * 2 + width * 2) / 4;
      setOutsideLength(value || 0); // 0 if empty
      }, [length, width]);


      useEffect(() => {
      const value = (length + width) * 2 * (freeboard + waterDepth) * leveeTop / 27;
      setLeveeCenter(value || 0); // 0 if empty
      }, [freeboard, waterDepth, leveeTop, length, width]);
  
      useEffect(() => {
      const value = (freeboard + waterDepth) * slopeInside * (freeboard + waterDepth) * (length + width) * 2/2/27;
      setLeveeInside(value || 0); // 0 if empty
      }, [freeboard, waterDepth, slopeInside, length, width]);
  
      useEffect(() => {
      const value = (freeboard + waterDepth) * slopeOutside * (freeboard + waterDepth) * (length + width) * 2 / 2 / 27;
      setLeveeOutside(value || 0); // 0 if empty
      }, [freeboard, waterDepth, slopeOutside, length, width]);


  const [lessOutsideLevee, setLessOutsideLevee] = useState(0);
  const [lessTop, setLessTop] = useState(0);
  const [lessInsideLevee, setLessInsideLevee] = useState(0);
  const [plusWettedInsideLevee, setPlusWettedInsideLevee] = useState(0)
  
      useEffect(() => {
      const value = (freeboard + waterDepth) * slopeOutside * 2;
      setLessOutsideLevee(value || 0); // 0 if empty
        }, [freeboard, waterDepth, slopeOutside]);
  
      useEffect(() => {
      const value = leveeTop * 2;
      setLessTop(value || 0); // 0 if empty
      }, [leveeTop]);
  
      useEffect(() => {
      const value = (freeboard + waterDepth) * slopeInside * 2;
      setLessInsideLevee(value || 0); // 0 if empty
      }, [freeboard, waterDepth, slopeInside]);
  
      useEffect(() => {
      const value = waterDepth * slopeInside * 2;
      setPlusWettedInsideLevee(value || 0); // 0 if empty
      }, [waterDepth, slopeInside]);
  
      
  const [netInsideLength, setNetInsideLength] = useState(0)
  const [wettedArea, setWettedArea] = useState(0)

      useEffect(() => {
      const value = outsideLength - (lessOutsideLevee + lessTop + lessInsideLevee) + plusWettedInsideLevee;
      setNetInsideLength(value || 0); // 0 if empty
      }, [outsideLength, lessOutsideLevee, lessTop, lessInsideLevee, plusWettedInsideLevee]);
  
      useEffect(() => {
      const value = ((outsideLength - (lessOutsideLevee + lessTop + lessInsideLevee) + plusWettedInsideLevee) * (outsideLength - (lessOutsideLevee + lessTop + lessInsideLevee) + plusWettedInsideLevee) / 9);
      setWettedArea(value || 0); // 0 if empty
      }, [outsideLength, lessOutsideLevee, lessTop, lessInsideLevee, plusWettedInsideLevee]);
  
  return (
  <>
    <div className="calcContainer">
      <h1>ROI Calculator</h1>

      <label>
        Pond(Acres): 
        <input
          type="text"
          inputMode="numeric"
          value={pondSizeAC}
          onChange={(e) => setPondSizeAC(parseFloat(e.target.value) || 0) } />
      </label>

      <label>
        Length(ft): 
          <input 
            type="text"
            inputMode="numeric"
            value={length} 
            onChange={(e) => setLength(parseFloat(e.target.value) || 0)}/>
      </label>

      <label>
      Width(ft): 
          <input 
            type="text"
            inputMode="numeric"
            value={width} 
            onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}/>
      </label>
      
      <label>
      Inside Slope: 
          <input 
            type="text"
            inputMode="numeric"
            value={slopeInside} 
            onChange={(e) => setSlopeIn(parseFloat(e.target.value) || 0)}/>
      </label>
      
      <label>
      Outside Slope: 
          <input 
            type="text"
            inputMode="numeric"
            value={slopeOutside} 
            onChange={(e) => setSlopeOut(parseFloat(e.target.value) || 0)}/>
      </label>

      <label>
      Top of levee(ft): 
          <input 
            type="text"
            inputMode="numeric"
            value={leveeTop} 
            onChange={(e) => setLeveeTop(parseFloat(e.target.value) || 0)}/>
      </label>
      
      <label>
      Slope across pond(ft): 
          <input 
            type="text"
            inputMode="numeric"
            value={slopeAcrossPond} 
            onChange={(e) => setSlopeAcPond(parseFloat(e.target.value) || 0)}/>
      </label>
      
      <label>
      Freeboard(ft): 
          <input 
            type="text"
            inputMode="numeric"
            value={freeboard} 
            onChange={(e) => setFreeboard(parseFloat(e.target.value) || 0)}/>
      </label>

      <label>
      Water depth(ft): 
          <input 
            type="text"
            inputMode="numeric"
            value={waterDepth} 
            onChange={(e) => setWaterDepth(parseFloat(e.target.value) || 0)}
          />
      </label>

      <label>
        Soil type:
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </label>


      
    </div>

    <div className='calcResults'>
      <h1>Results</h1>

      <div>
        <p>Area: {pondSizeAC / 640} mi²</p>
      </div>

      <div>
        <p>Perimeter: {length * 2 + width * 2} ft</p>
      </div>

      <h2>Volume of earthwork</h2>
      <div>
        <p>Center of levee: {leveeCenter.toFixed(2)} yds³</p>
      </div>

      <div>
        <p>Inside levee: {leveeInside.toFixed(2)} yds³</p>
      </div>
      
      <div>
        <p>Outside levee: {leveeOutside.toFixed(2)} yds³</p>
      </div>
      
      <div>
        <p>Total: {(leveeCenter + leveeInside + leveeOutside).toFixed(2)} yds³</p>
      </div>

      <div>
        <p>Cost: ${((leveeCenter + leveeInside + leveeOutside) * 12).toFixed(2)}</p> 
      </div>

      <h2>Wetted Area</h2>
      <div>
        <p>Outside length: {outsideLength} ft</p>
      </div>

      <div>
        <p>Less outside levee: {lessOutsideLevee} ft</p>
      </div>

      <div>
        <p>Less top: {lessTop} ft</p>
      </div>

      <div>
        <p>Less inside levee: {lessInsideLevee} ft</p>
      </div>

      <div>
        <p>Plus wetted inside levee: {plusWettedInsideLevee} ft</p>
      </div>

      <div>
        <p>Net inside length: {netInsideLength} ft</p>
      </div>

      <div>
        <p>Wetted area: { wettedArea.toFixed(3)} yds²</p>
      </div>

      <div>
        <p>{(wettedArea / 4840).toFixed(4)} Acres</p>
      </div>

     <div>
        <p>{( ((wettedArea / 4840) / pondSizeAC).toFixed(2) ) * 100 }% of gross Acres</p>
      </div>
    </div>

  </>
  )
}


function App() {
  const [count, setCount] = useState(0)


  return (
    <>

      <div className="bodyContainer">
        {/*<div className="blurryBackground"> </div> fix this*/} 
        {/* <NavHome /> */}
        {/* <Home /> */}
        {/* <NavROI /> */}
        {/* <CalcROI /> */}
        <PageLogo />
        <HeaderNavBar />

        <Home />

        <PageFooter />

      </div>
    </>
  )
}

export default App
