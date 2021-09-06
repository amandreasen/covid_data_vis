import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({ icon, onClick, disabled, text }) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {text}
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string,
};

IconButton.defaultProps = {
  disabled: false,
  text: "",
};

export default IconButton;
