﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace SofthemeClassBooking_BOL.Contract.Services
{
    public interface IService<TModel>
    {
        void Add(TModel model);
        void Remove(TModel model);
        IEnumerable<TModel> Get();
    }
}
