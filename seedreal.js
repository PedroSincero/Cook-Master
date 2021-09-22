// const serialize = (db) => {
//   const { name, email, _id, role } = db;
//   return {
//     name,
//     email, 
//     role,
//     _id,
//   };
// };

// const userADMIN = async (name, email, password) => {
//   const addADMIN  = await db.collection('users').insertOne({ name, email, password, role: 'admin' });
//   const result = addADMIN .ops;
//   return result.map(serialize);
// }

// module.exports = {
//   userADMIN
// };