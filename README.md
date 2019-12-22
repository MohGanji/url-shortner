For the project to work on your system, you may want to add these two aliasaes in your `/etc/hosts` file:

```
127.0.0.1	redis
127.0.0.1	mongo
```

To run, first install dependencies with `yarn` and then run the server with `yarn start`. This will set up a server on port `3000`.

Performance report:

Since mongo was not suitable for high request rate, Cachify module implemented on top of redis is used to cache repetitive and database-intensive requests.

As a result, as presented in the reports placed at benchmark-results directory, server can sustain a load of 200 rps(request per second). However the response time gradually increases due to using only one server node.
