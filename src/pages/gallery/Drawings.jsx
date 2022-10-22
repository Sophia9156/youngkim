import "./style/gallery.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawingsListInit } from "redux/List";

export default function Drawings() {
  const dispatch = useDispatch();
  const { drawings } = useSelector(state => state.list);

  useEffect(() => {
    dispatch(drawingsListInit());
  }, [dispatch]);

  return (
    <main>
      <div className="gallery-container-grid">
        <ul className="drawings-list">
          {drawings.length > 0 && drawings.map(drawing => (
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