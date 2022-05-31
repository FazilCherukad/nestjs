export const accountSid = '';
export const authToken = '';
export const workspaceSid = ""
export const workflowSid = ""
export const callerId = "+12147314657"
export const availabilityName = "Available"
export const apiKey = ""
export const apiSecret = ""
export const fcmPushId = ""
export const twimlAppId = ""
export const statusCallBackUrl = "http://domain/twilio/core-agn-caller/status_callback"

// export const accountSid = 'AC0335309f6e680ab2cfa163229a4509f4';
// export const authToken = 'fdcc850adc9c599d5f6ec69889526796';
// export const workspaceSid = ""
// export const workflowSid = ""
// export const callerId = "+12678634350"
// export const availabilityName = "Available"
// export const apiKey = "SK38d0b46c88b17fcf07c54ace5b870620"
// export const apiSecret = "MZqiyspme46yPY6pTaYSG23E6dce2OIQ"
// export const fcmPushId = "CRd5a1bd2201a8e0c3701eb788d826ea6f"
// export const twimlAppId = "AP45f85a162937db08e51e7f48e4987b90"

export const TwilioClient = require('twilio')(accountSid, authToken);
export const TwilioWorkspaceClient = TwilioClient.taskrouter.v1.workspaces(workspaceSid);