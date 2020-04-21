const regex = /^props\.(.+)$/i;
const _ = require("lodash");

const extractProps = (req, res, next) => {
  const query = req.query;
  if (!query) {
    return next();
  }

  const props = {};

  for (const param in query) {
    const prop = getProp(param);
    if (prop) {
      const value = query[param];
      props[prop] = Array.isArray(value) ? value : [value];
    }
  }

  query.props = !_.isEmpty(props) ? props : null;
  next();
};

const getProp = (arg) => {
  const matched = arg.match(regex);
  return matched ? matched[1] : null;
}

module.exports = {
  extractProps,
  getProp
};