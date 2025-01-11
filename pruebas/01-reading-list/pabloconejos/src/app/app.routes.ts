import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { BooksComponent } from './books/components/books/books.component';

export const routes: Routes = [
    { path: '', component: BooksComponent}
];
