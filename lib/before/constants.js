Constant = {}

/*
 * times
 * NOTE: times are all in ms
 */
var oneSecond  = 1000
var oneMinute  = 60 * oneSecond
var oneHour    = 60 * oneMinute
var oneDay     = 24 * oneHour
var oneMillion = 1000 * 1000
Constant.nearestAreasCount       = 2
Constant.campaignsUpdatePeriod   = 30 * oneMinute
Constant.geolocationUpdatePeriod = 0.5 * oneMinute
Constant.categoryUpdatePeriod    = oneHour
Constant.maxClickRecords         = oneMillion
Constant.maxRouteRecords         = oneMillion
Constant.maxGeolocationsStored   = 7 * oneDay / Constant.geolocationUpdatePeriod  // 7 days history

/* limits */
// client
Constant.contentsLimitInContentsRoute = 8
Constant.campaignsPercentage          = 0.3
// animation
Constant.fadeDuration = 0.75 * oneSecond

// server
Constant.contentsLimitInChannel = 10

// sentry
Constant.sentryClientKey = 'https://124cbd5e766c43b4a2b1090ebf1fe68d@app.getsentry.com/50780'
