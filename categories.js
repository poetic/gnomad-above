var CategorySchema = new SimpleSchema({
  code: { type: String },
  name: { type: String },
  backgroundImages: {
    type: [String],
    maxCount: 3,
    minCount: 3,
  },
})

Categories = new Mongo.Collection('categories')
Categories.attachSchema(CategorySchema)
