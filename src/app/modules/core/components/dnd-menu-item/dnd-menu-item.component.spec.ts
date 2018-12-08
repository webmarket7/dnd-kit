import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DndMenuItemComponent } from './dnd-menu-item.component';

describe('DndMenuItemComponent', () => {
  let component: DndMenuItemComponent;
  let fixture: ComponentFixture<DndMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DndMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DndMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
