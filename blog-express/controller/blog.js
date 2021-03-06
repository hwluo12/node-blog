const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1`
  if (author) {
    sql += ` and author like '%${author}%'`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ' order by createtime desc;';
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id=${id};`
  return exec(sql).then(rows => rows[0]);
}

const newBlog = (blogData = {}, author) => {
  const title = xss(blogData.title);
  const content = blogData.content;
  const createTime = Date.now();
  const sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${createTime})`
  console.log('sql is ', sql);

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    };
  })
}

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title
  const content = blogData.content

  const sql = `update blogs set title='${title}', content='${content}' where id=${id};`

  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    } else {
      return false
    }
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}';`;

  return exec(sql).then(deleteResult => {
    if (deleteResult.affectedRows > 0) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}