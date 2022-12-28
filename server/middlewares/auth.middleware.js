export const userAuth = (req, res, next) => {
  //   req === object
  //   res === object
  // Do some Auth to user by the req.body
  req.body.last = 'Due';
  // console.log('im in the middleware');
  if (req.body.name === 'Bob') {
    res.send('Cannot do');
    return;
  }
  next();
};
