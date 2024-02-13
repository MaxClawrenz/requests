import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useGetLinks from "../hooks/useGetLinks";
import Header from "./Header";
import useGetForm from "../hooks/useGetForm";
import FormElement from "./FormElement";
import { Button } from "@mui/material";
import NameSkelet from "./Skeletons/NameSkelet";
import formObject from "../store/formObject";
import { observer } from "mobx-react-lite";
import ReactDOM from "react-dom";
import ResultWindow from "./ResultWindow";

function RequestForm() {
  const [docId, setDocId] = useState<string>("");
  const [formId, setFormId] = useState<string>("");
  const [formReset, setReset] = useState<boolean>(false);
  const location = useLocation();
  const randomMin = 100;
  const randomMax = 400;
  const buttonStyle = {
    backgroundColor: "#FBBB10",
    color: "#FFF",
    width: "180px",
    height: "45px",
    fontSize: "16px",
    marginTop: "20px",
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const pathArr = location.pathname.split("/");
    const id = pathArr[pathArr.length - 1];
    const formId = pathArr[pathArr.length - 3];
    setDocId(id);
    setFormId(formId);
    formObject.iRequestTypeID = formId;
  }, [location.pathname]);

  const { data, isLoading } = useGetLinks(docId);
  const { dataForm, isLoadingForm } = useGetForm(formId);
  const portalDiv = document.getElementById("requestlist_root_portal");

  function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (formRef.current && formRef.current.checkValidity()) {
      formObject.sendMyForm(event);
    }
  }

  return (
    <>
      <Header
        doc_name={data?.doc_name}
        parent_name={data?.parent_name}
        isLoading={isLoading}
        is_favourite={data?.is_favourite}
        docId={docId}
      />
      {isLoadingForm && (
        <>
          <NameSkelet
            width={Math.floor(
              Math.random() * (randomMax - randomMin) + randomMin
            )}
            height={48}
            mb={10}
            mr={0}
            mt={10}
          />
          <NameSkelet
            width={Math.floor(
              Math.random() * (randomMax - randomMin) + randomMin
            )}
            height={48}
            mb={10}
            mr={0}
            mt={10}
          />
          <NameSkelet
            width={Math.floor(
              Math.random() * (randomMax - randomMin) + randomMin
            )}
            height={48}
            mb={10}
            mr={0}
            mt={10}
          />
          <NameSkelet
            width={Math.floor(
              Math.random() * (randomMax - randomMin) + randomMin
            )}
            height={48}
            mb={10}
            mr={0}
            mt={10}
          />
        </>
      )}
      {!isLoadingForm && (
        <div className="obyazatelnoe_zapolnenie">
          <span className="zvezda"> * </span> Все поля обязательны для
          заполнения
        </div>
      )}
      <form ref={formRef} className="requestForm">
        {!isLoadingForm &&
          dataForm &&
          dataForm.map((element) => (
            <>
              <FormElement
                key={element.name}
                name={element.name}
                title={element.title}
                type={element.type}
                is_required={element.is_required}
                entries={element.entries}
                formReset={formReset}
                setReset={setReset}
              />
            </>
          ))}
        {!isLoadingForm && (
          <div className="obyazatelnoe_zapolnenie">
            <span className="zvezda"> * </span> Все поля обязательны для
            заполнения
          </div>
        )}
        {!isLoadingForm && (
          <Button
            type="submit"
            onClick={handleSubmit}
            style={buttonStyle}
            variant="contained"
            disabled={formObject.loading}
          >
            Отправить
          </Button>
        )}
        {formObject.successSubmit &&
          portalDiv &&
          ReactDOM.createPortal(
            <ResultWindow setReset={setReset} formRef={formRef} />,
            portalDiv
          )}
      </form>
    </>
  );
}

export default observer(RequestForm);
