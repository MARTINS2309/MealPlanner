const library = require("./booksdata");
const booksmodel = require("./booksmodel");

test("getBookById", () => {
  const catalog = library.catalog;
  const id = "978-1779501127";

  const book = booksmodel.getBookById(catalog, id);

  expect(book.isbn).toBe(id);
});

test("getAuthorById", () => {
  const catalog = library.catalog;
  const id = "alan-moore";

  const author = booksmodel.getAuthorById(catalog, id);

  expect(author.name).toBe("Alan Moore");
});
