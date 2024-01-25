import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pokemons: any;
  selectedPokemon: any | null = null;
  image: any;
  numberPage: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  async loadPokemons() {
    try {
      let cachePokemons = this.localStorage.select('pokemons');
      let token;
      let response;

      if (cachePokemons) {
        this.pokemons = cachePokemons;
        return;
      }

      token = this.authService.isToken();
      response = await this.apiService.getPokemonList(token).toPromise();

      if (response) {
        this.pokemons = response;
        this.localStorage.insert('pokemons', this.pokemons);
        console.log('loadPokemons', this.pokemons);
      }
    } catch (e: any) {
      console.error('loadPokemons', e.error);
    }
  }

  async loadMorePokemons() {
    try {
      let cachePokemons = this.localStorage.select('pokemons');
      let page = `page-${this.numberPage}`;
      let token;
      let response;

      if (cachePokemons) {
        let currentPage = this.numberPage * 20 < cachePokemons.results.length;

        if (currentPage) {
          this.pokemons = cachePokemons;
          return;
        }
      }

      token = this.authService.isToken();
      response = await this.apiService.getPokemonListMore(token, page).toPromise();

      if (response) {
        console.log('response', {response, p: this.pokemons.results[page], page });
        this.pokemons.results['page-0'] = [ ...this.pokemons.results['page-0'], ...response];
        this.localStorage.update('pokemons', this.pokemons);
        console.log('pokemons', this.pokemons.results[page]);
        this.numberPage++;
      }
      console.log('contador', this.numberPage)
    } catch (e: any) {
      console.error('loadMorePokemons', e.error);
    }
  }

  async selectPokemon(pokemon: any) {
    this.selectedPokemon = pokemon;
    console.log('selectPokemon', this.selectedPokemon);
  }

  closeDetailModal(): void {
    this.selectedPokemon = null;
  }

  async logOut () {
    let response = await this.authService.logout();
    if (response) {
      this.localStorage.remove('pokemons');
      this.router.navigate(['/login']);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Lógica para cargar más pokémons cuando se hace scroll hacia abajo
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 200) {
      this.loadMorePokemons();
    }
  }

}
