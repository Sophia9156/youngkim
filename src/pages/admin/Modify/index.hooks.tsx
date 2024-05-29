import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import {
  contactInit,
  drawingsListInit,
  paintingsListInit,
  photoListInit,
} from "store/List";
import toast from "react-hot-toast";
import { deleteData, writeData } from "utils/firebase/database";
import { deleteToStorage } from "utils/firebase/storage";

interface ICheckItem {
  db: CategoryUnion | string;
  storage: string;
  id?: React.Key;
}

const useModify = () => {
  const dispatch = useAppDispatch();
  const {
    loading,
    intro,
    paintings,
    drawings,
    photographs,
    contact,
    paintingsOrder,
  } = useAppSelector((state) => state.list);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState("painting");
  const [isConfirmedDelete, setConfirmedDelete] = useState(false);
  const [checkItems, setCheckItems] = useState<ICheckItem[]>([]);
  const [isDeleting, setDeleting] = useState(false);
  const [isMoreOpen, setMoreOpen] = useState<
    { id: React.Key; open: boolean }[]
  >([]);
  const [isIntroMoreOpen, setIntroMoreOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<ICheckItem | "">("");

  useEffect(() => {
    searchParams.has("category") &&
      setCategory(searchParams.get("category") as string);
  }, [categoryParam, searchParams]);

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
  const handleCheck = useCallback(
    (item: ICheckItem) => {
      if (checkItems.includes(item)) {
        setCheckItems((prev) => prev.filter((el) => el !== item));
      } else {
        setCheckItems((prev) => [...prev, item]);
      }
    },
    [checkItems]
  );

  // 삭제하기 확인
  const onSubmit = useCallback(() => {
    if (checkItems.length > 0) {
      setConfirmedDelete(true);
    } else {
      toast.dismiss();
      toast.error("아이템을 선택해주세요.");
    }
  }, [checkItems.length]);

  // 삭제하기
  const onConfirmDelete = (deleteItem: {
    db: string;
    storage: string;
    id?: React.Key;
  }) => {
    setConfirmedDelete(true);
    setDeleteItem(deleteItem);
  };

  const onCancelDelete = useCallback(() => {
    setConfirmedDelete(false);
    deleteItem !== "" && setDeleteItem("");
  }, [deleteItem]);

  const onDelete = async () => {
    setConfirmedDelete(false);
    if (isDeleting === false) {
      setDeleting(true);
      toast.dismiss();
      toast.loading("선택한 아이템을 삭제 중입니다.");
      if (deleteItem === "") {
        try {
          for (let checkItem of checkItems) {
            await deleteData(checkItem.db);
            if (checkItem.db === "intro") {
              if (intro?.image !== null && intro?.image !== "")
                await deleteToStorage(checkItem.storage);
            } else {
              await deleteToStorage(checkItem.storage);
              if (category === "painting") {
                let newOrder = paintingsOrder.filter(
                  (el) => el !== checkItem.id
                );
                await writeData("paintingsOrder", newOrder);
              }
            }
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
      } else {
        try {
          await deleteData(deleteItem.db);
          if (deleteItem.db === "intro") {
            if (intro?.image !== null && intro?.image !== "")
              await deleteToStorage(deleteItem.storage);
          } else {
            await deleteToStorage(deleteItem.storage);
            if (category === "painting") {
              let newOrder = paintingsOrder.filter(
                (el) => el !== deleteItem.id
              );
              await writeData("paintingsOrder", newOrder);
            }
          }
          setDeleting(false);
          setDeleteItem("");
          toast.dismiss();
          toast.success("삭제를 완료했습니다.");
          loadItems();
        } catch (error) {
          setDeleting(false);
          setDeleteItem("");
          toast.dismiss();
          toast.error("예기치 못한 이유로 삭제를 실패했습니다.");
        }
      }
    }
  };

  // 더보기 열기/닫기
  const resetMoreOpen = useCallback(() => {
    let moreOpenArr: { id: React.Key; open: boolean }[] = [];
    if (paintings.length > 0) {
      paintings.forEach((el) => moreOpenArr.push({ id: el.id, open: false }));
      setMoreOpen(moreOpenArr);
    }
  }, [paintings]);

  useEffect(() => {
    resetMoreOpen();
  }, [paintings, resetMoreOpen]);

  const handleMoreOpen = (e: React.MouseEvent, id: React.Key) => {
    e.stopPropagation();
    let moreOpenArr: { id: React.Key; open: boolean }[] = [];
    if (isMoreOpen.find((el) => el.id === id)?.open === false) {
      paintings.forEach((el) => {
        if (el.id === id) {
          moreOpenArr.push({ id: el.id, open: true });
        } else {
          moreOpenArr.push({ id: el.id, open: false });
        }
      });
    } else {
      paintings.forEach((el) => moreOpenArr.push({ id: el.id, open: false }));
    }
    setMoreOpen(moreOpenArr);
  };

  return {
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
  };
};

export default useModify;
