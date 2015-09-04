Constant = {}

Constant.campaignTypes = [ 'one-off', 'editorial', 'video', 'custom' ]
Constant.campaignTimezoneNames = _.filter(
  moment.tz.names(),
  function(name) {
    return name.match(/^America/)
  }
)
Constant.campaignTimezoneOptions = _.inject(
  Constant.campaignTimezoneNames,
  function(acc, name) {
    acc[name] = name.replace(/^America\//, '')
      return acc
  },
  {}
)

