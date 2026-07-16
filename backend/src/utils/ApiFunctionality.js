class ApiFunctionality {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  // implementing search function
  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    //Stores all data of quertStr
    const queryCopy = { ...this.querystr };

    // Setting which parameters to be remove
    const removeFields = ["keyword", "page", "limit"];

    // this helps in removing each parameter
    removeFields.forEach((key) => delete queryCopy[key]);

    // finally gives us required parameter
    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

export default ApiFunctionality;
