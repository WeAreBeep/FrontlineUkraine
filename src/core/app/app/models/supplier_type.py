from enum import IntEnum


class SupplierType(IntEnum):
    ExistingPPEsupplier = 1
    AdaptedPPEsupplier = 2
    Individuals = 3
    Other = 4
