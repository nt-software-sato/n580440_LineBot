
let thisURL = new URL(location.href);
let params = thisURL.searchParams;
for (let pair of params.entries()) {

}
let token = params.get('token');

const defaultFields = {

  account: '',
  password: '',
  remember: false,
  token: token
};

new Vue({
  el: '#login-form',
  data: {
    hasErrors: false,
    passwordIsText: false,
    isLoading: false,
    isSuccess: false,
    fields: {
      ...defaultFields
    }
  },
  methods: {
    submitLogin() {
      this.isLoading = true;
      axios.post(
        `${location.origin}/LineConnectAuth`,
        {
          ...this.fields
        }
      )
        .then((res) => res.data)
        .then((data) => {
          this.isLoading = false;
          this.fields = {
            ...defaultFields
          }
          if (data.status == "200") {
            location.href = `https://access.line.me/dialog/bot/accountLink?linkToken=${token}&nonce=${data.nonce}`
            this.isSuccess = true;
          } else {
            this.isLoading = false;
            this.hasErrors = true;
            this.isSuccess = false;
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.hasErrors = true;
        });
    }
  }
});