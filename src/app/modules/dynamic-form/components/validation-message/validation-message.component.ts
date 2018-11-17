import { Component, Input } from '@angular/core';

@Component({
    selector: 'validation-message',
    templateUrl: './validation-message.component.pug',
    styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {
    @Input() controlKey: string;
    @Input() groupName?: string;
}
