import { useEffect, useState } from "react";
import useGetLinks from "../hooks/useGetLinks";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import NameSkelet from "./Skeletons/NameSkelet";

function Main() {
  const [docId, setDocId] = useState<string>("");
  const location = useLocation();
  const randomMin = 50;
  const randomMax = 400;

  useEffect(() => {
    const pathArr = location.pathname.split("/");
    const id = pathArr[pathArr.length - 1];
    setDocId(id);
  }, [location.pathname]);

  const { data, isLoading } = useGetLinks(docId);
  return (
    <>
      <Header
        doc_name={data?.doc_name}
        parent_name={data?.parent_name}
        isLoading={isLoading}
      />
      {data?.categories && data.categories.length > 0 && !isLoading && (
        <div className="requests_list">Выбор разделов</div>
      )}
      <div className="catRequestsList">
        {!isLoading &&
          data?.categories.map((element) => (
            <Link
              key={element.id}
              to={`/_wt/new_requests/doc_id/${element.id}`}
            >
              <div className="request_from_list_cat_div">{element.name}</div>
            </Link>
          ))}
      </div>
      {data?.requests && data.requests.length > 0 && !isLoading && (
        <div className="requests_list_title">Заполнение заявок</div>
      )}
      <div className="requestsList">
        {!isLoading &&
          data?.requests.map((element) => (
            <Link
              className="request_from_list"
              to={`/${element.template.replace(
                "request_create/request_type_id",
                "request_form"
              )}`}
            >
              <div className="request_from_list_div" key={element.id}>
                {element.name}
              </div>
            </Link>
          ))}
      </div>
      {isLoading && (
        <>
          <NameSkelet
            width={Math.floor(
              Math.random() * (randomMax - randomMin) + randomMin
            )}
            height={40}
            mb={6}
            mr={0}
            mt={5}
          />
          <NameSkelet
            width={Math.floor(
              Math.random() * (randomMax - randomMin) + randomMin
            )}
            height={40}
            mb={6}
            mr={0}
            mt={5}
          />
          <NameSkelet
            width={Math.floor(
              Math.random() * (randomMax - randomMin) + randomMin
            )}
            height={40}
            mb={6}
            mr={0}
            mt={5}
          />
          <NameSkelet
            width={Math.floor(
              Math.random() * (randomMax - randomMin) + randomMin
            )}
            height={40}
            mb={6}
            mr={0}
            mt={5}
          />
          <NameSkelet
            width={Math.floor(
              Math.random() * (randomMax - randomMin) + randomMin
            )}
            height={40}
            mb={6}
            mr={0}
            mt={5}
          />
        </>
      )}
    </>
  );
}

export default Main;
