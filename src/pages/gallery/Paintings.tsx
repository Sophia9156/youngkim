import "./style/gallery.scss";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { paintingsListInit } from "store/List";

const Paintings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, intro, paintings } = useAppSelector((state) => state.list);
  const [isCaptionOpen, setCaptionOpen] = useState<
    { id: React.Key; isOpen: boolean }[]
  >([]);

  useEffect(() => {
    dispatch(paintingsListInit());
  }, [dispatch]);

  // description 표시 토글
  useEffect(() => {
    if (paintings.length > 0) {
      let arr: { id: React.Key; isOpen: boolean }[] = [];
      paintings.forEach((painting) => {
        arr.push({ id: painting.id, isOpen: false });
      });
      setCaptionOpen(arr);
    }
  }, [loading, paintings]);

  const handleClick = useCallback(
    (id: React.Key) => {
      let arr: { id: React.Key; isOpen: boolean }[] = [];
      if (isCaptionOpen.find((el) => el.id === id)?.isOpen === true) {
        paintings.forEach((painting) => {
          arr.push({ id: painting.id, isOpen: false });
        });
      } else {
        paintings.forEach((painting) => {
          if (painting.id === id) {
            arr.push({ id: painting.id, isOpen: true });
          } else {
            arr.push({ id: painting.id, isOpen: false });
          }
        });
      }
      setCaptionOpen(arr);
    },
    [isCaptionOpen, paintings]
  );

  return (
    <main>
      <div className="gallery-container-list">
        <div className="intro-container">
          {matchMedia("all and (max-width: 480px)").matches ? (
            <>
              {intro &&
                intro.image !== undefined &&
                intro.image !== null &&
                intro.image !== "" && (
                  <figure className="intro-image">
                    <img
                      src={intro.image}
                      alt="intro"
                    />
                  </figure>
                )}
              {intro &&
                intro.title !== undefined &&
                intro.title !== null &&
                intro.title !== "" && (
                  <h4 className="intro-title">{intro.title}</h4>
                )}
            </>
          ) : (
            <>
              {intro &&
                intro.title !== undefined &&
                intro.title !== null &&
                intro.title !== "" && (
                  <h4 className="intro-title">{intro.title}</h4>
                )}
              {intro &&
                intro.image !== undefined &&
                intro.image !== null &&
                intro.image !== "" && (
                  <figure className="intro-image">
                    <img
                      src={intro.image}
                      alt="intro"
                    />
                  </figure>
                )}
            </>
          )}
          {intro &&
            intro.description !== undefined &&
            intro.description !== null &&
            intro.description !== "" && (
              <p className="intro-description">{intro.description}</p>
            )}
        </div>
        <ul className="paintings-list">
          {paintings.length > 0 &&
            isCaptionOpen.length > 0 &&
            paintings.map((painting) => (
              <li
                key={painting.id}
                className="paintings-list-item">
                <figure
                  className="painting-image"
                  onClick={() => handleClick(painting.id)}>
                  <img
                    src={painting.image}
                    alt="painting"
                  />
                  {isCaptionOpen.find((el) => el.id === painting.id)
                    ?.isOpen && (
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
  );
};

export default Paintings;
