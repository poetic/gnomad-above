var ClickSchema = new SimpleSchema([SharedSchemas.createdAt, {
  driverId: {
    type: String
  },
  campaignId: {
    type: String,
    optional: true
  }
}])

Clicks = new Mongo.Collection('clicks')
Clicks.attachSchema(ClickSchema)
