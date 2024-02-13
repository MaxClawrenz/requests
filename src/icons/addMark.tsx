import axios from "axios";
import UseAnimations from "react-useanimations";
import bookmark from "react-useanimations/lib/bookmark";

function AddMark({
  isFav,
  docId,
}: {
  isFav: boolean | undefined;
  docId: string | undefined;
}) {
  function handleFav() {
    axios.get(
      "/custom_web_template.html?object_code=eqvanta_requests_subscribe_ajax&_value=" +
        docId
    );
  }

  return (
    <UseAnimations
      strokeColor="#fbbb11"
      fillColor="#fbbb11"
      animation={bookmark}
      size={32}
      reverse={isFav}
      className="mark"
      onClick={handleFav}
    />
  );
}

export default AddMark;
