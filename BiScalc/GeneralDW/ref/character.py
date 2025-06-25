


class character:
    def __init__(self, name, level, job):
        self.name = name
        self.level = level
        self.job = job

    def __str__(self):
        return f"Character(Name: {self.name}, Level: {self.level}, Job: {self.job})"

    def __repr__(self):
        return f"character(name={self.name!r}, level={self.level!r}, job={self.job!r})"