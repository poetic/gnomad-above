var ContentSchema = new SimpleSchema([SharedSchemas.CreatedAtSchema, {
  title: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  backgroundImage: {
    type: String,
    optional: true
  },
  channelId: {
    type: String
  },
  resourceId: {
    type: String
  },
  updatedAt: {
    type: Date
  },
}])

Contents = new Mongo.Collection('contents')
Contents.attachSchema(ContentSchema)
