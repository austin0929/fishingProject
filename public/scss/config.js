let baseUrl = "http://localhost:3000";



//數字千分位
function toThousands(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//email驗證
function validateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return true
    }
    return false;
}

//token
const AUTH = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.common.Authorization = AUTH;
console.log(AUTH);
