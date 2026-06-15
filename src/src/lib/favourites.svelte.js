import { browser } from '$app/environment';

class FavouritesStore {
    items = $state([]);

    constructor() {
        //Load localstorage when in browser
        if (browser) {
            const stored = localStorage.getItem('favourites');
            if (stored) {
                this.items = JSON.parse(stored);
            }
        }
    }

   //Help method
    has(id) {
        return this.items.includes(id);
    }


    toggle(id) {
        if (this.has(id)) {
            this.items = this.items.filter(x => x !== id);
        } else {
            this.items = [...this.items, id];
        }

        //Browser is true, as soon the script has loaded in the browser
        if (browser) {
            localStorage.setItem('favourites', JSON.stringify(this.items));
        }
    }
}
//Export Singleton so every component has the same status
export const favouritesStore = new FavouritesStore();