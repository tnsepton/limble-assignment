import { TaggedUsersPipe } from './tagged-users.pipe';

describe('TaggedUsersPipe', () => {
  it('create an instance', () => {
    const pipe = new TaggedUsersPipe();
    expect(pipe).toBeTruthy();
  });
});
