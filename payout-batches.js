var PayoutItemSchema = new SimpleSchema({
  senderItemId: {
    type: String
  },
  payoutItemId: {
    type: String,
    optional: true
  },
  // timeLog payment status should be the same value as this status
  status: {
    type: String,
    allowedValues: Meteor.settings.public.PAYMENT_STATUS_ALLOWED_VALUES,
    defaultValue: 'UNPAIED'
  },
  timeLogIds: {
    type: [String]
  }
})

var PayoutBatchSchema = new SimpleSchema({
  senderBatchId: {
    type: String
  },
  payoutBatchId: {
    type: String
  },
  status: {
    type: String,
    allowedValues: Meteor.settings.public.BATCH_PAYMENT_STATUS_ALLOWED_VALUES,
    defaultValue: 'PENDING'
  },
  timeLogIds: {
    type: [String]
  },
  items: {
    type: [PayoutItemSchema]
  },
  createAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  }
})

PayoutBatches = new Mongo.Collection('payoutBatches')
PayoutBatches.attachSchema(PayoutBatchSchema)
