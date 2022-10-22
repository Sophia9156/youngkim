import LoadingSpinner from "components/items/LoadingSpinner";
import TopBtn from "components/items/TopBtn";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function Home() {
  const { loading } = useSelector(state => state.list);
  return (
    <>
      <Outlet />
      <TopBtn />
      {loading && <LoadingSpinner />}
    </>
  )
}