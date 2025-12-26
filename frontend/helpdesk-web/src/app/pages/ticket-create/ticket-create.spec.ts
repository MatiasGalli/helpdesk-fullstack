import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TicketCreate } from './ticket-create';

describe('TicketCreate', () => {
  let component: TicketCreate;
  let fixture: ComponentFixture<TicketCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCreate],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
