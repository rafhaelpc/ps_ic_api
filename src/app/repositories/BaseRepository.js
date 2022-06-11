const db = require('../../database');

class BaseRepository {
  table = null;

  /**
   * 
   * @param {*} request 
   * @returns 
   */
  findAll(request) {
    const { page = 1, sort } = request.query;
    const filter = Object.entries(request.query).filter(([key]) => !['page', 'sort'].includes(key));
    return this.paginate({ page, sort, filter });
  }

  /**
   * 
   * @param {*} sort 
   * @returns 
   */
  getSortSql(sort) {
    const sortOptions = sort;
    const [field, type = 'asc'] = sortOptions ? sortOptions.split(':') : [];

    if (!!field && !!type) {
      return `order by ${field} ${type}`;
    }


    return '';
  }

  /**
   * 
   * @param {*} filter : ;
   * @returns 
   */
  getFilterSql(filter) {
    let query = null;


    for (const [key, value] of filter) {
      if (!query) {
        query = 'where '
      } else {
        query += ' and '
      }

      query += `${key} ilike '%${value}%'`
    }

    if (!query) {
      return ''
    }

    return query;
  }

  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async paginate({ page = 1, limit = 10, sort = null, filter = null }) {
    const offset = (page - 1) * limit;


    let countQuery = `select count(1) from ${this.table} ${this.getFilterSql(filter)}`;
    let mainQuery = `select * from ${this.table} ${this.getFilterSql(filter)} ${this.getSortSql(sort)} limit ${limit} offset ${offset}`;

    const querys = await Promise.all([
      db.query(countQuery),
      db.query(mainQuery)
    ])

    const totalItems = querys[0][0].count;
    const rows = querys[1];

    let totalPages = totalItems / limit;
    if (totalItems % limit) totalPages = Math.ceil(totalPages);

    return {
      content: rows,
      meta: {
        itemsPerPage: limit,
        totalItems: Number(totalItems),
        currentPage: Number(page),
        totalPages: totalPages
      }
    };
  }
}

module.exports = BaseRepository;