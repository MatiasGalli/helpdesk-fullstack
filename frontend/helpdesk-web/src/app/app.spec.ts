import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

// NOTE: In this project the root component is named `App` (standalone)
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navbar brand', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const text = (fixture.nativeElement.textContent as string) ?? '';
    expect(text).toContain('HelpDesk');
  });
});
