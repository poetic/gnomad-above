var hasAutoForm = Package['aldeed:autoform']

var ClickSchema = new SimpleSchema({
  date: {
    type: Date
  },
  driverId: {
    type: String
  }
})

var VideoSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['youtube', 'vimeo'],
    label: 'Video Type',
  },
  id: {
    type: String,
    label: 'Video Id',
  }
})

var CampaignSchema = new SimpleSchema({
  advertiserId: {
    type: String
  },
  name: {
    type: String,
    label: 'NAME YOUR CAMPAIGN'
  },
  type: {
    type: String,
    allowedValues: Constant.campaignTypes,
  },
  timezone: _.extend(
    {
      type: String,
      allowedValues: Constant.campaignTimezoneNames,
    },
    hasAutoForm ? {autoform: { options: Constant.campaignTimezoneOptions }} : {}
  ),
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  startTime: {
    // minutes offset
    type:    Number,
    decimal: false
  },
  endTime: {
    // minutes offset
    type:    Number,
    decimal: false
  },
  cityId: {
    type: String,
    label: 'CITY'
  },
  areaIds: {
    type:     [String],
    minCount: 1
  },
  viewsPerHour: {
    // temporary for views
    type: Number,
    decimal: false,
    optional: true
  },
  views: {
    type: Number,
    decimal: false
  },
  costPerView: {
    type: Number,
    decimal: true
  },
  costTotal: {
    type: Number,
    decimal: true
  },
  categoryCodes: {
    type:     [String],
    minCount: 1
  },
  approved: {
    type: Boolean,
    defaultValue: false
  },
  finished: {
    type: Boolean,
    defaultValue: false
  },
  video: {
    type: VideoSchema,
    optional: true,
    custom: function () {
      var isVideo = this.field('type').value === 'video'
      if (isVideo && !this.value) {
        return 'required'
      }
    },
  },
  webpage: {
    type: String,
    optional: true,
    custom: function () {
      var isCustom = this.field('type').value === 'custom'
      var isValid  = /https?:\/\//.test(this.value)
      if (isCustom && !isValid) {
        return 'urlFormat'
      }
    },
  },
  pictures: {
    type: [String],
    custom: function() {
      if(!_.isArray(this.value)) {
        return 'required'
      }

      var isEditorial = this.field('type').value === 'editorial'

      if(isEditorial) {
        if(this.value.length !== 3) {
          return 'threePictures'
        }
      } else {
        if(this.value.length !== 1) {
          return 'onePicture'
        }
      }
    }
  },
  "pictures.$": hasAutoForm ? {
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        accept: 'image/*'
      }
    }
  } : {},
  clicks: {
    type: [ClickSchema],
    defaultValue: []
  },
  impressionsCount: {
    type: Number
  }
})

CampaignSchema.messages({
  'expectedConstructor startTime': '[label] must be a time',
  'expectedConstructor endTime':   '[label] must be a time',
  'onePicture':                    'You must provide one picture.',
  'threePictures':                 'You must provide three pictures.',
  'urlFormat':                     'EXAMPLE: http://www.example.com/advertisement'
})

Campaigns = new Mongo.Collection('campaigns')
Campaigns.attachSchema(CampaignSchema)
