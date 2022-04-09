from enum import IntEnum


class PpeStatus(IntEnum):
    New = 1
    InProgress = 2
    Met = 3
    NotMet = 4
