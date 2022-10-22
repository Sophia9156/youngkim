import json from "../../data.json";
import "./style/gallery.scss";
import { useEffect, useState } from "react";

export default function Drawings() {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    setDrawings(json.drawings);
  }, []);

  return (
    <main>
      <div className="gallery-container-grid">
        <ul className="drawings-list">
          {drawings.map(drawing => (
            <li key={drawing.id} className="drawings-list-item">
              <figure className="drawing-image">
                <img src={drawing.image} alt="drawing" />
              </figure>
            </li>
          ))}
          <li className="drawings-list-item"></li>
        </ul>
      </div>
    </main>
  )
}