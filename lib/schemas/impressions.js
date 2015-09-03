var ImpressionSchema = new SimpleSchema({
  driverId: {
    type: String
  },
  campaignId: {
    type: String
  },
  time: {
    type: Date
  }
})

Impressions = new Mongo.Collection('impressions')
Impressions.attachSchema(ImpressionSchema)
