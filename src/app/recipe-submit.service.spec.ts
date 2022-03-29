import { TestBed } from '@angular/core/testing';

import { RecipeSubmitService } from './recipe-submit.service';

describe('RecipeSubmitService', () => {
  let service: RecipeSubmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeSubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
