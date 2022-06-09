import {GestionAccessControl} from "./gestion-access-control";

export interface Role {
  id?: number;
  nom?: string;
  description?: string;
  gestionAccessControl?: GestionAccessControl;

}

