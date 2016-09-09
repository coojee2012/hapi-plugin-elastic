/**
 * Created by linyong on 9/7/16.
 */
import assert from 'assert';
import ElasticClient from '../src';

describe('hapi-plugin-elastic', () => {
  it('isArray', done => {
    assert.equal('function',typeof ElasticClient);
    done()
  });
});