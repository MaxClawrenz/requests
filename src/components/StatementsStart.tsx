import { Link } from "react-router-dom";
import Statements from "../icons/statements";
import Appeals from "../icons/appeals";

function StatementsStart() {
  return (
    <>
      <div id="zayavkiIT">Обращения клиентов</div>
      <div className="statements-body">
        <Link to="/_wt/new_requests/doc_id/6951253464127506995">
          <div className="link-block">
            <Statements />
            <div className="text_IT">Заявления</div>
          </div>
        </Link>
        <Link to="/_wt/new_requests/doc_id/6950618131085409980">
          <div className="link-block">
            <Appeals />
            <div className="text_IT">Обращения</div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default StatementsStart;
