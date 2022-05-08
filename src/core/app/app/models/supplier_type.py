from enum import IntEnum, auto


class SupplierType(IntEnum):
    Manufacturer = 1
    AidOrganisationOrCharity = auto()
    CommunityGroup = auto()
    Other = auto()
