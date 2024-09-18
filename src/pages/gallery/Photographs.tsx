import "./style/gallery.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { photoListInit } from "store/List";

const Photographs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { photographs } = useAppSelector((state) => state.list);

  useEffect(() => {
    dispatch(photoListInit());
  }, [dispatch]);

  return (
    <main>
      <div className="gallery-container-list">
        <ul className="photographs-list">
          {photographs.length > 0 &&
            photographs.map((photograph) => (
              <li
                key={photograph.id}
                className="photographs-list-item">
                <figure className="photograph-image">
                  <img
                    src={photograph.image}
                    alt="photograph"
                  />
                </figure>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
};

export default Photographs;
