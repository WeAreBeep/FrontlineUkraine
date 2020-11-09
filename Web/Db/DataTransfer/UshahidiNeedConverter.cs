using System;
using System.Collections.Generic;
using System.Diagnostics;
using Shared;

namespace Web.Db
{
    public static class UshahidiNeedConverter
    {
        public static List<Need> ToNeedsModel(List<NeedsPost> ushahidiNeeds)
        {
            List<Need> needs = new List<Need>();

            foreach (NeedsPost post in ushahidiNeeds)
            {
                Need newNeed = new Need
                {
                    UshahidiId = post.Id,
                    Timestamp = post.DateTime,
                    StatusId = (int)PostStatus.Published,
                    ContactName = post.ContactName,
                    JobTitle = post.JobTitle,
                    Email = "email@placeholder.com", //placeholder to make sure validation passes
                    //PhoneNumber = "", //N.B. If it's NULL i.e. not present then make it NULL. At DB level if there is no value for a string it should be NULL.
                    OrganisationName = post.Organisation,
                    Department = post.Department,
                    TownOrCity = post.TownOrCity,
                    Postcode = post.Postcode,
                    TellUsMore = post.TellUsMore,
                    Latitude = post.Location.Lat,
                    Longitude = post.Location.Lon,
                    PublishAnonymously = post.IsAnonymous,
                };

                extractOrgType(post, newNeed);

                newNeed.NeedPpeTypes = extractNeedsPpeType(post, newNeed);

                if (long.TryParse(post.TweetId, out long tweetId))
                {
                    newNeed.TweetId = tweetId; /// this could work on some posts as the ushaidi twitter id look ok on most fields with it.
                }

                needs.Add(newNeed);
            }

            return needs;

        }

        static void extractOrgType(NeedsPost post, Need newNeed)
        {
            if (Enum.TryParse(post.OrganisationType, out OrgTypes orgType)) //N.B. won't work 
            {
                newNeed.OrgTypeId = (int)orgType;
            }
            else //fall back is orgtype id isn't found
            {
                Debugger.Break();
                newNeed.OrgTypeId = (int)OrgTypes.Other;
            }

            newNeed.OrgTypeOther = post.OtherOrganisationType;

        }

        static List<NeedPpeType> extractNeedsPpeType(NeedsPost post, Need newNeed)
        {
            List<NeedPpeType> ppeList = new List<NeedPpeType>();

            foreach (string ppe in post.PpeTypes)
            {   
                NeedPpeType needsPpe = new NeedPpeType();

                if (Enum.TryParse(ppe, out PpeTypes ppeType)) //N.B. won't work
                {
                    needsPpe.PpeTypeId = (byte)ppeType;
                    if (ppeType == PpeTypes.FFP1RespiratorMasks) //only add the daily shortage if ppe is ffp1
                    {
                        needsPpe.DailyShortage = post.FFP1DailyShortage;
                        needsPpe.DailyShortageForWhom = post.FFP1DailyDetails;
                    }

                    if (ppeType == PpeTypes.Other)
                    {
                        Debugger.Break();
                        needsPpe.PpeTypeOther = post.OtherPpeTypes; //only add other if ppetype is other
                    }

                }
                else //fallback in case some ppe doesn't match our enums
                {
                    Debugger.Break();
                    needsPpe.PpeTypeId = (int)PpeTypes.Other;
                    needsPpe.PpeTypeOther = post.OtherPpeTypes;
                }

                needsPpe.StatusId = (int)PpeStatus.New;
                ppeList.Add(needsPpe);
            }

            return ppeList;
        }
    }
}
