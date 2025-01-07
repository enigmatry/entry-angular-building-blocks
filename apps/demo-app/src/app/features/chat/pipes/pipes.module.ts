import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownPipe } from './markdown.pipe';

@NgModule({
    declarations: [
        MarkdownPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MarkdownPipe
    ]
})
export class PipesModule { }