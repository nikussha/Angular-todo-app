import { ThemeService } from './theme.service';
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input() isHighlighted = false;
  constructor(private el: ElementRef, private serv: ThemeService) {}
  ngOnChanges(changes: SimpleChanges): void {}
}
