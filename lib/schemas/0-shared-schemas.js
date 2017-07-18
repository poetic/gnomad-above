SimpleSchema.messages({
  lonOutOfRange: '[label] longitude should be between -90 and 90',
  latOutOfRange: '[label] latitude should be between -180 and 180',
})

var CreatedAtSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  }
})

var UpdatedAtSchema = new SimpleSchema({
  updatedAt: {
    type: Date,
    autoValue: function() {
      return new Date()
    },
  }
})

var PointSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['Point']
  },
  coordinates: {
    type: [Number],
    decimal: true,
    minCount: 2,
    maxCount: 2,
    custom: function () {
      lon = this.value[0]
      lat = this.value[1]

      if(lon <= -180 || lon >= 180) {
        return "latOutOfRange"
      }
      if(lat <= -90 || lat >= 90) {
        return "lonOutOfRange"
      }
    }
  },
})

// NOTE: currently we removed the option in geolocation
// index: '2dsphere'
// becuase simple schema try to create a duplicated index int meteor 1.5.1
// in the future if we move to another server, we may need to migrate
// the data and the index
var GeolocationSchema = new SimpleSchema({
  geolocation: {
    type: PointSchema,
  },
})

var LocationSchema = new SimpleSchema([
  GeolocationSchema,
  {
    name: {
      type: String,
    },
    timezone: {
      type: String,
    }
  }
])

SharedSchemas = {
  CreatedAtSchema:   CreatedAtSchema,
  UpdatedAtSchema:   UpdatedAtSchema,
  GeolocationSchema: GeolocationSchema,
  LocationSchema:    LocationSchema,
}
