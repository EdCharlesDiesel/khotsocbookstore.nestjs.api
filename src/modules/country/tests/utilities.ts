import * as _ from 'lodash';
import moment from 'moment';

export function generateFakeCountry(count = 1) {
  return _.range(0, count).map((i) => ({
    email: `test${i}@test.fr`,
    title: 'test title' + i,
    publishedDate: moment().format('YYYY-MM-DD'),
    retailPrice: 'dqzwfesgxrdhtfyjdg',
    coverFileName: 'pic.jpg',
    cost: 300,
    userId: 'Khotso Mokhethi'
  }));
}
