import PropTypes from "prop-types";
import "components/Tag.scss";

const Tag = ({ children, placeholder }) => {
  return (
    <div className={`tag ${children ? "valued" : "empty"}`}>
      {children || placeholder}
    </div>
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
