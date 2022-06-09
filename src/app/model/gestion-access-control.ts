import {ClientFonctionalite} from "./client-fonctionalite";
import {InterventionFonctionalite} from "./intervention-fonctionalite";

export interface GestionAccessControl {
  id?: number;
  clientFonctionalite?: ClientFonctionalite;
  interventionFonctionalite?: InterventionFonctionalite;
}
