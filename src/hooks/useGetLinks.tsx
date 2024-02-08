import axios from "axios";
import { useEffect, useState } from "react";
import { IData } from "../types/IData";

function useGetLinks(id: string) {
  const [data, setData] = useState<IData>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          setLoading(true);
          await axios(
            "/custom_web_template.html?object_code=new_request_back",
            {
              params: { id: id },
            }
          ).then((data) => setData(data.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { data, isLoading };
}

export default useGetLinks;
