var CitySchema = new SimpleSchema([
  SharedSchemas.LocationSchema,
  {
    searchName: {
      label: 'State and City',
      type: String
    },
    basePricePerView: {
      type: Number
    }
  },
])


Cities = new Mongo.Collection('cities')
Cities.attachSchema(CitySchema)
