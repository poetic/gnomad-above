var ClickSchema = new SimpleSchema([SharedSchemas.CreatedAtSchema, {
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
