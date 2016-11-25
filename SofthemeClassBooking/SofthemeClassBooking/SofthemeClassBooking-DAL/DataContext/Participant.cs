namespace SofthemeClassBooking_DAL
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Participant")]
    public partial class Participant
    {
        public int Id { get; set; }

        [Required]
        [StringLength(60)]
        public string Name { get; set; }

        public int EventId { get; set; }

        public virtual Event Event { get; set; }
    }
}
