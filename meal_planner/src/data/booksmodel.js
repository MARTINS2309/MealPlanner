/* eslint-disable no-undef */
import fp from "lodash/fp.js";
const _ = fp.convert({
  cap: false,
  curry: false,
  fixed: false,
  immutable: true,
  rearg: false,
});

// This is a model for the books data
//The data is an hash map of catelog and user management

var getBookById = (catelog, id) => {
  return _.get(catelog, ["booksByIsbn", id]);
};

var getAuthorById = (catelog, id) => {
  return _.get(catelog, ["authorsById", id]);
};

module.exports = {
  getBookById,
  getAuthorById,
};
