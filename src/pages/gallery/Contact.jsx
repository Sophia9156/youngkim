import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactInit } from "redux/List";
import "./style/contact.scss";

export default function Contact() {
  const dispatch = useDispatch();
  const { loading, contact } = useSelector(state => state.list);

  useEffect(() => {
    dispatch(contactInit());
  }, [dispatch]);

  return (
    <main>
      <div className="contact-container">
        {contact.image && !loading && (
          <img src={contact.image} alt="contact" />
        )}
      </div>
    </main>
  )
}