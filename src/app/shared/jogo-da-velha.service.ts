import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JogoDaVelhaService {

  private readonly TAM_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private board: any;
  private numMovements: number = 0;
  private winning: any;

  private _player: number = 0;
  private _showInitial: boolean = false;
  private _showBoard: boolean = true;
  private _showEnd: boolean = true;


  constructor() { }

  public initialize(): void {
    this._showInitial = true;
    this._showBoard = false;
    this._showEnd = false;
    this.numMovements = 0;
    this._player = this.X;
    this.winning = false;
    this.initializeBoard();
  }

  public initializeBoard(): void {
    this.board = [this.TAM_TAB];
    for (let i = 0; i < this.TAM_TAB; i++) {
      this.board[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  get showInitial(): boolean {
    return this._showInitial;
  }

  get showBoard(): boolean {
    return this._showBoard;
  }

  get showEnd(): boolean {
    return this._showEnd;
  }

  get player(): number {
    return this._player;
  }

  public initialPlay(): void {
    this._showInitial = false;
    this._showBoard = true;
  }

  public play(posX: number, posY: number): void {
    if (this.board[posX][posY] !== this.EMPTY || this.winning) {
      return
    }
    this.board[posX][posY] = this._player;
    this.numMovements++;
    this.winning = this.endGame(posX, posY, this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;

    if (!this.winning && this.numMovements < 9) {
      this.cpuPlay();
    }

    if (this.winning !== false) {
      this._showEnd = true;
    }

    if (!this.winning && this.numMovements === 9) {
      this._player = 0;
      this._showEnd = true;
    }
  }

  public endGame(line: number, col: number, board: any, player: number) {
    let end: any = false;

    if (board[line][0] === player &&
      board[line][1] === player &&
      board[line][2] === player) {
      end = [[line, 0], [line, 1], [line, 2]];
    } else if (board[0][col] === player &&
      board[1][col] === player &&
      board[2][col] === player) {
      end = [[0, col], [1, col], [2, col]];
    } else if (board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) {
      end = [[0, 0], [1, 1], [2, 2]];
    } else if (board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player) {
      end = [[0, 2], [1, 1], [2, 0]];
    }
    return end;
  }

  public cpuPlay(): void {
    let played: number[] = this.getPlay(this.O);

    if(played.length <= 0) {
      let playeds: any = [];
      for(let i = 0; i < this.TAM_TAB; i++){
        for (let j = 0; j < this.TAM_TAB; j++){
          if(this.board[i][j] === this.EMPTY){
            playeds([i,j])
          }
        }
      }
      let k = Math.floor((Math.random() * (playeds.lenght -1)));
      played = [playeds[k][0], playeds[k][1]];
    }

    this.board[played[0]][played[1]] = this._player;
    this.numMovements++;
    this.winning = this.endGame(played[0], played[1],
        this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;
  }

  public getPlay(player: number) : number[] {
    let tab = this.board;
    for (let lin = 0; lin < this.TAM_TAB; lin++) {
      for (let col = 0; col < this.TAM_TAB; col++) {
        if (tab[lin][col] !== this.EMPTY) {
          continue;
        }
        tab[lin][col] = player;
        if (this.endGame(lin, col, tab, player)) {
          return [lin, col];
        }
        tab[lin][col] = this.EMPTY;
      }
    }
    return [];
  }

  public showX(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.X;
  }

  public showO(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.O;
  }

  public showWinning(posX: number, posY: number): boolean {
    let showWinning: boolean = false;

    if (!this.winning) {
      return showWinning;
    }

    for (let pos of this.winning) {
      if (pos[0] === posX && pos[1] === posY) {
        showWinning = true;
        break;
      }
    }
    return showWinning;
  }

  public newPlay(): void {
    this.initialize();
    this._showEnd = false;
    this._showInitial = false;
    this._showBoard = true;
  }
}
