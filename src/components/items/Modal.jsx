import styled from "styled-components";
import Button from "components/items/Button";

export default function Modal({
  title,
  description,
  twoButton,
  buttonText1,
  buttonText2,
  onCancel,
  onConfirm,
}) {
  return (
    <ModalContainer>
      <div className="modal">
        <h5>{title}</h5>
        <p>{description}</p>
        {twoButton ? (
          <ul className="btn-list">
            <li className="btn-item">
              <Button type="button" color="grey"
                onClick={onCancel}
              >{buttonText2 ? buttonText2 : "취소"}</Button>
            </li>
            <li className="btn-item">
              <Button type="button" color="black"
                onClick={onConfirm}
              >{buttonText1 ? buttonText1 : "확인"}</Button>
            </li>
          </ul>
        ) : (
          <div className="btn-wrap">
            <Button type="button" color="black"
              onClick={onConfirm}
            >{buttonText1 ? buttonText1 : "확인"}</Button>
          </div>
        )}
      </div>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0; top: 0;
  z-index: 999;
  background-color: #0C0C0EB2;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal{
    width: 344px;
    height: 383px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    h5{
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 15px;
      line-height: 19px;
    }
    p{
      width: 80%;
      margin-bottom: 66px;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      color: ${({theme}) => theme.color.grey};
      text-align: center;
      word-break: keep-all;
    }
    .btn-list{
      display: flex;
      justify-content: center;
      align-items: center;
      .btn-item{
        margin-right: 16px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
`;