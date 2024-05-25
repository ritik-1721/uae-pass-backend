const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");
const {
  UAE_PASS_AUTH_URL,
  UAE_PASS_CLIENT_ID,
  UAE_PASS_REDIRECT_URI,
  UAE_PASS_TOKEN_URL,
  UAE_PASS_CLIENT_SECRET,
  UAE_PASS_USERINFO_URL,
  JWT_SECRET,
  UAE_PASS_LOGOUT_URL,
} = require("../config/config");
const { sendResponse } = require("../helpers/local.helper");
const logger = require("../helpers/logger");

const login = async (req, res) => {
  try {
    const redirectUrl = `${UAE_PASS_AUTH_URL}?response_type=code&client_id=${encodeURIComponent(UAE_PASS_CLIENT_ID)}&redirect_uri=${encodeURIComponent(UAE_PASS_REDIRECT_URI)}`;
    logger.info(`Redirecting user to UAE Pass login: ${redirectUrl}`);
    // return res.redirect(redirectUrl);
    return sendResponse(res, 200, 200, "Redirecting user to UAE Pass login",{redirectUrl});
  } catch (error) {
    logger.error("Error occurred in UAE Pass controller login:", error);
    return sendResponse(res, 500, 500, "Internal Server Error");
  }
};

const callback = async (req, res) => {
  const code = req.query.code;
  try {
    const tokenResponse = await axios.post(UAE_PASS_TOKEN_URL, null, {
      params: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: UAE_PASS_REDIRECT_URI,
        client_id: UAE_PASS_CLIENT_ID,
        client_secret: UAE_PASS_CLIENT_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const accessToken = tokenResponse.data.access_token;

    const userInfoResponse = await axios.get(UAE_PASS_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userInfo = userInfoResponse.data;
    const jwtToken = jwt.sign(userInfo, JWT_SECRET);

    logger.info("JWT token generated successfully for UAE Pass callback");
    return sendResponse(res, 200, 200, "Authentication successfully", {
      jwtToken,
    });
  } catch (error) {
    logger.error("Error occurred in UAE Pass controller callback:", error);
    return sendResponse(res, 500, 500, "Authentication failed");
  }
};

/*
Response(Citizen/Resident Profile)
Copy
{
    "sub": "UAEPASS/7a05992e-3244-49d3-bcbc-7894c8fca25e",
    "fullnameAR": "ساوميا,,,,شارما,,",
    "gender": "Male",
    "mobile": "97151234003",
    "lastnameEN": "ABC",
    "fullnameEN": "Ram,,,,ABC,,",
    "uuid": "7a05992e-3244-49d3-bcbc-7894c8fca25e",
    "lastnameAR": "شارما",
    "idn": "784189014978983",
    "nationalityEN": "IND",
    "firstnameEN": "Ram",
    "userType": "SOP3",
    "nationalityAR": "هندى",
    "firstnameAR": "ساوميا",
    "email": "ramabc1234@gmail.com"
}
Response(Visitor Profile)
Copy
{
   "sub": "35q00600-27a0-5555-8d93-453392902b84",
   "fullnameAR": "عمر,بدوى,حسنين,,عبدالله,,",
   "mobile": "971566612311",
   "fullnameEN": "AMAR,,,,KHAN,,",
   "uuid": "35q87600-27a0-5555-8d93-453392902b84",
   "profileType": "2",
   "nationalityEN": "IND",
   "nationalityAR": "هندى",
   "firstnameEN": "AMAR",
   "unifiedID": "123458099",
   "userType": "SOP3",
   "firstnameAR": "عمر",
   "lastnameAR": "شارما",
   "lastnameEN": "Khan",
   "email": Khan@dubai.ae
}
*/

const verify = async (req, res) => { 
  const token = req.headers.authorization.split(' ')[1]; // -- req.headers["authorization"];
  if (!token) {
   logger.error("Token missing in UAE Pass controller verify");
    return sendResponse(res, 401, 401, "Token missing");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    logger.info("Token successfully verified in UAE Pass controller verify");
    return sendResponse(res, 200, 200, "Verify successfully", {
      user: decoded,
    });
  } catch (error) {
    logger.error("Error occurred while verifying token in UAE Pass controller verify:", error);
    return sendResponse(res, 401, 401, "Invalid token");
  }
};

// const logout = async () => {
//    const redirectUrl = `${UAE_PASS_LOGOUT_URL}?redirect_uri=${encodeURIComponent('http://localhost:3000')}`;
//    res.redirect(redirectUrl);
// };

module.exports = { login, callback, verify };
