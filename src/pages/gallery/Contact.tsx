import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useStore";
import { contactInit } from "store/List";
import "./style/contact.scss";

const Contact: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, contact } = useAppSelector((state) => state.list);

  useEffect(() => {
    dispatch(contactInit());
  }, [dispatch]);

  return (
    <main>
      <div className="contact-container">
        {contact && contact.image && !loading && (
          <img
            src={contact.image}
            alt="contact"
          />
        )}
      </div>
    </main>
  );
};

export default Contact;
