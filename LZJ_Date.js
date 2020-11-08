export function LZJ_Date(when, format, L) {
    let $Date = new Date()
    let h = $Date.getHours()  //获取当前小时数
    let m = $Date.getMinutes()  //获取当前分钟数
    let s = $Date.getSeconds()  //获取当前秒数
    let history;
    let begin, end;
    let day
    switch (when) {
        case "昨日":
        case "yesterday":
            history = (h * 60 * 60000) + (m * 60000) + (s * 1000)  //获取今日已过去的毫秒总数
            $Date = $Date - history  //此时$Date为当日零点
            begin = $Date - 24 * 60 * 60000  //通过当日零点减去一天得到昨日零点
            L ? (begin = new Date(new Date() - 24 * 60 * 60000), end = new Date()) : (begin = new Date(begin), end = new Date($Date - 1000))
            break;
        case "今日":
        case 'today':
            history = (h * 60 * 60000) + (m * 60000) + (s * 1000)
            begin = new Date($Date - history)  //获取当日零点
            end = new Date(begin.getTime() + 24 * 60 * 60000 - 1000)  //获取当日最后一秒种
            L ? begin = $Date : begin
            break;
        case '明日':
        case 'tomorrow':
            history = (h * 60 * 60000) + (m * 60000) + (s * 1000)
            begin = new Date($Date - history)  //首先获取当日零点
            L ? begin = new Date($Date.getTime() + 24 * 60 * 60000) : begin = new Date(begin.getTime() + 24 * 60 * 60000)  //获取次日零点
            end = new Date(begin.getTime() + 24 * 60 * 60000 - 1000)  //获取次日最后一秒种
            break;
        case "上周":
        case "lastWeek":
            day = $Date.getDay() || 7; //由于周日得到的是数字0;而在中国周日应该是一周的最后一天
            history = (h * 60 * 60000) + (m * 60000) + (s * 1000) //获得当日已过时间
            $Date = $Date - history  //获得当日的零点
            if (L) {
                begin = new Date().getTime() - 7 * 24 * 60 * 60000;
                end = new Date()
            } else {
                begin = new Date(new Date($Date - (day - 1) * 24 * 60 * 60000).getTime() - 7 * 24 * 60 * 60000)  //得到上周周一起始零点
                end = new Date(new Date($Date - (day - 1) * 24 * 60 * 60000) - 1000)  //得到上周周日最后一刻
            }
            break;
        case "本周":
        case "thisWeek":
            day = $Date.getDay() || 7; //由于周日得到的是数字0;而在中国周日应该是一周的最后一天
            history = (h * 60 * 60000) + (m * 60000) + (s * 1000) //获得当日已过时间
            $Date = $Date - history  //获得当日的零点
            begin = new Date($Date - (day - 1) * 24 * 60 * 60000)  //得到本周周一起始零点
            L ? end = new Date() : end = new Date((begin.getTime() + 7 * 24 * 60 * 60000) - 1000)  //得到本周周日最后一刻时间
            break;
        case "下周":
        case "nextWeek":
            day = $Date.getDay() || 7; //由于周日得到的是数字0;而在中国周日应该是一周的最后一天
            history = (h * 60 * 60000) + (m * 60000) + (s * 1000) //获得当日已过时间
            $Date = $Date - history  //获得当日的零点
            if (L) {
                begin = new Date();
                end = new Date(begin.getTime() + 7 * 24 * 60 * 60000 - 1000)
            } else {
                begin = new Date($Date + (8 - day) * 24 * 60 * 60000)  //得到下周周一起始零点
                end = new Date((begin.getTime() + 7 * 24 * 60 * 60000) - 1000)  //得到本周周日最后一刻时间
            }
            break;
        case "上月":
        case "lastMonth":
            if (L) {
                begin = new Date($Date.getTime() - (new Date($Date.getFullYear(), $Date.getMonth(), 0).getDate() * 24 * 60 * 60000))
                end = new Date()
            } else {
                begin = new Date($Date.getFullYear(), $Date.getMonth() - 1, 1)
                end = new Date(new Date($Date.getFullYear(), $Date.getMonth(), 1) - 1000)
            }
            break;
        case "本月":
        case "thisMonth":
            begin = new Date($Date.getFullYear(), $Date.getMonth(), 1)
            L ? end = new Date() : end = new Date(new Date($Date.getFullYear(), $Date.getMonth() + 1, 1) - 1000)
            break;
        case "下月":
        case "nextMonth":
            if (L) {
                begin = $Date
                end = new Date(begin.getTime() + new Date($Date.getFullYear(), $Date.getMonth() + 1, 0).getDate() * 24 * 60 * 60000 - 1000)
            } else {
                begin = new Date($Date.getFullYear(), $Date.getMonth() + 1, 1)
                end = new Date(new Date($Date.getFullYear(), $Date.getMonth() + 2, 1) - 1000)
            }
            break;
        case "去年":
        case "lastYear":
            if (L) {
                let date = 0;
                for (let i = 0; i < 12; i++) {
                    date += new Date($Date.getFullYear() - 1, $Date.getMonth() + 1 + i, 0).getDate()
                }
                begin = new Date($Date.getTime() - date * 24 * 60 * 60000)
                end = new Date()
            } else {
                begin = new Date($Date.getFullYear() - 1, 0, 1);
                end = new Date(new Date($Date.getFullYear(), 0, 1) - 1000)
            }
            break;
        case "今年":
        case "thisYear":
            begin = new Date($Date.getFullYear(), 0, 1)
            L?end = new Date():end = new Date(new Date($Date.getFullYear() + 1, 0, 1) - 1000)
            break;
        case "明年":
        case "nextYear":
            if(L){
                let date=0;
                for(let i=0;i<12;i++){
                    date+= new Date($Date.getFullYear(),$Date.getMonth()+1+i,0).getDate()
                }
                begin = $Date;
                end = new Date(begin.getTime()+date*24*60*60000)
            }else{
                begin = new Date($Date.getFullYear() + 1, 0, 1)
                end = new Date(new Date($Date.getFullYear() + 2, 0, 1) - 1000)
            }
            break;
        default:
            throw new Error("你传的格式不对劲,请阅读文档后再次尝试,The format you sent is not right, please read the document and try again")
    }
    if (format) {
        let beginYear, endYear
        switch (format) {
            case "YYYY-MM-DD":
                begin = `${begin.getFullYear()}-${begin.getMonth() + 1}-${begin.getDate()}`
                end = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`
                break;
            case "YYYY-MM-DD-H":
                begin = `${begin.getFullYear()}-${begin.getMonth() + 1}-${begin.getDate()}-${begin.getHours()}`
                end = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}-${end.getHours()}`
                break;
            case "YYYY-MM-DD-H-M":
                begin = `${begin.getFullYear()}-${begin.getMonth() + 1}-${begin.getDate()}-${begin.getHours()}-${begin.getMinutes()}`
                end = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}-${end.getHours()}-${end.getMinutes()}`
                break;
            case "YYYY-MM-DD-H-M-S":
                begin = `${begin.getFullYear()}-${begin.getMonth() + 1}-${begin.getDate()}-${begin.getHours()}-${begin.getMinutes()}-${begin.getSeconds()}`
                end = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}-${end.getHours()}-${end.getMinutes()}-${end.getSeconds()}`
                break;
            case "YY-MM-DD":
                beginYear = String(begin.getFullYear()).slice(String(begin.getFullYear()).length - 2)
                endYear = String(end.getFullYear()).slice(String(end.getFullYear()).length - 2)
                begin = `${beginYear}-${begin.getMonth() + 1}-${begin.getDate()}`
                end = `${endYear}-${end.getMonth() + 1}-${end.getDate()}`
                break;
            case "YY-MM-DD-H":
                beginYear = String(begin.getFullYear()).slice(String(begin.getFullYear()).length - 2)
                endYear = String(end.getFullYear()).slice(String(end.getFullYear()).length - 2)
                begin = `${beginYear}-${begin.getMonth() + 1}-${begin.getDate()}-${begin.getHours()}`
                end = `${endYear}-${end.getMonth() + 1}-${end.getDate()}-${end.getHours()}`
                break;
            case "YY-MM-DD-H-M":
                beginYear = String(begin.getFullYear()).slice(String(begin.getFullYear()).length - 2)
                endYear = String(end.getFullYear()).slice(String(end.getFullYear()).length - 2)
                begin = `${beginYear}-${begin.getMonth() + 1}-${begin.getDate()}-${begin.getHours()}-${begin.getMinutes()}`
                end = `${endYear}-${end.getMonth() + 1}-${end.getDate()}-${end.getHours()}-${end.getMinutes()}`
                break;
            case "YY-MM-DD-H-M-S": //
                beginYear = String(begin.getFullYear()).slice(String(begin.getFullYear()).length - 2)
                endYear = String(end.getFullYear()).slice(String(end.getFullYear()).length - 2)
                begin = `${beginYear}-${begin.getMonth() + 1}-${begin.getDate()}-${begin.getHours()}-${begin.getMinutes()}-${begin.getSeconds()}`
                end = `${endYear}-${end.getMonth() + 1}-${end.getDate()}-${end.getHours()}-${end.getMinutes()}-${end.getSeconds()}`
                break;
            default:
                throw new Error("你传的格式不对劲,请阅读文档后再次尝试,The format you sent is not right, please read the document and try again")
        }
    }
    return { begin, end }
}