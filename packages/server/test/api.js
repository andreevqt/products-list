const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../src/index");
const { Product, Category } = require("../src/models");
const data = require("../src/scripts/data").test;
const seed = require("../src/scripts/seed");

chai.use(chaiHttp);

before(async () => {
  await seed(data);
});

describe("Products", () => {
  let product = null;
  let laptops = null;
  let pcs = null;

  before(async () => {
    product = await Product.findOne();
    laptops = await Category.findOne({ name: "laptops" });
    pcs = await Category.findOne({ name: "PC" });
  });

  it("should respone with status ok", (done) => {
    chai.request(server)
      .get("/api/products")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  });

  it("should have proper response structure", (done) => {
    chai.request(server)
      .get("/api/products")
      .end((err, res) => {
        const { body } = res;
        body.should.be.an("object");
        body.should.haveOwnProperty("items");
        body.should.haveOwnProperty("currentPage");
        body.should.haveOwnProperty("totalPages");
        body.should.haveOwnProperty("errors");
        body.should.haveOwnProperty("total");
        body.items[0].should.haveOwnProperty("id");
        done();
      });
  });

  it("should filter products by name", (done) => {
    const query = "Notebook Odyssey";
    chai.request(server)
      .get("/api/products")
      .query({ query })
      .end((err, res) => {
        const { body } = res;
        const { total } = body;
        body.items.length.should.be.eql(1);
        const product = body.items[0];
        product.name.should.match(new RegExp(query, "i"));
        total.should.be.eql(1);
        done();
      });
  });

  it("should limit products", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({ limit: 2 })
      .end((err, res) => {
        const { items, total } = res.body;
        items.length.should.be.eql(2);
        total.should.be.eql(9);
        done();
      });
  });

  it("should return correct page", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({ limit: 6, page: 2 })
      .end((err, res) => {
        const { items, currentPage } = res.body;
        currentPage.should.be.eql(2);
        items.length.should.be.eql(3);
        done();
      });
  });

  it("should return an error if there are incorrect query params", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({ limit: 20, page: 30 })
      .end((err, res) => {
        const { items, currentPage, errors } = res.body;
        res.should.have.status(400);
        errors.should.be.an("array");
        errors.length.should.be.eql(1);
        done();
      });
  })

  it("should have items with categories", (done) => {
    chai.request(server)
      .get("/api/products")
      .end((err, res) => {
        const { items } = res.body;
        const { category } = items[0];
        category.should.be.an("object");
        category.should.haveOwnProperty("name");
        category.should.haveOwnProperty("id");
        done();
      })
  })

  it("should filter products by category", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({
        category: pcs._id.toString()
      })
      .end((err, res) => {
        const body = res.body;
        const { items } = body;
        items.length.should.be.eql(1);
        done();
      });
  });

  it("should filter products by categories", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({
        category: [
          pcs._id.toString(),
          laptops._id.toString()
        ]
      })
      .end((err, res) => {
        const body = res.body;
        const { total } = body;
        total.should.be.eql(9);
        done();
      });
  });

  it("should filter laptops by ram", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({
        category: "laptops",
        ram: "16"
      })
      .end((err, res) => {
        const body = res.body;
        const { items } = body;
        items.length.should.be.eql(1);
        done();
      });
  })

  it("should filter laptops by processors", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({
        category: "laptops",
        processor: "Qualcomm® Snapdragon™ 8cx",
      })
      .end((err, res) => {
        const body = res.body;
        const { items } = body;
        items.length.should.be.eql(1);
        done();
      });
  })

  it("should filter laptops by processors and ram", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({
        category: "laptops",
        processor: "Qualcomm® Snapdragon™ 8cx",
      })
      .end((err, res) => {
        const body = res.body;
        const { items } = body;
        items.length.should.be.eql(1);
        done();
      });
  })

  it("should return filters", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({
        category: "laptops"
      })
      .end((err, res) => {
        const body = res.body;
        //console.log(body);
        const { items, filters } = body;
        items[0].category.name.should.match(/laptops/i);
        filters.should.be.an("array");
        const rams = filters.find(filter => filter.name === "ram");
        const processors = filters.find(filter => filter.name === "processor");
        const categories = filters.find(filter => filter.name === "categories");
        rams.should.be.an("object");
        processors.should.be.an("object");
        categories.should.be.an("object");
        categories.items.length.should.be.eql(1);
        processors.items.length.should.be.eql(3);
        rams.items.length.should.be.eql(3);
        rams.items.should.deep.include.members([
          { value: "16", total: 1 },
          { value: "8", total: 6 },
          { value: "4", total: 1 },
        ]);
        processors.items.should.deep.include.members([
          { value: "Intel Core i7", total: 6 },
          { value: "Qualcomm® Snapdragon™ 8cx", total: 1 },
          { value: "Intel Core i6", total: 1 },
        ]);
        /* categories.items.should.deep.include.members([
          { value: "laptops", total}

        ]) */
        done();
      });
  });

  it("should not return filters if page > 1", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({
        category: "laptops",
        page: 2
      })
      .end((err, res) => {
        const body = res.body;
        body.should.not.haveOwnProperty("filters");
        done();
      });
  });

  it("should return correct total count for categories", (done) => {
    chai.request(server)
      .get("/api/products")
      .end((err, res) => {
        const categories = res.body.filters.find(filter => filter.name === "categories");
        categories.should.be.an("object");
        categories.items.length.should.be.eql(2);

        const pc = categories.items.find(category => category.name === "PC");
        const laptops = categories.items.find(category => category.name === "laptops");

        pc.total.should.be.eql(1);
        laptops.total.should.be.eql(8);
        done();
      })
  })

  it("should return an error if category does not exists", (done) => {
    chai.request(server)
      .get("/api/products")
      .query({
        category: "babecafe"
      })
      .end((err, res) => {
        const { errors } = res.body;
        res.should.have.status(400);
        errors.should.be.an("array");
        errors.should.be.not.empty;
        done();
      })
  })

  it("should return product by id", (done) => {
    chai.request(server)
      .get(`/api/products/${product.id}`)
      .end((err, res) => {
        const item = res.body;
        item.id.should.be.eql(product.id);
        done();
      })
  })

  it("should have product properties", (done) => {
    chai.request(server)
      .get(`/api/products/${product.id}`)
      .end((err, res) => {
        const item = res.body;
        item.properties.should.be.an("array");
        item.properties.should.be.not.empty;
        done();
      })
  })

  it("should return an error if there is wrong product id", (done) => {
    chai.request(server)
      .get("/api/products/123")
      .end((err, res) => {
        const { errors } = res.body;
        errors.should.be.an("array");
        errors.length.should.be.eql(1);
        done();
      })
  })
});

describe("Categories", () => {
  let category = null;

  before(async () => {
    category = await Category.findOne();
  })

  it("should respone with status ok", (done) => {
    chai.request(server)
      .get("/api/categories")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  });

  it("should return all categories", (done) => {
    chai.request(server)
      .get("/api/categories")
      .end((err, res) => {
        const { body } = res;
        body.items.should.be.an("array");
        body.items.length.should.be.eql(3);
        done();
      })
  });

  it("should filter categories by name", (done) => {
    chai.request(server)
      .get("/api/categories")
      .query({
        query: "pc"
      })
      .end((err, res) => {
        const { body } = res;
        body.items.should.be.an("array");
        body.items.length.should.be.eql(2);
        done();
      });
  });

  it("should return category by id", (done) => {
    chai.request(server)
      .get(`/api/categories/${category.id}`)
      .end((err, res) => {
        const item = res.body;
        item.id.should.be.eql(category.id);
        done();
      });
  });

  it("should return an error if there is wrong category id", (done) => {
    chai.request(server)
      .get("/api/categories/123")
      .end((err, res) => {
        const { errors } = res.body;
        errors.should.be.an("array");
        errors.length.should.be.eql(1);
        done();
      });
  });
})
