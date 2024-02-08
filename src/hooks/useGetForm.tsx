import axios from "axios";
import { useEffect, useState } from "react";
import { IFormProps } from "../types/IFormProps";

function useGetForm(id: string) {
  const [dataForm, setDataForm] = useState<IFormProps[]>([]);
  const [isLoadingForm, setLoadingForm] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          setLoadingForm(true);
          await axios(
            "/custom_web_template.html?object_code=request_form_back",
            {
              params: { id: id },
            }
          ).then((data) => setDataForm(data.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingForm(false);
      }
    }
    fetchData();
  }, [id]);

  return { dataForm, isLoadingForm };
}

export default useGetForm;
