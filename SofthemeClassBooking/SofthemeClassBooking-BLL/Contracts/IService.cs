using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace SofthemeClassBooking_BLL.Contracts
{
    public interface IService<TEntity>
    {
        void Add(TEntity classRoom);
        void Remove(TEntity classRoom);
        void Update(TEntity classRoom);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetMany(Expression<Func<TEntity, bool>> where);
    }
}
