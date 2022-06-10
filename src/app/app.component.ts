import { Component } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Role} from "./model/role";
import {RoleService} from "./service/role.service";
import {ClientFonctionalite} from "./model/client-fonctionalite";
import {ThemePalette} from "@angular/material/core";
import {ClientService} from "./service/client.service";
import {HttpErrorResponse} from "@angular/common/http";
import {GestionAccessControl} from "./model/gestion-access-control";
import {GestionAccessControlService} from "./service/gestionAccessControl.service";
import {InterventionFonctionalite} from "./model/intervention-fonctionalite";
import {InterventionFonctionalitesService} from "./service/interventionFonctionalites.service";
import {concat, concatMap, mergeMap, mergeWith, pipe} from "rxjs";
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testApp';
  public role: Role = {};
  public clientFonctionalites : ClientFonctionalite= {};
  public gestion : GestionAccessControl ={};
  public interventionFonctionalite : InterventionFonctionalite = {};
  parentSelectorClient: boolean = false;
  parentSelectorIntervention: boolean = false;
  roleForm = new FormGroup({
    nom : new FormControl(''),
    description : new FormControl(''),
    gestionAccessControl : new FormControl(''),
    client : new FormGroup({
      ajouter_client : new FormControl(''),
      modifier_client : new FormControl(''),
      supprimer_client : new FormControl('')
    }),
    intervention : new FormGroup({
      ajouter_intervention : new FormControl(''),
      modifier_intervention : new FormControl(''),
      supprimer_intervention : new FormControl('')
    })
  });
  private result: InterventionFonctionalite;


  constructor(private clientService: ClientService,
  private roleService: RoleService,
  private gestionAccessControlService : GestionAccessControlService,
  private interventionFonctionaliteService: InterventionFonctionalitesService,){}
 public onAddRole(addForm: FormGroup): void {
    console.log("Role form ",addForm.value);
    //Functionality Client
    this.clientFonctionalites.ajouter_client = this.roleForm.value.client.ajouter_client;
      this.clientFonctionalites.modifier_client = this.roleForm.value.client.modifier_client;
      this.clientFonctionalites.supprimer_client = this.roleForm.value.client.supprimer_client;
    console.log("client fonctionalite",this.clientFonctionalites)
    //Functionality Intervention
    this.interventionFonctionalite.ajouter_intervention = this.roleForm.value.intervention.ajouter_intervention;
    this.interventionFonctionalite.modifier_intervention = this.roleForm.value.intervention.modifier_intervention;
    this.interventionFonctionalite.supprimer_intervention = this.roleForm.value.intervention.supprimer_intervention;
    console.log("Intervention fonctionalite",this.interventionFonctionalite)

    //Add Client Functionality
    this.clientService.addClient(this.clientFonctionalites).subscribe(resultat => {
        this.gestion.clientFonctionalite = resultat;
        console.log("clientFonctionalite",this.gestion.clientFonctionalite);
        //Add idClientFonctionalite to Gestion
      console.log("succes",resultat);
    },error => {
      console.log("error");
      }
    );
   //Add Intervention Functionality
    this.interventionFonctionaliteService.addInterventionFonctionalite(this.interventionFonctionalite).subscribe(resultat2 =>{
      this.gestion.interventionFonctionalite = resultat2;
        //Add idInterventionFonctionalite to Gestion
        //Role
        this.role.nom = this.roleForm.value.nom ;
        this.role.description = this.roleForm.value.description;
        console.log("ROLE",this.role);
      this.gestionAccessControlService.addGestion(this.gestion).subscribe(gestionAccesControl1 =>{
        console.log("hello",gestionAccesControl1);
        this.role.gestionAccessControl = gestionAccesControl1;
        this.roleService.addRole(this.role).subscribe(roleResultat =>{
            console.log("succes Role",roleResultat);
          }
        );
        }
      );

        console.log("succes",resultat2);
      },
      error => {
      console.log("error");
      }
    );

  }

  /* public onAddRole(addForm: FormGroup): void {
    //Functionality Client
    this.clientFonctionalites.ajouter_client = this.roleForm.value.client.ajouter_client;
    this.clientFonctionalites.modifier_client = this.roleForm.value.client.modifier_client;
    this.clientFonctionalites.supprimer_client = this.roleForm.value.client.supprimer_client;
    console.log("client fonctionalite", this.clientFonctionalites)
    //Functionality Intervention
    this.interventionFonctionalite.ajouter_intervention = this.roleForm.value.intervention.ajouter_intervention;
    this.interventionFonctionalite.modifier_intervention = this.roleForm.value.intervention.modifier_intervention;
    this.interventionFonctionalite.supprimer_intervention = this.roleForm.value.intervention.supprimer_intervention;
    console.log("Intervention fonctionalite", this.interventionFonctionalite)
    this.role.nom = this.roleForm.value.nom;
    this.role.description = this.roleForm.value.description;
    console.log("ROLE", this.role);

    const interventionFunc$ = this.interventionFonctionaliteService.addInterventionFonctionalite(this.interventionFonctionalite);

    const clientFunc$ = this.clientService.addClient(this.clientFonctionalites).pipe(
      mergeMap((clientF: ClientFonctionalite) => {
        this.clientFonctionalites = clientF;
        console.warn('clienF', this.clientFonctionalites);
        return interventionFunc$;
      })
    ).subscribe(res => {
      this.result =res;
        console.warn('result',this.result);

      }
    );

  }
*/

}


