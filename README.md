# Restful OpenRCT2 API Host
Using Node.js and the plugin API created by the OpenRCT2 team, OpenRCT2 Restful Api tracks game stats,
and updates them after each in-game day. 
### View Data live [here](https://www.openrct2api.com/)  
# Setup

Get an api key from [here](https://openRCT2API.com/setup)

## Local vs Remote
If you're hosting a server, use apiHost.js, else use apiLocal.js

Install the plugin like any other by moving it to 
```bash
/OpenRCT2/plugin/
```
Making sure you have Nodejs installed, start the middleware with
```bash
node <path to file>/serverWatcher.js -apitoken <YOUR API TOKEN>
```
optionally, you can add -p to disallow the data from being displayed on the live view on the site.
before starting OpenRCT2.
That's it.
# Usage

## Getting Your Park
Get a park by name with a simple GET request:
```bash
 GET: /api/parks/:apiToken
```     
      
## Getting All Parks
Get a JSON object of all saved parks:
```js
GET: /api/parks/:apiToken
```

## Posting a Park
This endpoint takes the various park stats. Meant for use by serverWatcher.js:

```js
POST: /api/parks/
```
```js
{name, value, cash, rating, admissions, parkMax, currentGuests, playersOnline, rides, gameDay, gameMonth, gameYear, apiToken, public}
```



