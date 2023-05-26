import * as _ from 'lodash';
import moment from 'moment';

export function generateFakeCart(count = 1) {
  return _.range(0, count).map((i) => ({
    email: `test${i}@test.fr`,
    firstName: 'picsou' + i,
    lastName: 'gold' + i,
    password: 'dqzwfesgxrdhtfyjdg',
    birthday: moment().format('YYYY-MM-DD'),
  }));
}
