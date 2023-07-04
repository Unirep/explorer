const shortenId = (id, isMobile) => {
  if (isMobile) return id.slice(0, 5) + '...' + id.slice(-2)
  else return id.slice(0, 7) + '...' + id.slice(-5)
}

export default shortenId
