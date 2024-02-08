import { Dispatch, SetStateAction } from "react";
import formObject from "../store/formObject";

function ResultWindow({
  formRef,
  setReset,
}: {
  formRef: React.RefObject<HTMLFormElement>;
  setReset: Dispatch<SetStateAction<boolean>>;
}) {
  function closeForm() {
    const mask = document.getElementById("get_report_mask");
    if (mask) mask.style.display = "none";
    formObject.successSubmit = false;
    if (formRef.current) formRef.current.reset();
    setReset(true);
  }

  return (
    <div className="resultWindow">
      <div className="resultTitle">Спасибо!</div>
      <div className="resultText">Твоя заявка отправлена в ServiceDesk!</div>
      <img
        width="92"
        height="92"
        className="iconSendMail"
        src="/eqvatoria/img/mail_icon.webp"
        alt=""
      />
      <div className="resultClose" onClick={closeForm}>
        Закрыть
      </div>
    </div>
  );
}

export default ResultWindow;
