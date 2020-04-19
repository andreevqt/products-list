const test = {
  categories: {
    "PC": {
      parentName: "laptops and PCs",
      filters: [{
        name: "processor",
        label: "processor",
        type: "checkbox_group",
      }, {
        name: "ram",
        label: "ram",
        type: "checkbox_group",
      }]
    },
    "laptops": {
      parentName: "laptops and PCs",
      filters: [{
        name: "processor",
        label: "processor",
        type: "checkbox_group",
      }, {
        name: "ram",
        label: "ram",
        type: "checkbox_group",
      }]
    },
    "laptops and PCs": {
      parentName: null,
      filters: []
    }
  },

  vendors: {
    "Samsung": {
    }
  },

  ram: [{
    id: 1,
    value: 4,
    unit: "gb"
  }, {
    id: 2,
    value: 8,
    unit: "gb"
  }, {
    id: 3,
    value: 16,
    unit: "gb"
  }],

  products: {
    "Galaxy Book S, 256GB, Mercury Gray (Verizon)": {
      category: "laptops",
      price: 899,
      processor: "Intel Core i7",
      properties: [{
        name: "ram",
        value: "8",
      }, {
        name: "processor",
        value: "Intel Core i7"
      }]
    },
    "Galaxy Book S, 256GB, Mercury Gray (Sprint)": {
      category: "laptops",
      price: 899,
      properties: [{
        name: "ram",
        value: "8",
      }, {
        name: "processor",
        value: "Intel Core i7"
      }]
    },
    "Notebook 7 Force 15.6” (NVIDIA)": {
      category: "laptops",
      price: 899,
      properties: [{
        name: "ram",
        value: "4",
      }, {
        name: "processor",
        value: "Intel Core i6"
      }]
    },
    "Notebook 7 13.3” (Core i7/8GB)": {
      category: "laptops",
      price: 999,
      properties: [{
        name: "ram",
        value: "8",
      }, {
        name: "processor",
        value: "Intel Core i7"
      }]
    },
    "Notebook 7 13.3” (Core i7/16GB)": {
      category: "laptops",
      price: 1300,
      properties: [{
        name: "ram",
        value: "8",
      }, {
        name: "processor",
        value: "Intel Core i7"
      }]
    },
    "Notebook 7 15.6” (Core i7/8GB)": {
      category: "laptops",
      price: 1400,
      properties: [{
        name: "ram",
        value: "16",
      }, {
        name: "processor",
        value: "Intel Core i7"
      }]
    },
    "Notebook 7 15.6” (Core i7/16GB)": {
      category: "laptops",
      processor: "Intel Core i7",
      price: 999,
      properties: [{
        name: "ram",
        value: "8",
      }, {
        name: "processor",
        value: "Intel Core i7"
      }]
    },
    "Notebook Odyssey (9750H/GTX1650)": {
      category: "laptops",
      price: 1000,
      properties: [{
        name: "ram",
        value: "8",
      }, {
        name: "processor",
        value: "Qualcomm® Snapdragon™ 8cx"
      }]
    },
    "MSI Trident 3 9SH-443RU": {
      category: "PC",
      processor: "Intel Core i7",
      price: 2000,
      properties: [{
        name: "ram",
        value: "64",
      }, {
        name: "processor",
        value: "Intel Core i7"
      }]
    }
  },

  processors: {
    "Qualcomm® Snapdragon™ 8cx": {
      frequency: 2.84
    },
    "Intel Core i7": {
      frequency: 4.8
    },
    "Intel Core i6": {
      frequency: 4.8
    }
  }
}

module.exports = {
 test
}