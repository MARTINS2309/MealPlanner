/* eslint-disable no-undef */
const library = require("./booksdata");
const m = require("./booksmodel");

const catalog = library.catalog;

test("getBookById", () => {
  const id = "978-1779501127";

  const book = m.getBookById(catalog, id);

  expect(book.isbn).toBe(id);
});

test("getAuthorById", () => {
  const id = "alan-moore";

  const author = m.getAuthorById(catalog, id);

  expect(author.name).toBe("Alan Moore");
});
