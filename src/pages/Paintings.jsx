import json from "../data.json";
import "./style/gallery.scss";
import { useEffect, useState } from "react";

export default function Paintings() {
  const [intro, setIntro] = useState({});
  const [paintings, setPaintings] = useState([]);
  const [isCaptionOpen, setCaptionOpen] = useState([]);

  useEffect(() => {
    setIntro(json.intro);
    setPaintings(json.paintings);
    let arr = [];
    json.paintings.forEach(painting => {
      arr.push({id: painting.id, isOpen: false});
    });
    setCaptionOpen(arr);
  }, []);

  const handleClick = (id) => {
    let arr = [];
    if(isCaptionOpen.find(el => el.id === id).isOpen === true) {
      json.paintings.forEach(painting => {
        arr.push({id: painting.id, isOpen: false});
      })
    } else {
      json.paintings.forEach(painting => {
        if(painting.id === id) {
          arr.push({id: painting.id, isOpen: true});
        } else {
          arr.push({id: painting.id, isOpen: false});
        }
      })
    }
    setCaptionOpen(arr);
  }

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
              <figure className="painting-image"
                onClick={() => handleClick(painting.id)}
              >
                <img src={painting.image} alt="painting" />
                {isCaptionOpen.find(el => el.id === painting.id).isOpen && (
                  <figcaption className="painting-caption">
                    {painting.description}
                  </figcaption>
                )}
              </figure>
              <h5 className="painting-title">{painting.title}</h5>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}