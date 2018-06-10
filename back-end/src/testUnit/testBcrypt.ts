import * as bcrypt from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = '123123123';
const someOtherPlaintextPassword = 'not_bacon';

const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

const v1 = bcrypt.compareSync(myPlaintextPassword, hash);
const v2 = bcrypt.compareSync(someOtherPlaintextPassword, hash);

console.log(salt);
console.log(hash);

console.log(v1);
console.log(v2);
