﻿using System;

namespace R2.Domain.Entity
{
    public abstract class TAggregate
    {
        public TAggregate()
        {
            
        }
        public Guid Id { get; set; }
    }
}
