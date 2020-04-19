const Schema = require("mongoose").Schema;

function createSchema(props) {
  const instance = new Schema(props, {
    versionKey: false
  });

  instance.query.random = function () {
    const that = this;
    return countDocuments()
      .then(function (count) {
        var rand = Math.floor(Math.random() * count);
        return that.findOne()
          .skip(rand);
      });
  };

  instance.query.filterByName = function (name) {
    return this.find({ name: new RegExp(name, "i") });
  }

  instance.statics.paginate = async function (query = {}, { page = 1, limit = 8, populate }) {
    const mQuery = this.find(query);

    if (populate) {
      mQuery.populate(populate);
    }

    const total = await this.countDocuments(query);
    if (total < limit * (page - 1)) {
      throw Error("Incorrect page or limit");
    }

    const offset = (page * limit) - limit;
    const items = await mQuery.skip(offset).limit(limit);

    return {
      items,
      total,
      currentPage: page,
      totalPages: Math.floor(total / limit) + 1,
      errors: []
    }
  }

  instance.virtual("id").get(function () {
    return this._id.toHexString();
  })

  instance.set("toJSON", {
    virtuals: true,
    getters: false,
    transform: function (doc, ret) {
      delete ret._id;
    }
  })

  // relations to populate
  instance.statics.with = []

  return instance;
}

module.exports = {
  createSchema
};