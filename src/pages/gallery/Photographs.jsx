import "./style/gallery.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { photoListInit } from "redux/List";

export default function Photographs() {
  const dispatch = useDispatch();
  const { photographs } = useSelector(state => state.list);

  useEffect(() => {
    dispatch(photoListInit());
  }, [dispatch]);

  return (
    <main>
      <div className="gallery-container-list">
        <ul className="photographs-list">
          {photographs.length > 0 && photographs.map(photograph => (
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