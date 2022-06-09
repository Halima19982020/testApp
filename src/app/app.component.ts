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
import {pipe} from "rxjs";
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


  constructor(private clientService: ClientService,
  private roleService: RoleService,
  private gestionAccessControlService : GestionAccessControlService,
  private interventionFonctionaliteService: InterventionFonctionalitesService,){}
  client = [
    {id: 1, select: false, name:'Ajouter client'},
    {id: 2, select: true, name:'Modifier client'},
    {id: 3, select: true, name:'Supprimer client'},
  ];
  intervention = [
    {id: 1, select: false, name:'Ajouter intervention'},
    {id: 2, select: true, name:'Modifier intervention'},
    {id: 3, select: true, name:'Supprimer intervention'},
  ];
  onChangeClient($event) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    this.client = this.client.map((d) => {
      if (d.id == id) {
        d.select = isChecked;
        this.parentSelectorClient = false;
        return d;
      }
      //negative one
      if (id == -1) {
        d.select = this.parentSelectorClient;
        return d;
      }
      return d;
    });
    console.log(this.client);
  }

/*  public onAddRole(addForm: FormGroup): void {
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
        this.gestionAccessControlService.addGestion(this.gestion).subscribe(gestionAccessControl =>{
        //this.gestion = gestionAccessControl;
        this.role.gestionAccessControl = gestionAccessControl;
        console.log("ahlan",gestionAccessControl);

      }
      );

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
        this.role = {};
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

  }*/

  public onAddRole(addForm: FormGroup): void {
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
    this.role.nom = this.roleForm.value.nom ;
    this.role.description = this.roleForm.value.description;
    console.log("ROLE",this.role);
    //Add Client Functionality
    this.clientService.addClient(this.clientFonctionalites).subscribe(resultat => {
      this.gestion.clientFonctionalite = resultat;
      console.log("clientFonctionalite", this.gestion.clientFonctionalite);
      //Add idClientFonctionalite to Gestion
      this.gestionAccessControlService.addGestion(this.gestion).subscribe(gestionAccessControl => {
          //this.gestion = gestionAccessControl;
          this.role.gestionAccessControl = gestionAccessControl;
          console.log("ahlan", gestionAccessControl);

        }
      );

      console.log("succes", resultat);
    });
   const gestionSubscription = this.gestionAccessControlService.addGestion(this.gestion).subscribe(gestionAccessControl => {
        //this.gestion = gestionAccessControl;
        this.role.gestionAccessControl = gestionAccessControl;
        console.log("ahlan", gestionAccessControl);

      }
    );
    const rolSubscription =  this.roleService.addRole(this.role).subscribe(roleResultat =>{
      this.role = roleResultat;
      }
    );
    const clientFuncSubscription = this.clientService.addClient(this.clientFonctionalites).subscribe(clientFonctionalite =>{
        this.clientFonctionalites = clientFonctionalite;
    }

    )
  }

}


