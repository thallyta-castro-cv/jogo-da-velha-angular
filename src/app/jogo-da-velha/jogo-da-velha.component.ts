import { Component, OnInit } from '@angular/core';
import { JogoDaVelhaService } from '../shared/jogo-da-velha.service';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.scss']
})
export class JogoDaVelhaComponent implements OnInit {

  constructor( private jogoDaVelhaService: JogoDaVelhaService) { }

  ngOnInit(): void {
    this.jogoDaVelhaService.initialize();
  }

  get showInitial(): boolean {
  	return this.jogoDaVelhaService.showInitial;
  }

  get showBoard(): boolean {
  	return this.jogoDaVelhaService.showBoard;
  }

  get showEnd(): boolean {
  	return this.jogoDaVelhaService.showEnd;
  }

  get player(): number {
  	return this.jogoDaVelhaService.player;
  }

  public initialPlay(): void {
  	this.jogoDaVelhaService.initialPlay();
  }

  public play(posX: number, posY: number): void {
  	this.jogoDaVelhaService.play(posX, posY);
  }

  public showX(posX: number, posY: number): boolean {
  	return this.jogoDaVelhaService.showX(posX, posY);
  }

  public showO(posX: number, posY: number): boolean {
  	return this.jogoDaVelhaService.showO(posX, posY);
  }

  public showWinning(posX: number, posY: number): boolean {
  	return this.jogoDaVelhaService.showWinning(posX, posY);
  }

  public newPlay(): void {
  	this.jogoDaVelhaService.newPlay();
  }
}
