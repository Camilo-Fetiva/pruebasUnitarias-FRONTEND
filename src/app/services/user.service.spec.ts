import { TestBed } from '@angular/core/testing';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

describe('UserService', () => {
  let _service: UserService;
  

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserService] });
    _service = TestBed.inject(UserService);
  });

  
});
