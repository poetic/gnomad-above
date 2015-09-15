var FIVE_MB = 5000000
var ONE_MB  = 1000000

Images = new FS.Collection("images", {
  filter: {
    maxSize: FIVE_MB,
    allow: {
      extensions: ['jpg']
    }
  },
  stores: [new FS.Store.GridFS("images", {
    transformWrite: function (fileObj, readStream, writeStream) {
      var size = fileObj.original.size

      // compress image if it is larger than ONE_MB
      if (size > ONE_MB) {
        var image = gm(readStream, fileObj)
        // about 'quality', please refer to:
        // http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
        // Since quality is not a simple linear function of compression ratio,
        // use a simple fomula like this would not work corretly:
        // ```var ratio = ONE_MB / size * 100```
        // 80 is a good choice for 5MB and 1MB files, therefore we can use
        // it as the quality
        image
          .compress('JPEG')
          .quality(80)
          .stream()
          .pipe(writeStream)
      } else {
        readStream.pipe(writeStream)
      }
    }
  })]
})
