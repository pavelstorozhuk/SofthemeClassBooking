namespace SofthemeClassBooking_DAL
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Events
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Events()
        {
            Participants = new HashSet<Participants>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(128)]
        public string UserId { get; set; }

        public int ClassRoomId { get; set; }

        [StringLength(50)]
        public string Organizer { get; set; }

        public DateTime BeginingDate { get; set; }

        public DateTime EndingDate { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        public bool IsPrivate { get; set; }

        public bool IsAuthorShown { get; set; }

        public bool IsParticipantsAllowed { get; set; }

        public virtual AspNetUsers AspNetUsers { get; set; }

        public virtual ClassRooms ClassRooms { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Participants> Participants { get; set; }
    }
}
