namespace SofthemeClassBooking_DAL
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Event")]
    public partial class Event
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Event()
        {
            Participants = new HashSet<Participant>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(128)]
        public string AuthorId { get; set; }

        public int ClassRoomId { get; set; }

        [StringLength(50)]
        public string Organizer { get; set; }

        public DateTime BeginingDate { get; set; }

        public DateTime EndingDate { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        public bool? IsPublic { get; set; }

        public bool? IsAuthorShown { get; set; }

        public virtual AspNetUser AspNetUser { get; set; }

        public virtual ClassRoom ClassRoom { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Participant> Participants { get; set; }
    }
}
