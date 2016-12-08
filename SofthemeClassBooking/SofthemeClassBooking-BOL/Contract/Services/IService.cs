using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace SofthemeClassBooking_BOL.Contract.Services
{
    public interface IService<TModel>
    {
        void Add(TModel classRoom);
        void Remove(TModel classRoom);
        void Update(TModel classRoom);
        IEnumerable<TModel> Get();
        IEnumerable<TModel> Get(Expression<Func<TModel, bool>> where);
    }
}
