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
        // About 'quality', please refer to:
        // http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
        // quality ranges from 0 to 100

        // About the relationship between quality and compression ratio
        // http://stackoverflow.com/questions/3471663/jpeg-compression-ratio
        // There is not a one on one relationship between them.
        // Therefore we use a fixed ratio to simplify this problem

        image
          .compress('JPEG')
          .quality(75)
          .stream()
          .pipe(writeStream)
      } else {
        readStream.pipe(writeStream)
      }
    }
  })]
})
