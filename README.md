# Exec callback at time

```js
var at = require('at-time')(saveCallback);

at.record('/path/to/file', {timeout: 1000*60*5}); // wait 5 minutes before store it
```
After a while the callback is called. If you record the same path multiple times
the execution is postponed to a new time (next five minutes in this example).

