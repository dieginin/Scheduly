class Job:
    def __init__(self, name: str, hourly_rate: float) -> None:
        self.name = name
        self.hourly_rate = hourly_rate
        self.hours = 0
        self.earned = 0
        self.paid = 0

    def add_hours(self, hours: int) -> None:
        self.hours += hours
        self.earned = self.hours * self.hourly_rate

    def register_payment(self, amount: float) -> None:
        self.paid += amount

    def is_paid(self) -> bool:
        return self.paid >= self.earned

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "hourly_rate": self.hourly_rate,
            "hours": self.hours,
            "earned": self.earned,
            "paid": self.paid,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Job":
        job = cls(data["name"], data["hourly_rate"])
        job.hours = data["hours"]
        job.earned = data["earned"]
        job.paid = data["paid"]
        return job
