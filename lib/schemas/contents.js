var ContentSchema = new SimpleSchema([
  SharedSchemas.CreatedAtSchema,
  SharedSchemas.UpdatedAtSchema,
  {
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
  }
])

Contents = new Mongo.Collection('contents')
Contents.attachSchema(ContentSchema)
