import "./style/gallery.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paintingsListInit } from "redux/List";

export default function Paintings() {
  const dispatch = useDispatch();
  const { loading, intro, paintings, paintingsOrder } = useSelector(state => state.list);
  const [isCaptionOpen, setCaptionOpen] = useState([]);
  
  useEffect(() => {
    dispatch(paintingsListInit());
  }, [dispatch]);

  // description 표시 토글
  useEffect(() => {
    if(paintings.length > 0) {
      let arr = [];
      paintings.forEach(painting => {
        arr.push({id: painting.id, isOpen: false});
      });
      setCaptionOpen(arr);
    }
  }, [loading, paintings]);

  const handleClick = (id) => {
    let arr = [];
    if(isCaptionOpen.find(el => el.id === id).isOpen === true) {
      paintings.forEach(painting => {
        arr.push({id: painting.id, isOpen: false});
      })
    } else {
      paintings.forEach(painting => {
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
        <div className="intro-container">
          {matchMedia("all and (max-width: 480px)").matches ? (
            <>
              {intro.image !== undefined && intro.image !== null && intro.image !== "" && (
                <figure className="intro-image">
                  <img src={intro.image} alt="intro" />
                </figure>
              )}
              {intro.title !== undefined && intro.title !== null && intro.title !== "" && (
                <h4 className="intro-title">{intro.title}</h4>
              )}
            </>
          ) : (
            <>
              {intro.title !== undefined && intro.title !== null && intro.title !== "" && (
                <h4 className="intro-title">{intro.title}</h4>
              )}
              {intro.image !== undefined && intro.image !== null && intro.image !== "" && (
                <figure className="intro-image">
                  <img src={intro.image} alt="intro" />
                </figure>
              )}
            </>
          )}
          {intro.description !== undefined && intro.description !== null && intro.description !== "" && (
            <p className="intro-description">
              {intro.description}
            </p>
          )}
        </div>
        <ul className="paintings-list">
          {paintings.length > 0 && paintingsOrder.length > 0 && isCaptionOpen.length > 0 && paintingsOrder.map(order => (
            <li key={paintings.find(painting => painting.id === order).id} className="paintings-list-item">
              <figure className="painting-image"
                onClick={() => handleClick(paintings.find(painting => painting.id === order).id)}
              >
                <img src={paintings.find(painting => painting.id === order).image} alt="painting" />
                {isCaptionOpen.find(el => el.id === paintings.find(painting => painting.id === order).id).isOpen && (
                  <figcaption className="painting-caption">
                    {paintings.find(painting => painting.id === order).description}
                  </figcaption>
                )}
              </figure>
              <h5 className="painting-title">{paintings.find(painting => painting.id === order).title}</h5>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}