import json from "../data.json";
import "./style/gallery.scss";
import { useEffect, useState } from "react";

export default function Photographs() {
  const [photographs, setPhotographs] = useState([]);

  useEffect(() => {
    setPhotographs(json.photographs);
  }, []);

  return (
    <main>
      <div className="gallery-container-list">
        <ul className="photographs-list">
          {photographs.map(photograph => (
            <li key={photograph.id} className="photographs-list-item">
              <figure className="photograph-image">
                <img src={photograph.image} alt="photograph" />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}