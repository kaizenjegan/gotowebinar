# Create Webinar

A simple interface for programmatically creating a Goto Webinar
![alt text](readme.gif)



https://goto-developer.logmeininc.com/how-get-access-token-and-organizer-key

2 - Request Access Token

sample json
{
 "access_token":"RlUe11faKeyCWxZToK3nk0uTKAL",
 "expires_in":3600,
 "token_type":"Bearer"
 "refresh_token":"d1cp20yB3hrFAKeTokenTr49EZ34kTvNK",
 "organizer_key":"8439885694023999999",
 "account_key":"9999982253621659654",
 "account_type":"",
 "firstName":"Mahar",
 "lastName":"Singh",
 "email":"mahar.singh@singhSong.com",
 "version":"3"
}

2.
curl -X POST "https://api.getgo.com/oauth/v2/token" \
  -H "Authorization: Basic {cFRTTXgzYk9DbkV5a1V6dkFGUnBib0lzaUhBQTBTaHY6TlAzZ0JGajBwbmJMcERjNA==}" \
  -H "Accept:application/json" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code={responseKey}"


https://api.getgo.com/oauth/v2/authorize?client_id=pTSMx3bOCnEykUzvAFRpboIsiHAA0Shv&response_type=code



http://localhost:3000/oauth?code=31486e49bd54270d408deb1919ec7cde

  curl -X POST "https://api.getgo.com/oauth/v2/token" \
  -H "Authorization: Basic cFRTTXgzYk9DbkV5a1V6dkFGUnBib0lzaUhBQTBTaHY6TlAzZ0JGajBwbmJMcERjNA==" \
  -H "Accept:application/json" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code&code=31486e49bd54270d408deb1919ec7cde"
