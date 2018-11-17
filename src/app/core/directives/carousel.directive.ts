import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

interface CarouselContext {
    $implicit: any;
    controller: {
        prev: () => void,
        next: () => void
    };
}

@Directive({
    selector: '[appCarousel]'
})
export class CarouselDirective implements OnInit, OnDestroy {

    context: CarouselContext | null = null;
    index = 0;
    timerId: number | null = null;

    @Input('appCarouselFrom') images: string[];

    /* Allow to override default autoplay delay */
    @Input('appCarouselWithdelay') withDelay: number;

    /* Allow to toggle carousel autoplay */
    @Input('appCarouselAutoplay')
    set autoplay(autoplay: 'on' | 'off') {
        autoplay === 'on' ? this.setAutoplayTimer() : this.clearAutoplayTimer();
    }

    constructor(private readonly viewRef: ViewContainerRef,
                private readonly templateRef: TemplateRef<CarouselContext>) {
    }

    ngOnInit(): void {
        this.context = {
            $implicit: this.images[0],
            controller: {
                prev: () => this.prev(),
                next: () => this.next()
            }
        };

        this.viewRef.createEmbeddedView(this.templateRef, this.context);
    }

    ngOnDestroy(): void {
        this.clearAutoplayTimer();
    }

    next(): void {
        this.index++;
        if (this.index >= this.images.length) {
            this.index = 0;
        }
        this.context.$implicit = this.images[this.index];
    }

    prev(): void {
        this.index--;
        if (this.index < 0) {
            this.index = this.images.length - 1;
        }
        this.context.$implicit = this.images[this.index];
    }

    private clearAutoplayTimer(): void {
        window.clearInterval(this.timerId);
    }

    private setAutoplayTimer(): void {
        this.timerId = window.setInterval(() => this.next(), this.withDelay || 1000);
    }
}
