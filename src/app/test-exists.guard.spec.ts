import { TestBed } from '@angular/core/testing';

import { TestExistsGuard } from './test-exists.guard';

describe('TestExistsGuard', () => {
  let guard: TestExistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TestExistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
