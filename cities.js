var CitySchema = new SimpleSchema([
  SharedSchemas.LocationSchema,
  {
    searchName: {
      type: String
    },
    basePricePerView: {
      type: Number
    }
  },
])


Cities = new Mongo.Collection('cities')
Cities.attachSchema(CitySchema)
