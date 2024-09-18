import { createSearchParams, useNavigate } from "react-router-dom";
import "./modify.scss";
import useHooks from "./index.hooks";
import AdminBar from "components/layout/admin-bar/AdminBar";
import Checkbox from "components/items/Checkbox";
import Button from "components/items/Button";
import Modal from "components/items/Modal";

const Modify: React.FC = () => {
  const navigate = useNavigate();
  const {
    category,
    loading,
    intro,
    paintings,
    drawings,
    photographs,
    contact,
    isIntroMoreOpen,
    isMoreOpen,
    isConfirmedDelete,
    setIntroMoreOpen,
    handleCheck,
    onSubmit,
    onConfirmDelete,
    onCancelDelete,
    onDelete,
    resetMoreOpen,
    handleMoreOpen,
  } = useHooks();

  return (
    <main
      onClick={() => {
        setIntroMoreOpen(false);
        resetMoreOpen();
      }}>
      <AdminBar onSubmit={onSubmit} />
      {category === "painting" && !loading && (
        <div className="modify-container">
          <div className="intro-container">
            <p className="intro-title">Intro</p>
            {intro?.image === undefined &&
            intro?.title === undefined &&
            intro?.description === undefined ? (
              <div className="no-item">
                <p className="no-item-title">인트로 없음</p>
                <Button
                  type="button"
                  color="black"
                  onClick={() =>
                    navigate({
                      pathname: "/admin-upload",
                      search: createSearchParams({
                        category: "painting",
                      }).toString(),
                    })
                  }>
                  upload
                </Button>
              </div>
            ) : (
              <div className="modify-item-list no-margin">
                <div className="checkbox-wrapper">
                  <Checkbox
                    id="intro"
                    onChange={(e) =>
                      handleCheck({ db: "intro", storage: intro.imagePath })
                    }
                  />
                </div>
                <div className="image-wrapper">
                  {intro.image !== undefined &&
                  intro.image !== null &&
                  intro.image !== "" ? (
                    <img
                      src={intro.image}
                      alt="intro"
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="content-wrapper">
                  <div className="title-wrapper">
                    {intro.title !== undefined &&
                      intro.title !== null &&
                      intro.title !== "" && (
                        <p className="content-title">{intro.title}</p>
                      )}
                  </div>
                  <div className="description-wrapper">
                    {intro.description !== undefined &&
                      intro.description !== null &&
                      intro.description !== "" && (
                        <p className="content-description">
                          {intro.description}
                        </p>
                      )}
                  </div>
                </div>
                <div className="icon-wrapper">
                  <img
                    src="/images/icon-more.svg"
                    alt="more"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIntroMoreOpen((prev) => !prev);
                    }}
                  />
                </div>
                {isIntroMoreOpen && (
                  <ul className="more-wrapper">
                    <li
                      className="more-item"
                      onClick={() => navigate("/admin-modify/intro")}>
                      텍스트 수정하기
                    </li>
                    <li
                      className="more-item delete"
                      onClick={() =>
                        onConfirmDelete({
                          db: "intro",
                          storage: intro.imagePath,
                        })
                      }>
                      삭제하기
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          <ul className="paintings-container">
            {paintings.length > 0 ? (
              paintings.map((painting) => (
                <li
                  key={painting.id}
                  className="modify-item-list">
                  <div className="checkbox-wrapper">
                    <Checkbox
                      id={painting.id}
                      onChange={() =>
                        handleCheck({
                          db: `paintings/${painting.id}`,
                          storage: painting.imagePath,
                          id: painting.id,
                        })
                      }
                    />
                  </div>
                  <div className="image-wrapper">
                    <img
                      src={painting.image}
                      alt="painting"
                    />
                  </div>
                  <div className="content-wrapper">
                    <div className="title-wrapper">
                      <p className="content-title">{painting.title}</p>
                    </div>
                    <div className="description-wrapper">
                      {painting.description !== undefined &&
                        painting.description !== null &&
                        painting.description !== "" && (
                          <p className="content-description">
                            {painting.description}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="icon-wrapper">
                    <img
                      src="/images/icon-more.svg"
                      alt="more"
                      onClick={(e) => handleMoreOpen(e, painting.id)}
                    />
                  </div>
                  {isMoreOpen.length > 0 &&
                    isMoreOpen.find((el) => el.id === painting.id)?.open && (
                      <ul className="more-wrapper">
                        <li
                          className="more-item"
                          onClick={() =>
                            navigate(`/admin-modify/${painting.id}`)
                          }>
                          텍스트 수정하기
                        </li>
                        <li
                          className="more-item delete"
                          onClick={() =>
                            onConfirmDelete({
                              db: `paintings/${painting.id}`,
                              storage: painting.imagePath,
                              id: painting.id,
                            })
                          }>
                          삭제하기
                        </li>
                      </ul>
                    )}
                </li>
              ))
            ) : (
              <li className="no-item">
                <p className="no-item-title">painting 없음</p>
                <Button
                  type="button"
                  color="black"
                  onClick={() =>
                    navigate({
                      pathname: "/admin-upload",
                      search: createSearchParams({
                        category: "painting",
                      }).toString(),
                    })
                  }>
                  upload
                </Button>
              </li>
            )}
          </ul>
        </div>
      )}
      {category === "photograph" && !loading && (
        <ul className="modify-container grid">
          {photographs.length > 0 ? (
            photographs.map((photo) => (
              <li
                key={photo.id}
                className="modify-item-grid">
                <img
                  src={photo.image}
                  alt="photograph"
                />
                <div className="checkbox-wrapper">
                  <Checkbox
                    id={photo.id}
                    onChange={() =>
                      handleCheck({
                        db: `photographs/${photo.id}`,
                        storage: photo.imagePath,
                      })
                    }
                  />
                </div>
              </li>
            ))
          ) : (
            <li className="no-item">
              <p className="no-item-title">photograph 없음</p>
              <Button
                type="button"
                color="black"
                onClick={() =>
                  navigate({
                    pathname: "/admin-upload",
                    search: createSearchParams({
                      category: "photograph",
                    }).toString(),
                  })
                }>
                upload
              </Button>
            </li>
          )}
        </ul>
      )}
      {category === "drawing" && !loading && (
        <ul className="modify-container grid">
          {drawings.length > 0 ? (
            drawings.map((drawing) => (
              <li
                key={drawing.id}
                className="modify-item-grid">
                <img
                  src={drawing.image}
                  alt="drawing"
                />
                <div className="checkbox-wrapper">
                  <Checkbox
                    id={drawing.id}
                    onChange={() =>
                      handleCheck({
                        db: `drawings/${drawing.id}`,
                        storage: drawing.imagePath,
                      })
                    }
                  />
                </div>
              </li>
            ))
          ) : (
            <li className="no-item">
              <p className="no-item-title">drawing 없음</p>
              <Button
                type="button"
                color="black"
                onClick={() =>
                  navigate({
                    pathname: "/admin-upload",
                    search: createSearchParams({
                      category: "drawing",
                    }).toString(),
                  })
                }>
                upload
              </Button>
            </li>
          )}
        </ul>
      )}
      {category === "contact" && !loading && (
        <div className="modify-container grid">
          {contact?.image !== undefined && contact.image !== null ? (
            <>
              <div
                key="contact"
                className="modify-item-grid">
                <img
                  src={contact.image}
                  alt="drawing"
                />
                <div className="checkbox-wrapper">
                  <Checkbox
                    id="contact"
                    onChange={() =>
                      handleCheck({ db: "contact", storage: contact.imagePath })
                    }
                  />
                </div>
              </div>
              <div
                key="add"
                className="modify-item-grid no-line center">
                <Button
                  type="button"
                  onClick={() =>
                    navigate({
                      pathname: "/admin-upload",
                      search: createSearchParams({
                        category: "contact",
                      }).toString(),
                    })
                  }>
                  수정하기
                </Button>
              </div>
            </>
          ) : (
            <div className="no-item">
              <p className="no-item-title">contact 없음</p>
              <Button
                type="button"
                color="black"
                onClick={() =>
                  navigate({
                    pathname: "/admin-upload",
                    search: createSearchParams({
                      category: "contact",
                    }).toString(),
                  })
                }>
                upload
              </Button>
            </div>
          )}
        </div>
      )}
      {isConfirmedDelete && (
        <Modal
          title="삭제 확인"
          description="선택한 항목을 정말로 삭제하시겠습니까?"
          twoButton={true}
          onCancel={() => onCancelDelete()}
          onConfirm={() => onDelete()}
        />
      )}
    </main>
  );
};

export default Modify;
