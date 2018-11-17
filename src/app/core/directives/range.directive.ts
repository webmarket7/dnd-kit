import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { range } from 'lodash';

interface RangeContext {
    $implicit: number;
    index: number;
    first: boolean;
    last: boolean;
    even: boolean;
    odd: boolean;
}

@Directive({
    selector: '[appRange]'
})
export class RangeDirective {

    @Input()
    set appRange(value: number[] | number) {
        this.viewRef.clear();
        const arr = range(value);

        arr.forEach((itemNumber: number, index: number) => {
            const even = index % 2 === 0;

            this.viewRef.createEmbeddedView(this.templateRef, {
                $implicit: itemNumber,
                index,
                first: index === 0,
                last: index === range.length - 1,
                even,
                odd: !even
            }, index);
        });
    }

    constructor(private viewRef: ViewContainerRef,
                private templateRef: TemplateRef<RangeContext>) {
    }
}
