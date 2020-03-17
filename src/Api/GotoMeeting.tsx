
import { config } from '../config/default';
const rp = require('request-promise');

export const GotoMeetingAPI = () =>{
    //
  const consumer = {
    key: config.key,
    secret: config.secret
  }

  const base64encode = (str:string): any =>{
    return window.btoa(str);
  }
  const createGotoWebinar = (token:string, organizerId:string, webinar:any) => {
    const url = `https://api.getgo.com/G2W/rest/v2/organizers/${organizerId}/webinars`

    var options = {
      method: "POST",
      uri: url,
      body: JSON.stringify(webinar),
      headers: {
        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        "Authorization": `Bearer ${token}`
      }
    };

    return rp(options);
  }

  const getAuthToken = (code:any) => {
    const url = `https://api.getgo.com/oauth/v2/token?grant_type=authorization_code&code=${code}`;

    const token = base64encode(`${consumer.key}:${consumer.secret}`);

    var options = {
      method: "POST",
      uri: url,
      headers: {
        'content-type': 'application/x-www-form-urlencoded', // Is set automatically
        Authorization: `Basic ${token}`
      }
      // body: webinar
    };
  
    return rp(options);
  }

  return {
      createWebinar: createGotoWebinar,
      authenticate: getAuthToken
  }
}