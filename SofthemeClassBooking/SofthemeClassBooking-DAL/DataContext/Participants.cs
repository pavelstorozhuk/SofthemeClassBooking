namespace SofthemeClassBooking_DAL
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Participants
    {
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Email { get; set; }

        public int EventId { get; set; }

        public virtual Events Events { get; set; }
    }
}
