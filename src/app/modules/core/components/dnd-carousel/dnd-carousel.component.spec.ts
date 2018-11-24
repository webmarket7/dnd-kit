import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DndCarouselComponent } from './dnd-carousel.component';

describe('DndCarouselComponent', () => {
  let component: DndCarouselComponent;
  let fixture: ComponentFixture<DndCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DndCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DndCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
