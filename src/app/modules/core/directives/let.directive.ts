import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
    /* This enables "let" syntax */
    $implicit: T;
    /* This enables "as" syntax */
    appLet: T;
}

@Directive({
    selector: '[appLet]'
})
export class LetDirective<T> {

    @Input() set appLet(value: T) {
        this.viewRef.createEmbeddedView(this.templateRef, {$implicit: value, appLet: value});
    }

    constructor(private readonly viewRef: ViewContainerRef,
                private readonly templateRef: TemplateRef<LetContext<T>>) {
    }
}
