import { Link, useNavigate } from "react-router-dom";
import IconBack from "./IconBack";
import { IHeader } from "../types/IHeader";
import NameSkelet from "./Skeletons/NameSkelet";

function Header(props: IHeader) {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }
  return (
    <>
      <div className="requestsHeader">
        <div className="headerLeft">
          <div onClick={goBack} className="iconBack">
            <IconBack />
          </div>
          {props.isLoading ? (
            <NameSkelet width={170} height={29} mb={0} mt={0} mr={0} />
          ) : (
            <div className="docname">{props.parent_name}</div>
          )}
        </div>
        <div className="headerRight">
          <Link
            className="allRequestsLink"
            to="/_wt/references_request_new"
            rel="noopener noreferrer"
          >
            Все заявки
          </Link>
        </div>
      </div>
      {props.isLoading ? (
        <NameSkelet width={200} height={20} mb={25} mt={20} mr={0} />
      ) : (
        <div className="subHeader">{props.doc_name}</div>
      )}
    </>
  );
}

export default Header;
