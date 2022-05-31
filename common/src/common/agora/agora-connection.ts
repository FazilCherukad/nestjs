const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')

const appID = '';
const appCertificate = '';
const role = RtcRole.PUBLISHER;

function rtmToken(uid){
    const expirationTimeInSeconds = 3600 * 120
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    const token = RtmTokenBuilder.buildToken(appID, appCertificate, uid, RtmRole, privilegeExpiredTs);
    return token
}

function rtcToken(uid, channelName){
    const expirationTimeInSeconds = 3600 * 120
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    const token = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
    return token
}

export {
    rtmToken,
    rtcToken
} 