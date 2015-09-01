var TimeLogsSchema = new SimpleSchema({
  driverId:  { type: String },
  startTime: { type: Date },
  endTime:   { type: Date },
  riders:    {
    type: Number,
    label: 'number of rides',
    custom: function () {
      // must be positive
      var isInteger = typeof this.value === 'number' &&
        Math.floor(this.value) === this.value

      var isPositiveInteger = isInteger && this.value > 0

      if (!isPositiveInteger) {
        return 'required'
      }
    },
  },
  // TODO: make this a decimal and make sure it is less then two digit after period
  earnings:  { type: Number,  decimal: false },
})

TimeLogs = new Mongo.Collection('timeLogs')
TimeLogs.attachSchema(TimeLogsSchema)
