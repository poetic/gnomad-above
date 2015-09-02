var oneMB = 1000000

Images = new FS.Collection("images", {
  filter: {
    maxSize: oneMB
  },
  stores: [new FS.Store.GridFS("images")]
})
