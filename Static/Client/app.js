let thisURL = new URL(location.href);
let params = thisURL.searchParams;
for (let pair of params.entries()) {

}
let token = params.get('token');
let token2 = params.get('token2');
const defaultFields = {
    remember: false,
    token: token,
    ErrMsg: "",

    isAdmin: (sessionStorage.isAdmin==="true")?true:false,
    User: {
        UnitId: "",
        HrCode: "",
        passCode: "",
        UserName: "",
        UserId: "",
        SigninType: 2,
        Contacts: [{
            Type: 1,
            Info: '',
            UserId: ''
        }],
        isUnitManager:0
    },
    Admin: {
        Id: "",
        Password: ""
    }
};
console.log('init',sessionStorage.isAdmin==="true");
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
    updated: function () {
        this.fields.User.HrCode = this.fields.User.UserId;
        this.fields.User.Contacts[0].UserId = this.fields.User.UserId;
        sessionStorage.isAdmin=this.fields.isAdmin ;
        this.fields.Admin.Password=window.md5(this.fields.Admin._Password);
        console.log(sessionStorage.isAdmin)

    },
    methods: {
        submitLogin() {
            this.isLoading = true;
            let cc=this.fields.isAdmin;

            axios.post(
                `${location.origin}/Client/LineConnectAuth`,
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
                    this.fields.isAdmin=cc;
                    if (data.status == "200") {
                        location.href = `https://access.line.me/dialog/bot/accountLink?linkToken=${token2}&nonce=${token}`
                        this.isSuccess = true;
                    } else {
                        this.ErrMsg = data.Msg;
                        this.isLoading = false;
                        this.hasErrors = true;
                        this.isSuccess = false;
                        // console.log(sessionStorage.isAdmin,this.fields.isAdmin);

                        // this.isAdmin = (sessionStorage.isAdmin==="true")?true:false;
                    }
                })
                .catch(() => {
                    this.isLoading = false;
                    this.hasErrors = true;

                });
        },

    }
});