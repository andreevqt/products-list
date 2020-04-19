import { Server, Model, belongsTo, hasMany, Serializer, Response } from "miragejs";
import { products, processors, categories, vendors } from "./data.js";
import { NAMESPACE } from "../constants/common";
import _ from "lodash";

const isRelation = (item, field) => {
  return item.associations.hasOwnProperty(field);
}

const getField = (item, field) => {
  return isRelation(item, field) ? item[field] : item.attrs[field];
}

const getFilter = ({
  table,
  name,
  label,
  type,
  mapFn = null,
  field = null,
  selected = [],
  position = "left",
}) => {
  let items = table
    .models;

  let fields = [];

  items.forEach(item => {
    fields.push(getField(item, field));
  });

  fields = _.uniqWith(fields, _.isEqual);
  fields = fields.map(rel => ({
    count: items.reduce((total, item) => _.isEqual(getField(item, field), rel) ? ++total : total, 0),
    ...(mapFn ? mapFn(rel) : rel), selected: false
  }));

  return {
    items: fields,
    name,
    label,
    type,
    position
  };
}

const getFilters = (table, category) => {
  const filters = [];
  const mapFn = item => ({
    name: item.attrs.name,
    value: _.kebabCase(item.attrs.name)
  });

  console.log(category);

  let categories = getFilter({
    name: "category",
    label: "Category",
    table,
    type: "checkbox_group",
    field: "category",
    position: "left",
    mapFn
  })

  filters.push(categories);

  if (category === 1) {
    let rams = getFilter({
      name: "ram",
      label: "Ram",
      table,
      type: "checkbox_group",
      field: "ram",
      position: "left",
      mapFn: ram => ({
        name: ram.toString(),
        value: ram,
      })
    });
    let vendors = getFilter({
      name: "vendors",
      label: "Vendors",
      table,
      field: "vendor",
      type: "checkbox_group",
      position: "left",
      mapFn
    });
    let processors = getFilter({
      name: "processors",
      label: "Processors",
      table,
      field: "processor",
      type: "checkbox_group",
      position: "left",
      mapFn
    });
    let price = getFilter({
      table,
      name: "price",
      label: "Price",
      field: "price",
      type: "range",
      position: "left",
      mapFn: (price) => ({
        name: price.toString(),
        value: price
      })
    })


    filters.push(processors);
    filters.push(rams);
    filters.push(vendors);
    filters.push(price);
  }

  return filters;
}

const ApplicationSerializer = Serializer.extend({
  embed: true
});

export function makeServer({ environment = "test" }) {
  return new Server({
    environment,
    serializers: {
      application: ApplicationSerializer,
      product: ApplicationSerializer.extend({
        include: ['processor', 'vendor'],
        serialize(resource, request) {
          const page = +request.queryParams.page;
          let category = request.queryParams.category;
          if (category) {
            category = this.schema
              .categories
              .where(category => category.name.toUpperCase() === request.queryParams.category.toUpperCase())
              .models[0]
          }
          console.log(category);
          const filters = page === 1 ? getFilters(resource, category && +category.id) : null;
          let items = Serializer
            .prototype
            .serialize
            .apply(this, [resource, request])
            .products;
          return {
            items,
            filters,
            currentPage: 1,
            totalPages: 1
          };
        },
      })
    },

    models: {
      product: Model.extend({
        processor: belongsTo("processor"),
        category: belongsTo("category"),
        vendor: belongsTo("vendor")
      }),

      processor: Model.extend({
        products: hasMany("product")
      }),

      category: Model.extend({
        products: hasMany("product")
      }),

      vendor: Model.extend({
        products: hasMany("product")
      })
    },

    routes() {
      this.namespace = NAMESPACE;

      this.get("/products", (schema, request) => {
        console.log(request.queryParams);
        let category = request.queryParams.category;
        if (category) {
          category = schema
            .categories
            .where(category => category.name.toUpperCase() === request.queryParams.category.toUpperCase())
            .models[0];
        }

        let query = request.queryParams.query;

        const getPredicate = (product) => {
          let predicate = true;
          if (typeof category !== "undefined") {
            predicate = predicate && product.categoryId === +category.id;
          }
          if (typeof query !== "undefined") {
            predicate = predicate && product.name.includes(query)
          }
          return predicate;
        }

        let products = schema
          .products

        return products.where(getPredicate);
      });
    },

    seeds(server) {
      for (let i = 0; i < processors.length; i++) {
        server.schema.processors.create(processors[i]);
      }

      for (let i = 0; i < vendors.length; i++) {
        server.schema.vendors.create(vendors[i]);
      }

      for (let i = 0; i < categories.length; i++) {
        server.schema.categories.create(categories[i]);
      }

      for (let i = 0; i < products.length; i++) {
        server.schema.products.create(products[i]);
      }
    }
  });
}