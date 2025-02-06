from pyrebase import pyrebase

from config import FB_CONFIG
from models import Job, Response


class Firebase:
    __fb = pyrebase.initialize_app(FB_CONFIG)
    __auth = __fb.auth()
    __db = __fb.database()

    def sign_up(self, email: str, password: str) -> Response:
        try:
            user = self.__auth.create_user_with_email_and_password(email, password)
            # TODO Verifying email
            return Response("Success", "Account created successfully", user["idToken"])
        except Exception as e:
            return Response.from_error(e.args[1])

    def sign_in(self, email: str, password: str) -> Response:
        try:
            user = self.__auth.sign_in_with_email_and_password(email, password)
            return Response("Success", "Login successfully", user["idToken"])
        except Exception as e:
            return Response.from_error(e.args[1])

    def reset_password(self, email: str) -> Response:
        try:
            self.__auth.send_password_reset_email(email)
            return Response("Success", "Password reset email sent", email)
        except Exception as e:
            return Response.from_error(e.args[1])

    def delete_account(self, token: str) -> Response:
        try:
            self.__auth.delete_user_account(token)
            return Response("Success", "Account deleted successfully", token)
        except Exception as e:
            return Response.from_error(e.args[1])

    def __check_job_existence(self, job: Job) -> list | dict | None:
        existing_job = self.__db.child("jobs").child(job.name).get()
        return existing_job.val()

    def get_jobs(self) -> list[Job] | None:
        try:
            return [Job.from_dict(job.val()) for job in self.__db.child("jobs").get()]
        except:
            return None

    def add_job(self, job: Job) -> Response:
        if self.__check_job_existence(job) is not None:
            return Response("Error", f"Job already {job.name} exists")

        self.__db.child("jobs").child(job.name).set(job.to_dict())
        return Response("Success", f"Job added {job.name} successfully", job.name)

    def edit_job(self, job: Job) -> Response:
        if self.__check_job_existence(job) is None:
            return Response("Error", f"Job {job.name} doesn't exist")

        self.__db.child("jobs").child(job.name).update(job.to_dict())
        return Response("Success", f"Job {job.name} edited successfully", job.name)

    def delete_job(self, job: Job) -> Response:
        if self.__check_job_existence(job) is None:
            return Response("Error", f"Job {job.name} doesn't exist")

        self.__db.child("jobs").child(job.name).remove()
        return Response("Success", f"Job {job.name} deleted successfully", job.name)

    def delete_all_jobs(self) -> Response:
        jobs_deleted = len(self.__db.child("jobs").get().val())
        self.__db.child("jobs").remove()
        return Response("Success", "Jobs deleted successfully", str(jobs_deleted))
