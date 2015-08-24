var ChannelSchema = new SimpleSchema({
  code:         { type: String }, // internal id for gnomad (unique)
  type:         { type: String, allowedValues: ['read', 'listen', 'watch'] },
  apiCode:      { type: String, }, // E.G. 'youtube'
  apiId:        { type: String, }, // E.G. 'FoxSports' youtube channel id
  cities:       { type: [String], defaultValue: [] },
  categoryCode: { type: String, }
})

Channels = new Mongo.Collection('channels')
Channels.attachSchema(ChannelSchema)
