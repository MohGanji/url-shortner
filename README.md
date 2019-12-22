For the project to work on your system, you may want to add these two aliasaes in your `/etc/hosts` file:

```
127.0.0.1	redis
127.0.0.1	mongo
```

To run, first install dependencies with `yarn` and then run the server with `yarn start`. This will set up a server on port `3000`.

Performance report:

برای تعداد ریکوئست بالا، مونگو مناسب نبود، برای همین یه ماژول cache نوشتم و از اون استفاده کردم که ریکوئست‌های سنگین و یا پرتکرار روی redis ذخیره و از اون برداشته بشن

در نهایت همونطور که در عکس‌های ریپورت می‌تونین ببینین تا تعداد 200 ریکوئست بر ثانیه هم سرور بدون مشکل کار می‌کنه، اما ریسپانس تایم زیاد می‌شه چون فقط یه اینستنس از سرور node داریم.
