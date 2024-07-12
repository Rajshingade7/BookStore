import { mount } from '@vue/test-utils';
import Testing from '../Testing.vue';
import { describe, it, expect } from '@jest/globals';
describe('Testing.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = mount(Testing );
    expect(wrapper.exists()).toBe(true);

  });
});


