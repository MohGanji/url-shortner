from locust import HttpLocust, TaskSet, between

token_string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZmU2NjYxMzgwNDJkNGMwMTgxYTIyNCIsInVzZXJuYW1lIjoiYWFhIiwiZW1haWwiOiJhYWFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJQblJMbmNPVGlicnd4YUJtQlltNFFDODl1MG00bXo1MThzazFXRktqeG5jPSIsImNyZWF0ZWRBdCI6IjIwMTktMTItMjFUMTg6Mzc6MjEuOTI0WiIsIl9fdiI6MH0sImlhdCI6MTU3Njk1MzYzMywiZXhwIjoxNTc5NTQ1NjMzfQ.PwqrDxeR_LD3USKYozLLMb8eFGJgklZDhWlpbKtpISk"


def generateShortLink(l):
    l.client.post(
        "/url/shorten", {"url": "https://google.com"}, headers={"auth": token_string})


def redirect(l):
    l.client.get("/r/zk6m0cr1")


def analytics(l):
    l.client.get("/analytics/zk6m0cr1", headers={"auth": token_string})


class UserBehavior(TaskSet):
    tasks = {generateShortLink: 5, redirect: 85, analytics: 10}

    def on_start(self):
        pass

    def on_stop(self):
        pass


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    wait_time = between(0.1, 0.2)
