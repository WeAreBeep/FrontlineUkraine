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
    LocalCharity = 9
    InternationalOrgChapter = 10
    ReligiousInstitution = 11
    LocalOrRegionalAdmin = 12
    University = 13
    School = 14
    Community = 15
    LocalHospital = 16
    DistributionHub = 17
