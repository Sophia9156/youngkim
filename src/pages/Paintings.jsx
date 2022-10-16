import json from "../data.json";
import "./style/gallery.scss";
import { useEffect, useState } from "react";

export default function Paintings() {
  const [intro, setIntro] = useState({});
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    setIntro(json.intro);
    setPaintings(json.paintings);
  }, []);

  return (
    <main>
      <div className="gallery-container-list">
        {/* <div className="intro-container">
          {matchMedia("all and (max-width: 480px)").matches ? (
            <>
              <figure className="intro-image">
                <img src={intro.image} alt="intro" />
              </figure>
              <h4 className="intro-title">{intro.title}</h4>
            </>
          ) : (
            <>
              <h4 className="intro-title">{intro.title}</h4>
              <figure className="intro-image">
                <img src={intro.image} alt="intro" />
              </figure>
            </>
          )}
          <p className="intro-description">
            {intro.description}
          </p>
        </div> */}
        <ul className="paintings-list">
          {paintings.map(painting => (
            <li key={painting.id} className="paintings-list-item">
              <figure className="painting-image">
                <img src={painting.image} alt="painting" />
              </figure>
              <h5 className="painting-title">{painting.title}</h5>
              <p className="painting-description">
                {painting.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}