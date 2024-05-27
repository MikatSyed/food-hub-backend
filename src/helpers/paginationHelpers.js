


const calculateQuery = (options) => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)
  const skip = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'asc'
  const minPrice = options.minPrice
  const maxPrice = options.maxPrice

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
  }
}

export const queryHelpers = {
  calculateQuery,
}
