using Microsoft.EntityFrameworkCore;

namespace Web.Db
{
    public partial class DataContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
			optionsBuilder.UseLoggerFactory(MyLoggerFactory);
        }

        /// <summary>
        /// N.B. we use NuGet Bricelam.EntityFrameworkCore.Pluralizer
        /// to give us plural table and entity set names, with singular entity names 
        /// </summary>
        void configureDomain(ModelBuilder mb)
        {
            mb.Entity<ContactSubmission>(ent =>
            {
                ent.Property(e => e.Email).HasMaxLength(320);
                ent.Property(e => e.EmailedTo).HasMaxLength(2000);
                ent.Property(e => e.Name).HasMaxLength(100);
            });

            mb.Entity<Need>(ent =>
            {
                ent.Property(e => e.ContactName).IsRequired().HasMaxLength(100);
                ent.Property(e => e.Department).HasMaxLength(200);
                ent.Property(e => e.Email).IsRequired().HasMaxLength(320);
                ent.Property(e => e.JobTitle).HasMaxLength(100);
                ent.Property(e => e.Latitude).HasColumnType("decimal(9, 6)");
                ent.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");
                ent.Property(e => e.OrgTypeOther).HasMaxLength(300);
                ent.Property(e => e.OrganisationName).HasMaxLength(200);
                ent.Property(e => e.PhoneNumber).HasMaxLength(100);
                ent.Property(e => e.Postcode).IsRequired().HasMaxLength(8);
                ent.Property(e => e.TownOrCity).HasMaxLength(200);
            });

            mb.Entity<Note>(ent =>
            {
                ent.HasOne(d => d.User)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Notes_Users");
            });

            mb.Entity<NeedNote>(ent =>
            {
                ent.HasKey(e => new { e.NeedId, e.NoteId });
                ent.HasOne(d => d.Need)
                    .WithMany(p => p.NeedNotes)
                    .HasForeignKey(d => d.NeedId)
                    .HasConstraintName("FK_NeedNotes_Needs");
                ent.HasOne(d => d.Note)
                    .WithMany(p => p.NeedNotes)
                    .HasForeignKey(d => d.NoteId)
                    .HasConstraintName("FK_NeedNotes_Notes");
            });

            mb.Entity<NeedPpeType>(ent =>
            {
                ent.HasKey(e => new { e.NeedId, e.PpeTypeId });
                ent.Property(e => e.DailyShortageForWhom).HasMaxLength(500);
                ent.Property(e => e.SupplierOther).HasMaxLength(500);
                ent.HasOne(d => d.Need)
                    .WithMany(p => p.NeedPpeTypes)
                    .HasForeignKey(d => d.NeedId)
                    .HasConstraintName("FK_NeedPpeTypes_Needs");
                ent.HasOne(d => d.PpeType)
                    .WithMany(p => p.NeedPpeTypes)
                    .HasForeignKey(d => d.PpeTypeId)
                    .HasConstraintName("FK_NeedPpeTypes_PpeTypes");
                ent.HasOne(d => d.Supplier)
                    .WithMany(p => p.NeedPpeTypes)
                    .HasForeignKey(d => d.SupplierId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_NeedPpeTypes_Suppliers");
            });

            mb.Entity<PostcodeRegion>(ent =>
            {
                ent.HasKey(e => e.Postcode);
                ent.Property(e => e.Postcode).IsRequired().HasMaxLength(8);
                ent.Property(e => e.NhsRegionId).IsRequired();
            });

            mb.Entity<PpeType>(ent =>
            {
                ent.Property(e => e.Name).HasMaxLength(200);
            });

			mb.Entity<Request>(ent =>
			{
				ent.HasNoKey();
				ent.ToView("Requests");
				//ent.Property(e => e.ContactName)
				//	.IsRequired()
				//	.HasMaxLength(100);
				//ent.Property(e => e.DailyShortageForWhom).HasMaxLength(500);
				//ent.Property(e => e.Department).HasMaxLength(200);
				//ent.Property(e => e.Email)
				//	.IsRequired()
				//	.HasMaxLength(320);
				//ent.Property(e => e.JobTitle).HasMaxLength(100);
				//ent.Property(e => e.Latitude).HasColumnType("decimal(9, 6)");
				//ent.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");
				//ent.Property(e => e.OrgTypeOther).HasMaxLength(300);
				//ent.Property(e => e.OrganisationName).HasMaxLength(200);
				//ent.Property(e => e.PhoneNumber).HasMaxLength(100);
				//ent.Property(e => e.Postcode)
				//	.IsRequired()
				//	.HasMaxLength(8);
				//ent.Property(e => e.SupplierName).HasMaxLength(200);
				//ent.Property(e => e.SupplierOther).HasMaxLength(500);
				//ent.Property(e => e.TownOrCity).HasMaxLength(200);
				//ent.Property(e => e.UserName).HasMaxLength(256);
			});

            mb.Entity<Supplies>(ent =>
            {
                ent.HasNoKey();
                ent.ToView("Supplies");
            });

                mb.Entity<Supplier>(ent =>
            {
                ent.Property(e => e.ContactName).HasMaxLength(100);
                ent.Property(e => e.Email).HasMaxLength(320);
                ent.Property(e => e.Latitude).HasColumnType("decimal(9, 6)");
                ent.Property(e => e.Longitude).HasColumnType("decimal(9, 6)");
                ent.Property(e => e.Name).HasMaxLength(200);
                ent.Property(e => e.PhoneNumber).HasMaxLength(100);
                ent.Property(e => e.Postcode).HasMaxLength(8);
                ent.Property(e => e.SupplierTypeOther).HasMaxLength(300);
                ent.Property(e => e.Website).HasMaxLength(2084);
            });

            mb.Entity<SupplierNote>(ent =>
            {
                ent.HasKey(e => new { e.SupplierId, e.NoteId });
                ent.HasOne(d => d.Note)
                    .WithMany(p => p.SupplierNotes)
                    .HasForeignKey(d => d.NoteId)
                    .HasConstraintName("FK_SupplierNotes_Notes");
                ent.HasOne(d => d.Supplier)
                    .WithMany(p => p.SupplierNotes)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK_SupplierNotes_Needs");
            });

            mb.Entity<SupplierPpeType>(ent =>
            {
                ent.HasKey(e => new { e.SupplierId, e.PpeTypeId });
                ent.Property(e => e.CostTypeOther).HasMaxLength(500);
                ent.HasOne(d => d.PpeType)
                    .WithMany(p => p.SupplierPpeTypes)
                    .HasForeignKey(d => d.PpeTypeId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_SupplierPpeTypes_PpeTypes");
                ent.HasOne(d => d.Supplier)
                    .WithMany(p => p.SupplierPpeTypes)
                    .HasForeignKey(d => d.SupplierId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_SupplierPpeTypes_Suppliers");
            });
        }
    }
}