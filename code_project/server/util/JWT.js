const jsonwebtoken = require("jsonwebtoken")

const secret = "weidu" //密钥

//expiresIn:过期时间
const JWT = {
    generate(value, exprires) {
        return jsonwebtoken.sign(value, secret, { expiresIn: exprires })
    },
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret)
        } catch {
            return false
        }

    }

}

//const token = JWT.generate({ name: "weidu" }, "10s")
//console.log(JWT.verify(token))

module.exports = JWT