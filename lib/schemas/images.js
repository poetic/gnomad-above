var fiveMB = 5000000

Images = new FS.Collection("images", {
  filter: {
    maxSize: fiveMB,
    allow: {
      extensions: ['jpg']
    }
  },
  stores: [new FS.Store.GridFS("images", {
    transformWrite: function (fileObj, readStream, writeStream) {
      var origFileSize = fileObj.original.size
      var oneMB        = 1000000
      var ratio        = 100 - ((oneMB / origFileSize) * 100)

      gm(readStream, fileObj)
        .compress('JPEG')
        .quality(ratio)
        .stream()
        .pipe(writeStream)
    }
  })]
})
