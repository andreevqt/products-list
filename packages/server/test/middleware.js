const chai = require("chai");
const should = chai.should();
const sinon = require("sinon");
const { extractProps, getProp } = require("../src/middleware/extractProps");

describe("extractProps", () => {
  let req;
  let next;

  beforeEach(() => {
    req = {
      query: {}
    };
    next = sinon.fake();
  })

  it("Should be a function", () => {
    extractProps.should.be.a("function");
  })

  it("Should call next() once", () => {
    extractProps({}, {}, next);
    next.callCount.should.be.eql(1);
  })

  it("Should extract props", () => {
    req.query = {
      a: 1,
      b: 2,
      "props.c": 3,
      "props.d": 3,
    };

    extractProps(req, {}, next);

    req.query.props.should.be.not.empty;
    req.query.props.should.be.eql({
      c: [3],
      d: [3]
    });

    req.query = {
      a: 1,
      b: 2,
      "props.c": [3, 3],
    };

    extractProps(req, {}, next);

    req.query.props.should.be.not.empty;
    req.query.props.should.be.eql({
      c: [3, 3],
    });
  })
})

describe("getProp", () => {
  it("Should return null if wrong argument", () => {
    let res = getProp("");
    should.equal(res, null);

    res = getProp("sdsdsdprops.cpu");
    should.equal(res, null)
  })

  it("Should extract prop", () => {
    const res = getProp("props.cpu");
    res.should.be.eql("cpu");
  })
})

