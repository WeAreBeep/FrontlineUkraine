from enum import IntEnum


class OrgType(IntEnum):
    NhsHospital = 1
    CareHome = 2
    GpSurgery = 3
    PrivateHospital = 4
    ShelteredHousing = 5
    CivicInfrastructure = 6
    Other = 7
    Dentists = 8
