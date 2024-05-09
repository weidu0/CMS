//分类时间

import moment from "moment"
moment.locale("zh-cn")
const formatTime = {
    getTime: (data) => {
        return moment(data).format('YYYY/MM/DD')
    }
}

export default formatTime