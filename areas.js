var AreaSchema = new SimpleSchema([
  SharedSchemas.LocationSchema,
  {
    cityId: {
      type: String,
    }
  }
])

Areas = new Mongo.Collection('areas')
Areas.attachSchema(AreaSchema)

if(Meteor.isServer) {
  Areas._ensureIndex({geolocation: "2dsphere"})
}
