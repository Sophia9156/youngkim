import "./style/gallery.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { drawingsListInit } from "store/List";

const Drawings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { drawings } = useAppSelector((state) => state.list);

  useEffect(() => {
    dispatch(drawingsListInit());
  }, [dispatch]);

  return (
    <main>
      <div className="gallery-container-grid">
        <ul className="drawings-list">
          {drawings.length > 0 &&
            drawings.map((drawing) => (
              <li
                key={drawing.id}
                className="drawings-list-item">
                <figure className="drawing-image">
                  <img
                    src={drawing.image}
                    alt="drawing"
                  />
                </figure>
              </li>
            ))}
          <li className="drawings-list-item"></li>
        </ul>
      </div>
    </main>
  );
};

export default Drawings;
