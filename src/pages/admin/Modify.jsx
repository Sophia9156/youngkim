import { useCallback, useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import "./style/modify.scss";
import { useDispatch, useSelector } from "react-redux";
import { contactInit, drawingsListInit, paintingsListInit, photoListInit } from "redux/List";
import toast from "react-hot-toast";
import AdminBar from "components/layout/admin-bar/AdminBar";
import Checkbox from "components/items/Checkbox";
import Button from "components/items/Button";
import Modal from "components/items/Modal";
import { deleteData } from "utils/firebase/database";

export default function Modify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, intro, paintings, drawings, photographs, contact } = useSelector(state => state.list);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState("painting");
  const [isConfirmedDelete, setConfirmedDelete] = useState(false);
  const [checkItems, setCheckItems] = useState([]);
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => searchParams.has("category") && setCategory(categoryParam), [categoryParam, searchParams]);

  // 데이터 불러오기
  const loadItems = useCallback(() => {
    category === "painting" && dispatch(paintingsListInit());
    category === "photograph" && dispatch(photoListInit());
    category === "drawing" && dispatch(drawingsListInit());
    category === "contact" && dispatch(contactInit());
  }, [category, dispatch]);
  useEffect(() => {
    loadItems();
    setCheckItems([]);
  }, [dispatch, category, loadItems]);

  // 체크박스 선택하기
  const handleCheck = (id) => {
    if (checkItems.includes(id)) {
      setCheckItems(prev => prev.filter(el => el !== id));
    } else {
      setCheckItems(prev => [...prev, id]);
    }
  }

  // 삭제하기
  const onSubmit = () => {
    if (checkItems.length > 0) {
      setConfirmedDelete(true);
    } else {
      toast.dismiss();
      toast.error("아이템을 선택해주세요.");
    }
  };
  const onDelete = async () => {
    setConfirmedDelete(false);
    if(isDeleting === false) {
      setDeleting(true);
      toast.dismiss();
      toast.loading("선택한 아이템을 삭제 중입니다.");
      try {
        for(let checkItem of checkItems) {
          await deleteData(checkItem);
        }
        setDeleting(false);
        toast.dismiss();
        toast.success("삭제를 완료했습니다.");
        loadItems();
      } catch (error) {
        setDeleting(false);
        toast.dismiss();
        toast.error("예기치 못한 이유로 삭제를 실패했습니다.");
      }
    }
  }

  return (
    <main>
      <AdminBar onSubmit={onSubmit} />
      {category === "painting" && !loading && (
        <div className="modify-container">
          <div className="intro-container">
            <p className="intro-title">
              Intro
            </p>
            {intro.image === undefined && intro.title === undefined && intro.description === undefined ? (
              <div className="no-item">
                <p className="no-item-title">인트로 없음</p>
                <Button type="button" color="black"
                  onClick={() => navigate({
                    pathname: "/admin-upload",
                    search: createSearchParams({
                      category: "painting"
                    }).toString()
                  })}
                >upload</Button>
              </div>
            ) : (
              <div className="modify-item-list no-margin">
                <div className="checkbox-wrapper">
                  <Checkbox id="intro" 
                    onChange={(e) => handleCheck("intro")}
                  />
                </div>
                <div className="image-wrapper">
                  {intro.image !== undefined && intro.image !== null && intro.image !== "" ? (
                    <img src={intro.image} alt="intro" />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="content-wrapper">
                  <div className="title-wrapper">
                    {intro.title !== undefined && intro.title !== null && intro.title !== "" && (
                      <p className="content-title">{intro.title}</p>
                    )}
                  </div>
                  <div className="description-wrapper">
                    {intro.description !== undefined && intro.description !== null && intro.description !== "" && (
                      <p className="content-description">{intro.description}</p>
                    )}
                  </div>
                </div>
                <div className="icon-wrapper">
                  <img src="/images/icon-more.svg" alt="more" />
                </div>
              </div>
            )}
          </div>
          <ul className="paintings-container">
            {paintings.length > 0 && paintings.map(painting => (
              <li key={painting.id} className="modify-item-list">
                <div className="checkbox-wrapper">
                  <Checkbox id={painting.id} 
                    onChange={() => handleCheck(`paintings/${painting.id}`)}
                  />
                </div>
                <div className="image-wrapper">
                  <img src={painting.image} alt="painting" />
                </div>
                <div className="content-wrapper">
                  <div className="title-wrapper">
                    <p className="content-title">{painting.title}</p>
                  </div>
                  <div className="description-wrapper">
                    {painting.description !== undefined && painting.description !== null && painting.description !== "" && (
                      <p className="content-description">{painting.description}</p>
                    )}
                  </div>
                </div>
                <div className="icon-wrapper">
                  <img src="/images/icon-more.svg" alt="more" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {category === "photograph" && !loading && (
        <ul className="modify-container grid">
          {photographs.length > 0 && photographs.map(photo => (
            <li key={photo.id} className="modify-item-grid">
              <img src={photo.image} alt="photograph" />
              <div className="checkbox-wrapper">
                <Checkbox id={photo.id} 
                  onChange={() => handleCheck(`photographs/${photo.id}`)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      {category === "drawing" && !loading && (
        <ul className="modify-container grid">
          {drawings.length > 0 && drawings.map(drawing => (
            <li key={drawing.id} className="modify-item-grid">
              <img src={drawing.image} alt="drawing" />
              <div className="checkbox-wrapper">
                <Checkbox id={drawing.id} 
                  onChange={() => handleCheck(`drawings/${drawing.id}`)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      {category === "contact" && !loading && (
        <div className="modify-container grid">
          {contact.image !== undefined && contact.image !== null ? (
            <div key="contact" className="modify-item-grid">
              <img src={contact.image} alt="drawing" />
              <div className="checkbox-wrapper">
                <Checkbox id="contact"
                  onChange={() => handleCheck("contact")}
                />
              </div>
            </div>
          ) : (
            <div className="no-item">
              <p className="no-item-title">contact 없음</p>
              <Button type="button" color="black"
                onClick={() => navigate({
                  pathname: "/admin-upload",
                  search: createSearchParams({
                    category: "contact"
                  }).toString()
                })}
              >upload</Button>
            </div>
          )}
        </div>
      )}
      {isConfirmedDelete && (
        <Modal 
          title="삭제 확인"
          description="선택한 항목을 정말로 삭제하시겠습니까?"
          twoButton={true}
          onCancel={() => setConfirmedDelete(false)}
          onConfirm={() => onDelete()}
        />
      )}
    </main>
  )
}