var hasAutoForm = Package['aldeed:autoform']

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
    type: Date,
    custom: function () {
      var startDate = this.field('startDate').value
      if (!startDate) {
        return 'required'
      } else if (startDate < moment().add(-1, 'day').startOf('day').toDate()) {
        return 'currentOrFutureDate'
      }
    },
  },
  endDate: {
    type: Date,
    custom: function () {
      var startDate = this.field('startDate').value
      var endDate   = this.field('endDate').value

      if (!endDate) {
        return 'required'
      } else if (startDate > endDate) {
        return 'laterDate'
      }
    },

  },
  startTime: {
    // minutes offset
    type:    Number,
    decimal: false
  },
  endTime: {
    // minutes offset
    type:    Number,
    decimal: false,
    custom: function () {
      var startTime = this.field('startTime').value
      var endTime   = this.field('endTime').value

      if (startTime > endTime) {
        return 'laterTime'
      }
    }
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
  stripeToken: {
    type: String,
    optional: true,
    autoValue: function(){
      if(!this.isFromTrustedCode){
        return null
      }
    }
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
  clicksCount: {
    type: Number,
    defaultValue: 0
  },
  impressionsCount: {
    type: Number,
    defaultValue: 0
  }
})

CampaignSchema.messages({
  'expectedConstructor startTime': '[label] must be a time',
  'expectedConstructor endTime':   '[label] must be a time',
  'onePicture':                    'You must provide one picture.',
  'threePictures':                 'You must provide three pictures.',
  'urlFormat':                     'EXAMPLE: http://www.example.com/advertisement',
  'currentOrFutureDate':           '[label] should be a present or future date',
  'laterDate':                     '[label] should be later than or equal to Start date',
  'laterTime':                     '[label] should be later than Start time'
})

Campaigns = new Mongo.Collection('campaigns')
Campaigns.attachSchema(CampaignSchema)
