using System;
using System.Collections.Generic;
using R2.Domain.Entity;

namespace R2.ML.DeepLearning.Database {
    public class User : TAggregate {
        public User () {
            this.Images = new List<UserImage> ();
        }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Pk { get; set; }
        public string Application { get; set; }
        public virtual ICollection<UserImage> Images { get; set; }
    }

    public class UserImage: TAggregate {
        public string PictureUrl { get; set; }
        public string ImagePath { get; set; }
        public string Identifier { get; set; }
        public bool IsImageLoaded { get; set; }
        public virtual User User { get; set; }
        public virtual Guid UserId { get; set; }
    }

}