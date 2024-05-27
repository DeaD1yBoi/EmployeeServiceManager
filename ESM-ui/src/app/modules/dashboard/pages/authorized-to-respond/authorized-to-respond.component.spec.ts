import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedToRespondComponent } from './authorized-to-respond.component';

describe('AuthorizedToRespondComponent', () => {
  let component: AuthorizedToRespondComponent;
  let fixture: ComponentFixture<AuthorizedToRespondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizedToRespondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorizedToRespondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
