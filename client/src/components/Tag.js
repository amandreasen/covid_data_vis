import PropTypes from "prop-types";
import "components/Tag.scss";

const Tag = ({ children, placeholder, color }) => {
  return (
    <div
      className={`tag ${children ? "valued" : "empty"}`}
      style={{ "background-color": `${color}` }}
    >
      {children || placeholder}
    </div>
  );
};

Tag.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  color: PropTypes.string,
};

Tag.defaultProps = {
  children: null,
  placeholder: "",
  color: "#79E7BD",
};

export default Tag;
