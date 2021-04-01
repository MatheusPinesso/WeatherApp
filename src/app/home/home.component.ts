import { Component, OnInit, ɵɵqueryRefresh } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { resetNativeView } from "@nativescript/core/ui/text-base";
import { FormGroup } from "@angular/forms";
import { Image, Page } from "tns-core-modules";
import { getLocaleNumberSymbol } from "@angular/common";


@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ['home-component.css']
})
export class HomeComponent implements OnInit {


    constructor(
        private http:HttpClient,
        private page:Page
    ) {
    }
    
    

    previsaoTempo;

    ngOnInit() {
    this.getData()
    setInterval(() => this.getData(), 1200000)
     
    }

    getData() {
        var that = this
        that.http.get('https://api.hgbrasil.com/weather?key=2779197c&user_ip=remote')
           .pipe(
            map((resp)=>{
                this.previsaoTempo = resp
                this.trocarFoto()
                console.log('Dados atualizados')
                

            })
            ).subscribe()
                 
    }


    
    trocarFoto() {
      var img =  this.page.getViewById("imagemFundo") as Image
      console.log("Fundo Atualizado")
      var previsao = this.previsaoTempo.results.description
      
    if (previsao == "Ensolarado com muitas nuvens") {
        img.src = "~/images/ensolaradocomnuvens2.png"
    }
    if (previsao == "Ensolarado") {
        img.src = "~/images/ensolarado3.png"
    }
    if (previsao == "Tempo limpo") {
        img.src = "~/images/ensolarado3.png"
    }
    if (previsao == "Parcialmente nublado") {
        img.src = "~/images/parcialmentenublado3.png"
    }
    if (previsao == "Tempestades isoladas" ) {
        img.src = "~/images/chuva2.png"
    }
    if (previsao == "Tempestades") {
        img.src = "~/images/chuva2.png"
    }
    if (previsao == "Tempo nublado") {
        img.src = "~/images/parcialmentenublado3.png"
    }
};

    
}


