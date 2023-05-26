import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import PropTypes from "prop-types";

const FormatText = ({ placeholder, value, setValue }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      language: "es",
      placeholder: placeholder || "Contenido",
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

FormatText.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default FormatText;
