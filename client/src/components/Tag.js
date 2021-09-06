import PropTypes from "prop-types";
import "components/Tag.scss";

const Tag = ({ children, placeholder }) => {
  return (
    <span className={`tag ${children ? "valued" : "empty"}`}>
      {children || placeholder}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
};

Tag.defaultProps = {
  children: null,
  placeholder: "",
};

export default Tag;
