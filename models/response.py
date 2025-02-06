import json


class Response:
    def __init__(self, status: str, message: str) -> None:
        self.status = status
        self.message = message

    @classmethod
    def from_error(cls, data: str) -> "Response":
        error_message = json.loads(data)["error"]["message"]
        clean_message = (
            error_message.split(": ")[1] if ": " in error_message else error_message
        )
        return cls("Error", clean_message.capitalize())
