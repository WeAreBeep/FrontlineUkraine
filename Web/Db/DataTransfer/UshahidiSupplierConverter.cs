using System;
using System.Collections.Generic;
using Shared;

namespace Web.Db
{
    public static class UshahidiSupplierConverter
    {
        public static List<Supplier> ToSupplierModel(List<SuppliesPost> ushahidiSupplies)
        {
            List<Supplier> supplierList = new List<Supplier>();

            foreach (SuppliesPost post in ushahidiSupplies)
            {
                Supplier newSupplier = new Supplier
                {
                    StatusId = (int)PostStatus.UnderReview, //as we will struggle to enter the capacities automatically shall we put under review to allow volunteers set to Publish when they checked capacity??
                    UshahidiId = post.Id,
                    Timestamp = post.DateTime,
                    Name = post.Organisation,
                    Description = post.OrganisationDescription,
                    //ContactName = post.? //Contact details contains all of these
                    //PhoneNumber = post.?
                    Email = "email@placeholder.com", //placeholder to make sure validation passes
                    Website = post.Website,
                    Postcode = post.Postcode,
                    TellUsMore = post.TellUsMore,
                    Longitude = post.Location.Lon,
                    Latitude = post.Location.Lat
                };

                extractSupplierType(post, newSupplier);
                newSupplier.SupplierPpeTypes = extractSupplierPpeType(post);

                SupplierNote noteContact = new SupplierNote();
                noteContact.Note.Timestamp = post.DateTime;
                noteContact.Note.Text = post.ContactDetails;
                //noteContact.Note.User = // how do we get the AppUser in here? Admin user?
                newSupplier.SupplierNotes.Add(noteContact);

                SupplierNote noteCapacity = new SupplierNote();
                noteCapacity.Note.Timestamp = post.DateTime;
                noteCapacity.Note.Text = post.Capacity;
                //noteContact.Note.User = // how do we get the AppUser in here? Admin user?
                newSupplier.SupplierNotes.Add(noteCapacity);

                supplierList.Add(newSupplier);
            }

            return supplierList;
        }


        static void extractSupplierType(SuppliesPost post, Supplier newSupplier)
        {
            if (Enum.TryParse(post.OrganisationType, out SupplierTypes supplierType))
            {
                newSupplier.SupplierTypeId = (int)supplierType;

            }
            else //fall back is orgtype id isn't found
            {
                newSupplier.SupplierTypeId = (int)SupplierTypes.Other;
            }

            newSupplier.SupplierTypeOther = post.OtherOrganisationType;
        }

        static List<SupplierPpeType> extractSupplierPpeType(SuppliesPost post)
        {
            List<SupplierPpeType> ppeList = new List<SupplierPpeType>();

            foreach (string ppe in post.PpeTypes)
            {
                SupplierPpeType supplyPpe = new SupplierPpeType();

                if (Enum.TryParse(ppe, out PpeTypes ppeType))
                {
                    supplyPpe.PpeTypeId = (byte)ppeType;

                    if (ppeType == PpeTypes.Other)
                    {
                        supplyPpe.PpeTypeOther = post.OtherPpeTypes; //only add other if ppetype is other
                    }
                }
                else //fallback in case some ppe doesn't match our enums
                {
                    supplyPpe.PpeTypeId = (int)PpeTypes.Other;
                    supplyPpe.PpeTypeOther = post.OtherPpeTypes;
                }

                ppeList.Add(supplyPpe);
            }

            return ppeList;
        }
    }


}
