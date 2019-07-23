Component({
  properties: {
    indexActived: {
      type: Boolean,
      value: false,
    },
    richActived: {
      type: Boolean,
      value: false,
    },
    cooperationActived: {
      type: Boolean,
      value: false,
    },
  },
  data: {
  },
  methods: {
    redirectHandler (e) {
      wx.redirectTo({
        url: e.currentTarget.dataset.route,
      });
    },
  }
})