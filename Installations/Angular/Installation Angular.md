# Créer un nouveau projet Angular

Ce guide résume comment installer **Angular** pour un **nouveau projet** avec le routing et la gestion d'état.

---

## 1. Créer l'application Angular

```bash
npx @angular/cli@latest new my-app
cd my-app
```

**Options lors de la création :**

- **Would you like to add Angular routing?** → Yes
- **Which stylesheet format would you like to use?** → CSS (ou SCSS, SASS, LESS selon vos préférences)

**Pour un projet existant, ajouter le routing :**

```bash
ng generate module app-routing --flat --module=app
```

## 2. Configuration du routing

Le routing est automatiquement configuré si vous avez choisi "Yes" lors de la création. Sinon, voici la configuration manuelle.

```typescript
// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## 3. Intégrer le routing dans l'application

```html
<!-- src/app/app.component.html -->
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>

<router-outlet></router-outlet>
```

## 4. Créer les composants de pages

```bash
ng generate component pages/home
ng generate component pages/about
```

## 5. Ajouter NgRx pour la gestion d'état

```bash
ng add @ngrx/store@latest
ng add @ngrx/store-devtools@latest
```

## 6. Créer un state avec NgRx

```bash
ng generate store State --root --module app.module.ts
```

### Exemple d'actions

```typescript
// src/app/store/counter/counter.actions.ts
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
```

### Exemple de reducer

```typescript
// src/app/store/counter/counter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export interface CounterState {
  value: number;
}

export const initialState: CounterState = {
  value: 0
};

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, value: state.value + 1 })),
  on(decrement, (state) => ({ ...state, value: state.value - 1 })),
  on(reset, (state) => ({ ...state, value: 0 }))
);
```

### Exemple de selector

```typescript
// src/app/store/counter/counter.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCount = createSelector(
  selectCounterState,
  (state: CounterState) => state.value
);
```

### Configuration du store

```typescript
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { counterReducer } from './store/counter/counter.reducer';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ counter: counterReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 7. Exemple d'utilisation dans un composant

```typescript
// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../../store/counter/counter.actions';
import { selectCount } from '../../store/counter/counter.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  count$: Observable<number>;

  constructor(private store: Store) {
    this.count$ = this.store.select(selectCount);
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
```

```html
<!-- src/app/pages/home/home.component.html -->
<div>
  <h1>Counter: {{ count$ | async }}</h1>
  <button (click)="increment()">+</button>
  <button (click)="decrement()">-</button>
  <button (click)="reset()">Reset</button>
</div>
```

## 8. Lancer l'application

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200`

## 📚 Liens utiles

- [Angular (officiel)](https://angular.io/)
- [Angular Router](https://angular.io/guide/router)
- [NgRx](https://ngrx.io/)
- [Angular CLI](https://angular.io/cli)