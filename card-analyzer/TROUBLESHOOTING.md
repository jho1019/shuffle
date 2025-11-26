# Troubleshooting "Invalid Request" Error

If you're seeing "Invalid request" when submitting a cert number, here are the most common causes:

## 1. **Authentication Issue**
The PSA API requires proper authentication. Make sure:
- You have a valid API token from [psacard.com/publicapi](https://www.psacard.com/publicapi)
- The token is entered correctly in Settings (click the ⚙️ icon)
- The token hasn't expired

## 2. **Check Browser Console**
Open your browser's Developer Tools (F12 or Cmd+Option+I on Mac) and check the Console tab. You should see:
- `API Response:` - Shows the raw response from PSA
- Any error messages that can help diagnose the issue

## 3. **Common Response Scenarios**

### Invalid Token
```json
{
  "IsValidRequest": false,
  "ServerMessage": "Invalid credentials"
}
```
**Solution**: Get a new API token or verify your current one.

### Invalid Cert Number Format
```json
{
  "IsValidRequest": false,
  "ServerMessage": "Invalid CertNo"
}
```
**Solution**: Ensure the cert number is numeric and valid.

### No Data Found
```json
{
  "IsValidRequest": true,
  "ServerMessage": "No data found"
}
```
**Solution**: The cert number doesn't exist in PSA's database.

### Success
```json
{
  "IsValidRequest": true,
  "CertNumber": "12345678",
  "Player": "Michael Jordan",
  ...
}
```

## 4. **Test Your Token Manually**

You can test your API token using curl:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  https://api.psacard.com/publicapi/cert/GetByCertNumber/12345678
```

Replace `YOUR_TOKEN_HERE` with your actual token and `12345678` with a valid cert number.

## 5. **Rate Limits**

Free accounts are limited to 100 API calls per day. If you've exceeded this:
- Wait until the next day
- Contact collectors-apis@collectors.com for paid plans

## Need More Help?

Check the console logs in your browser for the exact error message and response data.
