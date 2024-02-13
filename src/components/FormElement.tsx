import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { IFormProps } from "../types/IFormProps";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { observer } from "mobx-react-lite";
import formObject from "../store/formObject";
import axios, { AxiosResponse } from "axios";

function FormElement(props: IFormProps) {
  let boxValues: string[] = [];
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
  const [fileName, setFileName] = useState<string>("");
  const [fileLoading, setFileLoading] = useState<boolean>(false);

  useEffect(() => {
    formObject.updateMyForm(props.name, null);
  }, []);

  useEffect(() => {
    if (props.formReset === true) setFileName("");
  }, [props.formReset]);

  function handleChange(event: SelectChangeEvent<string>) {
    setSelectValue(event.target.value);
    handleFormChange(event.target.name, event.target.value);
  }

  function handleFormChange(name: string, value: string | number) {
    formObject.updateMyForm(name, value);
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.target.checked
      ? boxValues.push(event.target.value)
      : (boxValues = boxValues.filter(
          (element) => element !== event.target.value
        ));

    formObject.updateMyForm(event.target.name, boxValues.join(";"));
  }

  function handleCheckboxSoloChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    formObject.updateMyForm(event.target.name, event.target.checked);
  }

  function imageLoad(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      formObject.loading = true;
      //formObject.imageLoading = true;
      setFileLoading(true);
      const data = new FormData();
      data.append("storyImage", event.target.files[0]);
      props.setReset(false);
      axios
        .post(
          "/custom_web_template.html?object_code=image_upload_react",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res: AxiosResponse) => {
          formObject.updateMyForm(event.target.name, res.data.split("=")[1]);
          formObject.loading = false;
          //formObject.imageLoading = false;
          setFileLoading(false);
          if (event.target.files) setFileName(event.target.files[0].name);
        });
    } else {
      formObject.updateMyForm(event.target.name, "");
    }
  }

  // const VisuallyHiddenInput = styled("input")({
  //   clip: "rect(0 0 0 0)",
  //   clipPath: "inset(50%)",
  //   height: 1,
  //   overflow: "hidden",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   whiteSpace: "nowrap",
  //   width: 1,
  // });

  return (
    <>
      {props.type === "string" && (
        <TextField
          name={props.name}
          id={props.name}
          className="requestFormElement"
          required={props.is_required}
          label={props.title}
          onChange={(event) =>
            handleFormChange(event.target.name, event.target.value)
          }
        />
      )}
      {props.type === "combo" && (
        <FormControl fullWidth>
          <InputLabel id={props.name} required={props.is_required}>
            {props.title}
          </InputLabel>
          <Select
            name={props.name}
            labelId={props.name}
            className="requestFormElement"
            required={props.is_required}
            value={selectValue}
            onChange={handleChange}
            label={props.title}
          >
            {props.entries.entry.map((element) => (
              <MenuItem key={element.value} value={element.value}>
                {element.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {props.type === "text" && (
        <TextField
          name={props.name}
          id={props.name}
          className="requestFormElement"
          label={props.title}
          multiline
          rows={4}
          required={props.is_required}
          onChange={(event) =>
            handleFormChange(event.target.name, event.target.value)
          }
        />
      )}
      {props.type === "file" && (
        <>
          <InputLabel>
            {props.title}
            {props.is_required && (
              <span
                aria-hidden="true"
                className="MuiFormLabel-asterisk MuiInputLabel-asterisk"
              >
                 *
              </span>
            )}
          </InputLabel>
          <div className="fileInput">
            <Button
              sx={{ bgcolor: "#0091d5", color: "#fff" }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              htmlFor={props.name}
            >
              Выберите файл
              {/* <VisuallyHiddenInput
                required={props.is_required}
                name={props.name}
                id={props.name}
                type="file"
                onChange={imageLoad}
              /> */}
            </Button>
            <input
              type="file"
              name={props.name}
              id={props.name}
              onChange={imageLoad}
              required={props.is_required}
              style={{ display: "none" }}
            />
            {fileLoading && <CircularProgress size={30} />}
            {!fileLoading && fileName && (
              <span className="fileName">{fileName}</span>
            )}
          </div>
        </>
      )}
      {props.type === "list" && (
        <>
          <InputLabel required={props.is_required}>{props.title}</InputLabel>
          <FormGroup>
            {props.entries.entry.map((element) => (
              <FormControlLabel
                control={
                  <Checkbox
                    value={element.value}
                    name={props.name}
                    onChange={handleCheckboxChange}
                  />
                }
                label={element.value}
              />
            ))}
          </FormGroup>
        </>
      )}
      {props.type === "bool" && (
        <FormControlLabel
          required={props.is_required}
          control={
            <Checkbox name={props.name} onChange={handleCheckboxSoloChange} />
          }
          label={props.title}
          name={props.name}
          id={props.name}
        />
      )}
      {props.type === "heading" && <div className="heading">{props.title}</div>}
      {props.type !== "file" &&
        props.type !== "text" &&
        props.type !== "combo" &&
        props.type !== "list" &&
        props.type !== "bool" &&
        props.type !== "heading" &&
        props.type !== "string" && (
          <div>{`Необработанный элемент формы ${props.type}-${props.type}`}</div>
        )}
    </>
  );
}

export default observer(FormElement);
