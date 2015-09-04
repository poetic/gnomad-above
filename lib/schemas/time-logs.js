var TimeLogsSchema = new SimpleSchema({
  driverId:  { type: String },
  startTime: { type: Date },
  endTime:   { type: Date },
  riders:    {
    type: Number,
    label: 'number of rides',
    min: 1
  },
  earnings:  { type: Number,  decimal: false },
})

TimeLogs = new Mongo.Collection('timeLogs')
TimeLogs.attachSchema(TimeLogsSchema)
