var ImpressionSchema = new SimpleSchema([SharedSchemas.CreatedAtSchema, {
  driverId: {
    type: String
  },
  campaignId: {
    type: String
  },
}])

Impressions = new Mongo.Collection('impressions')
Impressions.attachSchema(ImpressionSchema)
